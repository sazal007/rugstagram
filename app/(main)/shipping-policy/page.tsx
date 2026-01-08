import { ShippingPolicy } from "@/components/shipping/ShippingPolicy";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy | Rugkala",
  description: "Learn about our shipping rates, delivery times, and order policies.",
};

export default function ShippingPolicyPage() {
  return <ShippingPolicy />;
}
