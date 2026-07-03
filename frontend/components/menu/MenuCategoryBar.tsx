"use client";

import { useRef, useState, useCallback } from "react";
import type { Category } from "@/types/menu";

export default function MenuCategoryBar({
  categories,
  activeCategoryId,
  onChangeCategory,
  allIcon = "/all.svg"
}: {
  categories: Category[];
  activeCategoryId: number | null;
  onChangeCategory: (id: number | null) => void;
  allIcon?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    startXRef.current = e.clientX;
    scrollLeftRef.current = containerRef.current.scrollLeft;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    const dx = e.clientX - startXRef.current;
    containerRef.current.scrollLeft = scrollLeftRef.current - dx;
  }, []);

  const endDrag = useCallback(() => {
    isDraggingRef.current = false;
    setIsDragging(false);
  }, []);

  const handleClickAll = () => onChangeCategory(null);
  const handleClickCategory = (id: number) => onChangeCategory(id);

  return (
    <div className="w-full mb-10 relative">
      <div
        ref={containerRef}
        className={`
          flex gap-6 overflow-x-auto select-none 
          cursor-${isDragging ? "grabbing" : "grab"} pb-2

          /* скрываем скроллбар */
          scrollbar-width-none
          [-ms-overflow-style:none]

          /* fade-mask только справа */
          mask-image-[linear-gradient(to_right,black_85%,transparent)]
          mask-size-full mask-repeat-no-repeat
        `}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none"
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={endDrag}
        onMouseUp={endDrag}
      >
        {/* WebKit скрытие скроллбара */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* === КНОПКА ВСЁ МЕНЮ === */}
        <button
          type="button"
          onClick={handleClickAll}
          className="flex flex-col items-center justify-start w-28 min-w-28"
        >
          <img
            src={allIcon}
            alt="Все меню"
            className={`h-14 w-14 mb-2 transition-opacity ${
              activeCategoryId === null ? "opacity-100" : "opacity-60 hover:opacity-100"
            }`}
          />
          <span
            className={`text-[12px] font-bold uppercase tracking-[0.12em] text-center transition-all ${
              activeCategoryId === null
                ? "text-brand-dark underline underline-offset-4"
                : "text-brand-dark/70 hover:text-brand-dark hover:underline underline-offset-4"
            }`}
          >
            Всё меню
          </span>
        </button>

        {/* === КАТЕГОРИИ === */}
        {categories.map((category) => {
          const isActive = activeCategoryId === category.id;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => handleClickCategory(category.id)}
              className="flex flex-col items-center justify-start w-28 min-w-28"
            >
              <img
                src={category.icon || "/placeholder.svg"}
                alt={category.title}
                className={`h-14 w-14 mb-2 object-contain transition-opacity ${
                  isActive ? "opacity-100" : "opacity-60 hover:opacity-100"
                }`}
              />

              <span
                className={`text-[12px] font-bold uppercase tracking-[0.12em] text-center transition-all ${
                  isActive
                    ? "text-brand-dark underline underline-offset-4"
                    : "text-brand-dark/70 hover:text-brand-dark hover:underline underline-offset-4"
                }`}
              >
                {category.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}