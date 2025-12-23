import {
  ShippingContent,
  ShippingHeader,
} from "@/components/assistance/shipping";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Information",
  description:
    "Learn about Rugstagram's shipping options, delivery times, international shipping, and packaging. We ship handcrafted rugs worldwide with care.",
  keywords: [
    "rug shipping",
    "rug delivery",
    "international rug shipping",
    "rug packaging",
    "shipping information",
  ],
};

export default function ShippingPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 space-y-24">
      <ShippingHeader />
      <ShippingContent />
    </div>
  );
}
