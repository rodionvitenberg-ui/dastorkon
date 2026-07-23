"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Link } from "../../i18n/routing";
import { useTranslations } from "next-intl";
import { useAppShell } from "../ui/AppShellContext";

interface CardData {
  key: string;
  href: string;
  poster: string;
  video: string;
}

const CARDS: CardData[] = [
  {
    key: "menu",
    href: "/menu",
    poster: "/menu-2.webp",
    video: "/menu-2.mp4",
  },
  {
    key: "book",
    href: "/book",
    poster: "/reserve-table.webp",
    video: "/reserve-table.mp4",
  },
  {
    key: "events",
    href: "/events",
    poster: "/events-banq.webp",
    video: "/events-banq.mp4",
  },
];

function HoverCard({ cardKey, data }: { cardKey: string; data: CardData }) {
  const t = useTranslations("aboutCards");
  const card = t.raw(cardKey) as { title: string; description: string; cta: string };
  const [hovered, setHovered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Autoplay when video mounts on hover
  useEffect(() => {
    if (!hovered) return;
    const vid = videoRef.current;
    if (!vid) return;

    const play = () => {
      vid.currentTime = 0;
      vid.play().catch(() => {});
      setPlaying(true);
    };

    if (vid.readyState >= 2) {
      play();
    } else {
      vid.addEventListener("canplay", play, { once: true });
    }

    return () => {
      vid.removeEventListener("canplay", play);
      vid.pause();
      setPlaying(false);
    };
  }, [hovered]);

  const handleEnter = useCallback(() => setHovered(true), []);
  const handleLeave = useCallback(() => setHovered(false), []);

  return (
    <Link
      href={data.href}
      className="group block relative w-full md:h-auto md:aspect-[3/4] mb-4 md:mb-0"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
    >
      {/* ═══ МОБИЛЬНЫЙ LAYOUT (только постер) ═══ */}
      <div className="grid grid-cols-1 grid-rows-[1fr_auto] md:hidden w-full h-full">
        <div className="relative w-full overflow-hidden bg-[#121212]" style={{ aspectRatio: "2/1" }}>
          <Image
            src={data.poster}
            alt={card.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            quality={70}
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#ffefcb]/90 to-transparent pointer-events-none" />
        </div>

        <div className="px-[5px] -mt-10 z-10 w-fit ml-auto mr-[-10px]">
          <div className="bg-[#ffefcb] border-[1.5px] border-[#121212] p-1">
            <div className="border border-[#121212]/40 bg-[#ffefcb] w-full flex flex-col items-center py-3 pl-3 pr-6">
              <h3 className="font-heading text-base tracking-[0.2em] text-[#121212] uppercase mb-2 text-center w-full">{card.title}</h3>
              <p className="font-serif italic text-[13px] text-[#121212]/80 text-center leading-snug break-words w-full">{card.description}</p>
              <div className="mt-2 flex justify-end pr-1 w-full">
                <Image src="/icon-arrow-scalable.svg" alt="Arrow" width={60} height={20} className="w-[60px] h-auto object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ ДЕСКТОПНЫЙ LAYOUT — постер всегда, видео поверх при hover ═══ */}
      <div className="hidden md:block absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden bg-[#121212]">
          {/* Постер */}
          <Image
            src={data.poster}
            alt={card.title}
            fill
            sizes="33vw"
            quality={70}
            className="object-cover"
          />
          {/* Видео — только при hover, начинается грузиться по событию */}
          {hovered && (
            <video
              ref={videoRef}
              src={data.video}
              muted
              loop
              playsInline
              preload="auto"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${playing ? "opacity-100" : "opacity-0"}`}
            />
          )}
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[85%] bg-[#ffefcb] border-[1.5px] border-[#121212] p-1 z-10">
          <div className="border border-[#121212]/40 bg-[#ffefcb] w-full flex flex-col relative overflow-hidden transition-[height] duration-500 h-[125px] group-hover:h-[150px] motion-reduce:transition-none">
            <div className="w-full flex flex-col items-center justify-center shrink-0 h-[115px] px-4 pt-2">
              <h3 className="font-heading text-base md:text-lg tracking-[0.2em] text-[#121212] uppercase mb-2 text-center">{card.title}</h3>
              <p className="font-serif italic text-[13px] md:text-[14px] text-[#121212]/80 text-center leading-snug">{card.description}</p>
            </div>
            <div className="absolute bottom-[6px] inset-x-0 w-full flex justify-center shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 motion-reduce:transition-none">
              <Image src="/icon-arrow-scalable.svg" alt="Arrow" width={72} height={24} className="w-[72px] h-auto object-contain" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function PhilosophyVariant1() {
  const t = useTranslations("about");
  const images = ["/interiors-1.webp", "/interios-2.jpg", "/interiors-3.jpg", "/interiors-4.jpeg"];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIdx((i) => (i + 1) % images.length), 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full min-h-[60vh] md:min-h-[75vh] flex flex-col md:flex-row bg-transparent">
      <div className="relative w-full md:absolute md:inset-y-0 md:left-0 md:w-1/2 h-[50vh] md:h-full order-1 overflow-hidden border-r border-brand-dark/10">
        <div className="relative w-full h-full">
          {images.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt="Philosophy"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={70}
              className={`object-cover transition-opacity duration-700 ${i === idx ? "opacity-100" : "opacity-0"}`}
              priority={i === 0}
            />
          ))}
        </div>
      </div>
      <div className="relative w-full md:w-1/2 md:ml-auto flex items-center justify-center p-8 md:p-12 lg:p-20 order-2 z-10">
        <div className="max-w-xl">
          <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#D4AF37] font-bold block mb-4">{t("subtitle")}</span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl uppercase tracking-[0.06em] text-[#121212] leading-tight mb-6">{t("title")}</h2>
          <p className="font-sans text-base md:text-lg leading-[1.8] text-[#121212]/75 font-light mb-10">{t("description")}</p>
          <Link href="/story" className="group relative overflow-hidden px-5 py-3 md:px-8 md:py-3.5 transition-all duration-300 inline-flex items-center justify-center outline outline-[2px] outline-[#121212]/20 outline-offset-[3px] border-2 border-[#121212]/50 hover:border-[#D4AF37] hover:outline-[#D4AF37]/30">
            <span className="relative z-10 font-sans text-[11px] md:text-xs font-semibold uppercase tracking-[0.15em] text-[#121212] transition-colors duration-300 group-hover:text-[#D4AF37]">{t("cta")}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const t = useTranslations("about");
  const sectionRef = useRef<HTMLElement>(null);
  const { setHeaderCompact } = useAppShell();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHeaderCompact(true);
        else { const wentUp = entry.boundingClientRect.top < 0; if (!wentUp) setHeaderCompact(false); }
      },
      { rootMargin: "0px 0px 0px 0px", threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [setHeaderCompact]);

  return (
    <section ref={sectionRef} id="about" className="relative z-0 w-full">
      <PhilosophyVariant1 />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent relative z-20" />
      <div className="py-12 md:py-20 relative z-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="text-center mb-12 md:mb-16">
            <span className="font-serif text-[14px] md:text-base tracking-[0.15em] text-[#121212]/80 block mb-4">{t("cardsSubtitle")}</span>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl uppercase tracking-[0.1em] text-[#121212] max-w-3xl mx-auto leading-snug">{t("cardsTitle")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8">
            {CARDS.map((card) => (
              <HoverCard key={card.key} cardKey={card.key} data={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}