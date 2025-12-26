import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postSubscriber, getSubscribers } from "@/services/newsletter";

export const useNewsletter = () => {
  const queryClient = useQueryClient();

  const {
    data: subscribers = [],
    isLoading,
    error,
    refetch: fetchSubscribers,
  } = useQuery({
    queryKey: ["subscribers"],
    queryFn: getSubscribers,
  });

  const mutation = useMutation({
    mutationFn: postSubscriber,
    onSuccess: () => {
      // Invalidate and refetch subscribers list
      queryClient.invalidateQueries({ queryKey: ["subscribers"] });
    },
  });

  return {
    isLoading,
    isSubmitting: mutation.isPending,
    error: (error as Error)?.message || (mutation.error as Error)?.message || null,
    subscribers,
    isSuccess: mutation.isSuccess,
    fetchSubscribers,
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
