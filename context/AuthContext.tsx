"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode"; 
import { User, AuthTokens, DecodedAccessToken, LoginData, SignupData, UpdateProfileData, ChangePasswordData } from "@/types/auth";
import { loginUser, signupUser, updateUserProfile, changePassword as changePasswordService, getUserProfile } from "@/services/auth";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/error-utils";

interface AuthContextType {
  user: User | null;
  tokens: AuthTokens | null;
  login: (data: LoginData) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  updateTokens: (tokens: AuthTokens) => void; 
  updateProfile: (data: UpdateProfileData) => Promise<void>;
  changePassword: (data: ChangePasswordData) => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<AuthTokens | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedTokens = localStorage.getItem("authTokens");
    if (storedTokens) {
      try {
        const parsedTokens: AuthTokens = JSON.parse(storedTokens);
        const decodedAccess = jwtDecode<DecodedAccessToken>(parsedTokens.access_token);

        if (decodedAccess.exp * 1000 > Date.now()) {
          setTokens(parsedTokens);
          setUser({
            id: decodedAccess.user_id,
            email: decodedAccess.email,
            username: decodedAccess.email, 
            first_name: decodedAccess.first_name,
            last_name: decodedAccess.last_name,
            phone: decodedAccess.phone,
            street_address_1: decodedAccess.street_address_1,
            street_address_2: decodedAccess.street_address_2,
            city: decodedAccess.city,
            postcode: decodedAccess.postcode,
            country: decodedAccess.country,
            is_superuser: decodedAccess.is_superuser,
          });
        } else {
          // Token expired
          localStorage.removeItem("authTokens");
          toast.error("Session expired", { description: "Please log in again." });
        }
      } catch (error) {
        console.error("Failed to parse stored tokens or decode token:", error);
        localStorage.removeItem("authTokens");
      }
    }
    setIsLoading(false);
  }, []);

  const handleAuthSuccess = (userData: User, tokenData: AuthTokens) => {
    setUser(userData);
    setTokens(tokenData);
    localStorage.setItem("authTokens", JSON.stringify(tokenData));
  };

  // Add updateTokens method
  const updateTokens = (newTokens: AuthTokens) => {
    try {
      const decodedAccess = jwtDecode<DecodedAccessToken>(newTokens.access_token);
      
      // Update user data from the new token
      const updatedUser: User = {
        id: decodedAccess.user_id,
        email: decodedAccess.email,
        username: decodedAccess.email,
        first_name: decodedAccess.first_name,
        last_name: decodedAccess.last_name,
        phone: decodedAccess.phone,
        street_address_1: decodedAccess.street_address_1,
        street_address_2: decodedAccess.street_address_2,
        city: decodedAccess.city,
        postcode: decodedAccess.postcode,
        country: decodedAccess.country,
        is_superuser: decodedAccess.is_superuser,
      };

      setUser(updatedUser);
      setTokens(newTokens);
      localStorage.setItem("authTokens", JSON.stringify(newTokens));
    } catch (error) {
      console.error("Failed to update tokens:", error);
    }
  };


  const login = async (data: LoginData) => {
    setIsLoading(true);
    try {
      const response = await loginUser(data);
      
      // Access tokens from the correct path in the response
      const accessToken = response.data?.user?.access_token;
      const refreshToken = response.data?.user?.refresh_token;
      
      if (!accessToken) {
        throw new Error("No access token received from server");
      }
      
      const decodedAccess = jwtDecode<DecodedAccessToken>(accessToken);
      const loggedInUser: User = {
        id: decodedAccess.user_id,
        email: decodedAccess.email,
        username: decodedAccess.email, 
        first_name: decodedAccess.first_name,
        last_name: decodedAccess.last_name,
        phone: decodedAccess.phone,
        address: decodedAccess.address,
        is_superuser: decodedAccess.is_superuser,
      };
      
      handleAuthSuccess(loggedInUser, { 
        access_token: accessToken, 
        refresh_token: refreshToken 
      });
      
      toast.success("Login Successful", { description: "Welcome back!" });

      // Fetch full profile to check for superuser status since it's missing in token
      let isSuperUser = decodedAccess.is_superuser;
      try {
        const fullProfile = await getUserProfile(accessToken);
        if (fullProfile.is_superuser !== undefined) {
          isSuperUser = fullProfile.is_superuser;
          // Update local user state with full profile info
          setUser(prev => ({ ...prev, ...fullProfile }));
        }
      } catch (profileError) {
        console.error("Failed to fetch full profile on login:", profileError);
      }
      
      // Handle redirect after successful login
      if (isSuperUser) {
        router.push("/admin");
        return;
      }

      if (typeof window !== 'undefined') {
        // Check for redirect URL in sessionStorage first
        const redirectUrl = sessionStorage.getItem('redirectAfterLogin');
        
        if (redirectUrl) {
          // Clear the stored redirect URL
          sessionStorage.removeItem('redirectAfterLogin');
          // Redirect to the stored URL
          router.push(redirectUrl);
        } else {
          // Check URL parameters as fallback
          const urlParams = new URLSearchParams(window.location.search);
          const redirectParam = urlParams.get('redirect');
          
          if (redirectParam) {
            router.push(decodeURIComponent(redirectParam));
          } else {
            router.push("/profile");
          }
        }
      } else {
        // Fallback for server-side rendering
        router.push("/profile");
      }
    } catch (error: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err = error as any;
      console.error("Login error:", {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
        error: err
      });
      
      // Re-throw the error so the form can handle it
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: SignupData) => {
    setIsLoading(true);
    try {
      const signupData = {
        ...data,
        password: data.password, 
      };

      delete signupData.confirmPassword;

      await signupUser(signupData);
      
      // Don't auto-login after signup, just redirect to login page
      toast.success("Signup Successful", { 
        description: "Your account has been created. Please log in to continue." 
      });
      router.push("/login"); 
    } catch (error: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err = error as any;
      console.error("Signup error:", {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
        error: err
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setTokens(null);
    localStorage.removeItem("authTokens");
    // Clear any pending redirects
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('redirectAfterLogin');
    }
    toast.success("Logged Out", { description: "You have been successfully logged out." });
    router.push("/login");
  };

  const updateProfile = async (data: UpdateProfileData) => {
    if (!tokens?.access_token) {
      throw new Error("No access token available");
    }
    
    try {
      const updatedUserData = await updateUserProfile(data, tokens.access_token);
      
      // If the backend returns the updated user, we update our local state
      // Note: If the backend returns a new token, we should use updateTokens instead
      // For now, we manually update the user state with returned data if available
      if (updatedUserData) {
        setUser(prevUser => {
          if (!prevUser) return null;
          return {
            ...prevUser,
            ...updatedUserData
          };
        });
      }
      
      toast.success("Profile Updated", { description: "Your personal information has been updated." });
    } catch (error: unknown) {
      console.error("Profile update error:", error);
      toast.error("Update Failed", { 
        description: getErrorMessage(error),
      });
      throw error;
    }
  };

  const changePassword = async (data: ChangePasswordData) => {
    if (!tokens?.access_token) {
      throw new Error("No access token available");
    }

    try {
      await changePasswordService(data, tokens.access_token);
      toast.success("Password Changed", { description: "Your password has been changed successfully." });
    } catch (error: unknown) {
      console.error("Password change error:", error);
      toast.error("Change Failed", { 
        description: getErrorMessage(error),
      });
      throw error;
    }
  };

 return (
    <AuthContext.Provider value={{ 
      user, 
      tokens, 
      login, 
      signup, 
      logout, 
      updateTokens, 
      updateProfile,
      changePassword,
      isLoading, 
      isAuthenticated: !!user && !!tokens 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};