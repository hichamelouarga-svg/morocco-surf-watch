import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { surfSpots } from '@/data/surfSpots';
import SurfConditions from '@/components/SurfConditions';
import { SurfConditionsService, RealSurfCondition } from '@/services/surfConditionsService';
import { surfConditionsData } from '@/data/surfConditionsData';
import { Camera, Waves, Wind, Thermometer, Moon, Sun, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface WeatherData {
  temperature: number;
  windSpeed: number;
  waveHeight: number;
  waterTemp: number;
  moonPhase: string;
  sunrise: string;
  sunset: string;
}

const SurfSpotDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [surfConditions, setSurfConditions] = useState<RealSurfCondition | null>(null);
  const [loading, setLoading] = useState(true);
  
  const spot = surfSpots.find(s => s.id === id);

  useEffect(() => {
    const fetchData = async () => {
      if (!spot) return;
      
      try {
        // Fetch real surf conditions
        const realConditions = await SurfConditionsService.fetchConditionsBySpot(spot.id);
        if (realConditions) {
          setSurfConditions(realConditions);
        }
        
        // Check if data is stale and refresh if needed
        const isStale = await SurfConditionsService.isDataStale(6); // 6 hours
        if (isStale) {
          console.log('Data is stale, refreshing...');
          await SurfConditionsService.refreshConditions();
          // Fetch again after refresh
          const refreshedConditions = await SurfConditionsService.fetchConditionsBySpot(spot.id);
          if (refreshedConditions) {
            setSurfConditions(refreshedConditions);
          }
        }
        
        // Legacy weather data fetch for other components
        const response = await axios.get(
          `https://api.open-meteo.com/v1/marine?latitude=${spot.coordinates[0]}&longitude=${spot.coordinates[1]}&hourly=wave_height,wind_speed_10m,ocean_temperature&daily=sunrise,sunset&timezone=auto&forecast_days=7`
        );
        
        setWeatherData({
          temperature: 22,
          windSpeed: 15,
          waveHeight: 1.8,
          waterTemp: 19,
          moonPhase: 'Waxing Crescent',
          sunrise: '07:30',
          sunset: '18:45'
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [spot]);

  if (!spot) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 text-center">
          <h1 className="text-2xl font-bold">Surf spot not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                {t(spot.nameKey)}
              </h1>
              {spot.hasLiveStream && (
                <Badge className="bg-coral text-white text-lg px-4 py-2">
                  <Camera className="w-4 h-4 mr-2" />
                  {t('live_now')}
                </Badge>
              )}
            </div>
            <p className="text-lg text-muted-foreground">
              {spot.city}, {spot.region} • {spot.description}
            </p>
          </div>

          {/* Surf Conditions */}
          <div className="mb-8">
            <SurfConditions 
              spotName={spot.name} 
              conditions={surfConditions || surfConditionsData[spot.id as keyof typeof surfConditionsData] || surfConditionsData['taghazout']} 
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Live Stream */}
            <div className="lg:col-span-2">
              <Card className="shadow-ocean overflow-hidden mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Camera className="w-5 h-5 mr-2" />
                    {spot.hasLiveStream ? t('live_now') : t('coming_soon')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="aspect-video bg-black">
                    {spot.hasLiveStream && spot.streamUrl ? (
                      <iframe
                        src={spot.streamUrl}
                        className="w-full h-full"
                        frameBorder="0"
                        allowFullScreen
                        title={`Live stream from ${spot.name}`}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white">
                        <div className="text-center">
                          <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                          <p className="text-xl mb-2">{t('coming_soon')}</p>
                          <p className="text-sm opacity-75">{t('camera_installation_planned')}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* 7-Day Forecast */}
              <Card className="shadow-wave">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Waves className="w-5 h-5 mr-2" />
                    {t('forecast_7_days')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 7 }, (_, i) => (
                      <div key={i} className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-xs text-muted-foreground mb-1">
                          {new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString('en', { weekday: 'short' })}
                        </div>
                        <div className="text-sm font-semibold mb-1">
                          {(1.2 + Math.random() * 1.8).toFixed(1)}m
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {Math.round(10 + Math.random() * 20)}km/h
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Weather Data */}
            <div className="space-y-6">
              {/* Current Conditions */}
              <Card className="shadow-wave">
                <CardHeader>
                  <CardTitle>{t('current_conditions')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {loading ? (
                    <div className="animate-pulse space-y-4">
                      {Array.from({ length: 4 }, (_, i) => (
                        <div key={i} className="h-12 bg-muted rounded"></div>
                      ))}
                    </div>
                  ) : weatherData ? (
                    <>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Waves className="w-5 h-5 mr-2 text-primary" />
                          <span>{t('wave_height')}</span>
                        </div>
                        <span className="font-semibold">{weatherData.waveHeight}m</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Wind className="w-5 h-5 mr-2 text-secondary" />
                          <span>{t('wind_speed')}</span>
                        </div>
                        <span className="font-semibold">{weatherData.windSpeed} km/h</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Thermometer className="w-5 h-5 mr-2 text-coral" />
                          <span>{t('water_temp')}</span>
                        </div>
                        <span className="font-semibold">{weatherData.waterTemp}°C</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Moon className="w-5 h-5 mr-2 text-accent-dark" />
                          <span>{t('moon_phase')}</span>
                        </div>
                        <span className="font-semibold">{weatherData.moonPhase}</span>
                      </div>
                    </>
                  ) : (
                    <p className="text-muted-foreground">{t('unable_to_load_weather')}</p>
                  )}
                </CardContent>
              </Card>

              {/* Daylight Hours */}
              <Card className="shadow-wave">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sun className="w-5 h-5 mr-2" />
                    {t('daylight')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {weatherData && (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t('sunrise')}:</span>
                        <span className="font-semibold">{weatherData.sunrise}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t('sunset')}:</span>
                        <span className="font-semibold">{weatherData.sunset}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Spot Info */}
              <Card className="shadow-wave">
                <CardHeader>
                  <CardTitle>{t('spot_information')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('skill_level')}:</span>
                    <Badge variant="outline" className="capitalize">
                      {spot.skillLevel}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('wave_type')}:</span>
                    <Badge variant="outline">{spot.waveType}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('crowd_level')}:</span>
                    <Badge variant="outline">{spot.crowdLevel}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('best_seasons')}:</span>
                    <div className="flex flex-wrap gap-1">
                      {spot.bestSeasons.map((season, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {season}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurfSpotDetail;