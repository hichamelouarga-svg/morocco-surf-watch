import { useTranslation } from 'react-i18next';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { surfSpots } from '@/data/surfSpots';
import { MapPin, Waves } from 'lucide-react';
import { Link } from 'react-router-dom';

const LiveCams = () => {
  const { t } = useTranslation();
  const mehdiaSpot = surfSpots.find(spot => spot.id === 'mehdia-beach');

  if (!mehdiaSpot) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="shadow-ocean overflow-hidden bg-slate-900 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="font-display text-2xl font-bold">
                    {t(mehdiaSpot.nameKey)}
                  </h1>
                  <Badge className="bg-coral text-white animate-pulse">
                    {t('live_now')}
                  </Badge>
                </div>
                
                <div className="flex items-center text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{mehdiaSpot.city}, {mehdiaSpot.region}</span>
                </div>
                
                <p className="text-muted-foreground mb-6">
                  {mehdiaSpot.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="outline" className="bg-blue-600/20 text-blue-300 border-blue-500">
                    {t(mehdiaSpot.skillLevel)}
                  </Badge>
                  <Badge variant="outline" className="bg-green-600/20 text-green-300 border-green-500">
                    {t(mehdiaSpot.waveType.replace(' ', '_'))}
                  </Badge>
                  <Badge variant="outline" className="bg-orange-600/20 text-orange-300 border-orange-500">
                    Crowd: {t(mehdiaSpot.crowdLevel)}
                  </Badge>
                </div>
                
                <Button asChild className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20">
                  <Link to={`/surf-spot/${mehdiaSpot.id}`}>
                    <Waves className="w-4 h-4 mr-2" />
                    View Details
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveCams;