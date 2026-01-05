"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { ProfileSidebar } from "./profile-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUserProfile } from "@/services/auth";
import { Package,  Eye } from "lucide-react";
import { Wishlist } from "./wishlist";
import { MyOrdersList } from "./my-orders-list";


export function ProfilePage() {
  const { user, tokens, logout, updateProfile, changePassword } = useAuth();
  const [activeTab, setActiveTab] = useState("personal");
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    street_address_1: user?.street_address_1 || "",
    street_address_2: user?.street_address_2 || "",
    postcode: user?.postcode || "",
    city: user?.city || "",
    country: user?.country || ""
  });
  
  // Password form state
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Fetch up-to-date user profile
  useEffect(() => {
    async function fetchProfile() {
      if (!tokens?.access_token) {
        setIsInitialLoading(false);
        return;
      }
      try {
        const upToDateUser = await getUserProfile(tokens.access_token);
        if (upToDateUser) {
          setProfileData({
            first_name: upToDateUser.first_name || "",
            last_name: upToDateUser.last_name || "",
            email: upToDateUser.email || "",
            phone: upToDateUser.phone || "",
            street_address_1: upToDateUser.street_address_1 || "",
            street_address_2: upToDateUser.street_address_2 || "",
            postcode: upToDateUser.postcode || "",
            city: upToDateUser.city || "",
            country: upToDateUser.country || ""
          });
        }
      } catch (error) {
        console.error("Failed to fetch up-to-date profile:", error);
      } finally {
        setIsInitialLoading(false);
      }
    }
    fetchProfile();
  }, [tokens?.access_token]);

  if (!user) return null;

  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    // Map UI IDs to API field names if necessary
    const fieldMapping: Record<string, string> = {
      address: "street_address_1",
      address2: "street_address_2",
      zip: "postcode"
    };
    const fieldName = fieldMapping[id] || id;
    setProfileData(prev => ({ ...prev, [fieldName]: value }));
  };

  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { placeholder, value } = e.target;
    const fieldMapping: Record<string, string> = {
      "Old password": "oldPassword",
      "New password": "newPassword",
      "Confirm password": "confirmPassword"
    };
    const fieldName = fieldMapping[placeholder as string];
    if (fieldName) {
      setPasswordData(prev => ({ ...prev, [fieldName]: value }));
    }
  };

  const handleProfileUpdate = async () => {
    setIsUpdatingProfile(true);
    try {
      await updateProfile({
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        phone: profileData.phone,
        street_address_1: profileData.street_address_1,
        street_address_2: profileData.street_address_2,
        postcode: profileData.postcode,
        city: profileData.city,
        country: profileData.country
      });
    } catch {
      // Error handled in AuthContext with toast
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      // You might want to import toast here too, or rely on service validation
      // but AuthContext doesn't handle client-side matching easily without knowing it
      return; 
    }
    
    setIsChangingPassword(true);
    try {
      await changePassword({
        old_password: passwordData.oldPassword,
        new_password: passwordData.newPassword,
        confirm_password: passwordData.confirmPassword
      });
      // Clear password fields on success
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } catch {
      // Error handled in AuthContext
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="bg-[#fafafa] min-h-screen  pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-8 items-start">
          
          {/* Sidebar */}
          <ProfileSidebar 
            user={user} 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
            onLogout={logout} 
          />

          {/* Main Content */}
          <div className="space-y-8">
            
            {/* Personal Section */}
            {activeTab === "personal" && (
              <div className="space-y-12">
                <section className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                  <h2 className="text-xl font-bold text-slate-900 mb-8">Personal</h2>
                  
                  {isInitialLoading ? (
                    <div className="space-y-6 animate-pulse">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                          <div key={i} className="space-y-2">
                             <div className="h-4 w-20 bg-slate-100 rounded" />
                             <div className="h-12 bg-slate-50 rounded-xl" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="first_name" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">First name</Label>
                      <Input id="first_name" value={profileData.first_name} onChange={handleProfileInputChange} className="bg-slate-50/50 border-none h-12 focus-visible:ring-1 focus-visible:ring-slate-200" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last_name" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Last name</Label>
                      <Input id="last_name" value={profileData.last_name} onChange={handleProfileInputChange} className="bg-slate-50/50 border-none h-12 focus-visible:ring-1 focus-visible:ring-slate-200" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email address</Label>
                      <Input id="email" defaultValue={user.email} disabled className="bg-slate-50/50 border-none h-12 focus-visible:ring-1 focus-visible:ring-slate-200 opacity-70" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone number</Label>
                      <Input id="phone" value={profileData.phone} onChange={handleProfileInputChange} className="bg-slate-50/50 border-none h-12 focus-visible:ring-1 focus-visible:ring-slate-200" />
                    </div>
              
                    
              
 
                    <div className="md:col-span-1 space-y-2">
                        <Label htmlFor="address" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Street address</Label>
                        <Input id="address" value={profileData.street_address_1} onChange={handleProfileInputChange} className="bg-slate-50/50 border-none h-12 focus-visible:ring-1 focus-visible:ring-slate-200" />
                    </div>
                    <div className="md:col-span-1 space-y-2">
                        <Label htmlFor="address2" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Street address 2 (Optional)</Label>
                        <Input id="address2" value={profileData.street_address_2} onChange={handleProfileInputChange} className="bg-slate-50/50 border-none h-12 focus-visible:ring-1 focus-visible:ring-slate-200" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="zip" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Zip/code</Label>
                        <Input id="zip" value={profileData.postcode} onChange={handleProfileInputChange} className="bg-slate-50/50 border-none h-12 focus-visible:ring-1 focus-visible:ring-slate-200" />
                    </div>
 
                    <div className="space-y-2">
                        <Label htmlFor="city" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">City</Label>
                        <Input id="city" value={profileData.city} onChange={handleProfileInputChange} className="bg-slate-50/50 border-none h-12 focus-visible:ring-1 focus-visible:ring-slate-200" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="country" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Country</Label>
                        <Input id="country" value={profileData.country} onChange={handleProfileInputChange} className="bg-slate-50/50 border-none h-12 focus-visible:ring-1 focus-visible:ring-slate-200" />
                    </div>
                      </div>

                      <div className="flex justify-end mt-10">
                        <Button 
                          onClick={handleProfileUpdate} 
                          disabled={isUpdatingProfile}
                          className="bg-[#1a202c] hover:bg-slate-800 cursor-pointer text-white rounded-xl px-8 h-12  font-semibold min-w-[140px]"
                        >
                          {isUpdatingProfile ? "Saving..." : "Save changes"}
                        </Button>
                      </div>
                    </>
                  )}
                </section>

                <div className="border-t border-dashed border-slate-200 w-full" />

                {/* Change Password Section */}
                <section className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                  <h2 className="text-xl font-bold text-slate-900 mb-8">Change password</h2>
                  <div className="space-y-4">
                    <div className="relative">
                      <Input 
                        type="password" 
                        placeholder="Old password" 
                        value={passwordData.oldPassword}
                        onChange={handlePasswordInputChange}
                        className="bg-slate-50/50 border-none h-14 pr-10 focus-visible:ring-1 focus-visible:ring-slate-200" 
                      />
                      <Eye className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 cursor-pointer" />
                    </div>
                    <div className="relative">
                      <Input 
                        type="password" 
                        placeholder="New password" 
                        value={passwordData.newPassword}
                        onChange={handlePasswordInputChange}
                        className="bg-slate-50/50 border-none h-14 pr-10 focus-visible:ring-1 focus-visible:ring-slate-200" 
                      />
                      <Eye className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 cursor-pointer" />
                    </div>
                    <div className="relative">
                      <Input 
                        type="password" 
                        placeholder="Confirm password" 
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordInputChange}
                        className="bg-slate-50/50 border-none h-14 pr-10 focus-visible:ring-1 focus-visible:ring-slate-200" 
                      />
                      <Eye className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 cursor-pointer" />
                    </div>
                  </div>
                  <div className="flex justify-end mt-10">
                    <Button 
                      onClick={handlePasswordChange}
                      disabled={isChangingPassword || !passwordData.oldPassword || !passwordData.newPassword || passwordData.newPassword !== passwordData.confirmPassword}
                      className="bg-[#1a202c] hover:bg-slate-800 text-white rounded-xl px-8 h-12 font-semibold min-w-[140px]"
                    >
                      {isChangingPassword ? "Updating..." : "Save changes"}
                    </Button>
                  </div>
                </section>
              </div>
            )}

            {/* Orders Section */}
            {activeTab === "orders" && <MyOrdersList />}

            {/* Wishlist Section */}
            {activeTab === "wishlist" && <Wishlist />}

            {/* Other tabs placeholders */}
            {["vouchers", "payment"].includes(activeTab) && (
              <section className="bg-white p-12 rounded-2xl border border-slate-100 shadow-sm text-center">
                <div className="max-w-xs mx-auto space-y-4">
                   <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                      <Package className="h-10 w-10 text-slate-300" />
                   </div>
                   <h3 className="text-lg font-bold text-slate-900 capitalize">{activeTab} is coming soon</h3>
                   <p className="text-slate-500 text-sm">We&apos;re working hard to bring this feature to your profile page.</p>
                </div>
              </section>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
