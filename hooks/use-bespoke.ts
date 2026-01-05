import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postBespoke, getBespokes } from "@/services/bespoke";

export const useBespokes = () => {
  const {
    data: bespokes = [],
    isLoading,
    error,
    refetch: fetchBespokes,
  } = useQuery({
    queryKey: ["bespokes"],
    queryFn: getBespokes,
  });

  return {
    isLoading,
    error: (error as Error)?.message || null,
    bespokes,
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

