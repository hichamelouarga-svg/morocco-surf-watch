import { useTranslation } from 'react-i18next';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { surfSpots } from '@/data/surfSpots';
import { Link } from 'react-router-dom';
import { Camera, MapPin, Waves, Wind } from 'lucide-react';

const SurfSpots = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t('surf_spots')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('surf_spots_description')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {surfSpots.map((spot) => (
              <Card key={spot.id} className="shadow-wave hover:shadow-ocean transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-display text-xl">
                      {t(spot.nameKey)}
                    </CardTitle>
                    {spot.hasLiveStream && (
                      <Badge className="bg-coral text-white">
                        <Camera className="w-3 h-3 mr-1" />
                        {t('live_now')}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-1" />
                    {spot.city}, {spot.region}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {spot.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="capitalize">
                      {t(spot.skillLevel)}
                    </Badge>
                    <Badge variant="outline">
                      {t(spot.waveType.replace(' ', '_'))}
                    </Badge>
                    <Badge variant="outline">
                      {t('crowd')}: {t(spot.crowdLevel)}
                    </Badge>
                  </div>

                  <Button asChild className="w-full bg-primary hover:bg-primary-dark">
                    <Link to={`/surf-spot/${spot.id}`}>
                      <Waves className="w-4 h-4 mr-2" />
                      {t('view_details')}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurfSpots;