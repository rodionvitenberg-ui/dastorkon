"use client";

export default function DishPlaceholder() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-cream overflow-hidden">
      {/* Outer border */}
      <div className="absolute inset-0 border border-brand-dark/10 pointer-events-none" />
      {/* Inner border */}
      <div className="absolute inset-[3px] border border-brand-dark/10 pointer-events-none" />

      <svg
        viewBox="0 0 200 180"
        className="w-3/5 h-auto max-w-[100px] opacity-40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Пиала / тарелка */}
        <ellipse cx="100" cy="100" rx="70" ry="20" stroke="#2B1E17" strokeWidth="1.2" />
        <path
          d="M30 100 C30 140, 170 140, 170 100"
          stroke="#2B1E17"
          strokeWidth="1.2"
          fill="none"
        />
        <ellipse cx="100" cy="100" rx="60" ry="16" stroke="#2B1E17" strokeWidth="0.6" fill="none" />

        {/* Этнический узор: ромб по центру */}
        <polygon
          points="100,58 112,78 100,98 88,78"
          stroke="#2B1E17"
          strokeWidth="0.8"
          fill="none"
        />
        <circle cx="100" cy="78" r="3" fill="#2B1E17" opacity="0.5" />

        {/* Малые ромбы по сторонам */}
        <polygon points="72,78 78,84 72,90 66,84" stroke="#2B1E17" strokeWidth="0.6" fill="none" />
        <polygon points="128,78 134,84 128,90 122,84" stroke="#2B1E17" strokeWidth="0.6" fill="none" />

        {/* Орнамент по краю тарелки (зигзаг) */}
        <path
          d="M42 100 L52 96 L62 100 L72 96 L82 100 L92 96 L102 100 L112 96 L122 100 L132 96 L142 100 L152 96 L158 100"
          stroke="#2B1E17"
          strokeWidth="0.6"
          opacity="0.5"
        />

        {/* Восходящий узор от тарелки вверх (декор) */}
        <path
          d="M70 120 C70 132, 130 132, 130 120"
          stroke="#2B1E17"
          strokeWidth="0.5"
          opacity="0.3"
          fill="none"
        />
      </svg>

      <span className="mt-2 font-sans text-[10px] uppercase tracking-[0.15em] text-brand-dark/25 select-none">
        Нет фото
      </span>
    </div>
  );
}