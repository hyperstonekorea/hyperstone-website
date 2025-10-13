import { kv } from '@vercel/kv';
import { DesignSettings } from './types';
import { DEFAULT_DESIGN_SETTINGS } from './defaults';

const SETTINGS_KEY = 'design:settings:current';

export class DesignSettingsLoader {
  async loadWithFallback(): Promise<DesignSettings> {
    try {
      const settings = await kv.get<DesignSettings>(SETTINGS_KEY);
      
      if (!settings) {
        console.log('No design settings found, using defaults');
        return DEFAULT_DESIGN_SETTINGS;
      }

      // Merge with defaults to ensure all required fields exist
      return this.mergeWithDefaults(settings);
    } catch (error) {
      console.error('Failed to load design settings from KV:', error);
      return DEFAULT_DESIGN_SETTINGS;
    }
  }

  async saveWithRetry(
    settings: DesignSettings,
    maxRetries: number = 3
  ): Promise<void> {
    for (let i = 0; i < maxRetries; i++) {
      try {
        await kv.set(SETTINGS_KEY, settings);
        return;
      } catch (error) {
        console.error(`Failed to save design settings (attempt ${i + 1}/${maxRetries}):`, error);
        
        if (i === maxRetries - 1) {
          throw new Error('Failed to save design settings after multiple attempts');
        }
        
        // Exponential backoff
        await this.delay(1000 * Math.pow(2, i));
      }
    }
  }

  private mergeWithDefaults(settings: DesignSettings): DesignSettings {
    return {
      ...DEFAULT_DESIGN_SETTINGS,
      ...settings,
      sections: {
        ...DEFAULT_DESIGN_SETTINGS.sections,
        ...settings.sections,
      },
      productCards: {
        ...DEFAULT_DESIGN_SETTINGS.productCards,
        ...settings.productCards,
      },
      productDetails: {
        ...DEFAULT_DESIGN_SETTINGS.productDetails,
        ...settings.productDetails,
      },
      globalFonts: {
        ...DEFAULT_DESIGN_SETTINGS.globalFonts,
        ...settings.globalFonts,
      },
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const designSettingsLoader = new DesignSettingsLoader();
