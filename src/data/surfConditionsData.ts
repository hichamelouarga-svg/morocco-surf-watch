// Mock surf conditions data for each surf spot
export const surfConditionsData = {
  'taghazout': {
    rating: 'FAIR' as const,
    ratingValue: 60,
    surfHeight: {
      min: 0.6,
      max: 0.9,
      description: 'Cuisse à ventre'
    },
    swell: [
      { height: 0.7, period: 7, direction: 'W', angle: 279 },
      { height: 0.5, period: 15, direction: 'SSW', angle: 213 },
      { height: 0.3, period: 18, direction: 'SW', angle: 223 }
    ],
    wind: {
      speed: 4,
      gusts: 8,
      direction: 'SW',
      type: 'Onshore' as const
    },
    tide: {
      current: 1.2,
      trend: 'rising' as const,
      nextChange: '4:53pm 1.6m',
      data: [
        { time: 'Midi', height: 0.6 },
        { time: '2pm', height: 1.2 },
        { time: '4pm', height: 1.5 },
        { time: '6pm', height: 1.6 }
      ]
    },
    temperature: {
      air: 20,
      water: 17,
      wetsuit: 'Combinaison 2mm'
    },
    forecast: 'LOTUS',
    lastUpdated: '1:14pm, PDT (UTC-7)'
  },
  'anchor-point': {
    rating: 'GOOD' as const,
    ratingValue: 75,
    surfHeight: {
      min: 0.9,
      max: 1.5,
      description: 'Ventre à poitrine'
    },
    swell: [
      { height: 1.0, period: 8, direction: 'NW', angle: 315 },
      { height: 0.6, period: 12, direction: 'W', angle: 270 }
    ],
    wind: {
      speed: 6,
      gusts: 12,
      direction: 'E',
      type: 'Offshore' as const
    },
    tide: {
      current: 0.6,
      trend: 'falling' as const,
      nextChange: '2:30pm 0.4m',
      data: [
        { time: 'Midi', height: 1.0 },
        { time: '2pm', height: 0.6 },
        { time: '4pm', height: 0.4 },
        { time: '6pm', height: 0.6 }
      ]
    },
    temperature: {
      air: 22,
      water: 18,
      wetsuit: 'Combinaison 2mm'
    },
    forecast: 'LOTUS',
    lastUpdated: '1:14pm, PDT (UTC-7)'
  },
  'imsouane': {
    rating: 'EXCELLENT' as const,
    ratingValue: 90,
    surfHeight: {
      min: 1.2,
      max: 1.8,
      description: 'Poitrine à tête'
    },
    swell: [
      { height: 1.4, period: 10, direction: 'NW', angle: 320 },
      { height: 0.9, period: 14, direction: 'W', angle: 280 }
    ],
    wind: {
      speed: 8,
      gusts: 15,
      direction: 'NE',
      type: 'Offshore' as const
    },
    tide: {
      current: 1.3,
      trend: 'rising' as const,
      nextChange: '5:15pm 1.8m',
      data: [
        { time: 'Midi', height: 0.9 },
        { time: '2pm', height: 1.3 },
        { time: '4pm', height: 1.6 },
        { time: '6pm', height: 1.8 }
      ]
    },
    temperature: {
      air: 21,
      water: 19,
      wetsuit: 'Combinaison 3mm'
    },
    forecast: 'LOTUS',
    lastUpdated: '1:14pm, PDT (UTC-7)'
  }
};