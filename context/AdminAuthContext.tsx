"use client";

import React, { createContext, useState, ReactNode, useContext } from "react";
import { useRouter } from "next/navigation";
import { User, AuthTokens } from "@/types/auth";
import { toast } from "sonner";

interface AdminSession {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
}

interface AdminAuthContextType {
  isAdminAuthenticated: boolean;
  adminUser: User | null;
  adminTokens: AuthTokens | null;
  setAdminAuth: (user: User, tokens: AuthTokens) => void;
  adminLogout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<AdminSession>(() => {
    // Initialize from localStorage on mount
    if (typeof window !== "undefined") {
      const storedTokens = localStorage.getItem("adminTokens");
      const storedUser = localStorage.getItem("adminUser");
      
      if (storedTokens && storedUser) {
        try {
          return {
            user: JSON.parse(storedUser),
            tokens: JSON.parse(storedTokens),
            isAuthenticated: true,
          };
        } catch (error) {
          console.error("Failed to restore admin session:", error);
          localStorage.removeItem("adminTokens");
          localStorage.removeItem("adminUser");
        }
      }
    }
    return {
      user: null,
      tokens: null,
      isAuthenticated: false,
    };
  });
  const router = useRouter();

  const setAdminAuth = (user: User, tokens: AuthTokens) => {
    setSession({
      user,
      tokens,
      isAuthenticated: true,
    });
    localStorage.setItem("adminUser", JSON.stringify(user));
    localStorage.setItem("adminTokens", JSON.stringify(tokens));
  };

  const adminLogout = () => {
    setSession({
      user: null,
      tokens: null,
      isAuthenticated: false,
    });
    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminTokens");
    toast.success("Logged out successfully");
    router.push("/admin-login");
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAdminAuthenticated: session.isAuthenticated,
        adminUser: session.user,
        adminTokens: session.tokens,
        setAdminAuth,
        adminLogout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};
