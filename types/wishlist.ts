import { ProductListItem } from "./product";

export type Wishlist = {
  id: number;
  created_at?: string; 
  updated_at?: string; 
  product: ProductListItem;    
};

export type CreateWishlistPayload = {
  product: number;
};
