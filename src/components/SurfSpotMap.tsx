import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { surfSpots } from '@/data/surfSpots';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Camera, MapPin, Waves } from 'lucide-react';

export const SurfSpotMap = () => {
  const { t } = useTranslation();
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<typeof surfSpots[0] | null>(null);

  useEffect(() => {
    const initializeMap = async () => {
      // Get API key from environment (Supabase secrets)
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      
      if (!apiKey) {
        console.error('Google Maps API key not found. Please add VITE_GOOGLE_MAPS_API_KEY to your Supabase secrets.');
        return;
      }

      const loader = new Loader({
        apiKey,
        version: 'weekly',
      });

      try {
        const { Map } = await loader.importLibrary('maps');
        const { AdvancedMarkerElement } = await loader.importLibrary('marker');

        if (!mapRef.current) return;

        const map = new Map(mapRef.current, {
          center: { lat: 33.0, lng: -7.0 }, // Center on Morocco
          zoom: 6,
          mapId: 'surf-spots-map',
          styles: [
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#a2f2ff' }]
            },
            {
              featureType: 'landscape',
              elementType: 'geometry',
              stylers: [{ color: '#f5e6d3' }]
            }
          ]
        });

        setMap(map);

        // Add markers for each surf spot
        surfSpots.forEach((spot) => {
          const marker = new AdvancedMarkerElement({
            map,
            position: { lat: spot.coordinates[0], lng: spot.coordinates[1] },
            title: t(spot.nameKey),
          });

          marker.addListener('click', () => {
            setSelectedSpot(spot);
            map.panTo({ lat: spot.coordinates[0], lng: spot.coordinates[1] });
            map.setZoom(10);
          });
        });

      } catch (error) {
        console.error('Error loading Google Maps:', error);
        // Fallback: show a placeholder message
      }
    };

    initializeMap();
  }, [t]);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Interactive Surf Spots Map
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Click on any marker to explore surf spots across Morocco
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden shadow-ocean bg-muted">
              <div ref={mapRef} className="w-full h-[600px]" />
              
              {/* Temporary message until Google Maps API key is added */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-ocean text-white">
                <div className="text-center p-8">
                  <MapPin className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="font-display text-2xl font-bold mb-4">Interactive Map</h3>
                  <p className="text-white/80 mb-4">
                    Add your Google Maps API key to enable the interactive map
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                    {surfSpots.slice(0, 6).map(spot => (
                      <div key={spot.id} className="bg-white/10 rounded px-2 py-1">
                        {t(spot.nameKey)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Selected Spot Info */}
          <div className="space-y-6">
            {selectedSpot ? (
              <Card className="shadow-wave">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display text-2xl font-bold">
                      {t(selectedSpot.nameKey)}
                    </h3>
                    {selectedSpot.hasLiveStream && (
                      <Badge className="bg-coral text-white">
                        <Camera className="w-3 h-3 mr-1" />
                        Live
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <p className="text-muted-foreground">{selectedSpot.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">{selectedSpot.waveType}</Badge>
                      <Badge variant="outline">{selectedSpot.skillLevel}</Badge>
                      <Badge variant="outline">{selectedSpot.city}</Badge>
                    </div>
                  </div>

                  <Button asChild className="w-full bg-primary hover:bg-primary-dark">
                    <Link to={`/surf-spot/${selectedSpot.id}`}>
                      <Waves className="w-4 h-4 mr-2" />
                      View Details
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-wave">
                <CardContent className="p-6 text-center">
                  <MapPin className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-display text-xl font-bold mb-2">Select a Surf Spot</h3>
                  <p className="text-muted-foreground">
                    Click on any marker on the map to see details about that surf spot
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <Card className="shadow-wave">
              <CardContent className="p-6">
                <h4 className="font-display text-lg font-bold mb-4">Quick Stats</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Spots:</span>
                    <span className="font-semibold">{surfSpots.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Live Cameras:</span>
                    <span className="font-semibold">
                      {surfSpots.filter(s => s.hasLiveStream).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Coming Soon:</span>
                    <span className="font-semibold">
                      {surfSpots.filter(s => !s.hasLiveStream).length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};