"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import OrnamentLines from "@/components/ui/OrnamentLines";

export default function PrivacyPolicyPage() {
  const t = useTranslations("privacyPolicy");

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
              {t("whatWeCollect")}
            </h2>
            <p>{t("whatWeCollectText")}</p>
          </section>

          <section>
            <h2 className="font-heading text-xl uppercase tracking-[0.08em] text-[#121212] mb-3">
              {t("howWeUse")}
            </h2>
            <p>{t("howWeUseText")}</p>
          </section>

          <section>
            <h2 className="font-heading text-xl uppercase tracking-[0.08em] text-[#121212] mb-3">
              {t("sharing")}
            </h2>
            <p>{t("sharingText")}</p>
          </section>

          <section>
            <h2 className="font-heading text-xl uppercase tracking-[0.08em] text-[#121212] mb-3">
              {t("cookies")}
            </h2>
            <p>{t("cookiesText")}</p>
          </section>

          <section>
            <h2 className="font-heading text-xl uppercase tracking-[0.08em] text-[#121212] mb-3">
              {t("yourRights")}
            </h2>
            <p>{t("yourRightsText")}</p>
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