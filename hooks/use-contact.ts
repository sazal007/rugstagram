import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postContact, getContacts } from "@/services/contact";

export const useContact = () => {
  const queryClient = useQueryClient();

  const {
    data: contacts = [],
    isLoading,
    error,
    refetch: fetchContacts,
  } = useQuery({
    queryKey: ["contacts"],
    queryFn: getContacts,
  });

  const mutation = useMutation({
    mutationFn: postContact,
    onSuccess: () => {
      // Invalidate and refetch contacts list
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });

  return {
    isLoading,
    isSubmitting: mutation.isPending,
    error: (error as Error)?.message || (mutation.error as Error)?.message || null,
    contacts,
    isSuccess: mutation.isSuccess,
    fetchContacts,
    createContact: mutation.mutateAsync,
    resetSuccess: mutation.reset,
  };
};
