"use client";

import React from "react";
import { motion } from "motion/react";

interface ShopHeaderProps {
  title: string;
  subtitle?: string;
}

export const ShopHeader: React.FC<ShopHeaderProps> = ({ title, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mb-12 text-center max-w-2xl mx-auto flex flex-col items-center justify-center gap-6"
    >
      <span className="text-xs font-bold uppercase tracking-widest text-muted">
        Shop
      </span>
      <div>
        <h1 className="text-4xl md:text-5xl font-serif capitalize">{title}</h1>
        {subtitle && <p className="text-muted leading-relaxed">{subtitle}</p>}
      </div>
    </motion.div>
  );
};
