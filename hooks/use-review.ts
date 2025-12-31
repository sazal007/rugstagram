import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewService } from "@/services/review";
import { CreateReviewPayload } from "@/types/review";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/error-utils";

export const reviewKeys = {
  all: ["reviews"] as const,
  list: (productSlug?: string, page?: number, pageSize?: number) => 
    [...reviewKeys.all, "list", { productSlug, page, pageSize }] as const,
};

export function useReviews(productSlug?: string, page: number = 1, pageSize: number = 10) {
  return useQuery({
    queryKey: reviewKeys.list(productSlug, page, pageSize),
    queryFn: () => reviewService.getReviews(productSlug, page, pageSize),
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReviewPayload) => reviewService.createReview(data),
    onSuccess: () => {
      toast.success("Review Submitted", {
        description: "Your review has been successfully submitted.",
      });
      // Invalidate all review lists or the specific product list
      queryClient.invalidateQueries({ queryKey: reviewKeys.all });
    },
    onError: (error: unknown) => {
      toast.error("Submission Failed", {
        description: getErrorMessage(error),
      });
    },
  });
}
