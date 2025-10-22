import { useState } from "react";
import { Search, AlertCircle } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { PlanetCard } from "../components/planet-card";
import { PlanetCardSkeleton } from "../components/planet-card-skeleton";
import { PlanetsPagination } from "../components/planets-pagination";
import { usePlanets } from "../hooks/use-planets";
import { useSearch } from "@/shared/hooks/use-search";
import { PAGINATION_CONFIG } from "@/shared/config";

const ITEMS_PER_PAGE = PAGINATION_CONFIG.defaultPageSize;

export function PlanetsListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { searchValue, debouncedSearchValue, setSearchValue, clearSearch } =
    useSearch();

  const { data, isLoading, error, isError } = usePlanets(
    currentPage,
    debouncedSearchValue
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    clearSearch();
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Planetas de Star Wars</h1>
          <p className="text-muted-foreground">
            Explore a galáxia e descubra os planetas do universo Star Wars!
          </p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Buscar planetas..."
              value={searchValue}
              onChange={handleSearchChange}
              className="pl-10 pr-20"
            />
            {searchValue && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 px-2 text-xs"
              >
                Limpar
              </Button>
            )}
          </div>
        </div>

        {isError && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
              <h3 className="text-lg font-semibold">
                Erro ao carregar planetas
              </h3>
              <p className="text-muted-foreground max-w-md">
                {error?.message ||
                  "Ocorreu um erro inesperado. Tente novamente mais tarde."}
              </p>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
              >
                Tentar novamente
              </Button>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: ITEMS_PER_PAGE }, (_, i) => (
              <PlanetCardSkeleton key={i} />
            ))}
          </div>
        )}

        {!isLoading && !isError && data && (
          <>
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                {debouncedSearchValue
                  ? `${data.totalCount} resultado(s) encontrado(s) para "${debouncedSearchValue}"`
                  : `${data.totalCount} planetas encontrados`}
              </p>
            </div>

            {data.planets.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">
                  Nenhum planeta encontrado
                </h3>
                <p className="text-muted-foreground mb-4">
                  Tente ajustar sua busca ou limpar os filtros.
                </p>
                {debouncedSearchValue && (
                  <Button onClick={handleClearSearch} variant="outline">
                    Limpar busca
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.planets.map((planet) => (
                  <PlanetCard key={planet.id} planet={planet} />
                ))}
              </div>
            )}

            <PlanetsPagination
              currentPage={currentPage}
              totalCount={data.totalCount}
              itemsPerPage={ITEMS_PER_PAGE}
              hasNext={data.hasNext}
              hasPrevious={data.hasPrevious}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}
