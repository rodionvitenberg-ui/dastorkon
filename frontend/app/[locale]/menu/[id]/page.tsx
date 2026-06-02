import Image from "next/image";
import { getDish } from "@/lib/api";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DishPage({ params }: Props) {
  const { id } = await params;
  const dish = await getDish(id);

  return (
    <main className="relative min-h-screen w-full pt-24 pb-32">
      <div className="max-w-3xl mx-auto px-6">

        <div className="relative w-full aspect-[5/4] mb-10 rounded-sm overflow-hidden">
          <Image
            src={dish.image}
            alt={dish.title}
            fill
            className="object-cover"
          />
        </div>

        <h1 className="font-serif text-4xl text-brand-dark mb-4">
          {dish.title}
        </h1>

        <p className="font-sans text-xl font-medium text-brand-dark mb-6">
          {dish.price} сом
        </p>

        <p className="font-sans text-base text-brand-dark/80 leading-relaxed">
          {dish.description}
        </p>

      </div>
    </main>
  );
}
