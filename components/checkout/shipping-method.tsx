"use client";

import { ShippingOption } from "./types";

interface ShippingMethodProps {
  selectedMethod: "standard" | "express";
  onChange: (method: "standard" | "express") => void;
  subtotal: number;
}

const shippingOptions: ShippingOption[] = [
  {
    id: "standard",
    label: "Standard Shipping",
    price: "Free",
    time: "5-7 business days",
  },
  {
    id: "express",
    label: "Express Shipping",
    price: "Rs.200",
    time: "2-3 business days",
  },
];

export function ShippingMethod({
  selectedMethod,
  onChange,
  subtotal,
}: ShippingMethodProps) {
  const getPrice = (option: ShippingOption) => {
    if (option.id === "standard" && subtotal >= 50) {
      return "Free";
    }
    return option.id === "standard" ? "$5.99" : option.price;
  };

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-bold text-black">Shipping Method</h2>
      <div className="space-y-3">
        {shippingOptions.map((option) => (
          <label
            key={option.id}
            className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
              selectedMethod === option.id
                ? "border-primary bg-secondary"
                : "border-border hover:border-muted-foreground"
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="shipping"
                value={option.id}
                checked={selectedMethod === option.id}
                onChange={() => onChange(option.id)}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedMethod === option.id
                    ? "border-primary"
                    : "border-border"
                }`}
              >
                {selectedMethod === option.id && (
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                )}
              </div>
              <div>
                <p className="font-medium text-black">{option.label}</p>
                <p className="text-sm text-black/60">{option.time}</p>
              </div>
            </div>
            <span className="font-medium text-black">{getPrice(option)}</span>
          </label>
        ))}
      </div>
    </section>
  );
}
