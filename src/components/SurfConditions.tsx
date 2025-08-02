import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface SurfCondition {
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

interface SurfConditionsProps {
  spotName: string;
  conditions: SurfCondition;
  transparent?: boolean;
}

const WindCompass: React.FC<{ direction: string; angle: number }> = ({ direction, angle }) => {
  return (
    <div className="relative w-20 h-20 mx-auto">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Compass circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="2"
        />
        
        {/* Direction markers */}
        <text x="50" y="15" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">N</text>
        <text x="85" y="53" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">E</text>
        <text x="50" y="90" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">S</text>
        <text x="15" y="53" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">W</text>
        
        {/* Wind arrow */}
        <g transform={`rotate(${angle} 50 50)`}>
          <line x1="50" y1="25" x2="50" y2="75" stroke="hsl(var(--primary))" strokeWidth="3" markerEnd="url(#arrowhead)" />
        </g>
        
        {/* Arrow marker */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--primary))" />
          </marker>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-semibold text-primary">{direction}</span>
      </div>
    </div>
  );
};

const SurfConditions: React.FC<SurfConditionsProps> = ({ spotName, conditions, transparent = false }) => {
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'EXCELLENT': return 'text-green-600';
      case 'GOOD': return 'text-green-500';
      case 'FAIR': return 'text-yellow-500';
      case 'POOR': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <Card className={`w-full shadow-wave ${transparent ? 'bg-white/50 backdrop-blur-sm border-white/20 text-black' : ''}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className={`font-display text-xl ${transparent ? 'text-black' : ''}`}>
            Conditions actuelles - {spotName}
          </CardTitle>
          <Badge variant="outline" className={`text-xs ${transparent ? 'text-black border-black' : ''}`}>
            Dernière MAJ: {conditions.lastUpdated}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Rating Section */}
        <div className="flex items-center justify-between">
          <div>
            <div className={`text-sm mb-1 ${transparent ? 'text-black' : 'text-muted-foreground'}`}>NOTE CONDITION</div>
            <div className={`text-lg font-bold ${getRatingColor(conditions.rating)}`}>
              {conditions.rating}
            </div>
            <Progress value={conditions.ratingValue} className="w-24 h-2 mt-1" />
          </div>
          <div className="text-right">
            <div className={`text-xs ${transparent ? 'text-black' : 'text-muted-foreground'}`}>📊 {conditions.forecast} Prévision</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Surf Height */}
          <div className="space-y-2">
            <div className={`text-sm ${transparent ? 'text-black' : 'text-muted-foreground'}`}>HAUTEUR SURF</div>
            <div className={`text-2xl font-bold ${transparent ? 'text-black' : 'text-foreground'}`}>
              {conditions.surfHeight.min}-{conditions.surfHeight.max}m
            </div>
            <div className={`text-xs ${transparent ? 'text-black' : 'text-muted-foreground'}`}>
              {conditions.surfHeight.description}
            </div>
            <div className={`text-xs ${transparent ? 'text-black' : 'text-muted-foreground'}`}>
              📊 {conditions.forecast} Prévision
            </div>
          </div>

          {/* Swell */}
          <div className="space-y-2">
            <div className={`text-sm ${transparent ? 'text-black' : 'text-muted-foreground'}`}>HOULE</div>
            {conditions.swell.map((swell, index) => (
              <div key={index} className="text-sm">
                <div className={`font-semibold ${transparent ? 'text-black' : ''}`}>
                  {swell.height}m {swell.period}s {swell.direction} {swell.angle}°
                </div>
              </div>
            ))}
            <div className={`text-xs ${transparent ? 'text-black' : 'text-muted-foreground'}`}>
              📊 {conditions.forecast} Prévision
            </div>
          </div>

          {/* Wind */}
          <div className="space-y-2">
            <div className={`text-sm ${transparent ? 'text-black' : 'text-muted-foreground'}`}>VENT</div>
            <div className={`text-lg font-bold ${transparent ? 'text-black' : ''}`}>
              {conditions.wind.speed}kts {conditions.wind.direction}
            </div>
            <div className={`text-sm ${transparent ? 'text-black' : 'text-muted-foreground'}`}>
              {conditions.wind.gusts}kts rafales, {conditions.wind.type}
            </div>
            <WindCompass direction={conditions.wind.direction} angle={0} />
            <div className={`text-xs ${transparent ? 'text-black' : 'text-muted-foreground'}`}>
              📊 {conditions.forecast} Prévision
            </div>
          </div>

          {/* Tide */}
          <div className="space-y-2">
            <div className={`text-sm ${transparent ? 'text-black' : 'text-muted-foreground'}`}>MARÉE</div>
            <div className={`text-lg font-bold flex items-center ${transparent ? 'text-black' : ''}`}>
              {conditions.tide.current}m
              <span className="ml-1">
                {conditions.tide.trend === 'rising' ? '▲' : '▼'}
              </span>
            </div>
            <div className="h-16 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={conditions.tide.data}>
                  <XAxis 
                    dataKey="time" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: transparent ? '#000000' : 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis hide />
                  <Line 
                    type="monotone" 
                    dataKey="height" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className={`text-xs ${transparent ? 'text-black' : 'text-muted-foreground'}`}>
              Prochaine: {conditions.tide.nextChange}
            </div>
          </div>

          {/* Temperature */}
          <div className="space-y-2">
            <div className={`text-sm ${transparent ? 'text-black' : 'text-muted-foreground'}`}>TEMPÉRATURE</div>
            <div className="flex items-center space-x-2">
              <span className={`text-lg font-bold ${transparent ? 'text-black' : ''}`}>☀️ {conditions.temperature.air}°C</span>
              <span className={`text-lg font-bold ${transparent ? 'text-black' : ''}`}>🌊 {conditions.temperature.water}°C</span>
            </div>
            <div className={`text-xs ${transparent ? 'text-black' : 'text-muted-foreground'}`}>
              {conditions.temperature.wetsuit}
            </div>
            <Badge className="bg-yellow-500 text-yellow-900 text-xs">
              🧴 Utiliser SPF 30 →
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SurfConditions;