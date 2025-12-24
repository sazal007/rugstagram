
import { siteConfig } from "@/config/siteConfig";
import { LoginResponse, SignupResponse } from "@/types/auth";

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
    throw new Error(errorData.message || "Signup failed");
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
    throw new Error(errorData.error || "Login failed");
  }
  return response.json();
}