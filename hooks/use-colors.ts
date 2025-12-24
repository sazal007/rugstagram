'use client';

import { getColors } from '@/services/color';
import { Color } from '@/types/colors';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useColors = (
  options?: Omit<UseQueryOptions<Color[], Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<Color[], Error>({
    queryKey: ['colors'],
    queryFn: getColors,
    staleTime: 6 * 60 * 60 * 1000, 
    gcTime: 6 * 60 * 60 * 1000, 
    ...options,
  });
};