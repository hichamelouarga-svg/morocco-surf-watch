import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const YOUTUBE_API_KEY = Deno.env.get('YOUTUBE_API_KEY');

interface YouTubeVideo {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      medium: {
        url: string;
      };
      high: {
        url: string;
      };
    };
    channelTitle: string;
    publishedAt: string;
  };
}

interface YouTubeResponse {
  items: YouTubeVideo[];
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  try {
    if (!YOUTUBE_API_KEY) {
      console.log('YouTube API key not found, returning mock data');
      
      // Return mock data when API key is not configured
      const mockVideos = [
        {
          videoId: "dQw4w9WgXcQ",
          title: "Surf parfait à Taghazout - Conditions exceptionnelles",
          description: "Des conditions de surf parfaites à Taghazout avec des vagues de 2-3 mètres et un vent offshore. Session épique avec les locaux!",
          thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
          channelTitle: "Surf Morocco TV",
          publishedAt: new Date().toISOString(),
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        },
        {
          videoId: "9bZkp7q19f0",
          title: "Guide complet des spots de surf au Maroc",
          description: "Découvrez les meilleurs spots de surf du Maroc, d'Imsouane à Essaouira en passant par Taghazout. Conseils et astuces pour surfeurs.",
          thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/mqdefault.jpg",
          channelTitle: "Morocco Surf Guide",
          publishedAt: new Date(Date.now() - 86400000).toISOString(),
          url: "https://www.youtube.com/watch?v=9bZkp7q19f0"
        },
        {
          videoId: "kJQP7kiw5Fk",
          title: "Surf à Imsouane - La vague la plus longue du Maroc",
          description: "Session de surf à Imsouane, célèbre pour sa vague droite qui peut durer plus d'une minute. Conditions parfaites pour le longboard.",
          thumbnail: "https://img.youtube.com/vi/kJQP7kiw5Fk/mqdefault.jpg",
          channelTitle: "Imsouane Surf",
          publishedAt: new Date(Date.now() - 172800000).toISOString(),
          url: "https://www.youtube.com/watch?v=kJQP7kiw5Fk"
        }
      ];

      return new Response(JSON.stringify(mockVideos), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Build search queries for surf videos in Morocco
    const searchQueries = [
      'surf taghazout morocco',
      'surf morocco imsouane',
      'surf essaouira morocco',
      'surfing morocco spots',
      'surf anchor point morocco'
    ];

    const allVideos = [];

    for (const query of searchQueries) {
      const searchUrl = new URL('https://www.googleapis.com/youtube/v3/search');
      
      searchUrl.searchParams.append('key', YOUTUBE_API_KEY);
      searchUrl.searchParams.append('q', query);
      searchUrl.searchParams.append('part', 'snippet');
      searchUrl.searchParams.append('type', 'video');
      searchUrl.searchParams.append('maxResults', '5');
      searchUrl.searchParams.append('order', 'date');
      searchUrl.searchParams.append('publishedAfter', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()); // Last 30 days

      console.log(`Fetching YouTube videos for query: ${query}`);

      const response = await fetch(searchUrl.toString());
      
      if (!response.ok) {
        console.error(`YouTube API error for query "${query}": ${response.status} ${response.statusText}`);
        continue;
      }

      const data: YouTubeResponse = await response.json();
      
      // Transform YouTube results to our video format
      const videos = data.items.map(item => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.high?.url,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`
      }));

      allVideos.push(...videos);
    }

    // Remove duplicates and sort by publish date
    const uniqueVideos = allVideos.filter((video, index, self) =>
      index === self.findIndex(v => v.videoId === video.videoId)
    ).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 12); // Limit to 12 most recent videos

    return new Response(JSON.stringify(uniqueVideos), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });

  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to fetch videos',
        message: error instanceof Error ? error.message : 'Unknown error'
      }), 
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
});