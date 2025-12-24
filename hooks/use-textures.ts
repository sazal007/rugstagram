'use client';
import { getTextures } from '@/services/texture';
import { Texture } from '@/types/texture';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useTextures = (
  options?: Omit<UseQueryOptions<Texture[], Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<Texture[], Error>({
    queryKey: ['textures'],
    queryFn: getTextures,
    staleTime: 6 * 60 * 60 * 1000, 
    gcTime: 6 * 60 * 60 * 1000, 
    ...options,
  });
};