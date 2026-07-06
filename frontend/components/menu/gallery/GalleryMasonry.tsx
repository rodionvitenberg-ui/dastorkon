"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { Category, Dish } from "@/types/menu";
import GalleryCard from "./GalleryCard";
import GalleryChips from "./GalleryChips";

const API = process.env.NEXT_PUBLIC_API_URL;
const SCROLL_KEY = "galleryScrollY";

type Props = {
  categories: Category[];
  locale: string;
};

export default function GalleryMasonry({
  categories,
  locale,
}: Props) {
  const searchParams = useSearchParams();

  // Инициализация из URL (только при первом рендере и back-навигации)
  const [activeCategoryId, setActiveCategoryIdState] = useState<number | null>(
    () => (searchParams.get("category") !== null ? Number(searchParams.get("category")) : null)
  );
  const [activeTagId, setActiveTagIdState] = useState<number | null>(
    () => (searchParams.get("tag") !== null ? Number(searchParams.get("tag")) : null)
  );

  // Обёртки, синхронизирующие URL через history API (без ререндера Next.js)
  const setActiveCategoryId = useCallback((id: number | null) => {
    setActiveCategoryIdState(id);
    setActiveTagIdState(null); // сброс тега при смене категории

    const params = new URLSearchParams(window.location.search);
    if (id === null) {
      params.delete("category");
      params.delete("tag");
    } else {
      params.set("category", String(id));
      params.delete("tag");
    }
    const qs = params.toString();
    const url = qs ? `?${qs}` : window.location.pathname;
    window.history.replaceState(null, "", url);
  }, []);

  const setActiveTagId = useCallback((id: number | null) => {
    setActiveTagIdState(id);

    const params = new URLSearchParams(window.location.search);
    if (id === null) {
      params.delete("tag");
    } else {
      params.set("tag", String(id));
    }
    const qs = params.toString();
    const url = qs ? `?${qs}` : window.location.pathname;
    window.history.replaceState(null, "", url);
  }, []);

  // Все блюда из всех категорий (для построения полного индекса тегов)
  const allDishes: Dish[] = useMemo(
    () => categories.flatMap((c) => c.dishes),
    [categories]
  );

  // Блюда выбранной категории
  const categoryDishes: Dish[] = useMemo(() => {
    if (activeCategoryId === null) return allDishes;
    const cat = categories.find((c) => c.id === activeCategoryId);
    return cat?.dishes || [];
  }, [activeCategoryId, categories, allDishes]);

  // Поиск
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Фильтрация по тегу + поиск
  const [displayedDishes, setDisplayedDishes] = useState<Dish[]>([]);

  // Синхронизация при смене категории/тега/поиска
  useEffect(() => {
    let filtered = activeTagId
      ? categoryDishes.filter((d) =>
          d.tags?.some((t) => t.id === activeTagId)
        )
      : categoryDishes;

    // Поиск по названию
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          (d.short_description && d.short_description.toLowerCase().includes(q)) ||
          (d.description && d.description.toLowerCase().includes(q))
      );
    }

    setDisplayedDishes(filtered);
  }, [categoryDishes, activeTagId, searchQuery]);

  // Infinite scroll state
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const pageSize = 16;

  // Сброс при смене категории или тега
  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [activeCategoryId, activeTagId]);

  // Load more
  const loadMore = useCallback(async () => {
    if (loading || !hasMore || !activeCategoryId) return;

    setLoading(true);
    try {
      const nextPage = page + 1;
      const url = `${API}/dishes/?category=${activeCategoryId}&page=${nextPage}&page_size=${pageSize}`;

      const headers: Record<string, string> = {
        "Accept-Language": locale,
      };

      const res = await fetch(url, { headers });
      if (!res.ok) {
        setHasMore(false);
        return;
      }

      const data = await res.json();
      const nextItems: Dish[] = Array.isArray(data.results)
        ? data.results
        : Array.isArray(data)
          ? data
          : [];

      if (nextItems.length === 0) {
        setHasMore(false);
        return;
      }

      setDisplayedDishes((prev) => [...prev, ...nextItems]);
      setPage(nextPage);

      if (data.next === null || nextItems.length < pageSize) {
        setHasMore(false);
      }
    } catch (e) {
      console.error("Failed to load more dishes", e);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [activeCategoryId, page, pageSize, loading, hasMore, locale]);

  // IntersectionObserver
  useEffect(() => {
    if (!observerRef.current || !hasMore) return;
    const el = observerRef.current;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasMore && !loading) {
            loadMore();
          }
        });
      },
      { rootMargin: "400px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [loadMore, hasMore, loading]);

  // Восстановление позиции скролла при возврате из lightbox
  useEffect(() => {
    const savedScroll = sessionStorage.getItem(SCROLL_KEY);
    if (savedScroll) {
      const y = Number(savedScroll);
      requestAnimationFrame(() => {
        window.scrollTo(0, y);
      });
      sessionStorage.removeItem(SCROLL_KEY);
    }
  }, []);

  return (
    <div>
      {/* Sticky чипы */}
      <GalleryChips
        categories={categories}
        activeCategoryId={activeCategoryId}
        activeTagId={activeTagId}
        allDishes={allDishes}
        onChangeCategory={setActiveCategoryId}
        onChangeTag={setActiveTagId}
        onSearch={handleSearch}
      />

      {/* Masonry-сетка через CSS columns */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-6">
        {displayedDishes.map((dish, idx) => (
          <GalleryCard
            key={`${activeCategoryId}-${dish.id}-${idx}`}
            dish={dish}
            locale={locale}
          />
        ))}
      </div>

      {/* Infinite scroll сенсор */}
      {hasMore && activeCategoryId !== null && (
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

      {/* Если ничего не найдено по тегу */}
      {displayedDishes.length === 0 && !loading && (
        <div className="text-center py-20">
          <p className="font-sans text-brand-dark/50 text-lg">
            По выбранному тегу блюд не найдено
          </p>
        </div>
      )}
    </div>
  );
}