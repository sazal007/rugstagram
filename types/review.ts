export interface Review {
  id: number;
  headline: string;
  review: string;
  image: string | null;
  image_alt_description: string | null;
  rating: number;
  created_at: string;
  updated_at: string;
  product: string | number;
  user: string | number;
  username?: string;
  first_name?: string;
  last_name?: string;
}

export interface CreateReviewPayload {
  product_id: number;
  user: number;
  headline: string;
  review: string;
  rating: number;
  image?: File | null;
  image_alt_description?: string;
}

// Since the user mentioned the response can be a flat array, we should handle that in the service.
// But we can keep ReviewsResponse as the standardized return type of our service for consistency in hooks/components.
// The service layser will verify this.
export interface RatingDistribution {
  count: number;
  percentage: number;
}

export interface ReviewSummary {
  average_rating: number;
  total_reviews: number;
  rating_distribution: {
    [key: string]: RatingDistribution;
  };
}

export interface ReviewsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Review[];
  summary?: ReviewSummary;
}

export interface ReviewFilters {
  product?: string;
  page?: number;
  page_size?: number;
  ordering?: string;
}
