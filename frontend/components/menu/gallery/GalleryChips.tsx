"use client";

import type { Category, Dish, Tag } from "@/types/menu";
import { useMemo } from "react";

type Props = {
  categories: Category[];
  activeCategoryId: number | null;
  activeTagId: number | null;
  allDishes: Dish[];
  onChangeCategory: (id: number | null) => void;
  onChangeTag: (id: number | null) => void;
};

export default function GalleryChips({
  categories,
  activeCategoryId,
  activeTagId,
  allDishes,
  onChangeCategory,
  onChangeTag,
}: Props) {
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

  return (
    <div className="sticky top-20 z-40 mb-8">
      {/* Стеклянная подложка */}
      <div className="backdrop-blur-md bg-brand-cream/80 border border-brand-dark/10 rounded-full px-2 py-2 shadow-sm">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
          {/* Кнопка «Всё меню» */}
          <button
            type="button"
            onClick={() => {
              onChangeCategory(null);
              onChangeTag(null);
            }}
            className={`shrink-0 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase rounded-full transition-all whitespace-nowrap ${
              activeCategoryId === null
                ? "bg-brand-dark text-brand-cream shadow-md"
                : "text-brand-dark/60 hover:text-brand-dark hover:bg-brand-dark/5"
            }`}
          >
            Всё меню
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
                className={`shrink-0 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase rounded-full transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-brand-dark text-brand-cream shadow-md"
                    : "text-brand-dark/60 hover:text-brand-dark hover:bg-brand-dark/5"
                }`}
              >
                {cat.title}
              </button>
            );
          })}

          {/* Разделитель для тегов (только если есть теги) */}
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
                className="shrink-0 px-3 py-1.5 text-[10px] font-semibold tracking-wide uppercase rounded-full transition-all whitespace-nowrap border"
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
    </div>
  );
}