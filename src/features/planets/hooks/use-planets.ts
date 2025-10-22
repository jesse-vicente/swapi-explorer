import { useQuery } from "@tanstack/react-query";
import { planetService } from "../services/planet-service";
import { DEFAULT_QUERY_CONFIG, QUERY_CONFIGS } from "@/shared/config";

export const usePlanets = (page: number, search: string) => {
  return useQuery({
    queryKey: ["planets", page, search],
    queryFn: () => planetService.fetchPlanets(page, search || undefined),
    ...DEFAULT_QUERY_CONFIG,
    ...QUERY_CONFIGS.list,
  });
};
