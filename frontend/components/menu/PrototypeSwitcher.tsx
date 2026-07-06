"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

const VARIANTS = ["A", "D"] as const;
type Variant = (typeof VARIANTS)[number];

const LABELS: Record<Variant, string> = {
  A: "Editorial Split",
  D: "Image Gallery",
};

export default function PrototypeSwitcher() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = (searchParams.get("variant") || "A") as Variant;

  const goTo = useCallback(
    (v: Variant) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("variant", v);
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const prev = useCallback(() => {
    const idx = VARIANTS.indexOf(current);
    const next = VARIANTS[(idx - 1 + VARIANTS.length) % VARIANTS.length];
    goTo(next);
  }, [current, goTo]);

  const next = useCallback(() => {
    const idx = VARIANTS.indexOf(current);
    const nextV = VARIANTS[(idx + 1) % VARIANTS.length];
    goTo(nextV);
  }, [current, goTo]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement)?.isContentEditable) {
        return;
      }
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 bg-brand-dark/90 backdrop-blur-md text-brand-cream rounded-full px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-brand-cream/10 select-none">
      <button
        onClick={prev}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-brand-cream/10 transition-colors text-brand-cream/70 hover:text-brand-cream"
        aria-label="Previous variant"
      >
        ←
      </button>

      <span className="text-xs font-sans tracking-[0.15em] uppercase whitespace-nowrap min-w-[160px] text-center">
        <span className="text-brand-gold font-bold">{current}</span>
        <span className="text-brand-cream/50 mx-2">—</span>
        <span className="text-brand-cream/80">{LABELS[current]}</span>
      </span>

      <button
        onClick={next}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-brand-cream/10 transition-colors text-brand-cream/70 hover:text-brand-cream"
        aria-label="Next variant"
      >
        →
      </button>
    </div>
  );
}