"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Product } from "@/types/product";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImageGalleryProps {
  product: Product;
  selectedColor?: Product["variants"][0]["color"] | null;
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  product,
  selectedColor,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Filter variant images based on selected color
  const variantImages =
    product.variants
      ?.filter((v) => {
        if (!selectedColor) return true;
        // Match by ID if available
        if (v.color?.id === selectedColor.id) return true;
        // Match by Name (case insensitive) if available
        if (
          v.color_name &&
          v.color_name.toLowerCase() === selectedColor.name.toLowerCase()
        )
          return true;

        return false;
      })
      .flatMap((v) => v.product_images?.map((img) => img.image) || []) || [];
  const productImages = [
    ...variantImages,
  ].filter((img): img is string => Boolean(img));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) =>
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) =>
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-6 lg:top-24 lg:self-start lg:sticky"
    >
      {/* Thumbnails */}
      <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 sm:gap-3 lg:gap-4 scrollbar-hide lg:w-24 shrink-0">
        {productImages.slice(0, 4).map((img, idx) => {
          const isLast = idx === 3;
          const remaining = productImages.length - 4;
          const showOverlay = isLast && remaining > 0;

          return (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`relative aspect-square w-16 sm:w-20 lg:w-full shrink-0 bg-gray-50 rounded-sm overflow-hidden border-2 transition-all ${
                activeImageIndex === idx
                  ? "border-primary opacity-100"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`View ${idx + 1}`}
                fill
                className="object-cover"
              />
              {showOverlay && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm sm:text-base font-medium backdrop-blur-[1px]">
                  +{remaining}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Viewer */}
      <div
        className="aspect-3/4 flex-1 bg-gray-100 rounded-sm overflow-hidden relative cursor-crosshair group w-full"
        onMouseEnter={() => setIsHoveringImage(true)}
        onMouseLeave={() => setIsHoveringImage(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={productImages[activeImageIndex]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-200 ease-out"
          style={{
            transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
            transform: isHoveringImage ? "scale(2)" : "scale(1)",
          }}
          priority={true}
        />
        {product.is_featured && (
          <span className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-white/90 backdrop-blur-md px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs uppercase tracking-wider font-bold z-10 pointer-events-none">
            Featured
          </span>
        )}

        {/* Navigation Arrows */}
        {productImages.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm shadow-sm z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm shadow-sm z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
};
