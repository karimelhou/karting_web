import createMiddleware from 'next-intl/middleware';

import { defaultLocale, locales } from './lib/i18n/request';

export default createMiddleware({
  defaultLocale,
  locales,
  localePrefix: 'always',
});

export const config = {
  matcher: ['/', '/(fr|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
