import React from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { Heart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group cursor-pointer block"
    >
      <div className="relative aspect-3/4 overflow-hidden bg-gray-100 rounded-sm mb-4">
        <img
          src={product.thumbnail_image}
          alt={product.thumbnail_image_alt_description || product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.is_featured && (
            <span className="bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] uppercase tracking-wider font-bold shadow-sm text-accent">
              Featured
            </span>
          )}
          {product.is_popular && (
            <span className="bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] uppercase tracking-wider font-bold shadow-sm">
              Popular
            </span>
          )}
        </div>

        {/* Hover Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-linear-to-t from-black/50 to-transparent">
          <span className="w-full block text-center bg-white text-primary py-3 text-xs uppercase tracking-widest font-bold hover:bg-accent hover:text-white transition-colors">
            View Details
          </span>
        </div>

        <button
          className="absolute top-3 right-3 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-accent"
          onClick={(e) => {
            e.preventDefault();
            // Handle wishlist logic here
          }}
        >
          <Heart className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between items-start">
          <h3 className="font-serif text-lg leading-none group-hover:text-accent transition-colors">
            {product.name}
          </h3>
          <span className="text-sm font-medium text-gray-500">
            ${parseFloat(product.price).toLocaleString()}
          </span>
        </div>
        <p className="text-xs text-muted uppercase tracking-wide">
          {product.category?.name} {product.brand_name && `• ${product.brand_name}`}
        </p>
      </div>
    </Link>
  );
};
