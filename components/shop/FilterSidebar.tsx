"use client";

import React from "react";
import { CategoryFilter } from "./CategoryFilter";
import { ColorFilter } from "./ColorFilter";

interface FilterSidebarProps {
  isOpen: boolean;
  selectedCategory: string | null;
  onToggleCategory: (categorySlug: string) => void;
  selectedColor: string | null;
  onToggleColor: (colorSlug: string) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  selectedCategory,
  onToggleCategory,
  selectedColor,
  onToggleColor,
}) => {
  return (
    <aside
      className={`lg:w-64 shrink-0 ${
        isOpen ? "block" : "hidden"
      } lg:block`}
    >
      <div className="sticky top-32 space-y-8">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onToggleCategory={onToggleCategory}
        />
        <ColorFilter
          selectedColor={selectedColor}
          onToggleColor={onToggleColor}
        />
      </div>
    </aside>
  );
};

