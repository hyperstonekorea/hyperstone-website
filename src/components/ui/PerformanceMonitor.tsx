'use client';

import { useEffect } from 'react';

// Type definitions for Performance API
interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number;
}

interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

/**
 * Performance monitoring component for UI optimization
 * This is a lightweight version that focuses on UI performance
 */
export function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production and in browser
    if (process.env.NODE_ENV !== 'production' || typeof window === 'undefined') {
      return;
    }

    // Monitor Core Web Vitals
    const observeWebVitals = () => {
      // Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            if (lastEntry) {
              console.log('LCP:', lastEntry.startTime);
            }
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

          // First Input Delay (FID)
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
              const fidEntry = entry as PerformanceEventTiming;
              console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
            });
          });
          fidObserver.observe({ entryTypes: ['first-input'] });

          // Cumulative Layout Shift (CLS)
          const clsObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
              const clsEntry = entry as LayoutShift;
              if (!clsEntry.hadRecentInput) {
                console.log('CLS:', clsEntry.value);
              }
            });
          });
          clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (error) {
          // Silently fail if PerformanceObserver is not supported
          console.warn('Performance monitoring not supported:', error);
        }
      }
    };

    // Resource optimization
    const optimizeResources = () => {
      // Preload critical resources
      const preloadCriticalResources = () => {
        const criticalImages = document.querySelectorAll('img[data-priority="high"]');
        criticalImages.forEach((img) => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = (img as HTMLImageElement).src;
          document.head.appendChild(link);
        });
      };

      // Lazy load non-critical resources
      const lazyLoadResources = () => {
        if ('IntersectionObserver' in window) {
          const lazyImages = document.querySelectorAll('img[data-lazy="true"]');
          const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const img = entry.target as HTMLImageElement;
                if (img.dataset.src) {
                  img.src = img.dataset.src;
                  img.removeAttribute('data-lazy');
                  imageObserver.unobserve(img);
                }
              }
            });
          });

          lazyImages.forEach((img) => imageObserver.observe(img));
        }
      };

      preloadCriticalResources();
      lazyLoadResources();
    };

    // Initialize monitoring
    observeWebVitals();
    optimizeResources();

    // Cleanup function
    return () => {
      // Cleanup observers if needed
    };
  }, []);

  // This component doesn't render anything visible
  return null;
}