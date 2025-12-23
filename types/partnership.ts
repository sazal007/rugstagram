export type Address = {
  id: number;
  full_name: string;
  street_address: string;
  street_address2: string;
  city: string;
  state: string;
  code: string;
  country: string;
  phone_number: string;
  email: string;
  comments: string;
  created_at: string;
  updated_at: string; 
};

export type AddressList= Address[];
