"use client";

import { useEffect, useState } from "react";
import { 
  Trash2, 
  ShoppingCart, 
  ShoppingBag,
  Loader2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useWishlist, useRemoveFromWishlist } from "@/hooks/use-wishlist";
import { productApi } from "@/services/product";
import { ProductListItem } from "@/types/product";
import { toast } from "sonner";

interface WishlistItemWithProduct {
  wishlistId: number;
  product: ProductListItem;
}

export function Wishlist() {
  const { user, tokens } = useAuth();
  const userId = user?.id ? Number(user.id) : 0;
  const { data: wishlistData, isLoading: isLoadingWishlist, error } = useWishlist(
    userId, 
    tokens?.access_token
  );
  const removeFromWishlist = useRemoveFromWishlist();
  
  const [items, setItems] = useState<WishlistItemWithProduct[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  // Fetch full product details when wishlist data changes
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!wishlistData || wishlistData.length === 0) {
        setItems([]);
        return;
      }

      setIsLoadingProducts(true);
      try {
        const productPromises = wishlistData.map(async (wishlistItem) => {
          try {
            // Fetch the full product list to find the product by ID
            const productsResponse = await productApi.getAll({});
            const product = productsResponse.results.find(p => p.id === wishlistItem.product);
            
            if (!product) {
              console.warn(`Product with ID ${wishlistItem.product} not found`);
              return null;
            }

            return {
              wishlistId: wishlistItem.id,
              product,
            };
          } catch (err) {
            console.error(`Failed to fetch product ${wishlistItem.product}:`, err);
            return null;
          }
        });

        const resolvedProducts = await Promise.all(productPromises);
        const validProducts = resolvedProducts.filter((item): item is WishlistItemWithProduct => item !== null);
        setItems(validProducts);
      } catch (err) {
        console.error("Error fetching product details:", err);
        toast.error("Failed to load product details");
      } finally {
        setIsLoadingProducts(false);
      }
    };

    fetchProductDetails();
  }, [wishlistData]);

  const handleRemoveItem = async (wishlistId: number, productName: string) => {
    try {
      await removeFromWishlist.mutateAsync({ 
        wishlistItemId: wishlistId, 
        accessToken: tokens?.access_token 
      });
      toast.success("Removed from wishlist", { 
        description: `${productName} has been removed from your wishlist` 
      });
    } catch (err) {
      console.error("Error removing from wishlist:", err);
      toast.error("Failed to remove item", { 
        description: "Please try again" 
      });
    }
  };

  const subtotal = items.reduce((sum, item) => {
    const priceStr = item.product.sale_price || item.product.price || "0";
    const price = parseFloat(priceStr);
    return sum + price;
  }, 0);

  if (!user) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8">
          <div className="py-12 text-center space-y-4">
            <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
              <ShoppingBag className="h-8 w-8" />
            </div>
            <p className="text-slate-500">Please log in to view your wishlist.</p>
            <Button variant="link" className="text-orange-600 font-semibold" asChild>
              <Link href="/login">Log In</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoadingWishlist || isLoadingProducts) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-8">Wishlist</h2>
          <div className="py-12 text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-slate-400 mx-auto" />
            <p className="text-slate-500">Loading your wishlist...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-8">Wishlist</h2>
          <div className="py-12 text-center space-y-4">
            <p className="text-red-500">Failed to load wishlist. Please try again.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-8">
        <h2 className="text-xl font-bold text-slate-900 mb-8">Wishlist</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="pb-4 font-semibold text-slate-500 text-sm uppercase tracking-wider">Items</th>
                <th className="pb-4 font-semibold text-slate-500 text-sm uppercase tracking-wider text-right">Price</th>
                <th className="pb-4 font-semibold text-slate-500 text-sm uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {items.map((item) => {
                const priceStr = item.product.sale_price || item.product.price || "0";
                const price = parseFloat(priceStr);
                const primaryImage = item.product.thumbnail_image;
                
                return (
                  <tr key={item.wishlistId} className="group">
                    <td className="py-6">
                      <div className="flex items-center gap-4">
                        <div className="relative h-20 w-20 rounded-xl overflow-hidden bg-slate-50 shrink-0">
                          {primaryImage ? (
                            <Image
                              src={primaryImage}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                              <ShoppingBag className="h-8 w-8" />
                            </div>
                          )}
                        </div>
                        <div className="space-y-1">
                          <Link href={`/shop/${item.product.slug}`}>
                            <h4 className="font-bold text-slate-900 hover:text-orange-600 transition-colors">
                              {item.product.name}
                            </h4>
                          </Link>
                          {item.product.collection_name && (
                            <p className="text-sm text-slate-500">
                              Collection: {item.product.collection_name}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-6 text-right">
                      <span className="font-bold text-slate-900">
                        ${price.toFixed(2)}
                      </span>
                    </td>
                    <td className="py-6">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveItem(item.wishlistId, item.product.name)}
                          disabled={removeFromWishlist.isPending}
                          className="h-9 w-9 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                        >
                          {removeFromWishlist.isPending ? (
                            <Loader2 className="h-4.5 w-4.5 animate-spin" />
                          ) : (
                            <Trash2 className="h-4.5 w-4.5" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="h-9 w-9 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-all"
                        >
                          <Link href={`/shop/${item.product.slug}`}>
                            <ShoppingCart className="h-4.5 w-4.5" />
                          </Link>
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {items.length === 0 ? (
          <div className="py-12 text-center space-y-4">
             <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                <ShoppingBag className="h-8 w-8" />
             </div>
             <p className="text-slate-500">Your wishlist is empty.</p>
             <Button variant="link" className="text-orange-600 font-semibold" asChild>
                <Link href="/shop">Continue Shopping</Link>
             </Button>
          </div>
        ) : (
          <div className="mt-12 space-y-6 flex flex-col items-end">
            <div className="flex items-center gap-8">
              <span className="text-lg font-bold text-slate-400">Total</span>
              <span className="text-3xl font-bold text-slate-900">${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-sm text-slate-500 italic">
              Click the cart icon to add items to your cart
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
