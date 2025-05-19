'use client';

import { useEffect, useRef } from 'react';

interface DestinationMapProps {
  latitude: number;
  longitude: number; 
  title: string;
}

export default function DestinationMap({ latitude, longitude, title }: DestinationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // In a real application, you would load a map library like Google Maps, Mapbox, or Leaflet
    // For this example, we'll create a simplified placeholder that could be replaced with an actual map implementation
    if (mapRef.current) {
      const mapContainer = mapRef.current;
      
      // Create a placeholder map content
      mapContainer.innerHTML = `
        <div class="relative w-full h-full bg-gray-200 rounded-lg overflow-hidden">
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center">
              <div class="text-gray-500 mb-2">Map location</div>
              <div class="font-medium">${title}</div>
              <div class="text-sm text-gray-500">Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}</div>
            </div>
          </div>
          <div class="absolute bottom-4 right-4 bg-white p-2 rounded-lg shadow">
            <div class="flex space-x-2">
              <button class="p-1 hover:bg-gray-100 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
              <button class="p-1 hover:bg-gray-100 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      `;
    }
  }, [latitude, longitude, title]);
  
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Location</h2>
      <div 
        ref={mapRef} 
        className="h-96 rounded-lg border border-gray-200 overflow-hidden"
      ></div>
      <div className="mt-2 flex justify-end">
        <a 
          href={`https://www.google.com/maps?q=${latitude},${longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View on Google Maps →
        </a>
      </div>
    </section>
  );
}
