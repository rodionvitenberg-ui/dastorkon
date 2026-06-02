import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Настройки матчера для чистых URL
  matcher: ['/', '/(ru|en|ky)/:path*', '/((?!api|_next|_next/image|favicon.ico|.*\\..*).*)']
};