import { NextRequest, NextResponse } from 'next/server';

/**
 * Rate limiting configuration for different API endpoints
 */
export const RATE_LIMITS = {
  SAVE_SETTINGS: { requests: 10, window: 60 }, // 10 per minute
  UPLOAD_IMAGE: { requests: 5, window: 60 }, // 5 per minute
  EXPORT: { requests: 3, window: 60 }, // 3 per minute
  DEFAULT: { requests: 30, window: 60 }, // 30 per minute for other endpoints
};

/**
 * In-memory rate limit store
 * In production, use Redis or similar distributed cache
 */
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Clean up expired rate limit entries periodically
 */
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
}, 60000); // Clean up every minute

/**
 * Simple authentication middleware for admin routes
 * Checks for valid admin session token
 */
export function verifyAdminAuth(request: NextRequest): boolean {
  try {
    // Check for session cookie
    const sessionCookie = request.cookies.get('admin-session');
    
    if (!sessionCookie) {
      return false;
    }

    // Simple token validation (in production, use proper JWT validation)
    const token = sessionCookie.value;
    
    if (!token) {
      return false;
    }

    // Decode the simple token
    try {
      const decoded = Buffer.from(token, 'base64').toString('utf-8');
      const [prefix, timestamp] = decoded.split(':');
      
      if (prefix !== 'admin') {
        return false;
      }

      // Check if token is not older than 24 hours
      const tokenTime = parseInt(timestamp);
      const now = Date.now();
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      
      if (now - tokenTime > maxAge) {
        return false;
      }

      return true;
    } catch (error) {
      console.error('Token decode error:', error);
      return false;
    }
  } catch (error) {
    console.error('Auth verification error:', error);
    return false;
  }
}

/**
 * Rate limiting middleware
 * Returns true if request is within rate limit, false otherwise
 */
export function checkRateLimit(
  identifier: string,
  limit: { requests: number; window: number } = RATE_LIMITS.DEFAULT
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const key = identifier;
  
  let entry = rateLimitStore.get(key);
  
  // Create new entry if doesn't exist or expired
  if (!entry || entry.resetTime < now) {
    entry = {
      count: 0,
      resetTime: now + limit.window * 1000,
    };
    rateLimitStore.set(key, entry);
  }
  
  // Increment count
  entry.count++;
  
  const allowed = entry.count <= limit.requests;
  const remaining = Math.max(0, limit.requests - entry.count);
  
  return {
    allowed,
    remaining,
    resetTime: entry.resetTime,
  };
}

/**
 * Get client identifier for rate limiting
 * Uses IP address or session token
 */
export function getClientIdentifier(request: NextRequest): string {
  // Try to get IP address
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
  
  // Combine with session token for more granular rate limiting
  const sessionCookie = request.cookies.get('admin-session');
  const sessionId = sessionCookie?.value ? sessionCookie.value.substring(0, 10) : 'anonymous';
  
  return `${ip}:${sessionId}`;
}

/**
 * Log API request for monitoring and debugging
 */
export function logRequest(
  request: NextRequest,
  endpoint: string,
  status: number,
  duration?: number
): void {
  const timestamp = new Date().toISOString();
  const method = request.method;
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  
  const logEntry = {
    timestamp,
    endpoint,
    method,
    status,
    ip,
    userAgent,
    duration: duration ? `${duration}ms` : undefined,
  };
  
  // In production, send to logging service (e.g., Vercel Analytics, Datadog, etc.)
  console.log('[API Request]', JSON.stringify(logEntry));
}

/**
 * Create an unauthorized response
 */
export function createUnauthorizedResponse() {
  return NextResponse.json(
    { 
      success: false, 
      message: '인증이 필요합니다.' 
    },
    { 
      status: 401,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}

/**
 * Create a rate limit exceeded response
 */
export function createRateLimitResponse(resetTime: number) {
  const retryAfter = Math.ceil((resetTime - Date.now()) / 1000);
  
  return NextResponse.json(
    {
      success: false,
      message: '요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.',
      retryAfter,
    },
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': retryAfter.toString(),
        'X-RateLimit-Reset': new Date(resetTime).toISOString(),
      },
    }
  );
}

/**
 * Validate admin access with rate limiting
 * Combines authentication and rate limiting checks
 */
export function validateAdminAccess(
  request: NextRequest,
  rateLimit: { requests: number; window: number } = RATE_LIMITS.DEFAULT
): { valid: boolean; response?: NextResponse } {
  // Check authentication first
  if (!verifyAdminAuth(request)) {
    return {
      valid: false,
      response: createUnauthorizedResponse(),
    };
  }
  
  // Check rate limit
  const identifier = getClientIdentifier(request);
  const rateLimitResult = checkRateLimit(identifier, rateLimit);
  
  if (!rateLimitResult.allowed) {
    return {
      valid: false,
      response: createRateLimitResponse(rateLimitResult.resetTime),
    };
  }
  
  return { valid: true };
}