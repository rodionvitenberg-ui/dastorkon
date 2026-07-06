"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import type { Category, Dish } from "@/types/menu";
import { useCartStore } from "@/store/useCartStore";
import { useCartUIStore } from "@/store/useCartUIStore";

/* ── PROTOTYPE: Variant C — Minimalist Z-Cascade ──
   Question: "What should the menu look like?"
   • Step 1: Categories as slightly-rotated overlapping cards (Z-axis depth)
   • Step 2: Ultra-minimal dish rows with vast whitespace
   • Noise/film-grain texture overlay
   • Warm cream tones, editorial serif typography
   • Oversized section padding (py-32+)
   • Magnetically-interactive dish rows
   ────────────────────────────────────────── */

type Props = { categories: Category[]; locale: string };

const API = process.env.NEXT_PUBLIC_API_URL;

function normalizeSrc(src: string | null): string | null {
  if (!src) return null;
  if (src.startsWith("http")) return src.replace("http://localhost", "http://127.0.0.1");
  const apiUrl = API || "http://127.0.0.1:8000";
  const base = apiUrl.replace(/\/api\/?$/, "");
  return src.startsWith("/") ? `${base}${src}` : `${base}/${src}`;
}

const ROTATIONS = ["-1.5deg", "2deg", "-0.8deg", "1.2deg", "-2.2deg", "0.5deg", "-1deg", "1.8deg"];

function DishRowMinimal({
  dish,
  locale,
  index,
}: {
  dish: Dish;
  locale: string;
  index: number;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartUIStore((s) => s.openCart);
  const currency = locale === "en" ? "SOM" : "СОМ";

  const handleAdd = useCallback(() => {
    addItem({ id: dish.id, name: dish.title, price: dish.price, quantity: 1 });
  }, [addItem, dish]);

  const handleOrder = useCallback(() => {
    addItem({ id: dish.id, name: dish.title, price: dish.price, quantity: 1 });
    openCart();
  }, [addItem, dish, openCart]);

  return (
    <div
      className="group relative"
      style={{
        animationDelay: `${index * 80}ms`,
        animationFillMode: "both",
      }}
    >
      {/* Тонкий разделитель */}
      <div className="absolute top-0 left-0 right-0 h-px bg-brand-dark/[0.06] group-hover:bg-brand-dark/[0.12] transition-colors duration-500" />

      <div className="flex items-baseline justify-between py-8 sm:py-10 px-0 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
        {/* Название + описание */}
        <div className="flex-1 min-w-0 pr-8 sm:pr-16">
          <div className="flex items-baseline gap-4 flex-wrap">
            <h3 className="font-heading text-xl sm:text-2xl text-brand-dark leading-tight transition-colors duration-300 group-hover:text-brand-red">
              {dish.title}
            </h3>
            {dish.tags && dish.tags.length > 0 && (
              <div className="flex gap-1.5">
                {dish.tags
                  .filter((t) => t.show_on_card)
                  .slice(0, 2)
                  .map((tag) => (
                    <span
                      key={tag.id}
                      className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide rounded-sm opacity-60"
                      style={{ backgroundColor: tag.color_bg, color: tag.color_text }}
                    >
                      {tag.title}
                    </span>
                  ))}
              </div>
            )}
          </div>
          {dish.short_description && (
            <p className="font-sans text-sm text-brand-dark/40 leading-relaxed mt-2 max-w-lg transition-colors duration-300 group-hover:text-brand-dark/60">
              {dish.short_description}
            </p>
          )}
        </div>

        {/* Цена + кнопки */}
        <div className="flex items-center gap-6 shrink-0">
          <span className="font-heading text-xl font-medium text-brand-dark/70 tabular-nums transition-colors duration-300 group-hover:text-brand-dark">
            {dish.price} {currency}
          </span>

          {/* Кнопки — выезжают при hover */}
          <div className="hidden sm:flex items-center gap-3 opacity-0 -translate-x-3 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:opacity-100 group-hover:translate-x-0">
            <button
              onClick={handleAdd}
              className="font-sans text-xs font-bold uppercase tracking-[0.12em] px-5 py-2.5 rounded-full border border-brand-dark/20 text-brand-dark/60 hover:border-brand-dark hover:text-brand-dark transition-all duration-300 active:scale-[0.97] whitespace-nowrap"
            >
              В корзину
            </button>
            <button
              onClick={handleOrder}
              className="font-sans text-xs font-bold uppercase tracking-[0.12em] px-5 py-2.5 rounded-full bg-brand-dark text-brand-cream hover:bg-brand-dark/85 transition-all duration-300 active:scale-[0.97] whitespace-nowrap"
            >
              Доставка
            </button>
          </div>

          {/* Mobile: always-visible compact buttons */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={handleAdd}
              className="font-sans text-[10px] font-bold uppercase tracking-[0.08em] px-3 py-1.5 rounded-full border border-brand-dark/20 text-brand-dark/60 active:scale-[0.97]"
            >
              +
            </button>
            <button
              onClick={handleOrder}
              className="font-sans text-[10px] font-bold uppercase tracking-[0.08em] px-3 py-1.5 rounded-full bg-brand-dark text-brand-cream active:scale-[0.97]"
            >
              ↗
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VariantC({ categories, locale }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const backLabel: Record<string, string> = {
    ru: "← Назад",
    en: "← Back",
    ky: "← Артка",
  };

  const categoriesWithIcons = useMemo(
    () =>
      categories.map((c) => ({
        ...c,
        normalizedIcon: normalizeSrc(c.icon),
      })),
    [categories],
  );

  // ── Шаг 2: Блюда категории ──
  if (selectedCategory) {
    return (
      <div>
        <button
          onClick={() => setSelectedCategory(null)}
          className="font-sans text-xs text-brand-dark/30 hover:text-brand-dark uppercase tracking-[0.2em] mb-16 transition-colors duration-300 inline-block"
        >
          {backLabel[locale] || backLabel.ru}
        </button>

        {/* Название категории — огромный заголовок */}
        <div className="mb-20">
          <h2 className="font-heading text-5xl sm:text-7xl text-brand-dark mb-6 tracking-tight leading-[0.95]">
            {selectedCategory.title}
          </h2>
          {selectedCategory.description && (
            <p className="font-sans text-base text-brand-dark/40 leading-relaxed max-w-xl font-light">
              {selectedCategory.description}
            </p>
          )}
        </div>

        {/* Список блюд — ультра-минимальный */}
        <div className="max-w-3xl">
          {selectedCategory.dishes.map((dish, i) => (
            <DishRowMinimal key={dish.id} dish={dish} locale={locale} index={i} />
          ))}
          {selectedCategory.dishes.length === 0 && (
            <p className="text-brand-dark/20 text-center py-32 font-heading text-2xl">
              —
            </p>
          )}
        </div>

        {/* Огромный отступ снизу */}
        <div className="py-20" />
      </div>
    );
  }

  // ── Шаг 1: Z-Cascade категорий ──
  return (
    <div>
      {/* Минимальный заголовок */}
      <div className="mb-24">
        <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-brand-dark/30 mb-4 text-center">
          Dastorkon
        </p>
        <h2 className="font-heading text-5xl sm:text-7xl text-brand-dark text-center tracking-tight">
          {locale === "en" ? "Menu" : locale === "ky" ? "Меню" : "Меню"}
        </h2>
      </div>

      {/* Z-Cascade: слегка повёрнутые, перекрывающиеся карточки */}
      <div className="space-y-[-3rem] sm:space-y-[-5rem]">
        {categoriesWithIcons.map((cat, idx) => {
          const rotation = ROTATIONS[idx % ROTATIONS.length];

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat)}
              className="group block w-full relative z-[var(--z)] text-left"
              style={{
                ["--z" as string]: categories.length - idx,
                animationDelay: `${idx * 120}ms`,
                animationFillMode: "both",
              }}
            >
              {/* Стикер-карточка с поворотом (desktop) */}
              <div
                className={`
                  md:rotate-[${rotation}]
                  transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]
                  group-hover:rotate-[0deg]
                  md:max-w-lg md:mx-auto
                  group-hover:z-[999]
                  relative
                `}
              >
                {/* Физическая «бумажная» карточка */}
                <div
                  className="
                    rounded-[1.5rem] p-[1px]
                    bg-brand-dark/[0.04] ring-1 ring-brand-dark/[0.04]
                    transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]
                    group-hover:bg-brand-dark/[0.08] group-hover:ring-brand-dark/[0.1]
                    group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]
                    md:hover:scale-[1.02]
                  "
                >
                  <div className="rounded-[calc(1.5rem-1px)] overflow-hidden bg-brand-cream shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
                    {/* Изображение + инфо в одной горизонтальной полосе */}
                    <div className="flex flex-col sm:flex-row">
                      {/* Изображение */}
                      <div className="relative w-full sm:w-48 h-48 sm:h-auto shrink-0 overflow-hidden bg-brand-dark/[0.02]">
                        {cat.normalizedIcon ? (
                          <Image
                            src={cat.normalizedIcon}
                            alt={cat.title}
                            fill
                            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, 192px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-brand-dark/10 font-heading text-6xl">
                            {cat.title.charAt(0)}
                          </div>
                        )}
                      </div>

                      {/* Текст */}
                      <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center">
                        <h3 className="font-heading text-2xl sm:text-3xl text-brand-dark group-hover:text-brand-red transition-colors duration-300 mb-2">
                          {cat.title}
                        </h3>
                        {cat.description && (
                          <p className="font-sans text-sm text-brand-dark/40 line-clamp-2 mb-4 font-light">
                            {cat.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2 text-brand-dark/25 group-hover:text-brand-red/60 transition-colors duration-300">
                          <span className="font-sans text-[10px] uppercase tracking-[0.25em] font-bold">
                            {cat.dishes.length}{" "}
                            {locale === "en" ? "dishes" : locale === "ky" ? "тамак" : "блюд"}
                          </span>
                          <span className="text-lg leading-none transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}