"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import type { Category, Dish } from "@/types/menu";
import { useCartStore } from "@/store/useCartStore";
import { useCartUIStore } from "@/store/useCartUIStore";

/* ── PROTOTYPE: Variant B — Asymmetrical Bento ──
   Question: "What should the menu look like?"
   • Step 1: Categories as asymmetric bento grid (varying col/row spans)
   • Step 2: Dishes as elegant table with staggered row animations
   • Glass/ethereal aesthetic: deep backgrounds, blur, subtle glow orbs
   • Button-in-button trailing icons on dish rows
   • GPU-safe scroll-driven entry animations
   ──────────────────────────────────────────── */

type Props = { categories: Category[]; locale: string };

const API = process.env.NEXT_PUBLIC_API_URL;

function normalizeSrc(src: string | null): string | null {
  if (!src) return null;
  if (src.startsWith("http")) return src.replace("http://localhost", "http://127.0.0.1");
  const apiUrl = API || "http://127.0.0.1:8000";
  const base = apiUrl.replace(/\/api\/?$/, "");
  return src.startsWith("/") ? `${base}${src}` : `${base}/${src}`;
}

function DishRowTable({
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
      className="group grid grid-cols-[1fr_auto] md:grid-cols-[1fr_120px_auto] items-center gap-4 md:gap-6 py-4 px-3 transition-all duration-500 border-b border-brand-cream/[0.04] hover:bg-brand-cream/[0.02]"
      style={{
        animationDelay: `${index * 50}ms`,
        animationFillMode: "both",
      }}
    >
      {/* Название + описание */}
      <div className="min-w-0">
        <div className="flex items-baseline gap-3 flex-wrap">
          <h3 className="font-heading text-base sm:text-lg text-brand-cream group-hover:text-brand-gold transition-colors duration-300">
            {dish.title}
          </h3>
          {dish.tags && dish.tags.length > 0 && (
            <div className="flex gap-1">
              {dish.tags
                .filter((t) => t.show_on_card)
                .slice(0, 2)
                .map((tag) => (
                  <span
                    key={tag.id}
                    className="px-1.5 py-px text-[9px] font-medium uppercase tracking-wide rounded-sm"
                    style={{ backgroundColor: tag.color_bg, color: tag.color_text }}
                  >
                    {tag.title}
                  </span>
                ))}
            </div>
          )}
        </div>
        {dish.short_description && (
          <p className="font-sans text-xs text-brand-cream/40 leading-relaxed mt-0.5 line-clamp-1 max-w-lg">
            {dish.short_description}
          </p>
        )}
      </div>

      {/* Цена */}
      <span className="font-sans text-sm font-medium text-brand-cream/80 tabular-nums text-right">
        {dish.price} {currency}
      </span>

      {/* Кнопки — появляются при hover */}
      <div className="flex items-center gap-1.5 opacity-0 -translate-x-2 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:opacity-100 group-hover:translate-x-0 justify-end">
        <button
          onClick={handleAdd}
          className="group/btn flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.08em] px-3 py-1.5 rounded-full border border-brand-cream/30 text-brand-cream/80 hover:bg-brand-cream/10 hover:text-brand-cream transition-all duration-300 active:scale-[0.97] whitespace-nowrap"
        >
          В корзину
          <span className="w-5 h-5 rounded-full bg-brand-cream/[0.08] flex items-center justify-center transition-all duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-px">
            <span className="text-[10px] leading-none">+</span>
          </span>
        </button>
        <button
          onClick={handleOrder}
          className="group/btn2 flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.08em] px-3 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-gold hover:bg-brand-gold/25 transition-all duration-300 active:scale-[0.97] whitespace-nowrap"
        >
          Доставка
          <span className="w-5 h-5 rounded-full bg-brand-gold/20 flex items-center justify-center transition-all duration-300 group-hover/btn2:translate-x-0.5 group-hover/btn2:-translate-y-px">
            <span className="text-[10px] leading-none">↗</span>
          </span>
        </button>
      </div>
    </div>
  );
}

export default function VariantB({ categories, locale }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const backLabel: Record<string, string> = {
    ru: "Назад к категориям",
    en: "Back to categories",
    ky: "Категорияларга кайтуу",
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
          className="font-sans text-sm text-brand-cream/50 hover:text-brand-cream uppercase tracking-[0.15em] mb-10 transition-colors duration-300 inline-flex items-center gap-2"
        >
          <span className="flex items-center justify-center w-4 h-4 text-brand-cream/50 group-hover:text-brand-cream transition-colors duration-300 shrink-0">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 10.5L5.5 7 9 3.5" />
            </svg>
          </span>
          <span>{backLabel[locale] || backLabel.ru}</span>
        </button>

        <div className="mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold mb-4">
            {selectedCategory.title}
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl text-brand-cream mb-4">
            {selectedCategory.title}
          </h2>
          {selectedCategory.description && (
            <p className="font-sans text-base text-brand-cream/50 leading-relaxed max-w-xl">
              {selectedCategory.description}
            </p>
          )}
        </div>

        {/* Таблица блюд в стеклянном контейнере */}
        <div className="rounded-[2.5rem] p-[1px] bg-brand-cream/[0.04] ring-1 ring-brand-cream/[0.06]">
          <div className="rounded-[calc(2.5rem-1px)] bg-brand-dark/40 backdrop-blur-xl p-4 sm:p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
            {selectedCategory.dishes.map((dish, i) => (
              <DishRowTable key={dish.id} dish={dish} locale={locale} index={i} />
            ))}
            {selectedCategory.dishes.length === 0 && (
              <p className="text-brand-cream/30 text-center py-16 font-sans">
                В этой категории пока нет блюд
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── Шаг 1: Bento-сетка категорий ──
  return (
    <div>
      {/* Eyebrow tag */}
      <div className="text-center mb-6">
        <div className="inline-block px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">
          Dastorkon
        </div>
      </div>

      {/* Заголовок */}
      <h2 className="font-heading text-5xl sm:text-6xl text-brand-cream text-center mb-4 tracking-tight">
        {locale === "en" ? "Menu" : locale === "ky" ? "Меню" : "Меню"}
      </h2>
      <p className="font-sans text-sm text-brand-cream/30 text-center mb-16 max-w-md mx-auto leading-relaxed">
        {locale === "en"
          ? "Discover our carefully curated selection"
          : locale === "ky"
            ? "Биздин тандоолорду изилдеңиз"
            : "Откройте для себя тщательно подобранное меню"}
      </p>

      {/* Asymmetrical Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
        {categoriesWithIcons.map((cat, idx) => {
          // Детерминированно распределяем spans
          const isWide = idx % 3 === 0;
          const isTall = idx % 4 === 1;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat)}
              className={`group text-left w-full relative ${
                isWide ? "md:col-span-2" : "md:col-span-1"
              } ${isTall ? "md:row-span-2" : "md:row-span-1"}`}
              style={{
                animationDelay: `${idx * 80}ms`,
                animationFillMode: "both",
              }}
            >
              {/* Double-bezel glass card */}
              <div className="h-full rounded-[2rem] p-1.5 bg-brand-cream/[0.02] ring-1 ring-brand-cream/[0.04] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-brand-cream/[0.04] group-hover:ring-brand-cream/[0.08]">
                <div className="relative h-full rounded-[calc(2rem-0.375rem)] overflow-hidden bg-brand-dark/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]">
                  {/* Фоновое изображение */}
                  {cat.normalizedIcon ? (
                    <Image
                      src={cat.normalizedIcon}
                      alt={cat.title}
                      fill
                      className="object-cover transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105 group-hover:brightness-110"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-brand-cream/10 font-heading text-7xl">
                      {cat.title.charAt(0)}
                    </div>
                  )}

                  {/* Overlay градиент */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/30 to-transparent pointer-events-none" />

                  {/* Текст поверх */}
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <h3 className="font-heading text-xl sm:text-2xl text-brand-cream mb-1 group-hover:text-brand-gold transition-colors duration-300">
                      {cat.title}
                    </h3>
                    {cat.description && (
                      <p className="font-sans text-xs text-brand-cream/60 line-clamp-2 mb-3">
                        {cat.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-brand-gold/50 group-hover:text-brand-gold transition-colors duration-300">
                      <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold">
                        {cat.dishes.length}{" "}
                        {locale === "en" ? "dishes" : locale === "ky" ? "тамак" : "блюд"}
                      </span>
                      <span className="flex items-center justify-center w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 3.5l3.5 3.5L5 10.5" />
                        </svg>
                      </span>
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