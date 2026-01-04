"use client";

import { Search, Bell, User } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAdminAuth } from "@/context/AdminAuthContext";

export function AdminHeader() {
  const { adminLogout } = useAdminAuth();
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 lg:px-6">
      <SidebarTrigger className="-ml-1" />
      
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        <CustomButton variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="w-5 h-5" />
        </CustomButton>
        
        <Popover>
          <PopoverTrigger asChild>
            <CustomButton variant="ghost" size="icon" aria-label="User menu">
              <User className="w-5 h-5" />
            </CustomButton>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-2" align="end">
            <div className="space-y-1">
              <button className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100">
                Profile
              </button>
              <button className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100">
                Settings
              </button>
              <button 
                onClick={adminLogout}
                className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}

