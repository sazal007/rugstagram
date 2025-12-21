"use client";

import React from "react";
import { motion } from "motion/react";
import { Category } from "@/types";

interface CategoryFilterProps {
  selectedCategories: Category[];
  onToggleCategory: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategories,
  onToggleCategory,
}) => {
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
        {Object.values(Category).map((cat) => (
          <label
            key={cat}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div
              className={`w-4 h-4 border transition-colors flex items-center justify-center ${
                selectedCategories.includes(cat)
                  ? "bg-primary border-primary"
                  : "border-gray-300 group-hover:border-primary"
              }`}
            >
              {selectedCategories.includes(cat) && (
                <div className="w-2 h-2 bg-white" />
              )}
            </div>
            <input
              type="checkbox"
              className="hidden"
              checked={selectedCategories.includes(cat)}
              onChange={() => onToggleCategory(cat)}
            />
            <span
              className={`text-sm ${
                selectedCategories.includes(cat)
                  ? "text-primary font-medium"
                  : "text-muted group-hover:text-primary"
              }`}
            >
              {cat}
            </span>
          </label>
        ))}
      </div>
    </motion.div>
  );
};

