"use client";

import { PaymentHeader, PaymentContent } from "@/components/assistance/payment";

export default function PaymentPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 space-y-24">
      <PaymentHeader />
      <PaymentContent />
    </div>
  );
}
