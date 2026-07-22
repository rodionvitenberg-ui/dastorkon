/**
 * PROTOTYPE — brand CTA buttons matching Hero / Cuisine / About.
 * Dark surface → Hero double-bezel (white outline → gold hover)
 * Light surface → Cuisine double-bezel (dark outline → gold hover)
 */
import type { ReactNode } from "react";
import { Link } from "../../i18n/routing";

type Href = "/menu" | "/book" | "/story" | "/contacts" | "/events";

type BtnProps = {
  href: Href;
  children: ReactNode;
  className?: string;
};

/** Hero-style: for dark / photo backgrounds */
export function HeroBezelLink({ href, children, className = "" }: BtnProps) {
  return (
    <Link
      href={href}
      className={`group relative overflow-hidden px-4 py-2 md:px-8 md:py-3.5 transition-all duration-300 inline-flex items-center justify-center outline outline-1 outline-white/10 outline-offset-[3px] border-[1.5px] border-white/20 hover:border-[#d4af37]/60 ${className}`}
    >
      <div className="absolute inset-0 border border-white/10 group-hover:border-[#d4af37]/30" />
      <span className="relative z-10 font-sans text-[11px] md:text-xs font-semibold uppercase tracking-[0.15em] text-white group-hover:text-[#d4af37] [text-shadow:0_1px_8px_rgba(0,0,0,0.6)] transition-colors duration-300 whitespace-nowrap">
        {children}
      </span>
    </Link>
  );
}

/** Cuisine/About-style: for parchment / cream backgrounds */
export function LightBezelLink({ href, children, className = "" }: BtnProps) {
  return (
    <Link
      href={href}
      className={`group relative overflow-hidden px-5 py-3 md:px-8 md:py-3.5 transition-all duration-300 inline-flex items-center justify-center outline outline-[2px] outline-[#121212]/20 outline-offset-[3px] border-2 border-[#121212]/50 hover:border-[#D4AF37] hover:outline-[#D4AF37]/30 ${className}`}
    >
      <span className="relative z-10 font-sans text-[11px] md:text-xs font-semibold uppercase tracking-[0.15em] text-[#121212] transition-colors duration-300 group-hover:text-[#D4AF37]">
        {children}
      </span>
    </Link>
  );
}
