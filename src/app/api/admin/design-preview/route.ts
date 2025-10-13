import { NextRequest, NextResponse } from 'next/server';
import { validateAdminAccess, logRequest, RATE_LIMITS } from '@/lib/auth-middleware';
import { DesignSettings } from '@/lib/design/types';
import { createNoCacheResponse } from '@/lib/design/cache';

/**
 * GET /api/admin/design-preview
 * Returns temporary design settings for preview without saving
 * Requirements: 1.7, Security, Performance
 * Always returns no-cache headers to prevent caching preview data
 */
export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  // Validate admin access with rate limiting
  const accessCheck = validateAdminAccess(request, RATE_LIMITS.DEFAULT);
  if (!accessCheck.valid) {
    logRequest(request, '/api/admin/design-preview', accessCheck.response!.status, Date.now() - startTime);
    return accessCheck.response;
  }

  try {
    const { searchParams } = new URL(request.url);
    const settingsParam = searchParams.get('settings');

    if (!settingsParam) {
      const response = NextResponse.json(
        { error: 'Settings parameter is required' },
        { status: 400 }
      );
      logRequest(request, '/api/admin/design-preview', 400, Date.now() - startTime);
      return response;
    }

    // Parse and validate settings
    let settings: DesignSettings;
    try {
      settings = JSON.parse(settingsParam);
    } catch (error) {
      const response = NextResponse.json(
        { error: 'Invalid settings JSON' },
        { status: 400 }
      );
      logRequest(request, '/api/admin/design-preview', 400, Date.now() - startTime);
      return response;
    }

    // Return settings with no-cache headers to prevent caching preview data
    const response = createNoCacheResponse({ settings });
    
    logRequest(request, '/api/admin/design-preview', 200, Date.now() - startTime);
    return response;
  } catch (error) {
    console.error('Preview API error:', error);
    const response = NextResponse.json(
      { error: 'Failed to process preview request' },
      { status: 500 }
    );
    
    logRequest(request, '/api/admin/design-preview', 500, Date.now() - startTime);
    return response;
  }
}

/**
 * POST /api/admin/design-preview
 * Alternative endpoint for larger settings payloads
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  // Validate admin access with rate limiting
  const accessCheck = validateAdminAccess(request, RATE_LIMITS.DEFAULT);
  if (!accessCheck.valid) {
    logRequest(request, '/api/admin/design-preview', accessCheck.response!.status, Date.now() - startTime);
    return accessCheck.response;
  }

  try {
    const body = await request.json();
    const { settings } = body;

    if (!settings) {
      const response = NextResponse.json(
        { error: 'Settings are required' },
        { status: 400 }
      );
      logRequest(request, '/api/admin/design-preview', 400, Date.now() - startTime);
      return response;
    }

    // Validate settings structure
    if (!settings.version || !settings.sections) {
      const response = NextResponse.json(
        { error: 'Invalid settings structure' },
        { status: 400 }
      );
      logRequest(request, '/api/admin/design-preview', 400, Date.now() - startTime);
      return response;
    }

    // Return settings with no-cache headers
    const response = createNoCacheResponse({ settings });
    
    logRequest(request, '/api/admin/design-preview', 200, Date.now() - startTime);
    return response;
  } catch (error) {
    console.error('Preview API error:', error);
    const response = NextResponse.json(
      { error: 'Failed to process preview request' },
      { status: 500 }
    );
    
    logRequest(request, '/api/admin/design-preview', 500, Date.now() - startTime);
    return response;
  }
}
