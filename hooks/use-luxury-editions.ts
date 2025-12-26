"use client";

import { getLuxuryEditions } from "@/services/luxury-edition";
import { LuxuryEdition } from "@/types/product";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useLuxuryEditions = (
  options?: Omit<UseQueryOptions<LuxuryEdition[], Error>, "queryKey" | "queryFn">
) => {
  return useQuery<LuxuryEdition[], Error>({
    queryKey: ["luxury-editions"],
    queryFn: getLuxuryEditions,
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    ...options,
  });
};
