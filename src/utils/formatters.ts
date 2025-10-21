import type { ProcessedPlanet } from "@/types/swapi";
import { TRANSLATIONS } from "./translations";

export const isEmpty = (v?: string | null) =>
  !v || v.trim() === "" || v === "none";

export const isUnknown = (v?: string | null) => v === "unknown" || v === "n/a";

export const formatNumber = (value: string) => {
  if (isUnknown(value)) return TRANSLATIONS.unknown;
  const num = Number(value);
  return isNaN(num) ? value : num.toLocaleString("pt-BR");
};

export const formatValue = (value?: string | null) => {
  if (isUnknown(value)) return TRANSLATIONS.unknown;
  if (isEmpty(value)) return TRANSLATIONS.none;
  return value ?? TRANSLATIONS.none;
};

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

export const translate = (value?: string): string =>
  value
    ? value
        .toLowerCase()
        .split(/[,/]/)
        .map((v) => v.trim())
        .map((v) => TRANSLATIONS[v as keyof typeof TRANSLATIONS] || v)
        .join(", ")
    : "—";

export const formatPlanetData = (planet: ProcessedPlanet) => {
  const fmt = (value: string, suffix: string) => {
    const n = formatNumber(value);
    return n === TRANSLATIONS.unknown ? n : `${n} ${suffix}`;
  };

  return {
    translatedTerrain: translate(planet.terrain),
    translatedClimate: translate(planet.climate),
    formattedDiameter: fmt(planet.diameter, "km"),
    formattedRotationPeriod: fmt(planet.rotationPeriod, "horas"),
    formattedOrbitalPeriod: fmt(planet.orbitalPeriod, "dias"),
    formattedPopulation: formatPopulation(planet.population),
  };
};
