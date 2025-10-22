import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Badge, Button } from "@/shared/components/ui";
import type { PlanetDTO } from "../types/planet.types";
import { formatPlanetData } from "../utils";

interface PlanetCardProps {
  planet: PlanetDTO;
}

export function PlanetCard({ planet }: PlanetCardProps) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/planets/${planet.id}`);
  };

  const {
    translatedTerrain,
    translatedClimate,
    formattedDiameter,
    formattedPopulation,
  } = formatPlanetData(planet);

  return (
    <Card
      className="w-full hover:bg-accent/50 transition-colors"
      data-testid="planet-card"
    >
      <CardHeader>
        <CardTitle className="text-lg">{planet.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {translatedTerrain} • {translatedClimate}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-muted-foreground">Diâmetro:</span>
            <p className="mt-1">{formattedDiameter}</p>
          </div>
          <div>
            <span className="font-medium text-muted-foreground">
              População:
            </span>
            <p className="mt-1">{formattedPopulation}</p>
          </div>
        </div>

        {planet.films.length > 0 && (
          <div className="text-sm">
            <span className="font-medium text-muted-foreground">Filmes:</span>
            <div className="mt-2 flex flex-wrap gap-1">
              {planet.films.map((film) => (
                <Badge key={film.episode_id} variant="secondary">
                  Ep. {film.episode_id}: {film.title}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="pt-2">
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={handleViewDetails}
          >
            Ver detalhes <ArrowRight className="h-4 w-4 ml-1 -mr-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
