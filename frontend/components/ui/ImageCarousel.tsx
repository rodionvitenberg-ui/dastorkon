"use client";

import { useRef } from "react";
import Image from "next/image";

interface ImageCarouselProps {
  images: { src: string; alt: string }[];
  /** 3/4, 1/1, 16/9 etc. */
  aspectRatio?: string;
  /** aria label for prev button */
  prevAria?: string;
  /** aria label for next button */
  nextAria?: string;
  /** sizes attribute for responsive images */
  sizes?: string;
}

export default function ImageCarousel({
  images,
  aspectRatio = "3/4",
  prevAria = "Previous items",
  nextAria = "Next items",
  sizes = "(max-width: 640px) 280px, (max-width: 768px) 320px, 360px",
}: ImageCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollNext = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.75;

    if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
      container.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scrollPrev = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.75;

    if (container.scrollLeft <= 10) {
      container.scrollTo({ left: container.scrollWidth - container.clientWidth, behavior: "smooth" });
    } else {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div>
      <div
        ref={scrollContainerRef}
        className="flex gap-4 md:gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-2 select-none touch-pan-x"
        style={{ scrollbarWidth: "none" }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="relative flex-none w-[280px] sm:w-[320px] md:w-[360px] overflow-hidden rounded-sm snap-start"
            style={{ aspectRatio }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={sizes}
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"
              aria-hidden="true"
            />
          </div>
        ))}
      </div>

      <div className="hidden sm:flex justify-between items-center mt-8">
        <button
          onClick={scrollPrev}
          className="group flex items-center justify-center w-12 h-12 rounded-full border border-[#374151] text-[#d0d0d0] hover:border-[#fffdf9] hover:text-[#fffdf9] transition-all duration-300 cursor-pointer select-none"
          aria-label={prevAria}
        >
          <svg
            className="w-5 h-5 transform translate-x-0 group-hover:-translate-x-0.5 transition-transform duration-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M15 19l-6-6 6-6" />
          </svg>
        </button>

        <button
          onClick={scrollNext}
          className="group flex items-center justify-center w-12 h-12 rounded-full border border-[#374151] text-[#d0d0d0] hover:border-[#fffdf9] hover:text-[#fffdf9] transition-all duration-300 cursor-pointer select-none"
          aria-label={nextAria}
        >
          <svg
            className="w-5 h-5 transform translate-x-0 group-hover:translate-x-0.5 transition-transform duration-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
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