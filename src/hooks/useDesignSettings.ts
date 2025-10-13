'use client';

import { useState, useEffect } from 'react';
import { DesignSettings } from '@/lib/design/types';
import { DEFAULT_DESIGN_SETTINGS } from '@/lib/design/defaults';

interface UseDesignSettingsResult {
  settings: DesignSettings;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useDesignSettings(): UseDesignSettingsResult {
  const [settings, setSettings] = useState<DesignSettings>(DEFAULT_DESIGN_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/admin/design-settings', {
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch design settings');
      }

      const data = await response.json();
      setSettings(data.settings || DEFAULT_DESIGN_SETTINGS);
    } catch (err) {
      console.error('Error fetching design settings:', err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
      // Fall back to defaults on error
      setSettings(DEFAULT_DESIGN_SETTINGS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return {
    settings,
    loading,
    error,
    refetch: fetchSettings
  };
}
