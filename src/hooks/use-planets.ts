import { useQuery } from '@tanstack/react-query';
import { swapiService } from '@/services/swapi-service';

export const usePlanets = (page: number, search: string) => {
  return useQuery({
    queryKey: ['planets', page, search],
    queryFn: () => swapiService.getPlanets(page, search || undefined),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};