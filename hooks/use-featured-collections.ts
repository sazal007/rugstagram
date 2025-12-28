'use client';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getFeaturedCollections } from '@/services/featured-collection';
import { FeaturedCollection } from '@/types/featured-collection';

export const useFeaturedCollections = (
  options?: Omit<UseQueryOptions<FeaturedCollection[], Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<FeaturedCollection[], Error>({
    queryKey: ['featured-collections'],
    queryFn: getFeaturedCollections,
    staleTime: 6 * 60 * 60 * 1000, // 6 hours
    gcTime: 6 * 60 * 60 * 1000, 
    ...options,
  });
};
