export const API_CONFIG = {
  baseURL: "https://swapi.dev/api",
  timeout: 30000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
  },
} as const;

export const PAGINATION_CONFIG = {
  defaultPage: 1,
  defaultPageSize: 10,
} as const;
