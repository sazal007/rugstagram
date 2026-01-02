"use client";

import { Wishlist as NewWishlist } from "@/components/wishlist/wishlist";

export function Wishlist() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden min-h-[500px]">
      <div className="p-4 md:p-8">
        <h2 className="text-xl font-bold text-slate-900 mb-8 px-2 md:px-0">My Wishlist</h2>
        <NewWishlist />
      </div>
    </div>
  );
}
