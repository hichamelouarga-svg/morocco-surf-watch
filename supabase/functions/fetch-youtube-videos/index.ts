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
    liveBroadcastContent?: string; // 'live' | 'upcoming' | 'none'
  };
}

interface YouTubeResponse {
  items: YouTubeVideo[];
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log(`🎬 YouTube function called with method: ${req.method}`);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
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
          ...corsHeaders,
        },
      });
    }

    // Build a search query for newest uploads about Surf Morocco/Maroc and exclude common live-cam terms
    const searchQuery = 'Surf Morocco Maroc surf -live -cam -camera -caméra -24/7 -stream';
    const publishedAfter = new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString(); // last 90 days

    const searchUrl = new URL('https://www.googleapis.com/youtube/v3/search');
    searchUrl.searchParams.append('key', YOUTUBE_API_KEY);
    searchUrl.searchParams.append('q', searchQuery);
    searchUrl.searchParams.append('part', 'snippet');
    searchUrl.searchParams.append('type', 'video');
    searchUrl.searchParams.append('maxResults', '25'); // get more, then filter down to 5
    searchUrl.searchParams.append('order', 'date');
    searchUrl.searchParams.append('videoEmbeddable', 'true');
    searchUrl.searchParams.append('regionCode', 'MA');
    searchUrl.searchParams.append('publishedAfter', publishedAfter);

    console.log(`Fetching YouTube videos for query: ${searchQuery}`);

    const response = await fetch(searchUrl.toString());
    if (!response.ok) {
      console.error(`YouTube API error: ${response.status} ${response.statusText}`);
      return new Response(JSON.stringify([]), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    }

    const data: YouTubeResponse = await response.json();

    const unwanted = /\b(live|24\/7|stream|cam|camera|cam[ée]ra|en direct)\b/i;

    // Filter out live/upcoming streams and obvious webcam content
    const filtered = (data.items || []).filter((item) => {
      const title = item.snippet.title || '';
      const desc = item.snippet.description || '';
      const channel = item.snippet.channelTitle || '';
      const notLiveFlag = (item.snippet?.liveBroadcastContent ?? 'none') === 'none';
      const notLiveWords = !unwanted.test(title) && !unwanted.test(desc) && !/live cam/i.test(channel);
      return notLiveFlag && notLiveWords;
    });

    console.log(`YouTube returned ${data.items?.length ?? 0} items. After filtering: ${filtered.length}`);

    // Deduplicate by normalized title and limit per channel to avoid 5 from the same channel
    const seenTitles = new Set<string>();
    const channelCount = new Map<string, number>();
    const perChannelLimit = 1;

    const pass1: YouTubeVideo[] = [];
    for (const item of filtered) {
      const titleKey = item.snippet.title.trim().toLowerCase().replace(/\s+/g, ' ');
      if (seenTitles.has(titleKey)) continue;
      const ch = item.snippet.channelTitle;
      const count = channelCount.get(ch) ?? 0;
      if (count >= perChannelLimit) continue;
      seenTitles.add(titleKey);
      channelCount.set(ch, count + 1);
      pass1.push(item);
      if (pass1.length >= 5) break;
    }

    // If we don't have 5 yet, fill with remaining filtered items (still unique by title)
    let finalItems = pass1;
    if (finalItems.length < 5) {
      for (const item of filtered) {
        if (finalItems.includes(item)) continue;
        const titleKey = item.snippet.title.trim().toLowerCase().replace(/\s+/g, ' ');
        if (seenTitles.has(titleKey)) continue;
        seenTitles.add(titleKey);
        finalItems.push(item);
        if (finalItems.length >= 5) break;
      }
    }

    const videos = finalItems.map(item => ({
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
        ...corsHeaders,
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
          ...corsHeaders,
        },
      }
    );
  }
});