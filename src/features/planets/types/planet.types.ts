import type { ResidentDTO } from "@/features/residents/types/resident.types";

export type Planet = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  population: string;
  residents: string[];
  films: string[];
  url: string;
};

export type PlanetDTO = Omit<Planet, "residents" | "films" | "url"> & {
  id: string;
  films: Film[];
  residents?: ResidentDTO[];
};

export type Film = {
  title: string;
  episode_id: number;
};
