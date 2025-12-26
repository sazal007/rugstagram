"use client";

import { getDesignNames } from "@/services/design-name";
import { DesignName } from "@/types/product";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useDesignNames = (
  options?: Omit<UseQueryOptions<DesignName[], Error>, "queryKey" | "queryFn">
) => {
  return useQuery<DesignName[], Error>({
    queryKey: ["design-names"],
    queryFn: getDesignNames,
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    ...options,
  });
};
