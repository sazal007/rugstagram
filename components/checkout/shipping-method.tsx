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
    label: "Free Shipping",
    price: "$0",
    time: "7-20 Days",
  },
  {
    id: "express",
    label: "Express Shipping",
    price: "$9",
    time: "1-3 Days",
  },
];

export function ShippingMethod({
  selectedMethod,
  onChange,
}: ShippingMethodProps) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-soft p-6 sm:p-8 border border-transparent dark:border-border-dark">
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Shipping Method</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {shippingOptions.map((option) => (
          <label
            key={option.id}
            className="relative flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-gray-200 dark:border-border-dark has-checked:border-primary has-checked:ring-1 has-checked:ring-primary"
          >
            <input
              checked={selectedMethod === option.id}
              className="h-4 w-4 text-primary border-gray-300 focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
              name="shipping-method"
              type="radio"
              onChange={() => onChange(option.id)}
            />
            <div className="ml-4 flex-1">
              <span className="block text-sm font-semibold text-gray-900 dark:text-white">{option.label}</span>
              <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">{option.time}</span>
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{option.price}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
