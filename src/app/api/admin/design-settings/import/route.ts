/**
 * Design Settings Import API Endpoint
 * Requirements: 1.6, Security, Performance
 * 
 * POST: Import and validate design settings from JSON
 * Invalidates caches after import
 */

import { NextRequest, NextResponse } from 'next/server';
import { validateAdminAccess, logRequest, RATE_LIMITS } from '@/lib/auth-middleware';
import { designStorage } from '@/lib/design/storage';
import { 
  createNoCacheResponse, 
  cacheManager, 
  CACHE_KEYS,
  CACHE_CONFIG 
} from '@/lib/design/cache';

/**
 * POST /api/admin/design-settings/import
 * Import design settings from JSON file
 * Validates structure before saving and invalidates caches
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  // Validate admin access with rate limiting for save operations
  const accessCheck = validateAdminAccess(request, RATE_LIMITS.SAVE_SETTINGS);
  if (!accessCheck.valid) {
    logRequest(request, '/api/admin/design-settings/import', accessCheck.response!.status, Date.now() - startTime);
    return accessCheck.response;
  }

  try {
    const body = await request.json();
    const { jsonString, author = 'admin' } = body;

    // Validate input
    if (!jsonString || typeof jsonString !== 'string') {
      const response = NextResponse.json(
        {
          success: false,
          message: 'Invalid input: jsonString is required',
        },
        { status: 400 }
      );
      logRequest(request, '/api/admin/design-settings/import', 400, Date.now() - startTime);
      return response;
    }

    // Import settings (includes validation)
    const settings = await designStorage.importSettings(jsonString, author);

    // Invalidate all design-related caches
    await cacheManager.invalidateDesignCaches();
    
    // Increment cache version for cache busting
    await cacheManager.incrementVersion(CACHE_KEYS.DESIGN_SETTINGS_VERSION);

    // Update cache with new settings
    await cacheManager.set(
      CACHE_KEYS.DESIGN_SETTINGS,
      settings,
      CACHE_CONFIG.DESIGN_SETTINGS.ttl
    );

    const response = createNoCacheResponse({
      success: true,
      message: 'Design settings imported successfully',
      data: settings,
    });
    
    logRequest(request, '/api/admin/design-settings/import', 200, Date.now() - startTime);
    return response;
  } catch (error) {
    console.error('Failed to import design settings:', error);
    
    // Provide more specific error messages
    let message = 'Failed to import design settings';
    if (error instanceof SyntaxError) {
      message = 'Invalid JSON format';
    } else if (error instanceof Error && error.message.includes('Invalid settings format')) {
      message = 'Invalid settings format: missing required fields';
    }

    const response = NextResponse.json(
      {
        success: false,
        message,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 400 }
    );
    
    logRequest(request, '/api/admin/design-settings/import', 400, Date.now() - startTime);
    return response;
  }
}
