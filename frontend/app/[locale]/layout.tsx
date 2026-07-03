import type { Metadata } from "next";
import { Nunito_Sans, Tenor_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";
import { routing } from "../../i18n/routing";
import { Locale } from "../../i18n-config";

// Глобальные компоненты
import Hero from "../../components/home/Hero";
import Footer from "../../components/home/Footer";

// 🔥 Мягкий, округлый, премиальный sans-serif
const sansFont = Nunito_Sans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  weight: ["400", "600", "700", "800", "900"]
});

// 🔥 Строгий этно‑премиальный заголовочный шрифт
const serifFont = Tenor_Sans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-serif",
  weight: ["400"]
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
  params: Promise<{ locale: Locale }>;
};

export default async function RootLayout({ children, params }: Props) {
  const resolvedParams = await params;
  const messages = await getMessages();

  return (
    <html lang={resolvedParams.locale} className="scroll-smooth">
      <body
        className={`
          ${sansFont.variable}
          ${serifFont.variable}
          antialiased
          min-h-screen
          flex flex-col
        `}
      >
        <NextIntlClientProvider messages={messages}>
          
          {/* Глобальная шапка */}
          <Hero />

          {/* Контейнер страниц */}
          <div className="flex-grow flex flex-col w-full relative">
            {children}
          </div>

          {/* Глобальный подвал */}
          <Footer />

        </NextIntlClientProvider>
      </body>
    </html>
  );
}
