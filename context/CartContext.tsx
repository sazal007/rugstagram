"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { Product, Size } from "@/types/product";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  variant: string; // e.g., "170x240 • Wool"
  variantId: number; // Added for order payload
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  size: string;
  sizeId: number;
  color?: {
    name: string;
    slug: string;
    image?: string;
  };
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (
    product: Product,
    size: Size,
    quantity: number,
    variantId: number,
    color?: { name: string; slug: string; image?: string }
  ) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Initialize state from localStorage using lazy initialization
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (error) {
        console.error("Failed to load cart from localStorage", error);
        return [];
      }
    }
    return [];
  });

  // Debounce localStorage writes to avoid blocking
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Save cart to localStorage with debouncing
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Set new timeout to save after 300ms of no changes
    saveTimeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem("cart", JSON.stringify(cartItems));
      } catch (error) {
        console.error("Failed to save cart to localStorage", error);
      }
    }, 300);

    // Cleanup timeout on unmount
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [cartItems]);

  // Memoize computed values to avoid recalculation
  const totalItems = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const addToCart = useCallback(
    (
      product: Product,
      size: Size,
      quantity: number,
      variantId: number,
      color?: { name: string; slug: string; image?: string }
    ) => {
      console.log("Adding to cart:", {
        productName: product.name,
        size: size.name,
        sizeId: size.id,
        quantity,
        variantId,
        color,
      });
      setCartItems((prevItems) => {
        // Create a unique ID for this cart item (productId + sizeId + color)
        const colorPart = color ? `-${color.slug}` : "";
        const cartItemId = `${product.id}-${size.id}${colorPart}`;

        // Check if this exact product+size+color combination already exists
        const existingItemIndex = prevItems.findIndex(
          (item) => item.id === cartItemId
        );

        if (existingItemIndex >= 0) {
          // Update quantity if item already exists
          const newItems = [...prevItems];
          newItems[existingItemIndex] = {
            ...newItems[existingItemIndex],
            quantity: newItems[existingItemIndex].quantity + quantity,
          };
          return newItems;
        } else {
          // Add new item
          const materials = "Wool"; // Mock for now
          let variant = `${size.name} • ${materials}`;
          if (color) {
            variant = `${size.name} • ${color.name} • ${materials}`;
          }

          const price = parseFloat(product.price || "0");
          const originalPrice = product.sale_price
            ? parseFloat(product.sale_price)
            : undefined;

          // Use variant image if available, then color image, then product thumbnail
          const selectedVariant = product.variants?.find(v => v.id === variantId);
          const variantImage = selectedVariant?.product_images?.[0]?.image;
          const image = variantImage || color?.image || product.thumbnail_image || "";

          const newItem: CartItem = {
            id: cartItemId,
            productId: product.id.toString(),
            name: product.name,
            variant,
            variantId,
            price,
            originalPrice,
            quantity,
            image,
            size: size.name,
            sizeId: size.id,
            color,
          };

          return [...prevItems, newItem];
        }
      });
    },
    []
  );

  const removeFromCart = useCallback((id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(id);
        return;
      }

      setCartItems((prevItems) =>
        prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      subtotal,
    }),
    [
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      subtotal,
    ]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
