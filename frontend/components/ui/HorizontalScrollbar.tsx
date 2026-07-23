"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type Props = {
  containerRef: React.RefObject<HTMLDivElement | null>;
};

export default function HorizontalScrollbar({ containerRef }: Props) {
  const thumbRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [thumbWidth, setThumbWidth] = useState(0);
  const [thumbLeft, setThumbLeft] = useState(0);
  const [visible, setVisible] = useState(false);

  // ── Пересчёт размеров ползунка ──
  const recalc = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const { scrollWidth, clientWidth, scrollLeft } = el;
    const show = scrollWidth > clientWidth;
    setVisible(show);

    if (show && clientWidth > 0) {
      const trackWidth = clientWidth;
      setThumbWidth(Math.max(30, (clientWidth / scrollWidth) * trackWidth));
      setThumbLeft((scrollLeft / scrollWidth) * trackWidth);
    }
  }, [containerRef]);

  // ── Синхронизация при скролле контейнера ──
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("scroll", recalc, { passive: true });
    return () => el.removeEventListener("scroll", recalc);
  }, [containerRef, recalc]);

  // ── Наблюдение за изменением размера ──
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    recalc();

    const ro = new ResizeObserver(recalc);
    ro.observe(el);
    return () => ro.disconnect();
  }, [containerRef, recalc]);

  // ── Drag-to-scroll ──
  const isDragging = useRef(false);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      isDragging.current = true;

      const startX = e.clientX;
      const startScrollLeft = containerRef.current?.scrollLeft ?? 0;

      const handleMouseMove = (ev: MouseEvent) => {
        if (!isDragging.current || !containerRef.current) return;
        const deltaX = ev.clientX - startX;
        const ratio =
          containerRef.current.scrollWidth /
          containerRef.current.clientWidth;
        containerRef.current.scrollLeft = startScrollLeft + deltaX * ratio;
      };

      const handleMouseUp = () => {
        isDragging.current = false;
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    },
    [containerRef],
  );

  if (!visible) return null;

  return (
    <div
      ref={trackRef}
      className="relative w-full h-[3px] bg-brand-dark/8 mt-2 select-none hidden md:block"
    >
      <div
        ref={thumbRef}
        onMouseDown={handleMouseDown}
        className="absolute top-0 h-full bg-brand-dark/30 hover:bg-brand-dark/50 rounded-full cursor-pointer transition-colors duration-200"
        style={{
          width: thumbWidth,
          transform: `translateX(${thumbLeft}px)`,
        }}
      />
    </div>
  );
}