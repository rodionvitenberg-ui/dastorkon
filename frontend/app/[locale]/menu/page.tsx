// app/[locale]/menu/page.tsx
import Image from "next/image";
import { getCategories } from "@/lib/api";
import OrnamentLines from "@/components/ui/OrnamentLines";
import MenuClient from "@/components/menu/MenuClient";
import MenuSwitcher from "@/components/menu/MenuSwitcher";

export default async function MenuPage(props: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await props.params;
  const sp = await props.searchParams;

  const categories = await getCategories(locale);
  const variant = (typeof sp.variant === "string" ? sp.variant : "A") as "A" | "D";

  const errorMessages: Record<string, string> = {
    ru: "Меню временно недоступно",
    en: "Menu is temporarily unavailable",
    ky: "Меню учурда жеткиликсиз",
  };

  if (!Array.isArray(categories) || categories.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-xl font-medium text-brand-dark/80 font-sans">
            {errorMessages[locale] || errorMessages.ru}
          </h2>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center pt-24 pb-10 sm:pb-14">
      <OrnamentLines type="parchment" />

      {/* Пергаментный фон */}
      <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none">
        <Image
          src="/parchment-bg.jpg"
          alt="Parchment Background"
          fill
          className="object-cover mix-blend-multiply opacity-[0.45]"
          priority
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(43,30,23,0.015)_100%)]" />
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 md:px-16 flex-1 flex flex-col">
        {/* Заголовок страницы */}
        <MenuSwitcher />

        {/* Клиентский контент с переключателем вариантов */}
        <MenuClient categories={categories} locale={locale} variant={variant} />
      </div>
    </main>
  );
}