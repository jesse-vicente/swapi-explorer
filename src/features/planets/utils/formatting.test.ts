import { describe, it, expect } from "vitest";
import { formatPopulation, formatPlanetData } from "./formatting";
import type { PlanetDTO } from "../types/planet.types";

describe("formatPopulation", () => {
  it("should format population in millions", () => {
    expect(formatPopulation("1000000")).toBe("1 milhão");
    expect(formatPopulation("2000000")).toBe("2 milhões");
  });

  it("should format population in billions", () => {
    expect(formatPopulation("1000000000")).toBe("1 bilhão");
    expect(formatPopulation("2500000000")).toBe("2,5 bilhões");
  });

  it("should format population in trillions", () => {
    expect(formatPopulation("1000000000000")).toBe("1 trilhão");
    expect(formatPopulation("3200000000000")).toBe("3,2 trilhões");
  });

  it("should format small numbers with thousand separators", () => {
    expect(formatPopulation("1000")).toBe("1.000");
    expect(formatPopulation("200000")).toBe("200.000");
  });

  it('should return "Desconhecido" for unknown values', () => {
    expect(formatPopulation("unknown")).toBe("Desconhecido");
    expect(formatPopulation("Unknown")).toBe("Desconhecido");
    expect(formatPopulation("UNKNOWN")).toBe("Desconhecido");
  });

  it('should return "Desconhecido" for empty values', () => {
    expect(formatPopulation("")).toBe("Desconhecido");
    expect(formatPopulation("  ")).toBe("Desconhecido");
    expect(formatPopulation(null)).toBe("Desconhecido");
    expect(formatPopulation(undefined)).toBe("Desconhecido");
  });

  it("should handle invalid numbers", () => {
    expect(formatPopulation("invalid")).toBe("invalid");
    expect(formatPopulation("abc123")).toBe("abc123");
  });

  it("should handle numbers with commas", () => {
    expect(formatPopulation("1,000,000")).toBe("1 milhão");
  });

  it("should use singular form for numbers less than 2 units", () => {
    expect(formatPopulation("1000000")).toBe("1 milhão");
    expect(formatPopulation("1999999")).toBe("1,9 milhão");
  });
});

describe("formatPlanetData", () => {
  const mockPlanet: PlanetDTO = {
    id: "1",
    name: "Tatooine",
    climate: "arid",
    terrain: "desert",
    diameter: "10465",
    rotation_period: "23",
    orbital_period: "304",
    gravity: "1 standard",
    population: "200000",
    films: [],
  };

  it("should format all planet data correctly", () => {
    const result = formatPlanetData(mockPlanet);

    expect(result).toEqual({
      translatedTerrain: expect.any(String),
      translatedClimate: expect.any(String),
      formattedDiameter: "10.465 km",
      formattedRotationPeriod: "23 horas",
      formattedOrbitalPeriod: "304 dias",
      formattedPopulation: "200.000",
    });
  });

  it("should handle unknown values", () => {
    const planetWithUnknown: PlanetDTO = {
      ...mockPlanet,
      diameter: "unknown",
      population: "unknown",
      rotation_period: "unknown",
    };

    const result = formatPlanetData(planetWithUnknown);

    expect(result.formattedDiameter).toBe("Desconhecido");
    expect(result.formattedPopulation).toBe("Desconhecido");
    expect(result.formattedRotationPeriod).toBe("Desconhecido");
  });

  it("should not add suffix to unknown values", () => {
    const planetWithUnknown: PlanetDTO = {
      ...mockPlanet,
      diameter: "unknown",
    };

    const result = formatPlanetData(planetWithUnknown);

    expect(result.formattedDiameter).toBe("Desconhecido");
    expect(result.formattedDiameter).not.toContain("km");
  });
});
