import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['ru', 'en', 'ky'],
  defaultLocale: 'ru',
  localePrefix: 'never'
});

export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);