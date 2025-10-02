'use client';

import { useEffect, useCallback } from 'react';

interface WebVitalsMetric {
  name: string;
  value: number;
  id: string;
  delta: number;
}

interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
}

export function usePerformanceMonitoring() {
  const reportMetric = useCallback((metric: WebVitalsMetric) => {
    // In production, you might want to send this to an analytics service
    if (process.env.NODE_ENV === 'development') {
      console.log(`${metric.name}:`, metric.value);
    }
    
    // Example: Send to analytics service
    // analytics.track('web-vital', {
    //   metric: metric.name,
    //   value: metric.value,
    //   id: metric.id
    // });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Monitor Core Web Vitals
    const observeWebVitals = () => {
      if (!('PerformanceObserver' in window)) return;

      try {
        // Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (lastEntry) {
            reportMetric({
              name: 'LCP',
              value: lastEntry.startTime,
              id: 'lcp',
              delta: lastEntry.startTime
            });
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            const fid = entry.processingStart - entry.startTime;
            reportMetric({
              name: 'FID',
              value: fid,
              id: 'fid',
              delta: fid
            });
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
              reportMetric({
                name: 'CLS',
                value: clsValue,
                id: 'cls',
                delta: entry.value
              });
            }
          });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // First Contentful Paint (FCP)
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            reportMetric({
              name: 'FCP',
              value: entry.startTime,
              id: 'fcp',
              delta: entry.startTime
            });
          });
        });
        fcpObserver.observe({ entryTypes: ['paint'] });

      } catch (error) {
        console.warn('Performance monitoring setup failed:', error);
      }
    };

    // Monitor navigation timing
    const observeNavigationTiming = () => {
      if ('performance' in window && 'getEntriesByType' in performance) {
        const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
        if (navigationEntries.length > 0) {
          const entry = navigationEntries[0];
          
          // Time to First Byte (TTFB)
          const ttfb = entry.responseStart - entry.requestStart;
          reportMetric({
            name: 'TTFB',
            value: ttfb,
            id: 'ttfb',
            delta: ttfb
          });
        }
      }
    };

    observeWebVitals();
    observeNavigationTiming();
  }, [reportMetric]);
}

export function useResourceOptimization() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const optimizeResources = () => {
      // Preconnect to external domains
      const preconnectDomains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
      ];

      preconnectDomains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });

      // Prefetch critical resources
      const prefetchCriticalResources = () => {
        const criticalPaths = [
          '/api/admin/config',
        ];

        criticalPaths.forEach(path => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = path;
          document.head.appendChild(link);
        });
      };

      // Optimize images
      const optimizeImages = () => {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
          // Add loading="lazy" to non-critical images
          if (!img.hasAttribute('priority') && !img.hasAttribute('loading')) {
            img.loading = 'lazy';
          }

          // Add decoding="async" for better performance
          if (!img.hasAttribute('decoding')) {
            img.decoding = 'async';
          }
        });
      };

      prefetchCriticalResources();
      
      // Delay image optimization to avoid blocking initial render
      setTimeout(optimizeImages, 100);
    };

    // Run optimization after initial render
    const timeoutId = setTimeout(optimizeResources, 0);

    return () => clearTimeout(timeoutId);
  }, []);
}