import { useQuery } from "@tanstack/react-query";
import { productApi, ProductFilters } from "@/services/product";

export const useProducts = (filters: ProductFilters = {}) => {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => productApi.getAll(filters),
  });
};

export const useProduct = (slug: string) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => productApi.getBySlug(slug),
    enabled: !!slug,
  });
};
