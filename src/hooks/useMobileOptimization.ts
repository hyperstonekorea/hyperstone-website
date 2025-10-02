'use client';

import { useState, useEffect } from 'react';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
  screenHeight: number;
  pixelRatio: number;
  touchSupport: boolean;
  isTouchDevice: boolean;
}

interface TouchOptimizations {
  minTouchTarget: number;
  tapDelay: number;
  scrollBehavior: 'smooth' | 'auto';
  preventZoom: {
    fontSize: string;
  };
}

interface PerformanceOptimizations {
  reduceAnimations: boolean;
  lazyLoadImages: boolean;
  prefetchLinks: boolean;
  enableServiceWorker: boolean;
  shouldReduceAnimations: boolean;
}

interface MobileOptimizationHook {
  deviceInfo: DeviceInfo;
  touchOptimizations: TouchOptimizations;
  performanceOptimizations: PerformanceOptimizations;
  isLoading: boolean;
}

export function useMobileOptimization(): MobileOptimizationHook {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    screenWidth: 1920,
    screenHeight: 1080,
    pixelRatio: 1,
    touchSupport: false,
    isTouchDevice: false,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const detectDevice = () => {
      if (typeof window === 'undefined') return;

      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const pixelRatio = window.devicePixelRatio || 1;
      const touchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      const isMobile = screenWidth < 768;
      const isTablet = screenWidth >= 768 && screenWidth < 1024;
      const isDesktop = screenWidth >= 1024;

      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        screenWidth,
        screenHeight,
        pixelRatio,
        touchSupport,
        isTouchDevice: touchSupport,
      });

      setIsLoading(false);
    };

    // Initial detection
    detectDevice();

    // Listen for resize events
    const handleResize = () => {
      detectDevice();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Touch optimizations based on device
  const touchOptimizations: TouchOptimizations = {
    minTouchTarget: deviceInfo.isMobile ? 44 : 32, // iOS HIG recommends 44px minimum
    tapDelay: deviceInfo.touchSupport ? 0 : 300,
    scrollBehavior: deviceInfo.isMobile ? 'smooth' : 'auto',
    preventZoom: {
      fontSize: deviceInfo.isMobile ? '16px' : '14px', // Prevent zoom on iOS
    },
  };

  // Performance optimizations based on device capabilities
  const performanceOptimizations: PerformanceOptimizations = {
    reduceAnimations: deviceInfo.isMobile && deviceInfo.pixelRatio > 2,
    lazyLoadImages: true,
    prefetchLinks: !deviceInfo.isMobile, // Only prefetch on desktop to save mobile data
    enableServiceWorker: typeof navigator !== 'undefined' && 'serviceWorker' in navigator,
    shouldReduceAnimations: deviceInfo.isMobile && deviceInfo.pixelRatio > 2,
  };

  return {
    deviceInfo,
    touchOptimizations,
    performanceOptimizations,
    isLoading,
  };
}