'use client';
import { useState } from "react";
import { CheckoutFormData } from "./types";
import { PhoneInput } from "../ui/phone-input";
import { Input } from "../ui/input";
import { useAuth } from "@/context/AuthContext";
import { Button } from "../ui/button";

interface ShippingAddressProps {
  formData: Pick<
    CheckoutFormData,
    | "firstName"
    | "lastName"
    | "email"
    | "phone"
    | "address"
    | "city"
    | "zipCode"
  >;
  onChange: (field: keyof CheckoutFormData, value: string) => void;
}

export function ShippingAddress({ formData, onChange }: ShippingAddressProps) {
  const [focusedFields, setFocusedFields] = useState<Set<string>>(new Set());

  const handleFocus = (field: string) => {
    setFocusedFields((prev: Set<string>) => new Set(prev).add(field));
  };

  const handleBlur = (field: string) => {
    setFocusedFields((prev: Set<string>) => {
      const newSet = new Set(prev);
      newSet.delete(field);
      return newSet;
    });
  };

  const isLabelFloating = (field: keyof typeof formData) => {
    const value = formData[field];
    return (value !== "" && value !== undefined) || focusedFields.has(field);
  };

  const { user } = useAuth();

  const handleImportProfile = () => {
    if (user) {
      if (user.first_name) onChange("firstName", user.first_name);
      if (user.last_name) onChange("lastName", user.last_name);
      if (user.email) onChange("email", user.email);
      if (user.phone) onChange("phone", user.phone);
      if (user.street_address_1) onChange("address", user.street_address_1);
      if (user.city) onChange("city", user.city);
      if (user.postcode) onChange("zipCode", user.postcode);
    }
  };

  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-soft p-6 sm:p-8 ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Shipping Address
        </h2>
        {user && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleImportProfile}
            type="button"
          >
            Import from Profile
          </Button>
        )}
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <Input
              id="first-name"
              type="text"
              value={formData.firstName}
              onChange={(e) => onChange("firstName", e.target.value)}
              onFocus={() => handleFocus("firstName")}
              onBlur={() => handleBlur("firstName")}
              required
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-foreground bg-transparent rounded-base border border-border appearance-none focus:outline-none focus:ring-0 focus:border-primary h-11"
              placeholder=" "
            />
            <label
              htmlFor="first-name"
              className={`absolute text-sm duration-300 transform origin-left bg-background px-2 start-1 z-10 ${
                isLabelFloating("firstName")
                  ? "-translate-y-4 scale-75 top-2 text-primary"
                  : "scale-100 -translate-y-1/2 top-1/2 text-gray-500"
              }`}
            >
              First Name
            </label>
          </div>
          <div className="relative">
            <Input
              id="last-name"
              type="text"
              value={formData.lastName}
              onChange={(e) => onChange("lastName", e.target.value)}
              onFocus={() => handleFocus("lastName")}
              onBlur={() => handleBlur("lastName")}
              required
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-foreground bg-transparent rounded-base border border-border appearance-none focus:outline-none focus:ring-0 focus:border-primary h-11"
              placeholder=" "
            />
            <label
              htmlFor="last-name"
              className={`absolute text-sm duration-300 transform origin-left bg-background px-2 start-1 z-10 ${
                isLabelFloating("lastName")
                  ? "-translate-y-4 scale-75 top-2 text-primary"
                  : "scale-100 -translate-y-1/2 top-1/2 text-gray-500"
              }`}
            >
              Last Name
            </label>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => onChange("email", e.target.value)}
              onFocus={() => handleFocus("email")}
              onBlur={() => handleBlur("email")}
              required
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-foreground bg-transparent rounded-base border border-border appearance-none focus:outline-none focus:ring-0 focus:border-primary h-11"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className={`absolute text-sm duration-300 transform origin-left bg-background px-2 start-1 z-10 ${
                isLabelFloating("email")
                  ? "-translate-y-4 scale-75 top-2 text-primary"
                  : "scale-100 -translate-y-1/2 top-1/2 text-gray-500"
              }`}
            >
              Email
            </label>
          </div>
          <div
            className="relative"
            onFocus={() => handleFocus("phone")}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                handleBlur("phone");
              }
            }}
          >
            <PhoneInput
              id="phone"
              value={formData.phone}
              onChange={(value) => onChange("phone", value || "")}
              defaultCountry="NP"
              className="w-full"
              placeholder=" "
            />
            <label
              htmlFor="phone"
              className={`absolute text-sm duration-300 transform origin-left bg-background px-2 left-[104px] z-10 pointer-events-none ${
                isLabelFloating("phone")
                  ? "-translate-y-4 scale-75 top-2 text-primary"
                  : "scale-100 -translate-y-1/2 top-1/2 text-gray-500"
              }`}
            >
              Phone
            </label>
          </div>
        </div>
        <div className="relative">
          <Input
            id="address"
            type="text"
            value={formData.address}
            onChange={(e) => onChange("address", e.target.value)}
            onFocus={() => handleFocus("address")}
            onBlur={() => handleBlur("address")}
            required
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-foreground bg-transparent rounded-base border border-border appearance-none focus:outline-none focus:ring-0 focus:border-primary h-11"
            placeholder=" "
          />
          <label
            htmlFor="address"
            className={`absolute text-sm duration-300 transform origin-left bg-background px-2 start-1 z-10 ${
              isLabelFloating("address")
                  ? "-translate-y-4 scale-75 top-2 text-primary"
                  : "scale-100 -translate-y-1/2 top-1/2 text-gray-500"
            }`}
          >
            Address
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative">
            <Input
              id="city"
              type="text"
              value={formData.city}
              onChange={(e) => onChange("city", e.target.value)}
              onFocus={() => handleFocus("city")}
              onBlur={() => handleBlur("city")}
              required
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-foreground bg-transparent rounded-base border border-border appearance-none focus:outline-none focus:ring-0 focus:border-primary h-11"
              placeholder=" "
            />
            <label
              htmlFor="city"
              className={`absolute text-sm duration-300 transform origin-left bg-background px-2 start-1 z-10 ${
                isLabelFloating("city")
                  ? "-translate-y-4 scale-75 top-2 text-primary"
                  : "scale-100 -translate-y-1/2 top-1/2 text-gray-500"
              }`}
            >
              City
            </label>
          </div>
        
          <div className="relative">
            <Input
              id="zip"
              type="text"
              value={formData.zipCode}
              onChange={(e) => onChange("zipCode", e.target.value)}
              onFocus={() => handleFocus("zipCode")}
              onBlur={() => handleBlur("zipCode")}
              required
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-foreground bg-transparent rounded-base border border-border appearance-none focus:outline-none focus:ring-0 focus:border-primary h-11"
              placeholder=" "
            />
            <label
              htmlFor="zip"
              className={`absolute text-sm duration-300 transform origin-left bg-background px-2 start-1 z-10 ${
                isLabelFloating("zipCode")
                  ? "-translate-y-4 scale-75 top-2 text-primary"
                  : "scale-100 -translate-y-1/2 top-1/2 text-gray-500"
              }`}
            >
              Zip Code
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
