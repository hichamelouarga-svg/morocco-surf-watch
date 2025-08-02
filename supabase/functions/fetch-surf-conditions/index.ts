// Supabase Edge Function for fetching real surf conditions
// This should be deployed as a Supabase Edge Function

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface SurfSpot {
  id: string;
  name: string;
  coordinates: [number, number];
}

const surfSpots: SurfSpot[] = [
  { id: 'taghazout', name: 'Taghazout', coordinates: [30.5436, -9.7076] },
  { id: 'anchor-point', name: 'Anchor Point', coordinates: [30.5325, -9.7189] },
  { id: 'imsouane', name: 'Imsouane', coordinates: [30.8419, -9.8239] }
];

async function fetchSurfConditions(spot: SurfSpot) {
  const [lat, lon] = spot.coordinates;
  
  try {
    // Stormglass API for marine data
    const stormglassApiKey = Deno.env.get('STORMGLASS_API_KEY');
    const stormglassResponse = await fetch(
      `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lon}&params=waveHeight,wavePeriod,waveDirection,windSpeed,windDirection,airTemperature,waterTemperature`,
      {
        headers: {
          'Authorization': stormglassApiKey || ''
        }
      }
    );
    
    if (!stormglassResponse.ok) {
      throw new Error(`Stormglass API error: ${stormglassResponse.status}`);
    }
    
    const stormglassData = await stormglassResponse.json();
    const current = stormglassData.hours[0];
    
    // WorldTides API for tide data
    const worldTidesApiKey = Deno.env.get('WORLDTIDES_API_KEY');
    const tidesResponse = await fetch(
      `https://www.worldtides.info/api/v3?heights&lat=${lat}&lon=${lon}&length=86400&step=3600&key=${worldTidesApiKey}`
    );
    
    const tidesData = tidesResponse.ok ? await tidesResponse.json() : null;
    
    // Calculate surf rating based on conditions
    const waveHeight = current.waveHeight?.noaa || 1;
    const windSpeed = current.windSpeed?.noaa || 5;
    const windDirection = current.windDirection?.noaa || 180;
    
    let rating = 'FAIR';
    let ratingValue = 50;
    
    if (waveHeight > 3 && windSpeed < 10) {
      rating = 'EXCELLENT';
      ratingValue = 90;
    } else if (waveHeight > 2 && windSpeed < 15) {
      rating = 'GOOD';
      ratingValue = 75;
    } else if (waveHeight < 1 || windSpeed > 20) {
      rating = 'POOR';
      ratingValue = 25;
    }
    
    // Process tide data
    const tideData = tidesData?.heights ? 
      tidesData.heights.slice(0, 8).map((h: any, i: number) => ({
        time: new Date(h.dt * 1000).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }),
        height: h.height
      })) : 
      [
        { time: 'Midi', height: 2.1 },
        { time: '2pm', height: 3.9 },
        { time: '4pm', height: 4.8 },
        { time: '6pm', height: 5.1 }
      ];
    
    const currentTide = tideData[0]?.height || 3.0;
    const nextTide = tideData[1]?.height || 3.5;
    
    return {
      spotId: spot.id,
      rating,
      ratingValue,
      surfHeight: {
        min: Math.max(1, Math.floor(waveHeight * 3.28084 * 0.8)), // Convert m to ft
        max: Math.ceil(waveHeight * 3.28084 * 1.2),
        description: waveHeight < 1.5 ? 'Cheville à genou' : 
                    waveHeight < 2.5 ? 'Cuisse à ventre' :
                    waveHeight < 3.5 ? 'Ventre à poitrine' : 'Poitrine à tête'
      },
      swell: [
        {
          height: Number((waveHeight * 3.28084).toFixed(1)),
          period: current.wavePeriod?.noaa || 8,
          direction: getWindDirection(current.waveDirection?.noaa || 270),
          angle: current.waveDirection?.noaa || 270
        }
      ],
      wind: {
        speed: Math.round((current.windSpeed?.noaa || 5) * 1.944), // Convert m/s to knots
        gusts: Math.round((current.windSpeed?.noaa || 5) * 1.944 * 1.5),
        direction: getWindDirection(windDirection),
        type: getWindType(windDirection, current.waveDirection?.noaa || 270)
      },
      tide: {
        current: Number(currentTide.toFixed(1)),
        trend: nextTide > currentTide ? 'rising' : 'falling',
        nextChange: `${tideData[2]?.time || '6pm'} ${Number((tideData[2]?.height || 5.1).toFixed(1))}ft`,
        data: tideData
      },
      temperature: {
        air: Math.round((current.airTemperature?.noaa || 20) * 9/5 + 32), // Convert C to F
        water: Math.round((current.waterTemperature?.noaa || 18) * 9/5 + 32),
        wetsuit: current.waterTemperature?.noaa < 18 ? '3mm wetsuit' : '2mm wetsuit'
      },
      forecast: 'STORMGLASS',
      lastUpdated: new Date().toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      })
    };
    
  } catch (error) {
    console.error(`Error fetching conditions for ${spot.name}:`, error);
    
    // Return fallback data if API fails
    return {
      spotId: spot.id,
      rating: 'FAIR' as const,
      ratingValue: 50,
      surfHeight: { min: 2, max: 3, description: 'Cuisse à ventre' },
      swell: [{ height: 2.4, period: 7, direction: 'W', angle: 279 }],
      wind: { speed: 4, gusts: 8, direction: 'SW', type: 'Onshore' as const },
      tide: {
        current: 3.0,
        trend: 'rising' as const,
        nextChange: '4:53pm 5.1ft',
        data: [
          { time: 'Midi', height: 2.1 },
          { time: '2pm', height: 3.9 },
          { time: '4pm', height: 4.8 },
          { time: '6pm', height: 5.1 }
        ]
      },
      temperature: { air: 68, water: 63, wetsuit: '2mm wetsuit' },
      forecast: 'FALLBACK',
      lastUpdated: new Date().toLocaleString()
    };
  }
}

function getWindDirection(angle: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return directions[Math.round(angle / 22.5) % 16];
}

function getWindType(windDir: number, waveDir: number): 'Onshore' | 'Offshore' | 'Cross-shore' {
  const diff = Math.abs(windDir - waveDir);
  const normalizedDiff = Math.min(diff, 360 - diff);
  
  if (normalizedDiff < 45) return 'Onshore';
  if (normalizedDiff > 135) return 'Offshore';
  return 'Cross-shore';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    // Fetch conditions for all spots
    const conditionsPromises = surfSpots.map(spot => fetchSurfConditions(spot));
    const allConditions = await Promise.all(conditionsPromises);
    
    // Store in Supabase
    for (const conditions of allConditions) {
      const { error } = await supabaseClient
        .from('surf_conditions')
        .upsert({
          spot_id: conditions.spotId,
          data: conditions,
          updated_at: new Date().toISOString()
        });
        
      if (error) {
        console.error('Error storing conditions:', error);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Surf conditions updated successfully',
        conditions: allConditions 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      }
    )
  }
})