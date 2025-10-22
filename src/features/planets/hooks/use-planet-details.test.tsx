import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePlanetDetails } from "./use-planet-details";
import { planetService } from "../services/planet-service";
import type { PlanetDTO } from "../types/planet.types";

vi.mock("../services/planet-service", () => ({
  planetService: {
    fetchPlanetById: vi.fn(),
  },
}));

vi.mock("@/shared/config", () => ({
  DEFAULT_QUERY_CONFIG: {
    retry: false,
    refetchOnWindowFocus: false,
  },
  QUERY_CONFIGS: {
    details: {},
  },
}));

describe("use-planet-details", () => {
  const mockPlanet: PlanetDTO = {
    id: "1",
    name: "Tatooine",
    climate: "arid",
    terrain: "desert",
    diameter: "10465",
    rotation_period: "23",
    orbital_period: "304",
    gravity: "1 standard",
    population: "200000",
    films: [],
  };

  const createTestQueryClient = () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          retryDelay: 0,
        },
      },
    });

  const createWrapper = () => {
    const testQueryClient = createTestQueryClient();
    return ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={testQueryClient}>
        {children}
      </QueryClientProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch planet details successfully", async () => {
    vi.mocked(planetService.fetchPlanetById).mockResolvedValueOnce(mockPlanet);

    const { result } = renderHook(() => usePlanetDetails("1"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockPlanet);
    expect(planetService.fetchPlanetById).toHaveBeenCalledWith("1");
  });

  it("should not fetch when planetId is empty", () => {
    const { result } = renderHook(() => usePlanetDetails(""), {
      wrapper: createWrapper(),
    });

    expect(result.current.isPending).toBe(true);
    expect(result.current.fetchStatus).toBe("idle");
    expect(planetService.fetchPlanetById).not.toHaveBeenCalled();
  });

  it("should not fetch when planetId is '0'", () => {
    const { result } = renderHook(() => usePlanetDetails("0"), {
      wrapper: createWrapper(),
    });

    expect(result.current.isPending).toBe(true);
    expect(result.current.fetchStatus).toBe("idle");
    expect(planetService.fetchPlanetById).not.toHaveBeenCalled();
  });

  it("should handle fetch error", async () => {
    const mockError = new Error("Planet not found");
    vi.mocked(planetService.fetchPlanetById).mockRejectedValue(mockError);

    const { result } = renderHook(() => usePlanetDetails("999"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(mockError);
  });
});
