/**
 * Design Settings Export API Endpoint
 * Requirements: 1.6, Security, Performance
 * 
 * POST: Export current design settings as downloadable JSON
 * No caching for export operations
 */

import { NextRequest, NextResponse } from 'next/server';
import { validateAdminAccess, logRequest, RATE_LIMITS } from '@/lib/auth-middleware';
import { designStorage } from '@/lib/design/storage';

/**
 * POST /api/admin/design-settings/export
 * Export current design settings as downloadable JSON file
 * Always returns no-cache headers
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  // Validate admin access with rate limiting for export operations
  const accessCheck = validateAdminAccess(request, RATE_LIMITS.EXPORT);
  if (!accessCheck.valid) {
    logRequest(request, '/api/admin/design-settings/export', accessCheck.response!.status, Date.now() - startTime);
    return accessCheck.response;
  }

  try {
    // Export settings as JSON string
    const jsonString = await designStorage.exportSettings();

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `hyperstone-design-settings-${timestamp}.json`;

    // Return as downloadable file with no-cache headers
    const response = new NextResponse(jsonString, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
    
    logRequest(request, '/api/admin/design-settings/export', 200, Date.now() - startTime);
    return response;
  } catch (error) {
    console.error('Failed to export design settings:', error);
    const response = NextResponse.json(
      {
        success: false,
        message: 'Failed to export design settings',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
    
    logRequest(request, '/api/admin/design-settings/export', 500, Date.now() - startTime);
    return response;
  }
}
