"use client";

import { useQuery, useMutation, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import {
  getCollections,
  getCollectionBySlug,
  createCollection,
  updateCollection,
  deleteCollection,
} from "@/services/collection";
import { Collection } from "@/types/product";

export const useCollections = (
  options?: Omit<UseQueryOptions<Collection[], Error>, "queryKey" | "queryFn">
) => {
  return useQuery<Collection[], Error>({
    queryKey: ["collections"],
    queryFn: getCollections,
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    ...options,
  });
};

export const useCollection = (slug: string) => {
  return useQuery({
    queryKey: ["collection", slug],
    queryFn: () => getCollectionBySlug(slug),
    enabled: !!slug,
  });
};

export const useCreateCollection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
  });
};

export const useUpdateCollection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Parameters<typeof updateCollection>[1] }) =>
      updateCollection(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      queryClient.invalidateQueries({ queryKey: ["collection", data.slug] });
    },
  });
};

export const useDeleteCollection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
  });
};
