'use client';
import { getStyles } from '@/services/style';
import { Style } from '@/types/style';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useStyles = (
  options?: Omit<UseQueryOptions<Style[], Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<Style[], Error>({
    queryKey: ['styles'],
    queryFn: getStyles,
    staleTime: 6 * 60 * 60 * 1000, 
    gcTime: 6 * 60 * 60 * 1000, 
    ...options,
  });
};