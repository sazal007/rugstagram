"use client";

import { CheckoutFormData } from "./types";

interface ShippingAddressProps {
  formData: Pick<CheckoutFormData, "firstName" | "lastName" | "address" | "city" | "zipCode" | "phone">;
  onChange: (field: keyof CheckoutFormData, value: string) => void;
}

export function ShippingAddress({ formData, onChange }: ShippingAddressProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-black">Shipping Address</h2>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="First name"
          value={formData.firstName}
          onChange={(e) => onChange("firstName", e.target.value)}
          className="px-4 py-4 bg-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
          required
        />
        <input
          type="text"
          placeholder="Last name"
          value={formData.lastName}
          onChange={(e) => onChange("lastName", e.target.value)}
          className="px-4 py-4 bg-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
          required
        />
      </div>
      <input
        type="text"
        placeholder="Address"
        value={formData.address}
        onChange={(e) => onChange("address", e.target.value)}
        className="w-full mt-4 px-4 py-4 bg-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
        required
      />
      <div className="grid grid-cols-2 gap-4 mt-4">
        <input
          type="text"
          placeholder="City"
          value={formData.city}
          onChange={(e) => onChange("city", e.target.value)}
          className="px-4 py-4 bg-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
          required
        />
        <input
          type="text"
          placeholder="ZIP code"
          value={formData.zipCode}
          onChange={(e) => onChange("zipCode", e.target.value)}
          className="px-4 py-4 bg-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
          required
        />
      </div>
      <input
        type="tel"
        placeholder="Phone number"
        value={formData.phone}
        onChange={(e) => onChange("phone", e.target.value)}
        className="w-full mt-4 px-4 py-4 bg-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
        required
      />
    </div>
  );
}
