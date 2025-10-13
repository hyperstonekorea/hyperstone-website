# Authentication Middleware for Design APIs

## Overview

This document describes the authentication, rate limiting, and request logging middleware implemented for the HYPERSTONE admin design system APIs.

## Features

### 1. Authentication (`verifyAdminAuth`)

Validates admin session tokens from HTTP-only cookies:
- Checks for `admin-session` cookie
- Decodes and validates token format
- Verifies token age (24-hour expiration)
- Returns boolean indicating authentication status

### 2. Rate Limiting (`checkRateLimit`)

Protects APIs from abuse with configurable rate limits:
- In-memory rate limit tracking (use Redis in production)
- Automatic cleanup of expired entries
- Returns allowed status, remaining requests, and reset time
- Different limits for different endpoint types

#### Rate Limit Configuration

```typescript
RATE_LIMITS = {
  SAVE_SETTINGS: { requests: 10, window: 60 },    // 10 per minute
  UPLOAD_IMAGE: { requests: 5, window: 60 },      // 5 per minute
  EXPORT: { requests: 3, window: 60 },            // 3 per minute
  DEFAULT: { requests: 30, window: 60 },          // 30 per minute
}
```

### 3. Request Logging (`logRequest`)

Logs all API requests for monitoring and debugging:
- Timestamp
- Endpoint path
- HTTP method
- Status code
- Client IP address
- User agent
- Request duration

Logs are output to console and can be integrated with logging services like Vercel Analytics, Datadog, etc.

### 4. Combined Validation (`validateAdminAccess`)

Convenience function that combines authentication and rate limiting:
- Checks authentication first
- Then checks rate limit
- Returns validation result with appropriate error response if needed

## Usage

### Basic Authentication Only

```typescript
import { verifyAdminAuth, createUnauthorizedResponse } from '@/lib/auth-middleware';

export async function GET(request: NextRequest) {
  if (!verifyAdminAuth(request)) {
    return createUnauthorizedResponse();
  }
  
  // Handle authenticated request
}
```

### Authentication + Rate Limiting + Logging

```typescript
import { validateAdminAccess, logRequest, RATE_LIMITS } from '@/lib/auth-middleware';

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  // Validate with custom rate limit
  const accessCheck = validateAdminAccess(request, RATE_LIMITS.SAVE_SETTINGS);
  if (!accessCheck.valid) {
    logRequest(request, '/api/admin/endpoint', accessCheck.response!.status, Date.now() - startTime);
    return accessCheck.response;
  }
  
  try {
    // Handle request
    const response = NextResponse.json({ success: true });
    logRequest(request, '/api/admin/endpoint', 200, Date.now() - startTime);
    return response;
  } catch (error) {
    const response = NextResponse.json({ error: 'Failed' }, { status: 500 });
    logRequest(request, '/api/admin/endpoint', 500, Date.now() - startTime);
    return response;
  }
}
```

## Protected Endpoints

All design system API endpoints are now protected:

### Design Settings
- `GET /api/admin/design-settings` - Load settings (DEFAULT rate limit)
- `PUT /api/admin/design-settings` - Save settings (SAVE_SETTINGS rate limit)
- `POST /api/admin/design-settings/export` - Export settings (EXPORT rate limit)
- `POST /api/admin/design-settings/import` - Import settings (SAVE_SETTINGS rate limit)

### Design History
- `GET /api/admin/design-history` - Load history (DEFAULT rate limit)
- `POST /api/admin/design-history/rollback` - Rollback to version (SAVE_SETTINGS rate limit)

### Fonts
- `GET /api/admin/fonts` - List fonts (DEFAULT rate limit)
- `GET /api/admin/fonts/google/search` - Search Google Fonts (DEFAULT rate limit)

### Preview
- `GET /api/admin/design-preview` - Preview settings (DEFAULT rate limit)
- `POST /api/admin/design-preview` - Preview settings (DEFAULT rate limit)

### Upload
- `POST /api/admin/upload` - Upload images (UPLOAD_IMAGE rate limit)

## Response Formats

### Unauthorized (401)
```json
{
  "success": false,
  "message": "인증이 필요합니다."
}
```

### Rate Limit Exceeded (429)
```json
{
  "success": false,
  "message": "요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.",
  "retryAfter": 45
}
```

Headers:
- `Retry-After`: Seconds until rate limit resets
- `X-RateLimit-Reset`: ISO timestamp of reset time

## Security Considerations

### Current Implementation
- Simple token-based authentication
- In-memory rate limiting
- Console-based logging

### Production Recommendations

1. **Authentication**
   - Implement JWT with proper signing
   - Use secure token storage
   - Add token refresh mechanism
   - Implement role-based access control (RBAC)

2. **Rate Limiting**
   - Use Redis or similar distributed cache
   - Implement sliding window algorithm
   - Add IP-based blocking for repeated violations
   - Configure different limits per user role

3. **Logging**
   - Integrate with centralized logging service
   - Add structured logging with correlation IDs
   - Implement log aggregation and analysis
   - Set up alerts for suspicious activity

4. **Additional Security**
   - Add CSRF protection
   - Implement request signing
   - Add API key authentication for service-to-service calls
   - Enable HTTPS-only in production
   - Add security headers (CSP, HSTS, etc.)

## Monitoring

### Key Metrics to Track

1. **Authentication Failures**
   - Failed login attempts
   - Expired token usage
   - Invalid token formats

2. **Rate Limit Violations**
   - Endpoints hitting limits
   - Repeat offenders
   - Time patterns

3. **API Performance**
   - Request duration
   - Error rates
   - Endpoint usage patterns

### Log Analysis

Search logs for patterns:
```bash
# Find rate limit violations
grep "429" api-logs.json

# Find authentication failures
grep "401" api-logs.json

# Find slow requests (>1000ms)
grep "duration.*[0-9]{4,}ms" api-logs.json
```

## Testing

### Test Authentication
```bash
# Without auth (should fail)
curl -X GET http://localhost:3000/api/admin/design-settings

# With auth cookie
curl -X GET http://localhost:3000/api/admin/design-settings \
  -H "Cookie: admin-session=YOUR_TOKEN"
```

### Test Rate Limiting
```bash
# Send multiple requests quickly
for i in {1..35}; do
  curl -X GET http://localhost:3000/api/admin/design-settings \
    -H "Cookie: admin-session=YOUR_TOKEN"
done
# Should see 429 after 30 requests
```

## Troubleshooting

### Issue: Rate limits too strict
**Solution**: Adjust `RATE_LIMITS` configuration in `auth-middleware.ts`

### Issue: Tokens expiring too quickly
**Solution**: Adjust `maxAge` in `verifyAdminAuth` function

### Issue: Rate limit not resetting
**Solution**: Check cleanup interval in `setInterval` (currently 60 seconds)

### Issue: Logs not appearing
**Solution**: Check console output or configure external logging service

## Future Enhancements

1. **Distributed Rate Limiting**: Use Redis for multi-instance deployments
2. **Advanced Analytics**: Track user behavior and API usage patterns
3. **Automated Blocking**: Automatically block IPs with suspicious activity
4. **Audit Trail**: Detailed audit logs for compliance
5. **API Versioning**: Support multiple API versions with different rate limits
6. **Webhook Notifications**: Alert admins of security events
7. **Performance Optimization**: Cache authentication results
8. **Custom Rate Limits**: Per-user or per-role rate limits
