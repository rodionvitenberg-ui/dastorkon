import { useTranslations } from "next-intl";

export default function MapSection() {
  const t = useTranslations("contacts");

  // Твоя прямая ссылка на заведение в Google Maps для кнопки маршрута
  const mapDirectionsUrl = "https://www.google.com/maps/place/Dastorkon+(%D0%94%D0%B0%D1%81%D1%82%D0%BE%D1%80%D0%BA%D0%BE%D0%BD)/@42.4984702,78.3833704,17z/data=!3m1!4b1!4m6!3m5!1s0x38865c079b3c410f:0xfd331f09fec7bda4!8m2!3d42.4984702!4d78.3833704!16s%2Fg%2F1ptzpmm03";

  // URL эмбеда Google Maps на основе координат места
  const iframeSrc = "https://maps.google.com/maps?q=42.4984702,78.3833704&z=16&output=embed&iwloc=near";

  return (
    <section id="contacts" className="w-full bg-[#5a1212] text-white overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full min-h-[450px] md:min-h-[550px]">
        
        {/* ЛЕВАЯ ЧАСТЬ: Расширили max-w до 3xl и урезали правый отступ для защиты от переносов */}
        <div className="flex flex-col justify-center px-6 py-16 sm:px-12 md:pl-20 md:pr-4 lg:pl-48 lg:pr-4 text-white max-w-3xl justify-self-end w-full">
          
          {/* Субтитр */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-brand-gold font-medium">
              {t("subtitle")}
            </span>
          </div>
          
          {/* Заголовок */}
          <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-wide mb-8 md:mb-10">
            {t("title")}
          </h2>

          {/* Сетка контактов: whitespace-nowrap для телефонов гарантирует монолитность строки */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8 font-sans">
            
            {/* Блок: Адрес */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs uppercase tracking-wider text-white/50 font-medium">
                {t("address_label")}
              </span>
              <p className="text-sm md:text-base font-light leading-relaxed">
                {t("address_value")}
              </p>
            </div>

            {/* Блок: Режим работы */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs uppercase tracking-wider text-white/50 font-medium">
                {t("hours_label")}
              </span>
              <p className="text-sm md:text-base font-light leading-relaxed whitespace-pre-line tracking-wide">
                {t("hours_value")}
              </p>
            </div>

            {/* Блок: Телефоны — Жестко зафиксированы без разрывов */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs uppercase tracking-wider text-white/50 font-medium">
                {t("phones_label")}
              </span>
              <div className="flex flex-col text-sm md:text-base font-light gap-1 whitespace-nowrap">
                <a href="tel:+996555123456" className="hover:text-brand-gold transition-colors w-fit">+996 (555) 123-456</a>
                <a href="tel:+996700654321" className="hover:text-brand-gold transition-colors w-fit">+996 (700) 654-321</a>
              </div>
            </div>

          </div>

          {/* Кнопка "Проложить маршрут" */}
          <a 
            href={mapDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 group inline-flex items-center gap-3 border border-white/20 hover:border-brand-gold px-6 py-3 font-sans text-xs tracking-[0.15em] uppercase font-semibold text-white hover:text-brand-gold transition-all duration-300 w-fit rounded-sm cursor-pointer select-none"
          >
            {t("route_cta")}
            <svg 
              className="w-4 h-4 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </a>

        </div>

        {/* ПРАВАЯ ЧАСТЬ: Карта Google Maps */}
        <div className="relative w-full h-[350px] sm:h-[400px] md:h-auto min-h-[350px] bg-white/5 grayscale invert-[0.92] contrast-[1.15] opacity-75 hover:grayscale-0 hover:invert-0 hover:opacity-100 transition-all duration-700">
          <iframe
            src={iframeSrc}
            width="100%"
            height="100%"
            className="border-0 w-full h-full"
            allowFullScreen={false}
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Dastorkon Location Google Map"
          />
        </div>

      </div>
    </section>
  );
}