"use client";

import React from "react";
import { CategoryFilter } from "./CategoryFilter";
import { ColorFilter } from "./ColorFilter";

interface FilterSidebarProps {
  isOpen: boolean;
  selectedCategories: string[];
  onToggleCategory: (categorySlug: string) => void;
  selectedColors: string[];
  onToggleColor: (colorSlug: string) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  selectedCategories,
  onToggleCategory,
  selectedColors,
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
          selectedCategories={selectedCategories}
          onToggleCategory={onToggleCategory}
        />
        <ColorFilter
          selectedColors={selectedColors}
          onToggleColor={onToggleColor}
        />
      </div>
    </aside>
  );
};

