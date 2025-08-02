// Simple service that uses fetch instead of Supabase client for now
// This will work with both Supabase backend and any other API

export interface RealSurfCondition {
  spotId: string;
  rating: 'POOR' | 'FAIR' | 'GOOD' | 'EXCELLENT';
  ratingValue: number;
  surfHeight: {
    min: number;
    max: number;
    description: string;
  };
  swell: {
    height: number;
    period: number;
    direction: string;
    angle: number;
  }[];
  wind: {
    speed: number;
    gusts: number;
    direction: string;
    type: 'Onshore' | 'Offshore' | 'Cross-shore';
  };
  tide: {
    current: number;
    trend: 'rising' | 'falling';
    nextChange: string;
    data: { time: string; height: number }[];
  };
  temperature: {
    air: number;
    water: number;
    wetsuit: string;
  };
  forecast: string;
  lastUpdated: string;
}

export class SurfConditionsService {
  private static BASE_URL = 'https://your-project-ref.supabase.co/functions/v1';
  
  static async fetchRealTimeConditions(spotId: string): Promise<RealSurfCondition | null> {
    try {
      // Fetch from Stormglass API directly for now (until Supabase functions are set up)
      const spot = this.getSpotCoordinates(spotId);
      if (!spot) return null;
      
      const [lat, lon] = spot.coordinates;
      
      // For demo, we'll use Open-Meteo API (free, no key required)
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&current=wave_height,wave_direction,wave_period,wind_speed_10m,wind_direction_10m&hourly=wave_height,wind_speed_10m&daily=sunrise,sunset&timezone=auto`
      );
      
      if (!weatherResponse.ok) {
        throw new Error('Failed to fetch weather data');
      }
      
      const weatherData = await weatherResponse.json();
      const current = weatherData.current;
      
      // Calculate surf rating
      const waveHeight = current.wave_height || 1;
      const windSpeed = current.wind_speed_10m || 5;
      
      let rating: 'POOR' | 'FAIR' | 'GOOD' | 'EXCELLENT' = 'FAIR';
      let ratingValue = 50;
      
      if (waveHeight > 2.5 && windSpeed < 15) {
        rating = 'EXCELLENT';
        ratingValue = 90;
      } else if (waveHeight > 1.5 && windSpeed < 20) {
        rating = 'GOOD';
        ratingValue = 75;
      } else if (waveHeight < 0.8 || windSpeed > 25) {
        rating = 'POOR';
        ratingValue = 25;
      }
      
      // Mock tide data (in production, use a tide API)
      const tideData = this.generateMockTideData();
      
      return {
        spotId,
        rating,
        ratingValue,
        surfHeight: {
          min: Math.max(0.3, Math.round(waveHeight * 0.8 * 10) / 10), // Keep in meters
          max: Math.round(waveHeight * 1.2 * 10) / 10,
          description: waveHeight < 1 ? 'Cheville à genou' : 
                      waveHeight < 2 ? 'Cuisse à ventre' :
                      waveHeight < 3 ? 'Ventre à poitrine' : 'Poitrine à tête'
        },
        swell: [
          {
            height: Number(waveHeight.toFixed(1)), // Keep in meters
            period: current.wave_period || 8,
            direction: this.getWindDirection(current.wave_direction || 270),
            angle: current.wave_direction || 270
          }
        ],
        wind: {
          speed: Math.round((windSpeed || 5) * 0.54), // Convert km/h to knots
          gusts: Math.round((windSpeed || 5) * 0.54 * 1.3),
          direction: this.getWindDirection(current.wind_direction_10m || 180),
          type: this.getWindType(current.wind_direction_10m || 180, current.wave_direction || 270)
        },
        tide: {
          current: tideData.current,
          trend: tideData.trend,
          nextChange: tideData.nextChange,
          data: tideData.data
        },
        temperature: {
          air: Math.round(weatherData.current.temperature_2m || 20), // Keep in Celsius
          water: Math.round((weatherData.current.temperature_2m || 20) - 3), // Estimate water temp in Celsius
          wetsuit: (weatherData.current.temperature_2m || 20) < 18 ? 'Combinaison 3mm' : 'Combinaison 2mm'
        },
        forecast: 'OPEN-METEO',
        lastUpdated: new Date().toLocaleString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short'
        })
      };
      
    } catch (error) {
      console.error('Error fetching real-time conditions:', error);
      return null;
    }
  }
  
  static async fetchConditionsBySpot(spotId: string): Promise<RealSurfCondition | null> {
    // Try to fetch real-time data first
    const realTimeData = await this.fetchRealTimeConditions(spotId);
    if (realTimeData) {
      return realTimeData;
    }
    
    // Fallback to stored data or mock data
    return null;
  }
  
  static async refreshConditions(): Promise<void> {
    console.log('Refreshing conditions...');
    // In production, this would call the Supabase Edge Function
  }
  
  static async isDataStale(maxAgeHours = 6): Promise<boolean> {
    // For real-time API, data is never stale
    return false;
  }
  
  private static getSpotCoordinates(spotId: string): { coordinates: [number, number] } | null {
    const spots: Record<string, { coordinates: [number, number] }> = {
      'taghazout': { coordinates: [30.5436, -9.7076] },
      'anchor-point': { coordinates: [30.5325, -9.7189] },
      'imsouane': { coordinates: [30.8419, -9.8239] }
    };
    return spots[spotId] || null;
  }
  
  private static getWindDirection(angle: number): string {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(angle / 22.5) % 16];
  }
  
  private static getWindType(windDir: number, waveDir: number): 'Onshore' | 'Offshore' | 'Cross-shore' {
    const diff = Math.abs(windDir - waveDir);
    const normalizedDiff = Math.min(diff, 360 - diff);
    
    if (normalizedDiff < 45) return 'Onshore';
    if (normalizedDiff > 135) return 'Offshore';
    return 'Cross-shore';
  }
  
  private static generateMockTideData() {
    const now = new Date();
    const baseHeight = 0.6 + Math.random() * 0.6; // Random base between 0.6-1.2m
    
    return {
      current: Number((baseHeight + Math.sin(now.getHours() / 6 * Math.PI) * 0.5).toFixed(1)),
      trend: (now.getHours() % 12) < 6 ? 'rising' as const : 'falling' as const,
      nextChange: `${(now.getHours() + 2) % 12 || 12}:${String(now.getMinutes()).padStart(2, '0')}${now.getHours() + 2 >= 12 ? 'pm' : 'am'} ${(baseHeight + 0.5).toFixed(1)}m`,
      data: Array.from({ length: 8 }, (_, i) => ({
        time: `${(now.getHours() + i) % 12 || 12}${(now.getHours() + i) >= 12 ? 'pm' : 'am'}`,
        height: Number((baseHeight + Math.sin((now.getHours() + i) / 6 * Math.PI) * 0.5).toFixed(1))
      }))
    };
  }
}