"use client";

import { getQualities } from "@/services/quality";
import { Quality } from "@/types/product";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useQualities = (
  options?: Omit<UseQueryOptions<Quality[], Error>, "queryKey" | "queryFn">
) => {
  return useQuery<Quality[], Error>({
    queryKey: ["qualities"],
    queryFn: getQualities,
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    ...options,
  });
};
