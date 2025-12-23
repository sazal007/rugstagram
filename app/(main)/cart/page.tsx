import { CartPageClient } from "./CartPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description:
    "Review your selected handcrafted rugs in your shopping cart. Update quantities, apply promo codes, and proceed to secure checkout.",
  keywords: ["shopping cart", "rug cart", "checkout", "rug purchase"],
  robots: {
    index: false,
    follow: false,
  },
};

export default function CartPage() {
  return <CartPageClient />;
}
