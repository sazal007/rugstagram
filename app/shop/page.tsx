import { Suspense } from "react";
import { Shop } from "@/components/shop";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse our complete collection of handcrafted Himalayan rugs. Filter by category, material, color, and size. Find the perfect rug for your home.",
  keywords: ["rug shop", "buy rugs", "rug collection", "Himalayan rugs", "wool rugs", "silk rugs", "rug categories"],
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-8 pb-24 max-w-[1400px] mx-auto px-6">Loading...</div>
      }
    >
      <Shop />
    </Suspense>
  );
}
