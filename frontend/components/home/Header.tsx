"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "../../i18n/routing";
import { useAppShell } from "../ui/AppShellContext";

const locales = [
  { code: "ru", label: "РУС" },
  { code: "en", label: "ENG" },
  { code: "ky", label: "КЫР" },
] as const;

const navLinks = [
  { href: "/menu", key: "menu" },
  { href: "/events", key: "events" },
  { href: "/contacts", key: "contacts" },
] as const;

export default function Header() {
  const t = useTranslations("navigation");
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();
  const { headerCompact } = useAppShell();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  function switchLocale(locale: string) {
    router.replace(pathname, { locale: locale as "ru" | "en" | "ky" });
  }

  const isHomePage = pathname === "/";

  // Компактный режим хедера:
  // - Всегда на не-главных страницах (menu, events, contacts, book...)
  // - На главной — когда About вошёл в зону видимости (IntersectionObserver)
  const compact = !isHomePage || headerCompact;

  // Размеры контейнера логотипа — зависят от режима и экрана
  const logoContainerClasses = compact
    ? "h-[56px] md:h-[68px] w-[56px] md:w-[68px]"
    : "h-[85px] md:h-[120px] w-[200px] md:w-[320px] -translate-y-[5px] md:mt-[8px] -ml-6 md:ml-0";

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 w-full
          transition-all duration-[1000ms]
          ${
            compact
              ? "bg-[#7e2424]/95 backdrop-blur-sm"
              : "bg-transparent"
          }
        `}
      >
        <div className="max-w-[1800px] mx-auto px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36">
          <div
            className={`
              flex items-center justify-between
              transition-all duration-[1000ms]
              ${
                compact
                  ? "h-[64px] md:h-[72px] pt-0 md:pt-0"
                  : "h-[88px] md:h-[100px] pt-2 md:pt-6"
              }
            `}
          >
            {/* ─── Left: Desktop Navigation ─── */}
            <nav className="hidden md:flex items-center gap-8 lg:gap-10 flex-1 justify-start">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                return (
                  <a
                    key={link.key}
                    href={link.href}
                    className={`
                      text-[13px] font-sans font-semibold uppercase tracking-[1.5px]
                      transition-colors duration-200
                      ${isActive
                        ? "text-[#fffdf9]"
                        : "text-[#d0d0d0] hover:text-[#c9a96e]"
                      }
                    `}
                  >
                    {t(link.key)}
                  </a>
                );
              })}
            </nav>

            {/* ─── Center: Logo — кроссфейд через opacity + absolute-absolute ─── */}
            <a
              href="/"
              className={`
                flex-shrink-0 relative
                transition-all duration-500
                ${logoContainerClasses}
              `}
            >
              {/* Большой логотип — видим когда НЕ compact */}
              <div
                className={`
                  absolute inset-0 flex items-center justify-start
                  transition-opacity duration-[1000ms]
                  ${compact ? "opacity-0 pointer-events-none" : "opacity-100"}
                `}
              >
                <Image
                  src="/logo.png"
                  alt="Dastorkon"
                  width={300}
                  height={120}
                  className="object-contain object-left md:object-center w-full h-full"
                  priority
                />
              </div>

              {/* Компактный логотип (тюндюк) — видим когда compact */}
              <div
                className={`
                  absolute inset-0 flex items-center justify-center
                  transition-opacity duration-[1000ms]
                  ${compact ? "opacity-100" : "opacity-0 pointer-events-none"}
                `}
              >
                <Image
                  src="/logo-2.png"
                  alt="Dastorkon"
                  width={80}
                  height={80}
                  className="object-contain h-full w-auto"
                  priority
                />
              </div>
            </a>

            {/* ─── Right: Language Switcher + Cart + Reserve ─── */}
            <div className="flex items-center justify-end gap-3 md:gap-5 ml-auto md:flex-1">
              {/* Language Switcher — Desktop */}
              <div className="hidden md:flex items-center gap-1.5">
                {locales.map((locale) => {
                  const isActive = currentLocale === locale.code;
                  return (
                    <button
                      key={locale.code}
                      onClick={() => switchLocale(locale.code)}
                      className={`
                        text-[11px] font-sans font-bold uppercase tracking-[1.2px]
                        px-2 py-1 rounded-full border transition-all duration-200
                        ${isActive
                          ? "border-[#fffdf9] text-[#fffdf9] bg-[#fffdf9]/10"
                          : "border-transparent text-[#d0d0d0] hover:text-[#fffdf9] hover:border-[#d0d0d0]/30"
                        }
                      `}
                    >
                      {locale.label}
                    </button>
                  );
                })}
              </div>

              {/* Cart — ethno-themed basket icon (woven / shirdak style) */}
              <button
                className="
                  hidden md:flex items-center justify-center
                  w-10 h-10 rounded-full
                  border border-[#fffdf9] text-[#d0d0d0]
                  hover:border-[#c9a96e] hover:text-[#c9a96e]
                  transition-all duration-200
                "
                aria-label="Cart"
              >
                <svg
                  className="w-[18px] h-[18px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Basket body */}
                  <path d="M3 8l2 12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2l2-12" />
                  {/* Handle */}
                  <path d="M8 8V5a4 4 0 0 1 8 0v3" />
                  {/* Woven / shirdak cross-hatch ornament */}
                  <path d="M8.5 13l7 0" opacity="0.5" />
                  <path d="M8.5 16l7 0" opacity="0.5" />
                  <path d="M12 13l0 4" opacity="0.5" />
                  <path d="M9.5 13l1.5 4" opacity="0.4" strokeWidth={1} />
                  <path d="M14.5 13l-1.5 4" opacity="0.4" strokeWidth={1} />
                </svg>
              </button>

              {/* Reserve Table — prominent CTA button */}
              <a
                href="/#booking"
                className="
                  hidden md:inline-flex items-center justify-center
                  h-10 px-5
                  rounded-full
                  text-[11px] font-sans font-bold uppercase tracking-[1.5px]
                  border border-[#c9a96e] text-[#c9a96e]
                  hover:bg-[#c9a96e]/20 hover:text-[#fffdf9]
                  transition-all duration-200
                "
              >
                {t("booking")}
              </a>

              {/* ─── Burger button (mobile) ─── */}
              <button
                onClick={() => setMenuOpen(true)}
                className="
                  md:hidden flex flex-col items-center justify-center
                  w-10 h-10 gap-[5px]
                  text-[#fffdf9]
                "
                aria-label="Open menu"
              >
                <span className="block w-6 h-px bg-current" />
                <span className="block w-6 h-px bg-current" />
                <span className="block w-6 h-px bg-current" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Mobile Menu Overlay ─── */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />

          {/* Slide-out panel — фон как в About: #ffefcb */}
          <div className="absolute top-0 right-0 h-full w-[280px] max-w-[80vw] bg-[#ffefcb] border-l border-[#d4af37]/30 shadow-2xl">
            <div className="flex flex-col h-full px-6 py-8">
              {/* Close button */}
              <div className="flex justify-end mb-10">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center text-[#121212] hover:text-[#7e2424]"
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col gap-6 mb-10">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                  return (
                    <a
                      key={link.key}
                      href={link.href}
                      className={`
                        text-[15px] font-sans font-semibold uppercase tracking-[2px]
                        transition-colors duration-200
                        ${isActive
                          ? "text-[#7e2424]"
                          : "text-[#121212]/80 hover:text-[#7e2424]"
                        }
                      `}
                    >
                      {t(link.key)}
                    </a>
                  );
                })}
              </nav>

              {/* Divider */}
              <div className="h-px w-full bg-[#d4af37]/30 mb-8" />

              {/* Language switcher — mobile */}
              <div className="flex items-center gap-3 mb-6">
                {locales.map((locale) => {
                  const isActive = currentLocale === locale.code;
                  return (
                    <button
                      key={locale.code}
                      onClick={() => switchLocale(locale.code)}
                      className={`
                        text-[12px] font-sans font-bold uppercase tracking-[1.2px]
                        px-3 py-1.5 rounded-full border transition-all duration-200
                        ${isActive
                          ? "border-[#7e2424] text-[#7e2424] bg-[#7e2424]/10"
                          : "border-[#d4af37]/40 text-[#121212]/60 hover:text-[#7e2424] hover:border-[#7e2424]/40"
                        }
                      `}
                    >
                      {locale.label}
                    </button>
                  );
                })}
              </div>

              {/* Cart placeholder — mobile */}
              <button
                className="
                  flex items-center justify-center gap-2
                  w-full py-3 rounded-full
                  border border-[#d4af37]/40 text-[#121212]/80
                  hover:border-[#7e2424] hover:text-[#7e2424]
                  transition-all duration-200
                  text-[13px] font-sans font-bold uppercase tracking-[1.5px]
                "
              >
                <svg
                  className="w-[18px] h-[18px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 8l2 12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2l2-12" />
                  <path d="M8 8V5a4 4 0 0 1 8 0v3" />
                  <path d="M8.5 13l7 0" opacity="0.5" />
                  <path d="M8.5 16l7 0" opacity="0.5" />
                  <path d="M12 13l0 4" opacity="0.5" />
                  <path d="M9.5 13l1.5 4" opacity="0.4" strokeWidth={1} />
                  <path d="M14.5 13l-1.5 4" opacity="0.4" strokeWidth={1} />
                </svg>
                Cart
              </button>

              {/* Reserve Table — mobile CTA */}
              <a
                href="/#booking"
                onClick={() => setMenuOpen(false)}
                className="
                  flex items-center justify-center
                  w-full py-3 mt-4
                  rounded-full
                  text-[13px] font-sans font-bold uppercase tracking-[1.5px]
                  border border-[#c9a96e] text-[#c9a96e]
                  hover:bg-[#c9a96e] hover:text-[#121212]
                  transition-all duration-200
                "
              >
                {t("booking")}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}