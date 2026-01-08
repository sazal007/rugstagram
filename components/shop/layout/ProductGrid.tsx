"use client";

import React, { useMemo } from "react";
import { motion, Variants } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Product, ProductListItem } from "@/types/product";
import { ProductCard } from "../../ProductCard";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

interface ProductGridProps {
  products: (Product | ProductListItem)[];
  fetchWishlist?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, fetchWishlist = true }) => {
  // Create a key based on product IDs to force re-animation when products change
  const productsKey = useMemo(
    () => products.map((p) => p.id).join(","),
    [products]
  );

  return (
    <div className="grow">
      {/* Desktop Sort/Count */}
      <div className="hidden lg:flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
        <span className="text-sm text-muted">{products.length} results</span>
        <div className="flex items-center gap-2 text-sm cursor-pointer hover:text-accent transition-colors">
          Sort by: Featured <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {products.length > 0 ? (
        <motion.div
          key={productsKey}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} fetchWishlist={fetchWishlist} />
            </motion.div>
          ))}
        </motion.div>
      ) : null}
    </div>
  );
};
