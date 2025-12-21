"use client";

import React from "react";
import { ShoppingBag, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCTAsProps {
  onAddToBag: () => void;
}

export const ProductCTAs: React.FC<ProductCTAsProps> = ({ onAddToBag }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12">
      <Button
        onClick={onAddToBag}
        variant="default"
        size="hero"
        className="flex-1 uppercase tracking-widest text-[10px] sm:text-xs font-bold shadow-lg shadow-accent/20 bg-accent hover:bg-primary py-3 sm:py-4"
      >
        <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Add to Bag
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="px-4 sm:px-6 py-3 sm:py-4"
        aria-label="Share"
      >
        <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-muted" />
      </Button>
    </div>
  );
};

