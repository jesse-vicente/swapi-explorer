import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { ProcessedResident } from '@/types/swapi';
import { User } from 'lucide-react';

interface ResidentCardProps {
  resident: ProcessedResident;
}

export function ResidentCard({ resident }: ResidentCardProps) {
  const formatValue = (value: string) => {
    if (value === 'unknown' || value === 'n/a') return 'Desconhecido';
    return value;
  };

  const getGenderLabel = (gender: string) => {
    switch (gender.toLowerCase()) {
      case 'male': return 'Masculino';
      case 'female': return 'Feminino';
      case 'hermaphrodite': return 'Hermafrodita';
      case 'n/a': return 'N/A';
      default: return formatValue(gender);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-2">
          <User className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-lg">{resident.name}</CardTitle>
        </div>
        <CardDescription>
          {getGenderLabel(resident.gender)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-muted-foreground">Cor do cabelo:</span>
            <p className="mt-1">{formatValue(resident.hairColor)}</p>
          </div>
          <div>
            <span className="font-medium text-muted-foreground">Cor dos olhos:</span>
            <p className="mt-1">{formatValue(resident.eyeColor)}</p>
          </div>
        </div>

        {resident.species.length > 0 && (
          <div>
            <span className="font-medium text-muted-foreground">Espécie(s):</span>
            <div className="mt-2 flex flex-wrap gap-1">
              {resident.species.map((species, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                >
                  {species.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {resident.vehicles.length > 0 && (
          <div>
            <span className="font-medium text-muted-foreground">Veículo(s):</span>
            <div className="mt-2 space-y-1">
              {resident.vehicles.map((vehicle, index) => (
                <div
                  key={index}
                  className="bg-accent/50 rounded-md p-2 text-sm"
                >
                  <div className="font-medium">{vehicle.name}</div>
                  <div className="text-xs text-muted-foreground">Modelo: {vehicle.model}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}