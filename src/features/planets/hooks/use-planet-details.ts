import { useQuery } from "@tanstack/react-query";
import { planetService } from "../services/planet-service";
import { DEFAULT_QUERY_CONFIG, QUERY_CONFIGS } from "@/shared/config";

export const usePlanetDetails = (planetId: string) => {
  return useQuery({
    queryKey: ["planet", planetId],
    queryFn: () => planetService.fetchPlanetById(planetId),
    ...DEFAULT_QUERY_CONFIG,
    ...QUERY_CONFIGS.details,
    enabled: !!planetId && planetId !== "0",
  });
};
