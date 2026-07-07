"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "../../i18n/routing";
import { useCartStore } from "@/store/useCartStore";
import { useCartUIStore } from "@/store/useCartUIStore";

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

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  compact: boolean;
}

export default function MobileMenu({ open, onClose, compact }: MobileMenuProps) {
  const t = useTranslations("navigation");
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();
  const items = useCartStore((s) => s.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const openCart = useCartUIStore((s) => s.openCart);

  function switchLocale(locale: string) {
    router.replace(pathname, { locale: locale as "ru" | "en" | "ky" });
  }

  if (!open) return null;

  // Размеры контейнера логотипа — зеркало хедера
  const logoContainerClasses = compact
    ? "h-[56px] w-[56px]"
    : "h-[85px] w-[200px] -translate-y-[5px] -ml-6";

  return (
    <div className="fixed inset-0 z-[60] md:hidden">
      {/* Fullscreen panel — dark editorial surface */}
      <div className="absolute inset-0 bg-[#121212] flex flex-col">
        {/* ─── Top bar: точная копия хедера ─── */}
        <div
          className={`
            flex-shrink-0 w-full
            transition-all duration-[1000ms]
            ${compact ? "bg-[#7e2424]/95 backdrop-blur-sm" : "bg-transparent"}
          `}
        >
          <div className="px-6">
            <div
              className={`
                flex items-center justify-between
                transition-all duration-[1000ms]
                ${compact ? "h-[64px] pt-0" : "h-[88px] pt-2"}
              `}
            >
              {/* Logo — кроссфейд как в хедере */}
              <a
                href="/"
                onClick={onClose}
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
                    className="object-contain object-left w-full h-full"
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

              {/* Right group: cart icon + close button */}
              <div className="flex items-center gap-3">
                {/* Cart icon */}
                <button
                  onClick={() => {
                    openCart();
                    onClose();
                  }}
                  className="relative w-10 h-10 flex items-center justify-center text-[#fffdf9] hover:text-[#c9a96e] transition-all duration-200"
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

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center text-[#fffdf9] hover:text-[#c9a96e] transition-all duration-200"
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-[#374151]/40" />

        {/* ─── Body: nav links, language, booking ─── */}
        <div className="flex-1 flex flex-col px-8 py-12 overflow-y-auto">
          {/* Nav links — large editorial */}
          <nav className="flex flex-col gap-8 mb-14">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                pathname.startsWith(link.href + "/");
              return (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={onClose}
                  className={`
                    text-[26px] font-sans font-normal uppercase tracking-[5.4px]
                    transition-colors duration-200
                    ${isActive
                      ? "text-[#c9a96e]"
                      : "text-[#fffdf9]/80 hover:text-[#fffdf9]"
                    }
                  `}
                >
                  {t(link.key)}
                </a>
              );
            })}
          </nav>

          {/* Divider */}
          <div className="h-px w-full bg-[#374151]/30 mb-10" />

          {/* Language switcher */}
          <div className="flex items-center gap-3 mb-10">
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
                      ? "border-[#fffdf9] text-[#fffdf9] bg-[#fffdf9]/10"
                      : "border-[#374151] text-[#d0d0d0] hover:text-[#fffdf9] hover:border-[#fffdf9]/30"
                    }
                  `}
                >
                  {locale.label}
                </button>
              );
            })}
          </div>

          {/* Booking CTA */}
          <a
            href="/book"
            onClick={onClose}
            className="
              inline-flex items-center justify-center
              h-12 px-8
              rounded-full
              text-[13px] font-sans font-bold uppercase tracking-[1.5px]
              border border-[#c9a96e] text-[#c9a96e]
              hover:bg-[#c9a96e]/20 hover:text-[#fffdf9]
              transition-all duration-200
              self-start
            "
          >
            {t("booking")}
          </a>
        </div>
      </div>
    </div>
  );
}