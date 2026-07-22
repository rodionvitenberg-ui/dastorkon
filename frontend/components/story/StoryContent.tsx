"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import OrnamentLines from "@/components/ui/OrnamentLines";
import { HeroBezelLink, LightBezelLink } from "./StoryButtons";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// Секции журнального разворота — каждая split: изображение + текст
const SECTIONS = [
  { key: "roots", image: "/about-cuisine.jpg", align: "left" as const },
  { key: "kitchen", image: "/banq.jpg", align: "right" as const },
  { key: "house", image: "/about-interior.jpg", align: "left" as const },
  { key: "guest", image: "/background-hero.png", align: "right" as const },
];

function FadeInSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", end: "top 60%", toggleActions: "play none none reverse" },
        }
      );
    },
    { scope: ref }
  );
  return <div ref={ref}>{children}</div>;
}

export default function StoryContent() {
  const t = useTranslations("storyPage");

  return (
    <main className="w-full">
      {/* ═══ HERO — тёмная, кинематографичная ═══ */}
      <section className="relative min-h-screen w-full bg-[#121212] overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/background-hero.png"
            alt=""
            fill
            className="object-cover opacity-60 object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-12 md:px-20 w-full">
          <div className="max-w-2xl">
            <span className="font-sans text-[11px] tracking-[0.35em] uppercase text-[#D4AF37] font-bold block mb-6">
              Dastorkon
            </span>
            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-[80px] uppercase leading-[1.05] tracking-[0.08em] text-[#fffdf9] mb-6">
              {t("heroTitle")}
            </h1>
            <p className="font-sans font-light text-[#fffdf9]/70 text-base md:text-lg leading-[1.8] max-w-lg mb-10">
              {t("heroLead")}
            </p>
            <div className="flex gap-4">
              <HeroBezelLink href="/menu">{t("ctaMenu")}</HeroBezelLink>
              <HeroBezelLink href="/book">{t("ctaBook")}</HeroBezelLink>
            </div>
          </div>
        </div>

        {/* Декоративный угол */}
        <div className="absolute bottom-0 right-0 w-48 h-48 md:w-72 md:h-72 pointer-events-none">
          <Image src="/ornament-corner.png" alt="" fill className="object-contain opacity-20" />
        </div>
      </section>

      {/* ═══ PARCHMENT BODY ═══ */}
      <div className="relative bg-[#F5F2EB]">
        <div className="hidden md:block"><OrnamentLines type="parchment" /></div>
        <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none" aria-hidden>
          <Image src="/parchment-bg.jpg" alt="" fill unoptimized sizes="100vw" priority quality={100} className="object-cover mix-blend-multiply opacity-[0.45]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(43,30,23,0.015)_100%)]" />
        </div>

        <div className="relative z-10">
          {/* ═══ Философия — крупная цитата на всю ширину ═══ */}
          <FadeInSection>
            <section className="py-24 md:py-32 px-6 sm:px-12 md:px-20 lg:px-28">
              <div className="max-w-5xl mx-auto text-center">
                <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#D4AF37] font-bold block mb-6">
                  Философия
                </span>
                <blockquote className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-[0.04em] text-[#121212] leading-[1.2]">
                  <span className="font-light">{t("inlineBefore")} </span>
                  <span className="text-[#D4AF37] font-normal">{t("inlineHighlight")}</span>
                  <span className="font-light"> {t("inlineAfter")}</span>
                </blockquote>
              </div>
            </section>
          </FadeInSection>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

          {/* ═══ Split-секции — журнальный разворот ═══ */}
          {SECTIONS.map((sec) => (
            <FadeInSection key={sec.key}>
              <section className="w-full">
                <div className="flex flex-col md:flex-row min-h-[60vh] md:min-h-[70vh]">
                  {/* Изображение */}
                  <div
                    className={`relative w-full md:w-1/2 min-h-[40vh] md:min-h-[70vh] overflow-hidden bg-[#121212] ${
                      sec.align === "right" ? "md:order-2" : ""
                    }`}
                  >
                    <Image
                      src={sec.image}
                      alt={t(`accordions.${sec.key}.title`)}
                      fill
                      sizes="50vw"
                      className="object-cover scale-105 transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
                  </div>

                  {/* Текст */}
                  <div
                    className={`relative w-full md:w-1/2 flex items-center p-8 sm:p-12 md:p-16 lg:p-20 ${
                      sec.align === "right" ? "md:order-1" : ""
                    }`}
                  >
                    <div className="max-w-lg">
                      <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl uppercase tracking-[0.06em] text-[#121212] leading-tight mb-6">
                        {t(`accordions.${sec.key}.title`)}
                      </h2>
                      <p className="font-sans font-light text-[#121212]/75 text-base md:text-lg leading-[1.8]">
                        {t(`accordions.${sec.key}.text`)}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </FadeInSection>
          ))}

          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

          {/* ═══ Столпы традиций — 2×2 сетка с изображениями ═══ */}
          <FadeInSection>
            <section className="py-20 md:py-28 px-6 sm:px-12 md:px-20 lg:px-28">
              <div className="max-w-[1440px] mx-auto">
                <div className="text-center mb-16">
                  <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#D4AF37] font-bold block mb-4">
                    Традиции
                  </span>
                  <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl uppercase tracking-[0.06em] text-[#121212] leading-tight mb-4">
                    {t("pinTitle")}
                  </h2>
                  <p className="font-sans font-light text-[#121212]/70 text-base md:text-lg leading-[1.8] max-w-xl mx-auto">
                    {t("pinLead")}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                  {(["recipe", "local", "ritual", "feast"] as const).map((key, idx) => {
                    const images = ["/about-cuisine.jpg", "/banq.jpg", "/about-interior.jpg", "/background-hero.png"];
                    return (
                      <div key={key} className="group relative overflow-hidden bg-[#121212] aspect-[16/9] md:aspect-[2/1]">
                        <Image
                          src={images[idx]}
                          alt={t(`pinItems.${key}.title`)}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                          <h3 className="font-heading text-xl md:text-2xl uppercase tracking-[0.1em] text-[#fffdf9] mb-2">
                            {t(`pinItems.${key}.title`)}
                          </h3>
                          <p className="font-sans font-light text-[#fffdf9]/70 text-sm md:text-base leading-[1.7] max-w-lg">
                            {t(`pinItems.${key}.text`)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </FadeInSection>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

          {/* ═══ Финальный CTA ═══ */}
          <FadeInSection>
            <section className="py-24 md:py-32 px-6 sm:px-12 md:px-20">
              <div className="max-w-3xl mx-auto text-center">
                <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#D4AF37] font-bold block mb-4">
                  Добро пожаловать
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl uppercase tracking-[0.06em] text-[#121212] leading-tight mb-4 max-w-xl mx-auto">
                  {t("ctaTitle")}
                </h2>
                <p className="font-sans font-light text-[#121212]/75 text-base md:text-lg leading-[1.8] max-w-md mx-auto mb-10">
                  {t("ctaText")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <LightBezelLink href="/book">{t("ctaPrimary")}</LightBezelLink>
                  <LightBezelLink href="/menu">{t("ctaSecondary")}</LightBezelLink>
                </div>
              </div>
            </section>
          </FadeInSection>
        </div>
      </div>
    </main>
  );
}