"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Product } from "@/types";

const DUMMY_GALLERY = [
  "https://images.unsplash.com/photo-1596238638367-9c606540c436?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1574966739943-9e812b4c1a53?auto=format&fit=crop&q=80&w=1000",
];

interface ProductImageGalleryProps {
  product: Product;
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  product,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const productImages = [product.image, ...DUMMY_GALLERY];

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
      className="space-y-4 top-24 self-start sticky"
    >
      {/* Main Viewer */}
      <div
        className="aspect-[3/4] bg-gray-100 rounded-sm overflow-hidden relative cursor-crosshair group"
        onMouseEnter={() => setIsHoveringImage(true)}
        onMouseLeave={() => setIsHoveringImage(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={productImages[activeImageIndex]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-200 ease-out"
          style={{
            transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
            transform: isHoveringImage ? "scale(2)" : "scale(1)",
          }}
        />
        {product.isNew && (
          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 text-xs uppercase tracking-wider font-bold z-10">
            New Arrival
          </span>
        )}
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-4">
        {productImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImageIndex(idx)}
            className={`aspect-square bg-gray-50 rounded-sm overflow-hidden border-2 transition-all ${
              activeImageIndex === idx
                ? "border-primary opacity-100"
                : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <img
              src={img}
              alt={`View ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </motion.div>
  );
};

