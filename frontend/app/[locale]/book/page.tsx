"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function BookPage() {
  const t = useTranslations("bookPage");

  // Состояние формы
  const [formData, setFormData] = useState({
    name: "",
    datetime: "",
    guests: "",
    phone: "",
    notes: "",
  });

  // Статусы отправки
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Блокируем ввод, если превышен лимит в 500 символов для textarea
    if (name === "notes" && value.length > 500) return;
    
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // TODO: Здесь твой бэкендер пропишет реальный URL к Django API,
      // который будет принимать этот POST-запрос и слать в Telegram.
      /*
      const response = await fetch("https://api.dastorkon.kg/api/book/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit");
      */

      // Имитация успешной отправки (убери setTimeout, когда подключите API)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center pt-16 pb-32">
      
      {/* СЛОЙ 1: Фиксированный фон-пергамент */}
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

      <div className="w-full max-w-2xl mx-auto px-6 sm:px-12 mt-12">
        
        {/* Шапка формы */}
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-brand-gold font-medium mb-3">
            {t("subtitle")}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl uppercase tracking-wide text-brand-dark mb-4">
            {t("title")}
          </h1>
          {status !== "success" && (
            <p className="font-sans text-sm md:text-base font-light text-brand-dark/70 max-w-md">
              {t("description")}
            </p>
          )}
        </div>

        {/* Форма бронирования */}
        {status === "success" ? (
          <div className="flex flex-col items-center justify-center bg-white/40 border border-brand-gold/30 p-10 text-center rounded-sm">
            <svg className="w-16 h-16 text-brand-gold mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="font-serif text-2xl text-brand-dark uppercase tracking-wide mb-3">{t("success_title")}</h3>
            <p className="font-sans font-light text-brand-dark/80">{t("success_desc")}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full bg-white/30 backdrop-blur-sm p-8 sm:p-10 border border-brand-dark/5 shadow-sm rounded-sm">
            
            {/* Ошибка */}
            {status === "error" && (
              <div className="text-red-700 bg-red-50 p-4 rounded-sm text-sm text-center border border-red-200">
                {t("error_msg")}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Имя */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-sans text-xs uppercase tracking-wider text-brand-dark/60 font-medium">
                  {t("name_label")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("name_placeholder")}
                  className="w-full bg-transparent border-b border-brand-dark/20 focus:border-brand-gold py-2 outline-none transition-colors font-sans text-brand-dark placeholder:text-brand-dark/30"
                />
              </div>

              {/* Телефон */}
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="font-sans text-xs uppercase tracking-wider text-brand-dark/60 font-medium">
                  {t("phone_label")}
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t("phone_placeholder")}
                  className="w-full bg-transparent border-b border-brand-dark/20 focus:border-brand-gold py-2 outline-none transition-colors font-sans text-brand-dark placeholder:text-brand-dark/30"
                />
              </div>

              {/* Дата и время (Ручной ввод) */}
              <div className="flex flex-col gap-2">
                <label htmlFor="datetime" className="font-sans text-xs uppercase tracking-wider text-brand-dark/60 font-medium">
                  {t("datetime_label")}
                </label>
                <input
                  type="text"
                  id="datetime"
                  name="datetime"
                  required
                  value={formData.datetime}
                  onChange={handleChange}
                  placeholder={t("datetime_placeholder")}
                  className="w-full bg-transparent border-b border-brand-dark/20 focus:border-brand-gold py-2 outline-none transition-colors font-sans text-brand-dark placeholder:text-brand-dark/30"
                />
              </div>

              {/* Количество гостей (Ручной ввод) */}
              <div className="flex flex-col gap-2">
                <label htmlFor="guests" className="font-sans text-xs uppercase tracking-wider text-brand-dark/60 font-medium">
                  {t("guests_label")}
                </label>
                <input
                  type="text"
                  id="guests"
                  name="guests"
                  required
                  value={formData.guests}
                  onChange={handleChange}
                  placeholder={t("guests_placeholder")}
                  className="w-full bg-transparent border-b border-brand-dark/20 focus:border-brand-gold py-2 outline-none transition-colors font-sans text-brand-dark placeholder:text-brand-dark/30"
                />
              </div>
            </div>

            {/* Пожелания */}
            <div className="flex flex-col gap-2 relative">
              <div className="flex justify-between items-end">
                <label htmlFor="notes" className="font-sans text-xs uppercase tracking-wider text-brand-dark/60 font-medium">
                  {t("notes_label")}
                </label>
                <span className={`text-[10px] ${formData.notes.length >= 500 ? "text-red-500" : "text-brand-dark/40"}`}>
                  {formData.notes.length} / 500
                </span>
              </div>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder={t("notes_placeholder")}
                className="w-full bg-transparent border-b border-brand-dark/20 focus:border-brand-gold py-2 outline-none transition-colors font-sans text-brand-dark placeholder:text-brand-dark/30 resize-none h-24"
              />
            </div>

            {/* Кнопка отправки */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-6 w-full bg-[#5a1212] text-white py-4 font-sans text-sm font-bold uppercase tracking-[0.15em] rounded-sm hover:bg-brand-gold transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {status === "loading" ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t("submit_loading")}
                </span>
              ) : (
                t("submit_button")
              )}
            </button>

          </form>
        )}
      </div>
    </main>
  );
}