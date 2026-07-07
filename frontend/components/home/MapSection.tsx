"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function MapSection() {
  const t = useTranslations("contacts");

  const mapDirectionsUrl = "https://www.google.com/maps/place/Dastorkon+(%D0%94%D0%B0%D1%81%D1%82%D0%BE%D1%80%D0%BA%D0%BE%D0%BD)/@42.4984702,78.3833704,17z/data=!3m1!4b1!4m6!3m5!1s0x38865c079b3c410f:0xfd331f09fec7bda4!8m2!3d42.4984702!4d78.3833704!16s%2Fg%2F1ptzpmm03";
  const iframeSrc = "https://maps.google.com/maps?q=42.4984702,78.3833704&z=16&output=embed&iwloc=near";

  const phones = [
    { display: "0555 400 270", href: "tel:+996555400270" },
    { display: "0998 400 270", href: "tel:+996998400270" },
    { display: "0707 400 270", href: "tel:+996707400270" },
  ];

  return (
    <section id="contacts" className="relative z-0 w-full bg-[#5a1212] text-white overflow-hidden">
      
      {/* BACKGROUND PATTERN */}
      <div className="absolute inset-0 -z-10 w-full h-full">
        <Image 
          src="/background-hero.png" 
          alt="Map Pattern" 
          fill 
          className="object-cover opacity-95 object-center"
        />
      </div>

      {/* REPROPORTIONED GRID (25% / 75% ON DESKTOP) */}
      <div className="relative border-b border-brand-dark/10 z-10 grid grid-cols-1 md:grid-cols-[25%_75%] w-full min-h-[400px] md:min-h-[460px]">
        
        {/* LEFT COLUMN: 25% WIDTH CONTACTS BLOCK */}
        <div className="flex flex-col justify-center px-6 py-10 sm:px-10 md:pl-10 md:pr-6 lg:pl-16 lg:pr-6 text-white w-full border-r border-white/10 md:border-b-0 border-b">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-white font-medium">
              {t("subtitle")}
            </span>
          </div>
          
          {/* INCREASED HEADING SIZE */}
          <h2 className="font-heading text-2xl md:text-3xl uppercase tracking-wide mb-6 text-white">
            {t("title")}
          </h2>

          <div className="flex flex-col gap-y-5 font-sans">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-wider text-white/50 font-medium">
                {t("address_label")}
              </span>
              <p className="text-xs md:text-sm font-light leading-relaxed">
                {t("address_value")}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-wider text-white/50 font-medium">
                {t("hours_label")}
              </span>
              <p className="text-xs md:text-sm font-light leading-relaxed whitespace-pre-line tracking-wide">
                {t("hours_value")}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-wider text-white/50 font-medium">
                {t("phones_label")}
              </span>
              <div className="flex flex-col text-xs md:text-sm font-light gap-0.5 whitespace-nowrap">
                {phones.map((phone) => (
                  <a key={phone.display} href={phone.href} className="hover:text-white transition-colors w-fit">
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
            className="mt-6 group relative inline-flex items-center gap-2.5 border border-white/20 hover:border-white px-4 py-2 font-sans text-[10px] tracking-[0.15em] uppercase font-semibold text-white hover:text-white transition-all duration-300 w-fit rounded-sm cursor-pointer select-none outline outline-[2px] outline-white/10 outline-offset-[3px] hover:outline-white/30"
          >
            {t("route_cta")}
            <svg 
              className="w-3.5 h-4 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300" 
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

        {/* RIGHT COLUMN: 75% WIDTH MAP CONTEXT */}
        <div className="relative w-full h-[350px] md:h-auto min-h-[350px] group overflow-hidden bg-black cursor-pointer">
          
          {/* MAP CANVAS LAYER (OPACITY INCREASED TO 60% TO LESSEN DARKNESS) */}
          <div className="w-full h-full grayscale invert-[0.92] contrast-[1.2] opacity-60 group-hover:grayscale-0 group-hover:invert-0 group-hover:opacity-100 transition-all duration-[850ms] ease-[cubic-bezier(0.25,1,0.5,1)]">
            <iframe
              src={iframeSrc}
              width="100%"
              height="100%"
              className="border-0 w-full h-full pointer-events-none group-hover:pointer-events-auto"
              loading="lazy" 
              title="Dastorkon Location"
            />
          </div>

          {/* EDITORIAL TEXT OVERLAY */}
          <div className="absolute inset-0 flex items-center justify-center p-6 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none group-hover:opacity-0 group-hover:translate-y-2 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
            <h2 className="font-heading text-xl sm:text-2xl md:text-3xl italic text-[#f5e9d6] tracking-wide text-center px-4 select-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] max-w-lg leading-snug">
              “{t("address_value")}”
            </h2>
          </div>

        </div>
      </div>
    </section>
  );
}