import { swapi } from "@/shared/services/swapi";
import type {
  Resident,
  ResidentDTO,
  Specie,
  Vehicle,
} from "../types/resident.types";

class ResidentService {
  async fetchResidentsByUrls(urls: string[]): Promise<ResidentDTO[]> {
    if (urls.length === 0) return [];

    try {
      const residents = await Promise.all(
        urls.map(async (url) => {
          const resident = await swapi.get<Resident>(swapi.replaceBaseUrl(url));

          const [species, vehicles] = await Promise.all([
            this.fetchResidentSpecies(resident.species),
            this.fetchResidentVehicles(resident.vehicles),
          ]);

          return {
            name: resident.name,
            hair_color: resident.hair_color,
            eye_color: resident.eye_color,
            gender: resident.gender,
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

  private async fetchResidentSpecies(urls: string[]): Promise<Specie[]> {
    if (urls.length === 0) return [];

    try {
      const species: Specie[] = await Promise.all(
        urls.map(async (url) => {
          const specie = await swapi.get<Specie>(swapi.replaceBaseUrl(url));
          return {
            name: specie.name,
          };
        })
      );

      return species;
    } catch (error) {
      console.warn("Error fetching species:", error);
      return [];
    }
  }

  private async fetchResidentVehicles(urls: string[]): Promise<Vehicle[]> {
    if (urls.length === 0) return [];

    try {
      const vehicles = await Promise.all(
        urls.map(async (url) => {
          const vehicle = await swapi.get<Vehicle>(swapi.replaceBaseUrl(url));

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

export const residentService = new ResidentService();
