import { useQuery } from "@tanstack/react-query";
import { productApi, ProductFilters } from "@/services/product";
import { useAuth } from "./useAuth";

export const useProducts = (filters: ProductFilters = {}) => {
  const { tokens } = useAuth();
  
  return useQuery({
    queryKey: ["products", filters, tokens?.access_token],
    queryFn: () => productApi.getAll(filters, tokens?.access_token),
  });
};

export const useProduct = (slug: string) => {
  const { tokens } = useAuth();

  return useQuery({
    queryKey: ["product", slug, tokens?.access_token],
    queryFn: () => productApi.getBySlug(slug, tokens?.access_token),
    enabled: !!slug,
  });
};
