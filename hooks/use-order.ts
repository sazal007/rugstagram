'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createOrder,
  deleteOrder,
  getOrder,
  getOrders,
  updateOrder,
} from '@/services/order';
import { CreateOrderPayload, OrderFilters, UpdateOrderData, OrdersResponse } from '@/types/order';

export const useOrders = (
  filters?: OrderFilters,
  token?: string,
  options?: { placeholderData?: (previousData: OrdersResponse | undefined) => OrdersResponse | undefined }
) => {
  return useQuery({
    queryKey: ['orders', filters, token], // Include token in queryKey for proper cache separation
    queryFn: () => getOrders(filters, token),
    enabled: !!token, // Only fetch when token is available
    ...options,
  });
};

export const useOrder = (id: string, token?: string) => {
  return useQuery({
    queryKey: ['orders', id, token],
    queryFn: () => getOrder(id, token),
    enabled: !!id && !!token, // Only fetch when both id and token are available
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, token }: { data: CreateOrderPayload; token?: string }) => 
      createOrder(data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      orderNumber,
      data,
      token,
    }: {
      orderNumber: string;
      data: UpdateOrderData;
      token?: string;
    }) => updateOrder(orderNumber, data, token),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['orders', variables.orderNumber] });
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, token }: { id: string; token?: string }) => 
      deleteOrder(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

