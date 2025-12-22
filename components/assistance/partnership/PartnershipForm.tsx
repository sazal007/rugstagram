"use client";

import type React from "react";

import { useState } from "react";
import { CustomButton } from "@/components/ui/custom-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PhoneInput } from "@/components/ui/phone-input";
import type * as RPNInput from "react-phone-number-input";

export const PartnershipForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    streetAddress: "",
    streetAddress2: "",
    city: "",
    stateRegion: "",
    postalCode: "",
    country: "United States",
    phone: "" as RPNInput.Value,
    email: "",
    comments: "",
  });

  const [focusedFields, setFocusedFields] = useState<Set<string>>(new Set());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (field: string, value: string | RPNInput.Value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFocus = (field: string) => {
    setFocusedFields((prev) => new Set(prev).add(field));
  };

  const handleBlur = (field: string) => {
    setFocusedFields((prev) => {
      const newSet = new Set(prev);
      newSet.delete(field);
      return newSet;
    });
  };

  const isLabelFloating = (field: string) => {
    return (
      formData[field as keyof typeof formData] !== "" ||
      focusedFields.has(field)
    );
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-3xl space-y-6">
        {/* Full Name */}
        <div>
          <div className="relative">
            <input
              type="text"
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              onFocus={() => handleFocus("fullName")}
              onBlur={() => handleBlur("fullName")}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-foreground bg-transparent rounded-base border border-border appearance-none focus:outline-none focus:ring-0 focus:border-primary"
              placeholder=" "
              required
            />
            <label
              htmlFor="fullName"
              className={`absolute text-sm duration-300 transform origin-left bg-background px-2 start-1 z-10 ${
                isLabelFloating("fullName")
                  ? "-translate-y-4 scale-75 top-2 text-primary"
                  : "scale-100 -translate-y-1/2 top-1/2 text-gray-500"
              }`}
            >
              Full Name
            </label>
          </div>
        </div>

        {/* Address */}
        <div>
          <div className="space-y-6">
            <div className="relative">
              <input
                type="text"
                id="streetAddress"
                value={formData.streetAddress}
                onChange={(e) =>
                  handleInputChange("streetAddress", e.target.value)
                }
                onFocus={() => handleFocus("streetAddress")}
                onBlur={() => handleBlur("streetAddress")}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-foreground bg-transparent rounded-base border border-border appearance-none focus:outline-none focus:ring-0 focus:border-primary"
                placeholder=" "
                required
              />
              <label
                htmlFor="streetAddress"
                className={`absolute text-sm duration-300 transform origin-left bg-background px-2 start-1 z-10 ${
                  isLabelFloating("streetAddress")
                    ? "-translate-y-4 scale-75 top-2 text-primary"
                    : "scale-100 -translate-y-1/2 top-1/2 text-gray-500"
                }`}
              >
                Street Address
              </label>
            </div>

            <div className="relative">
              <input
                type="text"
                id="streetAddress2"
                value={formData.streetAddress2}
                onChange={(e) =>
                  handleInputChange("streetAddress2", e.target.value)
                }
                onFocus={() => handleFocus("streetAddress2")}
                onBlur={() => handleBlur("streetAddress2")}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-foreground bg-transparent rounded-base border border-border appearance-none focus:outline-none focus:ring-0 focus:border-primary"
                placeholder=" "
              />
              <label
                htmlFor="streetAddress2"
                className={`absolute text-sm duration-300 transform origin-left bg-background px-2 start-1 z-10 ${
                  isLabelFloating("streetAddress2")
                    ? "-translate-y-4 scale-75 top-2 text-primary"
                    : "scale-100 -translate-y-1/2 top-1/2 text-gray-500"
                }`}
              >
                Street Address 2
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <input
                  type="text"
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  onFocus={() => handleFocus("city")}
                  onBlur={() => handleBlur("city")}
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-foreground bg-transparent rounded-base border border-border appearance-none focus:outline-none focus:ring-0 focus:border-primary"
                  placeholder=" "
                  required
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
                <input
                  type="text"
                  id="stateRegion"
                  value={formData.stateRegion}
                  onChange={(e) =>
                    handleInputChange("stateRegion", e.target.value)
                  }
                  onFocus={() => handleFocus("stateRegion")}
                  onBlur={() => handleBlur("stateRegion")}
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-foreground bg-transparent rounded-base border border-border appearance-none focus:outline-none focus:ring-0 focus:border-primary"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="stateRegion"
                  className={`absolute text-sm duration-300 transform origin-left bg-background px-2 start-1 z-10 ${
                    isLabelFloating("stateRegion")
                      ? "-translate-y-4 scale-75 top-2 text-primary"
                      : "scale-100 -translate-y-1/2 top-1/2 text-gray-500"
                  }`}
                >
                  State / Region
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <input
                  type="text"
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={(e) =>
                    handleInputChange("postalCode", e.target.value)
                  }
                  onFocus={() => handleFocus("postalCode")}
                  onBlur={() => handleBlur("postalCode")}
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-foreground bg-transparent rounded-base border border-border appearance-none focus:outline-none focus:ring-0 focus:border-primary"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="postalCode"
                  className={`absolute text-sm duration-300 transform origin-left bg-background px-2 start-1 z-10 ${
                    isLabelFloating("postalCode")
                      ? "-translate-y-4 scale-75 top-2 text-primary"
                      : "scale-100 -translate-y-1/2 top-1/2 text-gray-500"
                  }`}
                >
                  Postal / Zip Code
                </label>
              </div>

              <div className="relative">
                <Select
                  value={formData.country}
                  onValueChange={(value) => handleInputChange("country", value)}
                  onOpenChange={(open) => {
                    if (open) {
                      handleFocus("country");
                    } else {
                      handleBlur("country");
                    }
                  }}
                >
                  <SelectTrigger className="block! w-full! px-2.5! pb-2.5! pt-4! h-[52px]! text-sm! text-foreground! bg-transparent! border! border-border! rounded-base! appearance-none! outline-none! focus-visible:ring-0! focus-visible:border-primary! shadow-none! data-[size=default]:h-[52px]!">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="United States">United States</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="United Kingdom">
                      United Kingdom
                    </SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                    <SelectItem value="Nepal">Nepal</SelectItem>
                    <SelectItem value="India">India</SelectItem>
                  </SelectContent>
                </Select>
                <label
                  className={`absolute text-sm duration-300 transform origin-left bg-background px-2 start-1 z-10 ${
                    formData.country !== "" || focusedFields.has("country")
                      ? "-translate-y-4 scale-75 top-2 text-primary"
                      : "scale-100 -translate-y-1/2 top-1/2 text-gray-500"
                  }`}
                >
                  Country
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Phone and Email in one div */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Phone */}
          <div>
            <div
              className="relative"
              onFocus={() => handleFocus("phone")}
              onBlur={(e) => {
                // Only blur if focus is not moving to a child element
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  handleBlur("phone");
                }
              }}
            >
              <PhoneInput
                id="phone"
                value={formData.phone}
                onChange={(value) => handleInputChange("phone", value || "")}
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

          {/* Email */}
          <div>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                onFocus={() => handleFocus("email")}
                onBlur={() => handleBlur("email")}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-foreground bg-transparent rounded-base border border-border appearance-none focus:outline-none focus:ring-0 focus:border-primary"
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
          </div>
        </div>

        {/* Comments */}
        <div>
          <div className="relative">
            <textarea
              id="comments"
              value={formData.comments}
              onChange={(e) => handleInputChange("comments", e.target.value)}
              onFocus={() => handleFocus("comments")}
              onBlur={() => handleBlur("comments")}
              rows={4}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-foreground bg-transparent rounded-base border border-border appearance-none focus:outline-none focus:ring-0 focus:border-primary resize-none"
              placeholder=" "
              required
            />
            <label
              htmlFor="comments"
              className={`absolute text-sm duration-300 transform origin-left bg-background px-2 start-1 z-10 ${
                isLabelFloating("comments")
                  ? "-translate-y-4 scale-75 top-2 text-primary"
                  : "scale-100 -translate-y-1/2 top-1/2 text-gray-500"
              }`}
            >
              Your Comments
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <CustomButton
          type="submit"
          variant="sand"
          size="hero"
          className="w-full"
        >
          Submit
        </CustomButton>
      </form>
    </div>
  );
};
