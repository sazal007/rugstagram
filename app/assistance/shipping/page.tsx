"use client";

import {
  ShippingHeader,
  ShippingContent,
} from "@/components/assistance/shipping";

export default function ShippingPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 space-y-24">
      <ShippingHeader />
      <ShippingContent />
    </div>
  );
}
