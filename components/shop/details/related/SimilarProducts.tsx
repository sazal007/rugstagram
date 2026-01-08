"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { Product, ProductListItem } from "@/types/product";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/use-product";

interface SimilarProductsProps {
  currentProduct: Product;
  similarProducts?: ProductListItem[];
}

export const SimilarProducts: React.FC<SimilarProductsProps> = ({
  currentProduct,
  similarProducts: initialSimilarProducts,
}) => {
  const searchParams = useSearchParams();
  const colorSlug = searchParams.get("color");

  // Fetch similar products if no initialSimilarProducts
  const { data, isLoading } = useProducts({
    is_featured: true,
    page_size: 4, 
    color: colorSlug || undefined,
  });

  const displayProducts = (initialSimilarProducts && initialSimilarProducts.length > 0) 
    ? initialSimilarProducts.filter((p) => p.id !== currentProduct.id).slice(0, 3)
    : (data?.results || []).filter((p) => p.id !== currentProduct.id).slice(0, 3);

  const shouldShowLoading = isLoading && (!initialSimilarProducts || initialSimilarProducts.length === 0);

  if (shouldShowLoading) {
     return (
       <div className="pt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
         {[1, 2, 3].map((i) => (
           <div key={i} className="space-y-4">
              <div className="aspect-3/4 bg-gray-100 animate-pulse rounded-sm" />
              <div className="h-4 bg-gray-100 animate-pulse w-3/4" />
           </div>
         ))}
       </div>
     );
  }

  if (displayProducts.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="pt-8 sm:pt-12 md:pt-16"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12">
        <h2 className="text-2xl sm:text-3xl font-serif">You May Also Like</h2>
        <Link
          href="/shop"
          className="text-xs sm:text-sm border-b border-primary pb-1 hover:text-accent hover:border-accent transition-colors"
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {displayProducts.map((similar: ProductListItem) => (
          <ProductCard key={similar.id} product={similar} />
        ))}
      </div>
    </motion.section>
  );
};

