import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface SurfSpotLocationMapProps {
  latitude: number;
  longitude: number;
  spotName: string;
  className?: string;
}

const SurfSpotLocationMap: React.FC<SurfSpotLocationMapProps> = ({ 
  latitude, 
  longitude, 
  spotName, 
  className = "" 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Use the provided Mapbox public token
    mapboxgl.accessToken = 'pk.eyJ1Ijoic3VyZmF1bWFyb2MiLCJhIjoiY21kcWlid2llMDZibjJtcHp6NWx1Ynd3ZCJ9.kCWTEjWjMTkRWNJAqhNlVg';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [longitude, latitude],
      zoom: 14,
      pitch: 45,
      bearing: 0
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add marker for surf spot
    const marker = new mapboxgl.Marker({
      color: '#FF6B35', // coral color
      scale: 1.2
    })
      .setLngLat([longitude, latitude])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 })
          .setHTML(`
            <div class="p-2">
              <h3 class="font-bold text-lg">${spotName}</h3>
              <p class="text-sm text-gray-600">Surf Spot Location</p>
            </div>
          `)
      )
      .addTo(map.current);

    // Show popup by default
    marker.togglePopup();

    // Add some wave animation effects around the marker
    map.current.on('load', () => {
      if (!map.current) return;

      // Add a circle layer for wave effect
      map.current.addSource('surf-spot', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [longitude, latitude]
          },
          'properties': {}
        }
      });

      map.current.addLayer({
        'id': 'surf-spot-waves',
        'type': 'circle',
        'source': 'surf-spot',
        'paint': {
          'circle-radius': {
            'base': 1.75,
            'stops': [
              [12, 20],
              [22, 100]
            ]
          },
          'circle-color': '#00A8E8',
          'circle-opacity': 0.3,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#FF6B35',
          'circle-stroke-opacity': 0.6
        }
      });
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [latitude, longitude, spotName]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-lg" />
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg z-10">
        <h3 className="font-bold text-sm text-gray-800">{spotName}</h3>
        <p className="text-xs text-gray-600">
          {latitude.toFixed(4)}°, {longitude.toFixed(4)}°
        </p>
      </div>
    </div>
  );
};

export default SurfSpotLocationMap;