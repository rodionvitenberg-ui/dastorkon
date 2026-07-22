"use client";

/**
 * Story page — parchment chapters.
 * Brand: Hero/Cuisine double-bezel buttons, home type scale, cream body.
 */
import { useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import OrnamentLines from "@/components/ui/OrnamentLines";
import { HeroBezelLink, LightBezelLink } from "./StoryButtons";

gsap.registerPlugin(ScrollTrigger);

const BENTO = [
  {
    key: "dastarkhan",
    span: "md:col-span-7 md:row-span-2 min-h-[320px] md:min-h-[460px]",
    image: "/about-cuisine.jpg",
    dark: true,
  },
  {
    key: "fire",
    span: "md:col-span-5 min-h-[220px]",
    image: "/banq.jpg",
    dark: true,
  },
  { key: "karakol", span: "md:col-span-5 min-h-[220px]", dark: false },
  {
    key: "craft",
    span: "md:col-span-6 min-h-[220px]",
    image: "/about-interior.jpg",
    dark: true,
  },
  { key: "table", span: "md:col-span-6 min-h-[220px]", dark: false },
] as const;

const CHAPTERS = ["roots", "kitchen", "house", "guest"] as const;
const PIN = ["recipe", "local", "ritual", "feast"] as const;
const QUOTES = ["q1", "q2", "q3"] as const;

export default function StoryContent() {
  const t = useTranslations("storyPage");
  const pinRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<(typeof CHAPTERS)[number] | null>("roots");

  useGSAP(
    () => {
      const section = pinRef.current;
      if (!section) return;
      const items = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-pin-item]")
      );
      const mm = gsap.matchMedia();
      mm.add(
        {
          desktop: "(min-width: 768px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { desktop, reduce } = ctx.conditions as {
            desktop: boolean;
            reduce: boolean;
          };
          if (!desktop || reduce) {
            gsap.set(items, { clearProps: "all" });
            return;
          }
          items.forEach((item) => {
            gsap.fromTo(
              item,
              { opacity: 0.35, y: 28 },
              {
                opacity: 1,
                y: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: item,
                  start: "top 85%",
                  end: "top 45%",
                  scrub: true,
                },
              }
            );
          });
        }
      );
      return () => mm.revert();
    },
    { scope: pinRef }
  );

  return (
    <main className="overflow-x-hidden w-full max-w-full">
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[90vh] md:min-h-screen w-full bg-[#121212] overflow-hidden flex flex-col justify-end p-5">
        <div className="absolute inset-0">
          <Image
            src="/about-interior.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#121212]" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto text-center pb-10 md:pb-16 pt-32 p-5">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-[1px] w-8 bg-[#D4AF37]/60" />
            <span className="font-sans text-[11px] tracking-[0.35em] uppercase text-[#D4AF37] font-bold">
              Dastorkon
            </span>
            <span className="h-[1px] w-8 bg-[#D4AF37]/60" />
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[68px] uppercase leading-[1.08] tracking-[0.08em] text-[#fffdf9] [text-shadow:0_4px_24px_rgba(0,0,0,0.8)] mb-6 max-w-4xl mx-auto">
            {t("heroTitle")}
          </h1>
          <p className="font-sans font-light text-[#fffdf9]/80 text-base md:text-lg leading-[1.8] max-w-xl mx-auto mb-10">
            {t("heroLead")}
          </p>

          <div className="flex flex-row items-center gap-4 md:gap-6 w-full max-w-md mx-auto">
            <HeroBezelLink href="/menu" className="flex-1 min-w-0">
              {t("ctaMenu")}
            </HeroBezelLink>
            <HeroBezelLink href="/book" className="flex-1 min-w-0">
              {t("ctaBook")}
            </HeroBezelLink>
          </div>
        </div>
      </section>

      {/* ═══ CREAM BODY ═══ */}
      <div className="relative bg-[#F5F2EB]">
        <div className="hidden md:block">
          <OrnamentLines type="parchment" />
        </div>
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <Image
            src="/parchment-bg.jpg"
            alt=""
            fill
            unoptimized
            sizes="100vw"
            priority
            quality={100}
            className="object-cover mix-blend-multiply opacity-[0.35]"
          />
        </div>

        <div className="relative z-10">
          {/* Manifesto */}
          <section className="py-20 md:py-28 p-5">
            <div className="max-w-4xl mx-auto border-y border-[#D4AF37]/30 py-10 md:py-14 text-center">
              <p className="font-heading text-2xl sm:text-3xl md:text-4xl uppercase tracking-[0.06em] text-[#121212] leading-[1.4]">
                <span className="font-light">{t("inlineBefore")} </span>
                <span className="inline-flex items-center align-middle mx-2 gap-2">
                  <span className="relative w-14 h-8 md:w-20 md:h-10 rounded-full overflow-hidden border border-[#D4AF37] shadow-sm shrink-0">
                    <Image
                      src="/about-cuisine.jpg"
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </span>
                  <span className="text-[#D4AF37] font-normal">dastarkhan</span>
                </span>
                <span className="font-light"> {t("inlineAfter")}</span>
              </p>
            </div>
          </section>

          {/* Bento */}
          <section className="p-5 pb-20 md:pb-28">
            <div className="max-w-[1440px] mx-auto">
              <div className="max-w-2xl mb-12 md:mb-16">
                <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#D4AF37] font-bold block mb-3">
                  Dastorkon
                </span>
                <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl uppercase tracking-[0.06em] text-[#121212] leading-tight mb-5">
                  {t("bentoTitle")}
                </h2>
                <p className="font-sans text-base md:text-lg leading-[1.8] text-[#121212]/75 font-light max-w-md">
                  {t("bentoLead")}
                </p>
              </div>

              {/* Расстояние между элементами Bento: gap-5 (20px) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                {BENTO.map((item) => {
                  const dark = item.dark;
                  return (
                    <article
                      key={item.key}
                      className={`group relative overflow-hidden transition-all duration-300 hover:shadow-xl ${item.span} ${
                        dark
                          ? "bg-[#121212] text-[#fffdf9]"
                          : "bg-[#FDFBF7] text-[#121212] border border-[#121212]/15 shadow-sm"
                      }`}
                    >
                      {"image" in item && item.image && (
                        <div className="absolute inset-0">
                          <Image
                            src={item.image}
                            alt=""
                            fill
                            sizes="(max-width:768px) 100vw, 55vw"
                            className="object-cover opacity-50 transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent" />
                        </div>
                      )}

                      {/* Отступ от контента до внутренних границ: p-5 (20px) / md:p-8 */}
                      <div className="relative z-10 h-full flex flex-col justify-end p-5 md:p-8">
                        <h3
                          className={`font-heading uppercase tracking-[0.12em] mb-2 ${
                            dark ? "text-[#D4AF37]" : "text-[#121212]"
                          }`}
                          style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)" }}
                        >
                          {t(`bento.${item.key}.title`)}
                        </h3>
                        <p
                          className={`font-sans font-light text-sm md:text-base leading-[1.7] max-w-md ${
                            dark ? "text-white/80" : "text-[#121212]/75"
                          }`}
                        >
                          {t(`bento.${item.key}.text`)}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Accordions */}
          <section className="p-5 pb-20 md:pb-28">
            <div className="max-w-3xl mx-auto">
              <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#D4AF37] font-bold block mb-3 text-center">
                Dastorkon
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl uppercase tracking-[0.06em] text-[#121212] text-center leading-tight mb-10 md:mb-12">
                {t("accordionsTitle")}
              </h2>

              <div className="border-y border-[#121212]/20 divide-y divide-[#121212]/15">
                {CHAPTERS.map((key) => {
                  const isOpen = open === key;
                  return (
                    <div key={key} className="transition-colors duration-200 hover:bg-[#121212]/[0.02]">
                      <h3>
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={`story-panel-${key}`}
                          id={`story-btn-${key}`}
                          onClick={() => setOpen(isOpen ? null : key)}
                          /* Отступ внутри каждой строки аккордеона p-5 */
                          className="w-full flex items-center justify-between gap-4 p-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
                        >
                          <span className="font-heading text-base md:text-lg uppercase tracking-[0.1em] text-[#121212]">
                            {t(`accordions.${key}.title`)}
                          </span>
                          <span
                            className={`shrink-0 w-8 h-8 rounded-full border border-[#121212]/30 flex items-center justify-center text-[#121212]/70 transition-transform duration-300 ${
                              isOpen ? "rotate-45 border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/10" : ""
                            }`}
                            aria-hidden
                          >
                            +
                          </span>
                        </button>
                      </h3>
                      <div
                        id={`story-panel-${key}`}
                        role="region"
                        aria-labelledby={`story-btn-${key}`}
                        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="px-5 pb-5 font-sans font-light text-[#121212]/75 text-base md:text-lg leading-[1.8] max-w-2xl">
                            {t(`accordions.${key}.text`)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Pin */}
          <section ref={pinRef} className="p-5 pb-20 md:pb-28">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
              <div className="md:col-span-5 md:sticky md:top-28">
                <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#D4AF37] font-bold block mb-3">
                  Dastorkon
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl uppercase tracking-[0.06em] text-[#121212] leading-tight mb-4">
                  {t("pinTitle")}
                </h2>
                <p className="font-sans font-light text-[#121212]/75 text-base md:text-lg leading-[1.8] max-w-sm">
                  {t("pinLead")}
                </p>
              </div>

              {/* Расстояние между карточками Pin: gap-5 (20px) */}
              <div className="md:col-span-7 flex flex-col gap-5">
                {PIN.map((key) => (
                  <article
                    key={key}
                    data-pin-item
                    /* Внутренние отступы p-5 (20px) */
                    className="relative bg-[#FDFBF7] border border-[#121212]/15 p-5 md:p-6 shadow-sm transition-all duration-300 hover:border-[#D4AF37]/60"
                  >
                    <h3 className="font-heading text-base md:text-lg uppercase tracking-[0.1em] text-[#121212] mb-2">
                      {t(`pinItems.${key}.title`)}
                    </h3>
                    <p className="font-sans font-light text-[#121212]/75 text-[15px] leading-[1.75] max-w-lg">
                      {t(`pinItems.${key}.text`)}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Quotes */}
          <section className="p-5 py-20 md:py-28">
            <div className="max-w-[1440px] mx-auto">
              <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#D4AF37] font-bold block mb-3 text-center">
                Dastorkon
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl uppercase tracking-[0.06em] text-[#121212] text-center leading-tight mb-12">
                {t("quotesTitle")}
              </h2>

              {/* Расстояние между элементами Quotes: gap-5 (20px) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {QUOTES.map((key) => (
                  <blockquote
                    key={key}
                    /* Карточка цитаты с внутренним отступом p-5 (20px) */
                    className="flex flex-col bg-[#FDFBF7] border border-[#121212]/15 p-5 transition-transform duration-300 hover:-translate-y-1 shadow-sm"
                  >
                    <div className="flex flex-col flex-1 justify-between">
                      <p className="font-sans font-light italic text-[#121212]/85 text-[15px] leading-relaxed mb-6">
                        «{t(`quotes.${key}.text`)}»
                      </p>
                      <footer className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold border-t border-[#121212]/10 pt-3">
                        — {t(`quotes.${key}.author`)}
                      </footer>
                    </div>
                  </blockquote>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="p-5 pb-24 md:pb-32">
            <div className="max-w-3xl mx-auto text-center border border-[#121212]/15 bg-[#FDFBF7]/60 p-5 sm:p-10 md:p-14 shadow-sm">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl uppercase tracking-[0.06em] text-[#121212] leading-tight mb-4 max-w-xl mx-auto">
                {t("ctaTitle")}
              </h2>
              <p className="font-sans font-light text-[#121212]/75 text-base md:text-lg leading-[1.8] max-w-md mx-auto mb-8">
                {t("ctaText")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
                <LightBezelLink href="/book">{t("ctaPrimary")}</LightBezelLink>
                <LightBezelLink href="/menu">
                  {t("ctaSecondary")}
                </LightBezelLink>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}