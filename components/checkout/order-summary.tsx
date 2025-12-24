"use client";

import Image from "next/image";
import { CheckoutCartItem } from "./types";

interface OrderSummaryProps {
  cartItems: CheckoutCartItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

export function OrderSummary({
  cartItems,
  subtotal,
  shipping,
  total,
}: OrderSummaryProps) {
  return (
    <div className="sticky top-28 bg-card rounded-3xl border border-border p-6">
      <h2 className="text-lg font-bold mb-4 text-black">Order Summary</h2>

      <div className="space-y-4 mb-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="relative w-16 h-16 bg-secondary rounded-xl overflow-hidden shrink-0">
              <Image
                src={item.image || "/placeholder.jpg"}
                alt={item.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium line-clamp-2 text-black">{item.name}</p>
            </div>
            <p className="font-medium text-black">Rs.{item.price * item.quantity}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-black">Subtotal</span>
          <span className="text-black">Rs.{subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-black">Shipping</span>
          <span className="text-black">{shipping === 0 ? "Free" : `Rs.${shipping}`}</span>
        </div>
        <div className="flex justify-between font-bold text-lg pt-3 border-t border-border">
          <span className="text-black">Total</span>
          <span className="text-black">Rs.{total}</span>
        </div>
      </div>
    </div>
  );
}
