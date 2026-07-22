import { notFound } from 'next/navigation';

/**
 * Catch-all for unknown routes under [locale].
 * Required by next-intl so that unknown URLs render app/[locale]/not-found.tsx
 * (with the locale layout) instead of the bare root not-found.
 * @see https://next-intl.dev/docs/environments/error-files
 */
export default function CatchAllPage() {
  notFound();
}
