"use client";

import { useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { Link } from "../../i18n/routing";
import { useTranslations } from "next-intl";
import { useAppShell } from "../ui/AppShellContext";
import OrnamentLines from "../ui/OrnamentLines";
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
    poster: "/about-cuisine.jpg",
    video: "/hero-video1.mp4",
  },
  {
    key: "book",
    href: "/book",
    poster: "/about-interior.jpg",
    video: "/AQNFbu4gEBVErVQi6hljrG6RDrPdX9IJKn55y8qKxtHqI5w6qN-ljLL4Tm5LPQAvkbv0IBZ6YUHgIPT4HlMb1y-z6YdGq8PngAGap08.mp4",
  },
  {
    key: "events",
    href: "/events",
    poster: "/banq.jpg",
    video: "/hero-video1.mp4",
  },
];

/**
 * Single hover-card with poster → video swap on desktop hover.
 *
 * Mobile: CSS Grid layout — image on top, text plaque overlaps from below via
 * negative margin. No absolute positioning → no collisions, no edge-clipping.
 *
 * Desktop: absolute-positioned overlapping blocks (stable because column width
 * is known inside the 3-col grid).
 */
function HoverCard({ cardKey, data }: { cardKey: string; data: CardData }) {
  const t = useTranslations("aboutCards");
  const card = t.raw(cardKey) as { title: string; description: string; cta: string };
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleEnter = useCallback(() => {
    const vid = videoRef.current;
    if (vid) {
      vid.currentTime = 0;
      vid.play().catch(() => {});
    }
  }, []);

  const handleLeave = useCallback(() => {
    const vid = videoRef.current;
    if (vid) {
      vid.pause();
    }
  }, []);

  return (
    <Link
      href={data.href}
      className="group block relative w-full md:h-auto md:aspect-[3/4] mb-4 md:mb-0"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
    >
      {/* ═══ МОБИЛЬНЫЙ LAYOUT (Grid, без absolute) ═══ */}
      <div className="grid grid-cols-1 grid-rows-[1fr_auto] md:hidden w-full h-full">
        {/* Изображение — занимает всё доступное пространство (row 1) */}
        <div className="relative w-full overflow-hidden bg-[#121212]" style={{ aspectRatio: "2/1" }}>
          <Image
            src={data.poster}
            alt={card.title}
            fill
            sizes="100vw"
            className="object-cover"
          />
          {/* Засвет снизу — мягкий переход к текстовой плашке */}
          <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#ffefcb]/90 to-transparent pointer-events-none" />
        </div>

        {/* Текстовая плашка — overlapping через отрицательный margin */}
        <div className="px-[5px] -mt-10 z-10 w-fit ml-auto mr-[-10px]">
          <div className="bg-[#ffefcb] border-[1.5px] border-[#121212] p-1">
            <div className="border border-[#121212]/40 bg-[#ffefcb] w-full flex flex-col items-center py-3 pl-3 pr-6">
              <h3 className="font-heading text-base tracking-[0.2em] text-[#121212] uppercase mb-2 text-center w-full">
                {card.title}
              </h3>
              <p className="font-serif italic text-[13px] text-[#121212]/80 text-center leading-snug break-words w-full">
                {card.description}
              </p>
              {/* Стрелка */}
              <div className="mt-2 flex justify-end pr-1 w-full">
                <Image
                  src="/icon-arrow-scalable.svg"
                  alt="Arrow"
                  width={60}
                  height={20}
                  className="w-[60px] h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ ДЕСКТОПНЫЙ LAYOUT (absolute, без изменений) ═══ */}
      <div className="hidden md:block absolute inset-0">
        {/* Изображение и Видео */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden bg-[#121212]">
          <video
            ref={videoRef}
            src={data.video}
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <Image
            src={data.poster}
            alt={card.title}
            fill
            sizes="33vw"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
          />
        </div>

        {/* Текстовая плашка — абсолютное позиционирование */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[85%] bg-[#ffefcb] border-[1.5px] border-[#121212] p-1 z-10">
          <div className="border border-[#121212]/40 bg-[#ffefcb] w-full flex flex-col relative overflow-hidden transition-[height] duration-500 h-[125px] group-hover:h-[150px] motion-reduce:transition-none">
            <div className="w-full flex flex-col items-center justify-center shrink-0 h-[115px] px-4 pt-2">
              <h3 className="font-heading text-base md:text-lg tracking-[0.2em] text-[#121212] uppercase mb-2 text-center">
                {card.title}
              </h3>
              <p className="font-serif italic text-[13px] md:text-[14px] text-[#121212]/80 text-center leading-snug">
                {card.description}
              </p>
            </div>

            {/* Стрелка — появляется при наведении, по центру */}
            <div className="absolute bottom-[6px] inset-x-0 w-full flex justify-center shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 motion-reduce:transition-none">
              <Image
                src="/icon-arrow-scalable.svg"
                alt="Arrow"
                width={72}
                height={24}
                className="w-[72px] h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── ВАРИАНТ 1: Журнальная верстка (Split Layout) с растворением ───
function PhilosophyVariant1() {
  const t = useTranslations("about");
  return (
    <div className="relative w-full min-h-[60vh] md:min-h-[75vh] flex flex-col md:flex-row bg-transparent">
      {/* Левая колонка с изображением — абсолютно позиционирована на десктопе, занимает ровно 50% от верха до низа */}
      <div className="relative w-full md:absolute md:inset-y-0 md:left-0 md:w-1/2 h-[50vh] md:h-full order-1 overflow-hidden border-r border-brand-dark/10">
        <div className="relative w-full h-full">
          <Image
            src="/about-cuisine.jpg"
            alt="Philosophy"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Правая колонка с текстом — на десктопе прижата к правому краю */}
      <div className="relative w-full md:w-1/2 md:ml-auto flex items-center justify-center p-8 md:p-12 lg:p-20 order-2 z-10">
        <div className="max-w-xl">
          <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#D4AF37] font-bold block mb-4">
            {t("subtitle")}
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl uppercase tracking-[0.06em] text-[#121212] leading-tight mb-6">
            {t("title")}
          </h2>
          <p className="font-sans text-base md:text-lg leading-[1.8] text-[#121212]/75 font-light mb-10">
            {t("description")}
          </p>
          <Link
            href="/story"
            className="group relative overflow-hidden px-5 py-3 md:px-8 md:py-3.5 transition-all duration-300 inline-flex items-center justify-center outline outline-[2px] outline-[#121212]/20 outline-offset-[3px] border-2 border-[#121212]/50 hover:border-[#D4AF37] hover:outline-[#D4AF37]/30"
          >
            <span className="relative z-10 font-sans text-[11px] md:text-xs font-semibold uppercase tracking-[0.15em] text-[#121212] transition-colors duration-300 group-hover:text-[#D4AF37]">
              {t("cta")}
            </span>
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

  // Сообщаем хедеру, когда About входит в зону видимости
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // About вошёл в зону видимости → компактный хедер
          setHeaderCompact(true);
        } else {
          // About покинул зону видимости.
          // Если секция ушла вверх (скролл вниз) — оставляем компактный (sticky).
          // Если секция ушла вниз (скролл вверх) — возвращаем прозрачный.
          const wentUp = entry.boundingClientRect.top < 0;
          if (!wentUp) {
            setHeaderCompact(false);
          }
        }
      },
      {
        rootMargin: "0px 0px 0px 0px",
        threshold: 0.25,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [setHeaderCompact]);

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className="relative z-0 w-full bg-[#F5F2EB]"
    >
      {/* Орнамент — линии по краям, как на странице контактов */}
      <OrnamentLines type="parchment" />

      {/* Текстура пергамента */}
      <div className="absolute inset-0 -z-0 w-full h-full pointer-events-none" aria-hidden="true">
        <Image
          src="/parchment-bg.jpg"
          alt=""
          fill
          className="object-cover mix-blend-multiply opacity-[0.45]"
        />
      </div>

      {/* ─── СЕКЦИЯ 1: ФИЛОСОФИЯ ─── */}
      <PhilosophyVariant1 />

      {/* Разделитель между секциями */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent relative z-20" />

      {/* ─── СЕКЦИЯ 2: КАРТОЧКИ УСЛУГ ─── */}
      <div className="py-12 md:py-20 relative z-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          {/* Заголовок над карточками */}
          <div className="text-center mb-12 md:mb-16">
            <span className="font-serif text-[14px] md:text-base tracking-[0.15em] text-[#121212]/80 block mb-4">
              {t("cardsSubtitle")}
            </span>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl uppercase tracking-[0.1em] text-[#121212] max-w-3xl mx-auto leading-snug">
              {t("cardsTitle")}
            </h2>
          </div>

          {/* Сетка карточек */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8">
            {CARDS.map((card) => (
              <HoverCard key={card.key} cardKey={card.key} data={card} />
            ))}
          </div>
        </div>
      </div>

      {/* Нижний разделитель секции */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
    </section>
  );
}