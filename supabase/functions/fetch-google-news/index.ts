import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const GOOGLE_API_KEY = Deno.env.get('GOOGLE_API_KEY');
const GOOGLE_SEARCH_ENGINE_ID = Deno.env.get('GOOGLE_SEARCH_ENGINE_ID');

interface GoogleSearchResult {
  title: string;
  link: string;
  snippet: string;
  pagemap?: {
    metatags?: Array<{
      'article:published_time'?: string;
      'og:site_name'?: string;
    }>;
  };
}

interface GoogleSearchResponse {
  items?: GoogleSearchResult[];
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
    if (!GOOGLE_API_KEY || !GOOGLE_SEARCH_ENGINE_ID) {
      console.log('Google API credentials not found, returning mock data');
      
      // Return mock data when API keys are not configured
      const mockData = [
        {
          title: "Championnat de surf professionnel à Taghazout - Les meilleures performances",
          link: "https://example.com/surf-championship-taghazout",
          snippet: "Le championnat de surf professionnel de Taghazout a attiré les meilleurs surfeurs internationaux. Les conditions ont été parfaites avec des vagues de 2-3 mètres...",
          date: new Date().toISOString(),
          source: "Surf News Morocco"
        },
        {
          title: "Météo surf exceptionnelle sur la côte atlantique marocaine",
          link: "https://example.com/surf-weather-morocco",
          snippet: "Les conditions météorologiques de cette semaine offrent des opportunités exceptionnelles pour le surf sur toute la côte atlantique du Maroc...",
          date: new Date(Date.now() - 86400000).toISOString(),
          source: "Morocco Surf Report"
        },
        {
          title: "Nouvelle école de surf ouvre ses portes à Essaouira",
          link: "https://example.com/new-surf-school-essaouira",
          snippet: "Une nouvelle école de surf vient d'ouvrir à Essaouira, proposant des cours pour débutants et perfectionnement dans un cadre idyllique...",
          date: new Date(Date.now() - 172800000).toISOString(),
          source: "Essaouira Tourism"
        },
        {
          title: "Festival international de surf à Imsouane",
          link: "https://example.com/surf-festival-imsouane",
          snippet: "Le festival international de surf d'Imsouane se déroulera du 15 au 17 mars avec des compétitions, des concerts et des ateliers...",
          date: new Date(Date.now() - 259200000).toISOString(),
          source: "Imsouane Events"
        }
      ];

      return new Response(JSON.stringify(mockData), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Build search query for surf-related news in Morocco
    const query = 'surf maroc OR surf morocco OR surfing morocco OR surf taghazout OR surf essaouira';
    const searchUrl = new URL('https://www.googleapis.com/customsearch/v1');
    
    searchUrl.searchParams.append('key', GOOGLE_API_KEY);
    searchUrl.searchParams.append('cx', GOOGLE_SEARCH_ENGINE_ID);
    searchUrl.searchParams.append('q', query);
    searchUrl.searchParams.append('lr', 'lang_fr'); // French language
    searchUrl.searchParams.append('dateRestrict', 'm1'); // Last month
    searchUrl.searchParams.append('num', '10'); // Number of results
    searchUrl.searchParams.append('sort', 'date'); // Sort by date

    console.log('Fetching Google News with URL:', searchUrl.toString());

    const response = await fetch(searchUrl.toString());
    
    if (!response.ok) {
      throw new Error(`Google API error: ${response.status} ${response.statusText}`);
    }

    const data: GoogleSearchResponse = await response.json();
    
    // Transform Google Search results to our news format
    const newsItems = (data.items || []).map(item => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet,
      date: item.pagemap?.metatags?.[0]?.['article:published_time'] || new Date().toISOString(),
      source: item.pagemap?.metatags?.[0]?.['og:site_name'] || 'Google News'
    }));

    return new Response(JSON.stringify(newsItems), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });

  } catch (error) {
    console.error('Error fetching Google News:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to fetch news',
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