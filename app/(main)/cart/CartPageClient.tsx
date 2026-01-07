"use client";

import React from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShieldCheck, 
  Globe, 
  Sparkles,
  Award
} from 'lucide-react';
import { useCart } from "@/context/CartContext";
import { getImageUrl } from "@/utils/image";
import Link from "next/link";
import Image from "next/image";

export function CartPageClient() {
  const { cartItems, updateQuantity, removeFromCart, subtotal } = useCart();

  const handleUpdateQuantity = (id: string, delta: number) => {
     const item = cartItems.find(i => i.id === id);
     if (item) {
       updateQuantity(id, Math.max(1, item.quantity + delta));
     }
  };

  const total = subtotal

  return (
    <div className="bg-[#F9F8F6] text-[#1C1917] font-sans antialiased min-h-[calc(100vh-200px)]">

      <main className="max-w-7xl mx-auto px-8 py-16 lg:py-24">
        {/* Seamless 12-Column Grid Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
          
          {/* Left Side: Items List (7 Columns) */}
          <div className="lg:col-span-7 xl:col-span-8">
            <header className="mb-16">
              <h1 className="text-5xl xl:text-6xl  font-light mb-6 tracking-tight">Shopping Bag</h1>
              <div className="h-px w-24 bg-[#A88663]"></div>
            </header>

            {cartItems.length > 0 ? (
              <div className="divide-y divide-stone-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="py-12 first:pt-0 group">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                      
                      {/* Product Image Holder */}
                      <div className="md:col-span-4 relative aspect-[4/5] bg-[#F1EFE9] overflow-hidden">
                        <Image 
                          src={getImageUrl(item.image)} 
                          alt={item.name} 
                          fill
                          className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />

                      </div>

                      {/* Product Data Integration */}
                      <div className="md:col-span-8 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] uppercase tracking-[0.3em] text-[#A88663] font-bold block mb-2">
                                {item.color?.name || "Signature Collection"}
                            </span>
                            <h3 className="text-3xl  mb-2 leading-tight">{item.name}</h3>
                            <p className="text-[11px] text-stone-400 font-mono tracking-tighter uppercase mb-6">SKU: {item.code || `RS-${item.productId}-${item.sizeId}`}</p>
                            
                            <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm max-w-sm">
                              <div>
                                <span className="text-[10px] text-stone-400 uppercase tracking-widest block mb-1">Dimensions</span>
                                <span className="font-medium">{item.size}</span>
                              </div>
                              <div>
                                <span className="text-[10px] text-stone-400 uppercase tracking-widest block mb-1">Material</span>
                                <span className="font-medium">Organic Highland Wool</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-light tracking-tight">${item.price.toLocaleString()}</p>
                            {item.quantity > 1 && (
                              <p className="text-[10px] text-stone-400 mt-1">
                                ${(item.price * item.quantity).toLocaleString()} Total
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-12 pt-8 border-t border-stone-100">
                          <div className="flex items-center gap-8">
                            {/* Seamless Quantity Controller */}
                            <div className="flex items-center gap-4 text-stone-500">
                              <button 
                                onClick={() => handleUpdateQuantity(item.id, -1)}
                                className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-100 transition-colors cursor-pointer"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="text-sm font-medium w-4 text-center text-[#1C1917]">{item.quantity}</span>
                              <button 
                                onClick={() => handleUpdateQuantity(item.id, 1)}
                                className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-100 transition-colors cursor-pointer"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          </div>

                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-[10px] cursor-pointer uppercase tracking-widest text-stone-400 hover:text-red-800 transition-colors flex items-center gap-2 group/btn"
                          >
                            <Trash2 size={14} strokeWidth={1.5} className="group-hover/btn:-rotate-12 transition-transform" />
                            Remove from Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-32 flex flex-col items-center justify-center border border-dashed border-stone-200 rounded-sm">
                <ShoppingBag size={48} className="text-stone-200 mb-6" strokeWidth={1} />
                <p className="text-2xl text-stone-400 mb-8">The archive awaits your selection.</p>
                <Link href="/shop" className="px-10 py-4 bg-[#1C1917] text-white text-[10px] uppercase tracking-widest font-bold rounded-full hover:bg-[#A88663] transition-colors">
                  Explore Catalog
                </Link>
              </div>
            )}
          </div>

          {/* Right Side: Order Summary (5 Columns) */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-32 space-y-8">
              <div className="bg-white border text-[#1C1917] border-stone-200 p-4 xl:p-4 rounded-2xl relative overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.03)]">
                {/* Visual Texture Backdrop */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F9F8F6] -rotate-45 translate-x-16 -translate-y-16"></div>
                
                <h2 className="text-sm uppercase tracking-[0.3em] font-bold mb-10 pb-4 border-b border-stone-100">Checkout Ledger</h2>
                
                <div className="space-y-6 mb-12">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-stone-400 uppercase tracking-widest text-[10px]">Subtotal</span>
                    <span className="font-medium">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-stone-400 uppercase tracking-widest text-[10px]">Shipping</span>
                      <Globe size={12} className="text-stone-300" />
                    </div>
                    <span className="text-[#10B981] text-[10px] uppercase tracking-widest font-bold italic">Will be Determined</span>
                  </div>

                  
                  <div className="pt-8 mt-4 border-t border-stone-100 flex justify-between items-center">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-300">Final Amount</p>
                    <div className="text-right">
                      <span className="text-2xl  tracking-tighter block leading-none text-[#1C1917]">${total}</span>
                    </div>
                  </div>
                </div>

                <Link href="/checkout">
                  <button disabled={cartItems.length === 0} className="w-full bg-[#1C1917] disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed text-white py-6 flex items-center justify-center gap-4 group hover:bg-[#A88663] transition-all duration-500 shadow-2xl shadow-stone-300/50">
                    <span className="text-[11px] uppercase tracking-[0.3em] font-bold">Go to Checkout</span>
                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
                  </button>
                </Link>

                {/* Assurance Details */}
                <div className="mt-12 grid grid-cols-2 gap-4">
                  <div className="p-4 bg-[#F9F8F6] flex flex-col items-center text-center gap-3">
                    <ShieldCheck size={20} strokeWidth={1} className="text-[#A88663]" />
                    <span className="text-[9px] uppercase tracking-widest font-semibold leading-relaxed">Encrypted Transaction</span>
                  </div>
                  <div className="p-4 bg-[#F9F8F6] flex flex-col items-center text-center gap-3">
                    <Award size={20} strokeWidth={1} className="text-[#A88663]" />
                    <span className="text-[9px] uppercase tracking-widest font-semibold leading-relaxed">Artisan Authenticity</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
