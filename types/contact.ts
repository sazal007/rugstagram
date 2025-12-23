export type Contact = {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  message?: string;
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
};

export type ContactResponse = Contact[];
