"use client";

import React from "react";
import { CategoryFilter } from "./CategoryFilter";

interface FilterSidebarProps {
  isOpen: boolean;
  selectedCategories: string[];
  selectedSubCategories: string[];
  onToggleCategory: (categorySlug: string) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  selectedCategories,
  onToggleCategory,
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
      </div>
    </aside>
  );
};

