import { Metadata } from "next";
import { CheckoutPage } from "@/components/checkout";

export const metadata: Metadata = {
  title: "Checkout | Rugstagram",
  description: "Secure checkout for your order",
};

export default function Page() {
  return <CheckoutPage />;
}
