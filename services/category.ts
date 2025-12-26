import { siteConfig } from "@/config/siteConfig";
import { Category } from "@/types/category";

const getHeaders = (token?: string) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  } else if (typeof window !== "undefined") {
    // Try to get token from localStorage if not provided
    const savedToken = localStorage.getItem("accessToken") || localStorage.getItem("token");
    if (savedToken) {
      headers["Authorization"] = `Bearer ${savedToken}`;
    }
  }

  return headers;
};

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${siteConfig.backendUrl}/api/categories/`);

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
};

export const getCategoryBySlug = async (slug: string): Promise<Category> => {
  const response = await fetch(`${siteConfig.backendUrl}/api/categories/${slug}/`);

  if (!response.ok) {
    throw new Error(`Failed to fetch category with slug: ${slug}`);
  }

  return response.json();
};

export const createCategory = async (category: Omit<Category, "id"> | FormData): Promise<Category> => {
  const isFormData = category instanceof FormData;
  const headers = getHeaders();
  
  if (isFormData) {
    // Let browser set Content-Type for FormData
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (headers as any)["Content-Type"];
  }

  const response = await fetch(`${siteConfig.backendUrl}/api/categories/`, {
    method: "POST",
    headers,
    body: isFormData ? category : JSON.stringify(category),
  });

  if (!response.ok) {
    throw new Error("Failed to create category");
  }

  return response.json();
};

export const updateCategory = async (id: number, category: Partial<Category> | FormData): Promise<Category> => {
  const isFormData = category instanceof FormData;
  const headers = getHeaders();
  
  if (isFormData) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (headers as any)["Content-Type"];
  }

  const response = await fetch(`${siteConfig.backendUrl}/api/categories/${id}/`, {
    method: "PATCH",
    headers,
    body: isFormData ? category : JSON.stringify(category),
  });

  if (!response.ok) {
    throw new Error("Failed to update category");
  }

  return response.json();
};

export const deleteCategory = async (id: number): Promise<void> => {
  const response = await fetch(`${siteConfig.backendUrl}/api/categories/${id}/`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || errorData.message || "Failed to delete category");
  }
};
