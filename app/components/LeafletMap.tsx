'use client';

import { useEffect, useRef } from 'react';

interface LeafletMapProps {
  className?: string;
}

export default function LeafletMap({ className }: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: any;

    const initMap = async () => {
      if (!mapRef.current) return;

      try {
        const L = await import('leaflet');

        // Add Leaflet CSS
        if (!document.querySelector('link[href*="leaflet.css"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          document.head.appendChild(link);
        }

        // Fix default markers
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl:
            'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl:
            'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl:
            'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });

        map = L.map(mapRef.current).setView([22.3039, 70.8022], 8);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);

        // Gujarat cities
        const cities = [
          { name: 'Rajkot', lat: 22.3039, lng: 70.8022, isMain: true },
          { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714, isMain: false },
          { name: 'Surat', lat: 21.1702, lng: 72.8311, isMain: false },
          { name: 'Vadodara', lat: 22.3072, lng: 73.1812, isMain: false },
          { name: 'Bhavnagar', lat: 21.7645, lng: 72.1519, isMain: false },
        ];

        // Custom taxi icon
        const taxiIcon = L.divIcon({
          html: `<div style="background: #facc15; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">🚕</div>`,
          className: 'custom-div-icon',
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });

        const mainTaxiIcon = L.divIcon({
          html: `<div style="background: #dc2626; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.2); animation: bounce 2s infinite;">🚕</div>`,
          className: 'custom-div-icon',
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        cities.forEach((city) => {
          const marker = L.marker([city.lat, city.lng], {
            icon: city.isMain ? mainTaxiIcon : taxiIcon,
          }).addTo(map);

          marker.bindPopup(
            `<div style="text-align: center;"><strong>${city.name}</strong><br/>${city.isMain ? 'Main Hub' : 'Taxi Hub'}</div>`
          );
        });

        map.dragging.disable();
        map.touchZoom.disable();
        map.doubleClickZoom.disable();
        map.scrollWheelZoom.disable();
        map.boxZoom.disable();
        map.keyboard.disable();
        if (map.tap) map.tap.disable();
      } catch (error) {
        console.error('Error loading map:', error);
      }
    };

    initMap();

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  return <div ref={mapRef} className={`w-full h-full ${className}`} />;
}
