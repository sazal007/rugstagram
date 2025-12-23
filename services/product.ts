import { siteConfig } from "@/config/siteConfig";
import { Product, ProductListResponse } from "@/types/product";

export interface ProductFilters {
  category?: string;
  sub_category?: string;
  is_featured?: boolean;
  is_popular?: boolean;
  is_clearance?: boolean;
  search?: string;
  ordering?: string;
  page?: number;
  page_size?: number;
}

export const getProducts = async (filters: ProductFilters = {}): Promise<ProductListResponse> => {
  const params = new URLSearchParams();
  
  if (filters.category) params.append("category__slug", filters.category);
  if (filters.sub_category) params.append("sub_category__slug", filters.sub_category);
  if (filters.is_featured !== undefined) params.append("is_featured", filters.is_featured.toString());
  if (filters.is_popular !== undefined) params.append("is_popular", filters.is_popular.toString());
  if (filters.is_clearance !== undefined) params.append("is_clearance", filters.is_clearance.toString());
  if (filters.search) params.append("search", filters.search);
  if (filters.ordering) params.append("ordering", filters.ordering);
  if (filters.page) params.append("page", filters.page.toString());
  if (filters.page_size) params.append("page_size", filters.page_size.toString());

  const response = await fetch(`${siteConfig.backendUrl}/api/products/?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};

export const getProductBySlug = async (slug: string): Promise<Product> => {
  const response = await fetch(`${siteConfig.backendUrl}/api/products/${slug}/`);

  if (!response.ok) {
    throw new Error(`Failed to fetch product with slug: ${slug}`);
  }

  return response.json();
};
