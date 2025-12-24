"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode"; 
import { User, AuthTokens, DecodedAccessToken, LoginData, SignupData } from "@/types/auth";
import { loginUser, signupUser } from "@/services/auth";
import { useToast } from "../hooks/use-toast";

interface AuthContextType {
  user: User | null;
  tokens: AuthTokens | null;
  login: (data: LoginData) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  updateTokens: (tokens: AuthTokens) => void; 
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<AuthTokens | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

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
          });
        } else {
          // Token expired
          localStorage.removeItem("authTokens");
          toast({ title: "Session expired", description: "Please log in again.", variant: "destructive" });
        }
      } catch (error) {
        console.error("Failed to parse stored tokens or decode token:", error);
        localStorage.removeItem("authTokens");
      }
    }
    setIsLoading(false);
  }, [toast]);

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
      };

      setUser(updatedUser);
      setTokens(newTokens);
      localStorage.setItem("authTokens", JSON.stringify(newTokens));
    } catch (error) {
      console.error("Failed to update tokens:", error);
    }
  };

  const getErrorMessage = (error: unknown) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const err = error as any;
    // Handle different types of errors
    if (err.response) {
      const status = err.response.status;
      const data = err.response.data;
      
      // Handle errors array format: {status: 400, errors: [{message: "...", code: "..."}]}
      if (data?.errors && Array.isArray(data.errors) && data.errors.length > 0) {
        const firstError = data.errors[0];
        
        // Check for specific error codes
        if (firstError.code === "too_many_login_attempts") {
          return "Too many failed login attempts. Please wait a few minutes before trying again.";
        }
        
        if (firstError.code === "invalid_credentials") {
          return "Invalid email or password. Please check your credentials and try again.";
        }
        
        if (firstError.code === "user_not_found") {
          return "Account not found. Please check your email address or sign up for a new account.";
        }
        
        if (firstError.code === "account_disabled") {
          return "Your account has been disabled. Please contact support for assistance.";
        }
        
        // Return the error message from the backend
        return firstError.message || "Login failed. Please try again.";
      }
      
      // Fallback to status code based handling
      switch (status) {
        case 401:
          return "Invalid email or password. Please check your credentials and try again.";
        case 400:
          if (data?.message) {
            return data.message;
          }
          if (data?.error) {
            return data.error;
          }
          if (data?.detail) {
            return data.detail;
          }
          return "Invalid login credentials. Please check your email and password.";
        case 403:
          return "Your account has been suspended or disabled. Please contact support.";
        case 404:
          return "Account not found. Please check your email address or sign up for a new account.";
        case 429:
          return "Too many login attempts. Please wait a few minutes before trying again.";
        case 500:
          return "Server error occurred. Please try again later.";
        default:
          return data?.message || data?.error || data?.detail || "Login failed. Please try again.";
      }
    } else if (err.request) {
      return "Network error. Please check your internet connection and try again.";
    } else {
      return err.message || "An unexpected error occurred. Please try again.";
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
      };
      
      handleAuthSuccess(loggedInUser, { 
        access_token: accessToken, 
        refresh_token: refreshToken 
      });
      
      toast({ title: "Login Successful", description: "Welcome back!" });
      
      // Handle redirect after successful login
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
            // Default redirect to home
            router.push("/");
          }
        }
      } else {
        // Fallback for server-side rendering
        router.push("/");
      }
    } catch (error: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err = error as any;
      const errorMessage = getErrorMessage(err);
      
      toast({ 
        title: "Login Failed", 
        description: errorMessage,
        variant: "destructive" 
      });
      
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
      toast({ 
        title: "Signup Successful", 
        description: "Your account has been created. Please log in to continue." 
      });
      router.push("/login"); 
    } catch (error: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err = error as any;
      const errorMessage = getErrorMessage(err);
      
      toast({ 
        title: "Signup Failed", 
        description: errorMessage,
        variant: "destructive" 
      });
      
      console.error("Signup error:", {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
        error: err
      });
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
    toast({ title: "Logged Out", description: "You have been successfully logged out." });
    router.push("/login");
  };

 return (
    <AuthContext.Provider value={{ 
      user, 
      tokens, 
      login, 
      signup, 
      logout, 
      updateTokens, 
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