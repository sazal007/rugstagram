"use client";

import React, { useState, useEffect } from "react";
import { Minus, Plus } from "lucide-react";
import { Product } from "@/types";
import { CustomButton } from "@/components/ui/custom-button";

interface ProductSelectorsProps {
  product: Product;
  onSizeChange?: (size: string) => void;
  onQuantityChange?: (quantity: number) => void;
}

export const ProductSelectors: React.FC<ProductSelectorsProps> = ({
  product,
  onSizeChange,
  onQuantityChange,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
      onSizeChange?.(product.sizes[0]);
    }
  }, [product.sizes, onSizeChange]);

  useEffect(() => {
    onQuantityChange?.(quantity);
  }, [quantity, onQuantityChange]);

  const handleQuantity = (type: "inc" | "dec") => {
    if (type === "inc") {
      setQuantity((q) => q + 1);
    }
    if (type === "dec" && quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    onSizeChange?.(size);
  };

  return (
    <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-10">
      {/* Size Selector */}
      <div>
        <div className="flex justify-between items-center mb-2 sm:mb-3">
          <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest">
            Select Size
          </label>
          <CustomButton
            variant="link"
            size="sm"
            className="text-[10px] sm:text-xs text-muted underline hover:text-primary p-0 h-auto"
          >
            Size Guide
          </CustomButton>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {product.sizes.map((size) => (
            <CustomButton
              key={size}
              onClick={() => handleSizeSelect(size)}
              variant={selectedSize === size ? "default" : "outline"}
              size="sm"
              className={`px-3 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm transition-all ${
                selectedSize === size
                  ? "border-primary bg-primary text-white"
                  : "border-gray-200 hover:border-primary text-gray-600"
              }`}
            >
              {size} cm
            </CustomButton>
          ))}
        </div>
      </div>

      {/* Quantity Selector */}
      <div>
        <label className="block text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-2 sm:mb-3">
          Quantity
        </label>
        <div className="flex items-center w-28 sm:w-36 border border-gray-200">
          <CustomButton
            variant="ghost"
            size="icon-sm"
            onClick={() => handleQuantity("dec")}
            className="p-2 sm:p-4 hover:bg-gray-50 text-muted transition-colors"
            disabled={quantity <= 1}
          >
            <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </CustomButton>
          <span className="flex-1 text-center font-medium text-sm sm:text-base">{quantity}</span>
          <CustomButton
            variant="ghost"
            size="icon-sm"
            onClick={() => handleQuantity("inc")}
            className="p-2 sm:p-4 hover:bg-gray-50 text-muted transition-colors"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

