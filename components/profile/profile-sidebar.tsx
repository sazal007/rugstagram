"use client";

import { User } from "@/types/auth";
import { ProfileHeader } from "./profile-header";
import { 
  User as UserIcon, 
  Heart, 
  Package, 
  LogOut 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileSidebarProps {
  user: User;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

export function ProfileSidebar({ 
  user, 
  activeTab, 
  onTabChange, 
  onLogout 
}: ProfileSidebarProps) {
  const menuItems = [
    { id: "personal", label: "Personal", icon: UserIcon },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "orders", label: "Orders", icon: Package },
  ];

  return (
    <div className="w-full h-fit bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
      <ProfileHeader user={user} />
      
      <nav className="mt-2 px-2 pb-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium cursor-pointer transition-colors rounded-xl mb-1",
                isActive 
                  ? "text-orange-600 bg-orange-50/50" 
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              )}
            >
              <Icon className={cn("h-4 w-4", isActive ? "text-orange-600" : "text-slate-400")} />
              {item.label}
            </button>
          );
        })}
        
        <div className="my-2 border-t border-slate-50 px-2" />
        
        <button
          onClick={onLogout}
          className="w-full flex items-center cursor-pointer gap-3 px-4 py-3 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors rounded-xl"
        >
          <LogOut className="h-4 w-4 text-slate-400 group-hover:text-red-600" />
          Logout
        </button>
      </nav>
    </div>
  );
}
