'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { SectionConfig } from '@/types';

interface UseBackgroundConfigReturn {
  config: SectionConfig | null;
  loading: boolean;
  error: string | null;
  refreshConfig: () => Promise<void>;
}

/**
 * Hook to manage background configuration for a specific section
 * Provides real-time updates and error handling
 */
export function useBackgroundConfig(
  sectionId: string,
  fallbackConfig?: Partial<SectionConfig>
): UseBackgroundConfigReturn {
  const [config, setConfig] = useState<SectionConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Default configuration - memoized to prevent unnecessary re-renders
  const defaultConfig: SectionConfig = useMemo(() => ({
    sectionId,
    backgroundType: 'color',
    backgroundValue: '#F1F5F8',
    opacity: 100,
    tone: 'light',
    ...fallbackConfig
  }), [sectionId, fallbackConfig]);

  // Fetch configuration from API
  const fetchConfig = useCallback(async () => {
    // Skip fetch during SSR
    if (typeof window === 'undefined') {
      setConfig(defaultConfig);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/admin/settings', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const settings = await response.json();
      const sectionConfig = settings.sectionConfigs?.find(
        (s: SectionConfig) => s.sectionId === sectionId
      );

      setConfig(sectionConfig || defaultConfig);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.warn(`Failed to load config for section ${sectionId}:`, errorMessage);
      setError(errorMessage);
      setConfig(defaultConfig);
    } finally {
      setLoading(false);
    }
  }, [sectionId, defaultConfig]);

  // Initial load - only on client side
  useEffect(() => {
    // Only fetch if we're in the browser
    if (typeof window !== 'undefined') {
      fetchConfig();
    } else {
      // On server, use default config immediately
      setConfig(defaultConfig);
      setLoading(false);
    }
  }, [fetchConfig, defaultConfig]);

  // Listen for configuration updates (for real-time updates from admin panel)
  useEffect(() => {
    const handleConfigUpdate = (event: CustomEvent) => {
      const { sectionId: updatedSectionId, config: updatedConfig } = event.detail;
      
      if (updatedSectionId === sectionId) {
        setConfig(updatedConfig);
      }
    };

    // Listen for custom events from admin panel
    window.addEventListener('backgroundConfigUpdated', handleConfigUpdate as EventListener);

    return () => {
      window.removeEventListener('backgroundConfigUpdated', handleConfigUpdate as EventListener);
    };
  }, [sectionId]);

  return {
    config,
    loading,
    error,
    refreshConfig: fetchConfig
  };
}

/**
 * Utility function to emit background config update events
 * Used by admin components to notify other components of changes
 */
export function emitBackgroundConfigUpdate(sectionId: string, config: SectionConfig): void {
  const event = new CustomEvent('backgroundConfigUpdated', {
    detail: { sectionId, config }
  });
  window.dispatchEvent(event);
}

/**
 * Hook to get all section configurations
 */
export function useAllBackgroundConfigs() {
  const [configs, setConfigs] = useState<SectionConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllConfigs = useCallback(async () => {
    // Skip fetch during SSR
    if (typeof window === 'undefined') {
      setConfigs([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/admin/settings');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const settings = await response.json();
      setConfigs(settings.sectionConfigs || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.warn('Failed to load all background configs:', errorMessage);
      setError(errorMessage);
      setConfigs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Only fetch on client side
    if (typeof window !== 'undefined') {
      fetchAllConfigs();
    } else {
      setConfigs([]);
      setLoading(false);
    }
  }, [fetchAllConfigs]);

  return {
    configs,
    loading,
    error,
    refreshConfigs: fetchAllConfigs
  };
}