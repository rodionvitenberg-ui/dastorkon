"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "../../i18n/routing";
import { useAppShell } from "../ui/AppShellContext";

export default function Hero() {
  const t = useTranslations("hero");
  const containerRef = useRef<HTMLDivElement>(null);
  const { setHeroExpanded, setHasHero } = useAppShell();

  // Сообщаем Header'у, что Hero присутствует на этой странице
  useEffect(() => {
    setHasHero(true);
    return () => setHasHero(false);
  }, [setHasHero]);

  // Определяем, десктоп или мобильное устройство
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    setIsDesktop(mql.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress: rawScrollProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const scrollYProgress = useSpring(rawScrollProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // Видео раскрывается (без скруглений в конце)
  // Начальный масштаб видео — чем меньше число, тем сильнее "сжат" экран при старте.
  // Меняйте первый элемент массива [0.65, 1]: 0.65 → сильнее сжат, 0.85 → почти раскрыт.
  const imageScale = useTransform(scrollYProgress, [0, 0.85], [0.65, 1], { clamp: true });
  const shadowOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0], { clamp: true });
  const containerBorderRadius = useTransform(scrollYProgress, [0, 0.85], ["12px", "0px"], { clamp: true });

  // Сообщаем Header'у, раскрылось ли видео
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setHeroExpanded(latest >= 0.85);
  });

  // Цитата: исчезает и больше не возвращается
  const quoteOpacity = useTransform(scrollYProgress, [0, 0.25, 0.3], [1, 0, 0], { clamp: false });
  const quoteY = useTransform(scrollYProgress, [0, 0.25, 0.3], ["0%", "-15%", "-15%"], { clamp: false });

  // Заголовок: появляется и остаётся
  const headlineOpacity = useTransform(scrollYProgress, [0.35, 0.5, 1], [0, 1, 1], { clamp: false });
  const headlineY = useTransform(scrollYProgress, [0.35, 0.5, 1], ["15%", "0%", "0%"], { clamp: false });

  return (
    <section
      ref={containerRef}
      className="relative h-[250vh] w-full bg-[url('/background-hero.png')] bg-cover bg-center bg-no-repeat select-none md:h-[400vh]"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {/* Карточка с видео — скругляется на старте, раскрывается без скруглений */}
        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{ borderRadius: containerBorderRadius }}
        >
          <motion.div
            style={{ scale: imageScale }}
            className="relative h-full w-full"
          >
            {/* Мобильное видео — одно */}
            {!isDesktop && (
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster="/background-hero.png"
                className="absolute inset-0 h-full w-full object-cover"
              >
                <source src="/hero-video1.mp4" type="video/mp4" />
              </video>
            )}

            {/* Десктопное видео — два вертикальных рядом */}
            {isDesktop && (
              <div className="absolute inset-0 flex">
                <div className="relative w-1/2 h-full overflow-hidden">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    poster="/hero-left-poster.png"
                    className="absolute inset-0 h-full w-full object-cover"
                  >
                    <source src="/hero-video1.mp4" type="video/mp4" />
                  </video>
                </div>
                <div className="relative w-1/2 h-full overflow-hidden">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    poster="/hero-right-poster.png"
                    className="absolute inset-0 h-full w-full object-cover"
                  >
                    <source src="/hero-video1.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            )}

            {/* Overlay и тени — одинаковы для всех */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
            <motion.div
              className="absolute inset-0 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
              style={{ opacity: shadowOpacity }}
            />
          </motion.div>
        </motion.div>

        {/* Первая фраза (цитата) */}
        <motion.div
          style={{
            opacity: quoteOpacity,
            y: quoteY,
            visibility: useTransform(scrollYProgress, [0, 0.3], ["visible", "hidden"]),
          }}
          className="absolute z-10 flex max-w-[14rem] md:max-w-4xl flex-col items-center px-4 text-center"
        >
          <p className="font-serif text-base leading-snug tracking-wide text-[#fffdf9] font-light md:text-2xl lg:text-[30px] md:leading-[1.5] [text-shadow:0_2px_16px_rgba(0,0,0,0.7)]">
            &ldquo;{t("quote")}&rdquo;
          </p>
        </motion.div>

        {/* Вторая фраза (заголовок) */}
        <motion.div
          style={{
            opacity: headlineOpacity,
            y: headlineY,
          }}
          className="absolute z-10 flex max-w-5xl flex-col items-center px-4 text-center"
        >
          <h1 className="font-heading text-4xl uppercase leading-[1.1] tracking-[0.1em] text-[#fffdf9] md:text-6xl md:tracking-[0.15em] lg:text-[72px] [text-shadow:0_2px_16px_rgba(0,0,0,0.7)]">
            {t("headline")}
          </h1>
        </motion.div>

        {/* Кнопки (стиль из events) */}
        <div className="absolute bottom-8 z-20 flex flex-row items-center gap-3 md:bottom-12 md:gap-6 md:-translate-x-1">
          <Link
            href="/menu"
            className="group relative overflow-hidden px-4 py-2 md:px-8 md:py-3.5 transition-all duration-300 flex-shrink-0 flex items-center justify-center outline outline-1 outline-white/10 outline-offset-[3px] border-[1.5px] border-white/20 hover:border-[#d4af37]/60"
          >
            <div className="absolute inset-0 border border-white/10 group-hover:border-[#d4af37]/30" />
            <span className="relative z-10 font-sans text-[11px] md:text-xs font-semibold uppercase tracking-[0.15em] text-white group-hover:text-[#d4af37] [text-shadow:0_1px_8px_rgba(0,0,0,0.6)] transition-colors duration-300">
              {t("btnMenu")}
            </span>
          </Link>
          <Link
            href="/book"
            className="group relative overflow-hidden px-4 py-2 md:px-8 md:py-3.5 transition-all duration-300 flex-shrink-0 flex items-center justify-center outline outline-1 outline-white/10 outline-offset-[3px] border-[1.5px] border-white/20 hover:border-[#d4af37]/60"
          >
            <div className="absolute inset-0 border border-white/10 group-hover:border-[#d4af37]/30" />
            <span className="relative z-10 font-sans text-[11px] md:text-xs font-semibold uppercase tracking-[0.15em] text-white group-hover:text-[#d4af37] [text-shadow:0_1px_8px_rgba(0,0,0,0.6)] transition-colors duration-300">
              {t("btnBook")}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}