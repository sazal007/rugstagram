"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Product } from "@/types/product";
import Image from "next/image";

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
  const variantImages = product.variants
    ?.filter((v) => {
      if (!selectedColor) return true;
      // Match by ID if available
      if (v.color?.id === selectedColor.id) return true;
      // Match by Name (case insensitive) if available
      if (v.color_name && v.color_name.toLowerCase() === selectedColor.name.toLowerCase()) return true;
      
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-3 sm:space-y-4 lg:top-24 lg:self-start lg:sticky"
    >
      {/* Main Viewer */}
      <div
        className="aspect-3/4 bg-gray-100 rounded-sm overflow-hidden relative cursor-crosshair group w-full"
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
          <span className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-white/90 backdrop-blur-md px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs uppercase tracking-wider font-bold z-10">
            Featured
          </span>
        )}
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        {productImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImageIndex(idx)}
            className={`aspect-square bg-gray-50 rounded-sm overflow-hidden border-2 transition-all relative ${
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
          </button>
        ))}
      </div>
    </motion.div>
  );
};
