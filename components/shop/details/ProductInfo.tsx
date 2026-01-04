"use client";

import React from "react";
import { motion } from "motion/react";
import { Product, Color } from "@/types/product";
import { StarRating } from "./StarRating";

interface ProductInfoProps {
  product: Product;
  selectedColor: Color | null | undefined;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product, selectedColor }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif mb-1.5 sm:mb-2">
            {product.name}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1">
              <StarRating rating={5} />
              <span className="text-[10px] sm:text-xs text-muted ml-1 underline decoration-gray-300 underline-offset-4 cursor-pointer">
                Reviews
              </span>
            </div>
          </div>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-xl sm:text-2xl font-serif">
            ${product.price ? parseFloat(product.price).toLocaleString() : "N/A"}
          </p>
          {product.sale_price && (
            <p className="text-xs sm:text-sm text-muted line-through">
              ${parseFloat(product.sale_price).toLocaleString()}
            </p>
          )}
        </div>
      </div>

      <p className="text-gray-600 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base md:text-lg font-light">
        Hand-knotted in the Kathmandu Valley, this piece exemplifies the
        masterful artistry of Tibetan weaving. Characterized by a density of{" "}
        {product.quality?.name || "100"} knots per square inch, it offers both exceptional
        durability and a luxurious feel underfoot.
      </p>

      {/* Specs Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-y-6 gap-x-4 sm:gap-x-8 mb-6 sm:mb-8 py-4 sm:py-6 border-y border-gray-100">
        <div>
          <span className="block text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted mb-1.5 sm:mb-2">
            Collection
          </span>
          <span className="text-xs sm:text-sm font-medium">
            {product.collection?.name || "N/A"}
          </span>
        </div>
        <div>
          <span className="block text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted mb-1.5 sm:mb-2">
            Material
          </span>
          <span className="text-xs sm:text-sm font-medium">
            {product.material?.name || "N/A"}
          </span>
        </div>
        <div>
          <span className="block text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted mb-1.5 sm:mb-2">
            Weaving
          </span>
          <span className="text-xs sm:text-sm font-medium">
            Hand-knotted
          </span>
        </div>
        <div>
          <span className="block text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted mb-1.5 sm:mb-2">
            Pile Thickness
          </span>
          <span className="text-xs sm:text-sm font-medium">
            {product.pile_height?.name || "N/A"}
          </span>
        </div>
        <div>
          <span className="block text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted mb-1.5 sm:mb-2">
            Knot Count
          </span>
          <span className="text-xs sm:text-sm font-medium">
             {product.quality?.name || "N/A"}
          </span>
        </div>
        <div>
          <span className="block text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted mb-1.5 sm:mb-2">
            Color
          </span>
          <span className="text-xs sm:text-sm font-medium">
            {selectedColor?.name || "N/A"}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

