import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postBespoke, getBespokes, getBespokeById } from "@/services/bespoke";
import { PaginatedBespokeResponse } from "@/types/bespoke";

export const useBespokes = () => {
  const {
    data: rawData,
    isLoading,
    error,
    refetch: fetchBespokes,
  } = useQuery({
    queryKey: ["bespokes"],
    queryFn: getBespokes,
  });

  const bespokes = Array.isArray(rawData) 
    ? rawData 
    : (rawData as PaginatedBespokeResponse)?.results || [];

  return {
    isLoading,
    error: (error as Error)?.message || null,
    bespokes,
    totalCount: Array.isArray(rawData) ? rawData.length : (rawData as PaginatedBespokeResponse)?.count || 0,
    fetchBespokes,
  };
};

export const useCreateBespoke = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postBespoke,
    onSuccess: () => {
      // Invalidate and refetch bespokes list
      queryClient.invalidateQueries({ queryKey: ["bespokes"] });
    },
  });

  return {
    isSubmitting: mutation.isPending,
    error: (mutation.error as Error)?.message || null,
    isSuccess: mutation.isSuccess,
    createBespoke: mutation.mutateAsync,
    resetSuccess: mutation.reset,
  };
};

export const useBespokeById = (id: string | number | null) => {
  return useQuery({
    queryKey: ["bespoke", id],
    queryFn: () => getBespokeById(id!),
    enabled: !!id,
  });
};
