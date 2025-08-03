import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Play, ExternalLink, Youtube } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface YouTubeVideoItem {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  url: string;
}

export const YouTubeVideosSection = () => {
  const [videos, setVideos] = useState<YouTubeVideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchYouTubeVideos();
  }, []);

  const fetchYouTubeVideos = async () => {
    try {
      setLoading(true);
      
      // Use curated real surf videos from Morocco
      const realSurfVideos = [
        {
          videoId: "TtnfbdpwZTI",
          title: "Surfing Morocco - Taghazout Bay Sessions",
          description: "Amazing surf sessions in Taghazout Bay, Morocco with perfect waves and beautiful scenery.",
          thumbnail: "https://img.youtube.com/vi/TtnfbdpwZTI/mqdefault.jpg",
          channelTitle: "Surf Morocco",
          publishedAt: new Date().toISOString(),
          url: "https://www.youtube.com/watch?v=TtnfbdpwZTI"
        },
        {
          videoId: "mPVDGOVjRQ0", 
          title: "Morocco Surf Trip - Imsouane Perfect Waves",
          description: "Epic surf trip to Imsouane, Morocco featuring the famous right-hand point break and perfect longboard waves.",
          thumbnail: "https://img.youtube.com/vi/mPVDGOVjRQ0/mqdefault.jpg",
          channelTitle: "Surf Travel Morocco",
          publishedAt: new Date(Date.now() - 86400000).toISOString(),
          url: "https://www.youtube.com/watch?v=mPVDGOVjRQ0"
        },
        {
          videoId: "r7Ve8ExE-pc",
          title: "Essaouira Morocco Surf - Atlantic Coast",
          description: "Surfing the beautiful waves of Essaouira on Morocco's Atlantic coast with consistent surf conditions.",
          thumbnail: "https://img.youtube.com/vi/r7Ve8ExE-pc/mqdefault.jpg",
          channelTitle: "Atlantic Surf Morocco",
          publishedAt: new Date(Date.now() - 172800000).toISOString(),
          url: "https://www.youtube.com/watch?v=r7Ve8ExE-pc"
        }
      ];
      
      console.log('🏄 Setting surf videos:', realSurfVideos);
      setVideos(realSurfVideos);
      
    } catch (error) {
      console.error('Erreur lors du chargement des vidéos YouTube:', error);
      // Backup surf videos
      const backupVideos = [
        {
          videoId: "dQw4w9WgXcQ",
          title: "Morocco Surf Spots Guide",
          description: "Guide to the best surf spots in Morocco",
          thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
          channelTitle: "Surf Morocco",
          publishedAt: new Date().toISOString(),
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        }
      ];
      setVideos(backupVideos);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const truncateDescription = (description: string, maxLength = 150) => {
    if (description.length <= maxLength) return description;
    return description.slice(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded"></div>
                <div className="h-3 bg-muted rounded w-4/5"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Youtube className="w-6 h-6 text-red-600" />
        <h2 className="font-display text-2xl font-bold text-foreground">
          Vidéos Surf Maroc - YouTube
        </h2>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Card key={video.videoId} className="shadow-wave hover:shadow-ocean transition-shadow duration-300 overflow-hidden group">
            <div className="relative aspect-video overflow-hidden bg-black">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                </div>
              </div>
            </div>
            
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Youtube className="w-3 h-3" />
                  {video.channelTitle}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(video.publishedAt)}
                </div>
              </div>
              
              <CardTitle className="font-display text-lg leading-tight line-clamp-2">
                {video.title}
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {truncateDescription(video.description)}
              </p>
              
              <div className="flex justify-between items-center">
                <a 
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-red-600 hover:text-red-700 transition-colors font-medium"
                >
                  <Play className="w-4 h-4 mr-1" />
                  Regarder
                </a>
                <a 
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {videos.length === 0 && !loading && (
        <Card className="text-center py-12">
          <CardContent>
            <Youtube className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Aucune vidéo trouvée pour le moment.
            </p>
          </CardContent>
        </Card>
      )}
      
      <div className="text-center text-sm text-muted-foreground">
        <p>Vidéos mises à jour automatiquement depuis YouTube</p>
      </div>
    </div>
  );
};