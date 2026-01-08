import { ShippingPolicy } from "@/components/shipping/ShippingPolicy";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy | Rugkala",
  description: "Learn about our shipping rates, delivery times, and order policies for our hand-knotted rugs.",
  openGraph: {
    title: "Shipping Policy | Rugkala",
    description: "Learn about our shipping rates, delivery times, and order policies.",
    url: "https://www.rugkala.com/shipping-policy",
    siteName: "Rugkala",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shipping Policy | Rugkala",
    description: "Learn about our shipping rates, delivery times, and order policies.",
  },
  alternates: {
    canonical: "https://www.rugkala.com/shipping-policy",
  },
};

export default function ShippingPolicyPage() {
  return <ShippingPolicy />;
}
