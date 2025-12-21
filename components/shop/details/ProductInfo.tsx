"use client";

import React from "react";
import { motion } from "motion/react";
import { Product } from "@/types";
import { StarRating } from "./StarRating";

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-serif mb-2">
            {product.name}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-sm text-muted uppercase tracking-wider">
              {product.category} Collection
            </p>
            <div className="flex items-center gap-1">
              <StarRating rating={5} />
              <span className="text-xs text-muted ml-1 underline decoration-gray-300 underline-offset-4 cursor-pointer">
                4 Reviews
              </span>
            </div>
          </div>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-2xl font-serif">
            ${product.price.toLocaleString()}
          </p>
          {product.salePrice && (
            <p className="text-sm text-muted line-through">
              ${product.salePrice.toLocaleString()}
            </p>
          )}
        </div>
      </div>

      <p className="text-gray-600 leading-relaxed mb-8 text-lg font-light">
        Hand-knotted in the Kathmandu Valley, this piece exemplifies the
        masterful artistry of Tibetan weaving. Characterized by a density of{" "}
        {product.knotDensity} knots per square inch, it offers both exceptional
        durability and a luxurious feel underfoot.
      </p>

      {/* Specs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 py-6 border-y border-gray-100">
        <div>
          <span className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">
            Material
          </span>
          <div className="flex flex-wrap gap-2">
            {product.materials.map((m) => (
              <span
                key={m}
                className="inline-block bg-gray-100 px-3 py-1 text-xs rounded-full text-primary font-medium"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
        <div>
          <span className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">
            Quality
          </span>
          <span className="text-sm font-medium">
            {product.knotDensity} Knots / sq. inch
          </span>
        </div>
      </div>
    </motion.div>
  );
};

