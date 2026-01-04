import { useMutation } from "@tanstack/react-query";
import { adminLogin } from "@/services/auth";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { LoginData } from "@/types/auth";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/error-utils";

// Helper function to decode JWT token
function decodeJWT(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
}

export function useAdminLogin() {
  const { setAdminAuth } = useAdminAuth();

  return useMutation<{ access: string; refresh: string }, unknown, LoginData>({
    mutationFn: (data: LoginData) => adminLogin(data),
    onSuccess: (response: { access: string; refresh: string }) => {
      // Admin login returns { access: string, refresh: string } directly
      if (response.access && response.refresh) {
        // Decode the JWT to get user information
        const decodedToken = decodeJWT(response.access);
        
        if (decodedToken) {
          setAdminAuth(
            {
              id: decodedToken.user_id,
              username: decodedToken.email,
              email: decodedToken.email,
              display: `${decodedToken.first_name || ''} ${decodedToken.last_name || ''}`.trim() || decodedToken.email
            },
            {
              access_token: response.access,
              refresh_token: response.refresh
            }
          );
          toast.success("Admin Login Successful", {
            description: "Welcome to the admin portal."
          });
        } else {
          console.error("Failed to decode JWT token");
          toast.error("Login Error", {
            description: "Failed to decode authentication token."
          });
        }
      } else {
        console.error("Unexpected admin login response structure:", response);
        toast.error("Login Error", {
          description: "Authenticated but received unexpected data structure."
        });
      }
    },
    onError: (error: unknown) => {
      console.error("Admin login error:", error);
      toast.error("Admin Login Failed", {
        description: getErrorMessage(error)
      });
    }
  });
}
