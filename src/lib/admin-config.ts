import { promises as fs } from 'fs';
import path from 'path';
import { AdminSettings, SectionConfig } from '@/types';

const CONFIG_FILE_PATH = path.join(process.cwd(), 'config', 'admin-settings.json');

// Default settings if file doesn't exist
const DEFAULT_SETTINGS: AdminSettings = {
  emailRecipient: 'admin@hyperstone.co.kr',
  sectionConfigs: [
    {
      sectionId: 'hero',
      backgroundType: 'color',
      backgroundValue: '#0082FB',
      opacity: 80,
      tone: 'dark'
    },
    {
      sectionId: 'about',
      backgroundType: 'color',
      backgroundValue: '#F1F5F8',
      opacity: 100,
      tone: 'light'
    },
    {
      sectionId: 'products',
      backgroundType: 'color',
      backgroundValue: '#FFFFFF',
      opacity: 100,
      tone: 'light'
    },
    {
      sectionId: 'contact',
      backgroundType: 'color',
      backgroundValue: '#1C2B33',
      opacity: 90,
      tone: 'dark'
    }
  ]
};

/**
 * Read admin settings from JSON file
 */
export async function readAdminSettings(): Promise<AdminSettings> {
  try {
    const fileContent = await fs.readFile(CONFIG_FILE_PATH, 'utf-8');
    const settings = JSON.parse(fileContent) as AdminSettings;
    
    // Validate the structure and merge with defaults if needed
    return {
      emailRecipient: settings.emailRecipient || DEFAULT_SETTINGS.emailRecipient,
      sectionConfigs: settings.sectionConfigs || DEFAULT_SETTINGS.sectionConfigs
    };
  } catch (error) {
    console.warn('Could not read admin settings, using defaults:', error);
    
    // Create the config directory and file with defaults
    await writeAdminSettings(DEFAULT_SETTINGS);
    return DEFAULT_SETTINGS;
  }
}

/**
 * Write admin settings to JSON file
 */
export async function writeAdminSettings(settings: AdminSettings): Promise<void> {
  try {
    // Ensure the config directory exists
    const configDir = path.dirname(CONFIG_FILE_PATH);
    await fs.mkdir(configDir, { recursive: true });
    
    // Write the settings file
    await fs.writeFile(CONFIG_FILE_PATH, JSON.stringify(settings, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to write admin settings:', error);
    throw new Error('설정 파일 저장에 실패했습니다.');
  }
}

/**
 * Update a specific section configuration
 */
export async function updateSectionConfig(sectionId: string, config: Omit<SectionConfig, 'sectionId'>): Promise<AdminSettings> {
  const settings = await readAdminSettings();
  
  const sectionIndex = settings.sectionConfigs.findIndex(s => s.sectionId === sectionId);
  
  if (sectionIndex >= 0) {
    settings.sectionConfigs[sectionIndex] = { sectionId, ...config };
  } else {
    settings.sectionConfigs.push({ sectionId, ...config });
  }
  
  await writeAdminSettings(settings);
  return settings;
}

/**
 * Update email recipient
 */
export async function updateEmailRecipient(email: string): Promise<AdminSettings> {
  const settings = await readAdminSettings();
  settings.emailRecipient = email;
  await writeAdminSettings(settings);
  return settings;
}

/**
 * Get configuration for a specific section
 */
export async function getSectionConfig(sectionId: string): Promise<SectionConfig | null> {
  const settings = await readAdminSettings();
  return settings.sectionConfigs.find(s => s.sectionId === sectionId) || null;
}

/**
 * Validate admin settings structure
 */
export function validateAdminSettings(settings: unknown): settings is AdminSettings {
  if (!settings || typeof settings !== 'object') {
    return false;
  }
  
  const settingsObj = settings as Record<string, unknown>;
  
  if (typeof settingsObj.emailRecipient !== 'string') {
    return false;
  }
  
  if (!Array.isArray(settingsObj.sectionConfigs)) {
    return false;
  }
  
  return settingsObj.sectionConfigs.every((config: unknown) => {
    if (!config || typeof config !== 'object') return false;
    const configObj = config as Record<string, unknown>;
    
    return (
      typeof configObj.sectionId === 'string' &&
      ['video', 'image', 'color'].includes(configObj.backgroundType as string) &&
      typeof configObj.backgroundValue === 'string' &&
      typeof configObj.opacity === 'number' &&
      ['light', 'dark', 'auto'].includes(configObj.tone as string)
    );
  });
}