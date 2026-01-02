'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getPortfolios,
  getPortfolio,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} from '@/services/portfolio';
import { PortfolioFormData } from '@/types/portfolio';

export const usePortfolios = (params?: Record<string, string>) => {
  return useQuery({
    queryKey: ['portfolios', params],
    queryFn: () => getPortfolios(params),
  });
};

export const usePortfolio = (slug: string) => {
  return useQuery({
    queryKey: ['portfolios', slug],
    queryFn: () => getPortfolio(slug),
    enabled: !!slug,
  });
};

export const useCreatePortfolio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, token }: { data: PortfolioFormData; token?: string }) =>
      createPortfolio(data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolios'] });
    },
  });
};

export const useUpdatePortfolio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
      token,
    }: {
      id: number;
      data: PortfolioFormData;
      token?: string;
    }) => updatePortfolio(id, data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolios'] });
      // Also invalidate the specific portfolio if it was fetched by slug
      // Note: We might not know the slug here, but invalidating 'portfolios' handles it
    },
  });
};

export const useDeletePortfolio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, token }: { id: number; token?: string }) => deletePortfolio(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolios'] });
    },
  });
};
