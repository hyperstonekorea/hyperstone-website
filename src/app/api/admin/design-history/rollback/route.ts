import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { validateAdminAccess, logRequest, RATE_LIMITS } from '@/lib/auth-middleware';
import { DesignSettings, DesignHistoryEntry } from '@/lib/design/types';
import { 
  createNoCacheResponse, 
  cacheManager, 
  CACHE_KEYS,
  CACHE_CONFIG 
} from '@/lib/design/cache';

const SETTINGS_KEY = 'design:settings:current';
const HISTORY_KEY = 'design:history:entries';

/**
 * POST /api/admin/design-history/rollback
 * Rollback to a specific history entry
 * Requirements: 1.8, Security, Performance
 * Invalidates caches after rollback
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  // Validate admin access with rate limiting for save operations
  const accessCheck = validateAdminAccess(request, RATE_LIMITS.SAVE_SETTINGS);
  if (!accessCheck.valid) {
    logRequest(request, '/api/admin/design-history/rollback', accessCheck.response!.status, Date.now() - startTime);
    return accessCheck.response;
  }

  try {
    const { entryId } = await request.json();

    if (!entryId) {
      const response = NextResponse.json(
        { error: 'Entry ID is required' },
        { status: 400 }
      );
      logRequest(request, '/api/admin/design-history/rollback', 400, Date.now() - startTime);
      return response;
    }

    // Load all history entries
    const allEntries = await kv.get<DesignHistoryEntry[]>(HISTORY_KEY) || [];
    
    // Find the specific entry
    const targetEntry = allEntries.find(entry => entry.id === entryId);

    if (!targetEntry) {
      const response = NextResponse.json(
        { error: 'History entry not found' },
        { status: 404 }
      );
      logRequest(request, '/api/admin/design-history/rollback', 404, Date.now() - startTime);
      return response;
    }

    // Update the settings with the historical version
    const rolledBackSettings: DesignSettings = {
      ...targetEntry.settings,
      lastUpdated: new Date().toISOString()
    };

    // Save as current settings
    await kv.set(SETTINGS_KEY, rolledBackSettings);

    // Create a new history entry for the rollback action
    const rollbackHistoryEntry: DesignHistoryEntry = {
      id: `rollback-${Date.now()}`,
      timestamp: new Date().toISOString(),
      settings: rolledBackSettings,
      author: 'admin',
      description: `Rolled back to version from ${new Date(targetEntry.timestamp).toLocaleString()}`
    };

    // Add to history
    const updatedHistory = [rollbackHistoryEntry, ...allEntries].slice(0, 50); // Keep last 50
    await kv.set(HISTORY_KEY, updatedHistory);

    // Invalidate all design-related caches
    await cacheManager.invalidateDesignCaches();
    
    // Increment cache version for cache busting
    await cacheManager.incrementVersion(CACHE_KEYS.DESIGN_SETTINGS_VERSION);

    // Update cache with new settings
    await cacheManager.set(
      CACHE_KEYS.DESIGN_SETTINGS,
      rolledBackSettings,
      CACHE_CONFIG.DESIGN_SETTINGS.ttl
    );

    const response = createNoCacheResponse({
      success: true,
      settings: rolledBackSettings,
      message: 'Successfully rolled back to previous version'
    });
    
    logRequest(request, '/api/admin/design-history/rollback', 200, Date.now() - startTime);
    return response;
  } catch (error) {
    console.error('Failed to rollback design settings:', error);
    const response = NextResponse.json(
      { error: 'Failed to rollback design settings' },
      { status: 500 }
    );
    
    logRequest(request, '/api/admin/design-history/rollback', 500, Date.now() - startTime);
    return response;
  }
}
