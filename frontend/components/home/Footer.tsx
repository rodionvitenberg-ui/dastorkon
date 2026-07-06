"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "../../i18n/routing";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="relative z-0 w-full bg-[#5a1212] text-white overflow-hidden">
      
      {/* BACKGROUND PATTERN */}
      <div className="absolute inset-0 -z-10 w-full h-full">
        <Image 
          src="/background-hero.png" 
          alt="Footer Pattern" 
          fill 
          className="object-cover opacity-95 object-center"
        />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 py-10 sm:px-12 md:px-20 lg:px-28 xl:px-36">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 items-center w-full">
          
          {/* ЛЕВАЯ КОЛОНКА: Social links */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-white/60 font-medium">
              {t("followUs")}
            </span>
            <div className="flex items-center gap-3">
              {/* WhatsApp */}
              <a 
                href="https://wa.me/996707400270" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-white text-[#5a1212] hover:bg-brand-gold hover:text-white flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer" 
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.455h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a href="https://instagram.com/dastorkon_ethno" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white text-[#5a1212] hover:bg-brand-gold hover:text-white flex items-center justify-center transition-all duration-300 shadow-md" aria-label="Instagram">
                <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* ЦЕНТРАЛЬНАЯ КОЛОНКА: Логотип */}
          <div className="flex justify-center">
             <Image src="/logo.png" alt="Dastorkon Logo" width={140} height={140} className="object-contain" />
          </div>

          {/* ПРАВАЯ КОЛОНКА: B-Corp + policy links */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex items-center gap-4">
              <Link
                href="/privacy"
                className="font-sans text-[11px] tracking-[0.12em] uppercase text-white/50 hover:text-brand-gold transition-colors"
              >
                {t("privacyPolicy")}
              </Link>
              <span className="text-white/20">|</span>
              <Link
                href="/cookie"
                className="font-sans text-[11px] tracking-[0.12em] uppercase text-white/50 hover:text-brand-gold transition-colors"
              >
                {t("cookiePolicy")}
              </Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}