import { siteConfig } from "@/config/siteConfig";
import {
  OrderCounts,
  ReviewPayload,
  PaginatedOrdersResponse,
} from "@/types/my-order";
import { ProductReview } from "@/types/product-review";

const API_BASE_URL = siteConfig.backendUrl;

export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  const tokens = localStorage.getItem("authTokens");
  return tokens ? JSON.parse(tokens).access_token : null;
};

const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const orderApi = {
  getMyOrders: async (
    status?: string,
    search?: string,
    page: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedOrdersResponse> => {
    const headers = getAuthHeaders();
    const token = getAuthToken();

    if (!token) {
      return {
        orders: [],
        total: 0,
        page: 1,
        pageSize,
        totalPages: 0,
        hasNext: false,
        hasPrevious: false,
      };
    }

    const url = new URL(`${API_BASE_URL}/api/my-orders/`);
    url.searchParams.append("ordering", "-created_at");
    url.searchParams.append("page", page.toString());
    url.searchParams.append("page_size", pageSize.toString());

    if (status && status !== "all") {
      url.searchParams.append("status", status);
    }

    if (search && search.trim()) {
      url.searchParams.append("search", search.trim());
    }

    try {
      const response = await fetch(url.toString(), { headers });

      if (!response.ok) {
        throw new Error(`Failed to fetch user orders: ${response.status}`);
      }

      const data = await response.json();

      const totalPages = Math.ceil(data.count / pageSize);

      return {
        orders: data.results || [],
        total: data.count || 0,
        page,
        pageSize,
        totalPages,
        hasNext: data.next !== null,
        hasPrevious: data.previous !== null,
      };
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw new Error("Failed to fetch user orders");
    }
  },

  getOrderCounts: async (): Promise<OrderCounts> => {
    const headers = getAuthHeaders();

    try {
      const response = await fetch(`${API_BASE_URL}/api/my-order-status/`, {
        headers,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch order status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error("Error fetching order counts:", error);
      throw new Error("Failed to fetch order status");
    }
  },

  addReview: async (reviewData: ReviewPayload): Promise<ProductReview> => {
    const token = getAuthToken();

    if (!token) {
      throw new Error("Authentication required to add a review.");
    }

    const formData = new FormData();
    formData.append("product_id", reviewData.product_id.toString());
    formData.append("headline", reviewData.headline);
    formData.append("review", reviewData.review);
    formData.append("rating", reviewData.rating.toString());

    if (reviewData.image) {
      formData.append("image", reviewData.image);
    }

    if (reviewData.image_alt_description) {
      formData.append(
        "image_alt_description",
        reviewData.image_alt_description
      );
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/product-reviews/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to submit review");
      }

      return response.json();
    } catch (error) {
      console.error("Error submitting review:", error);
      throw error;
    }
  },
};
