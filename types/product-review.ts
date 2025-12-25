
export interface Product {
  id: number;
  name: string;
  slug: string;
  market_price: string;
  price: string;
  thumbnail_image: string;
  meta_title: string;
  meta_description: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  street_address_1: string;
  street_address_2: string;
  city: string;
  postcode: string;
  country: string;
}

export interface ProductReview {
  id: number;
  product: Product;
  user: User;
  headline: string;
  review: string;
  rating: number;
  created_at: string;
  image: string;
  image_alt_description: string;
}

export interface ProductReviewResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProductReview[];
}

export interface ReviewFilters {
  product_id?: number;
  rating?: number;
  search?: string;
  page?: number;
  page_size?: number;
  ordering?: string;
}