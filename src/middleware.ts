import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['ko', 'en'],

  // Used when no locale matches
  defaultLocale: 'ko',
  
  // Always use locale prefix
  localePrefix: 'always'
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Handle admin routes specially - exclude from locale routing
  if (pathname.startsWith('/admin') || pathname.startsWith('/adminLogin')) {
    return NextResponse.next();
  }
  
  // Redirect locale-prefixed admin URLs to non-prefixed versions
  // Match /ko/admin or /en/admin (with optional trailing content like /dashboard)
  // Match /ko/adminLogin or /en/adminLogin (with optional trailing content)
  // Use word boundary to ensure exact match (not /administrator or /adminLoginPage)
  if (pathname.match(/^\/(ko|en)\/(admin|adminLogin)($|\/)/)) {
    const newPath = pathname.replace(/^\/(ko|en)\//, '/');
    return NextResponse.redirect(new URL(newPath, request.url));
  }
  
  // Apply intl middleware for all other routes
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - /api (API routes)
  // - /_next (Next.js internals)
  // - /_vercel (Vercel internals)
  // - /images, /uploads (static files)
  matcher: ['/((?!api|_next|_vercel|images|uploads|.*\\..*).*)']
};