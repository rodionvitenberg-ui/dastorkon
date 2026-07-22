"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const sections = [
  { key: "banquets", img: "/cath.jpg", align: "left" as const },
  { key: "sherine", img: "/about-cuisine.jpg", align: "right" as const },
  { key: "birthdays", img: "/banq.jpg", align: "left" as const },
  { key: "matchmaking", img: "/about-interior.jpg", align: "right" as const },
  { key: "parentMeeting", img: "/menu.png", align: "left" as const },
  { key: "kidsParty", img: "/cath.jpg", align: "right" as const },
  { key: "anyEvent", img: "/banq.jpg", align: "left" as const },
];

function useFadeInOnScroll() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("animate-fade-in");
          el.style.opacity = "1";
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

// Стиль для надежного 3px бордера
const borderStyle = {
  borderBottom: "1px solid rgba(255, 255, 255)",
};

function StorySection({
  title,
  desc,
  img,
  align,
}: {
  title: string;
  desc: string;
  img: string;
  align: "left" | "right";
}) {
  const ref = useFadeInOnScroll();

  return (
    <section
      ref={ref}
      style={{ opacity: 0, ...borderStyle }}
      className="relative min-h-[50svh] flex items-center overflow-hidden py-10"
    >
      <Image src={img} alt="" fill className="object-cover opacity-25" />
      <div
        className={`absolute inset-0 bg-gradient-to-${
          align === "left" ? "r" : "l"
        } from-[#121212] via-[#121212]/60 to-transparent`}
      />

      <div
        className={`relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 flex ${
          align === "left" ? "justify-start" : "justify-end"
        }`}
      >
        <div className={`max-w-lg ${align === "right" ? "text-right" : ""}`}>
          <h2 className="font-heading text-2xl md:text-4xl uppercase tracking-[0.08em] leading-[1.2] mt-2 mb-4">
            {title}
          </h2>
          <p className="text-[#fffdf9]/70 text-sm md:text-base leading-relaxed">
            {desc}
          </p>
        </div>
      </div>
    </section>
  );
}

export default function BanquetsPage() {
  const t = useTranslations("banquetsPage");

  return (
    <div className="min-h-screen bg-[#121212] text-[#fffdf9]">
      {/* Spacer for fixed header — pushes hero below the header bar */}
      <div className="h-[64px] md:h-[72px]" />

      {/* HERO — full‑bleed background starts below spacer */}
      <section 
        style={{
          borderTop: "1px solid rgb(255, 255, 255)",
          borderBottom: "1px solid rgba(255, 255, 255)",
        }}
        className="relative h-[40svh] min-h-[320px] flex items-center justify-center overflow-hidden"
      >
        <Image
          src="/background-hero.png"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-6 py-10">
          <span className="text-[#fffdf9]/60 text-xs font-sans font-semibold uppercase tracking-[0.25em] mb-3 block">
            {t("heroSubtitle")}
          </span>
          <h1 className="font-heading text-3xl md:text-5xl uppercase tracking-[0.1em] leading-[1.15]">
            {t("heroTitle")}
          </h1>
        </div>
      </section>

      {/* SCROLL STORY */}
      {sections.map((s, i) => (
        <StorySection
          key={i}
          title={t(`sections.${s.key}.title`)}
          desc={t(`sections.${s.key}.desc`)}
          img={s.img}
          align={s.align}
        />
      ))}

      {/* CTA SECTION */}
      <section 
        style={{ borderBottom: "1px solid rgba(255, 255, 255)" }}
        className="relative py-20 px-6 overflow-hidden flex items-center justify-center"
      >
        <Image
          src="/background-hero.png"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-[1440px] mx-auto flex justify-center">
          <Link
            href="/book"
            className="group relative overflow-hidden min-w-[220px] h-14 px-10 transition-all duration-300 inline-flex items-center justify-center outline outline-1 outline-white/10 outline-offset-[3px] border-[1.5px] border-white/20 hover:border-[#d4af37]/60"
          >
            <div className="absolute inset-0 border border-white/10 group-hover:border-[#d4af37]/30" />
            <span className="relative z-10 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-white group-hover:text-[#d4af37] transition-colors duration-300">
              {t("cta")}
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}