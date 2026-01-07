"use client";

import React, { useState, useEffect } from "react";
import { Minus, Plus } from "lucide-react";
import { Product, Size } from "@/types/product";
import { CustomButton } from "@/components/ui/custom-button";
import { useSizes } from "@/hooks/use-sizes";
import { cn } from "@/lib/utils";

interface ProductSelectorsProps {
  product: Product;
  onSizeChange?: (size: Size) => void;
  onQuantityChange?: (quantity: number) => void;
}

type Unit = "cm" | "ft" | "in";

export const ProductSelectors: React.FC<ProductSelectorsProps> = ({
  product,
  onSizeChange,
  onQuantityChange,
}) => {
  const { data: allSizes, isLoading: isLoadingSizes } = useSizes();
  const [selectedSizeId, setSelectedSizeId] = useState<number | null>(product.size?.id || null);
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState<Unit>("cm");

  // Notify parent of initial selection or when sizes are loaded
  useEffect(() => {
    if (allSizes && allSizes.length > 0) {
      const initialSize = allSizes.find(s => s.id === product.size?.id) || allSizes[0];
      if (initialSize) {
        setSelectedSizeId(initialSize.id);
        onSizeChange?.(initialSize);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allSizes, product.size?.id]);

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

  const handleSizeSelect = (size: Size) => {
    setSelectedSizeId(size.id);
    onSizeChange?.(size);
  };

  const formatSize = (name: string, unit: Unit): string => {
    // Clean the name: remove "cm", trim spaces, lower case
    const cleanName = name.toLowerCase().replace(/cm/g, "").trim();
    
    // Determine separator: "x", "*", or maybe just space if 2 numbers
    const separator = cleanName.includes("*") ? "*" : "x";
    
    // If name doesn't contain separator, return as is (unless we want to try parsing single number?)
    if (!cleanName.includes(separator)) return name;
    
    // Parse dimensions
    const parts = cleanName.split(separator).map(p => parseFloat(p.trim()));
    if (parts.length !== 2 || parts.some(isNaN)) return name;

    const [w, l] = parts;

    switch (unit) {
        case "cm":
            return `${w} x ${l} cm`;
        case "in":
            return `${(w / 2.54).toFixed(0)}" x ${(l / 2.54).toFixed(0)}"`;
        case "ft":
            return `${(w / 30.48).toFixed(1)}' x ${(l / 30.48).toFixed(1)}'`;
        default:
            return name;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-10">
      {/* Size Selector */}
      <div>
        <div className="flex justify-start items-center gap-4 mb-2 sm:mb-3">
          <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-900">
            Select Size
          </label>
           {/* Unit Toggle */}
           <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
             {(["cm", "ft", "in"] as Unit[]).map((u) => (
                 <button
                    key={u}
                    onClick={() => setUnit(u)}
                    className={cn(
                        "px-2 py-1 text-[10px] uppercase font-medium rounded-md transition-all",
                        unit === u 
                            ? "bg-white text-primary shadow-sm" 
                            : "text-gray-500 hover:text-gray-700"
                    )}
                 >
                     {u}
                 </button>
             ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {isLoadingSizes ? (
            <div className="flex gap-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-20 h-10 bg-gray-100 animate-pulse rounded-md" />
              ))}
            </div>
          ) : (
            allSizes?.map((size) => (
              <CustomButton
                key={size.id}
                onClick={() => handleSizeSelect(size)}
                variant={selectedSizeId === size.id ? "default" : "outline"}
                size="sm"
                className={`px-3 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm transition-all ${
                  selectedSizeId === size.id
                    ? "border-primary bg-primary text-white"
                    : "border-gray-200 hover:border-primary text-gray-600"
                }`}
              >
                {formatSize(size.name, unit)}
              </CustomButton>
            ))
          )}
        </div>
      </div>

      {/* Quantity Selector */}
      <div>
        <label className="block text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-2 sm:mb-3 text-gray-900">
          Quantity
        </label>
        <div className="flex items-center w-28 sm:w-36 border border-gray-200 rounded-lg overflow-hidden bg-white">
          <CustomButton
            variant="ghost"
            size="icon-sm"
            onClick={() => handleQuantity("dec")}
            className="p-2 sm:p-4 hover:bg-gray-50 text-muted transition-colors rounded-none"
            disabled={quantity <= 1}
          >
            <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </CustomButton>
          <span className="flex-1 text-center font-medium text-sm sm:text-base">{quantity}</span>
          <CustomButton
            variant="ghost"
            size="icon-sm"
            onClick={() => handleQuantity("inc")}
            className="p-2 sm:p-4 hover:bg-gray-50 text-muted transition-colors rounded-none"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

