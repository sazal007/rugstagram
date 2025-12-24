  'use client';
  import { getCollaborations } from '@/services/collaboration';
  import { Collaboration } from '@/types/collaboration';
  import { useQuery, UseQueryOptions } from '@tanstack/react-query';

  export const useCollaborations = (
    options?: Omit<UseQueryOptions<Collaboration[], Error>, 'queryKey' | 'queryFn'>
  ) => {
    return useQuery<Collaboration[], Error>({
      queryKey: ['collaborations'],
      queryFn: getCollaborations,
      staleTime: 6 * 60 * 60 * 1000, 
      gcTime: 6 * 60 * 60 * 1000, 
      ...options,
    });
  };