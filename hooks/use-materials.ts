"use client";

import { getMaterials } from "@/services/material";
import { Material } from "@/types/product";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useMaterials = (
  options?: Omit<UseQueryOptions<Material[], Error>, "queryKey" | "queryFn">
) => {
  return useQuery<Material[], Error>({
    queryKey: ["materials"],
    queryFn: getMaterials,
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    ...options,
  });
};
