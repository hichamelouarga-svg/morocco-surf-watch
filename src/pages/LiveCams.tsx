import { useTranslation } from 'react-i18next';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { surfSpots } from '@/data/surfSpots';
import { Camera, Clock } from 'lucide-react';
import beachCamBg from '@/assets/beach-cam-bg.jpg';

const LiveCams = () => {
  const { t } = useTranslation();
  const liveSpots = surfSpots.filter(spot => spot.hasLiveStream);
  const comingSoonSpots = surfSpots.filter(spot => !spot.hasLiveStream);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t('live_cams')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Watch live surf conditions from Morocco's best surf spots
            </p>
          </div>

          {/* Live Cameras */}
          <div className="mb-16">
            <h2 className="font-display text-2xl font-bold text-foreground mb-8 flex items-center">
              <Camera className="w-6 h-6 mr-2 text-coral" />
              {t('live_now')} ({liveSpots.length})
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {liveSpots.map((spot) => (
                <Card key={spot.id} className="shadow-ocean overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-display text-xl">
                        {t(spot.nameKey)}
                      </CardTitle>
                      <Badge className="bg-coral text-white animate-pulse">
                        <div className="w-2 h-2 bg-white rounded-full mr-2" />
                        LIVE
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-0">
                    <div className="aspect-video bg-black relative">
                      {spot.streamUrl ? (
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
                            <Camera className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>Stream loading...</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <p className="text-sm text-muted-foreground mb-2">
                        {spot.city}, {spot.region}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {spot.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Coming Soon */}
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-8 flex items-center">
              <Clock className="w-6 h-6 mr-2 text-sunset" />
              {t('coming_soon')} ({comingSoonSpots.length})
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {comingSoonSpots.map((spot) => (
                <Card key={spot.id} className="shadow-wave overflow-hidden opacity-75 hover:opacity-100 transition-opacity">
                  <div className="aspect-video relative">
                    <img 
                      src={beachCamBg} 
                      alt={spot.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center">
                      <Badge variant="secondary" className="bg-sunset text-white">
                        <Clock className="w-3 h-3 mr-1" />
                        {t('coming_soon')}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-display text-lg font-bold mb-2">
                      {t(spot.nameKey)}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {spot.city}, {spot.region}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Camera installation planned
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveCams;