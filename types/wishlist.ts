export type Wishlist = {
  id: number;
  created_at: string; 
  updated_at: string; 
  user: number;       
  product: number;    
};

export type CreateWishlistPayload = {
  product: number;
};
