import { useQuery } from "@tanstack/react-query";
import { getSubCategories, getSubCategoryBySlug } from "@/services/sub-category";

export const useSubCategories = (categorySlug?: string) => {
  return useQuery({
    queryKey: ["sub-categories", { categorySlug }],
    queryFn: () => getSubCategories(categorySlug),
  });
};

export const useSubCategory = (slug: string) => {
  return useQuery({
    queryKey: ["sub-category", slug],
    queryFn: () => getSubCategoryBySlug(slug),
    enabled: !!slug,
  });
};
