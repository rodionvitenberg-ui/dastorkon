import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  // Функция для очистки строк номеров, чтобы ссылки tel: работали корректно
  const cleanPhone = (phoneStr: string) => phoneStr.replace(/\s+/g, '');

  return (
    <footer className="relative z-0 w-full bg-[#5a1212] text-white overflow-hidden">
      
      {/* СЛОЙ 1: Фоновое изображение узора */}
      <div className="absolute inset-0 -z-10 w-full h-full">
        <Image 
          src="/footer-bg.png" 
          alt="Footer Pattern" 
          fill 
          className="object-cover opacity-95 object-center"
        />
      </div>

      {/* СЛОЙ 2: Основной контент */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 py-12 sm:px-12 md:px-20 lg:px-28 xl:px-36">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 items-center w-full">
          
          {/* ЛЕВАЯ КОЛОНКА: Две заглушки телефонов и адрес */}
          <div className="flex flex-col gap-4 text-sm font-sans font-light tracking-wide text-center md:text-left items-center md:items-start order-2 md:order-1">
            
            {/* Телефон 1 */}
            <a href={`tel:${cleanPhone(t("phone"))}`} className="flex items-center gap-3 hover:text-brand-gold transition-colors group">
              <svg className="w-4 h-4 text-white/80 group-hover:text-brand-gold transition-colors shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>{t("phone")}</span>
            </a>

            {/* Телефон 2 */}
            <a href={`tel:${cleanPhone(t("phone2"))}`} className="flex items-center gap-3 hover:text-brand-gold transition-colors group">
              <svg className="w-4 h-4 text-white/80 group-hover:text-brand-gold transition-colors shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>{t("phone2")}</span>
            </a>

            {/* Адрес */}
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-white/80 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <p className="leading-relaxed">{t("address")}</p>
            </div>

          </div>

          {/* ЦЕНТРАЛЬНАЯ КОЛОНКА: Логотип */}
          <div className="flex flex-col items-center justify-center text-center order-1 md:order-2">
            <Image 
              src="/logo.png" 
              alt="Dastorkon Logo" 
              width={220}
              height={120}
              unoptimized
              className="w-[180px] sm:w-[220px] h-auto object-contain"
            />
          </div>

          {/* ПРАВАЯ КОЛОНКА: Иконки соцсетей (WhatsApp поправлен) */}
          <div className="flex flex-col items-center md:items-end gap-6 order-3 w-full">
            <div className="flex items-center gap-3">
              
              {/* WhatsApp — пуленепробиваемый SVG */}
              <a 
                href="https://wa.me/996555123456" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full bg-white text-[#5a1212] hover:bg-brand-gold hover:text-white flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer" 
                aria-label="WhatsApp"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.455h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white text-[#5a1212] hover:bg-brand-gold hover:text-white flex items-center justify-center transition-all duration-300 shadow-md" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6c0-.88.39-1 1-1h2V2h-3c-2.42 0-4 1.35-4 4v2z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white text-[#5a1212] hover:bg-brand-gold hover:text-white flex items-center justify-center transition-all duration-300 shadow-md" aria-label="Instagram">
                <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

            </div>
          </div>

        </div>
      </div>

      {/* СЛОЙ 3: Нижняя темная плашка копирайта */}
      <div className="w-full bg-black/20 text-white/60 font-sans text-xs font-light py-4 border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>{t("copyright")}</div>
          <div className="flex items-center gap-4">
            <a href="#sitemap" className="hover:text-white transition-colors">{t("sitemap")}</a>
          </div>
        </div>
      </div>

    </footer>
  );
}