import { NextRequest } from 'next/server';

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
 * Create an unauthorized response
 */
export function createUnauthorizedResponse() {
  return new Response(
    JSON.stringify({ 
      success: false, 
      message: '인증이 필요합니다.' 
    }),
    { 
      status: 401,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}