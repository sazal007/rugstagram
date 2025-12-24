"use client";

import { Check, Banknote, Shield, Truck } from "lucide-react";

export function PaymentMethod() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-black">Payment Method</h2>
      <div className="p-5 bg-card/80 backdrop-blur-sm border-2 border-primary rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <Banknote className="w-6 h-6" />
          </div>
          <div>
            <p className="font-bold text-black">Cash on Delivery</p>
            <p className="text-sm text-black/60">
              Pay when you receive your order
            </p>
          </div>
        </div>
        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
          <Check className="w-4 h-4" />
        </div>
      </div>

      <div className="flex items-center gap-6 pt-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Shield className="w-5 h-5" />
          <span>Secure checkout</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Truck className="w-5 h-5" />
          <span>Fast shipping</span>
        </div>
      </div>
    </section>
  );
}
