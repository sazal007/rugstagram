"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Heart, ShoppingBag, Loader2 } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";
import { toast } from "sonner";
import { useDetailedWishlist } from "@/hooks/use-wishlist";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { productApi } from "@/services/product";
import { ProductCard } from "@/components/ProductCard";

export const Wishlist: React.FC = () => {
  const { tokens } = useAuth();
  const { data: wishlistItems, isLoading, error } = useDetailedWishlist(tokens?.access_token);
  const { addToCart } = useCart();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addToBag = async (productItem: any) => {
    try {
      // Need full product details for addToCart
      const fullProduct = await productApi.getBySlug(productItem.slug);
      
      // Default to first variant if exists
      const variantId = fullProduct.variants[0]?.id || 0;
      
      // Use the size object from product
      if (!fullProduct.size) {
          toast.error("Size information missing for this product");
          return;
      }

      const color = fullProduct.variants[0]?.color_name 
        ? { 
            name: fullProduct.variants[0].color_name, 
            slug: fullProduct.variants[0].color?.slug || "" 
          } 
        : undefined;

      addToCart(fullProduct, fullProduct.size, 1, variantId, color);
      toast.success(`Added ${productItem.name} to bag`);
    } catch (err) {
      console.error("Failed to add to cart:", err);
      toast.error("Failed to add to cart");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-serif mb-2">Error loading wishlist</h2>
        <p className="text-muted mb-8">Please try again later.</p>
        <CustomButton onClick={() => window.location.reload()}>Retry</CustomButton>
      </div>
    );
  }

  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20 border border-dashed border-gray-200 rounded-3xl"
        >
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-gray-300" />
          </div>
          <h1 className="text-2xl font-serif mb-2">Your wishlist is empty</h1>
          <p className="text-muted mb-8">
            Save your favorite rugs here for later.
          </p>
          <Link href="/shop">
            <CustomButton>Browse Shop</CustomButton>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-12"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-serif">My Wishlist</h1>
          <p className="text-muted mt-2 uppercase tracking-widest text-xs">
            {wishlistItems.length} saved items
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {wishlistItems.map((item, index) => (
          <motion.div
            key={item.wishlistId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex flex-col gap-4"
          >
            <ProductCard product={item.product} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
