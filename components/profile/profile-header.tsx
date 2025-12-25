import { User } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface ProfileHeaderProps {
  user: User;
  onLogout: () => void;
}

export function ProfileHeader({ user, onLogout }: ProfileHeaderProps) {
  const initials =
    user.first_name && user.last_name
      ? `${user.first_name[0]}${user.last_name[0]}`
      : user.email.substring(0, 2).toUpperCase();

  return (
    <div className="flex items-center justify-between gap-4 py-6">
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-full bg-muted">
          {/* Placeholder for now, can implement image upload later */}
          <div className="flex h-full w-full items-center justify-center bg-primary/10 text-xl font-bold text-primary">
            {initials}
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome back, {user.first_name || "User"}
          </h1>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
      </div>
      <Button 
        variant="outline" 
        onClick={onLogout}
        className="gap-2"
      >
        <LogOut className="h-4 w-4" />
        <span className="hidden sm:inline">Log Out</span>
      </Button>
    </div>
  );
}
