'use client';

import React from 'react';
import Image from 'next/image';
import { SectionConfig } from '@/types';
import { useBackgroundConfig } from '@/hooks/useBackgroundConfig';

interface DynamicBackgroundProps {
  sectionId: string;
  children: React.ReactNode;
  className?: string;
  fallbackConfig?: Partial<SectionConfig>;
}

const DynamicBackground: React.FC<DynamicBackgroundProps> = ({
  sectionId,
  children,
  className = '',
  fallbackConfig
}) => {
  const { config, loading, error } = useBackgroundConfig(sectionId, fallbackConfig);

  // Get tone-based overlay styles
  const getToneOverlay = (tone: string, opacity: number): string => {
    const overlayOpacity = Math.max(0, Math.min(1, (100 - opacity) / 100));
    
    switch (tone) {
      case 'dark':
        return `rgba(0, 0, 0, ${overlayOpacity * 0.6})`;
      case 'light':
        return `rgba(255, 255, 255, ${overlayOpacity * 0.4})`;
      case 'auto':
      default:
        return `rgba(28, 43, 51, ${overlayOpacity * 0.3})`; // Brand dark color
    }
  };

  // Handle media loading errors
  const handleMediaError = (mediaType: 'image' | 'video') => {
    console.warn(`Failed to load background ${mediaType}: ${config?.backgroundValue}`);
    // Could implement fallback logic here if needed
  };

  // Render background based on type
  const renderBackground = () => {
    if (!config) return null;

    const { backgroundType, backgroundValue, opacity, tone } = config;
    const toneOverlay = getToneOverlay(tone, opacity);
    const normalizedOpacity = Math.max(0, Math.min(1, opacity / 100));

    switch (backgroundType) {
      case 'color':
        return (
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundColor: backgroundValue,
              opacity: normalizedOpacity
            }}
          />
        );

      case 'image':
        return (
          <>
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={backgroundValue}
                alt="Background"
                fill
                className="object-cover"
                style={{ opacity: normalizedOpacity }}
                priority={sectionId === 'hero'}
                onError={() => handleMediaError('image')}
                sizes="100vw"
              />
            </div>
            {/* Tone overlay for images */}
            {tone !== 'auto' && (
              <div
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ backgroundColor: toneOverlay }}
              />
            )}
          </>
        );

      case 'video':
        return (
          <>
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                style={{ opacity: normalizedOpacity }}
                onError={() => handleMediaError('video')}
              >
                <source src={backgroundValue} type="video/mp4" />
                <source src={backgroundValue} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>
            {/* Tone overlay for videos */}
            {tone !== 'auto' && (
              <div
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ backgroundColor: toneOverlay }}
              />
            )}
          </>
        );

      default:
        return null;
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className={`relative ${className}`}>
        <div className="absolute inset-0 w-full h-full bg-gray-100 animate-pulse" />
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }

  // Error state with fallback
  if (error && !config) {
    return (
      <div className={`relative ${className}`}>
        <div className="absolute inset-0 w-full h-full bg-gray-50" />
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Background Layer */}
      <div className="absolute inset-0 w-full h-full">
        {renderBackground()}
      </div>
      
      {/* Content Layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default DynamicBackground;