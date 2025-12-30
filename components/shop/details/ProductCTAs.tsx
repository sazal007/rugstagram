"use client";

import React from "react";
import { ShoppingBag, Share2 } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/product";

interface ProductCTAsProps {
  product: Product;
  selectedSize: string;
  quantity: number;
  selectedColor: Product["variants"][0]["color"] | null;
}

export const ProductCTAs: React.FC<ProductCTAsProps> = ({
  product,
  selectedSize,
  quantity,
  selectedColor,
}) => {
  const { addToCart } = useCart();

  const handleAddToBag = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    
    // Transform selectedColor to match CartContext expected type if needed
    // The types/product.ts Color interface has name, slug, image
    // Product["variants"][0]["color"] is consistent with that
    const colorForCart = selectedColor ? {
        name: selectedColor.name,
        slug: selectedColor.slug || "", // Handle null slug if necessary
        image: selectedColor.image
    } : undefined;

    addToCart(product, selectedSize, quantity, colorForCart);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12">
      <CustomButton
        onClick={handleAddToBag}
        variant="default"
        size="hero"
        className="flex-1 uppercase tracking-widest text-[10px] sm:text-xs font-bold shadow-lg shadow-accent/20 bg-accent hover:bg-primary py-3 sm:py-4"
      >
        <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Add to Bag
      </CustomButton>
      <CustomButton
        variant="outline"
        size="lg"
        className="px-4 sm:px-6 py-3 sm:py-4"
        aria-label="Share"
      >
        <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-muted" />
      </CustomButton>
    </div>
  );
};
