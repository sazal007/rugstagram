'use client';

import { getSizes } from '@/services/size';
import { Size } from '@/types/size';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useSizes = (
  options?: Omit<UseQueryOptions<Size[], Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<Size[], Error>({
    queryKey: ['sizes'],
    queryFn: getSizes,
    staleTime: 6 * 60 * 60 * 1000, 
    gcTime: 6 * 60 * 60 * 1000, 
    ...options,
  });
};
