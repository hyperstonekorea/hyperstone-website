// Temporarily disabled middleware to test routing
// import createMiddleware from 'next-intl/middleware';

// export default createMiddleware({
//   // A list of all locales that are supported
//   locales: ['ko', 'en'],

//   // Used when no locale matches
//   defaultLocale: 'ko'
// });

// Dummy middleware that does nothing
export default function middleware() {
  // Do nothing - let Next.js handle routing normally
}

export const config = {
  // Match nothing for now
  matcher: []
};