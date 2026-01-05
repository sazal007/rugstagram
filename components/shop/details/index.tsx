"use client";

import React, { useState, useEffect } from "react";
import { Product, ProductListItem, Size } from "@/types/product";
import { Breadcrumb } from "./Breadcrumb";
import { ProductImageGallery } from "./ProductImageGallery";
import { ProductInfo } from "./ProductInfo";
import { ProductSelectors } from "./ProductSelectors";
import { ProductCTAs } from "./ProductCTAs";
import { ProductAccordion } from "./ProductAccordion";
import { ReviewsSection } from "./ReviewsSection";
import { SimilarProducts } from "./SimilarProducts";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useColors } from "@/hooks/use-colors";

interface ProductDetailProps {
  product: Product;
  similarProducts?: ProductListItem[];
}

function ProductDetailContent({ product, similarProducts }: ProductDetailProps) {
  // Derive default size from product
  const defaultSize = product.size;

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const colorSlug = searchParams.get("color");

  const [selectedSize, setSelectedSize] = useState<Size | null>(defaultSize);
  const [quantity, setQuantity] = useState(1);
  const { data: allColors } = useColors();

  // Extract unique colors from variants and match with full color data
  const availableColors = React.useMemo(() => {
    const colors = new Map<string, NonNullable<Product["variants"][0]["color"]>>();
    
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
           colors.set(matchedColor.name, matchedColor); 
           return;
        }
      }

      // Priority 3: Fallback if color_name exists but no full color data found
      if (variant.color_name) {
          colors.set(variant.color_name, {
              id: -variant.id, 
              name: variant.color_name,
              slug: variant.color_name.toLowerCase().replace(/\s+/g, '-'),
          });
      }
    });
    return Array.from(colors.values());
  }, [product.variants, allColors]);

  const [selectedColor, setSelectedColor] = useState<Product["variants"][0]["color"] | null>(() => {
    if (colorSlug && availableColors.length > 0) {
      const matched = availableColors.find(
        (c) => c && (c.slug === colorSlug || c.name.toLowerCase() === colorSlug.toLowerCase())
      );
      if (matched) return matched;
    }
    return availableColors.length > 0 ? availableColors[0] : null;
  });

  const handleColorChange = (color: Product["variants"][0]["color"]) => {
    setSelectedColor(color);
    if (color && color.slug) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("color", color.slug);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product.id]);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
      <Breadcrumb product={product} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-24 mb-12 sm:mb-16 md:mb-24">
        <ProductImageGallery product={product} selectedColor={selectedColor} />

        <div>
          <ProductInfo 
            product={product} 
            colors={availableColors}
            selectedColor={selectedColor} 
            onColorChange={handleColorChange}
          />
          <ProductSelectors
            product={product}
            onSizeChange={setSelectedSize}
            onQuantityChange={setQuantity}
          />
          <ProductCTAs 
            product={product} 
            selectedSize={selectedSize} 
            quantity={quantity} 
            selectedColor={selectedColor} 
          />
          <ProductAccordion />
        </div>
      </div>

      <ReviewsSection productId={product.id} productSlug={product.slug} />
      <SimilarProducts currentProduct={product} similarProducts={similarProducts} />
    </div>
  );
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, similarProducts }) => {
  // Use key to reset component state when product changes
  return <ProductDetailContent key={product.id} product={product} similarProducts={similarProducts} />;
};
