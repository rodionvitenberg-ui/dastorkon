"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "../../i18n/routing";

const STORAGE_KEY = "dastorkon-cookie-consent";

export default function CookieConsent() {
  const t = useTranslations("cookieConsent");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 400);
      return () => clearTimeout(timer);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-end p-4 sm:p-6">
      {/* Backdrop — минимальное затемнение, чтобы выделить панель */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
        onClick={decline}
      />

      {/* Card */}
      <div className="relative animate-fade-in w-full max-w-md bg-brand-cream border border-brand-dark/15 rounded-sm shadow-lg p-6 sm:p-8 space-y-5">
        {/* Title */}
        <h3 className="font-heading text-xl text-brand-dark tracking-wide leading-tight">
          {t("title")}
        </h3>

        {/* Description */}
        <p className="font-sans text-sm text-brand-dark/70 leading-relaxed">
          {t("description")}
        </p>

        {/* Policy links */}
        <div className="flex items-center gap-3 text-[11px]">
          <Link
            href="/privacy"
            className="font-sans uppercase tracking-[0.12em] text-brand-dark/50 hover:text-brand-dark transition-colors"
          >
            {t("privacyPolicy")}
          </Link>
          <span className="text-brand-dark/20">|</span>
          <Link
            href="/cookie"
            className="font-sans uppercase tracking-[0.12em] text-brand-dark/50 hover:text-brand-dark transition-colors"
          >
            {t("cookiePolicy")}
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-1">
          <button
            onClick={accept}
            className="group relative overflow-hidden px-4 py-2.5 transition-all duration-300 flex-1 min-w-[108px] min-h-[44px] flex items-center justify-center outline outline-1 outline-brand-dark/10 outline-offset-[3px] border-[1.5px] border-brand-dark/20 hover:border-brand-gold/60 cursor-pointer"
          >
            <div className="absolute inset-0 border border-brand-dark/10 group-hover:border-brand-gold/30" />
            <span className="relative z-10 font-sans text-[11px] md:text-xs font-semibold uppercase tracking-[0.15em] text-brand-dark group-hover:text-brand-gold transition-colors duration-300 whitespace-nowrap">
              {t("accept")}
            </span>
          </button>
          <button
            onClick={decline}
            className="group relative overflow-hidden px-4 py-2.5 transition-all duration-300 flex-1 min-w-[108px] min-h-[44px] flex items-center justify-center outline outline-1 outline-brand-dark/10 outline-offset-[3px] border-[1.5px] border-brand-dark/20 hover:border-brand-gold/60 cursor-pointer"
          >
            <div className="absolute inset-0 border border-brand-dark/10 group-hover:border-brand-gold/30" />
            <span className="relative z-10 font-sans text-[11px] md:text-xs font-semibold uppercase tracking-[0.15em] text-brand-dark group-hover:text-brand-gold transition-colors duration-300 whitespace-nowrap">
              {t("decline")}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}