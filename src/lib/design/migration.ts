/**
 * Migration utility for design settings
 * Transforms old settings formats to new design system schema
 * Requirements: 1.6
 */

import { kv } from '@vercel/kv';
import { DesignSettings } from './types';
import { DEFAULT_DESIGN_SETTINGS } from './defaults';
import { designStorage, KV_KEYS } from './storage';

// Version tracking for migrations
export const MIGRATION_VERSIONS = {
  LEGACY: '0.0.0',
  V1_0_0: '1.0.0',
  CURRENT: '1.0.0',
} as const;

// Key for migration metadata
const MIGRATION_KEY = 'design:migration:metadata';
const BACKUP_KEY_PREFIX = 'design:backup:';

export interface MigrationMetadata {
  lastMigration: string;
  fromVersion: string;
  toVersion: string;
  timestamp: string;
  backupId?: string;
}

export interface LegacySettings {
  // Old ContentManager format (if it existed)
  sections?: {
    hero?: {
      title?: string;
      subtitle?: string;
      backgroundImage?: string;
      backgroundColor?: string;
    };
    about?: {
      title?: string;
      description?: string;
      backgroundColor?: string;
    };
    products?: {
      title?: string;
      backgroundColor?: string;
    };
    contact?: {
      title?: string;
      description?: string;
      backgroundColor?: string;
    };
  };
  // Old styling format
  colors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
    text?: string;
    background?: string;
  };
  fonts?: {
    heading?: string;
    body?: string;
  };
  // Any other legacy fields
  [key: string]: any;
}

/**
 * Main migration function
 * Detects current version and migrates to latest schema
 */
export async function migrateDesignSettings(
  author: string = 'system'
): Promise<{
  success: boolean;
  fromVersion: string;
  toVersion: string;
  backupId?: string;
  message: string;
}> {
  try {
    console.log('Starting design settings migration...');

    // Check if migration is needed
    const currentSettings = await kv.get<DesignSettings>(
      KV_KEYS.DESIGN_SETTINGS
    );

    if (!currentSettings) {
      console.log('No existing settings found, initializing with defaults');
      await designStorage.saveSettings(
        DEFAULT_DESIGN_SETTINGS,
        author,
        'Initial settings creation'
      );

      return {
        success: true,
        fromVersion: MIGRATION_VERSIONS.LEGACY,
        toVersion: MIGRATION_VERSIONS.CURRENT,
        message: 'Initialized with default settings',
      };
    }

    // Check current version
    const currentVersion = currentSettings.version || MIGRATION_VERSIONS.LEGACY;

    if (currentVersion === MIGRATION_VERSIONS.CURRENT) {
      console.log('Settings are already at current version');
      return {
        success: true,
        fromVersion: currentVersion,
        toVersion: MIGRATION_VERSIONS.CURRENT,
        message: 'No migration needed - already at current version',
      };
    }

    // Create backup before migration
    const backupId = await createBackup(currentSettings);
    console.log('Backup created:', backupId);

    // Perform migration based on version
    let migratedSettings: DesignSettings;

    if (currentVersion === MIGRATION_VERSIONS.LEGACY) {
      migratedSettings = await migrateLegacyToV1(
        currentSettings as unknown as LegacySettings
      );
    } else {
      // Future version migrations would go here
      migratedSettings = currentSettings;
    }

    // Update version
    migratedSettings.version = MIGRATION_VERSIONS.CURRENT;
    migratedSettings.lastUpdated = new Date().toISOString();

    // Save migrated settings
    await designStorage.saveSettings(
      migratedSettings,
      author,
      `Migrated from version ${currentVersion} to ${MIGRATION_VERSIONS.CURRENT}`
    );

    // Save migration metadata
    const metadata: MigrationMetadata = {
      lastMigration: 'legacy-to-v1',
      fromVersion: currentVersion,
      toVersion: MIGRATION_VERSIONS.CURRENT,
      timestamp: new Date().toISOString(),
      backupId,
    };
    await kv.set(MIGRATION_KEY, metadata);

    console.log('Migration completed successfully');

    return {
      success: true,
      fromVersion: currentVersion,
      toVersion: MIGRATION_VERSIONS.CURRENT,
      backupId,
      message: `Successfully migrated from ${currentVersion} to ${MIGRATION_VERSIONS.CURRENT}`,
    };
  } catch (error) {
    console.error('Migration failed:', error);
    return {
      success: false,
      fromVersion: MIGRATION_VERSIONS.LEGACY,
      toVersion: MIGRATION_VERSIONS.CURRENT,
      message: `Migration failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Create a backup of current settings before migration
 */
async function createBackup(settings: any): Promise<string> {
  const backupId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const backupKey = `${BACKUP_KEY_PREFIX}${backupId}`;

  await kv.set(backupKey, {
    settings,
    timestamp: new Date().toISOString(),
  });

  // Set expiration to 30 days
  await kv.expire(backupKey, 30 * 24 * 60 * 60);

  return backupId;
}

/**
 * Migrate from legacy format to v1.0.0
 */
async function migrateLegacyToV1(
  legacy: LegacySettings
): Promise<DesignSettings> {
  console.log('Migrating from legacy format to v1.0.0');

  // Start with default settings
  const migrated: DesignSettings = JSON.parse(
    JSON.stringify(DEFAULT_DESIGN_SETTINGS)
  );

  // Migrate section backgrounds if they exist
  if (legacy.sections) {
    // Hero section
    if (legacy.sections.hero) {
      if (legacy.sections.hero.backgroundImage) {
        migrated.sections.hero.background = {
          type: 'image',
          value: legacy.sections.hero.backgroundImage,
        };
      } else if (legacy.sections.hero.backgroundColor) {
        migrated.sections.hero.background = {
          type: 'color',
          value: legacy.sections.hero.backgroundColor,
        };
      }
    }

    // About section
    if (legacy.sections.about?.backgroundColor) {
      migrated.sections.about.background = {
        type: 'color',
        value: legacy.sections.about.backgroundColor,
      };
    }

    // Products section
    if (legacy.sections.products?.backgroundColor) {
      migrated.sections.products.background = {
        type: 'color',
        value: legacy.sections.products.backgroundColor,
      };
    }

    // Contact section
    if (legacy.sections.contact?.backgroundColor) {
      migrated.sections.contact.background = {
        type: 'color',
        value: legacy.sections.contact.backgroundColor,
      };
    }
  }

  // Migrate colors if they exist
  if (legacy.colors) {
    const sections = ['hero', 'about', 'products', 'contact'] as const;

    sections.forEach((sectionId) => {
      if (legacy.colors?.primary) {
        migrated.sections[sectionId].colors.accent.value =
          legacy.colors.primary;
      }
      if (legacy.colors?.text) {
        migrated.sections[sectionId].colors.text.value = legacy.colors.text;
      }
    });
  }

  // Migrate fonts if they exist
  if (legacy.fonts) {
    const sections = ['hero', 'about', 'products', 'contact'] as const;

    sections.forEach((sectionId) => {
      if (legacy.fonts?.heading) {
        migrated.sections[sectionId].fonts.heading.family =
          legacy.fonts.heading;
        migrated.sections[sectionId].fonts.heading.source = 'system';
      }
      if (legacy.fonts?.body) {
        migrated.sections[sectionId].fonts.body.family = legacy.fonts.body;
        migrated.sections[sectionId].fonts.body.source = 'system';
      }
    });

    // Update global fonts
    if (legacy.fonts.heading) {
      migrated.globalFonts.primary.family = legacy.fonts.heading;
      migrated.globalFonts.primary.source = 'system';
    }
    if (legacy.fonts.body) {
      migrated.globalFonts.secondary.family = legacy.fonts.body;
      migrated.globalFonts.secondary.source = 'system';
    }
  }

  return migrated;
}

/**
 * Restore from a backup
 */
export async function restoreFromBackup(
  backupId: string,
  author: string = 'admin'
): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const backupKey = `${BACKUP_KEY_PREFIX}${backupId}`;
    const backup = await kv.get<{
      settings: any;
      timestamp: string;
    }>(backupKey);

    if (!backup) {
      return {
        success: false,
        message: 'Backup not found',
      };
    }

    // Save the backup as current settings
    await designStorage.saveSettings(
      backup.settings,
      author,
      `Restored from backup ${backupId} (created ${backup.timestamp})`
    );

    return {
      success: true,
      message: `Successfully restored from backup created at ${backup.timestamp}`,
    };
  } catch (error) {
    console.error('Failed to restore from backup:', error);
    return {
      success: false,
      message: `Failed to restore: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Get migration metadata
 */
export async function getMigrationMetadata(): Promise<MigrationMetadata | null> {
  try {
    return await kv.get<MigrationMetadata>(MIGRATION_KEY);
  } catch (error) {
    console.error('Failed to get migration metadata:', error);
    return null;
  }
}

/**
 * List available backups
 */
export async function listBackups(): Promise<
  Array<{
    id: string;
    timestamp: string;
  }>
> {
  try {
    // Note: This is a simplified version
    // In production, you might want to maintain a separate index of backups
    const metadata = await getMigrationMetadata();

    if (metadata?.backupId) {
      return [
        {
          id: metadata.backupId,
          timestamp: metadata.timestamp,
        },
      ];
    }

    return [];
  } catch (error) {
    console.error('Failed to list backups:', error);
    return [];
  }
}

/**
 * Validate migrated settings
 */
function validateMigratedSettings(settings: DesignSettings): boolean {
  try {
    // Check required fields
    if (!settings.version) return false;
    if (!settings.sections) return false;
    if (!settings.productCards) return false;
    if (!settings.globalFonts) return false;

    // Check required sections
    const requiredSections = ['hero', 'about', 'products', 'contact'];
    for (const sectionId of requiredSections) {
      if (!settings.sections[sectionId]) return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}
