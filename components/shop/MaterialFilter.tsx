"use client";

import React from "react";
import { motion } from "motion/react";

interface MaterialFilterProps {
  selectedMaterials: string[];
  onToggleMaterial: (material: string) => void;
}

const materials = ["Wool", "Silk", "Linen", "Hemp", "Allo"];

export const MaterialFilter: React.FC<MaterialFilterProps> = ({
  selectedMaterials,
  onToggleMaterial,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b pb-2">
        Materials
      </h3>
      <div className="space-y-2">
        {materials.map((mat) => (
          <label
            key={mat}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div
              className={`w-4 h-4 border transition-colors flex items-center justify-center ${
                selectedMaterials.includes(mat)
                  ? "bg-primary border-primary"
                  : "border-gray-300 group-hover:border-primary"
              }`}
            >
              {selectedMaterials.includes(mat) && (
                <div className="w-2 h-2 bg-white" />
              )}
            </div>
            <input
              type="checkbox"
              className="hidden"
              checked={selectedMaterials.includes(mat)}
              onChange={() => onToggleMaterial(mat)}
            />
            <span
              className={`text-sm ${
                selectedMaterials.includes(mat)
                  ? "text-primary font-medium"
                  : "text-muted group-hover:text-primary"
              }`}
            >
              {mat}
            </span>
          </label>
        ))}
      </div>
    </motion.div>
  );
};

