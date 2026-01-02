import { siteConfig } from "@/config/siteConfig";
import { 
  LoginResponse, 
  SignupResponse, 
  UpdateProfileData, 
  ChangePasswordData, 
  User
} from "@/types/auth";

const API_BASE_URL = siteConfig.backendUrl;

interface SignupData {
  email: string;
  password: string; 
  first_name?: string;
  last_name?: string;
  username?: string;
  phone?: string;
  address?: string;
}

interface LoginData {
  email: string;
  password: string;
}

export async function signupUser(data: SignupData): Promise<SignupResponse> {
  const response = await fetch(`${API_BASE_URL}/_allauth/browser/v1/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    // Create an error that preserves the full response structure
    const error = new Error(errorData.message || "Signup failed") as Error & {
      response?: { data: unknown; status: number };
    };
    // Attach the full error data to match axios-style error structure
    error.response = { data: errorData, status: response.status };
    throw error;
  }
  return response.json();
}

export async function loginUser(data: LoginData): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/_allauth/browser/v1/auth/login`, { 
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    // Create an error that preserves the full response structure
    const error = new Error(errorData.error || "Login failed") as Error & {
      response?: { data: unknown; status: number };
    };
    // Attach the full error data to match axios-style error structure
    error.response = { data: errorData, status: response.status };
    throw error;
  }
  return response.json();
}

/**
 * Update user profile information.
 * @param data - The profile data to update.
 * @param token - The authentication token.
 */
export async function updateUserProfile(data: UpdateProfileData, token: string): Promise<unknown> {
  const response = await fetch(`${API_BASE_URL}/api/profile/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update profile");
  }
  return response.json();
}

export async function getUserProfile(token: string): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/api/profile/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to get profile");
  }
  return response.json();
}

/**
 * Change user password.
 * @param data - The password change data.
 * @param token - The authentication token.
 */
export async function changePassword(data: ChangePasswordData, token: string): Promise<unknown> {
  const response = await fetch(`${API_BASE_URL}/_allauth/browser/v1/auth/password/change`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to change password");
  }
  return response.json();
}