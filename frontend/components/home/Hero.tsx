"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "../../i18n/routing";

/**
 * Hero: poster paints LCP immediately; video mounts after first paint / idle
 * so the ~MB autoplay file never blocks first content.
 */
export default function Hero() {
  const t = useTranslations("hero");

  // false on SSR / first paint — mobile path is the Lighthouse default and safer default
  const [isDesktop, setIsDesktop] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [mobileVideoError, setMobileVideoError] = useState(false);
  const [desktopLeftVideoError, setDesktopLeftVideoError] = useState(false);
  const [desktopRightVideoError, setDesktopRightVideoError] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    const mql = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", onChange);

    // Defer both layout detection and video mount past first paint (poster = LCP).
    const start = () => {
      if (!mounted.current) return;
      setIsDesktop(mql.matches);
      setVideoReady(true);
    };

    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(start, { timeout: 1200 });
    } else {
      timeoutId = setTimeout(start, 200);
    }

    return () => {
      mounted.current = false;
      mql.removeEventListener("change", onChange);
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  // Video elements capture wheel events in Chromium. Forward them to window.
  const handleVideoWheel = (e: React.WheelEvent) => {
    window.scrollBy(0, e.deltaY);
  };

  return (
    <section className="relative min-h-[100dvh] w-full bg-[#121212]">
      {/* Background: poster first (LCP), then video — pointer-events-none prevents video from hijacking scroll wheel */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Always-on poster — priority for LCP, covers both breakpoints */}
        <Image
          src="/hero-poster.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Mobile video — single full-bleed */}
        {!isDesktop && videoReady && (
          <>
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/hero-poster.webp"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ pointerEvents: 'none' }}
              onWheel={handleVideoWheel}
              onError={() => setMobileVideoError(true)}
              onLoadedData={() => setMobileVideoError(false)}
            >
              <source src="/hero-video1.mp4" type="video/mp4" />
            </video>
            {mobileVideoError && (
              <Image
                src="/hero-poster.webp"
                alt="Hero background"
                fill
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
          </>
        )}

        {/* Desktop — two vertical clips side by side */}
        {isDesktop && videoReady && (
          <div className="absolute inset-0 flex">
            <div className="relative w-1/2 h-full overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster="/hero-poster.webp"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ pointerEvents: 'none' }}
                onWheel={handleVideoWheel}
                onError={() => setDesktopLeftVideoError(true)}
                onLoadedData={() => setDesktopLeftVideoError(false)}
              >
                <source src="/hero-video1.mp4" type="video/mp4" />
              </video>
              {desktopLeftVideoError && (
                <Image
                  src="/hero-poster.webp"
                  alt="Hero background"
                  fill
                  className="absolute inset-0 h-full w-full object-cover"
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
                style={{ pointerEvents: 'none' }}
                onWheel={handleVideoWheel}
                onError={() => setDesktopRightVideoError(true)}
                onLoadedData={() => setDesktopRightVideoError(false)}
              >
                <source src="/hero-video2.mp4" type="video/mp4" />
              </video>
              {desktopRightVideoError && (
                <Image
                  src="/hero-poster.webp"
                  alt="Hero background"
                  fill
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
            </div>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      {/* Headline */}
      <div className="absolute z-10 inset-x-0 text-center px-4" style={{ bottom: "160px" }}>
        <h1 className="font-heading text-4xl uppercase leading-[1.1] tracking-[0.1em] text-[#fffdf9] md:text-6xl md:tracking-[0.15em] lg:text-[72px] [text-shadow:0_2px_16px_rgba(0,0,0,0.7)]">
          {t("headline")}
        </h1>
      </div>

      {/* CTAs */}
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
