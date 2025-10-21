import type {
  SwapiResponse,
  Planet,
  Person,
  Species,
  Vehicle,
  Film,
  ProcessedPlanet,
  ProcessedPlanetDetails,
  ProcessedFilm,
  ProcessedResident,
  ProcessedSpecies,
  ProcessedVehicle,
} from "@/types/swapi";

export class SwapiApiError extends Error {
  status?: number;
  endpoint?: string;

  constructor(message: string, status?: number, endpoint?: string) {
    super(message);
    this.name = "SwapiApiError";
    this.status = status;
    this.endpoint = endpoint;
  }
}

export class SwapiService {
  private readonly baseUrl = "https://swapi.dev/api";

  private async request<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`);

      if (!response.ok) {
        throw new SwapiApiError(
          `HTTP error! status: ${response.status}`,
          response.status,
          endpoint
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof SwapiApiError) {
        throw error;
      }

      throw new SwapiApiError(
        `Network error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        undefined,
        endpoint
      );
    }
  }

  private extractIdFromUrl(url: string): string {
    const matches = url.match(/\/(\d+)\/$/);
    return matches ? matches[1] : "0";
  }

  async getPlanets(
    page: number = 1,
    search?: string
  ): Promise<{
    planets: ProcessedPlanet[];
    totalCount: number;
    hasNext: boolean;
    hasPrevious: boolean;
  }> {
    const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";
    const endpoint = `/planets/?page=${page}${searchParam}`;

    const response = await this.request<SwapiResponse<Planet>>(endpoint);

    const planets = await Promise.all(
      response.results.map(async (planet) => {
        const films = await this.getFilmsForUrls(planet.films);

        return {
          id: this.extractIdFromUrl(planet.url),
          name: planet.name,
          climate: planet.climate,
          terrain: planet.terrain,
          diameter: planet.diameter,
          rotationPeriod: planet.rotation_period,
          orbitalPeriod: planet.orbital_period,
          gravity: planet.gravity,
          population: planet.population,
          films,
        };
      })
    );

    // Sort planets by name
    planets.sort((a, b) => a.name.localeCompare(b.name));

    return {
      planets,
      totalCount: response.count,
      hasNext: response.next !== null,
      hasPrevious: response.previous !== null,
    };
  }

  async getPlanetById(id: string): Promise<ProcessedPlanetDetails> {
    const planet = await this.request<Planet>(`/planets/${id}/`);

    const [films, residents] = await Promise.all([
      this.getFilmsForUrls(planet.films),
      this.getResidentsForUrls(planet.residents),
    ]);

    return {
      id: this.extractIdFromUrl(planet.url),
      name: planet.name,
      climate: planet.climate,
      terrain: planet.terrain,
      diameter: planet.diameter,
      rotationPeriod: planet.rotation_period,
      orbitalPeriod: planet.orbital_period,
      gravity: planet.gravity,
      population: planet.population,
      films,
      residents,
    };
  }

  private async getFilmsForUrls(filmUrls: string[]): Promise<ProcessedFilm[]> {
    if (filmUrls.length === 0) return [];

    try {
      const films = await Promise.all(
        filmUrls.map(async (url) => {
          const film = await this.request<Film>(url.replace(this.baseUrl, ""));
          return {
            title: film.title,
            episodeId: film.episode_id,
          };
        })
      );

      return films.sort((a, b) => a.episodeId - b.episodeId);
    } catch (error) {
      console.warn("Error fetching films:", error);
      return [];
    }
  }

  private async getResidentsForUrls(
    residentUrls: string[]
  ): Promise<ProcessedResident[]> {
    if (residentUrls.length === 0) return [];

    try {
      const residents = await Promise.all(
        residentUrls.map(async (url) => {
          const person = await this.request<Person>(
            url.replace(this.baseUrl, "")
          );

          const [species, vehicles] = await Promise.all([
            this.getSpeciesForUrls(person.species),
            this.getVehiclesForUrls(person.vehicles),
          ]);

          return {
            name: person.name,
            hairColor: person.hair_color,
            eyeColor: person.eye_color,
            gender: person.gender,
            species,
            vehicles,
          };
        })
      );

      return residents;
    } catch (error) {
      console.warn("Error fetching residents:", error);
      return [];
    }
  }

  private async getSpeciesForUrls(
    speciesUrls: string[]
  ): Promise<ProcessedSpecies[]> {
    if (speciesUrls.length === 0) return [];

    try {
      const species = await Promise.all(
        speciesUrls.map(async (url) => {
          const speciesData = await this.request<Species>(
            url.replace(this.baseUrl, "")
          );
          return {
            name: speciesData.name,
          };
        })
      );

      return species;
    } catch (error) {
      console.warn("Error fetching species:", error);
      return [];
    }
  }

  private async getVehiclesForUrls(
    vehicleUrls: string[]
  ): Promise<ProcessedVehicle[]> {
    if (vehicleUrls.length === 0) return [];

    try {
      const vehicles = await Promise.all(
        vehicleUrls.map(async (url) => {
          const vehicle = await this.request<Vehicle>(
            url.replace(this.baseUrl, "")
          );
          return {
            name: vehicle.name,
            model: vehicle.model,
          };
        })
      );

      return vehicles;
    } catch (error) {
      console.warn("Error fetching vehicles:", error);
      return [];
    }
  }
}

export const swapiService = new SwapiService();
