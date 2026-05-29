import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig = {
  // твои настройки Next.js, если есть
};

export default withNextIntl(nextConfig);