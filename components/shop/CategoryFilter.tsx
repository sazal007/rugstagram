"use client";

import React from "react";
import { motion } from "motion/react";
import { useCategories } from "@/hooks/use-category";

interface CategoryFilterProps {
  selectedCategories: string[];
  onToggleCategory: (categorySlug: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategories,
  onToggleCategory,
}) => {
  const { data: categories = [], isLoading, error } = useCategories();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-4 bg-gray-100 animate-pulse w-24 mb-4" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-6 bg-gray-100 animate-pulse w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return null; // Or handle error UI
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b pb-2">
        Collections
      </h3>
      <div className="space-y-2">
        {categories.map((cat) => (
          <label
            key={cat.id}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div
              className={`w-4 h-4 border transition-colors flex items-center justify-center ${
                selectedCategories.includes(cat.slug)
                  ? "bg-primary border-primary"
                  : "border-gray-300 group-hover:border-primary"
              }`}
            >
              {selectedCategories.includes(cat.slug) && (
                <div className="w-2 h-2 bg-white" />
              )}
            </div>
            <input
              type="checkbox"
              className="hidden"
              checked={selectedCategories.includes(cat.slug)}
              onChange={() => onToggleCategory(cat.slug)}
            />
            <span
              className={`text-sm ${
                selectedCategories.includes(cat.slug)
                  ? "text-primary font-medium"
                  : "text-muted group-hover:text-primary"
              }`}
            >
              {cat.name}
            </span>
          </label>
        ))}
      </div>
    </motion.div>
  );
};

