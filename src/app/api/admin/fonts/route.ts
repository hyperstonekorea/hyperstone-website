import { NextRequest, NextResponse } from 'next/server';
import { validateAdminAccess, logRequest, RATE_LIMITS } from '@/lib/auth-middleware';
import { FONT_OPTIONS, getFontsByCategory, searchFonts } from '@/lib/design/font-options';
import { 
  createCachedResponse, 
  cacheManager, 
  CACHE_KEYS,
  CACHE_CONFIG 
} from '@/lib/design/cache';

/**
 * GET /api/admin/fonts
 * Returns available font options
 * Requirements: 1.5, Security, Performance
 * Implements long-term caching for font lists
 */
export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  // Validate admin access with rate limiting
  const accessCheck = validateAdminAccess(request, RATE_LIMITS.DEFAULT);
  if (!accessCheck.valid) {
    logRequest(request, '/api/admin/fonts', accessCheck.response!.status, Date.now() - startTime);
    return accessCheck.response;
  }

  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const query = searchParams.get('query');

    // Create cache key based on query params
    const cacheKey = query 
      ? `${CACHE_KEYS.FONT_LIST}:search:${query}`
      : category 
        ? `${CACHE_KEYS.FONT_LIST}:category:${category}`
        : CACHE_KEYS.FONT_LIST;

    // Try to get from cache first
    const cachedFonts = await cacheManager.get<{
      fonts: typeof FONT_OPTIONS;
      total: number;
    }>(cacheKey);

    if (cachedFonts) {
      const response = createCachedResponse(
        {
          ...cachedFonts,
          cached: true,
        },
        'FONT_LIST'
      );
      
      logRequest(request, '/api/admin/fonts', 200, Date.now() - startTime);
      return response;
    }

    // Cache miss - compute fonts
    let fonts = FONT_OPTIONS;

    if (category) {
      fonts = getFontsByCategory(category);
    }

    if (query) {
      fonts = searchFonts(query);
    }

    const responseData = {
      fonts,
      total: fonts.length
    };

    // Cache the result with long TTL (fonts rarely change)
    await cacheManager.set(
      cacheKey,
      responseData,
      CACHE_CONFIG.FONT_LIST.ttl
    );

    const response = createCachedResponse(
      {
        ...responseData,
        cached: false,
      },
      'FONT_LIST'
    );
    
    logRequest(request, '/api/admin/fonts', 200, Date.now() - startTime);
    return response;
  } catch (error) {
    console.error('Failed to load fonts:', error);
    const response = NextResponse.json(
      { error: 'Failed to load fonts' },
      { status: 500 }
    );
    
    logRequest(request, '/api/admin/fonts', 500, Date.now() - startTime);
    return response;
  }
}
