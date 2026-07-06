"use client";

import dynamic from "next/dynamic";
import type { Category } from "@/types/menu";
import PrototypeSwitcher from "@/components/menu/PrototypeSwitcher";

const VariantA = dynamic(() => import("@/components/menu/VariantA"), { ssr: true });
const VariantD = dynamic(() => import("@/components/menu/VariantD"), { ssr: false });

type Props = {
  categories: Category[];
  locale: string;
  variant: "A" | "D";
};

export default function MenuClient({ categories, locale, variant }: Props) {
  return (
    <>
      {variant === "A" && <VariantA categories={categories} locale={locale} />}
      {variant === "D" && <VariantD categories={categories} locale={locale} />}

      <PrototypeSwitcher />
    </>
  );
}