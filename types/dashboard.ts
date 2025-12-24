

export interface DashboardStats {
  total_products: number;
  total_orders: number;
  pending_orders: number;
  total_revenue: number;
}

export type RevenueFilterType = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface RevenueDataItem {
  period: string; 
  total_revenue: number;
  order_count: number;
}

export interface RevenueAPIResponse {
  filter_type: RevenueFilterType;
  data: RevenueDataItem[];
}