import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Обновленные настройки матчера для чистых URL без префиксов
  matcher: ['/', '/((?!api|_next|_next/image|favicon.ico|.*\\..*).*)']
};