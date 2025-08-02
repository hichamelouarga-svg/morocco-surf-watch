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
    console.log(`🌊 START: Fetching real-time conditions for spot: ${spotId}`);
    try {
      // Use OpenWeatherMap API directly with your key
      const spot = this.getSpotCoordinates(spotId);
      if (!spot) {
        console.error(`❌ No coordinates found for spot: ${spotId}`);
        return null;
      }
      
      const [lat, lon] = spot.coordinates;
      
      // Use open-meteo.com free API (simpler current weather endpoint)
      const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,wind_direction_10m&timezone=auto&forecast_days=1`;
      console.log(`Fetching weather data from: ${apiUrl}`);
      
      const weatherResponse = await fetch(apiUrl, {
        cache: 'no-cache',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      
      if (!weatherResponse.ok) {
        console.error(`Weather API error: ${weatherResponse.status} ${weatherResponse.statusText}`);
        throw new Error('Failed to fetch weather data');
      }
      
      const weatherData = await weatherResponse.json();
      console.log('✅ Weather data received:', weatherData);
      
      // Process Open-Meteo data
      const current = weatherData.current;
      
      // Get real wind data from Open-Meteo
      const windSpeed = current.wind_speed_10m || 5; // m/s from API
      const windSpeedKmh = windSpeed * 3.6; // Convert to km/h
      const windDirection = current.wind_direction_10m || 180;
      
      // Use realistic wave simulation based on wind conditions
      // Strong winds generally create bigger waves
      const windFactor = Math.min(windSpeedKmh / 30, 1); // Normalize wind effect
      const baseWaveHeight = 0.5 + (windFactor * 2); // 0.5-2.5m base
      const waveHeight = baseWaveHeight + (Math.random() * 0.8); // Add some variation
      
      const swellPeriod = 6 + (waveHeight * 2) + (Math.random() * 3); // Realistic period
      const swellDirection = windDirection + (Math.random() * 60 - 30); // Swell direction based on wind
      
      // Calculate surf rating based on real conditions
      let rating: 'POOR' | 'FAIR' | 'GOOD' | 'EXCELLENT' = 'FAIR';
      let ratingValue = 50;
      
      if (waveHeight > 1.8 && windSpeedKmh < 15) {
        rating = 'EXCELLENT';
        ratingValue = 90;
      } else if (waveHeight > 1.2 && windSpeedKmh < 20) {
        rating = 'GOOD';
        ratingValue = 75;
      } else if (waveHeight < 0.8 || windSpeedKmh > 25) {
        rating = 'POOR';
        ratingValue = 25;
      }
      
        console.log('Real weather data used:', {
        temperature: current.temperature_2m,
        windSpeed: windSpeed,
        windDirection: windDirection,
        calculatedWaveHeight: waveHeight,
        rating: rating
      });
      
      // Mock tide data (in production, use a tide API)
      const tideData = this.generateMockTideData();
      
      const result = {
        spotId,
        rating,
        ratingValue,
        surfHeight: {
          min: Math.max(0.3, Math.round(waveHeight * 0.8 * 10) / 10),
          max: Math.round(waveHeight * 1.2 * 10) / 10,
          description: waveHeight < 1 ? 'Cheville à genou' : 
                      waveHeight < 2 ? 'Cuisse à ventre' :
                      waveHeight < 3 ? 'Ventre à poitrine' : 'Poitrine à tête'
        },
        swell: [
          {
            height: Number(waveHeight.toFixed(1)),
            period: Math.round(swellPeriod),
            direction: this.getWindDirection(swellDirection),
            angle: Math.round(swellDirection)
          }
        ],
        wind: {
          speed: Math.round(windSpeedKmh * 0.54), // Convert km/h to knots
          gusts: Math.round(windSpeedKmh * 0.54 * 1.3),
          direction: this.getWindDirection(current.wind_direction_10m || 180),
          type: this.getWindType(current.wind_direction_10m || 180, swellDirection)
        },
        tide: {
          current: tideData.current,
          trend: tideData.trend,
          nextChange: tideData.nextChange,
          data: tideData.data
        },
        temperature: {
          air: Math.round(current.temperature_2m || 20), // Celsius from Open-Meteo
          water: Math.round((current.temperature_2m || 20) - 3), // Estimate water temp
          wetsuit: (current.temperature_2m || 20) < 18 ? 'Combinaison 3mm' : 'Combinaison 2mm'
        },
        forecast: 'OPEN-METEO',
        lastUpdated: new Date().toLocaleString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short'
        })
      };
      
      console.log('Final surf conditions result:', result);
      return result;
      
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
    try {
      const response = await fetch('/functions/v1/fetch-weather-data', {
        method: 'POST'
      });
      
      if (!response.ok) {
        throw new Error('Failed to refresh conditions');
      }
      
      console.log('Conditions refreshed successfully');
    } catch (error) {
      console.error('Error refreshing conditions:', error);
    }
  }

  static async fetchFromSupabase(spotId: string): Promise<RealSurfCondition | null> {
    try {
      const response = await fetch(`/rest/v1/weather_conditions?spot_id=eq.${spotId}&select=*&order=timestamp.desc&limit=1`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      if (!data || data.length === 0) {
        return null;
      }

      const weather = data[0];
      
      return {
        spotId: weather.spot_id,
        rating: this.calculateRating(weather.wave_height, weather.wind_speed) > 75 ? 'EXCELLENT' : 
                this.calculateRating(weather.wave_height, weather.wind_speed) > 60 ? 'GOOD' : 
                this.calculateRating(weather.wave_height, weather.wind_speed) > 40 ? 'FAIR' : 'POOR',
        ratingValue: this.calculateRating(weather.wave_height, weather.wind_speed),
        surfHeight: {
          min: Math.max(0.3, weather.wave_height * 0.8),
          max: weather.wave_height * 1.2,
          description: weather.wave_height < 1 ? 'Cheville à genou' : 
                      weather.wave_height < 2 ? 'Cuisse à ventre' :
                      weather.wave_height < 3 ? 'Ventre à poitrine' : 'Poitrine à tête'
        },
        swell: [{
          height: weather.wave_height,
          period: weather.swell_period,
          direction: this.getWindDirection(weather.swell_direction),
          angle: weather.swell_direction
        }],
        wind: {
          speed: Math.round(weather.wind_speed * 0.54), // Convert km/h to knots
          gusts: Math.round(weather.wind_speed * 0.54 * 1.3),
          direction: this.getWindDirection(weather.wind_direction),
          type: this.getWindType(weather.wind_direction, weather.swell_direction)
        },
        tide: this.generateMockTideData(),
        temperature: {
          air: weather.temperature,
          water: weather.temperature - 3,
          wetsuit: weather.temperature < 18 ? 'Combinaison 3mm' : 'Combinaison 2mm'
        },
        forecast: 'OPENWEATHERMAP',
        lastUpdated: new Date(weather.timestamp).toLocaleString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short'
        })
      };
    } catch (error) {
      console.error('Error fetching from Supabase:', error);
      return null;
    }
  }

  static calculateRating(waveHeight: number, windSpeed: number): number {
    let rating = 50; // Base rating
    
    // Wave height scoring
    if (waveHeight >= 1.5 && waveHeight <= 3) rating += 25;
    if (waveHeight > 3) rating += 15;
    if (waveHeight < 1) rating -= 20;
    
    // Wind scoring
    if (windSpeed <= 15) rating += 20;
    if (windSpeed > 25) rating -= 30;
    if (windSpeed > 20) rating -= 15;
    
    return Math.max(10, Math.min(95, rating));
  }
  
  static async isDataStale(maxAgeHours = 6): Promise<boolean> {
    // For real-time API, data is never stale
    return false;
  }
  
  private static getSpotCoordinates(spotId: string): { coordinates: [number, number] } | null {
    const spots: Record<string, { coordinates: [number, number] }> = {
      'mehdia-beach': { coordinates: [34.2570, -6.6810] },
      'rabat-beach': { coordinates: [34.034961, -6.837362] },
      'mohammedia': { coordinates: [33.722732, -7.348247] },
      'dar-bouazza': { coordinates: [33.530570, -7.832972] },
      'bouznika': { coordinates: [33.825611, -7.150553] },
      'plage-des-nations': { coordinates: [34.150943, -6.738099] },
      'larache': { coordinates: [35.205304, -6.152181] },
      'assilah': { coordinates: [35.475152, -6.031830] },
      'moulay-bouselham': { coordinates: [34.888412, -6.295382] },
      'safi': { coordinates: [32.320099, -9.259436] },
      'imsouane': { coordinates: [30.839529, -9.819274] },
      'taghazout': { coordinates: [30.544901, -9.727011] },
      'anchor-point': { coordinates: [30.5325, -9.7189] },
      'sidi-ifni': { coordinates: [29.387104, -10.174070] },
      'tarfaya': { coordinates: [27.947872, -12.928467] },
      'dakhla': { coordinates: [23.767069, -15.925064] }
    };
    console.log(`Looking up coordinates for spotId: ${spotId}`, spots[spotId]);
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