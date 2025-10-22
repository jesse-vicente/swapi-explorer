export class SWApiError extends Error {
  status?: number;
  endpoint?: string;

  constructor(message: string, status?: number, endpoint?: string) {
    super(message);
    this.name = "SWApiError";
    this.status = status;
    this.endpoint = endpoint;
  }
}

export class SWApiService {
  private readonly baseUrl = "https://swapi.dev/api";

  async get<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`);

      if (!response.ok) {
        throw new SWApiError(
          `HTTP error! status: ${response.status}`,
          response.status,
          endpoint
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof SWApiError) {
        throw error;
      }

      throw new SWApiError(
        `Network error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        undefined,
        endpoint
      );
    }
  }

  extractIdFromUrl(url: string): string {
    const matches = url.match(/\/(\d+)\/$/);
    return matches ? matches[1] : "0";
  }

  replaceBaseUrl(url: string): string {
    return url.replace(this.baseUrl, "");
  }
}

export const swapi = new SWApiService();
