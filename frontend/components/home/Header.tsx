"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "../../i18n/routing";
import { useAppShell } from "../ui/AppShellContext";
import { useCartStore } from "@/store/useCartStore";
import { useCartUIStore } from "@/store/useCartUIStore";
import MobileMenu from "./MobileMenu";

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
  const { headerCompact, chromeHidden } = useAppShell();
  const [menuOpen, setMenuOpen] = useState(false);
  const items = useCartStore((s) => s.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const openCart = useCartUIStore((s) => s.openCart);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  if (chromeHidden) return null;

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
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
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
                  src="/logo.webp"
                  alt="Dastorkon"
                  width={300}
                  height={120}
                  sizes="(max-width: 768px) 200px, 320px"
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
                  src="/logo-2.webp"
                  alt="Dastorkon"
                  width={80}
                  height={80}
                  sizes="80px"
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
                onClick={openCart}
                className="
                  hidden md:flex items-center justify-center relative
                  w-10 h-10 rounded-full
                  border border-[#fffdf9] text-[#d0d0d0]
                  hover:border-[#c9a96e] hover:text-[#c9a96e]
                  transition-all duration-200
                "
                aria-label="Cart"
              >
                {/* Badge */}
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full bg-[#c9a96e] text-[#121212] text-[10px] font-bold leading-none">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
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
                href="/book"
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

              {/* Cart icon — mobile (left of burger) */}
              <button
                onClick={openCart}
                className="
                  md:hidden flex items-center justify-center relative
                  w-10 h-10
                  text-[#fffdf9]
                  hover:text-[#c9a96e]
                  transition-all duration-200
                "
                aria-label="Cart"
              >
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center rounded-full bg-[#c9a96e] text-[#121212] text-[10px] font-bold leading-none">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
                <svg
                  className="w-[20px] h-[20px]"
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
              </button>

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
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} compact={compact} />
    </>
  );
}