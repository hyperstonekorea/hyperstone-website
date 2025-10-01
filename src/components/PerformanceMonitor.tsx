'use client';

import { usePerformanceMonitoring, useResourceOptimization } from '@/hooks/usePerformanceMonitoring';

/**
 * Performance monitoring component
 * Handles Web Vitals measurement and resource optimization
 */
export default function PerformanceMonitor() {
  usePerformanceMonitoring();
  useResourceOptimization();
  
  // This component doesn't render anything visible
  return null;
}