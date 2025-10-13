/**
 * Design Settings API Endpoints
 * Requirements: 1.6, Security
 * 
 * GET: Load design settings from Vercel KV with fallback to defaults
 * PUT: Save design settings to Vercel KV with validation and history
 * 
 * Security: Authentication, rate limiting, and request logging
 */

import { NextRequest, NextResponse } from 'next/server';
import { validateAdminAccess, logRequest, RATE_LIMITS } from '@/lib/auth-middleware';
import { designStorage } from '@/lib/design/storage';
import { DesignSettings } from '@/lib/design/types';
import { 
  createCachedResponse, 
  createNotModifiedResponse, 
  isCacheFresh,
  cacheManager,
  CACHE_KEYS,
  CACHE_CONFIG,
  addCacheVersion
} from '@/lib/design/cache';

/**
 * GET /api/admin/design-settings
 * Load current design settings from Vercel KV
 * Falls back to default settings if not found
 * Implements caching with stale-while-revalidate
 */
export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  // Validate admin access with rate limiting
  const accessCheck = validateAdminAccess(request, RATE_LIMITS.DEFAULT);
  if (!accessCheck.valid) {
    logRequest(request, '/api/admin/design-settings', accessCheck.response!.status, Date.now() - startTime);
    return accessCheck.response;
  }

  try {
    // Check If-Modified-Since header for conditional requests
    const ifModifiedSince = request.headers.get('if-modified-since');
    
    // Try to get from cache first
    const cachedSettings = await cacheManager.get<DesignSettings>(CACHE_KEYS.DESIGN_SETTINGS);
    
    if (cachedSettings) {
      // Check if client cache is still fresh
      if (ifModifiedSince && isCacheFresh(cachedSettings.lastUpdated, ifModifiedSince)) {
        logRequest(request, '/api/admin/design-settings', 304, Date.now() - startTime);
        return createNotModifiedResponse();
      }

      // Return cached data with cache headers
      const response = createCachedResponse(
        {
          success: true,
          data: cachedSettings,
          cached: true,
        },
        'DESIGN_SETTINGS'
      );

      // Add cache version header
      await addCacheVersion(response, CACHE_KEYS.DESIGN_SETTINGS_VERSION);
      
      // Add Last-Modified header
      response.headers.set('Last-Modified', new Date(cachedSettings.lastUpdated).toUTCString());
      
      logRequest(request, '/api/admin/design-settings', 200, Date.now() - startTime);
      return response;
    }

    // Cache miss - load from storage
    const settings = await designStorage.loadSettings();
    
    // Cache the settings with TTL
    await cacheManager.set(
      CACHE_KEYS.DESIGN_SETTINGS,
      settings,
      CACHE_CONFIG.DESIGN_SETTINGS.ttl
    );

    // Check if client cache is still fresh
    if (ifModifiedSince && isCacheFresh(settings.lastUpdated, ifModifiedSince)) {
      logRequest(request, '/api/admin/design-settings', 304, Date.now() - startTime);
      return createNotModifiedResponse();
    }

    const response = createCachedResponse(
      {
        success: true,
        data: settings,
        cached: false,
      },
      'DESIGN_SETTINGS'
    );

    // Add cache version header
    await addCacheVersion(response, CACHE_KEYS.DESIGN_SETTINGS_VERSION);
    
    // Add Last-Modified header
    response.headers.set('Last-Modified', new Date(settings.lastUpdated).toUTCString());
    
    logRequest(request, '/api/admin/design-settings', 200, Date.now() - startTime);
    return response;
  } catch (error) {
    console.error('Failed to load design settings:', error);
    const response = NextResponse.json(
      {
        success: false,
        message: 'Failed to load design settings',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
    
    logRequest(request, '/api/admin/design-settings', 500, Date.now() - startTime);
    return response;
  }
}

/**
 * PUT /api/admin/design-settings
 * Save design settings to Vercel KV
 * Creates history entry and invalidates caches
 */
export async function PUT(request: NextRequest) {
  const startTime = Date.now();
  
  // Validate admin access with stricter rate limiting for save operations
  const accessCheck = validateAdminAccess(request, RATE_LIMITS.SAVE_SETTINGS);
  if (!accessCheck.valid) {
    logRequest(request, '/api/admin/design-settings', accessCheck.response!.status, Date.now() - startTime);
    return accessCheck.response;
  }

  try {
    const body = await request.json();
    const { settings, author = 'admin', description } = body;

    // Basic validation
    if (!settings || typeof settings !== 'object') {
      const response = NextResponse.json(
        {
          success: false,
          message: 'Invalid settings format',
        },
        { status: 400 }
      );
      logRequest(request, '/api/admin/design-settings', 400, Date.now() - startTime);
      return response;
    }

    // Validate required fields
    if (!settings.version || !settings.sections || !settings.productCards) {
      const response = NextResponse.json(
        {
          success: false,
          message: 'Missing required fields in settings',
        },
        { status: 400 }
      );
      logRequest(request, '/api/admin/design-settings', 400, Date.now() - startTime);
      return response;
    }

    // Save settings with history
    await designStorage.saveSettings(
      settings as DesignSettings,
      author,
      description
    );

    // Invalidate all design-related caches
    await cacheManager.invalidateDesignCaches();
    
    // Increment cache version for cache busting
    await cacheManager.incrementVersion(CACHE_KEYS.DESIGN_SETTINGS_VERSION);

    // Return updated settings
    const updatedSettings = await designStorage.loadSettings();

    // Update cache with new settings
    await cacheManager.set(
      CACHE_KEYS.DESIGN_SETTINGS,
      updatedSettings,
      CACHE_CONFIG.DESIGN_SETTINGS.ttl
    );

    const response = NextResponse.json(
      {
        success: true,
        message: 'Design settings saved successfully',
        data: updatedSettings,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
    
    logRequest(request, '/api/admin/design-settings', 200, Date.now() - startTime);
    return response;
  } catch (error) {
    console.error('Failed to save design settings:', error);
    const response = NextResponse.json(
      {
        success: false,
        message: 'Failed to save design settings',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
    
    logRequest(request, '/api/admin/design-settings', 500, Date.now() - startTime);
    return response;
  }
}
