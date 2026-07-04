"use client";

import { useEffect, useState, useRef } from "react";

type Props = {
  type: "burgundy" | "parchment";
};

export default function OrnamentLines({ type }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const calculateOffset = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        // Вычисляем статичную глобальную координату Y данной секции
        const absoluteTop = rect.top + scrollTop;
        
        // Передаем инвертированное значение напрямую в стейт
        setOffset(-absoluteTop);
      }
    };

    calculateOffset();
    
    // Подстраховка на случай ленивой отрисовки картинок/шрифтов
    const timer = setTimeout(calculateOffset, 100);

    window.addEventListener("resize", calculateOffset);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateOffset);
    };
  }, []);

  const styleClass = type === "burgundy" ? "ornament-style-burgundy" : "ornament-style-parchment";

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-40">
      <div 
        className={`ornament-line ornament-line-left ${styleClass}`} 
        style={{ backgroundPositionY: `${offset}px` }}
      />
      <div 
        className={`ornament-line ornament-line-right ${styleClass}`} 
        style={{ backgroundPositionY: `${offset}px` }}
      />
    </div>
  );
}