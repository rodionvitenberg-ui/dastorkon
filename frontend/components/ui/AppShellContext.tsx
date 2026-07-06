"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type AppShellContextValue = {
  /** True when header should be in compact mode: #7e2424 bg + logo-2 */
  headerCompact: boolean;
  setHeaderCompact: (value: boolean) => void;
  /** True when hero video has fully expanded (scrollYProgress >= 0.85) */
  heroExpanded: boolean;
  setHeroExpanded: (value: boolean) => void;
  /** True if Hero is mounted on this page */
  hasHero: boolean;
  setHasHero: (value: boolean) => void;
};

const AppShellContext = createContext<AppShellContextValue>({
  headerCompact: false,
  setHeaderCompact: () => {},
  heroExpanded: false,
  setHeroExpanded: () => {},
  hasHero: false,
  setHasHero: () => {},
});

export function AppShellProvider({ children }: { children: ReactNode }) {
  const [headerCompact, setHeaderCompact] = useState(false);
  const [heroExpanded, setHeroExpanded] = useState(false);
  const [hasHero, setHasHero] = useState(false);

  return (
    <AppShellContext.Provider
      value={{
        headerCompact,
        setHeaderCompact,
        heroExpanded,
        setHeroExpanded,
        hasHero,
        setHasHero,
      }}
    >
      {children}
    </AppShellContext.Provider>
  );
}

export function useAppShell() {
  return useContext(AppShellContext);
}