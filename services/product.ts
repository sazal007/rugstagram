import { siteConfig } from "@/config/siteConfig";
import { Product, ProductListResponse, ProductListItem } from "@/types/product";

export interface ProductFilters {
  is_featured?: boolean;
  is_popular?: boolean;
  is_best_seller?: boolean;
  collection?: string;
  color?: string;
  search?: string;
  ordering?: string;
  page?: number;
  page_size?: number;

}

const API_BASE_URL = siteConfig.backendUrl;

export const productApi = {
  getAll: async (filters: ProductFilters = {}, token?: string): Promise<ProductListResponse> => {
    const params = new URLSearchParams();
    
    if (filters.is_featured !== undefined) params.append("is_featured", filters.is_featured.toString());
    if (filters.is_best_seller !== undefined) params.append("is_best_seller", filters.is_best_seller.toString());
    if(filters.collection !==undefined) params.append("collection", filters.collection.toString());
    if(filters.color !== undefined) params.append("color", filters.color.toString());
    if (filters.search) params.append("search", filters.search);
    if (filters.ordering) params.append("ordering", filters.ordering);
    if (filters.page) params.append("page", filters.page.toString());
    if (filters.page_size) params.append("page_size", filters.page_size.toString());

    const response = await fetch(`${API_BASE_URL}/api/products/?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { "Authorization": `Bearer ${token}` }),
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return response.json();
  },

  getBySlug: async (slug: string, token?: string): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/api/products/${slug}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { "Authorization": `Bearer ${token}` }),
      },
      cache: "no-store",
    });

    if (!response.ok) {
        // If 404, we might want to handle it gracefully or let the hook handle error
      throw new Error(`Failed to fetch product with slug: ${slug}`);
    }

    return response.json();
  },

  getSimilar: async (colorSlug: string): Promise<ProductListItem[]> => {
    const response = await fetch(`${API_BASE_URL}/api/similar/${colorSlug}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch similar products for color: ${colorSlug}`);
    }

    return response.json();
  }
};
