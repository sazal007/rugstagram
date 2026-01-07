"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  
  const isSuperUser = user?.is_superuser;

  useEffect(() => {
    // Wait for loading to finish before redirecting
    if (!isLoading && !isSuperUser) {
      router.push("/login");
    }
  }, [isLoading, isSuperUser, router, pathname]);

  // Show loading state or nothing while checking auth
  if (isLoading) {
    return null; // or a loading spinner
  }

  // Don't render admin layout if not authenticated as superuser
  if (!isSuperUser) {
    return null;
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <div className="flex h-16 items-center px-4 border-b">
          <SidebarTrigger />
        </div>
        <main className="p-4 lg:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
