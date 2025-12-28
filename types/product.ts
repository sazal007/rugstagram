// Base interfaces for related models
export interface Collection {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  image_alt_description: string | null;
  order: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}


export interface DesignName {
  id: number;
  name: string;
  slug: string | null;
  description: string | null;
  image: string | null;
  image_alt_description: string | null;
  is_best_seller: boolean;
  is_popular: boolean;
}

export interface Size {
  id: number;
  name: string;
  slug: string | null;
}

export interface Color {
  id: number;
  name: string;
  slug: string | null;
}

export interface Quality {
  id: number;
  name: string;
  slug: string | null;
}

export interface ProductImage {
  id: number;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface ProductVariant {
  id: number;
  color_id: number | null;
  stock: number | null;
  product_images: ProductImage[];
  // For UI display helpers
  color?: Color;
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    code: string | null;
    description: string | null;
    collection: Collection | null;
    sale_price: string | null;
    price: string | null;
    thumbnail_image: string | null;
    thumbnail_image_alt_description: string | null;
    is_new: boolean;
    is_best_seller: boolean;
    is_featured: boolean;
    is_active: boolean;
    meta_title: string | null;
    meta_description: string | null;
    created_at: string;
    updated_at: string;
    variants: ProductVariant[];
    quality: Quality | null;
    pile_height: PileHeight | null;
    size: Size | null;
    luxury_edition: LuxuryEdition | null;
    affordable_edition: AffordableEdition | null;
    material: Material | null;
}

export interface ProductListItem {
  id: number;
  name: string;
  slug: string;
  code: string | null;
  sale_price: string | null;
  price: string | null;
  thumbnail_image: string | null;
  thumbnail_image_alt_description: string | null;
  is_new: boolean;
  is_best_seller: boolean;
  is_featured: boolean;
  is_active: boolean;
  // New fields from backend response
  collection_name?: string;
  quality_name?: string;
  pile_height_name?: string;
  size_name?: string;
  edition_name?: string;
  material_name?: string;
  meta_title?: string | null;
  meta_description?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductListResponse {
  results: ProductListItem[];
  count: number;
  next?: string | null;
  previous?: string | null;
}

export interface PileHeight {
  id: number;
  name: string;
  slug: string | null;
}

export interface LuxuryEdition {
  id: number;
  name: string;
  slug: string | null;
}

export interface AffordableEdition {
  id: number;
  name: string;
  slug: string | null;
}

export interface Material {
  id: number;
  name: string;
  slug: string | null;
}
