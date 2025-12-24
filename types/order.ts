// Order list API response
export type OrdersResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Order[];
};

// Single order
export type Order = {
  id: number;
  full_name: string;
  order_number: string;
  status: "pending" | "cancelled" | "completed" | "processing"; 
  shipping_address: string;
  city: string;
  state: string;
  zip_code: string;
  phone_number: string;
  email: string;
  total_amount: string;
  delivery_fee: string;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
};

// Order item
export type OrderItem = {
  product_id: string;
  product_name: string;
  product_slug: string;
  product_thumbnail_image: string;
  product_price: string;
  quantity: number;
  price: string;
  total_price: number;
  color: string | null;
  size: string;
  cover: string;
  pad: string;
};

export type CreateOrderItemPayload = {
  product_id: string;
  quantity: number;
  price: number;
  size: string;
};

export type CreateOrderPayload = {
  full_name: string;
  email: string;
  phone_number: string;
  shipping_address: string;
  city: string;
  zip_code: string;
  shipping_method?: "standard" | "express";
  total_amount: number;
  items: CreateOrderItemPayload[];
};
