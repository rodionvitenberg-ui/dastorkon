import Image from "next/image";
import { useTranslations } from "next-intl";

export default function MenuPage() {
  const t = useTranslations("menuPage");

  // Массив блюд получаем прямо из JSON (next-intl поддерживает массивы объектов)
  const menuItems = t.raw("items") as Array<{
    title: string;
    description: string;
    price: string;
    image: string;
  }>;

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center pt-24 pb-32">
      
      {/* СЛОЙ 1: Наш фирменный пергаментный фон на всю высоту страницы */}
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

      {/* СЛОЙ 2: Контент страницы */}
      <div className="w-full max-w-[1024px] mx-auto px-6 sm:px-12 md:px-16">
        
        {/* ШАПКА: Картинка Menu, текст DASTORKON и картинка-разделитель */}
        <div className="flex flex-col items-center justify-center mb-16">
          
          {/* Твоя картинка заголовка (Menu) */}
          <div className="relative h-16 sm:h-20 w-48 sm:w-64 mb-3">
            <Image 
              src="/menu.png" // Замени на свое изображение заголовка
              alt="Menu"
              fill
              className="object-contain object-center"
              priority
            />
          </div>

          <span className="font-sans text-sm sm:text-base tracking-[0.2em] uppercase text-brand-dark mb-6">
            Dastorkon
          </span>

          {/* Твоя картинка разделителя */}
          <div className="relative h-6 sm:h-8 w-64 sm:w-80">
            <Image 
              src="/divider.png" // Замени на свое изображение разделителя
              alt="Divider"
              fill
              className="object-contain object-center"
            />
          </div>

        </div>

        {/* КАТЕГОРИЯ: Заголовок и описание (по левому краю как на макете) */}
        <div className="mb-10 w-full">
          {/* Стилизуем первую букву (Drop Cap), как на референсе с буквой D */}
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-dark mb-4 tracking-wide">
            <span className="text-4xl sm:text-5xl text-[#5a1212] pr-0.5">{t("category_title").charAt(0)}</span>
            {t("category_title").slice(1)}
          </h2>
          <p className="font-sans text-sm font-light leading-relaxed text-brand-dark/80 max-w-2xl">
            {t("category_desc")}
          </p>
        </div>

        {/* СТРОГАЯ СЕТКА БЛЮД (2 колонки) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-12">
          {menuItems.map((item, index) => (
            <div key={index} className="flex flex-col w-full group">
              
              {/* Фото блюда с жесткой фиксацией пропорций (aspect-[5/4]) */}
              <div className="relative w-full aspect-[5/4] overflow-hidden rounded-sm mb-5 bg-black/5">
                <Image
                  src={item.image} // Пути к фото лежат в JSON
                  alt={item.title}
                  fill
                  sizes="(max-w-768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Название и Цена (Flexbox выстраивает их строго по одной базовой линии) */}
              <div className="flex justify-between items-baseline mb-2 gap-4">
                <h3 className="font-serif text-xl text-brand-dark leading-tight">
                  {item.title}
                </h3>
                <span className="font-sans text-lg font-medium text-brand-dark">
                  {item.price}
                </span>
              </div>

              {/* Описание блюда */}
              <p className="font-sans text-sm font-light text-brand-dark/70 leading-relaxed">
                {item.description}
              </p>

            </div>
          ))}
        </div>

        {/* НИЖНИЙ РАЗДЕЛИТЕЛЬ (Опционально, завершает блок) */}
        <div className="flex justify-center mt-20">
          <div className="relative h-6 sm:h-8 w-64 sm:w-80">
            <Image 
              src="/divider.png" 
              alt="Divider Bottom"
              fill
              className="object-contain object-center"
            />
          </div>
        </div>

      </div>
    </main>
  );
}