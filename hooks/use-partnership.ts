import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postPartnership, getPartnerships } from "@/services/partnership";

export const usePartnership = () => {
  const queryClient = useQueryClient();

  const {
    data: partnerships = [],
    isLoading,
    error,
    refetch: fetchPartnerships,
  } = useQuery({
    queryKey: ["partnerships"],
    queryFn: getPartnerships,
  });

  const mutation = useMutation({
    mutationFn: postPartnership,
    onSuccess: () => {
      // Invalidate and refetch partnerships list
      queryClient.invalidateQueries({ queryKey: ["partnerships"] });
    },
  });

  return {
    isLoading,
    isSubmitting: mutation.isPending,
    error: (error as Error)?.message || (mutation.error as Error)?.message || null,
    partnerships,
    isSuccess: mutation.isSuccess,
    fetchPartnerships,
    createPartnership: mutation.mutateAsync,
    resetSuccess: mutation.reset,
  };
};
