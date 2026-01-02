"use client";

import React, { useState, useMemo } from 'react';
import { ChevronLeft, ShoppingBag, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { CartItemRow } from './cart-item-row';
import { useAuth } from '@/context/AuthContext';
import { useDetailedWishlist, useRemoveFromWishlist } from '@/hooks/use-wishlist';
import { useCart } from '@/context/CartContext';
import { ProductListItem } from '@/types/product';
import { productApi } from '@/services/product';
import { toast } from 'sonner';

export const Wishlist: React.FC = () => {
  const { user, tokens } = useAuth();
  const { addToCart } = useCart();
  const userId = user?.id ? Number(user.id) : 0;
  
  const { data: items, isLoading, error } = useDetailedWishlist(userId, tokens?.access_token);
  const removeFromWishlistMutation = useRemoveFromWishlist();

  // Local state for quantities since wishlist doesn't store them
  const [quantities, setQuantities] = useState<Record<number, number>>({});


  const updateQuantity = (wishlistId: number, newQuantity: number) => {
    setQuantities(prev => ({
      ...prev,
      [wishlistId]: newQuantity
    }));
  };

  const removeItem = async (wishlistId: number) => {
    try {
      await removeFromWishlistMutation.mutateAsync({
        wishlistItemId: wishlistId,
        accessToken: tokens?.access_token
      });
      toast.success("Removed from wishlist");
    } catch (err) {
      console.error("Failed to remove item:", err);
      toast.error("Failed to remove item");
    }
  };

  const handleAddToCart = async (productItem: ProductListItem, quantity: number) => {
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

      addToCart(fullProduct, size, quantity, variantId, color);
      toast.success(`Added ${productItem.name} to cart`);
    } catch (err) {
      console.error("Failed to add to cart:", err);
      toast.error("Failed to add to cart");
    }
  };

  const subtotal = useMemo(() => {
    if (!items) return 0;
    return items.reduce((sum, item) => {
      const price = parseFloat(item.product.sale_price || item.product.price || "0");
      const qty = quantities[item.wishlistId] || 1;
      return sum + price * qty;
    }, 0);
  }, [items, quantities]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center">
        <h3 className="text-lg font-medium text-red-500">Error loading wishlist</h3>
        <p className="text-gray-500 mt-1">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-3xl min-h-screen max-w-7xl mx-auto  p-6 md:p-8 lg:p-10">
      
      {/* Header Row */}
      <div className="hidden md:grid grid-cols-12 gap-6 pb-4 border-b border-gray-100 text-sm font-medium text-gray-500 mb-2">
        <div className="col-span-6 pl-2">Items</div>
        <div className="col-span-3 text-center">Qty</div>
        <div className="col-span-3 text-right pr-14">Subtotal</div>
      </div>

      {/* Wishlist Items List */}
      <div className="flex flex-col">
          {!items || items.length === 0 ? (
              <div className="py-20 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                      <ShoppingBag className="text-gray-400" size={32} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Your wishlist is empty</h3>
                  <p className="text-gray-500 mt-1">Looks like you haven&apos;t saved anything yet.</p>
              </div>
          ) : (
              items.map(item => (
                  <CartItemRow
                    key={item.wishlistId}
                    item={item}
                    quantity={quantities[item.wishlistId] || 1}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                    onAddToCart={handleAddToCart}
                  />
              ))
          )}
      </div>

      {/* Footer / Summary */}
      <div className="mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-gray-100">
        
        {/* Continue Shopping Link */}
        <Link 
          href="/shop" 
          className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors order-2 md:order-1"
        >
          <ChevronLeft size={16} />
          Continue shopping
        </Link>

        {/* Checkout Section */}
        <div className="flex flex-col md:flex-row items-center gap-8 w-full md:w-auto order-1 md:order-2">
          <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
              <span className="text-lg font-medium text-gray-900">Subtotal</span>
              <span className="text-2xl font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
          </div>
          
          <button 
              className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-slate-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!items || items.length === 0}
              onClick={() => {
                // If they want to add ALL to cart, we could implement that, 
                // but for now, individual add to cart is clear.
                // Based on UI snippet "Add to cart" button usually means checkout or add all.
                // Keeping it as a generic "Start Shopping" if empty or maybe we can add logic to add all?
                // The snippet has "Add to cart" at the bottom.
                toast.info("Please add individual items to your cart.");
              }}
          >
            <ShoppingBag size={18} />
            Add all to cart
          </button>
        </div>
      </div>

    </div>
  );
};
