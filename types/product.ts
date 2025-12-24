export interface ProductSize {
  id: number;
  name: string;
  slug: string | null;
  description: string;
  image: string;
}

export interface ProductColor {
  id: number;
  name: string;
  slug: string | null;
  description: string | undefined;
  image: string;
}

export interface ProductTexture {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface ProductImage {
  id: number;
  image: string;
  image_alt_description: string;
  color: ProductColor;
  size: ProductSize[];
  stock: number;
  product: number;
  is_in_stock: boolean;
}

export interface ProductStyle {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface ProductCollaboration {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  size: ProductSize[];
  designer: string;
  images: ProductImage[];
  thumbnail_image: string;
  hover_thumbnail_image: string;
  hover_thumbnail_image_alt_description: string;
  brand_name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reviews: any[];
  reviews_count: number;
  average_rating: number;
  color: ProductColor[];
  texture: ProductTexture[];
  style: ProductStyle[];
  collaboration: ProductCollaboration[];
  name: string;
  slug: string;
  description: string;
  highlight_description: string;
  extra_description: string;
  about_this_design_description: string;
  specifications: string;
  market_price: string;
  price: string;
  stock: number;
  thumbnail_image_alt_description: string;
  is_popular: boolean;
  is_featured: boolean;
  is_clearance: boolean;
  discount: string;
  is_active: boolean;
  meta_title: string;
  meta_description: string;
  created_at: string;
  updated_at: string;
  is_wishlisted: boolean;
  category?: ProductCategory;
  room_type: string | null;
}

export interface ProductListResponse {
  results: Product[];
  count: number;
  next?: string | null;
  previous?: string | null;
}
