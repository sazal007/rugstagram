export interface OrderItemPayload {
  product: number;
  product_id: number;
  quantity: number;
  price: string;
  size?: number | null;
  color?: number | null;
  cover?: string | null;
  pad?: string | null;
}

export interface StatusCounts {
  all: number;
  pending: number;
  processing: number;
  shipped: number;
  delivered: number;
  cancelled: number;
}
export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";
export interface OrderFilters {
  status?: string;
  search?: string;
  page?: number;
  page_size?: number;
  ordering?: string;
}
export interface OrdersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Order[];
}
export interface CreateOrderPayload {
  full_name: string;
  shipping_address: string;
  city: string;
  state?: string;
  zip_code: string;
  phone_number: string;
  email: string;
  delivery_fee: string;
  shipping_method?: string;
  items: OrderItemPayload[];
  total_amount: string;
}

export interface Order {
  id: number;
  full_name: string;
  order_number: string;
  status: OrderStatus;
  shipping_address: string;
  city: string;
  state: string;
  zip_code: string;
  phone_number: string;
  email: string;
  total_amount: string;
  delivery_fee: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[];
  created_at: string;
  updated_at: string;
}
export interface UpdateOrderData {
  status?: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shipping_address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  phone_number?: string;
}
