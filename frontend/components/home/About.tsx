"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Link } from "../../i18n/routing";
import { useTranslations } from "next-intl";

interface CardData {
  key: string;
  href: string;
  poster: string;
  video: string;
}

const CARDS: CardData[] = [
  { key: "menu", href: "/menu", poster: "/about-cuisine.jpg", video: "/hero-video1.mp4" },
  { key: "book", href: "/book", poster: "/about-interior.jpg", video: "/AQNFbu4gEBVErVQi6hljrG6RDrPdX9IJKn55y8qKxtHqI5w6qN-ljLL4Tm5LPQAvkbv0IBZ6YUHgIPT4HlMb1y-z6YdGq8PngAGap08.mp4" },
  { key: "events", href: "/events", poster: "/banq.jpg", video: "/hero-video1.mp4" },
];

/** Single hover-card with poster → video swap on desktop hover. */
function HoverCard({ data }: { data: CardData }) {
  const t = useTranslations("aboutCards");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const handleEnter = useCallback(() => {
    setHovered(true);
    const vid = videoRef.current;
    if (vid) {
      if (vid.readyState >= 2) {
        vid.currentTime = 0;
        vid.play().catch(() => {});
      } else {
        setVideoReady(true);
        vid.load();
      }
    }
  }, []);

  const handleLeave = useCallback(() => {
    setHovered(false);
    const vid = videoRef.current;
    if (vid) {
      vid.pause();
      vid.currentTime = 0;
    }
  }, []);

  const handleCanPlay = useCallback(() => {
    if (!videoReady) return;
    setVideoReady(false);
    const vid = videoRef.current;
    if (vid) {
      vid.currentTime = 0;
      vid.play().catch(() => {});
    }
  }, [videoReady]);

  const title = t(`${data.key}.title`);
  const description = t(`${data.key}.description`);
  const cta = t(`${data.key}.cta`);

  return (
    <Link
      href={data.href}
      className="group block relative w-full aspect-[3/4] overflow-hidden rounded-sm border border-[#121212]/10 transition-colors duration-500 hover:border-[#D4AF37]/40"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
    >
      {/* Media fills entire card */}
      <div className="absolute inset-0">
        {/* Poster image — hidden when video is playing on hover */}
        <Image
          src={data.poster}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={`object-cover transition-all duration-700 ${hovered ? "opacity-0 scale-105" : "opacity-100 scale-100"}`}
        />

        {/* Video — desktop only, visible on hover */}
        <video
          ref={videoRef}
          src={data.video}
          muted
          loop
          playsInline
          preload="none"
          onCanPlay={handleCanPlay}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 hidden md:block ${hovered ? "opacity-100" : "opacity-0"}`}
        />

        {/* Gradient overlay — fades bottom so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/90 via-[#121212]/20 to-transparent pointer-events-none" />
      </div>

      {/* Text section — fixed at bottom, grows upward on hover */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#ffefcb] px-5 pt-4 pb-5 transition-all duration-500 group-hover:pb-10">
        <h3 className="font-heading text-xl sm:text-2xl uppercase tracking-[0.05em] text-[#121212] leading-tight mb-2">
          {title}
        </h3>
        <p className="font-sans text-sm leading-relaxed text-[#121212]/75 font-light line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
          {description}
        </p>

        {/* Arrow — slides in on hover, 3× larger */}
        <div className="flex justify-end mt-4 overflow-hidden">
          <span className="inline-block translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out">
            <Image
              src="/icon-arrow-scalable.svg"
              alt=""
              width={72}
              height={72}
              className="w-[72px] h-[72px]"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="relative z-0 w-full overflow-hidden bg-[#ffefcb]">
      {/* Subtle film grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
        }}
      />

      {/* ─── SECTION 1: PHILOSOPHY ─── */}
      <div className="relative w-full min-h-[80vh] md:min-h-[90vh] flex items-center bg-[#ffefcb]">
        <div className="absolute inset-0">
          <Image
            src="/about-cuisine.jpg"
            alt=""
            fill
            className="object-cover brightness-[0.35] saturate-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#ffefcb] via-[#ffefcb]/80 to-transparent" />
        </div>
        <div className="relative z-10 px-6 sm:px-12 md:px-20 lg:px-28 max-w-3xl py-20 md:py-32">
          <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#D4AF37] font-bold block mb-4">
            {t("subtitle")}
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-[0.06em] text-[#121212] leading-tight mb-6">
            {t("title")}
          </h2>
          <p className="font-sans text-base md:text-lg leading-[1.8] text-[#121212]/75 max-w-xl font-light mb-10">
            {t("description")}
          </p>
          <Link
            href="/story"
            className="inline-flex items-center gap-2 text-[#951401] font-sans text-xs tracking-[0.15em] uppercase font-bold hover:text-[#121212] transition-colors w-fit"
          >
            {t("cta")}
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12H19M19 12L13 6M19 12L13 18" />
            </svg>
          </Link>
        </div>
      </div>

      {/* thin divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

      {/* ─── SECTION 2: Three hover-cards ─── */}
      <div className="bg-[#ffefcb] py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {CARDS.map((card) => (
              <HoverCard key={card.key} data={card} />
            ))}
          </div>
        </div>
      </div>

      {/* thin divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
    </section>
  );
}