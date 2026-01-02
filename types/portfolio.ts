export interface PortfolioImage {
  id: number;
  image: string;
  alt_description: string;
  created_at: string;
}

export interface Portfolio {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  thumbnail_alt_description: string;
  images: PortfolioImage[];
  created_at: string;
}

export interface CreatePortfolioPayload extends Omit<Portfolio, 'id' | 'slug' | 'images' | 'created_at' | 'thumbnail' | 'thumbnail_alt_description'> {
  thumbnail: string;
  thumbnail_alt_description: string;
  images?: {
    image: string;
    alt_description: string;
  }[];
}

export type UpdatePortfolioPayload = Partial<CreatePortfolioPayload>;

export interface PortfolioListResponse {
  results: Portfolio[];
  count: number;
  next: string | null;
  previous: string | null;
}

export interface PortfolioFormData {
  title: string;
  description: string;
  thumbnail: File | string | null;
  thumbnail_alt_description: string;
  gallery: {
    file?: File;
    preview: string;
    altText: string;
    id?: number;
  }[];
}
