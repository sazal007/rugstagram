"use client";

import React from "react";
import { motion } from "motion/react";

interface EmptyStateProps {
  onClearFilters: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onClearFilters }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-24 bg-gray-50"
    >
      <h3 className="text-xl font-serif mb-2">No products found</h3>
      <p className="text-muted mb-6">
        Try adjusting your filters to see more results.
      </p>
      <button
        onClick={onClearFilters}
        className="text-sm uppercase font-bold border-b border-primary hover:text-accent hover:border-accent transition-colors"
      >
        Clear all filters
      </button>
    </motion.div>
  );
};

