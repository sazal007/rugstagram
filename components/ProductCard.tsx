import React from "react";
import Link from "next/link";
import { Product, ProductListItem } from "@/types/product";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useWishlist, useAddToWishlist, useRemoveFromWishlist } from "@/hooks/use-wishlist";
import { toast } from "sonner";

// Accept either Product or ProductListItem
type ProductCardProduct = Product | ProductListItem;

interface ProductCardProps {
  product: ProductCardProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { user, tokens } = useAuth();
  const { data: wishlistItems } = useWishlist(Number(user?.id), tokens?.access_token);
  const addToWishlistMutation = useAddToWishlist();
  const removeFromWishlistMutation = useRemoveFromWishlist();

  // Type guard to check if this is a full Product
  const isFullProduct = (p: ProductCardProduct): p is Product => {
    return "collection" in p;
  };

  const collectionName = isFullProduct(product)
    ? product.collection?.name
    : "collection_name" in product && product.collection_name
    ? product.collection_name
    : "";

  const colorName = isFullProduct(product)
    ? product.variants?.[0]?.color?.name || product.variants?.[0]?.color_name 
    : "color_name" in product && product.color_name
    ? product.color_name
    : "";

  const wishlistItem = wishlistItems?.find((item) => item.product === product.id);
  const isInWishlist = !!wishlistItem;

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user || !tokens?.access_token) {
      toast.error("Please login to add to wishlist");
      return;
    }

    try {
      if (isInWishlist) {
        if (wishlistItem) {
          await removeFromWishlistMutation.mutateAsync({
            wishlistItemId: wishlistItem.id,
            accessToken: tokens.access_token,
          });
          toast.success("Removed from wishlist");
        }
      } else {
        await addToWishlistMutation.mutateAsync({
          userId: Number(user.id),
          productId: product.id,
          accessToken: tokens.access_token,
        });
        toast.success("Added to wishlist");
      }
    } catch (error) {
      console.error("Wishlist operation failed:", error);
      toast.error("Failed to update wishlist");
    }
  };

  const colorSlug = isFullProduct(product)
    ? product.variants?.[0]?.color?.slug
    : "color_slug" in product
    ? product.color_slug
    : null;

  const productUrl = colorSlug
    ? `/shop/${product.slug}?color=${colorSlug}`
    : `/shop/${product.slug}`;

  const hasSalePrice = product.sale_price && parseFloat(product.sale_price) > 0;

  return (
    <Link
      href={productUrl}
      className="group cursor-pointer block"
    >
      <div className="relative aspect-3/4 overflow-hidden bg-gray-100 rounded-sm mb-4">
        <Image
          src={product.thumbnail_image || "/placeholder.jpg"}
          alt={
            ("thumbnail_image_alt_description" in product && product.thumbnail_image_alt_description) || 
            product.name
          }
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          width={500}
          height={500}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.is_featured && (
            <span className="bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] uppercase tracking-wider font-bold shadow-sm text-accent">
              Featured
            </span>
          )}
          {product.is_new && (
            <span className="bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] uppercase tracking-wider font-bold shadow-sm">
              New
            </span>
          )}
          {product.is_best_seller && (
            <span className="bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] uppercase tracking-wider font-bold shadow-sm text-amber-600">
              Best Seller
            </span>
          )}
          {hasSalePrice && (
            <span className="bg-red-500/90 backdrop-blur-sm px-2 py-1 text-[10px] uppercase tracking-wider font-bold shadow-sm text-white">
              Sale
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
          className={`absolute top-3 right-3 p-2 bg-white/90 rounded-full transition-all duration-300 hover:text-accent ${
            isInWishlist ? "opacity-100 text-red-500" : "opacity-0 group-hover:opacity-100"
          }`}
          onClick={handleWishlistToggle}
        >
          <Heart className={`w-4 h-4 ${isInWishlist ? "fill-current" : ""}`} />
        </button>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between items-start">
          <h3 className="font-serif text-lg leading-none group-hover:text-accent transition-colors">
            {product.name}
          </h3>
          <div className="flex flex-col items-end">
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
                <span className="text-sm font-medium text-gray-500">
                  ${parseFloat(product.price || "0").toLocaleString()}
                </span>
             )}
          </div>
        </div>
        <div className="flex flex-col gap-0.5">
           <p className="text-xs text-muted uppercase tracking-wide">
             {collectionName}
           </p>
           {colorName && (
              <p className="text-xs text-muted/80">
                {colorName}
              </p>
           )}
        </div>
      </div>
    </Link>
  );
};
