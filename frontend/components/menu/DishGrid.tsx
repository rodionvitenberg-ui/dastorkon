"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import type { Dish } from "@/types/menu";
import DishCard from "./DishCard";

const API = process.env.NEXT_PUBLIC_API_URL;

type Props = {
  categoryId: number;
  initialDishes: Dish[];
  initialPage?: number;
  pageSize?: number;
  locale: "ru" | "en" | "ky";
  activeTag: number | null; // 🔥 добавили
};

export default function DishGrid({
  categoryId,
  initialDishes,
  initialPage = 1,
  pageSize = 8,
  locale,
  activeTag
}: Props) {
  const [dishes, setDishes] = useState<Dish[]>(initialDishes || []);
  const [page, setPage] = useState<number>(
    initialDishes && initialDishes.length > 0 ? initialPage : 0
  );
  const [loading, setLoading] = useState(false);

  const [hasMore, setHasMore] = useState(
    initialDishes ? initialDishes.length >= pageSize : true
  );

  const observerRef = useRef<HTMLDivElement | null>(null);

  // 🔥 Сброс блюд при смене категории или тега
  useEffect(() => {
    setDishes(initialDishes || []);
    setPage(initialPage);
    setHasMore(initialDishes.length >= pageSize);
  }, [categoryId, activeTag, initialDishes, initialPage, pageSize]);

  // 🔥 Фильтрация блюд по тегу
  const filteredDishes = activeTag
    ? dishes.filter((d) => d.tags?.some((t) => t.id === activeTag))
    : dishes;

  const loadNext = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const nextPage = page + 1;
      const url = `${API}/dishes/?category=${categoryId}&page=${nextPage}&page_size=${pageSize}`;

      const headers: Record<string, string> = {
        "Accept-Language": locale
      };

      const res = await fetch(url, { headers });

      if (!res.ok) {
        setHasMore(false);
        return;
      }

      const data = await res.json();
      const nextItems = Array.isArray(data.results)
        ? data.results
        : Array.isArray(data)
        ? data
        : [];

      if (nextItems.length === 0) {
        setHasMore(false);
        return;
      }

      const itemsWithAnimation = nextItems.map((item: any) => ({
        ...item,
        _fadeIn: true
      }));

      setDishes((prev) => [...prev, ...itemsWithAnimation]);
      setPage(nextPage);

      if (data.next === null || nextItems.length < pageSize) {
        setHasMore(false);
      }
    } catch (e) {
      console.error("Failed to load next dishes", e);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [categoryId, page, pageSize, loading, hasMore, locale]);

  useEffect(() => {
    if (!observerRef.current || !hasMore) return;

    const el = observerRef.current;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasMore && !loading) {
            loadNext();
          }
        });
      },
      { rootMargin: "200px" }
    );

    io.observe(el);

    return () => io.disconnect();
  }, [loadNext, hasMore, loading]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-12 items-start">
        {filteredDishes.map((d) => (
          <div
            key={`${categoryId}-${d.id}`}
            className={`transition-opacity duration-700 ${
              (d as any)._fadeIn ? "opacity-0 animate-fadeIn" : "opacity-100"
            }`}
          >
            <DishCard dish={d} locale={locale} />
          </div>
        ))}
      </div>

      {hasMore && (
        <div
          ref={observerRef}
          className="h-10 w-full flex items-center justify-center mt-8"
        >
          {loading && (
            <span className="text-sm text-brand-dark/50 font-sans">
              Загрузка...
            </span>
          )}
        </div>
      )}
    </>
  );
}