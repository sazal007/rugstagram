import { siteConfig } from "@/config/siteConfig";
import { Review, CreateReviewPayload, ReviewsResponse } from "@/types/review";

const API_BASE_URL = siteConfig.backendUrl;

const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  const tokens = localStorage.getItem("authTokens");
  return tokens ? JSON.parse(tokens).access_token : null;
};

export const reviewService = {
  getReviews: async (productSlug?: string, page: number = 1, pageSize: number = 10): Promise<ReviewsResponse> => {
    const url = new URL(`${API_BASE_URL}/api/reviews/?page=${page}&page_size=${pageSize}&ordering=-created_at`);
    
    if (productSlug) {
      url.searchParams.append("product", productSlug);
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
      const filteredReviews = productSlug
        ? data.filter((review: Review) => {
            const prod = review.product;
            if (typeof prod === 'string') {
              return prod.toLowerCase() === productSlug.toLowerCase(); 
            }
            // If it's a number, we can't easily filter by slug unless we have a map or the slug passed is actually an ID (which it isn't here).
            // However, if the API returns IDs in the list but we query by slug, checking ID vs slug is impossible without more data.
            // But if the user says "changed api and types", usually GET returns normalized data. 
            // If mixed data, we assume string match is what's needed.
            // If the API returns ALL reviews (ids) and we filter by slug, we might miss them if they are numbers.
            // But purely safe implementation:
            return false; 
        })
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
