/**
 * Design Storage Service for Vercel KV
 * Requirements: 1.6, 1.8
 */

import { kv } from '@vercel/kv';
import { DesignSettings, DesignHistoryEntry } from './types';
import { DEFAULT_DESIGN_SETTINGS } from './defaults';

// KV key structure
export const KV_KEYS = {
  DESIGN_SETTINGS: 'design:settings:current',
  DESIGN_HISTORY: 'design:history:entries',
  DESIGN_HISTORY_ENTRY: (id: string) => `design:history:${id}`,
  FONT_CACHE: (family: string) => `fonts:cache:${family}`,
} as const;

// Maximum number of history entries to keep
const MAX_HISTORY_ENTRIES = 50;

/**
 * Service for managing design settings in Vercel KV
 */
export class DesignStorageService {
  /**
   * Save design settings to Vercel KV
   * Creates a history entry and invalidates caches
   */
  async saveSettings(
    settings: DesignSettings,
    author: string = 'admin',
    description?: string
  ): Promise<void> {
    try {
      // Update timestamp
      settings.lastUpdated = new Date().toISOString();

      // Save current settings
      await kv.set(KV_KEYS.DESIGN_SETTINGS, settings);

      // Create history entry
      await this.createHistoryEntry(settings, author, description);

      console.log('Design settings saved successfully');
    } catch (error) {
      console.error('Failed to save design settings:', error);
      throw new Error('Failed to save design settings');
    }
  }

  /**
   * Load design settings from Vercel KV
   * Falls back to default settings if not found or on error
   */
  async loadSettings(): Promise<DesignSettings> {
    try {
      const settings = await kv.get<DesignSettings>(KV_KEYS.DESIGN_SETTINGS);
      
      if (!settings) {
        console.log('No design settings found, using defaults');
        return DEFAULT_DESIGN_SETTINGS;
      }

      return settings;
    } catch (error) {
      console.error('Failed to load design settings:', error);
      console.log('Falling back to default settings');
      return DEFAULT_DESIGN_SETTINGS;
    }
  }

  /**
   * Create a history entry for the current settings
   */
  private async createHistoryEntry(
    settings: DesignSettings,
    author: string,
    description?: string
  ): Promise<void> {
    try {
      const historyEntry: DesignHistoryEntry = {
        id: `history-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
        settings,
        author,
        description,
      };

      // Save individual history entry
      await kv.set(
        KV_KEYS.DESIGN_HISTORY_ENTRY(historyEntry.id),
        historyEntry
      );

      // Get current history list
      const historyList = await kv.get<string[]>(KV_KEYS.DESIGN_HISTORY) || [];

      // Add new entry to the beginning
      historyList.unshift(historyEntry.id);

      // Trim to max entries
      if (historyList.length > MAX_HISTORY_ENTRIES) {
        const removedIds = historyList.splice(MAX_HISTORY_ENTRIES);
        
        // Delete old entries
        for (const id of removedIds) {
          await kv.del(KV_KEYS.DESIGN_HISTORY_ENTRY(id));
        }
      }

      // Save updated history list
      await kv.set(KV_KEYS.DESIGN_HISTORY, historyList);

      console.log('History entry created:', historyEntry.id);
    } catch (error) {
      console.error('Failed to create history entry:', error);
      // Don't throw - history is not critical
    }
  }

  /**
   * Load design history entries
   */
  async loadHistory(limit: number = 20): Promise<DesignHistoryEntry[]> {
    try {
      const historyList = await kv.get<string[]>(KV_KEYS.DESIGN_HISTORY) || [];
      const limitedList = historyList.slice(0, limit);

      const entries: DesignHistoryEntry[] = [];

      for (const id of limitedList) {
        const entry = await kv.get<DesignHistoryEntry>(
          KV_KEYS.DESIGN_HISTORY_ENTRY(id)
        );
        if (entry) {
          entries.push(entry);
        }
      }

      return entries;
    } catch (error) {
      console.error('Failed to load history:', error);
      return [];
    }
  }

  /**
   * Rollback to a specific history entry
   */
  async rollback(
    entryId: string,
    author: string = 'admin'
  ): Promise<DesignSettings> {
    try {
      // Load the history entry
      const entry = await kv.get<DesignHistoryEntry>(
        KV_KEYS.DESIGN_HISTORY_ENTRY(entryId)
      );

      if (!entry) {
        throw new Error('History entry not found');
      }

      // Save as current settings with rollback description
      await this.saveSettings(
        entry.settings,
        author,
        `Rolled back to version from ${entry.timestamp}`
      );

      console.log('Rolled back to history entry:', entryId);
      return entry.settings;
    } catch (error) {
      console.error('Failed to rollback:', error);
      throw new Error('Failed to rollback to history entry');
    }
  }

  /**
   * Export settings as JSON
   */
  async exportSettings(): Promise<string> {
    try {
      const settings = await this.loadSettings();
      return JSON.stringify(settings, null, 2);
    } catch (error) {
      console.error('Failed to export settings:', error);
      throw new Error('Failed to export settings');
    }
  }

  /**
   * Import settings from JSON
   */
  async importSettings(
    jsonString: string,
    author: string = 'admin'
  ): Promise<DesignSettings> {
    try {
      const settings = JSON.parse(jsonString) as DesignSettings;

      // Basic validation
      if (!settings.version || !settings.sections || !settings.productCards) {
        throw new Error('Invalid settings format');
      }

      // Save imported settings
      await this.saveSettings(settings, author, 'Imported from JSON');

      console.log('Settings imported successfully');
      return settings;
    } catch (error) {
      console.error('Failed to import settings:', error);
      throw new Error('Failed to import settings');
    }
  }

  /**
   * Clear all design settings and history (for testing/reset)
   */
  async clearAll(): Promise<void> {
    try {
      // Clear current settings
      await kv.del(KV_KEYS.DESIGN_SETTINGS);

      // Clear history
      const historyList = await kv.get<string[]>(KV_KEYS.DESIGN_HISTORY) || [];
      
      for (const id of historyList) {
        await kv.del(KV_KEYS.DESIGN_HISTORY_ENTRY(id));
      }

      await kv.del(KV_KEYS.DESIGN_HISTORY);

      console.log('All design settings and history cleared');
    } catch (error) {
      console.error('Failed to clear settings:', error);
      throw new Error('Failed to clear settings');
    }
  }
}

// Export singleton instance
export const designStorage = new DesignStorageService();
