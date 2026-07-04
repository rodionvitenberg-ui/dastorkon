"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "../../../i18n/routing"; 
import OrnamentLines from "@/components/ui/OrnamentLines";

export default function EventsHub() {
  const t = useTranslations("eventsHub");

  return (
    <main className="min-h-screen lg:h-screen w-full flex flex-col lg:flex-row bg-[#2a2128] overflow-y-auto lg:overflow-hidden select-none">
        <OrnamentLines type="parchment" />
      
      {/* === ЛЕВАЯ СТОРОНА: БАНКЕТЫ И ТОРЖЕСТВА === */}
      <Link 
        href="/events/banquets"
        className="group relative flex-1 min-h-[55vh] lg:min-h-0 lg:h-full overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10"
      >
        {/* Анимированный фон */}
        <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105">
          <Image
            src="/cath.jpg"
            alt="Banquets and Celebrations"
            fill
            priority
            className="object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0a1128]/90 via-[#0a1128]/40 to-transparent" />
        </div>

        {/* Контентная зона */}
        <div className="relative z-10 h-full flex flex-col justify-center p-8 lg:p-16 items-start">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-brand-gold text-xs font-sans font-semibold uppercase tracking-[0.25em] mb-4"
          >
            {t("banquetsSub")}
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-3xl lg:text-5xl font-bold text-white uppercase tracking-wide mb-6 leading-[1.2] transition-colors"
          >
            {t("banquetsTitle1")}<br/>{t("banquetsTitle2")}
          </motion.h2>
          
          <p className="text-white/80 max-w-md font-sans font-light leading-relaxed mb-8 text-xs lg:text-base opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 translate-y-0 lg:translate-y-4 lg:group-hover:translate-y-0">
            {t("banquetsDesc")}
          </p>

          {/* Фирменная Кнопка Дасторкона (Слева) */}
          <div className="relative overflow-hidden px-10 py-4 transition-all duration-300 flex-shrink-0 flex items-center justify-center rounded-sm">
            <div className="absolute inset-0 bg-brand-gold opacity-100 lg:opacity-0 transition-opacity duration-500 lg:group-hover:opacity-100" />
            <div className="absolute inset-0 border border-white/20 opacity-0 lg:opacity-100 transition-opacity duration-300 lg:group-hover:opacity-0" />
            <span className="relative z-10 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-[#5a1212] lg:text-white transition-colors duration-300 lg:group-hover:text-[#5a1212]">
              {t("banquetsBtn")}
            </span>
          </div>
        </div>
      </Link>

      {/* === ПРАВАЯ СТОРОНА: КЕЙТЕРИНГ === */}
      <Link 
        href="/events/catering"
        className="group relative flex-1 min-h-[55vh] lg:min-h-0 lg:h-full overflow-hidden"
      >
        {/* Анимированный фон */}
        <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105">
          <Image
            src="/banq.jpg"
            alt="Ethno Catering"
            fill
            priority
            className="object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-l from-[#0a1128]/90 via-[#0a1128]/40 to-transparent" />
        </div>

        {/* Контентная зона */}
        <div className="relative z-10 h-full flex flex-col justify-center p-8 lg:p-16 items-end text-right">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-brand-gold text-xs font-sans font-semibold uppercase tracking-[0.25em] mb-4"
          >
            {t("cateringSub")}
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-3xl lg:text-5xl font-bold text-white uppercase tracking-wide mb-6 leading-[1.2] transition-colors"
          >
            {t("cateringTitle1")}<br/>{t("cateringTitle2")}
          </motion.h2>
          
          <p className="text-white/80 max-w-md font-sans font-light leading-relaxed mb-8 text-xs lg:text-base opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 translate-y-0 lg:translate-y-4 lg:group-hover:translate-y-0">
            {t("cateringDesc")}
          </p>
          
          {/* Фирменная Кнопка Дасторкона (Справа) */}
          <div className="relative overflow-hidden px-10 py-4 transition-all duration-300 flex-shrink-0 flex items-center justify-center rounded-sm">
            <div className="absolute inset-0 bg-brand-gold opacity-100 lg:opacity-0 transition-opacity duration-500 lg:group-hover:opacity-100" />
            <div className="absolute inset-0 border border-white/20 opacity-0 lg:opacity-100 transition-opacity duration-300 lg:group-hover:opacity-0" />
            <span className="relative z-10 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-[#5a1212] lg:text-white transition-colors duration-300 lg:group-hover:text-[#5a1212]">
              {t("cateringBtn")}
            </span>
          </div>
        </div>
      </Link>

    </main>
  );
}