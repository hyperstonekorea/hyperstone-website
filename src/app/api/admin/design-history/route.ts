import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { validateAdminAccess, logRequest, RATE_LIMITS } from '@/lib/auth-middleware';
import { DesignHistoryEntry } from '@/lib/design/types';
import { 
  createCachedResponse, 
  cacheManager, 
  CACHE_KEYS,
  CACHE_CONFIG 
} from '@/lib/design/cache';

const HISTORY_KEY = 'design:history:entries';

/**
 * GET /api/admin/design-history
 * Load design history entries with pagination
 * Requirements: 1.8, Security, Performance
 * Implements caching with stale-while-revalidate
 */
export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  // Validate admin access with rate limiting
  const accessCheck = validateAdminAccess(request, RATE_LIMITS.DEFAULT);
  if (!accessCheck.valid) {
    logRequest(request, '/api/admin/design-history', accessCheck.response!.status, Date.now() - startTime);
    return accessCheck.response;
  }

  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    // Create cache key based on pagination params
    const cacheKey = `${CACHE_KEYS.HISTORY_LIST}:${limit}:${offset}`;

    // Try to get from cache first
    const cachedData = await cacheManager.get<{
      entries: DesignHistoryEntry[];
      pagination: {
        total: number;
        limit: number;
        offset: number;
        hasMore: boolean;
      };
    }>(cacheKey);

    if (cachedData) {
      const response = createCachedResponse(
        {
          ...cachedData,
          cached: true,
        },
        'HISTORY'
      );
      
      logRequest(request, '/api/admin/design-history', 200, Date.now() - startTime);
      return response;
    }

    // Cache miss - load from Vercel KV
    const allEntries = await kv.get<DesignHistoryEntry[]>(HISTORY_KEY) || [];
    
    // Sort by timestamp (newest first)
    const sortedEntries = allEntries.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    // Paginate
    const paginatedEntries = sortedEntries.slice(offset, offset + limit);
    const total = sortedEntries.length;

    const responseData = {
      entries: paginatedEntries,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    };

    // Cache the result with TTL
    await cacheManager.set(
      cacheKey,
      responseData,
      CACHE_CONFIG.HISTORY.ttl
    );

    const response = createCachedResponse(
      {
        ...responseData,
        cached: false,
      },
      'HISTORY'
    );
    
    logRequest(request, '/api/admin/design-history', 200, Date.now() - startTime);
    return response;
  } catch (error) {
    console.error('Failed to load design history:', error);
    const response = NextResponse.json(
      { error: 'Failed to load design history' },
      { status: 500 }
    );
    
    logRequest(request, '/api/admin/design-history', 500, Date.now() - startTime);
    return response;
  }
}
