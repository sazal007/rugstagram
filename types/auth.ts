export interface User {
  id: number | string;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  address?: string; 
  street_address_1?: string;
  street_address_2?: string;
  city?: string;
  postcode?: string;
  country?: string;
  display?: string;
  has_usable_password?: boolean;
  is_superuser?: boolean;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

// Updated to match actual API response structure
export interface LoginResponse {
  status: number;
  data: {
    user: {
      display: string;
      has_usable_password: boolean;
      id: number;
      access_token: string;
      refresh_token: string;
      username: string;
    };
    methods: Array<{
      method: string;
      at: number;
      email: string;
    }>;
  };
  meta: {
    is_authenticated: boolean;
  };
}

export interface SignupResponse extends User, AuthTokens {}

export interface AdminLoginResponse {
  access: string;
  refresh: string;
}

export interface DecodedAccessToken {
  exp: number;
  iat: number;
  jti: string;
  token_type: string;
  user_id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  street_address_1: string;
  street_address_2: string;
  city: string;
  postcode: string;
  country: string;
  is_superuser: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  confirmPassword?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  username?: string;
}

export interface UpdateProfileData {
  first_name?: string;
  last_name?: string;
  phone?: string;
  street_address_1?: string;
  street_address_2?: string;
  city?: string;
  postcode?: string;
  country?: string;
}

export interface ChangePasswordData {
  old_password?: string;
  new_password?: string;
  confirm_password?: string;
}