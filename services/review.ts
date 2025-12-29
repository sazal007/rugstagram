import { siteConfig } from "@/config/siteConfig";
import { Review, CreateReviewPayload, ReviewsResponse } from "@/types/review";

const API_BASE_URL = siteConfig.backendUrl;

const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  const tokens = localStorage.getItem("authTokens");
  return tokens ? JSON.parse(tokens).access_token : null;
};

export const reviewService = {
  getReviews: async (productId?: number, page: number = 1, pageSize: number = 10): Promise<ReviewsResponse> => {
    const url = new URL(`${API_BASE_URL}/api/reviews/`);
    url.searchParams.append("page", page.toString());
    url.searchParams.append("page_size", pageSize.toString());
    url.searchParams.append("ordering", "-created_at");
    
    if (productId) {
      url.searchParams.append("product", productId.toString());
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to fetch reviews");
    }

    const data = await response.json();

    // Check if the response is an array (flat response) or an object (paginated response)
    if (Array.isArray(data)) {
      // Filter by product if productId is provided, as the API might be returning all reviews
      const filteredReviews = productId 
        ? data.filter((review: Review) => review.product === productId)
        : data;

      return {
        count: filteredReviews.length,
        next: null,
        previous: null,
        results: filteredReviews,
      };
    }

    return data;
  },

  createReview: async (reviewData: CreateReviewPayload): Promise<Review> => {
    const token = getAuthToken();

    if (!token) {
      throw new Error("Authentication required to add a review.");
    }

    const formData = new FormData();
    formData.append("product", reviewData.product_id.toString());
    formData.append("user", reviewData.user.toString());
    formData.append("headline", reviewData.headline);
    formData.append("review", reviewData.review);
    formData.append("rating", reviewData.rating.toString());

    if (reviewData.image) {
      formData.append("image", reviewData.image);
    }

    if (reviewData.image_alt_description) {
      formData.append("image_alt_description", reviewData.image_alt_description);
    }

    const response = await fetch(`${API_BASE_URL}/api/reviews/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      // Throw the full error data to let getErrorMessage handle it
      throw { response: { status: response.status, data: errorData } };
    }

    return response.json();
  },
};
