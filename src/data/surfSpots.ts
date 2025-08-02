export interface SurfSpot {
  id: string;
  name: string;
  nameKey: string;
  coordinates: [number, number]; // [latitude, longitude]
  hasLiveStream: boolean;
  streamUrl?: string;
  city: string;
  region: string;
  description: string;
  bestSeasons: string[];
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  waveType: 'beach break' | 'point break' | 'reef break';
  crowdLevel: 'low' | 'medium' | 'high';
}

export const surfSpots: SurfSpot[] = [
  {
    id: 'mehdia-beach',
    name: 'Mehdia Beach',
    nameKey: 'mehdia_beach',
    coordinates: [34.2570, -6.6810],
    hasLiveStream: true,
    streamUrl: 'https://player.castr.com/live_6c77f3a06bf711f0a9fddf5a54be1b73',
    city: 'Kenitra',
    region: 'Rabat-Salé-Kénitra',
    description: 'A beautiful beach break perfect for beginners and intermediate surfers.',
    bestSeasons: ['Autumn', 'Winter', 'Spring'],
    skillLevel: 'beginner',
    waveType: 'beach break',
    crowdLevel: 'medium'
  },
  {
    id: 'rabat-beach',
    name: 'Rabat Beach',
    nameKey: 'rabat_beach',
    coordinates: [34.034961, -6.837362],
    hasLiveStream: false,
    city: 'Rabat',
    region: 'Rabat-Salé-Kénitra',
    description: 'Capital city beach with consistent waves and easy access.',
    bestSeasons: ['Autumn', 'Winter'],
    skillLevel: 'intermediate',
    waveType: 'beach break',
    crowdLevel: 'high'
  },
  {
    id: 'mohammedia',
    name: 'Mohammedia',
    nameKey: 'mohammedia',
    coordinates: [33.722732, -7.348247],
    hasLiveStream: false,
    city: 'Mohammedia',
    region: 'Casablanca-Settat',
    description: 'Popular surf spot near Casablanca with good waves.',
    bestSeasons: ['Autumn', 'Winter'],
    skillLevel: 'intermediate',
    waveType: 'beach break',
    crowdLevel: 'medium'
  },
  {
    id: 'dar-bouazza',
    name: 'Dar Bouazza',
    nameKey: 'dar_bouazza',
    coordinates: [33.530570, -7.832972],
    hasLiveStream: false,
    city: 'Casablanca',
    region: 'Casablanca-Settat',
    description: 'Casablanca area beach break with powerful waves.',
    bestSeasons: ['Autumn', 'Winter'],
    skillLevel: 'intermediate',
    waveType: 'beach break',
    crowdLevel: 'medium'
  },
  {
    id: 'bouznika',
    name: 'Bouznika',
    nameKey: 'bouznika',
    coordinates: [33.825611, -7.150553],
    hasLiveStream: false,
    city: 'Bouznika',
    region: 'Casablanca-Settat',
    description: 'Scenic coastal town with reliable surf conditions.',
    bestSeasons: ['Autumn', 'Winter'],
    skillLevel: 'beginner',
    waveType: 'beach break',
    crowdLevel: 'low'
  },
  {
    id: 'plage-des-nations',
    name: 'Plage des Nations',
    nameKey: 'plage_des_nations',
    coordinates: [34.150943, -6.738099],
    hasLiveStream: false,
    city: 'Salé',
    region: 'Rabat-Salé-Kénitra',
    description: 'Popular beach near Rabat with consistent waves.',
    bestSeasons: ['Autumn', 'Winter'],
    skillLevel: 'intermediate',
    waveType: 'beach break',
    crowdLevel: 'high'
  },
  {
    id: 'larache',
    name: 'Larache',
    nameKey: 'larache',
    coordinates: [35.205304, -6.152181],
    hasLiveStream: false,
    city: 'Larache',
    region: 'Tanger-Tétouan-Al Hoceïma',
    description: 'Northern Morocco surf spot with Atlantic swells.',
    bestSeasons: ['Autumn', 'Winter'],
    skillLevel: 'intermediate',
    waveType: 'beach break',
    crowdLevel: 'low'
  },
  {
    id: 'assilah',
    name: 'Assilah',
    nameKey: 'assilah',
    coordinates: [35.475152, -6.031830],
    hasLiveStream: false,
    city: 'Assilah',
    region: 'Tanger-Tétouan-Al Hoceïma',
    description: 'Historic coastal town with beautiful surf breaks.',
    bestSeasons: ['Autumn', 'Winter'],
    skillLevel: 'intermediate',
    waveType: 'beach break',
    crowdLevel: 'medium'
  },
  {
    id: 'moulay-bouselham',
    name: 'Moulay Bouselham',
    nameKey: 'moulay_bouselham',
    coordinates: [34.888412, -6.295382],
    hasLiveStream: false,
    city: 'Moulay Bouselham',
    region: 'Rabat-Salé-Kénitra',
    description: 'Lagoon area with unique surf conditions and wildlife.',
    bestSeasons: ['Autumn', 'Winter'],
    skillLevel: 'intermediate',
    waveType: 'beach break',
    crowdLevel: 'low'
  },
  {
    id: 'safi',
    name: 'Safi',
    nameKey: 'safi',
    coordinates: [32.320099, -9.259436],
    hasLiveStream: false,
    city: 'Safi',
    region: 'Marrakech-Safi',
    description: 'Southern coastal city with powerful waves.',
    bestSeasons: ['Autumn', 'Winter', 'Spring'],
    skillLevel: 'advanced',
    waveType: 'point break',
    crowdLevel: 'medium'
  },
  {
    id: 'imsouane',
    name: 'Imsouane',
    nameKey: 'imsouane',
    coordinates: [30.839529, -9.819274],
    hasLiveStream: false,
    city: 'Imsouane',
    region: 'Souss-Massa',
    description: 'Famous right-hand point break, paradise for longboarders.',
    bestSeasons: ['Autumn', 'Winter', 'Spring'],
    skillLevel: 'intermediate',
    waveType: 'point break',
    crowdLevel: 'high'
  },
  {
    id: 'taghazout',
    name: 'Taghazout',
    nameKey: 'taghazout',
    coordinates: [30.544901, -9.727011],
    hasLiveStream: false,
    city: 'Taghazout',
    region: 'Souss-Massa',
    description: 'World-famous surf village with multiple breaks.',
    bestSeasons: ['Autumn', 'Winter', 'Spring'],
    skillLevel: 'intermediate',
    waveType: 'point break',
    crowdLevel: 'high'
  },
  {
    id: 'sidi-ifni',
    name: 'Sidi Ifni',
    nameKey: 'sidi_ifni',
    coordinates: [29.387104, -10.174070],
    hasLiveStream: false,
    city: 'Sidi Ifni',
    region: 'Souss-Massa',
    description: 'Coastal town with consistent waves and dramatic cliffs.',
    bestSeasons: ['Autumn', 'Winter', 'Spring'],
    skillLevel: 'intermediate',
    waveType: 'beach break',
    crowdLevel: 'low'
  }
];