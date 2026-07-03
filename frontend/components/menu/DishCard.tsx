"use client";

import Image from "next/image";
import Link from "next/link";
import type { Dish } from "@/types/menu";
import { Badge } from "@/components/ui/badge";

type Props = { dish: Dish; placeholder?: string; locale?: string };

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

export default function DishCard({
  dish,
  placeholder = "/images/placeholder-dish.jpg",
  locale = "ru"
}: Props) {
  const src = getFirstImage(dish) ?? placeholder;
  const alt = dish.title ?? "Dish";

  const currency = locale === "en" ? "SOM" : "СОМ";

  // Фильтруем теги, которые должны отображаться на карточке
  const visibleTags = (dish.tags || []).filter(tag => tag.show_on_card);

  return (
    <Link
      href={`/menu/${dish.id}`}
      className="group flex flex-col w-full cursor-pointer relative"
    >
      <div className="relative w-full aspect-[5/4] overflow-hidden rounded-sm mb-5 bg-black/5 shadow-sm">

        {/* === ТЕГИ В ЛЕВОМ ВЕРХНЕМ УГЛУ === */}
        {visibleTags.length > 0 && (
          <div className="absolute top-2 left-2 z-20 flex gap-1 flex-wrap">
            {visibleTags.map(tag => (
              <Badge
                key={tag.id}
                variant="custom"
                className="px-3 py-1 text-[12px] font-semibold tracking-wide uppercase rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.25)]"
                style={{
                  backgroundColor: tag.color_bg,
                  color: tag.color_text
                }}
              >
                {tag.title}
              </Badge>
            ))}
          </div>
        )}

        <Image
          src={src}
          alt={alt}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="flex justify-between items-baseline mb-2 gap-4">
        <h3 className="font-serif text-xl text-brand-dark leading-tight group-hover:text-brand-dark/80 transition-colors">
          {dish.title}
        </h3>
        <span className="font-sans text-lg font-medium text-brand-dark whitespace-nowrap">
          {dish.price} {currency}
        </span>
      </div>

      <p className="font-sans text-sm font-light text-brand-dark/70 leading-relaxed line-clamp-2">
        {dish.short_description}
      </p>
    </Link>
  );
}