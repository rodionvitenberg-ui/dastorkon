"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-sm shadow-md hover:bg-white transition"
    >
      <span className="block w-4 h-4 border-l-2 border-b-2 border-brand-dark rotate-45" />
    </button>
  );
}
