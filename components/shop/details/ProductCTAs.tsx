"use client";

import React from "react";
import { ShoppingBag, Share2, Mail, Phone, Calendar } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";
import { useCart } from "@/context/CartContext";
import { Product, Size } from "@/types/product";
import { toast } from "sonner";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.445 0 .01 5.437 0 12.045c0 2.112.552 4.171 1.597 6.01L0 24l6.105-1.602a11.834 11.834 0 005.937 1.603h.005c6.604 0 12.039-5.435 12.04-12.045a11.77 11.77 0 00-3.51-8.514z" />
  </svg>
);

interface ProductCTAsProps {
  product: Product;
  selectedSize: Size | null;
  quantity: number;
  selectedColor: Product["variants"][0]["color"] | null;
}

export const ProductCTAs: React.FC<ProductCTAsProps> = ({
  product,
  selectedSize,
  quantity,
  selectedColor,
}) => {
  const { addToCart } = useCart();

  const handleAddToBag = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
// ... existing variant finding logic ...
    const selectedVariant = product.variants.find(
      (v) => 
        v.color_id === selectedColor?.id || 
        v.color?.id === selectedColor?.id ||
        (v.color_name && selectedColor?.name && 
         v.color_name.toLowerCase() === selectedColor.name.toLowerCase())
    );

    if (!selectedVariant) {
        const defaultVariant = product.variants[0];
        if (!defaultVariant) {
            toast.error("Product unavailable");
            return;
        }
        addToCart(product, selectedSize, quantity, defaultVariant.id, undefined);
        toast.success("Added to cart");
        return;
    }
    
    const colorForCart = selectedColor ? {
        name: selectedColor.name,
        slug: selectedColor.slug || "",
        image: selectedColor.image
    } : undefined;

    addToCart(product, selectedSize, quantity, selectedVariant.id, colorForCart);
    toast.success("Added to cart");
  };

  return (
    <div className="space-y-8 sm:space-y-12">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <CustomButton
          onClick={handleAddToBag}
          variant="default"
          size="hero"
          className="flex-1 uppercase tracking-widest text-[10px] sm:text-xs font-bold shadow-lg shadow-accent/20 bg-accent hover:bg-primary py-3 sm:py-4"
        >
          <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Add to Bag
        </CustomButton>
        <CustomButton
          variant="outline"
          size="lg"
          className="px-4 sm:px-6 py-3 sm:py-4"
          aria-label="Share"
        >
          <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-muted" />
        </CustomButton>
      </div>

      <div className="text-center bg-[#f9f9f8] border-b border-black p-4 sm:p-6">
        <p className="text-xs sm:text-sm mb-4 sm:mb-6 text-primary uppercase tracking-wider font-semibold">
          Need Help? Speak to our stylists
        </p>
        <div className="flex justify-center items-center gap-5 sm:gap-8">
          <button className="text-primary hover:text-accent transition-colors" aria-label="Email us">
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer stroke-[1.5]" />
          </button>
          <button className="text-primary hover:text-accent transition-colors" aria-label="Call us">
            <Phone className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer stroke-[1.5]" />
          </button>
          <button className="text-[#25D366] hover:opacity-80 transition-opacity" aria-label="WhatsApp us">
            <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" />
          </button>
          <button className="text-primary hover:text-accent transition-colors" aria-label="Book a consultation">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer stroke-[1.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};
