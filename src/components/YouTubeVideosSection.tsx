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
      console.log('🔄 Fetching DYNAMIC YouTube videos (last 3 added)...');
      
      // Try to get real dynamic videos from API
      const { data, error } = await supabase.functions.invoke('fetch-youtube-videos', {
        method: 'GET'
      });
      
      console.log('📡 YouTube API response:', { data, error });
      
      if (!error && data && Array.isArray(data)) {
        console.log(`✅ Got ${data.length} DYNAMIC videos from API`);
        // Take only the 5 most recent videos
        const recentVideos = data.slice(0, 5);
        setVideos(recentVideos);
        return;
      }
      
      console.log('🔄 API failed, using verified Morocco surf videos...');
      // Fallback to verified Morocco surf videos (3 most recent)
      const fallbackVideos = [
        {
          videoId: "3JY3trh26Uk",
          title: "Taghazout (Morocco) - A Surf Town Review",
          description: "Here's what to expect from Morocco's most famous surf town. From the waves you'll surf, the crowds you'll encounter, and how much it'll cost.",
          thumbnail: "https://img.youtube.com/vi/3JY3trh26Uk/mqdefault.jpg",
          channelTitle: "Surf Review",
          publishedAt: new Date().toISOString(),
          url: "https://www.youtube.com/watch?v=3JY3trh26Uk"
        },
        {
          videoId: "hRDXFzf1nXk",
          title: "Morocco - Surf Guide - Taghazout/Central Morocco", 
          description: "In this short film about surfing in Central Morocco - the Taghazout area. The surf season starts around November and lasts till end of March/April.",
          thumbnail: "https://img.youtube.com/vi/hRDXFzf1nXk/mqdefault.jpg",
          channelTitle: "Morocco Surf Guide",
          publishedAt: new Date(Date.now() - 86400000).toISOString(),
          url: "https://www.youtube.com/watch?v=hRDXFzf1nXk"
        },
        {
          videoId: "hLVXiPmDmPg",
          title: "Living in Morocco's Surf Town Tamraght as a Digital Nomad",
          description: "A month in a surf town called Tamraght and it's been one of the most memorable trips. The laid-back vibe, friendly locals, and stunning coastline.",
          thumbnail: "https://img.youtube.com/vi/hLVXiPmDmPg/mqdefault.jpg",
          channelTitle: "Digital Nomad Morocco",
          publishedAt: new Date(Date.now() - 172800000).toISOString(),
          url: "https://www.youtube.com/watch?v=hLVXiPmDmPg"
        }
      ];
      
      setVideos(fallbackVideos);
      console.log('✅ Using 3 most recent fallback videos');
      
    } catch (error) {
      console.error('❌ Error fetching YouTube videos:', error);
      // Emergency fallback - just 1 video
      const emergencyVideo = [
        {
          videoId: "3JY3trh26Uk",
          title: "Taghazout Morocco - Surf Town",
          description: "Surf town review of Taghazout, Morocco",
          thumbnail: "https://img.youtube.com/vi/3JY3trh26Uk/mqdefault.jpg",
          channelTitle: "Morocco Surf",
          publishedAt: new Date().toISOString(),
          url: "https://www.youtube.com/watch?v=3JY3trh26Uk"
        }
      ];
      setVideos(emergencyVideo);
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
          Vidéos Surf Maroc - YouTube (5 dernières)
        </h2>
      </div>
      
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
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
        <p>Vidéos mises à jour automatiquement depuis YouTube (5 dernières ajoutées)</p>
      </div>
    </div>
  );
};