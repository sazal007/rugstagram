"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { CheckoutSteps } from "./checkout-steps";
import { ContactInformation } from "./contact-information";
import { ShippingAddress } from "./shipping-address";
import { ShippingMethod } from "./shipping-method";
import { PaymentMethod } from "./payment-method";
import { OrderSummary } from "./order-summary";
import { CheckoutFormData, CheckoutStep, CheckoutCartItem } from "./types";

const CHECKOUT_STEPS: CheckoutStep[] = [
  { number: 1, label: "Information" },
  { number: 2, label: "Shipping & Payment" },
];

export function CheckoutPage() {
  const { cartItems, subtotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<CheckoutFormData>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    shippingMethod: "standard",
  });

  const shipping =
    formData.shippingMethod === "express" ? 200 : subtotal >= 50 ? 0 : 5.99;
  const total = subtotal + shipping;

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) {
      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      try {
        // TODO: Integrate with order creation API
        console.log("Order submitted:", { formData, cartItems, total });
        clearCart();
        // Redirect to success page or home
        window.location.href = "/";
      } catch (error) {
        console.error("Order creation failed:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <main className="pt-28 pb-16">
          <div className="container mx-auto px-4 text-center py-20">
            <h1 className="text-2xl font-bold mb-4 text-black">Your cart is empty</h1>
            <p className="mb-8 text-black">
              Add some products to checkout.
            </p>
            <Link href="/shop">
              <Button size="lg">Browse Products</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <CheckoutSteps currentStep={step}  steps={CHECKOUT_STEPS} />

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Form Section */}
            <div key={step} className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <div className="space-y-6">
                    <ContactInformation
                      email={formData.email}
                      onChange={(email) => handleFieldChange("email", email)}
                    />
                    <ShippingAddress
                      formData={formData}
                      onChange={handleFieldChange}
                    />
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-8">
                    <ShippingMethod
                      selectedMethod={formData.shippingMethod}
                      onChange={(method) =>
                        handleFieldChange("shippingMethod", method)
                      }
                      subtotal={subtotal}
                    />
                    <PaymentMethod />
                  </div>
                )}

                <div className="flex items-center justify-between pt-6">
                  {step > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(step - 1)}
                      className="gap-2"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back
                    </Button>
                  ) : (
                    <Link href="/cart">
                      <Button variant="outline" className="gap-2">
                        <ChevronLeft className="w-4 h-4" />
                        Return to cart
                      </Button>
                    </Link>
                  )}

                  <Button type="submit" className="gap-2" disabled={isSubmitting}>
                    {step === 2
                      ? isSubmitting
                        ? "Processing..."
                        : "Place Order"
                      : "Continue"}
                    {!isSubmitting && <ChevronRight className="w-4 h-4" />}
                  </Button>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-2">
              <OrderSummary
                cartItems={checkoutCartItems}
                subtotal={subtotal}
                shipping={shipping}
                total={total}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
