import { siteConfig } from "@/config/siteConfig";
import { Category } from "@/types/category";

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
