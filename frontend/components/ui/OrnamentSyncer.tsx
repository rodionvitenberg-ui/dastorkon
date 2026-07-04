"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function OrnamentSyncer() {
  const pathname = usePathname();

  useEffect(() => {
    const sync = () => {
      // Ищем все элементы, где включен наш орнамент
      const elements = document.querySelectorAll(".ornament-burgundy, .ornament-parchment");
      
      elements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        const rect = htmlEl.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        // Находим абсолютную координату Y компонента относительно самого верха сайта
        const absoluteTop = rect.top + scrollTop;
        
        // Передаем её в CSS
        htmlEl.style.setProperty("--ornament-offset", `${absoluteTop}px`);
      });
    };

    // Синхронизируем сразу и чуть позже (когда шрифты и картинки дорендерятся)
    sync();
    const timer = setTimeout(sync, 150);

    window.addEventListener("resize", sync);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", sync);
    };
  }, [pathname]);

  return null;
}