import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import { routing } from "../../i18n/routing";

// Автоматический синхронизатор швов
import OrnamentSyncer from "../../components/ui/OrnamentSyncer";
import { AppShellProvider } from "../../components/ui/AppShellContext";

// Глобальные компоненты
import Header from "../../components/home/Header";
import Footer from "../../components/home/Footer";
import CartDrawerWrapper from "../../components/cart/CartDrawerWrapper";
import CookieConsent from "../../components/ui/CookieConsent";

const sansFont = Nunito_Sans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  weight: ["400", "600", "700", "800", "900"]
});


export const metadata: Metadata = {
  title: "Dastorkon Etno-Cafe",
  description: "Authentic Central Asian Cuisine",
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const resolvedParams = await params;

  if (!hasLocale(routing.locales, resolvedParams.locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={resolvedParams.locale} className="scroll-smooth">
      <head>
        {/* Preload heading font (critical for hero H1) without blocking Maps */}
        <link
          rel="preload"
          href="/fonts/Skiff-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`
          ${sansFont.variable}
          antialiased
          min-h-screen
          flex flex-col
        `}
      >
        <NextIntlClientProvider messages={messages}>
          
          {/* Наш невидимый хелпер, который склеит швы между компонентами */}
          <OrnamentSyncer />
          
          <AppShellProvider>
          <div className="w-full min-h-screen flex flex-col relative overflow-x-clip">
            
            {/* Глобальная шапка */}
            <Header />

            {/* Контейнер страниц */}
            <div className="flex-grow flex flex-col w-full relative">
              {children}
            </div>

            {/* Глобальный подвал (ему внутри файла задан класс ornament-burgundy) */}
            <Footer />

            {/* Корзина (slide-out) */}
            <CartDrawerWrapper />

            {/* Cookie consent */}
            <CookieConsent />
            
          </div>
          </AppShellProvider>

        </NextIntlClientProvider>
      </body>
    </html>
  );
}