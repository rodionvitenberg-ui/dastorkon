"use client";

import { useState, useMemo } from "react";
import MenuCategoryBar from "./MenuCategoryBar";
import DishGrid from "./DishGrid";
import { Badge } from "@/components/ui/badge";
import type { Category, Dish, Tag } from "@/types/menu";

export default function MenuContent({
  categories,
  locale
}: {
  categories: Category[];
  locale: string;
}) {
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [activeTag, setActiveTag] = useState<number | null>(null);

  // Определяем выбранную категорию
  const activeCategory = useMemo(() => {
    if (!activeCategoryId) return null;
    return categories.find((c) => c.id === activeCategoryId) || null;
  }, [activeCategoryId, categories]);

  // Теги, которые реально встречаются в блюдах выбранной категории
  const availableTags: Tag[] = useMemo(() => {
    if (!activeCategory) return [];

    const map = new Map<number, Tag>();

    activeCategory.dishes.forEach((dish: Dish) => {
      dish.tags?.forEach((tag: Tag) => {
        if (tag.show_on_card) {
          map.set(tag.id, tag);
        }
      });
    });

    return Array.from(map.values());
  }, [activeCategory]);

  return (
    <>
      {/* Категории */}
      <MenuCategoryBar
        categories={categories}
        activeCategoryId={activeCategoryId}
        onChangeCategory={(id) => {
          setActiveCategoryId(id);
          setActiveTag(null); // сбрасываем тег при смене категории
        }}
      />

      {/* Теги — только если выбрана категория */}
      {activeCategory && availableTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-6 mb-10">
          {/* Кнопка "Все блюда" */}
          <Badge
            variant="custom"
            className={`px-3 py-1 text-xs font-medium tracking-wide uppercase rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.25)] cursor-pointer ${
              activeTag === null ? "ring-2 ring-brand-gold" : ""
            }`}
            style={{
              backgroundColor: "#E5E5E5",
              color: "#2B1E17"
            }}
            onClick={() => setActiveTag(null)}
          >
            Все блюда
          </Badge>

          {/* Динамические теги */}
          {availableTags.map((tag) => (
            <Badge
              key={tag.id}
              variant="custom"
              className={`px-3 py-1 text-xs font-medium tracking-wide uppercase rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.25)] cursor-pointer ${
                activeTag === tag.id ? "ring-2 ring-brand-gold" : ""
              }`}
              style={{
                backgroundColor: tag.color_bg,
                color: tag.color_text
              }}
              onClick={() => setActiveTag(tag.id)}
            >
              {tag.title}
            </Badge>
          ))}
        </div>
      )}

      {/* Блюда */}
      {activeCategory ? (
        <DishGrid
          categoryId={activeCategory.id}
          initialDishes={activeCategory.dishes}
          initialPage={1}
          pageSize={8}
          locale={locale as any}
          activeTag={activeTag} // 🔥 передаём тег в DishGrid
        />
      ) : (
        // Если категория не выбрана — показываем все категории
        categories.map((category) => (
          <section key={category.id} className="mb-20">
            <h2 className="font-serif text-3xl sm:text-4xl text-brand-dark mb-4 tracking-wide">
              {category.title}
            </h2>

            {category.description && (
              <p className="font-sans text-sm font-light leading-relaxed text-brand-dark/80 max-w-2xl mb-8">
                {category.description}
              </p>
            )}

            <DishGrid
              categoryId={category.id}
              initialDishes={category.dishes}
              initialPage={1}
              pageSize={8}
              locale={locale as any}
              activeTag={null}
            />
          </section>
        ))
      )}
    </>
  );
}
