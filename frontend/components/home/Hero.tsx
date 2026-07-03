import Image from "next/image";
import { Link } from "../../i18n/routing"; 
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");
  const tNav = useTranslations("navigation");

  return (
    <section className="relative z-0 min-h-[66vh] w-full flex flex-col items-center justify-center px-4 py-8 overflow-hidden bg-[#5a1212]">
      
      {/* СЛОЙ 1: Фоновое изображение */}
      <div className="absolute inset-0 -z-10 w-full h-full">
        <Image 
          src="/background-hero.png" 
          alt="Background" 
          fill 
          priority 
          className="object-cover opacity-90" 
        /> 
      </div>

      {/* СЛОЙ 2: Контент */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl text-white">
        
        {/* Логотип: Обернут в Link для перехода на главную */}
        <Link href="/" className="mb-8 cursor-pointer hover:opacity-90 transition-opacity">
          <Image 
            src="/logo.png" 
            alt="Logo" 
            width={350}    
            height={350}   
            priority 
            unoptimized
            className="w-[260px] sm:w-[320px] md:w-[350px] h-auto object-contain" 
          />
        </Link>

        {/* Навигация */}
        <nav className="grid grid-cols-2 grid-rows-2 grid-flow-col gap-y-4 w-full max-w-[290px] mx-auto sm:flex sm:flex-row sm:items-center sm:justify-center sm:gap-x-5 sm:max-w-none mb-16 text-xs md:text-sm font-sans tracking-[0.15em] uppercase">
          
          {/* 1. ГЛАВНАЯ (вместо Меню) */}
          <Link href="/" className="font-bold text-left sm:text-center hover:text-brand-gold transition-colors">
            {tNav("home")}
          </Link>
          
          <span className="hidden sm:inline text-white/60 font-light">|</span>
          
          {/* 2. МЕНЮ (вместо Галереи) */}
          <Link href="/menu" className="font-bold text-left sm:text-center hover:text-brand-gold transition-colors">
            {tNav("menu")}
          </Link>
          
          <span className="hidden sm:inline text-white/60 font-light">|</span>
          
          {/* 3. МЕРОПРИЯТИЯ */}
          <Link href="/events" className="font-bold text-right sm:text-center hover:text-brand-gold transition-colors">
            {tNav("events")}
          </Link>
          
          <span className="hidden sm:inline text-white/60 font-light">|</span>
          
          {/* 4. КОНТАКТЫ */}
          <Link href="/contacts" className="font-bold text-right sm:text-center hover:text-brand-gold transition-colors">
            {tNav("contacts")}
          </Link>

        </nav>

        {/* Заголовок */}
        <h1 className="font-bold text-3xl md:text-5xl lg:text-[56px] font-serif text-center mb-12 leading-[1.2] uppercase tracking-wide">
          {t("title")}
        </h1>

        {/* Кнопка-Ссылка ЗАБРОНИРОВАТЬ */}
        <Link 
          href="/book" 
          className="inline-block bg-white text-[#5a1212] px-8 py-3.5 font-sans text-sm font-bold uppercase tracking-[0.1em] rounded-sm hover:bg-accent-foreground hover:text-white transition-colors shadow-lg cursor-pointer text-center select-none"
        >
          {t("cta")}
        </Link>
        
      </div>
    </section>
  );
}