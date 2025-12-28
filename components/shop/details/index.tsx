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

import { useColors } from "@/hooks/use-colors";

interface ProductDetailProps {
  product: Product;
}

function ProductDetailContent({ product }: ProductDetailProps) {
  // Derive default size from product
  const defaultSize = product.size?.name || "";

  const [selectedSize, setSelectedSize] = useState<string>(defaultSize);
  const [quantity, setQuantity] = useState(1);
  const { data: allColors } = useColors();

  // Extract unique colors from variants and match with full color data
  const availableColors = React.useMemo(() => {
    const colors = new Map<string, Product["variants"][0]["color"]>();
    
    product.variants?.forEach((variant) => {
      // Priority 1: Variant has full color object
      if (variant.color) {
        colors.set(variant.color.name, variant.color);
        return;
      }
      
      // Priority 2: Variant has color_name, match with fetched colors
      if (variant.color_name && allColors) {
        const matchedColor = allColors.find(
          (c) => c.name.toLowerCase() === variant.color_name?.toLowerCase()
        );
        if (matchedColor) {
           // Ensure it matches the type expected (using cast/merge if needed, but Color interface should match)
           colors.set(matchedColor.name, matchedColor); 
           return;
        }
      }

      // Priority 3: Fallback if color_name exists but no full color data found
      if (variant.color_name) {
          // Use a negative ID or some unique generation if we don't have a real ID, 
          // or just assume we won't show an image.
          // Note: ID is required by type.
          colors.set(variant.color_name, {
              id: -variant.id, // Temporary fallback ID
              name: variant.color_name,
              slug: null
          });
      }
    });
    return Array.from(colors.values());
  }, [product.variants, allColors]);

  const [selectedColor, setSelectedColor] = useState<Product["variants"][0]["color"] | null>(
    availableColors.length > 0 ? availableColors[0] : null
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product.id]);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
      <Breadcrumb product={product} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-24 mb-12 sm:mb-16 md:mb-24">
        <ProductImageGallery product={product} selectedColor={selectedColor} />

        <div>
          <ProductInfo product={product} />
          <ProductSelectors
            product={product}
            colors={availableColors}
            selectedColor={selectedColor}
            onColorChange={setSelectedColor}
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
