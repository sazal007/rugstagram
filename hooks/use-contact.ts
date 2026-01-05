import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postContact, getContacts, getContactById } from "@/services/contact";
import { PaginatedContactResponse } from "@/types/contact";

export const useContact = () => {
  const queryClient = useQueryClient();

  const {
    data: rawData,
    isLoading,
    error,
    refetch: fetchContacts,
  } = useQuery({
    queryKey: ["contacts"],
    queryFn: getContacts,
  });

  const contacts = Array.isArray(rawData) 
    ? rawData 
    : (rawData as PaginatedContactResponse)?.results || [];

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
    totalCount: Array.isArray(rawData) ? rawData.length : (rawData as PaginatedContactResponse)?.count || 0,
    isSuccess: mutation.isSuccess,
    fetchContacts,
    createContact: mutation.mutateAsync,
    resetSuccess: mutation.reset,
  };
};
export const useContactById = (id: string | number | null) => {
  return useQuery({
    queryKey: ["contact", id],
    queryFn: () => getContactById(id!),
    enabled: !!id,
  });
};
