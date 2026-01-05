"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckoutCartItem } from "./types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface OrderSummaryProps {
  cartItems: CheckoutCartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function OrderSummary({
  cartItems,
  subtotal,
  shipping,
  total,
  onSubmit,
  isSubmitting,
}: OrderSummaryProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const isLabelFloating = discountCode !== "" || isFocused;

  return (
    <Card className="sticky border-transparent dark:border-border-dark shadow-soft">
      <CardHeader>
        <CardTitle>Order summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 mb-8">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 items-start">
              <div className="relative shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <Image
                  alt={item.name}
                  className="w-full h-full object-cover p-2"
                  src={item.image || "/placeholder.jpg"}
                  width={80}
                  height={80}
                />
              </div>
              
              <div className="flex-1 min-w-0 flex flex-col justify-between h-20">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.name}</h3>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-md">
                    <button
                      type="button"
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 transition-colors"
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                    <button
                      type="button"
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                onClick={() => removeFromCart(item.id)}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>


        <Separator className="my-6" />

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
            <span className="font-medium text-gray-900 dark:text-white">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Shipping</span>
            <span className="font-medium text-gray-900 dark:text-white">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
          <span className="text-xl font-bold text-gray-900 dark:text-white">${total.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full text-lg py-6"
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Continue to Payment"}
        </Button>
      </CardFooter>
    </Card>
  );
}
