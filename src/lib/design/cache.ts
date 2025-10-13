/**
 * Caching Strategy for Design System
 * Requirements: Performance
 * 
 * Implements comprehensive caching with:
 * - Cache headers for GET endpoints
 * - Cache invalidation on updates
 * - Vercel KV TTL settings
 * - Stale-while-revalidate strategy
 */

import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

/**
 * Cache configuration for different resource types
 */
export const CACHE_CONFIG = {
  // Design settings: Short TTL with stale-while-revalidate
  DESIGN_SETTINGS: {
    ttl: 60, // 1 minute
    staleWhileRevalidate: 300, // 5 minutes
    cacheControl: 'public, s-maxage=60, stale-while-revalidate=300',
  },
  
  // Font list: Long TTL (fonts rarely change)
  FONT_LIST: {
    ttl: 86400, // 24 hours
    staleWhileRevalidate: 604800, // 7 days
    cacheControl: 'public, max-age=86400, stale-while-revalidate=604800',
  },
  
  // Design history: Medium TTL
  HISTORY: {
    ttl: 300, // 5 minutes
    staleWhileRevalidate: 3600, // 1 hour
    cacheControl: 'private, max-age=300, stale-while-revalidate=3600',
  },
  
  // Preview: No cache (always fresh)
  PREVIEW: {
    ttl: 0,
    staleWhileRevalidate: 0,
    cacheControl: 'no-cache, no-store, must-revalidate',
  },
  
  // Google Fonts search: Medium TTL
  GOOGLE_FONTS_SEARCH: {
    ttl: 3600, // 1 hour
    staleWhileRevalidate: 86400, // 24 hours
    cacheControl: 'public, max-age=3600, stale-while-revalidate=86400',
  },
} as const;

/**
 * Cache keys for invalidation
 */
export const CACHE_KEYS = {
  DESIGN_SETTINGS: 'cache:design:settings',
  DESIGN_SETTINGS_VERSION: 'cache:design:settings:version',
  FONT_LIST: 'cache:fonts:list',
  HISTORY_LIST: 'cache:history:list',
  GOOGLE_FONTS_SEARCH: (query: string) => `cache:fonts:google:${query}`,
} as const;

/**
 * Create a cached response with appropriate headers
 */
export function createCachedResponse<T>(
  data: T,
  cacheType: keyof typeof CACHE_CONFIG,
  status: number = 200
): NextResponse {
  const config = CACHE_CONFIG[cacheType];
  
  return NextResponse.json(data, {
    status,
    headers: {
      'Cache-Control': config.cacheControl,
      'CDN-Cache-Control': config.cacheControl,
      'Vercel-CDN-Cache-Control': config.cacheControl,
    },
  });
}

/**
 * Create a no-cache response (for mutations)
 */
export function createNoCacheResponse<T>(
  data: T,
  status: number = 200
): NextResponse {
  return NextResponse.json(data, {
    status,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
}

/**
 * Cache manager for Vercel KV with TTL
 */
export class CacheManager {
  /**
   * Get cached data with TTL check
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await kv.get<T>(key);
      return data;
    } catch (error) {
      console.error(`Cache get error for key ${key}:`, error);
      return null;
    }
  }

  /**
   * Set cached data with TTL
   */
  async set<T>(
    key: string,
    value: T,
    ttlSeconds?: number
  ): Promise<void> {
    try {
      if (ttlSeconds && ttlSeconds > 0) {
        await kv.set(key, value, { ex: ttlSeconds });
      } else {
        await kv.set(key, value);
      }
    } catch (error) {
      console.error(`Cache set error for key ${key}:`, error);
      // Don't throw - caching is not critical
    }
  }

  /**
   * Delete cached data
   */
  async delete(key: string): Promise<void> {
    try {
      await kv.del(key);
    } catch (error) {
      console.error(`Cache delete error for key ${key}:`, error);
      // Don't throw - cache invalidation failure is not critical
    }
  }

  /**
   * Delete multiple cached keys
   */
  async deleteMany(keys: string[]): Promise<void> {
    try {
      if (keys.length === 0) return;
      await kv.del(...keys);
    } catch (error) {
      console.error(`Cache delete many error:`, error);
      // Don't throw - cache invalidation failure is not critical
    }
  }

  /**
   * Invalidate all design-related caches
   */
  async invalidateDesignCaches(): Promise<void> {
    const keysToInvalidate = [
      CACHE_KEYS.DESIGN_SETTINGS,
      CACHE_KEYS.DESIGN_SETTINGS_VERSION,
      CACHE_KEYS.HISTORY_LIST,
    ];

    await this.deleteMany(keysToInvalidate);
    console.log('Design caches invalidated');
  }

  /**
   * Invalidate font caches
   */
  async invalidateFontCaches(): Promise<void> {
    await this.delete(CACHE_KEYS.FONT_LIST);
    console.log('Font caches invalidated');
  }

  /**
   * Get or set cached data with TTL
   */
  async getOrSet<T>(
    key: string,
    factory: () => Promise<T>,
    ttlSeconds?: number
  ): Promise<T> {
    // Try to get from cache
    const cached = await this.get<T>(key);
    if (cached !== null) {
      return cached;
    }

    // Generate fresh data
    const fresh = await factory();

    // Cache it
    await this.set(key, fresh, ttlSeconds);

    return fresh;
  }

  /**
   * Increment cache version (for cache busting)
   */
  async incrementVersion(key: string): Promise<number> {
    try {
      const version = await kv.incr(key);
      return version;
    } catch (error) {
      console.error(`Cache version increment error for key ${key}:`, error);
      return Date.now(); // Fallback to timestamp
    }
  }

  /**
   * Get current cache version
   */
  async getVersion(key: string): Promise<number> {
    try {
      const version = await kv.get<number>(key);
      return version || 0;
    } catch (error) {
      console.error(`Cache version get error for key ${key}:`, error);
      return 0;
    }
  }
}

// Export singleton instance
export const cacheManager = new CacheManager();

/**
 * Helper to add cache version to response
 */
export async function addCacheVersion(
  response: NextResponse,
  versionKey: string
): Promise<NextResponse> {
  try {
    const version = await cacheManager.getVersion(versionKey);
    response.headers.set('X-Cache-Version', version.toString());
    return response;
  } catch (error) {
    console.error('Failed to add cache version:', error);
    return response;
  }
}

/**
 * Middleware helper to check cache freshness
 */
export function isCacheFresh(
  lastModified: string,
  ifModifiedSince?: string
): boolean {
  if (!ifModifiedSince) return false;

  try {
    const lastModifiedTime = new Date(lastModified).getTime();
    const ifModifiedSinceTime = new Date(ifModifiedSince).getTime();
    
    return lastModifiedTime <= ifModifiedSinceTime;
  } catch (error) {
    return false;
  }
}

/**
 * Create 304 Not Modified response
 */
export function createNotModifiedResponse(): NextResponse {
  return new NextResponse(null, {
    status: 304,
    headers: {
      'Cache-Control': 'public, max-age=60',
    },
  });
}
