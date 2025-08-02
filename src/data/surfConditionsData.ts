// Mock surf conditions data for each surf spot
export const surfConditionsData = {
  'taghazout': {
    rating: 'FAIR' as const,
    ratingValue: 60,
    surfHeight: {
      min: 2,
      max: 3,
      description: 'Cuisse à ventre'
    },
    swell: [
      { height: 2.4, period: 7, direction: 'W', angle: 279 },
      { height: 1.5, period: 15, direction: 'SSW', angle: 213 },
      { height: 0.9, period: 18, direction: 'SW', angle: 223 }
    ],
    wind: {
      speed: 4,
      gusts: 8,
      direction: 'SW',
      type: 'Onshore' as const
    },
    tide: {
      current: 3.9,
      trend: 'rising' as const,
      nextChange: '4:53pm 5.1ft',
      data: [
        { time: 'Midi', height: 2.1 },
        { time: '2pm', height: 3.9 },
        { time: '4pm', height: 4.8 },
        { time: '6pm', height: 5.1 }
      ]
    },
    temperature: {
      air: 68,
      water: 63,
      wetsuit: '2mm wetsuit'
    },
    forecast: 'LOTUS',
    lastUpdated: '1:14pm, PDT (UTC-7)'
  },
  'anchor-point': {
    rating: 'GOOD' as const,
    ratingValue: 75,
    surfHeight: {
      min: 3,
      max: 5,
      description: 'Ventre à poitrine'
    },
    swell: [
      { height: 3.2, period: 8, direction: 'NW', angle: 315 },
      { height: 2.1, period: 12, direction: 'W', angle: 270 }
    ],
    wind: {
      speed: 6,
      gusts: 12,
      direction: 'E',
      type: 'Offshore' as const
    },
    tide: {
      current: 2.1,
      trend: 'falling' as const,
      nextChange: '2:30pm 1.2ft',
      data: [
        { time: 'Midi', height: 3.2 },
        { time: '2pm', height: 2.1 },
        { time: '4pm', height: 1.2 },
        { time: '6pm', height: 2.1 }
      ]
    },
    temperature: {
      air: 72,
      water: 65,
      wetsuit: '2mm wetsuit'
    },
    forecast: 'LOTUS',
    lastUpdated: '1:14pm, PDT (UTC-7)'
  },
  'imsouane': {
    rating: 'EXCELLENT' as const,
    ratingValue: 90,
    surfHeight: {
      min: 4,
      max: 6,
      description: 'Poitrine à tête'
    },
    swell: [
      { height: 4.5, period: 10, direction: 'NW', angle: 320 },
      { height: 2.8, period: 14, direction: 'W', angle: 280 }
    ],
    wind: {
      speed: 8,
      gusts: 15,
      direction: 'NE',
      type: 'Offshore' as const
    },
    tide: {
      current: 4.2,
      trend: 'rising' as const,
      nextChange: '5:15pm 5.8ft',
      data: [
        { time: 'Midi', height: 2.8 },
        { time: '2pm', height: 4.2 },
        { time: '4pm', height: 5.2 },
        { time: '6pm', height: 5.8 }
      ]
    },
    temperature: {
      air: 70,
      water: 64,
      wetsuit: '3mm wetsuit'
    },
    forecast: 'LOTUS',
    lastUpdated: '1:14pm, PDT (UTC-7)'
  }
};