"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "../../i18n/routing";

export default function Hero() {
  const t = useTranslations("hero");

  // Определяем, десктоп или мобильное устройство
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    setIsDesktop(mql.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Отслеживаем ошибки загрузки видео
  const [mobileVideoError, setMobileVideoError] = useState(false);
  const [desktopLeftVideoError, setDesktopLeftVideoError] = useState(false);
  const [desktopRightVideoError, setDesktopRightVideoError] = useState(false);

  return (
    <section className="relative h-screen w-full bg-[#121212] overflow-hidden">
      {/* Видео на весь экран — без скролл-анимации */}
      <div className="absolute inset-0">
        {/* Мобильное видео — одно на всю ширину */}
        {!isDesktop && (
          <>
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
              onError={() => setMobileVideoError(true)}
              onLoadedData={() => setMobileVideoError(false)}
            >
              <source src="/hero-video1.mp4" type="video/mp4" />
            </video>
            {mobileVideoError && (
              <Image
                src="/background-hero.png"
                alt="Hero background"
                fill
                className="absolute inset-0 h-full w-full object-cover"
                priority
              />
            )}
          </>
        )}

        {/* Десктопное видео — два вертикальных рядом на весь экран */}
        {isDesktop && (
          <div className="absolute inset-0 flex">
            <div className="relative w-1/2 h-full overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 h-full w-full object-cover"
                onError={() => setDesktopLeftVideoError(true)}
                onLoadedData={() => setDesktopLeftVideoError(false)}
              >
                <source src="/hero-video1.mp4" type="video/mp4" />
              </video>
              {desktopLeftVideoError && (
                <Image
                  src="/background-hero.png"
                  alt="Hero background"
                  fill
                  className="absolute inset-0 h-full w-full object-cover"
                  priority
                />
              )}
            </div>
            <div className="relative w-1/2 h-full overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                className="absolute inset-0 h-full w-full object-cover"
                onError={() => setDesktopRightVideoError(true)}
                onLoadedData={() => setDesktopRightVideoError(false)}
              >
                <source src="/hero-video2.mp4" type="video/mp4" />
              </video>
              {desktopRightVideoError && (
                <Image
                  src="/background-hero.png"
                  alt="Hero background"
                  fill
                  className="absolute inset-0 h-full w-full object-cover"
                  priority
                />
              )}
            </div>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      {/* Headline — над кнопками */}
      <div className="absolute z-10 inset-x-0 text-center px-4" style={{ bottom: "160px" }}>
        <h1 className="font-heading text-4xl uppercase leading-[1.1] tracking-[0.1em] text-[#fffdf9] md:text-6xl md:tracking-[0.15em] lg:text-[72px] [text-shadow:0_2px_16px_rgba(0,0,0,0.7)]">
          {t("headline")}
        </h1>
      </div>

      {/* Кнопки */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-row items-center gap-3 md:bottom-12 md:gap-6 w-full max-w-md px-4">
        <Link
          href="/menu"
          className="group relative overflow-hidden px-4 py-2 md:px-8 md:py-3.5 transition-all duration-300 flex-1 min-w-0 flex items-center justify-center outline outline-1 outline-white/10 outline-offset-[3px] border-[1.5px] border-white/20 hover:border-[#d4af37]/60"
        >
          <div className="absolute inset-0 border border-white/10 group-hover:border-[#d4af37]/30" />
          <span className="relative z-10 font-sans text-[11px] md:text-xs font-semibold uppercase tracking-[0.15em] text-white group-hover:text-[#d4af37] [text-shadow:0_1px_8px_rgba(0,0,0,0.6)] transition-colors duration-300 whitespace-nowrap">
            {t("btnMenu")}
          </span>
        </Link>
        <Link
          href="/book"
          className="group relative overflow-hidden px-4 py-2 md:px-8 md:py-3.5 transition-all duration-300 flex-1 min-w-0 flex items-center justify-center outline outline-1 outline-white/10 outline-offset-[3px] border-[1.5px] border-white/20 hover:border-[#d4af37]/60"
        >
          <div className="absolute inset-0 border border-white/10 group-hover:border-[#d4af37]/30" />
          <span className="relative z-10 font-sans text-[11px] md:text-xs font-semibold uppercase tracking-[0.15em] text-white group-hover:text-[#d4af37] [text-shadow:0_1px_8px_rgba(0,0,0,0.6)] transition-colors duration-300 whitespace-nowrap">
            {t("btnBook")}
          </span>
        </Link>
      </div>
    </section>
  );
}