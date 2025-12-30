"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

import { ShippingAddress } from "./shipping-address";
import { ShippingMethod } from "./shipping-method";
import { OrderSummary } from "./order-summary";
import { CheckoutFormData, CheckoutCartItem } from "./types";
import { useCreateOrder } from "@/hooks/use-order";
import { CreateOrderPayload } from "@/types/order";
import { toast } from "sonner";

export function CheckoutPage() {
  const { user, tokens, isLoading: isAuthLoading } = useAuth();
  const { cartItems, subtotal, clearCart } = useCart();
  const router = useRouter();
  const createOrderMutation = useCreateOrder();

  const [formData, setFormData] = useState<CheckoutFormData>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
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
        zip_code: formData.zipCode,
        shipping_method: formData.shippingMethod,
        delivery_fee: shipping.toFixed(2),
        total_amount: total.toFixed(2),
        items: cartItems.map((item) => {
          console.log("Mapping item to payload:", item);
          return {
            product: Number(item.productId),
            product_id: Number(item.productId),
            quantity: item.quantity,
            price: String(item.price),
            size: item.sizeId || undefined,
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
      router.push("/order-completed");
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
              <ShippingAddress
                formData={formData}
                onChange={handleFieldChange}
              />

              {/* Shipping Method */}
              <ShippingMethod
                selectedMethod={formData.shippingMethod}
                onChange={(method) => handleFieldChange("shippingMethod", method)}
                subtotal={subtotal}
              />
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-5 pt-8">
              <OrderSummary
                cartItems={checkoutCartItems}
                subtotal={subtotal}
                shipping={shipping}
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
