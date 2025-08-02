import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Waves, Wind } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ForecastDay {
  date: Date;
  waveHeight: string;
  windDirection: string;
  windSpeed: number;
  rating: number;
  conditions: 'faible' | 'moyen' | 'bon' | 'excellent';
}

interface WavesForecastProps {
  spotId: string;
  transparent?: boolean;
}

// Mock forecast data - in a real app this would come from an API
const generateForecast = (spotId: string): ForecastDay[] => {
  const baseData = [
    { waveHeight: '0.6-0.9m', windSpeed: 8, rating: 3, conditions: 'moyen' as const },
    { waveHeight: '0.9-1.2m', windSpeed: 6, rating: 4, conditions: 'bon' as const },
    { waveHeight: '0.6-0.9m', windSpeed: 12, rating: 2, conditions: 'faible' as const },
    { waveHeight: '0.9-1.2m', windSpeed: 5, rating: 4, conditions: 'bon' as const },
    { waveHeight: '1.2-1.5m', windSpeed: 7, rating: 5, conditions: 'excellent' as const },
    { waveHeight: '1.2-1.5m', windSpeed: 9, rating: 4, conditions: 'bon' as const },
    { waveHeight: '0.9-1.2m', windSpeed: 11, rating: 3, conditions: 'moyen' as const }
  ];

  const windDirections = ['NO', 'O', 'SO', 'E', 'NE', 'N', 'SE'];

  return Array.from({ length: 7 }, (_, i) => ({
    date: addDays(new Date(), i),
    waveHeight: baseData[i].waveHeight,
    windDirection: windDirections[i],
    windSpeed: baseData[i].windSpeed,
    rating: baseData[i].rating,
    conditions: baseData[i].conditions
  }));
};

const getConditionColor = (conditions: string) => {
  switch (conditions) {
    case 'excellent': return 'bg-green-500';
    case 'bon': return 'bg-blue-500';
    case 'moyen': return 'bg-yellow-500';
    case 'faible': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

const getRatingStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
      ★
    </span>
  ));
};

export const WavesForecast = ({ spotId, transparent = false }: WavesForecastProps) => {
  const forecast = generateForecast(spotId);

  return (
    <Card className={`shadow-ocean overflow-hidden ${transparent ? 'bg-white/10 backdrop-blur-sm border-white/20' : ''}`}>
      <CardHeader>
        <CardTitle className={`flex items-center ${transparent ? 'text-white' : ''}`}>
          <Waves className="w-5 h-5 mr-2" />
          Prévisions 7 jours
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <div className="min-w-[800px] p-4">
            {/* Header */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {forecast.map((day, index) => (
                <div key={index} className="text-center">
                  <div className={`text-sm font-medium ${transparent ? 'text-white' : 'text-foreground'}`}>
                    {index === 0 ? 'Aujourd\'hui' : format(day.date, 'EEE d/M', { locale: fr })}
                  </div>
                </div>
              ))}
            </div>

            {/* Wave Heights */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {forecast.map((day, index) => (
                <div key={index} className="text-center">
                  <div className={`text-lg font-bold ${transparent ? 'text-white' : 'text-foreground'}`}>
                    {day.waveHeight}
                  </div>
                </div>
              ))}
            </div>

            {/* Wind Info */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {forecast.map((day, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Wind className={`w-4 h-4 ${transparent ? 'text-white' : 'text-muted-foreground'}`} />
                    <span className={`text-sm ${transparent ? 'text-white' : 'text-muted-foreground'}`}>
                      {day.windDirection}
                    </span>
                  </div>
                  <div className={`text-xs ${transparent ? 'text-white/80' : 'text-muted-foreground'}`}>
                    {day.windSpeed} km/h
                  </div>
                </div>
              ))}
            </div>

            {/* Ratings */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {forecast.map((day, index) => (
                <div key={index} className="text-center">
                  <div className="text-sm">
                    {getRatingStars(day.rating)}
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`text-xs mt-1 ${transparent ? 'border-white/20 text-white' : ''}`}
                  >
                    {day.conditions}
                  </Badge>
                </div>
              ))}
            </div>

            {/* Condition Bars */}
            <div className="grid grid-cols-7 gap-2">
              {forecast.map((day, index) => (
                <div key={index} className="h-2 rounded-full">
                  <div className={`h-full rounded-full ${getConditionColor(day.conditions)}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};