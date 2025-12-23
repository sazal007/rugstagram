"use client";

import React from "react";
import { motion } from "motion/react";
import { useSubCategories } from "@/hooks/use-sub-category";

interface SubCategoryFilterProps {
  categorySlug?: string;
  selectedSubCategories: string[];
  onToggleSubCategory: (slug: string) => void;
}

export const SubCategoryFilter: React.FC<SubCategoryFilterProps> = ({
  categorySlug,
  selectedSubCategories,
  onToggleSubCategory,
}) => {
  const { data: subCategories = [], isLoading } = useSubCategories(categorySlug);

  // If no subcategories found (and not loading), maybe hide the section?
  // For now we'll just render it empty or with a message if needed, 
  // but standard practice is usually to hide if empty.
  if (!isLoading && subCategories.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b pb-2">
        Type
      </h3>
      <div className="space-y-2">
        {isLoading
          ? // Loading skeleton
            [1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-4 h-4 bg-gray-100 animate-pulse" />
                <div className="h-4 w-24 bg-gray-100 animate-pulse rounded" />
              </div>
            ))
          : subCategories.map((sub) => (
              <label
                key={sub.id}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div
                  className={`w-4 h-4 border transition-colors flex items-center justify-center ${
                    selectedSubCategories.includes(sub.slug)
                      ? "bg-primary border-primary"
                      : "border-gray-300 group-hover:border-primary"
                  }`}
                >
                  {selectedSubCategories.includes(sub.slug) && (
                    <div className="w-2 h-2 bg-white" />
                  )}
                </div>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={selectedSubCategories.includes(sub.slug)}
                  onChange={() => onToggleSubCategory(sub.slug)}
                />
                <span
                  className={`text-sm ${
                    selectedSubCategories.includes(sub.slug)
                      ? "text-primary font-medium"
                      : "text-muted group-hover:text-primary"
                  }`}
                >
                  {sub.name}
                </span>
              </label>
            ))}
      </div>
    </motion.div>
  );
};
