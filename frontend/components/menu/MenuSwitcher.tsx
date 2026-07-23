"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import Image from "next/image";

export default function MenuSwitcher() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = (searchParams.get("variant") || "A") as "A" | "D";

  const toggle = useCallback(() => {
    const next = current === "A" ? "D" : "A";
    const params = new URLSearchParams(searchParams.toString());
    params.set("variant", next);
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [current, router, searchParams]);

  return (
    <div className="flex flex-col items-center gap-2 mb-6">
      <button
        onClick={toggle}
        className="relative h-16 sm:h-20 w-48 sm:w-64 block cursor-pointer"
        aria-label="Toggle layout variant"
      >
        <Image
          src="/menu.png"
          alt="Menu"
          fill
          className="object-contain object-center"
          priority
        />
      </button>

      <span className="font-sans text-sm sm:text-base tracking-[0.2em] uppercase text-brand-dark">
        Dastorkon
      </span>
    </div>
  );
}