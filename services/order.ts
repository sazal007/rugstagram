import { siteConfig } from "@/config/siteConfig";
import { Order, OrdersResponse, CreateOrderPayload } from "@/types/order";

const getHeaders = (token?: string) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  } else if (typeof window !== "undefined") {
    // Try to get token from localStorage if not provided
    // Adjust key 'accessToken' based on your auth implementation
    const savedToken = localStorage.getItem("accessToken") || localStorage.getItem("token");
    if (savedToken) {
      headers["Authorization"] = `Bearer ${savedToken}`;
    }
  }

  return headers;
};

export const getOrders = async (token?: string): Promise<OrdersResponse> => {
  const response = await fetch(`${siteConfig.backendUrl}/api/orders/`, {
    headers: getHeaders(token),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  return response.json();
};

export const createOrder = async (
  data: CreateOrderPayload,
  token?: string
): Promise<Order> => {
  const response = await fetch(`${siteConfig.backendUrl}/api/orders/`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Failed to create order");
  }

  return response.json();
};

export const getOrder = async (
  orderNumber: string,
  token?: string
): Promise<Order> => {
  const response = await fetch(
    `${siteConfig.backendUrl}/api/orders/${orderNumber}/`,
    {
      headers: getHeaders(token),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch order");
  }

  return response.json();
};

export const updateOrder = async (
  orderNumber: string,
  data: Partial<CreateOrderPayload>, // or Partial<Order> depending on API
  token?: string
): Promise<Order> => {
  const response = await fetch(
    `${siteConfig.backendUrl}/api/orders/${orderNumber}/`,
    {
      method: "PATCH",
      headers: getHeaders(token),
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update order");
  }

  return response.json();
};

export const deleteOrder = async (
  orderNumber: string,
  token?: string
): Promise<void> => {
  const response = await fetch(
    `${siteConfig.backendUrl}/api/orders/${orderNumber}/`,
    {
      method: "DELETE",
      headers: getHeaders(token),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete order");
  }
};
