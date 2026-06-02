// components/menu/DishCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import type { Dish } from "@/types/menu";

type Props = { dish: Dish; placeholder?: string };

function getFirstImage(dish: Dish): string | null {
  // поддержка images[] или отдельных полей
  // @ts-ignore
  if (Array.isArray((dish as any).images) && (dish as any).images.length > 0) {
    const first = (dish as any).images[0];
    if (typeof first === "string") return first;
    if (first && typeof first.image === "string") return first.image;
  }
  // @ts-ignore
  if (typeof (dish as any).image === "string" && (dish as any).image) return (dish as any).image;
  // @ts-ignore
  if (typeof (dish as any).image_2 === "string" && (dish as any).image_2) return (dish as any).image_2;
  // @ts-ignore
  if (typeof (dish as any).image_3 === "string" && (dish as any).image_3) return (dish as any).image_3;
  return null;
}

export default function DishCard({ dish, placeholder = "/images/placeholder-dish.jpg" }: Props) {
  const src = getFirstImage(dish) ?? placeholder;
  const alt = dish.title ?? "Dish";

  return (
    <Link href={`/menu/${dish.id}`} className="group flex flex-col w-full cursor-pointer">
      <div className="relative w-full aspect-[5/4] overflow-hidden rounded-sm mb-5 bg-black/5">
        <Image src={src} alt={alt} fill loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-center transition-transform duration-700 group-hover:scale-105" />
      </div>

      <div className="flex justify-between items-baseline mb-2 gap-4">
        <h3 className="font-serif text-xl text-brand-dark leading-tight">{dish.title}</h3>
        <span className="font-sans text-lg font-medium text-brand-dark">{typeof dish.price === "number" ? `${dish.price}` : dish.price} сом</span>
      </div>

      <p className="font-sans text-sm font-light text-brand-dark/70 leading-relaxed">{dish.short_description}</p>
    </Link>
  );
}
