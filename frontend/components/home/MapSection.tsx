"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import OrnamentLines from "../ui/OrnamentLines";

export default function MapSection() {
  const t = useTranslations("contacts");

  const mapDirectionsUrl = "https://www.google.com/maps/place/Dastorkon+(%D0%94%D0%B0%D1%81%D1%82%D0%BE%D1%80%D0%BA%D0%BE%D0%BD)/@42.4984702,78.3833704,17z/data=!3m1!4b1!4m6!3m5!1s0x38865c079b3c410f:0xfd331f09fec7bda4!8m2!3d42.4984702!4d78.3833704!16s%2Fg%2F1ptzpmm03";
  const iframeSrc = "https://maps.google.com/maps?q=42.4984702,78.3833704&z=16&output=embed&iwloc=near";

  // Актуальные телефоны
  const phones = [
    { display: "0555 400 270", href: "tel:+996555400270" },
    { display: "0998 400 270", href: "tel:+996998400270" },
    { display: "0707 400 270", href: "tel:+996707400270" },
  ];

  return (
    <section id="contacts" className="relative z-0 w-full bg-[#5a1212] text-white overflow-hidden">

      <OrnamentLines type="burgundy" />
      
      {/* СЛОЙ 1: Фоновое изображение узора (такое же, как в футере) */}
      <div className="absolute inset-0 -z-10 w-full h-full">
        <Image 
          src="/background-hero.png" 
          alt="Map Pattern" 
          fill 
          className="object-cover opacity-95 object-center"
        />
      </div>

      {/* СЛОЙ 2: Основной контент */}
      <div className="relative border-b border-brand-dark/10 z-10 grid grid-cols-1 md:grid-cols-2 w-full min-h-[450px] md:min-h-[550px]">
        
        <div className="flex flex-col justify-center px-6 py-16 sm:px-12 md:pl-20 md:pr-4 lg:pl-48 lg:pr-4 text-white max-w-3xl justify-self-end w-full">
          
          <div className="flex items-center gap-3 mb-6">
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-brand-gold font-medium">
              {t("subtitle")}
            </span>
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-wide mb-8 md:mb-10">
            {t("title")}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8 font-sans">
            
            <div className="flex flex-col gap-1.5">
              <span className="text-xs uppercase tracking-wider text-white/50 font-medium">
                {t("address_label")}
              </span>
              <p className="text-sm md:text-base font-light leading-relaxed">
                {t("address_value")}
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-xs uppercase tracking-wider text-white/50 font-medium">
                {t("hours_label")}
              </span>
              <p className="text-sm md:text-base font-light leading-relaxed whitespace-pre-line tracking-wide">
                {t("hours_value")}
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-xs uppercase tracking-wider text-white/50 font-medium">
                {t("phones_label")}
              </span>
              <div className="flex flex-col text-sm md:text-base font-light gap-1 whitespace-nowrap">
                {phones.map((phone) => (
                  <a key={phone.display} href={phone.href} className="hover:text-brand-gold transition-colors w-fit">
                    {phone.display}
                  </a>
                ))}
              </div>
            </div>

          </div>

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

        {/* Изменено: добавлен md:pl-11 для сдвига карты на 44px вправо */}
        <div className="relative w-full h-[350px] sm:h-[400px] md:h-auto min-h-[350px] md:pl-12">
          {/* Стили фильтров перенесены во внутренний контейнер, чтобы отступ оставался прозрачным */}
          <div className="w-full h-full bg-white/5 grayscale invert-[0.92] contrast-[1.15] opacity-75 hover:grayscale-0 hover:invert-0 hover:opacity-100 transition-all duration-700">
            <iframe
              src={iframeSrc}
              width="100%"
              height="100%"
              className="border-0 w-full h-full"
              loading="lazy" 
              title="Dastorkon Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}