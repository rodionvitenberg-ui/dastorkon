import './globals.css';
import { Nunito_Sans } from 'next/font/google';
import NotFoundComponent from '@/components/ui/not-found';

const sansFont = Nunito_Sans({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
  weight: ['400', '600', '700', '800', '900'],
});

export default function RootNotFound() {
  return (
    <html lang="ru" className="scroll-smooth">
      <body
        className={`${sansFont.variable} antialiased min-h-screen flex flex-col`}
      >
        <NotFoundComponent />
      </body>
    </html>
  );
}
