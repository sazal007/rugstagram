"use client";

import { useCart } from "@/context/CartContext";
import { CustomButton } from "@/components/ui/custom-button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Minus,
  Plus,
  Trash2,
  Package,
  Shield,
  Truck,
  CreditCard,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, subtotal } = useCart();

  const handleUpdateQuantity = (id: string, delta: number) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      updateQuantity(id, Math.max(1, item.quantity + delta));
    }
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  const shipping = 5.99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-background py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Cart Items */}
          <div>
            <div className="mb-8">
              <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-2 text-foreground">
                Shopping Cart
              </h1>
              <p className="text-foreground/70 text-sm md:text-base">
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"}{" "}
                in your cart
              </p>
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-foreground/70 text-lg mb-4">
                  Your cart is empty
                </p>
                <CustomButton
                  href="/shop"
                  variant="outline-primary"
                  size="hero"
                >
                  Continue Shopping
                </CustomButton>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden border border-gray-200"
                  >
                    <div className="flex flex-col sm:flex-row gap-4 p-4 md:p-6">
                      {/* Product Image */}
                      <div className="relative h-40 w-full sm:w-40 shrink-0 overflow-hidden rounded-sm bg-muted">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-serif text-xl md:text-2xl font-semibold mb-1 text-foreground">
                              {item.name}
                            </h3>
                            <p className="text-sm text-foreground/70">
                              {item.variant}
                            </p>
                          </div>
                          <CustomButton
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveItem(item.id)}
                            className="h-10 w-10 shrink-0"
                          >
                            <Trash2 className="h-5 w-5" />
                          </CustomButton>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <CustomButton
                              variant="outline"
                              size="icon"
                              onClick={() => handleUpdateQuantity(item.id, -1)}
                              className="h-10 w-10"
                            >
                              <Minus className="h-4 w-4" />
                            </CustomButton>
                            <span className="w-8 text-center text-lg font-medium text-foreground">
                              {item.quantity}
                            </span>
                            <CustomButton
                              variant="outline"
                              size="icon"
                              onClick={() => handleUpdateQuantity(item.id, 1)}
                              className="h-10 w-10"
                            >
                              <Plus className="h-4 w-4" />
                            </CustomButton>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <div className="font-serif text-2xl font-bold text-foreground">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            {item.originalPrice && (
                              <div className="text-sm text-foreground/50 line-through">
                                $
                                {(item.originalPrice * item.quantity).toFixed(
                                  2
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-8 p-6 border border-gray-200">
              <h2 className="font-serif text-2xl font-bold mb-1 text-foreground">
                Order Summary
              </h2>
              <p className="text-sm text-foreground/70 mb-6">
                Review your order details and shipping information
              </p>

              {/* Shipping Method */}
              <div className="mb-6">
                <h3 className="font-semibold text-sm uppercase tracking-wider mb-3 text-foreground">
                  Shipping Method
                </h3>
                <CustomButton variant="outline" className="flex w-full items-center justify-between rounded-sm border border-gray-200 bg-card p-4 text-left transition-colors hover:bg-accent/5 hover:border-accent">
                  <div>
                    <div className="font-semibold text-sm text-foreground">
                      Standard Shipping
                    </div>
                    <div className="text-sm text-foreground/70">3-5 days</div>
                    <div className="mt-1 font-semibold text-sm text-foreground">
                      ${shipping.toFixed(2)}
                    </div>
                  </div>
                  <ChevronDown className="h-5 w-5 text-foreground/70" />
                </CustomButton>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <h3 className="font-semibold text-sm uppercase tracking-wider mb-3 text-foreground">
                  Promo Code
                </h3>
                <div className="flex gap-2">
                  <Input placeholder="Enter promo code" className="flex-1" />
                  <CustomButton
                    variant="outline"
                    className="px-6 bg-transparent"
                  >
                    Apply
                  </CustomButton>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 border-t border-gray-200 pt-6 mb-6">
                <div className="flex justify-between text-base">
                  <span className="text-foreground/70">Subtotal</span>
                  <span className="font-semibold text-foreground">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-foreground/70">Shipping</span>
                  <span className="font-semibold text-foreground">
                    ${shipping.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-3 text-xl">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="font-bold text-foreground">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 border-t border-gray-200 pt-6 mb-6">
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-accent" />
                  <span className="text-sm text-foreground/70">
                    Free returns within 30 days
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-accent" />
                  <span className="text-sm text-foreground/70">
                    Secure payment
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-accent" />
                  <span className="text-sm text-foreground/70">
                    Fast delivery
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <CustomButton
                className="w-full bg-accent text-white hover:bg-accent/90 uppercase tracking-widest text-xs font-bold"
                size="hero"
                disabled={cartItems.length === 0}
              >
                <CreditCard className="mr-2 h-5 w-5" />
                Proceed to Checkout
              </CustomButton>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
