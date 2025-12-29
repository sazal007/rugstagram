import { User } from "@/types/auth";
import { Camera } from "lucide-react";

interface ProfileHeaderProps {
  user: User;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const initials =
    user.first_name && user.last_name
      ? `${user.first_name[0]}${user.last_name[0]}`
      : user.email.substring(0, 2).toUpperCase();

  const fullName = `${user.first_name || ""} ${user.last_name || ""}`.trim() || user.username;

  return (
    <div className="flex items-center gap-4 p-4">
      <div className="relative h-14 w-14 overflow-hidden rounded-full bg-slate-100 shrink-0">
        <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-slate-600">
          {initials}
        </div>
      </div>
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-2">
            <label htmlFor="avatar-upload" className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer transition-colors">
                <Camera className="h-3.5 w-3.5" />
                Change photo
            </label>
            <input id="avatar-upload" type="file" className="hidden" accept="image/*" />
        </div>
        <h2 className="mt-1 text-base font-bold text-slate-900 truncate">
          {fullName}
        </h2>
        <p className="text-xs text-slate-500 truncate">{user.email}</p>
      </div>
    </div>
  );
}
