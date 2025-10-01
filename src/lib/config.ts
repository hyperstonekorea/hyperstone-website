import { AdminSettings } from '@/types';
import fs from 'fs';
import path from 'path';

const CONFIG_PATH = path.join(process.cwd(), 'config', 'admin-settings.json');

export async function getAdminSettings(): Promise<AdminSettings> {
  try {
    const configData = fs.readFileSync(CONFIG_PATH, 'utf-8');
    return JSON.parse(configData);
  } catch (error) {
    console.error('Error reading admin settings:', error);
    // Return default settings if file doesn't exist
    return {
      emailRecipient: 'admin@hyperstone.co.kr',
      sectionConfigs: []
    };
  }
}

export async function saveAdminSettings(settings: AdminSettings): Promise<void> {
  try {
    const configDir = path.dirname(CONFIG_PATH);
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }
    
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(settings, null, 2));
  } catch (error) {
    console.error('Error saving admin settings:', error);
    throw new Error('Failed to save admin settings');
  }
}

export function getSectionConfig(sectionId: string, settings: AdminSettings) {
  return settings.sectionConfigs.find(config => config.sectionId === sectionId);
}