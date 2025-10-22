export type Resident = {
  name: string;
  hair_color: string;
  eye_color: string;
  gender: string;
  species: string[];
  vehicles: string[];
};

export type ResidentDTO = Omit<Resident, "species" | "vehicles"> & {
  species: Specie[];
  vehicles: Vehicle[];
};

export type Specie = {
  name: string;
};

export type Vehicle = {
  name: string;
  model: string;
};
