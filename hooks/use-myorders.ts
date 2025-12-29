"use client";
import { orderApi, getAuthToken } from "@/services/my-orders";
import {
  OrderCounts,
  ReviewPayload,
  PaginatedOrdersResponse,
} from "@/types/my-order";
import { ProductReview } from "@/types/product-review";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/error-utils";

export const orderKeys = {
  all: ["orders"] as const,
  lists: () => [...orderKeys.all, "list"] as const,
  list: (
    status: string = "all",
    search: string = "",
    page: number = 1,
    pageSize: number = 10
  ) => [...orderKeys.lists(), { status, search, page, pageSize }],
  counts: () => [...orderKeys.all, "counts"] as const,
};

export const useMyOrders = (
  status?: string,
  search?: string,
  page: number = 1,
  pageSize: number = 10,
  options?: Omit<
    UseQueryOptions<PaginatedOrdersResponse, Error>,
    "queryKey" | "queryFn"
  >
) => {
  const token = getAuthToken();

  return useQuery<PaginatedOrdersResponse, Error>({
    queryKey: orderKeys.list(status, search, page, pageSize),
    queryFn: () => orderApi.getMyOrders(status, search, page, pageSize),
    enabled: !!token,
    staleTime: 30 * 1000, // 30 seconds
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      // Don't retry on 401 errors (authentication issues)
      if (error.message.includes("401")) return false;
      return failureCount < 3;
    },
    ...options,
  });
};

export const useOrderCounts = (
  options?: Omit<UseQueryOptions<OrderCounts, Error>, "queryKey" | "queryFn">
) => {
  const token = getAuthToken();

  return useQuery<OrderCounts, Error>({
    queryKey: orderKeys.counts(),
    queryFn: orderApi.getOrderCounts,
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      if (error.message.includes("401")) return false;
      return failureCount < 3;
    },
    ...options,
  });
};

export const useAddReview = () => {
  const queryClient = useQueryClient();

  return useMutation<ProductReview, Error, ReviewPayload>({
    mutationFn: orderApi.addReview,
    onSuccess: () => {
      toast.success("Review Submitted Successfully!", {
        description:
          "Thank you for your feedback. Your review will be published shortly.",
      });
      // Invalidate and refetch orders to update review status
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
    },
    onError: (error: Error) => {
      toast.error("Failed to Submit Review", {
        description: getErrorMessage(error),
      });
    },
  });
};
