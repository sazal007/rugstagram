import { PaymentContent, PaymentHeader } from "@/components/assistance/payment";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Options",
  description:
    "Secure payment options at Rugstagram. We accept credit cards, PayPal, bank transfers, and other payment methods for your convenience.",
  keywords: [
    "rug payment",
    "secure payment",
    "payment options",
    "rug checkout",
    "payment methods",
  ],
};

export default function PaymentPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 space-y-24">
      <PaymentHeader />
      <PaymentContent />
    </div>
  );
}
