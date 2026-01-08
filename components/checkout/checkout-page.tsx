"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

import { OrderSummary } from "./order-summary";
import { CheckoutFormData, CheckoutCartItem } from "./types";
import { useCreateOrder } from "@/hooks/use-order";
import { CreateOrderPayload } from "@/types/order";
import { toast } from "sonner";
import { getUserProfile } from "@/services/auth";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";

export function CheckoutPage() {
  const { user, tokens, isLoading: isAuthLoading } = useAuth();
  const { cartItems, subtotal, clearCart } = useCart();
  const router = useRouter();
  const createOrderMutation = useCreateOrder();

  const [formData, setFormData] = useState<CheckoutFormData>({
    email: user?.email || "",
    firstName: user?.first_name || "",
    lastName: user?.last_name || "",
    address: user?.street_address_1 || "",
    city: user?.city || "",
    state: "", // State isn't in profile, keep empty if not present
    zipCode: user?.postcode || "",
    phone: user?.phone || "",
    shippingMethod: "standard",
  });

  const shipping =
    formData.shippingMethod === "express" ? 9 : 0;
  const total = subtotal + shipping;

  useEffect(() => {
    if (!isAuthLoading && !user) {
      sessionStorage.setItem("redirectAfterLogin", "/checkout");
      router.push("/login");
    }
  }, [user, isAuthLoading, router]);

  // Fetch up-to-date user profile like in profile-page.tsx
  useEffect(() => {
    async function fetchProfile() {
      if (!tokens?.access_token) return;
      try {
        const upToDateUser = await getUserProfile(tokens.access_token);
        if (upToDateUser) {
          setFormData(prev => ({
            ...prev,
            firstName: upToDateUser.first_name || prev.firstName,
            lastName: upToDateUser.last_name || prev.lastName,
            email: upToDateUser.email || prev.email,
            phone: upToDateUser.phone || prev.phone,
            address: upToDateUser.street_address_1 || prev.address,
            city: upToDateUser.city || prev.city,
            zipCode: upToDateUser.postcode || prev.zipCode,
          }));
        }
      } catch (error) {
        console.error("Failed to fetch up-to-date profile in checkout:", error);
      }
    }
    fetchProfile();
  }, [tokens?.access_token]);

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
        <p className="text-gray-900 dark:text-gray-100">Loading...</p>
      </div>
    );
  }

  // Transform cart items for order summary
  const checkoutCartItems: CheckoutCartItem[] = cartItems.map((item) => ({
    id: item.id,
    name: item.name,
    image: item.image,
    price: item.price,
    quantity: item.quantity,
  }));

  const handleFieldChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    console.log("handleSubmit called");
    
    try {
      const payload: CreateOrderPayload = {
        full_name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone_number: formData.phone,
        shipping_address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zipCode,
        country: "Nepal", // Hardcoded based on user request example
        delivery_fee: shipping,
        total_amount: total,
        items: cartItems.map((item) => {
          console.log("Mapping item to payload:", item);
          return {
            variant: item.variantId,
            quantity: item.quantity,
            size: item.sizeId,
          };
        }),
      };

      console.log("Order Payload:", JSON.stringify(payload, null, 2));
      console.log("Cart Items State:", JSON.stringify(cartItems, null, 2));

      // Get the auth token from the tokens context
      const token = tokens?.access_token;

      await createOrderMutation.mutateAsync({ data: payload, token });
      console.log("Mutation successful");
      
      toast.success("Order placed successfully!", {
        description: "Thank you for your purchase.",
      });

      clearCart();
      router.push("/");
    } catch (error) {
      console.error("Order creation failed:", error);
      toast.error("Failed to place order", {
        description: "Please try again later or contact support.",
      });
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark">
        <main className="pt-28 pb-16">
          <div className="container mx-auto px-4 text-center py-20">
            <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Your cart is empty</h1>
            <p className="mb-8 text-gray-900 dark:text-gray-100">
              Add some products to checkout.
            </p>
            <Link href="/shop" className="inline-block bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Browse Products
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 font-sans antialiased transition-colors duration-200">
      <main className="pt-2 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-7 space-y-8">

              {/* Shipping Address Form */}
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-6 sm:p-8 border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
                  Shipping Address
                </h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">First name</Label>
                      <Input 
                        id="firstName" 
                        value={formData.firstName} 
                        onChange={(e) => handleFieldChange("firstName", e.target.value)} 
                        className="bg-slate-50/50 border-none h-12 focus-visible:ring-1 focus-visible:ring-slate-200" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Last name</Label>
                      <Input 
                        id="lastName" 
                        value={formData.lastName} 
                        onChange={(e) => handleFieldChange("lastName", e.target.value)} 
                        className="bg-slate-50/50 border-none h-12 focus-visible:ring-1 focus-visible:ring-slate-200" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email address</Label>
                      <Input 
                        id="email" 
                        type="email"
                        value={formData.email} 
                        onChange={(e) => handleFieldChange("email", e.target.value)} 
                        className="bg-slate-50/50 border-none h-12 focus-visible:ring-1 focus-visible:ring-slate-200" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Phone number</Label>
                      <PhoneInput
                        id="phone"
                        value={formData.phone}
                        onChange={(value) => handleFieldChange("phone", value || "")}
                        defaultCountry="NP"
                        international={false}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Street address</Label>
                    <Input 
                      id="address" 
                      value={formData.address} 
                      onChange={(e) => handleFieldChange("address", e.target.value)} 
                      className="bg-slate-50/50 border-none h-12 focus-visible:ring-1 focus-visible:ring-slate-200" 
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">City</Label>
                      <Input 
                        id="city" 
                        value={formData.city} 
                        onChange={(e) => handleFieldChange("city", e.target.value)} 
                        className="bg-slate-50/50 border-none h-12 focus-visible:ring-1 focus-visible:ring-slate-200" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">State</Label>
                      <Input 
                        id="state" 
                        value={formData.state} 
                        onChange={(e) => handleFieldChange("state", e.target.value)} 
                        className="bg-slate-50/50 border-none h-12 focus-visible:ring-1 focus-visible:ring-slate-200" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Zip code</Label>
                      <Input 
                        id="zipCode" 
                        value={formData.zipCode} 
                        onChange={(e) => handleFieldChange("zipCode", e.target.value)} 
                        className="bg-slate-50/50 border-none h-12 focus-visible:ring-1 focus-visible:ring-slate-200" 
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-5 pt-8">
              <OrderSummary
                cartItems={checkoutCartItems}
                subtotal={subtotal}
                total={total}
                onSubmit={handleSubmit}
                isSubmitting={createOrderMutation.isPending}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
