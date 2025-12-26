"use client";

import { getAffordableEditions } from "@/services/affordable-edition";
import { AffordableEdition } from "@/types/product";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useAffordableEditions = (
  options?: Omit<UseQueryOptions<AffordableEdition[], Error>, "queryKey" | "queryFn">
) => {
  return useQuery<AffordableEdition[], Error>({
    queryKey: ["affordable-editions"],
    queryFn: getAffordableEditions,
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    ...options,
  });
};
