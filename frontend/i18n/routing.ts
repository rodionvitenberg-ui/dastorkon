import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['ru', 'en', 'ky'], // заменяем kg на ky
  defaultLocale: 'ru'
});

export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);