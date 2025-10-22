import { swapi } from "@/shared/services/swapi";
import type { SwapiResponse } from "@/shared/types/swapi.types";
import type { Planet, PlanetDTO, Film } from "../types/planet.types";
import { residentService } from "@/features/residents/services/resident-service";

class PlanetService {
  async fetchPlanets(
    page: number = 1,
    search?: string
  ): Promise<{
    planets: PlanetDTO[];
    totalCount: number;
    hasNext: boolean;
    hasPrevious: boolean;
  }> {
    const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";
    const endpoint = `/planets/?page=${page}${searchParam}`;

    const response = await swapi.get<SwapiResponse<Planet>>(endpoint);

    const planets: PlanetDTO[] = await Promise.all(
      response.results.map(async (planet: Planet) => {
        const films = await this.fetchPlanetFilms(planet.films);

        return {
          id: swapi.extractIdFromUrl(planet.url),
          name: planet.name,
          climate: planet.climate,
          terrain: planet.terrain,
          diameter: planet.diameter,
          rotation_period: planet.rotation_period,
          orbital_period: planet.orbital_period,
          gravity: planet.gravity,
          population: planet.population,
          films,
        };
      })
    );

    // Sort planets by name (business rule specific to planets)
    planets.sort((a, b) => a.name.localeCompare(b.name));

    return {
      planets,
      totalCount: response.count,
      hasNext: response.next !== null,
      hasPrevious: response.previous !== null,
    };
  }

  async fetchPlanetById(id: string): Promise<PlanetDTO> {
    const planet = await swapi.get<Planet>(`/planets/${id}/`);

    const [films, residents] = await Promise.all([
      this.fetchPlanetFilms(planet.films),
      this.fetchPlanetResidents(planet.residents),
    ]);

    return {
      id: swapi.extractIdFromUrl(planet.url),
      name: planet.name,
      climate: planet.climate,
      terrain: planet.terrain,
      diameter: planet.diameter,
      rotation_period: planet.rotation_period,
      orbital_period: planet.orbital_period,
      gravity: planet.gravity,
      population: planet.population,
      films,
      residents,
    };
  }

  private async fetchPlanetFilms(urls: string[]): Promise<Film[]> {
    if (urls.length === 0) return [];

    try {
      const films = await Promise.all(
        urls.map(async (url) => {
          const film = await swapi.get<Film>(swapi.replaceBaseUrl(url));
          return {
            title: film.title,
            episode_id: film.episode_id,
          };
        })
      );

      return films.sort((a, b) => a.episode_id - b.episode_id);
    } catch (error) {
      console.warn("Error fetching films:", error);
      return [];
    }
  }

  private async fetchPlanetResidents(urls: string[]) {
    return residentService.fetchResidentsByUrls(urls);
  }
}

export const planetService = new PlanetService();
