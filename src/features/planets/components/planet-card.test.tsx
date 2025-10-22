import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";
import { PlanetCard } from "./planet-card";
import type { PlanetDTO } from "../types/planet.types";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("PlanetCard", () => {
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
    films: [
      { title: "A New Hope", episode_id: 4 },
      { title: "Return of the Jedi", episode_id: 6 },
    ],
  };

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("should render planet information", () => {
    renderWithProviders(<PlanetCard planet={mockPlanet} />);

    expect(screen.getByText("Tatooine")).toBeInTheDocument();
    expect(screen.getByText(/Deserto/i)).toBeInTheDocument(); // terrain translated
    expect(screen.getByText(/Árido/i)).toBeInTheDocument(); // climate translated
    expect(screen.getByText(/10.465 km/i)).toBeInTheDocument();
    expect(screen.getByText(/200.000/i)).toBeInTheDocument();
  });

  it("should render films with badges", () => {
    renderWithProviders(<PlanetCard planet={mockPlanet} />);

    expect(screen.getByText(/Ep. 4: A New Hope/i)).toBeInTheDocument();
    expect(screen.getByText(/Ep. 6: Return of the Jedi/i)).toBeInTheDocument();
  });

  it("should not render films section when films array is empty", () => {
    const planetWithoutFilms = { ...mockPlanet, films: [] };
    renderWithProviders(<PlanetCard planet={planetWithoutFilms} />);

    expect(screen.queryByText(/Filmes:/i)).not.toBeInTheDocument();
  });

  it("should navigate to planet details when button is clicked", async () => {
    const user = userEvent.setup();
    renderWithProviders(<PlanetCard planet={mockPlanet} />);

    const button = screen.getByRole("button", { name: /Ver detalhes/i });
    await user.click(button);

    expect(mockNavigate).toHaveBeenCalledWith("/planets/1");
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  it('should display "Desconhecido" for unknown population', () => {
    const planetWithUnknownPop = { ...mockPlanet, population: "unknown" };
    renderWithProviders(<PlanetCard planet={planetWithUnknownPop} />);

    expect(screen.getByText("Desconhecido")).toBeInTheDocument();
  });

  it('should display "Desconhecido" for unknown diameter', () => {
    const planetWithUnknownDiameter = { ...mockPlanet, diameter: "unknown" };
    renderWithProviders(<PlanetCard planet={planetWithUnknownDiameter} />);

    expect(screen.getByText("Desconhecido")).toBeInTheDocument();
  });
});
