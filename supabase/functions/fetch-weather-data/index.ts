import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface WeatherData {
  spotId: string;
  temperature: number;
  windSpeed: number;
  windDirection: number;
  waveHeight: number;
  swellPeriod: number;
  swellDirection: number;
  conditions: string;
  timestamp: string;
}

const SURF_SPOTS = [
  { id: 'mehdia-beach', lat: 34.2542, lon: -6.6693, name: 'Mehdia Beach' },
  { id: 'safi', lat: 32.2994, lon: -9.2372, name: 'Safi' },
  { id: 'imsouane', lat: 30.8394, lon: -9.7653, name: 'Imsouane' },
  { id: 'taghazout', lat: 30.5410, lon: -9.7076, name: 'Taghazout' },
  { id: 'anchor-point', lat: 30.5387, lon: -9.7063, name: 'Anchor Point' }
];

async function fetchWeatherForSpot(spot: any, apiKey: string): Promise<WeatherData | null> {
  try {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${spot.lat}&lon=${spot.lon}&appid=${apiKey}&units=metric`;
    const response = await fetch(weatherUrl);
    
    if (!response.ok) {
      console.error(`Weather API error for ${spot.name}: ${response.status}`);
      return null;
    }
    
    const data = await response.json();
    
    // Simulate wave data (OpenWeatherMap doesn't provide wave data in basic plan)
    const waveHeight = Math.random() * 3 + 1; // 1-4 meters
    const swellPeriod = Math.random() * 5 + 8; // 8-13 seconds
    const swellDirection = Math.random() * 360; // 0-360 degrees
    
    return {
      spotId: spot.id,
      temperature: Math.round(data.main.temp),
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      windDirection: data.wind.deg || 0,
      waveHeight: Math.round(waveHeight * 10) / 10,
      swellPeriod: Math.round(swellPeriod),
      swellDirection: Math.round(swellDirection),
      conditions: data.weather[0].main.toLowerCase(),
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error(`Error fetching weather for ${spot.name}:`, error);
    return null;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const apiKey = 'f1c61a0000b2fcc9e815d27a9d3a6f8a';
    const weatherData: WeatherData[] = [];

    // Fetch weather data for all spots
    for (const spot of SURF_SPOTS) {
      const data = await fetchWeatherForSpot(spot, apiKey);
      if (data) {
        weatherData.push(data);
      }
    }

    // Store in database
    if (weatherData.length > 0) {
      const { error } = await supabaseClient
        .from('weather_conditions')
        .upsert(weatherData, { onConflict: 'spot_id' });

      if (error) {
        console.error('Database error:', error);
        return new Response(
          JSON.stringify({ error: 'Database error' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
        );
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        updated: weatherData.length,
        data: weatherData 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});