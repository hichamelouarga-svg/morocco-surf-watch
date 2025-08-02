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
import { YouTubeBackground } from '@/components/YouTubeBackground';
import SurfSpotLocationMap from '@/components/SurfSpotLocationMap';
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

  // Special background video for specific spots
  const isSpecialSpot = spot?.id === 'safi' || spot?.id === 'imesouane' || spot?.id === 'rabat-beach' || spot?.id === 'mohammedia' || spot?.id === 'mehdia' || spot?.id === 'dar-bouazza' || spot?.id === 'bouznika' || spot?.id === 'plage-des-nations' || spot?.id === 'larache' || spot?.id === 'assilah' || spot?.id === 'moulay-bouselham' || spot?.id === 'taghazout';
  
  // YouTube video IDs for each spot
  const getVideoId = (spotId: string) => {
    switch (spotId) {
      case 'safi':
        return 'JkKBgJl9Y7c';
      case 'imesouane':
        return 'iCPZ2x-Wxig';
      case 'rabat-beach':
        return 'QXM8CJ1AZFc';
      case 'mohammedia':
        return 'sdP1NbXieu0';
      case 'mehdia':
        return 'Mlgg9e6I8Co';
      case 'dar-bouazza':
        return '5lBVP-PIJvE';
      case 'bouznika':
        return 'qKHAi2RlH1Y';
      case 'plage-des-nations':
        return 'u-DSbfhfyFI';
      case 'larache':
        return 'l8cgNygUDsQ';
      case 'assilah':
        return '8fQpaJIIH-M';
      case 'moulay-bouselham':
        return 'gNUWJYCf_KU';
      case 'taghazout':
        return 'Cids8-vSxls';
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      {isSpecialSpot && spot?.id && (
        <YouTubeBackground 
          videoId={getVideoId(spot.id) || ''} 
          className="fixed inset-0 z-0" 
        />
      )}
      
      <Navigation />
      
      <div className="pt-24 pb-16 relative z-10">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className={`font-display text-4xl md:text-5xl font-bold ${isSpecialSpot ? 'text-white' : 'text-foreground'}`}>
                {t(spot.nameKey)}
              </h1>
              {spot.hasLiveStream && (
                <Badge className="bg-coral text-white text-lg px-4 py-2">
                  <Camera className="w-4 h-4 mr-2" />
                  {t('live_now')}
                </Badge>
              )}
            </div>
            <p className={`text-lg ${isSpecialSpot ? 'text-white/90' : 'text-muted-foreground'}`}>
              {spot.city}, {spot.region} • {spot.description}
            </p>
          </div>

          {/* Current Surf Conditions */}
          <div className="mb-8">
            <SurfConditions 
              spotName={spot.name} 
              conditions={surfConditions || surfConditionsData[spot.id as keyof typeof surfConditionsData] || surfConditionsData['taghazout']}
              transparent={isSpecialSpot}
            />
          </div>


          <div className="grid lg:grid-cols-3 gap-8">
            {/* Live Stream */}
            <div className="lg:col-span-2">
              <Card className={`shadow-ocean overflow-hidden mb-8 ${isSpecialSpot ? 'bg-white/10 backdrop-blur-sm border-white/20' : ''}`}>
                <CardHeader>
                  <CardTitle className={`flex items-center ${isSpecialSpot ? 'text-white' : ''}`}>
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
                          <p className="text-sm opacity-75">
                            {isSpecialSpot && spot.id === 'safi' 
                              ? 'Caméra live bientôt disponible pour Safi - Restez connectés!'
                              : isSpecialSpot && spot.id === 'imesouane'
                              ? 'Caméra live bientôt disponible pour Imesouane - Restez connectés!'
                              : isSpecialSpot && spot.id === 'rabat-beach'
                              ? 'Caméra live bientôt disponible pour Rabat Beach - Restez connectés!'
                              : isSpecialSpot && spot.id === 'mohammedia'
                              ? 'Caméra live bientôt disponible pour Mohammedia - Restez connectés!'
                              : isSpecialSpot && spot.id === 'mehdia'
                              ? 'Caméra live bientôt disponible pour Mehdia - Restez connectés!'
                              : isSpecialSpot && spot.id === 'dar-bouazza'
                              ? 'Caméra live bientôt disponible pour Dar Bouazza - Restez connectés!'
                              : isSpecialSpot && spot.id === 'bouznika'
                              ? 'Caméra live bientôt disponible pour Bouznika - Restez connectés!'
                              : isSpecialSpot && spot.id === 'plage-des-nations'
                              ? 'Caméra live bientôt disponible pour Plage des Nations - Restez connectés!'
                              : isSpecialSpot && spot.id === 'larache'
                              ? 'Caméra live bientôt disponible pour Larache - Restez connectés!'
                              : isSpecialSpot && spot.id === 'assilah'
                              ? 'Caméra live bientôt disponible pour Assilah - Restez connectés!'
                              : isSpecialSpot && spot.id === 'moulay-bouselham'
                              ? 'Caméra live bientôt disponible pour Moulay Bouselham - Restez connectés!'
                              : isSpecialSpot && spot.id === 'taghazout'
                              ? 'Caméra live bientôt disponible pour Taghazout - Restez connectés!'
                              : t('camera_installation_planned')
                            }
                          </p>
                          {isSpecialSpot && (
                            <div className="mt-4">
                              <Badge className="bg-coral text-white px-4 py-2">
                                🎥 Coming Soon to {spot.id === 'safi' ? 'Safi' : spot.id === 'imesouane' ? 'Imesouane' : spot.id === 'rabat-beach' ? 'Rabat Beach' : spot.id === 'mohammedia' ? 'Mohammedia' : spot.id === 'mehdia' ? 'Mehdia' : spot.id === 'dar-bouazza' ? 'Dar Bouazza' : spot.id === 'bouznika' ? 'Bouznika' : spot.id === 'plage-des-nations' ? 'Plage des Nations' : spot.id === 'larache' ? 'Larache' : spot.id === 'assilah' ? 'Assilah' : spot.id === 'moulay-bouselham' ? 'Moulay Bouselham' : 'Taghazout'}
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Spot Location Map - Small and on the right */}
              <Card className="shadow-wave">
                <CardHeader>
                  <CardTitle className="flex items-center text-sm">
                    <Waves className="w-4 h-4 mr-2" />
                    Localisation
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-48">
                    <SurfSpotLocationMap
                      latitude={spot.coordinates[0]}
                      longitude={spot.coordinates[1]}
                      spotName={spot.name}
                      className="h-full"
                    />
                  </div>
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