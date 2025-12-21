"use client";

import React, { useState, useEffect } from "react";
import { Minus, Plus } from "lucide-react";
import { Product } from "@/types";

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
    <div className="space-y-8 mb-10">
      {/* Size Selector */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="text-xs font-bold uppercase tracking-widest">
            Select Size
          </label>
          <button className="text-xs text-muted underline hover:text-primary">
            Size Guide
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => handleSizeSelect(size)}
              className={`px-6 py-3 text-sm border transition-all ${
                selectedSize === size
                  ? "border-primary bg-primary text-white"
                  : "border-gray-200 hover:border-primary text-gray-600"
              }`}
            >
              {size} cm
            </button>
          ))}
        </div>
      </div>

      {/* Quantity Selector */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest mb-3">
          Quantity
        </label>
        <div className="flex items-center w-36 border border-gray-200">
          <button
            onClick={() => handleQuantity("dec")}
            className="p-4 hover:bg-gray-50 text-muted transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="flex-1 text-center font-medium">{quantity}</span>
          <button
            onClick={() => handleQuantity("inc")}
            className="p-4 hover:bg-gray-50 text-muted transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

