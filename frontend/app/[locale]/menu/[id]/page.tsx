import Image from "next/image";
import BackButton from "@/components/BackButton";
import { getDish } from "@/lib/api";
import DishGallery from "@/components/menu/DishGallery";
import OrnamentLines from "@/components/ui/OrnamentLines";

type Props = {
  params: Promise<{ id: string; locale: string }>;
};

function normalizeSrc(src: string | null): string | null {
  if (!src) return null;

  if (src.startsWith("http")) {
    return src.replace("http://localhost", "http://127.0.0.1");
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
  const backendBase = apiUrl.replace(/\/api\/?$/, "");

  if (src.startsWith("/")) {
    return `${backendBase}${src}`;
  }

  return `${backendBase}/${src}`;
}

export default async function DishPage({ params }: Props) {
  const { id, locale } = await params;
  const dish = await getDish(id, locale);

  const images: string[] = Array.isArray(dish.images) ? dish.images : [];

  const normalizedImages = images
    .map((img) => normalizeSrc(img))
    .filter(Boolean) as string[];

  const currency = locale === "en" ? "SOM" : "СОМ";

  return (
    <main className="relative min-h-screen w-full pt-24 pb-32">
      <OrnamentLines type="parchment" />
      
      {/* === АТМОСФЕРНЫЙ ПЕРГАМЕНТНЫЙ ФОН === */}
      <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none">
        <Image 
          src="/parchment-bg.jpg" 
          alt="Parchment Background" 
          fill 
          className="object-cover mix-blend-multiply opacity-[0.45]" 
          priority 
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(43,30,23,0.015)_100%)]" />
      </div>

      {/* Кнопка назад */}
      <div className="absolute top-6 left-6 z-20">
        <BackButton />
      </div>

      <div className="max-w-3xl mx-auto px-6">
        
        {/* === ИНТЕРАКТИВНАЯ ГАЛЕРЕЯ (Главное фото + Своп миниатюр) === */}
        <DishGallery images={normalizedImages} title={dish.title} />

        {/* === НАЗВАНИЕ === */}
        <h1 className="font-heading text-4xl text-brand-dark mb-4 tracking-wide">
          {dish.title}
        </h1>

        {/* === ЦЕНА === */}
        <p className="font-sans text-xl font-medium text-brand-dark mb-6">
          {dish.price} {currency}
        </p>

        {/* === ОПИСАНИЕ === */}
        <p className="font-sans text-base text-brand-dark/80 leading-relaxed tracking-wide">
          {dish.description || dish.short_description}
        </p>

      </div>
    </main>
  );
}