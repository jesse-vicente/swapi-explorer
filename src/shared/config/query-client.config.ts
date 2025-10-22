import { QueryClient } from "@tanstack/react-query";

export const CACHE_TIMES = {
  SHORT: 1000 * 60 * 2, // 2 minutes
  MEDIUM: 1000 * 60 * 5, // 5 minutes
  LONG: 1000 * 60 * 10, // 10 minutes
  EXTRA_LONG: 1000 * 60 * 30, // 30 minutes
} as const;

export const DEFAULT_QUERY_CONFIG = {
  staleTime: CACHE_TIMES.MEDIUM,
  gcTime: CACHE_TIMES.LONG,
  retry: 3,
  retryDelay: (attemptIndex: number) =>
    Math.min(1000 * 2 ** attemptIndex, 30000),
  refetchOnWindowFocus: false,
} as const;

export const QUERY_CONFIGS = {
  list: {
    staleTime: CACHE_TIMES.MEDIUM,
    gcTime: CACHE_TIMES.LONG,
  },
  details: {
    staleTime: CACHE_TIMES.LONG,
    gcTime: CACHE_TIMES.EXTRA_LONG,
  },
} as const;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      ...DEFAULT_QUERY_CONFIG,
    },
  },
});
