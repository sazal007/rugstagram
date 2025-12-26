"use client";

import { getPileHeights } from "@/services/pile-height";
import { PileHeight } from "@/types/product";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const usePileHeights = (
  options?: Omit<UseQueryOptions<PileHeight[], Error>, "queryKey" | "queryFn">
) => {
  return useQuery<PileHeight[], Error>({
    queryKey: ["pile-heights"],
    queryFn: getPileHeights,
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    ...options,
  });
};
