"use client";

import { Badge } from "@/components/ui/badge";
import type { Dish, Tag } from "@/types/menu";

interface Props {
  dishes: Dish[];
  activeTag: number | null;
  onTagSelect: (tagId: number | null) => void;
}

export default function MenuTagFilter({ dishes, activeTag, onTagSelect }: Props) {
  // Собираем теги из блюд
  const tags: Tag[] = Array.from(
    new Map(
      dishes
        .flatMap(dish => dish.tags)
        .filter(tag => tag.show_on_card)
        .map(tag => [tag.id, tag])
    ).values()
  );

  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-6 mb-4">
      {/* Кнопка "Все блюда категории" */}
      <Badge
        variant="custom"
        className={`px-3 py-1 text-xs font-medium tracking-wide uppercase rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.25)] cursor-pointer ${
          activeTag === null ? "ring-2 ring-brand-gold" : ""
        }`}
        style={{
          backgroundColor: "#E5E5E5",
          color: "#2B1E17"
        }}
        onClick={() => onTagSelect(null)}
      >
        Все блюда
      </Badge>

      {tags.map(tag => (
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
          onClick={() => onTagSelect(tag.id)}
        >
          {tag.title}
        </Badge>
      ))}
    </div>
  );
}
