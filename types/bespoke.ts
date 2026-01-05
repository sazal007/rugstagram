export interface Bespoke {
  id: number;
  message: string;
  full_name: string;
  phone_number: string;
  email: string;
  image: string | File;
  created_at: string;
  updated_at: string;
}

export interface PaginatedBespokeResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Bespoke[];
}

export type BespokeResponse = Bespoke[] | PaginatedBespokeResponse;

export interface CreateBespokePayload {
  message: string;
  full_name: string;
  phone_number: string;
  email: string;
  image: File;
}
