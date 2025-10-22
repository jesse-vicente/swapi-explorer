import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, AlertCircle, Globe, Users } from "lucide-react";
import { Badge, Button } from "@/shared/components/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { ResidentCard } from "@/features/residents/components/resident-card";
import { usePlanetDetails } from "../hooks/use-planet-details";
import { formatPlanetData } from "../utils";

export function PlanetDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: planet, isLoading, isError } = usePlanetDetails(id || "");

  const handleBack = () => {
    navigate("/");
  };

  if (isError) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Button variant="ghost" onClick={handleBack} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para a lista
          </Button>

          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
              <h3 className="text-lg font-semibold">
                Erro ao carregar planeta
              </h3>
              <p className="text-muted-foreground max-w-md">
                Ocorreu um erro inesperado. Tente novamente mais tarde.
              </p>
              <Button onClick={handleBack} variant="outline">
                Voltar para a lista
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Skeleton className="h-10 w-32 mb-6" />

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-48" />
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 8 }, (_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-6 w-32" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-40" />
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {Array.from({ length: 3 }, (_, i) => (
                    <Skeleton key={i} className="h-24 w-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!planet) {
    return null;
  }

  const {
    translatedTerrain,
    translatedClimate,
    formattedDiameter,
    formattedPopulation,
    formattedRotationPeriod,
    formattedOrbitalPeriod,
  } = formatPlanetData(planet);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="ghost" onClick={handleBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para a lista
        </Button>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Globe className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl md:text-3xl">
                  {planet.name}
                </CardTitle>
              </div>
              <CardDescription className="text-base">
                {translatedTerrain} • {translatedClimate}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <span className="font-medium text-muted-foreground">
                    Período de Rotação:
                  </span>
                  <p className="text-lg font-semibold">
                    {formattedRotationPeriod}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="font-medium text-muted-foreground">
                    Período de Orbitação:
                  </span>
                  <p className="text-lg font-semibold">
                    {formattedOrbitalPeriod}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="font-medium text-muted-foreground">
                    Diâmetro:
                  </span>
                  <p className="text-lg font-semibold">{formattedDiameter}</p>
                </div>

                <div className="space-y-2">
                  <span className="font-medium text-muted-foreground">
                    Clima:
                  </span>
                  <p className="text-lg font-semibold">{translatedClimate}</p>
                </div>

                <div className="space-y-2">
                  <span className="font-medium text-muted-foreground">
                    Gravidade:
                  </span>
                  <p className="text-lg font-semibold">{planet.gravity}</p>
                </div>

                <div className="space-y-2">
                  <span className="font-medium text-muted-foreground">
                    Terreno:
                  </span>
                  <p className="text-lg font-semibold">{translatedTerrain}</p>
                </div>

                <div className="space-y-2">
                  <span className="font-medium text-muted-foreground">
                    População:
                  </span>
                  <p className="text-lg font-semibold">{formattedPopulation}</p>
                </div>
              </div>

              {planet.films.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-semibold text-lg mb-4">
                    Aparece nos filmes:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {planet.films.map((film) => (
                      <Badge
                        key={film.episode_id}
                        className="bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 text-sm font-medium"
                      >
                        Ep. {film.episode_id}: {film.title}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {planet.residents && planet.residents.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl">
                    Nativos ({planet.residents.length})
                  </CardTitle>
                </div>
                <CardDescription>
                  Personagens que nasceram ou vivem neste planeta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {planet.residents.map((resident, index) => (
                    <ResidentCard key={index} resident={resident} />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {planet.residents?.length === 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <CardTitle className="text-xl">Nativos</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  Nenhum nativo conhecido para este planeta.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
