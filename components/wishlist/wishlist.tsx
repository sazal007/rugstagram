"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Heart, ShoppingBag, Trash2, Loader2 } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";
import { toast } from "sonner";
import { useDetailedWishlist, useRemoveFromWishlist } from "@/hooks/use-wishlist";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { productApi } from "@/services/product";

export const Wishlist: React.FC = () => {
  const { tokens } = useAuth();
  const { data: wishlistItems, isLoading, error } = useDetailedWishlist(tokens?.access_token);
  const removeFromWishlistMutation = useRemoveFromWishlist();
  const { addToCart } = useCart();

  const handleRemove = async (wishlistId: number) => {
    try {
      await removeFromWishlistMutation.mutateAsync({
        wishlistItemId: wishlistId,
        accessToken: tokens?.access_token,
      });
    } catch (err) {
      console.error("Failed to remove item:", err);
      toast.error("Failed to remove from wishlist");
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addToBag = async (productItem: any) => {
    try {
      // Need full product details for addToCart
      const fullProduct = await productApi.getBySlug(productItem.slug);
      
      // Default to first variant if exists
      const variantId = fullProduct.variants[0]?.id || 0;
      const size = fullProduct.size?.name || "Standard";
      const color = fullProduct.variants[0]?.color_name 
        ? { 
            name: fullProduct.variants[0].color_name, 
            slug: fullProduct.variants[0].color?.slug || "" 
          } 
        : undefined;

      addToCart(fullProduct, size, 1, variantId, color);
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
        {wishlistItems.map((item, index) => {
          const product = item.product;
          const productUrl = product.color_slug
            ? `/shop/${product.slug}?color=${product.color_slug}`
            : `/shop/${product.slug}`;
          const hasSalePrice = product.sale_price && parseFloat(product.sale_price) > 0;

          return (
            <motion.div
              key={item.wishlistId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group relative flex flex-col h-full"
            >
              <Link 
                href={productUrl} 
                className="absolute inset-0 z-0 rounded-sm" 
                aria-label={`View ${product.name}`}
              />
              
              {/* Image Container */}
              <div className="relative aspect-3/4 overflow-hidden bg-gray-100 rounded-sm mb-4 pointer-events-none">
                  <Image
                    src={product.thumbnail_image || "/placeholder.jpg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.is_featured && (
                    <span className="bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] uppercase tracking-wider font-bold shadow-sm text-accent">
                      Featured
                    </span>
                  )}
                  {hasSalePrice && (
                    <span className="bg-red-500/90 backdrop-blur-sm px-2 py-1 text-[10px] uppercase tracking-wider font-bold shadow-sm text-white">
                      Sale
                    </span>
                  )}
                </div>
              </div>

              {/* Remove Button Overlay - outside pointers-events-none container */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleRemove(item.wishlistId);
                }}
                className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white hover:text-red-500 transition-all shadow-sm z-10 cursor-pointer"
                aria-label="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              {/* Info Container */}
              <div className="flex flex-col grow pointer-events-none">
                <div className="mb-4">
                  <p className="text-[10px] text-muted uppercase tracking-widest mb-1">
                    {product.collection_name}
                  </p>
                  <h3 className="font-serif text-lg leading-tight group-hover:text-accent transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted/80 mt-1">{product.color_name}</p>
                </div>

                <div className="mt-auto pt-2">
                  <div className="flex items-baseline gap-2 mb-4">
                    {hasSalePrice ? (
                      <>
                        <span className="text-sm font-medium text-red-600">
                          ${parseFloat(product.sale_price!).toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-400 line-through">
                          ${parseFloat(product.price || "0").toLocaleString()}
                        </span>
                      </>
                    ) : (
                      <span className="text-sm font-medium text-gray-900">
                        ${parseFloat(product.price || "0").toLocaleString()}
                      </span>
                    )}
                  </div>

                  <CustomButton
                    variant="outline"
                    className="w-full text-[10px] uppercase cursor-pointer tracking-widest py-3 h-auto relative z-10 pointer-events-auto"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToBag(product);
                    }}
                  >
                    <ShoppingBag className="w-3.5 h-3.5 mr-2" />
                    Add to Bag
                  </CustomButton>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
