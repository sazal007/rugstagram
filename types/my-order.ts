import { OrderStage } from "./order";

export interface OrderItem {
  product_id: string;
  product_name: string;
  product_slug: string;
  product_thumbnail_image: string;
  product_price: string;
  quantity: number;
  price: string;
  total_price: number;
  color: string;
  size: string;
  cover: string;
  pad: string;
}

export interface MyOrder {
  id: number;
  full_name: string;
  order_number: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  stage?: OrderStage | null;
  shipping_address: string;
  city: string;
  state: string;
  zip_code: string;
  phone_number: string;
  email: string;
  length: number;
  total_amount: string;
  delivery_fee: string;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface OrderStatus {
    status_key: string;
    status_value: string;
}

export interface ReviewPayload {
    product_id: number;
    headline: string;
    review: string;
    rating: number;
    image?: File | null;
    image_alt_description?: string;
}

export interface OrderCounts {
  all_orders: number;
  pending: number;
  processing: number;
  shipped: number;
  delivered: number;
  cancelled: number;
}

export interface PaginatedOrdersResponse {
  orders: MyOrder[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}