"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import OrnamentLines from "@/components/ui/OrnamentLines";

export default function CookiePolicyPage() {
  const t = useTranslations("cookiePolicy");

  return (
    <main className="relative min-h-screen pt-24 pb-16 bg-[#F5F2EB]">
      <OrnamentLines type="parchment" />
      <div className="absolute inset-0 -z-0 w-full h-full pointer-events-none" aria-hidden="true">
        <Image
          src="/parchment-bg.jpg"
          alt=""
          fill
          className="object-cover mix-blend-multiply opacity-[0.45]"
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-20">
        <span className="font-sans text-xs tracking-[0.2em] uppercase text-brand-gold font-bold block mb-4">
          Dastorkon
        </span>
        <h1 className="font-heading text-4xl md:text-5xl uppercase tracking-[0.06em] text-[#121212] leading-tight mb-4">
          {t("title")}
        </h1>
        <p className="font-sans text-sm text-[#121212]/50 mb-12">{t("lastUpdated")}</p>

        <div className="prose prose-lg font-sans text-[#121212]/80 leading-[1.9] space-y-8 max-w-none">
          <p>{t("intro")}</p>

          <section>
            <h2 className="font-heading text-xl uppercase tracking-[0.08em] text-[#121212] mb-3">
              {t("whatAreCookies")}
            </h2>
            <p>{t("whatAreCookiesText")}</p>
          </section>

          <section>
            <h2 className="font-heading text-xl uppercase tracking-[0.08em] text-[#121212] mb-3">
              {t("howWeUseCookies")}
            </h2>
            <p>{t("howWeUseCookiesText")}</p>
          </section>

          <section>
            <h2 className="font-heading text-xl uppercase tracking-[0.08em] text-[#121212] mb-3">
              {t("typesOfCookies")}
            </h2>

            <h3 className="font-heading text-base uppercase tracking-[0.06em] text-brand-gold mt-5 mb-2">
              {t("essential")}
            </h3>
            <p>{t("essentialText")}</p>

            <h3 className="font-heading text-base uppercase tracking-[0.06em] text-brand-gold mt-5 mb-2">
              {t("analytics")}
            </h3>
            <p>{t("analyticsText")}</p>
          </section>

          <section>
            <h2 className="font-heading text-xl uppercase tracking-[0.08em] text-[#121212] mb-3">
              {t("managing")}
            </h2>
            <p>{t("managingText")}</p>
          </section>

          <section>
            <h2 className="font-heading text-xl uppercase tracking-[0.08em] text-[#121212] mb-3">
              {t("contact")}
            </h2>
            <p>{t("contactText")}</p>
          </section>
        </div>
      </div>
    </main>
  );
}