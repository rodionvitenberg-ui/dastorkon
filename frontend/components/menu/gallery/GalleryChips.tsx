"use client";

import { useState, useMemo, useRef } from "react";
import { useTranslations } from "next-intl";
import type { Category, Dish, Tag } from "@/types/menu";
import HorizontalScrollbar from "@/components/ui/HorizontalScrollbar";

type Props = {
  categories: Category[];
  activeCategoryId: number | null;
  activeTagId: number | null;
  allDishes: Dish[];
  onChangeCategory: (id: number | null) => void;
  onChangeTag: (id: number | null) => void;
  onSearch: (query: string) => void;
};

export default function GalleryChips({
  categories,
  activeCategoryId,
  activeTagId,
  allDishes,
  onChangeCategory,
  onChangeTag,
  onSearch,
}: Props) {
  const t = useTranslations("menuGallery");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const chipsContainerRef = useRef<HTMLDivElement>(null);

  // Собираем теги, доступные в выбранной категории (или во всех)
  const availableTags: Tag[] = useMemo(() => {
    const dishes =
      activeCategoryId === null
        ? allDishes
        : allDishes.filter(
            (d) =>
              categories.find((c) => c.id === activeCategoryId)?.dishes.some(
                (cd) => cd.id === d.id
              )
          );

    const map = new Map<number, Tag>();
    dishes.forEach((d) =>
      d.tags
        ?.filter((t) => t.show_on_card)
        .forEach((t) => map.set(t.id, t))
    );
    return Array.from(map.values());
  }, [allDishes, categories, activeCategoryId]);

  function handleSearchChange(value: string) {
    setSearchQuery(value);
    onSearch(value);
  }

  function handleToggleSearch() {
    if (searchOpen) {
      // Закрываем поиск — сбрасываем
      setSearchOpen(false);
      setSearchQuery("");
      onSearch("");
    } else {
      setSearchOpen(true);
    }
  }

  return (
    <div className="sticky top-20 z-40 mb-8">
      {/* Стеклянная подложка */}
      <div className="relative backdrop-blur-md bg-brand-cream/80 px-2 py-2 shadow-sm">
        {/* Outer border */}
        <div className="absolute inset-0 border border-brand-dark/10 pointer-events-none" />
        {/* Inner border */}
        <div className="absolute inset-[3px] border border-brand-dark/10 pointer-events-none" />
        <div className="relative z-10 flex items-center gap-1.5">
          {/* Кнопка поиска (лупа) */}
          <button
            type="button"
            onClick={handleToggleSearch}
            className={`shrink-0 w-8 h-8 flex items-center justify-center text-brand-dark/60 hover:text-brand-dark transition-colors ${
              searchOpen ? "text-brand-dark" : ""
            }`}
            aria-label={searchOpen ? "Close search" : "Search"}
          >
            {searchOpen ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            )}
          </button>

          {/* Десктопный поиск: расширяется вправо */}
          <div
            className={`hidden md:block overflow-hidden transition-all duration-300 ${
              searchOpen ? "w-48 opacity-100" : "w-0 opacity-0"
            }`}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full bg-transparent border-b border-brand-dark/20 pb-0.5 text-xs font-sans text-brand-dark placeholder:text-brand-dark/30 outline-none"
            />
          </div>

          {/* Мобильный поиск: при открытии заменяет чипы */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ${
              searchOpen ? "w-auto flex-1 opacity-100" : "w-0 opacity-0"
            }`}
          >
            {searchOpen && (
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="w-full bg-transparent border-b border-brand-dark/20 pb-0.5 text-xs font-sans text-brand-dark placeholder:text-brand-dark/30 outline-none"
                autoFocus
              />
            )}
          </div>

          {/* Чипы: на мобилке скрываются при открытом поиске; на десктопе flex-1 + overflow-x-auto */}
          <div
            ref={chipsContainerRef}
            className={`overflow-x-auto scrollbar-hide ${
              searchOpen ? "hidden md:flex" : "flex"
            } flex-1 min-w-0 items-center gap-1.5`}
          >
            <span className="w-px h-4 bg-brand-dark/15 shrink-0" />

            {/* Кнопка «Всё меню» */}
            <button
              type="button"
              onClick={() => {
                onChangeCategory(null);
                onChangeTag(null);
              }}
              className={`shrink-0 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase transition-all whitespace-nowrap border border-transparent ${
                activeCategoryId === null
                  ? "bg-brand-dark text-brand-cream shadow-md"
                  : "text-brand-dark/60 hover:text-brand-dark hover:bg-brand-dark/5"
              }`}
            >
              {t("allMenu")}
            </button>

            {/* Разделитель */}
            <span className="w-px h-4 bg-brand-dark/15 shrink-0" />

            {/* Категории */}
            {categories.map((cat) => {
              const isActive = activeCategoryId === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    onChangeCategory(cat.id);
                    onChangeTag(null);
                  }}
                  className={`shrink-0 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase transition-all whitespace-nowrap border border-transparent ${
                    isActive
                      ? "bg-brand-dark text-brand-cream shadow-md"
                      : "text-brand-dark/60 hover:text-brand-dark hover:bg-brand-dark/5"
                  }`}
                >
                  {cat.title}
                </button>
              );
            })}

            {/* Разделитель для тегов */}
            {availableTags.length > 0 && (
              <span className="w-px h-4 bg-brand-dark/15 shrink-0" />
            )}

            {/* Теги */}
            {availableTags.map((tag) => {
              const isActive = activeTagId === tag.id;
              return (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => onChangeTag(isActive ? null : tag.id)}
                  className="shrink-0 px-3 py-1.5 text-[10px] font-semibold tracking-wide uppercase transition-all whitespace-nowrap border"
                  style={{
                    backgroundColor: isActive ? tag.color_bg : "transparent",
                    color: isActive ? tag.color_text : tag.color_bg,
                    borderColor: tag.color_bg,
                    opacity: isActive ? 1 : 0.7,
                  }}
                >
                  {tag.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Кастомный скроллбар (только на десктопе) */}
        <HorizontalScrollbar containerRef={chipsContainerRef} />
      </div>
    </div>
  );
}