"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type HeroScrollContextValue = {
  /** True when hero video has fully expanded (scrollYProgress >= 0.85) */
  heroExpanded: boolean;
  /** Called by Hero to report scroll progress */
  setHeroExpanded: (value: boolean) => void;
  /** True if Hero is mounted on this page */
  hasHero: boolean;
  /** Called by Hero on mount/unmount */
  setHasHero: (value: boolean) => void;
};

const HeroScrollContext = createContext<HeroScrollContextValue>({
  heroExpanded: false,
  setHeroExpanded: () => {},
  hasHero: false,
  setHasHero: () => {},
});

export function HeroScrollProvider({ children }: { children: ReactNode }) {
  const [heroExpanded, setHeroExpanded] = useState(false);
  const [hasHero, setHasHero] = useState(false);

  return (
    <HeroScrollContext.Provider value={{ heroExpanded, setHeroExpanded, hasHero, setHasHero }}>
      {children}
    </HeroScrollContext.Provider>
  );
}

export function useHeroScroll() {
  return useContext(HeroScrollContext);
}