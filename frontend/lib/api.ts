// lib/api.ts
import type { Category, ComboCategory } from "@/types/menu";

const API_URL = process.env.API_URL!;

/**
 * Вспомогательная функция: нормализует ответ DRF (results или массив).
 */
function normalizeListResponse<T>(data: any): T[] {
  if (!data) return [];
  if (Array.isArray(data)) return data as T[];
  if (Array.isArray(data.results)) return data.results as T[];
  if (Array.isArray((data as any).data)) return (data as any).data as T[];
  return [];
}

/**
 * Получить категории (server-side). Передаём locale, чтобы бэкенд возвращал локализованные поля.
 */
export async function getCategories(locale?: string): Promise<Category[]> {
  const headers: Record<string, string> = {};
  if (locale) headers["Accept-Language"] = locale;

  const res = await fetch(`${API_URL}/categories/`, {
    headers,
    cache: "no-store", // ← Отключаем кэш для мгновенного обновления категорий
  });

  if (!res.ok) return [];

  const data = await res.json();
  return normalizeListResponse<Category>(data);
}

/**
 * Получить категории комбо (server-side). Передаём locale.
 */
export async function getComboCategories(locale?: string): Promise<ComboCategory[]> {
  const headers: Record<string, string> = {};
  if (locale) headers["Accept-Language"] = locale;

  const res = await fetch(`${API_URL}/combo-categories/`, {
    headers,
    cache: "no-store", // ← Отключаем кэш для мгновенного обновления комбо-категорий
  });

  if (!res.ok) throw new Error("Failed to load combo categories");

  const data = await res.json();
  return normalizeListResponse<ComboCategory>(data);
}

/**
 * Получить детальную информацию о блюде. Передаём locale.
 */
export async function getDish(id: string, locale?: string) {
  const headers: Record<string, string> = {};
  if (locale) headers["Accept-Language"] = locale;

  const res = await fetch(`${API_URL}/dishes/${id}/`, {
    headers,
    cache: "no-store", // ← Отключаем кэш для мгновенного обновления карточки блюда
  });

  if (!res.ok) throw new Error("Failed to load dish");

  return res.json();
}