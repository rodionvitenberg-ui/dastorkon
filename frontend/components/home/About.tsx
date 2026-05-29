"use client"; 

import { useRef } from "react";
import Image from "next/image";
import { Link } from "../../i18n/routing";
import { useTranslations } from "next-intl";

export default function About() {
  const tAbout = useTranslations("about");
  const tMenu = useTranslations("menuPreview");
  const tInterior = useTranslations("interior");
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Функция плавной прокрутки карусели ВПЕРЕД
  const scrollNext = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth * 0.75;
      
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  // Функция плавной прокрутки карусели НАЗАД
  const scrollPrev = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth * 0.75;
      
      if (container.scrollLeft <= 10) {
        container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    }
  };

  // Список изображений для карусели
  const interiorImages = [
    "/interior-1.jpg",
    "/interior-2.jpg",
    "/interior-3.jpg",
    "/interior-4.jpg",
    "/interior-5.jpg",
  ];

  return (
    <section id="about" className="relative z-0 w-full overflow-hidden bg-[#F5F2EB]">
      
      {/* СЛОЙ 1: Текстура фона */}
      <div className="absolute inset-0 -z-10 w-full h-full pointer-events-none">
        <Image 
          src="/parchment-bg.jpg"
          alt="Parchment"
          fill
          className="object-cover mix-blend-multiply opacity-[0.45]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(43,30,23,0.015)_100%)]" />
      </div>

      {/* БЛОК 1: КУХНЯ / МЕНЮ */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full border-b border-brand-dark/5">
        
        {/* Картинка кухни */}
        <div className="relative h-[300px] sm:h-[400px] md:h-auto min-h-[350px] md:min-h-[450px] w-full overflow-hidden md:order-last">
          <Image 
            src="/about-cuisine.jpg"
            alt="Cuisine"
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
        
        {/* Текст превью меню */}
        <div className="flex flex-col justify-center px-6 py-12 sm:px-12 md:px-20 lg:px-28 text-brand-dark max-w-2xl justify-self-end w-full">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-brand-gold font-medium">
              {tMenu("subtitle")}
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl uppercase tracking-wide mb-4 md:mb-6">{tMenu("title")}</h2>
          <p className="font-sans text-sm md:text-base leading-relaxed text-brand-dark/80 mb-6 md:mb-8 font-light">{tMenu("description")}</p>
          
          <Link
            href="/menu"
            className="group inline-flex items-center gap-2 font-sans text-xs tracking-[0.15em] uppercase font-semibold text-brand-gold hover:text-brand-red transition-colors w-fit leading-none"
          >
            <span className="translate-y-[1px]">{tMenu("cta")}</span>
            <svg
              className="w-4 h-4 shrink-0 transform translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300"
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

      {/* БЛОК 2: ФИЛОСОФИЯ ИНТЕРЬЕРА */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full border-b border-brand-dark/5">
        
        {/* Картинка интерьера */}
        <div className="relative h-[300px] sm:h-[400px] md:h-auto min-h-[350px] md:min-h-[450px] w-full overflow-hidden">
          <Image 
            src="/about-interior.jpg"
            alt="Interior"
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
        
        {/* Текст описания философии */}
        <div className="flex flex-col justify-center px-6 py-12 sm:px-12 md:px-20 lg:px-28 text-brand-dark max-w-2xl justify-self-start w-full">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-brand-gold font-medium">
              {tAbout("subtitle")}
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl uppercase tracking-wide mb-4 md:mb-6">{tAbout("title")}</h2>
          <p className="font-sans text-sm md:text-base leading-relaxed text-brand-dark/80 mb-6 md:mb-8 font-light">{tAbout("description")}</p>
          
          <Link
            href="/story"
            className="group inline-flex items-center gap-2 font-sans text-xs tracking-[0.15em] uppercase font-semibold text-brand-gold hover:text-brand-red transition-colors w-fit leading-none"
          >
            <span className="translate-y-[1px]">{tAbout("cta")}</span>
            <svg
              className="w-4 h-4 shrink-0 transform translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300"
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

      {/* БЛОК 3: ИНТЕРЬЕР (Карусель) */}
      <div className="max-w-[1440px] mx-auto px-6 py-16 sm:px-12 md:px-20 lg:px-28 xl:px-36">
        
        <div className="max-w-3xl text-brand-dark mb-10">
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-brand-gold font-medium mb-3 block">
            {tInterior("subtitle")}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl uppercase tracking-wide mb-4">
            {tInterior("title")}
          </h2>
          <p className="font-sans text-sm md:text-base leading-relaxed text-brand-dark/80 font-light">
            {tInterior("description")}
          </p>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-2 select-none touch-pan-x"
          style={{ scrollbarWidth: 'none' }}
        >
          {interiorImages.map((src, index) => (
            <div 
              key={index}
              className="relative flex-none w-[280px] sm:w-[320px] md:w-[360px] aspect-[3/4] overflow-hidden rounded-sm snap-start"
            >
              <Image
                src={src}
                alt={`Dastorkon interior photo ${index + 1}`}
                fill
                sizes="(max-w-640px) 280px, (max-w-768px) 320px, 360px"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          ))}
        </div>

        {/* НАВИГАЦИЯ ДЛЯ ДЕСКТОПА */}
        <div className="hidden sm:flex justify-between items-center mt-8">
          
          {/* Левая стрелка — назад */}
          <button 
            onClick={scrollPrev}
            className="group flex items-center justify-center w-12 h-12 rounded-full border border-brand-dark/10 hover:border-brand-gold text-brand-dark hover:text-brand-gold transition-all duration-300 cursor-pointer select-none"
            aria-label="Previous items"
          >
            <svg 
              className="w-5 h-5 transform translate-x-0 group-hover:-translate-x-0.5 transition-transform duration-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 19l-6-6 6-6" />
            </svg>
          </button>

          {/* Правая стрелка — вперед */}
          <button 
            onClick={scrollNext}
            className="group flex items-center justify-center w-12 h-12 rounded-full border border-brand-dark/10 hover:border-brand-gold text-brand-dark hover:text-brand-gold transition-all duration-300 cursor-pointer select-none"
            aria-label="Next items"
          >
            <svg 
              className="w-5 h-5 transform translate-x-0 group-hover:translate-x-0.5 transition-transform duration-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

        </div>

      </div>

    </section>
  );
}