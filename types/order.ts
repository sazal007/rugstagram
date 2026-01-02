export interface OrderItemPayload {
  variant: number;
  quantity: number;
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

export type OrderStage =
  | "Wool Sorting"
  | "Carding"
  | "Spinning"
  | "Pot Dyeing"
  | "Graph Creation"
  | "Hand Knotting"
  | "Trimming"
  | "Washing"
  | "Stretching"
  | "Finishing"
  | "Shipping"
  | "Delivered";
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
  email: string;
  phone_number: string;
  shipping_address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  total_amount: number;
  delivery_fee: number;
  items: OrderItemPayload[];
}

// Interface for items in the Order response (Read-only)
export interface OrderItem {
  id?: number;
  product_id: number;
  product_name: string;
  product_slug?: string;
  product_thumbnail_image: string | null;
  product_price: number;
  price?: number;
  total_price: number;
  quantity: number;
  size?: string;
  color?: string;
  cover?: string;
  pad?: string;
  variant?: number; // In case backend returns it
}

export interface Order {
  id: number;
  full_name: string;
  order_number: string;
  status: OrderStatus;
  stage: OrderStage | null;
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
}
export interface UpdateOrderData {
  status?: OrderStatus;
  stage?: OrderStage;
  shipping_address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  phone_number?: string;
}
