"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface VideoCardData {
  poster: string;
  video: string;
}

/**
 * Cuisine — Asymmetrical Bento Layout
 *
 * Left: text block with gold eyebrow, large heading, body copy, two double-bezel CTAs.
 * Right: 3-video bento grid. horizontal (top), tall-small (bottom-left), quadrat (bottom-right).
 * Videos: WebP poster by default, <video> mounts on hover.
 */
export default function Cuisine() {
  const t = useTranslations("cuisine");

  return (
    <section className="relative w-full pb-10 md:pb-28 lg:pb-36 pt-8 md:pt-12 lg:pt-10 overflow-hidden">
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-10">
        <div className="flex flex-col md:flex-row md:items-center gap-12 md:gap-16 lg:gap-24">
          {/* ═══ ЛЕВАЯ КОЛОНКА: ТЕКСТ ═══ */}
          <div className="w-full md:w-5/12 flex-shrink-0">
            <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#D4AF37] font-bold block mb-4">
              {t("subtitle")}
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-5xl lg:text-6xl uppercase tracking-[0.06em] text-[#121212] leading-tight mb-6">
              {t("title")}
            </h2>
            <p className="font-sans text-base md:text-lg leading-[1.8] text-[#121212]/75 font-light mb-10 max-w-md">
              {t("description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Link
                href="/menu"
                className="group relative overflow-hidden px-5 py-3 md:px-8 md:py-3.5 transition-all duration-300 inline-flex items-center justify-center outline outline-[2px] outline-[#121212]/20 outline-offset-[3px] border-2 border-[#121212]/50 hover:border-[#D4AF37] hover:outline-[#D4AF37]/30"
              >
                <span className="relative z-10 font-sans text-[11px] md:text-xs font-semibold uppercase tracking-[0.15em] text-[#121212] transition-colors duration-300 group-hover:text-[#D4AF37]">
                  {t("btnMenu")}
                </span>
              </Link>
              <Link
                href="/book"
                className="group relative overflow-hidden px-5 py-3 md:px-8 md:py-3.5 transition-all duration-300 inline-flex items-center justify-center outline outline-[2px] outline-[#121212]/20 outline-offset-[3px] border-2 border-[#121212]/50 hover:border-[#D4AF37] hover:outline-[#D4AF37]/30"
              >
                <span className="relative z-10 font-sans text-[11px] md:text-xs font-semibold uppercase tracking-[0.15em] text-[#121212] transition-colors duration-300 group-hover:text-[#D4AF37]">
                  {t("btnBook")}
                </span>
              </Link>
            </div>
          </div>

          {/* ═══ ПРАВАЯ КОЛОНКА: БЕНТО-СЕТКА ВИДЕО ═══ */}
          <div className="w-full md:w-7/12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {/* Большое горизонтальное видео (top, full width) */}
              <VideoBentoCell
                poster="/horizontal.webp"
                video="/horizontal.mp4"
                className="md:col-span-2"
                aspect="aspect-[16/9] md:aspect-[2/1]"
              />

              {/* Нижняя левая — tall-small */}
              <VideoBentoCell
                poster="/tall-small.webp"
                video="/tall-small.mp4"
                aspect="aspect-[4/3]"
              />

              {/* Нижняя правая — quadrat */}
              <VideoBentoCell
                poster="/quadrat.webp"
                video="/quadrat.mp4"
                aspect="aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Bento Video Cell ───

function VideoBentoCell({
  poster,
  video,
  className = "",
  aspect = "aspect-[4/3]",
}: {
  poster: string;
  video: string;
  className?: string;
  aspect?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

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
    <div
      className={`group cursor-pointer ${className}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="bg-[#121212] p-[2px]">
        <div className="border border-white/15 overflow-hidden bg-[#121212]">
          <div className={`relative w-full ${aspect} overflow-hidden`}>
            {/* Постер */}
            <Image
              src={poster}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover"
            />
            {/* Видео — поверх постера при hover */}
            {hovered && (
              <video
                ref={videoRef}
                src={video}
                muted
                loop
                playsInline
                preload="auto"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${playing ? "opacity-100" : "opacity-0"}`}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}