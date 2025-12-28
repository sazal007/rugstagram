"use client";

import React from "react";
import { motion } from "motion/react";
import { useColors } from "@/hooks/use-colors";

interface ColorFilterProps {
  selectedColor: string | null;
  onToggleColor: (colorSlug: string) => void;
}

export const ColorFilter: React.FC<ColorFilterProps> = ({
  selectedColor,
  onToggleColor,
}) => {
  const { data: colors = [], isLoading, error } = useColors();

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
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b pb-2">
        Colors
      </h3>
      <div className="space-y-2">
        {colors.map((color) => (
          <label
            key={color.id}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div
              className={`w-4 h-4 border transition-colors flex items-center justify-center ${
                selectedColor === color.slug
                  ? "bg-primary border-primary"
                  : "border-gray-300 group-hover:border-primary"
              }`}
            >
              {selectedColor === color.slug && (
                <div className="w-2 h-2 bg-white" />
              )}
            </div>
            <input
              type="checkbox"
              className="hidden"
              checked={selectedColor === color.slug}
              onChange={() => onToggleColor(color.slug)}
            />
            <span
              className={`text-sm ${
                selectedColor === color.slug
                  ? "text-primary font-medium"
                  : "text-muted group-hover:text-primary"
              }`}
            >
              {color.name}
            </span>
          </label>
        ))}
      </div>
    </motion.div>
  );
};
