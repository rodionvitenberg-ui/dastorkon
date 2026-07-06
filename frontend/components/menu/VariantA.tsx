"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import type { Category, Dish } from "@/types/menu";
import { useCartStore } from "@/store/useCartStore";
import { useCartUIStore } from "@/store/useCartUIStore";

/* ── PROTOTYPE: Variant A — Editorial Split ──
   Question: "What should the menu look like?"
   • Step 1: Category grid with large images — editorial 2-column layout
   • Step 2: Dish rows — clean text, icon buttons appear on hover
   • Double-bezel cards for categories
   • Thematic SVG icons: basket (корзина), swooping arrow (доставка)
   ────────────────────────────────────────── */

/* ──── Thematic SVG Icons ──── */

/** Basket — exact copy of Header cart icon (woven / shirdak style) */
function BasketIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8l2 12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2l2-12" />
      <path d="M8 8V5a4 4 0 0 1 8 0v3" />
      <path d="M8.5 13l7 0" opacity="0.5" />
      <path d="M8.5 16l7 0" opacity="0.5" />
      <path d="M12 13l0 4" opacity="0.5" />
      <path d="M9.5 13l1.5 4" opacity="0.4" strokeWidth={1} />
      <path d="M14.5 13l-1.5 4" opacity="0.4" strokeWidth={1} />
    </svg>
  );
}

/** Delivery scooter — thin strokes, classic moped silhouette */
function DeliveryIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Rear wheel */}
      <circle cx="7" cy="18" r="2.5" />
      {/* Front wheel */}
      <circle cx="17" cy="18" r="2.5" />
      {/* Frame / footboard */}
      <path d="M6 15h9l1-5H4l1 3" />
      {/* Handlebar stem */}
      <path d="M14 10l2-3" />
      {/* Handlebars */}
      <path d="M13 7h5" />
      {/* Seat hump */}
      <path d="M8 14.5c0-1 1-2 2-2" />
      {/* Delivery box on rear */}
      <rect x="6" y="10" width="4" height="3" rx="0.5" opacity="0.5" />
      {/* Box cross */}
      <path d="M8 10v3M6 11.5h4" opacity="0.3" strokeWidth={1} />
    </svg>
  );
}

/* ──── Helpers ──── */

type Props = { categories: Category[]; locale: string };

const API = process.env.NEXT_PUBLIC_API_URL;

function normalizeSrc(src: string | null): string | null {
  if (!src) return null;
  if (src.startsWith("http")) return src.replace("http://localhost", "http://127.0.0.1");
  const apiUrl = API || "http://127.0.0.1:8000";
  const base = apiUrl.replace(/\/api\/?$/, "");
  return src.startsWith("/") ? `${base}${src}` : `${base}/${src}`;
}

/* ──── DishRow with icon buttons ──── */

function DishRow({
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

  const handleAdd = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      addItem({ id: dish.id, name: dish.title, price: dish.price, quantity: 1 });
    },
    [addItem, dish],
  );

  const handleOrder = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      addItem({ id: dish.id, name: dish.title, price: dish.price, quantity: 1 });
      openCart();
    },
    [addItem, dish, openCart],
  );

  return (
    <div
      className="group relative flex items-center justify-between py-5 px-4 transition-all duration-500 border-b border-brand-dark/8 hover:bg-brand-dark/[0.03] rounded-lg"
      style={{
        animationDelay: `${index * 60}ms`,
        animationFillMode: "both",
      }}
    >
      {/* Левая часть: название + описание */}
      <div className="flex-1 min-w-0 pr-6">
        <h3 className="font-heading text-lg text-brand-dark leading-tight transition-colors duration-300 group-hover:text-brand-red">
          {dish.title}
        </h3>
        {dish.short_description && (
          <p className="font-sans text-sm text-brand-dark/50 leading-relaxed mt-1 line-clamp-2">
            {dish.short_description}
          </p>
        )}

        {/* Теги */}
        {dish.tags && dish.tags.length > 0 && (
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {dish.tags
              .filter((t) => t.show_on_card)
              .map((tag) => (
                <span
                  key={tag.id}
                  className="px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase rounded-sm"
                  style={{ backgroundColor: tag.color_bg, color: tag.color_text }}
                >
                  {tag.title}
                </span>
              ))}
          </div>
        )}
      </div>

      {/* Правая часть: цена + кнопки (выезжают при hover) */}
      <div className="flex items-center gap-4 shrink-0">
        <span className="font-sans text-lg font-medium text-brand-dark whitespace-nowrap tabular-nums min-w-[80px] text-right">
          {dish.price} {currency}
        </span>

        {/* Icon buttons — скрыты, показываются при hover */}
        <div className="flex items-center gap-1.5 opacity-0 -translate-x-2 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:opacity-100 group-hover:translate-x-0">
          {/* В корзину — basket icon */}
          <button
            onClick={handleAdd}
            title={locale === "en" ? "Add to cart" : locale === "ky" ? "Себетке" : "В корзину"}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-brand-dark/20 text-brand-dark/50 hover:text-brand-dark hover:border-brand-dark hover:bg-brand-dark/[0.04] transition-all duration-300 active:scale-[0.94]"
          >
            <BasketIcon />
          </button>

          {/* Доставка — delivery icon */}
          <button
            onClick={handleOrder}
            title={locale === "en" ? "Order delivery" : locale === "ky" ? "Жеткирүү" : "Доставка"}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red/60 hover:text-brand-red hover:border-brand-red hover:bg-brand-red/15 transition-all duration-300 active:scale-[0.94]"
          >
            <DeliveryIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ──── Main VariantA ──── */

export default function VariantA({ categories, locale }: Props) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const titleLabels: Record<string, string> = {
    ru: "Меню",
    en: "Menu",
    ky: "Меню",
  };
  const subtitleLabels: Record<string, string> = {
    ru: "Выберите категорию",
    en: "Choose a category",
    ky: "Категорияны тандаңыз",
  };
  const backLabel: Record<string, string> = {
    ru: "← Назад к категориям",
    en: "← Back to categories",
    ky: "← Категорияларга кайтуу",
  };

  const categoriesWithIcons = useMemo(
    () =>
      categories.map((c) => ({
        ...c,
        normalizedIcon: normalizeSrc(c.icon),
      })),
    [categories],
  );

  const selectedCategory = useMemo(
    () => (selectedCategoryId ? categories.find((c) => c.id === selectedCategoryId) : null),
    [selectedCategoryId, categories],
  );

  // ── Шаг 2: Блюда категории ──
  if (selectedCategory) {
    // Все активные блюда из категории — используем тот же массив, что пришёл с бэкенда
    const dishes = selectedCategory.dishes || [];

    return (
      <div>
        <button
          onClick={() => setSelectedCategoryId(null)}
          className="font-sans text-sm text-brand-dark/60 hover:text-brand-dark uppercase tracking-[0.15em] mb-10 transition-colors duration-300 inline-block"
        >
          {backLabel[locale] || backLabel.ru}
        </button>

        <div className="mb-12">
          <h2 className="font-heading text-4xl sm:text-5xl text-brand-dark mb-3">
            {selectedCategory.title}
          </h2>
          {selectedCategory.description && (
            <p className="font-sans text-base text-brand-dark/60 leading-relaxed max-w-xl">
              {selectedCategory.description}
            </p>
          )}
        </div>

        {/* Double-bezel shell */}
        <div className="rounded-[2rem] p-[2px] bg-brand-dark/[0.04] ring-1 ring-brand-dark/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <div className="rounded-[calc(2rem-2px)] bg-brand-cream/60 backdrop-blur-sm p-6 sm:p-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
            {dishes.length > 0 ? (
              dishes.map((dish, i) => (
                <DishRow key={dish.id} dish={dish} locale={locale} index={i} />
              ))
            ) : (
              <p className="text-brand-dark/40 text-center py-16 font-sans">
                {locale === "en"
                  ? "No dishes in this category yet"
                  : locale === "ky"
                    ? "Бул категорияда тамактар жок"
                    : "В этой категории пока нет блюд"}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── Шаг 1: Категории ──
  return (
    <div>
      <div className="mb-16 text-center">
        <h2 className="font-heading text-3xl sm:text-4xl text-brand-dark mb-3 tracking-wide">
          {titleLabels[locale] || titleLabels.ru}
        </h2>
        <p className="font-sans text-sm tracking-[0.25em] uppercase text-brand-dark/40">
          {subtitleLabels[locale] || subtitleLabels.ru}
        </p>
      </div>

      {/* Сетка категорий: Editorial Split — 2 колонки */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14">
        {categoriesWithIcons.map((cat, idx) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategoryId(cat.id)}
            className="group text-left w-full"
            style={{
              animationDelay: `${idx * 100}ms`,
              animationFillMode: "both",
            }}
          >
            {/* Double-bezel card */}
            <div className="rounded-[2rem] p-1.5 bg-brand-dark/[0.03] ring-1 ring-brand-dark/[0.05] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-brand-dark/[0.06] group-hover:ring-brand-dark/[0.1] shadow-[0_1px_3px_rgba(0,0,0,0.03)] group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
              <div className="rounded-[calc(2rem-0.375rem)] overflow-hidden bg-brand-cream/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
                {/* Изображение категории */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-brand-dark/[0.03]">
                  {cat.normalizedIcon ? (
                    <Image
                      src={cat.normalizedIcon}
                      alt={cat.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-brand-dark/20 font-heading text-5xl">
                      {cat.title.charAt(0)}
                    </div>
                  )}
                  {/* Градиент снизу */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-dark/50 to-transparent pointer-events-none" />
                </div>

                {/* Название категории */}
                <div className="px-6 py-5">
                  <h3 className="font-heading text-2xl sm:text-3xl text-brand-dark group-hover:text-brand-red transition-colors duration-300">
                    {cat.title}
                  </h3>
                  {cat.description && (
                    <p className="font-sans text-sm text-brand-dark/50 mt-2 line-clamp-2">
                      {cat.description}
                    </p>
                  )}
                  <div className="mt-4 flex items-center gap-2 text-brand-red/60 group-hover:text-brand-red transition-colors duration-300">
                    <span className="font-sans text-xs uppercase tracking-[0.2em] font-bold">
                      {cat.dishes.length}{" "}
                      {locale === "en"
                        ? "dishes"
                        : locale === "ky"
                          ? "тамак"
                          : "блюд"}
                    </span>
                    <span className="text-lg leading-none transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}