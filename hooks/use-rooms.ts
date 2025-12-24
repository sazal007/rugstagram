'use client';

import { getRooms } from '@/services/room';
import { Room } from '@/types/room';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useRooms = (
  options?: Omit<UseQueryOptions<Room[], Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<Room[], Error>({
    queryKey: ['rooms'],
    queryFn: getRooms,
    staleTime: 6 * 60 * 60 * 1000, 
    gcTime: 6 * 60 * 60 * 1000, 
    ...options,
  });
};