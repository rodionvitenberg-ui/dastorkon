"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

/**
 * Cuisine — Asymmetrical Bento Layout
 *
 * Left: text block with gold eyebrow, large heading, body copy, two double-bezel CTAs.
 * Right: 3-image bento grid. One large image (top), two smaller below.
 *   - Bottom-left: looping video with poster overlay.
 *   - Bottom-right: static image.
 * Everything wrapped in sharp double-bezel frames, parchment texture, side ornament.
 */
export default function Cuisine() {
  const t = useTranslations("cuisine");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleVideoEnter = useCallback(() => {
    const vid = videoRef.current;
    if (vid) {
      vid.currentTime = 0;
      vid.play().catch(() => {});
    }
  }, []);

  const handleVideoLeave = useCallback(() => {
    const vid = videoRef.current;
    if (vid) vid.pause();
  }, []);

  return (
    <section className="relative w-full pb-10 md:pb-28 lg:pb-36 pt-8 md:pt-12 lg:pt-10 overflow-hidden">
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-10">
        <div className="flex flex-col md:flex-row md:items-center gap-12 md:gap-16 lg:gap-24">
          {/* ═══ ЛЕВАЯ КОЛОНКА: ТЕКСТ ═══ */}
          <div className="w-full md:w-5/12 flex-shrink-0">
            {/* Декоративный подзаголовок */}
            <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#D4AF37] font-bold block mb-4">
              {t("subtitle")}
            </span>

            {/* Заголовок */}
            <h2 className="font-heading text-4xl sm:text-5xl md:text-5xl lg:text-6xl uppercase tracking-[0.06em] text-[#121212] leading-tight mb-6">
              {t("title")}
            </h2>

            {/* Текст */}
            <p className="font-sans text-base md:text-lg leading-[1.8] text-[#121212]/75 font-light mb-10 max-w-md">
              {t("description")}
            </p>

            {/* ДВЕ CTA-КНОПКИ — с двойной рамкой (double-bezel) */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {/* Кнопка "Посмотреть меню" */}
              <Link
                href="/menu"
                className="group relative overflow-hidden px-5 py-3 md:px-8 md:py-3.5 transition-all duration-300 inline-flex items-center justify-center outline outline-[2px] outline-[#121212]/20 outline-offset-[3px] border-2 border-[#121212]/50 hover:border-[#D4AF37] hover:outline-[#D4AF37]/30"
              >
                <span className="relative z-10 font-sans text-[11px] md:text-xs font-semibold uppercase tracking-[0.15em] text-[#121212] transition-colors duration-300 group-hover:text-[#D4AF37]">
                  {t("btnMenu")}
                </span>
              </Link>

              {/* Кнопка "Забронировать столик" */}
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

          {/* ═══ ПРАВАЯ КОЛОНКА: БЕНТО-СЕТКА ИЗОБРАЖЕНИЙ ═══ */}
          <div className="w-full md:w-7/12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {/* Большое изображение — вся ширина на мобилке, две колонки на десктопе */}
              <div className="md:col-span-2">
                <div className="bg-[#121212] p-[2px]">
                  <div className="border border-white/15 overflow-hidden bg-[#121212]">
                    <div className="relative w-full aspect-[16/9] md:aspect-[2.2/1]">
                      <Image
                        src="/dish-1.jpg"
                        alt="Samarkand Plov"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 60vw"
                      />
                      {/* Витальная засветка снизу */}
                      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Нижняя левая — видео с постером */}
              <div
                className="group cursor-pointer"
                onMouseEnter={handleVideoEnter}
                onMouseLeave={handleVideoLeave}
              >
                <div className="bg-[#121212] p-[2px]">
                  <div className="border border-white/15 overflow-hidden bg-[#121212]">
                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                      {/* Видео — появляется при ховере, иначе скрыто */}
                      <video
                        ref={videoRef}
                        src="/hero-video1.mp4"
                        muted
                        loop
                        playsInline
                        preload="none"
                        className="absolute inset-0 w-full h-full object-cover"
                      />

                      {/* Постер (статичное изображение) */}
                      <Image
                        src="/about-cuisine.jpg"
                        alt="Cuisine video poster"
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                      />

                      {/* Индикатор видео */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 border border-white/10">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#D4AF37]">
                          <polygon points="2,0 12,6 2,12" fill="currentColor" />
                        </svg>
                        <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-white/80">Play</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Нижняя правая — статичное изображение */}
              <div>
                <div className="bg-[#121212] p-[2px]">
                  <div className="border border-white/15 overflow-hidden bg-[#121212] md:pb-40">
                    <div className="relative w-full aspect-[4/3]">
                      <Image
                        src="/dish-2.jpg"
                        alt="Traditional dishes"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}