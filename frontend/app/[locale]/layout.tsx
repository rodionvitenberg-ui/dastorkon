import type { Metadata } from "next";
import { Montserrat, Cinzel } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";
import { routing } from "../../i18n/routing";
import { Locale } from "../../i18n-config";

// 1. Импортируем наши глобальные компоненты
import Hero from "../../components/home/Hero";
import Footer from "../../components/home/Footer";

const sansFont = Montserrat({ 
  subsets: ["latin", "cyrillic"], 
  variable: "--font-sans" 
});

const serifFont = Cinzel({ 
  subsets: ["latin"], 
  weight: ["400", "700"], 
  variable: "--font-serif" 
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
      {/* min-h-screen и flex flex-col гарантируют, что футер будет прижат к низу */}
      <body className={`${sansFont.variable} ${serifFont.variable} antialiased min-h-screen flex flex-col`}>
        <NextIntlClientProvider messages={messages}>
          
          {/* 2. Глобальная шапка */}
          <Hero /> 
          
          {/* 3. Контейнер для страниц, который занимает всё свободное место (flex-grow) */}
          <div className="flex-grow flex flex-col w-full relative">
            {children}
          </div>

          {/* 4. Глобальный подвал */}
          <Footer /> 

        </NextIntlClientProvider>
      </body>
    </html>
  );
}