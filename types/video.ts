export interface Video {
  id: number;
  title: string;
  url: string;
  created_at: string;
  updated_at: string;
}

export interface CreateVideo {
  title: string;
  url: string;
}

export interface UpdateVideo extends Partial<CreateVideo> {
  id: number;
}

export interface PaginatedVideoResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Video[];
}
