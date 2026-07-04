"use client";

import Image from "next/image";
import { ReactNode } from "react";

interface SplitSectionProps {
  imageSrc: string;
  imageAlt: string;
  imagePosition: "left" | "right";
  children: ReactNode;
}

export default function SplitSection({
  imageSrc,
  imageAlt,
  imagePosition,
  children,
}: SplitSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full border-b border-[#374151]/50">
      <div
        className={`relative h-[300px] sm:h-[400px] md:h-auto min-h-[350px] md:min-h-[450px] w-full overflow-hidden ${
          imagePosition === "right" ? "md:order-last" : ""
        }`}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>

      <div
        className={`flex flex-col justify-center px-6 py-12 sm:px-12 md:px-20 lg:px-28 max-w-2xl w-full ${
          imagePosition === "right" ? "justify-self-end" : "justify-self-start"
        }`}
      >
        {children}
      </div>
    </div>
  );
}