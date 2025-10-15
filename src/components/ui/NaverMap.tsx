'use client';

import { useEffect, useRef } from 'react';

interface NaverMapProps {
  address: string;
  className?: string;
}

declare global {
  interface Window {
    naver: any;
  }
}

export function NaverMap({ address, className = '' }: NaverMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Load Naver Maps script
    const loadNaverMaps = () => {
      if (window.naver && window.naver.maps) {
        initializeMap();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`;
      script.async = true;
      script.onload = () => initializeMap();
      document.head.appendChild(script);
    };

    const initializeMap = () => {
      if (!mapRef.current || !window.naver) return;

      // Coordinates for 고덕여염로 118, 평택시
      const location = new window.naver.maps.LatLng(37.0595, 127.0847);

      const mapOptions = {
        center: location,
        zoom: 17,
        zoomControl: true,
        zoomControlOptions: {
          position: window.naver.maps.Position.TOP_RIGHT,
        },
        mapTypeControl: true,
      };

      mapInstanceRef.current = new window.naver.maps.Map(mapRef.current, mapOptions);

      // Add marker
      const marker = new window.naver.maps.Marker({
        position: location,
        map: mapInstanceRef.current,
        title: 'HYPERSTONE',
      });

      // Add info window
      const infoWindow = new window.naver.maps.InfoWindow({
        content: `
          <div style="padding: 15px; min-width: 200px;">
            <h4 style="margin: 0 0 8px 0; font-weight: bold; font-size: 16px;">HYPERSTONE</h4>
            <p style="margin: 0; font-size: 13px; color: #666;">
              경기도 평택시 고덕여염로 118<br/>
              SBC비지니스센터 6층 610호
            </p>
          </div>
        `,
      });

      // Show info window on marker click
      window.naver.maps.Event.addListener(marker, 'click', () => {
        if (infoWindow.getMap()) {
          infoWindow.close();
        } else {
          infoWindow.open(mapInstanceRef.current, marker);
        }
      });

      // Open info window by default
      infoWindow.open(mapInstanceRef.current, marker);
    };

    loadNaverMaps();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
      }
    };
  }, [address]);

  return (
    <div 
      ref={mapRef} 
      className={className}
      style={{ width: '100%', height: '100%', minHeight: '300px' }}
    />
  );
}
