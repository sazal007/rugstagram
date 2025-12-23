import { siteConfig } from "@/config/siteConfig";
import { SubCategory } from "@/types/sub-category";

export const getSubCategories = async (categorySlug?: string): Promise<SubCategory[]> => {
  const url = categorySlug 
    ? `${siteConfig.backendUrl}/api/subcategories/?category__slug=${categorySlug}`
    : `${siteConfig.backendUrl}/api/subcategories/`;
    
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch sub-categories");
  }

  return response.json();
};

export const getSubCategoryBySlug = async (slug: string): Promise<SubCategory> => {
  const response = await fetch(`${siteConfig.backendUrl}/api/subcategories/${slug}/`);

  if (!response.ok) {
    throw new Error(`Failed to fetch sub-category with slug: ${slug}`);
  }

  return response.json();
};
