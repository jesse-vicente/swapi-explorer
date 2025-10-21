export interface SwapiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export interface Person {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface Species {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  homeworld: string | null;
  language: string;
  people: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export interface Vehicle {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  vehicle_class: string;
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

// Processed types for UI
export interface ProcessedPlanet {
  id: string;
  name: string;
  climate: string;
  terrain: string;
  diameter: string;
  rotationPeriod: string;
  orbitalPeriod: string;
  gravity: string;
  population: string;
  films: ProcessedFilm[];
}

export interface ProcessedPlanetDetails extends ProcessedPlanet {
  residents: ProcessedResident[];
}

export interface ProcessedFilm {
  title: string;
  episodeId: number;
}

export interface ProcessedResident {
  name: string;
  hairColor: string;
  eyeColor: string;
  gender: string;
  species: ProcessedSpecies[];
  vehicles: ProcessedVehicle[];
}

export interface ProcessedSpecies {
  name: string;
}

export interface ProcessedVehicle {
  name: string;
  model: string;
}