import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postSubscriber, getSubscribers } from "@/services/newsletter";

export const useNewsletter = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postSubscriber,
    onSuccess: () => {
      // Invalidate and refetch subscribers list
      queryClient.invalidateQueries({ queryKey: ["subscribers"] });
    },
  });

  return {
    isSubmitting: mutation.isPending,
    error: (mutation.error as Error)?.message || null,
    isSuccess: mutation.isSuccess,
    subscribe: mutation.mutateAsync,
    resetSuccess: mutation.reset,
  };
};

export const useNewsletterSubscriptions = () => {
  return useQuery({
    queryKey: ["subscribers"],
    queryFn: getSubscribers,
    refetchInterval: 30000, 
    staleTime: 60000, 
  });
};
