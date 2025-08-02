import React from 'react';
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

// Function to fetch real forecast data from OpenWeatherMap
const generateForecast = async (spotId: string): Promise<ForecastDay[]> => {
  console.log(`🌊 FORECAST: Starting fetch for ${spotId}`);
  try {
    // Get spot coordinates
    const spotCoords = getSpotCoordinates(spotId);
    if (!spotCoords) {
      console.warn(`No coordinates found for spot: ${spotId}`);
      return getMockForecast();
    }

    const [lat, lon] = spotCoords.coordinates;
    
    // Fetch 7-day forecast from open-meteo.com (free API)
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max,wind_direction_10m_dominant,precipitation_sum&timezone=auto&forecast_days=7`
    );

    if (!response.ok) {
      console.error('Failed to fetch forecast data');
      return getMockForecast();
    }

    const data = await response.json();
    console.log('Forecast data received:', data);

    // Process forecast data from open-meteo
    const dailyData = data.daily;
    
    return Array.from({ length: 7 }, (_, index) => {
      const windSpeedKmh = (dailyData.wind_speed_10m_max[index] || 5) * 3.6;
      const windFactor = Math.min(windSpeedKmh / 30, 1);
      const waveHeight = 0.5 + (windFactor * 2) + (Math.random() * 0.5);
      
      let conditions: 'faible' | 'moyen' | 'bon' | 'excellent' = 'moyen';
      let rating = 3;
      
      if (waveHeight > 1.8 && windSpeedKmh < 15) {
        conditions = 'excellent';
        rating = 5;
      } else if (waveHeight > 1.2 && windSpeedKmh < 20) {
        conditions = 'bon';
        rating = 4;
      } else if (waveHeight < 0.8 || windSpeedKmh > 25) {
        conditions = 'faible';
        rating = 2;
      }

      return {
        date: new Date(dailyData.time[index]),
        waveHeight: `${(waveHeight * 0.8).toFixed(1)}-${(waveHeight * 1.2).toFixed(1)}m`,
        windDirection: getWindDirection(dailyData.wind_direction_10m_dominant[index] || 180),
        windSpeed: Math.round(windSpeedKmh),
        rating: rating,
        conditions: conditions
      };
    });
  } catch (error) {
    console.error('Error fetching forecast:', error);
    return getMockForecast();
  }
};

// Fallback mock data
const getMockForecast = (): ForecastDay[] => {
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
    ...baseData[i],
    windDirection: windDirections[i]
  }));
};

// Helper function to get spot coordinates
const getSpotCoordinates = (spotId: string): { coordinates: [number, number] } | null => {
  const spots: Record<string, { coordinates: [number, number] }> = {
    'mehdia-beach': { coordinates: [34.2570, -6.6810] },
    'rabat-beach': { coordinates: [34.0252, -6.8361] }, // More accurate Rabat Beach coordinates
    'mohammedia': { coordinates: [33.722732, -7.348247] },
    'dar-bouazza': { coordinates: [33.530570, -7.832972] },
    'bouznika': { coordinates: [33.825611, -7.150553] },
    'plage-des-nations': { coordinates: [34.150943, -6.738099] },
    'larache': { coordinates: [35.205304, -6.152181] },
    'assilah': { coordinates: [35.475152, -6.031830] },
    'moulay-bouselham': { coordinates: [34.888412, -6.295382] },
    'safi': { coordinates: [32.320099, -9.259436] },
    'imsouane': { coordinates: [30.839529, -9.819274] },
    'taghazout': { coordinates: [30.544901, -9.727011] },
    'anchor-point': { coordinates: [30.5325, -9.7189] },
    'sidi-ifni': { coordinates: [29.387104, -10.174070] },
    'tarfaya': { coordinates: [27.947872, -12.928467] },
    'dakhla': { coordinates: [23.767069, -15.925064] }
  };
  return spots[spotId] || null;
};

// Helper function to convert wind angle to direction
const getWindDirection = (angle: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return directions[Math.round(angle / 22.5) % 16];
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
  const [forecast, setForecast] = React.useState<ForecastDay[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchForecast = async () => {
      setLoading(true);
      const forecastData = await generateForecast(spotId);
      setForecast(forecastData);
      setLoading(false);
    };

    fetchForecast();
  }, [spotId]);

  if (loading) {
    return (
      <Card className={`shadow-ocean overflow-hidden ${transparent ? 'bg-white/10 backdrop-blur-sm border-white/20' : ''}`}>
        <CardHeader>
          <CardTitle className={`flex items-center ${transparent ? 'text-white' : ''}`}>
            <Waves className="w-5 h-5 mr-2" />
            Prévisions 7 jours
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-center">Chargement des prévisions...</div>
        </CardContent>
      </Card>
    );
  }

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