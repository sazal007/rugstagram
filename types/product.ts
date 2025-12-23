import type { Category } from "./category";
import type { SubCategory } from "./sub-category";

export type ProductListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
};

export type Product = {
  id: number;
  name: string;
  slug: string;
  price: string;
  market_price: string;

  thumbnail_image: string;
  thumbnail_image_alt_description: string;

  hover_thumbnail_image: string;
  hover_thumbnail_image_alt_description: string;

  stock: number;
  reviews_count: number;
  average_rating: number;

  is_featured: boolean;
  is_popular: boolean;
  is_active: boolean;
  is_clearance: boolean;

  images: ProductImage[];

  designer: string;
  brand_name: string;

  category?: Category;
  sub_category?: SubCategory;
};

export type ProductImage = {
  id: number;
  image: string;
  image_alt_description: string;
  color: number | null;
  stock: number;
  product: number;
};
