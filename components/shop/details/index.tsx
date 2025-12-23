"use client";

import React, { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { Breadcrumb } from "./Breadcrumb";
import { ProductImageGallery } from "./ProductImageGallery";
import { ProductInfo } from "./ProductInfo";
import { ProductSelectors } from "./ProductSelectors";
import { ProductCTAs } from "./ProductCTAs";
import { ProductAccordion } from "./ProductAccordion";
import { ReviewsSection } from "./ReviewsSection";
import { SimilarProducts } from "./SimilarProducts";

interface ProductDetailProps {
  product: Product;
}

function ProductDetailContent({ product }: ProductDetailProps) {
  // Derive default size from product or mock
  const defaultSize = "5x7"; // Mock default size

  const [selectedSize, setSelectedSize] = useState<string>(defaultSize);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product.id]);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
      <Breadcrumb product={product} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-24 mb-12 sm:mb-16 md:mb-24">
        <ProductImageGallery product={product} />

        <div>
          <ProductInfo product={product} />
          <ProductSelectors
            product={product}
            onSizeChange={setSelectedSize}
            onQuantityChange={setQuantity}
          />
          <ProductCTAs product={product} selectedSize={selectedSize} quantity={quantity} />
          <ProductAccordion />
        </div>
      </div>

      <ReviewsSection />
      <SimilarProducts currentProduct={product} />
    </div>
  );
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  // Use key to reset component state when product changes
  return <ProductDetailContent key={product.id} product={product} />;
};
