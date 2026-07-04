"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

/** Extracted interior gallery — originally VariantB Block 3. */
export default function InteriorGallery() {
  const t = useTranslations("interior");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const interiorImages = [
    "/interior-1.jpg",
    "/interior-2.jpg",
    "/interior-3.jpg",
    "/interior-4.jpg",
    "/interior-5.jpg",
  ];

  const scrollNext = () => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      el.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const scrollPrev = () => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    if (el.scrollLeft <= 10) {
      el.scrollTo({ left: el.scrollWidth - el.clientWidth, behavior: "smooth" });
    } else {
      el.scrollBy({ left: -amount, behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 sm:px-12 py-20 md:py-28">
      <div className="mb-14">
        <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#D4AF37] font-bold">
          {t("subtitle")}
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl uppercase tracking-[0.05em] text-[#fffdf9] mt-3 mb-4">
          {t("title")}
        </h2>
        <p className="font-sans text-base md:text-lg leading-relaxed text-[#d0d0d0] max-w-2xl font-light">
          {t("description")}
        </p>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4 select-none touch-pan-x"
        style={{ scrollbarWidth: "none" }}
      >
        {interiorImages.map((src, i) => (
          <div
            key={i}
            className="relative flex-none w-[320px] sm:w-[380px] md:w-[440px] aspect-[4/5] overflow-hidden rounded-sm snap-start group"
          >
            <Image
              src={src}
              alt={`Interior ${i + 1}`}
              fill
              sizes="(max-width: 640px) 320px, (max-width: 768px) 380px, 440px"
              className="object-cover object-center transition-all duration-700 group-hover:scale-105 brightness-[0.7] group-hover:brightness-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-bold">
                0{i + 1}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden sm:flex justify-center items-center gap-4 mt-10">
        <button
          onClick={scrollPrev}
          className="flex items-center justify-center w-11 h-11 rounded-full border border-[#374151] text-[#d0d0d0] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300 cursor-pointer select-none"
          aria-label="Previous"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 19l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={scrollNext}
          className="flex items-center justify-center w-11 h-11 rounded-full border border-[#374151] text-[#d0d0d0] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300 cursor-pointer select-none"
          aria-label="Next"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
      `}</style>
    </div>
  );
}