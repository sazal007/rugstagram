import React from 'react';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { ProductListItem } from '@/types/product';
import Image from 'next/image';

interface CartItemRowProps {
  item: {
    wishlistId: number;
    product: ProductListItem;
  };
  quantity: number;
  onUpdateQuantity: (wishlistId: number, newQuantity: number) => void;
  onRemove: (wishlistId: number) => void;
  onAddToCart: (product: ProductListItem, quantity: number) => void;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({ 
  item, 
  quantity, 
  onUpdateQuantity, 
  onRemove,
  onAddToCart
}) => {
  const { product, wishlistId } = item;

  const handleDecrement = () => {
    if (quantity > 1) {
      onUpdateQuantity(wishlistId, quantity - 1);
    }
  };

  const handleIncrement = () => {
    onUpdateQuantity(wishlistId, quantity + 1);
  };

  const price = parseFloat(product.sale_price || product.price || "0");

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center py-6 border-b border-gray-100 last:border-0">
      {/* Product Info */}
      <div className="md:col-span-6 flex items-center gap-4">
        <div className="w-20 h-20 shrink-0 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 relative">
          <Image 
            src={product.thumbnail_image || "/placeholder.jpg"} 
            alt={product.name} 
            fill
            className="object-cover mix-blend-multiply" 
          />
        </div>
        <div>
          <h3 className="text-gray-900 font-medium text-base">{product.name}</h3>
          <p className="text-gray-500 text-sm mt-1">{product.collection_name} • {product.color_name}</p>
        </div>
      </div>

      {/* Quantity Control */}
      <div className="md:col-span-3 flex md:justify-center">
        <div className="flex items-center border border-gray-200 rounded-lg bg-white">
          <button
            onClick={handleDecrement}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-l-lg transition-colors disabled:opacity-50"
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            <Minus size={14} />
          </button>
          <span className="w-10 text-center text-sm font-medium text-gray-900">
            {quantity}
          </span>
          <button
            onClick={handleIncrement}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-r-lg transition-colors"
            aria-label="Increase quantity"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Price & Actions */}
      <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-6">
        <span className="text-gray-900 font-medium">
          ${(price * quantity).toFixed(2)}
        </span>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onRemove(wishlistId)}
            className="text-gray-400 hover:text-red-500 transition-colors p-1"
            aria-label="Remove item"
          >
            <Trash2 size={18} />
          </button>
          <button 
            onClick={() => onAddToCart(product, quantity)}
            className="text-gray-400 hover:text-accent transition-colors p-1"
            aria-label="Add to cart"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
