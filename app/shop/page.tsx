import { Suspense } from "react";
import { Shop } from "@/components/shop";

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
