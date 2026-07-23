"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useCallback } from "react";
import type { Dish } from "@/types/menu";
import DishPlaceholder from "@/components/ui/DishPlaceholder";

type Props = {
  dish: Dish;
  locale?: string;
};

/** Хеш-функция для детерминированного выбора aspect-ratio по id блюда */
function hashId(id: number, seed: number = 0): number {
  let hash = seed;
  const str = String(id);
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash * 31 + char) % 100;
  }
  return hash;
}

const ASPECT_RATIOS = [
  "aspect-[4/5]",
  "aspect-[3/4]",
  "aspect-[1/1]",
  "aspect-[4/5]",
  "aspect-[3/4]",
  "aspect-[5/4]",
];

function getAspectRatio(dishId: number): string {
  const idx = hashId(dishId) % ASPECT_RATIOS.length;
  return ASPECT_RATIOS[idx];
}

function normalizeSrc(src: string | null): string | null {
  if (!src) return null;

  if (src.startsWith("http")) {
    return src.replace("http://localhost", "http://127.0.0.1");
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
  const backendBase = apiUrl.replace(/\/api\/?$/, "");

  if (src.startsWith("/")) {
    return `${backendBase}${src}`;
  }

  return `${backendBase}/${src}`;
}

function getFirstImage(dish: Dish): string | null {
  if (Array.isArray(dish.images) && dish.images.length > 0) {
    return normalizeSrc(dish.images[0]);
  }
  return null;
}

export default function GalleryCard({
  dish,
  locale = "ru",
}: Props) {
  const src = getFirstImage(dish);
  const alt = dish.title ?? "Dish";
  const aspectClass = useMemo(() => getAspectRatio(dish.id), [dish.id]);
  const currency = locale === "en" ? "SOM" : "СОМ";

  const handleClick = useCallback(() => {
    sessionStorage.setItem("galleryScrollY", String(window.scrollY));
  }, []);

  return (
    <Link
      href={`/menu/${dish.id}?from=gallery`}
      onClick={handleClick}
      className="group block break-inside-avoid mb-6 cursor-pointer relative animate-fade-in"
    >
      {/* Фото */}
      <div className={`relative w-full ${aspectClass} overflow-hidden shadow-sm`}>
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <DishPlaceholder />
        )}

        {/* Градиентная плашка снизу */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/40 to-transparent px-4 pt-12 pb-4">
          <h3 className="font-heading text-base sm:text-lg leading-tight text-brand-cream tracking-wide">
            {dish.title}
          </h3>
          <p className="font-sans text-sm font-medium text-brand-cream/90 mt-1">
            {dish.price} {currency}
          </p>
        </div>

        {/* Теги — лёгкие метки в левом верхнем углу */}
        {dish.tags && dish.tags.length > 0 && (
          <div className="absolute top-2 left-2 z-20 flex gap-1 flex-wrap">
            {dish.tags
              .filter((tag) => tag.show_on_card)
              .slice(0, 2)
              .map((tag) => (
                <span
                  key={tag.id}
                  className="px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase rounded-sm"
                  style={{
                    backgroundColor: tag.color_bg,
                    color: tag.color_text,
                  }}
                >
                  {tag.title}
                </span>
              ))}
          </div>
        )}
      </div>
    </Link>
  );
}