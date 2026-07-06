"use client";

import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { Dish } from "@/types/menu";

type Props = {
  dish: Dish;
  locale: string;
};

function normalizeSrc(src: string | null): string | null {
  if (!src) return null;
  if (src.startsWith("http")) {
    return src.replace("http://localhost", "http://127.0.0.1");
  }
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
  const backendBase = apiUrl.replace(/\/api\/?$/, "");
  if (src.startsWith("/")) return `${backendBase}${src}`;
  return `${backendBase}/${src}`;
}

export default function GalleryLightbox({ dish, locale }: Props) {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images: string[] = Array.isArray(dish.images)
    ? dish.images.map((img) => normalizeSrc(img)).filter(Boolean) as string[]
    : [];

  const currency = locale === "en" ? "SOM" : "СОМ";

  const close = useCallback(() => {
    router.back();
  }, [router]);

  // Закрытие по Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight" && images.length > 1) {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }
      if (e.key === "ArrowLeft" && images.length > 1) {
        setCurrentImageIndex(
          (prev) => (prev - 1 + images.length) % images.length
        );
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [close, images.length]);

  // Блокировка скролла на body
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const mainImage = images[currentImageIndex] || "/images/placeholder-dish.jpg";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-brand-dark/90 backdrop-blur-sm"
      onClick={close}
    >
      {/* Модальное окно */}
      <div
        className="relative w-full max-w-4xl max-h-[90vh] mx-4 bg-brand-cream shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Кнопка закрытия */}
        <button
          type="button"
          onClick={close}
          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-brand-dark/80 text-brand-cream hover:bg-brand-dark transition-colors"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Главное изображение */}
        <div className="relative w-full aspect-[4/3] bg-brand-dark/5">
          <Image
            src={mainImage}
            alt={dish.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-contain"
          />

          {/* Навигация: стрелки влево/вправо */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(
                    (prev) => (prev - 1 + images.length) % images.length
                  );
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-brand-cream/80 text-brand-dark hover:bg-brand-cream transition-colors shadow-md"
                aria-label="Previous image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(
                    (prev) => (prev + 1) % images.length
                  );
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-brand-cream/80 text-brand-dark hover:bg-brand-cream transition-colors shadow-md"
                aria-label="Next image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}

          {/* Индикатор изображений */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`block w-2 h-2 rounded-full transition-colors ${
                    i === currentImageIndex
                      ? "bg-brand-dark"
                      : "bg-brand-dark/30"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Миниатюры */}
        {images.length > 1 && (
          <div className="flex gap-2 px-6 pt-4 pb-2 overflow-x-auto scrollbar-hide justify-center">
            {images.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => setCurrentImageIndex(i)}
                className={`relative w-16 h-12 flex-shrink-0 overflow-hidden transition-all ${
                  i === currentImageIndex
                    ? "ring-2 ring-brand-dark opacity-100"
                    : "opacity-50 hover:opacity-80"
                }`}
              >
                <Image
                  src={img}
                  alt={`${dish.title} thumbnail ${i + 1}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Информация о блюде */}
        <div className="px-6 sm:px-10 py-8">
          <h1 className="font-heading text-3xl sm:text-4xl text-brand-dark mb-3 tracking-wide">
            {dish.title}
          </h1>
          <p className="font-sans text-xl font-semibold text-brand-dark mb-5">
            {dish.price} {currency}
          </p>
          <p className="font-sans text-base text-brand-dark/80 leading-relaxed tracking-wide">
            {dish.description || dish.short_description}
          </p>
        </div>
      </div>
    </div>
  );
}