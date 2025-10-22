import {
  isEmpty,
  isUnknown,
  TRANSLATIONS,
  formatNumber,
  translate,
} from "@/shared/utils";
import type { PlanetDTO } from "../types/planet.types";

const NUMBER_UNITS = [
  { limit: 1_000_000_000_000, singular: "trilhão", plural: "trilhões" },
  { limit: 1_000_000_000, singular: "bilhão", plural: "bilhões" },
  { limit: 1_000_000, singular: "milhão", plural: "milhões" },
];

export const formatPopulation = (value?: string | number | null): string => {
  const raw = String(value ?? "")
    .trim()
    .toLowerCase();
  if (isEmpty(raw) || isUnknown(raw)) return TRANSLATIONS.unknown;

  const num = Number(raw.replace(/,/g, ""));
  if (isNaN(num)) return String(value);

  for (const { limit, singular, plural } of NUMBER_UNITS) {
    if (num >= limit) {
      const scaled = num / limit;
      const formatted = Intl.NumberFormat("pt-BR", {
        maximumFractionDigits: scaled % 1 < 0.01 ? 0 : 1,
      }).format(scaled);
      return `${formatted} ${scaled >= 2 ? plural : singular}`;
    }
  }

  return Intl.NumberFormat("pt-BR").format(num);
};

export const formatPlanetData = (planet: PlanetDTO) => {
  const fmt = (value: string, suffix: string) => {
    const n = formatNumber(value);
    return n === TRANSLATIONS.unknown ? n : `${n} ${suffix}`;
  };

  return {
    translatedTerrain: translate(planet.terrain),
    translatedClimate: translate(planet.climate),
    formattedDiameter: fmt(planet.diameter, "km"),
    formattedRotationPeriod: fmt(planet.rotation_period, "horas"),
    formattedOrbitalPeriod: fmt(planet.orbital_period, "dias"),
    formattedPopulation: formatPopulation(planet.population),
  };
};
