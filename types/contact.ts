export type Contact = {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  message?: string;
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
};

export interface PaginatedContactResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Contact[];
}

export type ContactResponse = Contact[] | PaginatedContactResponse;
