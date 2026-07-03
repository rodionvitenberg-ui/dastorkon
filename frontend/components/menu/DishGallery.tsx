"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  title: string;
};

export default function DishGallery({ images, title }: Props) {
  // Инициализируем состояние копией нормализованных урлов
  const [galleryImages, setGalleryImages] = useState<string[]>(images);

  if (galleryImages.length === 0) {
    return (
      <div className="relative w-full aspect-[5/4] mb-10 rounded-sm overflow-hidden bg-black/5 flex items-center justify-center text-brand-dark/40">
        Нет изображения
      </div>
    );
  }

  const mainImage = galleryImages[0];
  const thumbnails = galleryImages.slice(1);

  const handleImageSwap = (clickedThumbnailIdx: number) => {
    // Индекс кликнутой картинки в исходном массиве galleryImages равен индексу в thumbnails + 1
    const targetIdx = clickedThumbnailIdx + 1;
    const updatedImages = [...galleryImages];

    // Классический деструктурирующий своп элементов массива
    [updatedImages[0], updatedImages[targetIdx]] = [updatedImages[targetIdx], updatedImages[0]];

    setGalleryImages(updatedImages);
  };

  return (
    <>
      {/* === ГЛАВНОЕ ИЗОБРАЖЕНИЕ === */}
      <div className="relative w-full aspect-[5/4] mb-10 rounded-sm overflow-hidden bg-black/5 shadow-sm">
        <Image
          src={mainImage}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-all duration-500"
        />
      </div>

      {/* === ГАЛЕРЕЯ МИНИАТЮР === */}
      {galleryImages.length > 1 && (
        <div className="flex gap-4 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          {thumbnails.map((img, i) => (
            <div
              key={img} // Используем сам URL как key, чтобы React корректно обрабатывал перемещение нод в DOM
              onClick={() => handleImageSwap(i)}
              className="relative w-32 h-24 rounded-sm overflow-hidden flex-shrink-0 cursor-pointer transition duration-300 hover:opacity-90 border border-transparent hover:border-brand-dark/30 active:scale-95"
            >
              <Image
                src={img}
                alt={`${title} фото ${i + 2}`}
                fill
                sizes="128px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}