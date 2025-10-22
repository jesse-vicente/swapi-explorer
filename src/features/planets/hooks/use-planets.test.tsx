import { describe, it, expect, vi, type Mock, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { usePlanets } from "./use-planets";
import { AppProviders } from "@/app/providers";

vi.mock("@/features/planets/services/planet-service", () => ({
  planetService: {
    fetchPlanets: vi.fn(),
  },
}));

import { planetService } from "@/features/planets/services/planet-service";
const mockedFetchPlanets = planetService.fetchPlanets as Mock;

beforeEach(() => {
  mockedFetchPlanets.mockReset();
});

describe("use-planets", () => {
  it("fetches and returns data", async () => {
    mockedFetchPlanets.mockResolvedValueOnce({
      planets: [],
      totalCount: 0,
      hasNext: false,
      hasPrevious: false,
    });

    const { result } = renderHook(() => usePlanets(1, ""), {
      wrapper: ({ children }) => <AppProviders>{children}</AppProviders>,
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.totalCount).toBe(0);
  });
});
