export interface Review {
  id: number;
  headline: string;
  review: string;
  image: string | null;
  image_alt_description: string | null;
  rating: number;
  created_at: string;
  updated_at: string;
  product: number;
  user: number;
  username?: string;
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

export interface ReviewsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Review[];
}

export interface ReviewFilters {
  product?: number;
  page?: number;
  page_size?: number;
  ordering?: string;
}
