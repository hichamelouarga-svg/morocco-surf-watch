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
  console.log(`🎬 YouTube function called with method: ${req.method}`);
  
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
      
      // Return mock data when API key is not configured - 5 Morocco surf videos
      const mockVideos = [
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
        },
        {
          videoId: "kJQP7kiw5Fk",
          title: "Surf à Imsouane - La vague la plus longue du Maroc",
          description: "Session de surf à Imsouane, célèbre pour sa vague droite qui peut durer plus d'une minute. Conditions parfaites pour le longboard.",
          thumbnail: "https://img.youtube.com/vi/kJQP7kiw5Fk/mqdefault.jpg",
          channelTitle: "Imsouane Surf",
          publishedAt: new Date(Date.now() - 259200000).toISOString(),
          url: "https://www.youtube.com/watch?v=kJQP7kiw5Fk"
        },
        {
          videoId: "9bZkp7q19f0",
          title: "Guide complet des spots de surf au Maroc",
          description: "Découvrez les meilleurs spots de surf du Maroc, d'Imsouane à Essaouira en passant par Taghazout. Conseils et astuces pour surfeurs.",
          thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/mqdefault.jpg",
          channelTitle: "Morocco Surf Guide",
          publishedAt: new Date(Date.now() - 345600000).toISOString(),
          url: "https://www.youtube.com/watch?v=9bZkp7q19f0"
        }
      ];

      return new Response(JSON.stringify(mockVideos), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Build a single search query for newest uploads about Surf Morocco Maroc
    const searchQuery = 'Surf Morocco Maroc';

    const searchUrl = new URL('https://www.googleapis.com/youtube/v3/search');
    searchUrl.searchParams.append('key', YOUTUBE_API_KEY);
    searchUrl.searchParams.append('q', searchQuery);
    searchUrl.searchParams.append('part', 'snippet');
    searchUrl.searchParams.append('type', 'video');
    searchUrl.searchParams.append('maxResults', '5'); // Return 5 newest videos
    searchUrl.searchParams.append('order', 'date');

    console.log(`Fetching YouTube videos for query: ${searchQuery}`);

    const response = await fetch(searchUrl.toString());
    if (!response.ok) {
      console.error(`YouTube API error: ${response.status} ${response.statusText}`);
      return new Response(JSON.stringify([]), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    const data: YouTubeResponse = await response.json();

    const videos = data.items.map(item => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.high?.url,
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`
    }));

    return new Response(JSON.stringify(videos.slice(0, 5)), {
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