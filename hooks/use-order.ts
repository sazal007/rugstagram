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
  options?: { placeholderData?: (previousData: OrdersResponse | undefined) => OrdersResponse | undefined }
) => {
  return useQuery({
    queryKey: ['orders', filters], // Include filters in queryKey
    queryFn: () => getOrders(filters),
    ...options,
  });
};

export const useOrder = (id: string) => {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: () => getOrder(id),
    enabled: !!id,
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
    }: {
      orderNumber: string;
      data: UpdateOrderData;
    }) => updateOrder(orderNumber, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['orders', variables.orderNumber] });
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};
