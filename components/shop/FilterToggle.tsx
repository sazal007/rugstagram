"use client";

import React from "react";
import { Filter } from "lucide-react";

interface FilterToggleProps {
  isOpen: boolean;
  onToggle: () => void;
  productCount: number;
}

export const FilterToggle: React.FC<FilterToggleProps> = ({
  isOpen,
  onToggle,
  productCount,
}) => {
  return (
    <div className="lg:hidden flex justify-between items-center mb-6 sticky top-20 bg-background z-30 py-4 border-b">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 text-sm uppercase tracking-wide font-medium hover:text-primary transition-colors"
      >
        <Filter className="w-4 h-4" /> Filters
      </button>
      <span className="text-sm text-muted">{productCount} Products</span>
    </div>
  );
};

