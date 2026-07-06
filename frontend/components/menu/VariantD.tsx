"use client";

import dynamic from "next/dynamic";
import type { Category } from "@/types/menu";

/* ── PROTOTYPE: Variant D — Image Gallery (original) ──
   Question: "What should the menu look like?"
   • Original masonry gallery with dish images
   • Sticky category/tag chips with search
   • Lightbox modal on image click
   • Scroll position restoration
   ────────────────────────────────────────── */

const GalleryMasonry = dynamic(
  () => import("@/components/menu/gallery/GalleryMasonry"),
  { ssr: false },
);

type Props = { categories: Category[]; locale: string };

export default function VariantD({ categories, locale }: Props) {
  return <GalleryMasonry categories={categories} locale={locale} />;
}