import { NextRequest, NextResponse } from 'next/server';
import { validateAdminAccess, logRequest, RATE_LIMITS } from '@/lib/auth-middleware';
import { 
  createCachedResponse, 
  cacheManager, 
  CACHE_KEYS,
  CACHE_CONFIG 
} from '@/lib/design/cache';

interface GoogleFont {
  family: string;
  variants: string[];
  category: string;
}

/**
 * GET /api/admin/fonts/google/search
 * Search Google Fonts API
 * Requirements: 1.5, Security, Performance
 * Implements caching for Google Fonts API responses
 */
export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  // Validate admin access with rate limiting
  const accessCheck = validateAdminAccess(request, RATE_LIMITS.DEFAULT);
  if (!accessCheck.valid) {
    logRequest(request, '/api/admin/fonts/google/search', accessCheck.response!.status, Date.now() - startTime);
    return accessCheck.response;
  }

  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    const apiKey = process.env.GOOGLE_FONTS_API_KEY;

    if (!apiKey) {
      // Fallback: return empty results if API key not configured
      const response = NextResponse.json({
        fonts: [],
        message: 'Google Fonts API key not configured'
      });
      logRequest(request, '/api/admin/fonts/google/search', 200, Date.now() - startTime);
      return response;
    }

    // Create cache key for this search query
    const cacheKey = CACHE_KEYS.GOOGLE_FONTS_SEARCH(query);

    // Try to get from cache first
    const cachedResult = await cacheManager.get<{
      fonts: any[];
      total: number;
    }>(cacheKey);

    if (cachedResult) {
      const response = createCachedResponse(
        {
          ...cachedResult,
          cached: true,
        },
        'GOOGLE_FONTS_SEARCH'
      );
      
      logRequest(request, '/api/admin/fonts/google/search', 200, Date.now() - startTime);
      return response;
    }

    // Cache miss - fetch from Google Fonts API
    const response = await fetch(
      `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}&sort=popularity`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from Google Fonts API');
    }

    const data = await response.json();
    let fonts: GoogleFont[] = data.items || [];

    // Filter by query if provided
    if (query) {
      const lowerQuery = query.toLowerCase();
      fonts = fonts.filter((font: GoogleFont) =>
        font.family.toLowerCase().includes(lowerQuery)
      );
    }

    // Limit to top 50 results
    fonts = fonts.slice(0, 50);

    // Transform to our format
    const transformedFonts = fonts.map((font: GoogleFont) => ({
      family: font.family,
      source: 'google' as const,
      weights: font.variants
        .filter((v: string) => !v.includes('italic'))
        .map((v: string) => (v === 'regular' ? 400 : parseInt(v, 10)))
        .filter((w: number) => !isNaN(w)),
      category: font.category,
      preview: 'The quick brown fox jumps over the lazy dog'
    }));

    const resultData = {
      fonts: transformedFonts,
      total: transformedFonts.length
    };

    // Cache the result
    await cacheManager.set(
      cacheKey,
      resultData,
      CACHE_CONFIG.GOOGLE_FONTS_SEARCH.ttl
    );

    const result = createCachedResponse(
      {
        ...resultData,
        cached: false,
      },
      'GOOGLE_FONTS_SEARCH'
    );
    
    logRequest(request, '/api/admin/fonts/google/search', 200, Date.now() - startTime);
    return result;
  } catch (error) {
    console.error('Failed to search Google Fonts:', error);
    const response = NextResponse.json(
      { error: 'Failed to search Google Fonts', fonts: [] },
      { status: 500 }
    );
    
    logRequest(request, '/api/admin/fonts/google/search', 500, Date.now() - startTime);
    return response;
  }
}
