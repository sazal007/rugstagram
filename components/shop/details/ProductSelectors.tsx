"use client";

import React, { useState, useEffect } from "react";
import { Minus, Plus } from "lucide-react";
import { Product } from "@/types/product";
import { CustomButton } from "@/components/ui/custom-button";

interface ProductSelectorsProps {
  product: Product;
  colors?: Product["variants"][0]["color"][];
  selectedColor?: Product["variants"][0]["color"] | null;
  onColorChange?: (color: Product["variants"][0]["color"]) => void;
  onSizeChange?: (size: string) => void;
  onQuantityChange?: (quantity: number) => void;
}

export const ProductSelectors: React.FC<ProductSelectorsProps> = ({
  product,
  colors = [],
  selectedColor,
  onColorChange,
  onSizeChange,
  onQuantityChange,
}) => {
  // Use real size from product (it's a single size, not an array)
  const sizes = product.size ? [product.size.name] : [];

  const [selectedSize, setSelectedSize] = useState<string>(sizes[0] || "");
  const [quantity, setQuantity] = useState(1);

  // Notify parent of initial selection
  useEffect(() => {
    if (sizes.length > 0) {
      onSizeChange?.(sizes[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

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
      {/* Color Selector */}
      {colors.length > 0 && (
        <div>
          <label className="block text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-2 sm:mb-3">
            Select Color: <span className="text-gray-500 font-normal normal-case ml-1">{selectedColor?.name}</span>
          </label>
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => {
              if (!color) return null;
              const isSelected = selectedColor?.id === color.id;
              
              return (
                <button
                  key={color.id}
                  onClick={() => onColorChange?.(color)}
                  className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden transition-all duration-200 border-2 ${
                    isSelected
                      ? "border-primary ring-1 ring-primary ring-offset-2"
                      : "border-transparent hover:border-gray-300"
                  }`}
                  title={color.name}
                  aria-label={`Select color ${color.name}`}
                >
                  {color.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                      src={color.image} 
                      alt={color.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-[8px]">
                      {color.name.slice(0, 2)}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Size Selector */}
      <div>
        <div className="flex justify-between items-center mb-2 sm:mb-3">
          <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest">
            Select Size
          </label>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {sizes.map((size) => (
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

