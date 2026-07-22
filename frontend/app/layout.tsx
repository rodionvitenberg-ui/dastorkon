import type { ReactNode } from 'react';
import './globals.css';

type Props = {
  children: ReactNode;
};

/**
 * Root layout required when app/not-found.tsx exists.
 * Locale-specific <html>/<body> live in app/[locale]/layout.tsx.
 * @see https://next-intl.dev/docs/environments/error-files
 */
export default function RootLayout({ children }: Props) {
  return children;
}
