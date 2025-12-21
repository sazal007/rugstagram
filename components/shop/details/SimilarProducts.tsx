"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { PRODUCTS } from "@/constants";
import { Product } from "@/types";
import { ProductCard } from "@/components/ProductCard";

interface SimilarProductsProps {
  currentProduct: Product;
}

export const SimilarProducts: React.FC<SimilarProductsProps> = ({
  currentProduct,
}) => {
  const similarProducts = useMemo(() => {
    let similar = PRODUCTS.filter(
      (p) => p.category === currentProduct.category && p.id !== currentProduct.id
    );

    // If not enough similar products, fill with others
    if (similar.length < 3) {
      const remaining = PRODUCTS.filter(
        (p) => p.id !== currentProduct.id && !similar.includes(p)
      );
      similar = [...similar, ...remaining].slice(0, 3);
    }

    return similar;
  }, [currentProduct]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="pt-16"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
        <h2 className="text-3xl font-serif">You May Also Like</h2>
        <Link
          href="/shop"
          className="text-sm border-b border-primary pb-1 hover:text-accent hover:border-accent transition-colors"
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {similarProducts.map((similar) => (
          <ProductCard key={similar.id} product={similar} />
        ))}
      </div>
    </motion.section>
  );
};

