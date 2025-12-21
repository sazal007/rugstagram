"use client";

import React from "react";
import { CategoryFilter } from "./CategoryFilter";
import { MaterialFilter } from "./MaterialFilter";

import { Category } from "@/types";

interface FilterSidebarProps {
  isOpen: boolean;
  selectedCategories: Category[];
  selectedMaterials: string[];
  onToggleCategory: (category: string) => void;
  onToggleMaterial: (material: string) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  selectedCategories,
  selectedMaterials,
  onToggleCategory,
  onToggleMaterial,
}) => {
  return (
    <aside
      className={`lg:w-64 flex-shrink-0 ${
        isOpen ? "block" : "hidden"
      } lg:block`}
    >
      <div className="sticky top-32 space-y-8">
        <CategoryFilter
          selectedCategories={selectedCategories}
          onToggleCategory={onToggleCategory}
        />
        <MaterialFilter
          selectedMaterials={selectedMaterials}
          onToggleMaterial={onToggleMaterial}
        />
      </div>
    </aside>
  );
};

