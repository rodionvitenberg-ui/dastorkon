"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("contacts");

  const mapDirectionsUrl = "https://www.google.com/maps/place/Dastorkon+(%D0%94%D0%B0%D1%81%D1%82%D0%BE%D1%80%D0%BA%D0%BE%D0%BD)/@42.4984702,78.3833704,17z/data=!3m1!4b1!4m6!3m5!1s0x38865c079b3c410f:0xfd331f09fec7bda4!8m2!3d42.4984702!4d78.3833704!16s%2Fg%2F1ptzpmm03";
  const iframeSrc = "https://maps.google.com/maps?q=42.4984702,78.3833704&z=16&output=embed&iwloc=near";

  return (
    <main className="relative min-h-screen pt-24 pb-16 bg-[#F5F2EB]">
      {/* Текстура фона */}
      <div className="absolute inset-0 -z-0 w-full h-full pointer-events-none" aria-hidden="true">
        <Image
          src="/parchment-bg.jpg"
          alt=""
          fill
          className="object-cover mix-blend-multiply opacity-[0.45]"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-20">
        {/* ЭМОЦИОНАЛЬНЫЙ УРОВЕНЬ */}
        <div className="mb-16 text-center md:text-left">
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-brand-gold font-bold mb-4 block">
            {t("subtitle")}
          </span>
          <h1 className="font-serif text-3xl md:text-5xl uppercase tracking-wide text-brand-dark mb-6">
            {t("title")}
          </h1>
          {/* Душевный текст */}
          <p className="font-sans text-lg text-brand-dark/80 max-w-xl italic font-light">
             {t("description")}
          </p>
        </div>

        {/* ПРАГМАТИЧНЫЙ УРОВЕНЬ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          <div className="flex flex-col gap-10">
            <div>
              <h3 className="font-serif text-xs uppercase mb-3 text-brand-dark/60 tracking-widest">{t("address_label")}</h3>
              <p className="font-sans text-lg text-brand-dark">{t("address_value")}</p>
            </div>

            <div>
              <h3 className="font-serif text-xs uppercase mb-3 text-brand-dark/60 tracking-widest">{t("hours_label")}</h3>
              <p className="font-sans text-lg text-brand-dark whitespace-pre-line">{t("hours_value")}</p>
            </div>

            <div>
              <h3 className="font-serif text-xs uppercase mb-3 text-brand-dark/60 tracking-widest">{t("phones_label")}</h3>
              <div className="flex flex-col gap-2">
                {["0555 400 270", "0998 400 270", "0707 400 270"].map((phone) => (
                  <a 
                    key={phone} 
                    href={`tel:${phone.replace(/\s/g, '')}`} 
                    className="font-sans text-lg text-brand-dark hover:text-brand-gold transition-colors"
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-serif text-xs uppercase mb-3 text-brand-dark/60 tracking-widest">Instagram</h3>
              <a 
                href="https://www.instagram.com/dastorkon_ethno" 
                target="_blank" 
                className="inline-block px-6 py-3 border border-brand-dark/20 hover:border-brand-gold text-brand-dark hover:text-brand-gold transition-all duration-300 font-sans text-xs uppercase tracking-[0.15em] font-bold"
              >
                @dastorkon_ethno
              </a>
            </div>
          </div>

          {/* Блок карты (код из MapSection)[cite: 6] */}
          <div className="w-full h-[400px] rounded-sm overflow-hidden border border-brand-dark/10 relative shadow-lg">
             <div className="w-full h-full grayscale-[1] invert-[0.92] contrast-[1.15] opacity-75 hover:grayscale-0 hover:invert-0 hover:opacity-100 transition-all duration-700">
                <iframe 
                  src={iframeSrc} 
                  className="w-full h-full border-0" 
                  loading="lazy" 
                  title="Карта проезда"
                />
             </div>
             <a 
                href={mapDirectionsUrl} 
                target="_blank"
                className="absolute bottom-4 right-4 bg-brand-dark text-white px-4 py-2 text-xs uppercase tracking-widest font-bold shadow-md hover:bg-brand-gold transition-colors"
             >
               {t("route_cta")}
             </a>
          </div>
        </div>
      </div>
    </main>
  );
}