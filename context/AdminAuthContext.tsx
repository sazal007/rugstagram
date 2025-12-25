"use client";

import React, { createContext, useState, ReactNode, useContext } from "react";
import { useRouter } from "next/navigation";

interface AdminAuthContextType {
  isAdminAuthenticated: boolean;
  adminLogin: (email: string, password: string) => boolean;
  adminLogout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    // Initialize state from localStorage on mount
    if (typeof window !== "undefined") {
      const adminSession = localStorage.getItem("adminSession");
      return adminSession === "authenticated";
    }
    return false;
  });
  const router = useRouter();

  const adminLogin = (email: string, password: string): boolean => {
    // Get credentials from environment variables
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    // Validate credentials
    if (email === adminEmail && password === adminPassword) {
      setIsAdminAuthenticated(true);
      localStorage.setItem("adminSession", "authenticated");
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem("adminSession");
    router.push("/admin-login");
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAdminAuthenticated,
        adminLogin,
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
