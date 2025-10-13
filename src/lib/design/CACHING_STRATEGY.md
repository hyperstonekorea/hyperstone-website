# Design System Caching Strategy

## Overview

The design system implements a comprehensive caching strategy to optimize performance while ensuring data freshness. This document describes the caching implementation, configuration, and best practices.

## Cache Configuration

### Cache Types and TTL Settings

| Resource Type | TTL | Stale-While-Revalidate | Cache-Control Header |
|--------------|-----|------------------------|---------------------|
| Design Settings | 60s | 300s (5 min) | `public, s-maxage=60, stale-while-revalidate=300` |
| Font List | 24h | 7 days | `public, max-age=86400, stale-while-revalidate=604800` |
| Design History | 5 min | 1 hour | `private, max-age=300, stale-while-revalidate=3600` |
| Google Fonts Search | 1 hour | 24 hours | `public, max-age=3600, stale-while-revalidate=86400` |
| Preview | No cache | No cache | `no-cache, no-store, must-revalidate` |

### Rationale

- **Design Settings**: Short TTL (1 minute) with stale-while-revalidate ensures quick updates while allowing stale content during revalidation
- **Font List**: Long TTL (24 hours) because fonts rarely change
- **Design History**: Medium TTL (5 minutes) balances freshness with performance
- **Google Fonts Search**: Cached for 1 hour to reduce API calls to Google
- **Preview**: Never cached to ensure real-time preview accuracy

## Cache Keys

All cache keys are defined in `src/lib/design/cache.ts`:

```typescript
export const CACHE_KEYS = {
  DESIGN_SETTINGS: 'cache:design:settings',
  DESIGN_SETTINGS_VERSION: 'cache:design:settings:version',
  FONT_LIST: 'cache:fonts:list',
  HISTORY_LIST: 'cache:history:list',
  GOOGLE_FONTS_SEARCH: (query: string) => `cache:fonts:google:${query}`,
}
```

## Cache Invalidation

### Automatic Invalidation

Caches are automatically invalidated when:

1. **Design settings are saved** (PUT `/api/admin/design-settings`)
   - Invalidates: `DESIGN_SETTINGS`, `DESIGN_SETTINGS_VERSION`, `HISTORY_LIST`
   - Increments cache version for cache busting

2. **Design settings are imported** (POST `/api/admin/design-settings/import`)
   - Invalidates: `DESIGN_SETTINGS`, `DESIGN_SETTINGS_VERSION`, `HISTORY_LIST`
   - Increments cache version for cache busting

3. **Rollback is performed** (POST `/api/admin/design-history/rollback`)
   - Invalidates: `DESIGN_SETTINGS`, `DESIGN_SETTINGS_VERSION`, `HISTORY_LIST`
   - Increments cache version for cache busting

### Manual Invalidation

Use the `CacheManager` class to manually invalidate caches:

```typescript
import { cacheManager } from '@/lib/design/cache';

// Invalidate all design caches
await cacheManager.invalidateDesignCaches();

// Invalidate font caches
await cacheManager.invalidateFontCaches();

// Invalidate specific cache key
await cacheManager.delete('cache:design:settings');
```

## Cache Versioning

The system uses cache versioning for cache busting:

- Each time settings are updated, the `DESIGN_SETTINGS_VERSION` is incremented
- The version is included in response headers as `X-Cache-Version`
- Clients can use this version to detect stale caches

## Conditional Requests

The system supports conditional requests using `If-Modified-Since` headers:

1. Client sends `If-Modified-Since` header with last known modification time
2. Server compares with `lastUpdated` timestamp in settings
3. If not modified, server returns `304 Not Modified` response
4. If modified, server returns full response with `Last-Modified` header

Example:

```typescript
// Client request
fetch('/api/admin/design-settings', {
  headers: {
    'If-Modified-Since': 'Wed, 21 Oct 2024 07:28:00 GMT'
  }
})

// Server response (if not modified)
// Status: 304 Not Modified
// Headers: Cache-Control: public, max-age=60
```

## Stale-While-Revalidate Strategy

The system implements the `stale-while-revalidate` caching strategy:

1. **Fresh**: Content is served from cache if within TTL
2. **Stale**: Content is served from cache while revalidating in background
3. **Expired**: Content is fetched fresh and cached

Benefits:
- Improved perceived performance (instant responses)
- Reduced server load (background revalidation)
- Better user experience (no loading delays)

## Cache Storage

### Vercel KV

All caches are stored in Vercel KV with TTL:

```typescript
// Set with TTL
await kv.set('cache:design:settings', settings, { ex: 60 });

// Get
const settings = await kv.get('cache:design:settings');

// Delete
await kv.del('cache:design:settings');
```

### CDN Caching

Response headers are configured for CDN caching:

```typescript
headers: {
  'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
  'CDN-Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
  'Vercel-CDN-Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
}
```

## API Endpoints and Caching

### GET Endpoints (Cached)

| Endpoint | Cache Type | TTL |
|----------|-----------|-----|
| `GET /api/admin/design-settings` | DESIGN_SETTINGS | 60s |
| `GET /api/admin/design-history` | HISTORY | 300s |
| `GET /api/admin/fonts` | FONT_LIST | 86400s |
| `GET /api/admin/fonts/google/search` | GOOGLE_FONTS_SEARCH | 3600s |

### POST/PUT Endpoints (No Cache)

| Endpoint | Cache Invalidation |
|----------|-------------------|
| `PUT /api/admin/design-settings` | Invalidates all design caches |
| `POST /api/admin/design-settings/import` | Invalidates all design caches |
| `POST /api/admin/design-settings/export` | No caching |
| `POST /api/admin/design-history/rollback` | Invalidates all design caches |
| `GET/POST /api/admin/design-preview` | No caching |

## Performance Monitoring

### Cache Hit Rate

Monitor cache effectiveness:

```typescript
// Response includes cache status
{
  "success": true,
  "data": {...},
  "cached": true  // Indicates cache hit
}
```

### Cache Version Tracking

Track cache versions in response headers:

```
X-Cache-Version: 42
```

## Best Practices

### For Developers

1. **Always use cache utilities**: Use `createCachedResponse()` and `createNoCacheResponse()` helpers
2. **Invalidate on mutations**: Always invalidate caches after data changes
3. **Use appropriate TTL**: Choose TTL based on data volatility
4. **Test cache behavior**: Verify cache headers and invalidation logic

### For API Consumers

1. **Use If-Modified-Since**: Send conditional requests to reduce bandwidth
2. **Respect cache headers**: Honor `Cache-Control` directives
3. **Handle 304 responses**: Properly handle `Not Modified` responses
4. **Check cache version**: Use `X-Cache-Version` header to detect updates

## Troubleshooting

### Cache Not Invalidating

1. Check if `cacheManager.invalidateDesignCaches()` is called after mutations
2. Verify Vercel KV connection and credentials
3. Check cache version is incrementing

### Stale Data Served

1. Verify TTL settings in `CACHE_CONFIG`
2. Check if cache invalidation is working
3. Ensure `lastUpdated` timestamp is being updated

### Performance Issues

1. Monitor cache hit rates (check `cached` field in responses)
2. Adjust TTL values if needed
3. Consider adding more cache layers (e.g., browser cache)

## Future Enhancements

1. **Cache warming**: Pre-populate caches on deployment
2. **Cache analytics**: Track cache hit rates and performance metrics
3. **Distributed caching**: Add Redis or similar for multi-region caching
4. **Smart invalidation**: Invalidate only affected cache keys
5. **Cache compression**: Compress cached data to reduce storage

## References

- [HTTP Caching - MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)
- [Vercel KV Documentation](https://vercel.com/docs/storage/vercel-kv)
- [Stale-While-Revalidate RFC](https://tools.ietf.org/html/rfc5861)
