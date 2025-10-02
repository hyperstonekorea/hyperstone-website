import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['ko', 'en'],

  // Used when no locale matches
  defaultLocale: 'ko',
  
  // Always use locale prefix
  localePrefix: 'always'
});

export const config = {
  // Match all pathnames except for
  // - /api (API routes)
  // - /_next (Next.js internals)
  // - /_vercel (Vercel internals)
  // - /images, /uploads (static files)
  matcher: ['/((?!api|_next|_vercel|images|uploads|.*\\..*).*)']
};