import { useQuery } from '@tanstack/react-query';
import { swapiService } from '@/services/swapi-service';

export const usePlanetDetails = (planetId: string) => {
  return useQuery({
    queryKey: ['planet', planetId],
    queryFn: () => swapiService.getPlanetById(planetId),
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    enabled: !!planetId && planetId !== '0',
  });
};