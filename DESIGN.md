---
version: 2.0
name: Dastorkon Etno-Cafe
description: Светлая, тёплая дизайн-система этно-кафе среднеазиатской кухни. Кремовая база, тёмно-бордовые акценты, золотые детали, рустикальные орнаменты и журнальная типографика.
colors:
  brand-red: "#721C1C"
  brand-redDark: "#4A1010"
  brand-cream: "#F5F2EB"
  brand-dark: "#2B1E17"
  brand-gold: "#D4AF37"
  surface-dark: "#121212"
  surface-burgundy: "#5a1212"
  surface-header-compact: "#7e2424"
  plaque-beige: "#ffefcb"
  white-warm: "#fffdf9"
  gray-light: "#d0d0d0"
  gold-hover: "#c9a96e"
  error: "#ef4444"
typography:
  heading: "Skiff"
  sans: "Nunito Sans"
  serif-variable: "var(--font-serif)"
rounded:
  none: "0px"
  sm: "rounded-sm (4px)"
  md: "rounded (6px)"
  lg: "rounded-lg (8px)"
  full: "rounded-full (9999px)"
spacing:
  section-py: "py-12 md:py-20"
  container-px: "px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36"
  card-gap: "gap-8"
  max-width: "1440px"
animation:
  fade-in: "0.7s ease-out (opacity 0→1, translateY 10px→0)"
  hover-fast: "200ms"
  hover-medium: "300ms"
  hover-slow: "500–700ms"
  header-transition: "1000ms"
---

# Overview

**Dastorkon** — это этно-кафе среднеазиатской кухни. Дизайн-система построена на контрасте тёплой кремовой базы (`#F5F2EB`) и глубоких бордово-коричневых акцентов (`#721C1C`, `#2B1E17`). Золото (`#D4AF37`) используется точечно — в hover-состояниях, разделителях и акцентных элементах.

Визуальный язык сочетает журнальную типографику (заголовки Skiff, текстовый Nunito Sans), рустикальные орнаменты (вертикальные линии с этническим узором), полноэкранные видео-фоны и контрастные бежевые плашки для карточек.

Сайт работает в двух цветовых контекстах:
- **Hero / Header (прозрачный режим):** тёмная подложка (`#121212`) с белым текстом (`#fffdf9`) и золотыми акцентами.
- **Основной контент (светлый режим):** кремовый фон (`#F5F2EB`) с тёмным текстом (`#2B1E17`) и бордовыми акцентами.

---

# Colors

## Брендовые токены (из `globals.css`)

| Токен | HEX | Роль |
|---|---|---|
| `brand-red` | `#721C1C` | Основной акцентный бордовый |
| `brand-redDark` | `#4A1010` | Тёмный вариант бордового |
| `brand-cream` | `#F5F2EB` | Основной фон страниц (body) |
| `brand-dark` | `#2B1E17` | Основной цвет текста на светлом фоне |
| `brand-gold` | `#D4AF37` | Золотой акцент (hover, разделители, иконки) |

## Дополнительные цвета (inline в компонентах)

| HEX | Роль | Где используется |
|---|---|---|
| `#121212` | Почти чёрный | Hero-фон, фон карточек изображений |
| `#fffdf9` | Тёплый белый | Текст на тёмных поверхностях (Hero, Header) |
| `#d0d0d0` | Светло-серый | Навигация Header (неактивные ссылки) |
| `#c9a96e` | Золотой (hover-вариант) | Header: hover текста, кнопка бронирования, бейдж корзины |
| `#7e2424` | Бордовый (header compact) | Фон закреплённого хедера с `backdrop-blur-sm` |
| `#5a1212` | Тёмно-бордовый | Footer-фон |
| `#ffefcb` | Тёплый бежевый | Плашки карточек About, градиентные переходы |

## Правила использования цвета

- **Светлый фон** (`brand-cream`) — основной режим всех страниц, кроме Hero-секции.
- **Тёмный текст** (`brand-dark`) — на светлом фоне, с вариациями прозрачности: `text-brand-dark/80` (вторичный), `text-brand-dark/70` (описания).
- **Тёмные поверхности** (`#121212`, `#5a1212`) — только для Hero, Footer и фонов изображений. Текст на них всегда `#fffdf9` или `#d0d0d0`.
- **Золото** (`#D4AF37`, `#c9a96e`) — никогда не используется как фон больших площадей. Только для hover, границ, иконок и разделителей.
- **Градиенты** — минимальны: `from-black/40 via-transparent to-black/60` (Hero overlay), `from-transparent via-[#D4AF37]/30 to-transparent` (разделители).

---

# Typography

## Шрифты

| Роль | Семейство | Источник | CSS-переменная |
|---|---|---|---|
| Заголовки | **Skiff** | Локальный woff2 (`/fonts/Skiff-Regular.woff2`) | `font-heading` |
| Основной текст | **Nunito Sans** | Google Fonts (400, 600, 700, 800, 900) | `font-sans` |
| Курсив (описания) | Переменная serif | Системный fallback | `font-serif italic` |

## Иерархия (реальные размеры из кода)

| Уровень | Классы Tailwind | Размер | Применение |
|---|---|---|---|
| Hero headline | `text-4xl md:text-6xl lg:text-[72px]` | 36px → 72px | Главный заголовок на Hero |
| Page title | `text-4xl sm:text-5xl md:text-6xl` | 36px → 60px | Заголовки секций (About) |
| Section heading | `text-2xl md:text-3xl lg:text-4xl` | 24px → 36px | Подзаголовки секций |
| Card title | `text-base md:text-lg` | 16px → 18px | Заголовки карточек |
| Body | `text-base md:text-lg` | 16px → 18px | Основной текст |
| Small body | `text-sm` | 14px | Описания в карточках |
| Label / Nav | `text-[13px]` | 13px | Навигация, мета-информация |
| Utility | `text-[11px]` | 11px | Кнопки, языковой switcher, footer-ссылки |

## Правила типографики

- **Заголовки** (`font-heading`) всегда uppercase, с tracking:
  - Hero: `tracking-[0.1em]` (mobile) / `tracking-[0.15em]` (desktop)
  - Секции: `tracking-[0.06em]` – `tracking-[0.1em]`
  - Карточки: `tracking-[0.2em]`
- **Навигация:** `font-sans`, `font-semibold` или `font-bold`, uppercase, `tracking-[1.5px]` (13px) или `tracking-[1.2px]` (11px).
- **Кнопки:** `font-sans`, `font-semibold`, uppercase, `tracking-[0.15em]`, `text-[11px]` или `text-xs`.
- **Курсивные описания:** `font-serif italic`, `text-[13px]` или `text-[14px]`, с пониженной непрозрачностью (`text-[#121212]/80`).
- **Межстрочный интервал:** заголовки `leading-tight` или `leading-[1.1]`, body `leading-[1.8]` или `leading-relaxed`.

---

# Layout

## Сетка и контейнер

- Максимальная ширина контента: `max-w-[1440px]`
- Отступы контейнера: `px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36`
- Header: `max-w-[1800px]` (шире основного контента)
- Сетки: одноколоночные на мобильных, 2–3 колонки на десктопе (`md:grid-cols-3`)

## Ключевые макеты

### Hero (full-screen)
- `h-screen`, `bg-[#121212]`, видео на весь экран (два вертикальных видео на десктопе, одно на мобильных)
- Overlay: градиент `from-black/40 via-transparent to-black/60`
- Headline: абсолютное позиционирование, `bottom: 160px`, центрирован
- Кнопки: абсолютное позиционирование, `bottom-8` (mobile) / `bottom-12` (desktop), горизонтальный flex

### Split-секция (Philosophy)
- Левая половина: изображение (на десктопе `absolute inset-y-0 left-0 w-1/2`)
- Правая половина: текст, `md:w-1/2 md:ml-auto`, вертикальное центрирование
- Разделитель между секциями: `h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent`

### Сетка карточек
- `grid grid-cols-1 md:grid-cols-3 gap-8`
- Карточки About: `aspect-[3/4]` на десктопе
- Карточки блюд: `aspect-[5/4]`

### Header
- `fixed top-0 z-50`, два состояния:
  - **Прозрачный** (главная, до скролла): `bg-transparent`, высота `h-[88px] md:h-[100px]`
  - **Компактный** (скролл / не-главные страницы): `bg-[#7e2424]/95 backdrop-blur-sm`, высота `h-[64px] md:h-[72px]`
- Логотип: два варианта (полный ↔ тундюк), кроссфейд через opacity

### Footer
- `bg-[#5a1212]`, фоновое изображение-паттерн с `opacity-95`
- Три колонки: соцсети (слева) — логотип (центр) — ссылки (справа)
- Социальные иконки: `rounded-full`, белый фон, hover: `bg-brand-gold`

---

# Components

## Hero

Полноэкранная секция с видео-фоном и оверлеем.

```css
/* Ключевые характеристики */
background: #121212
overlay: gradient from-black/40 via-transparent to-black/60
```

**Видео:**
- Мобильные: одно видео, `object-cover`, на всю ширину
- Десктоп: два видео рядом, каждое 50% ширины
- Fallback: `Image` с `background-hero.png` при ошибке загрузки

**Headline:**
- `font-heading`, uppercase, `text-[#fffdf9]`
- `text-shadow: 0 2px 16px rgba(0,0,0,0.7)`
- Абсолютное позиционирование над кнопками

**Кнопки (Hero):**
- Две кнопки горизонтально: «Меню» и «Забронировать»
- Стиль: `outline outline-1 outline-white/10 outline-offset-[3px] border-[1.5px] border-white/20`
- Hover: `border-[#d4af37]/60`, текст → `text-[#d4af37]`
- Внутренний декоративный border: `border border-white/10`, hover → `border-[#d4af37]/30`
- Текст: `text-[11px] md:text-xs`, `font-semibold`, uppercase, `tracking-[0.15em]`, `text-white`, `text-shadow`

## Buttons

Используется три варианта кнопок:

### Primary (тёмный outline — для светлого фона)
- `outline outline-[2px] outline-[#121212]/20 outline-offset-[3px]`
- `border-2 border-[#121212]/50`
- Текст: `text-[#121212]`, hover → `text-[#D4AF37]`
- Outline hover: `outline-[#D4AF37]/30`, border hover: `border-[#D4AF37]`
- Padding: `px-5 py-3 md:px-8 md:py-3.5`
- Пример: кнопка «Узнать больше» в About

### Header CTA (золотой pill)
- `rounded-full`, `border border-[#c9a96e]`, `text-[#c9a96e]`
- Hover: `bg-[#c9a96e]/20`, текст → `text-[#fffdf9]`
- Текст: `text-[11px]`, `font-bold`, uppercase, `tracking-[1.5px]`
- Размер: `h-10 px-5`
- Пример: кнопка «Забронировать» в Header

### Hero CTA (тёмный outline с золотым hover)
- См. описание в секции Hero выше

## Cards

### Dish Card (карточка блюда)
- `rounded-sm`, `shadow-sm`, `bg-black/5`
- Соотношение сторон: `aspect-[5/4]`
- Изображение: `object-cover`, hover → `scale-105` (700ms)
- Теги: абсолютное позиционирование `top-2 left-2`, динамические цвета (`backgroundColor: tag.color_bg`, `color: tag.color_text`)
- Заголовок: `font-heading text-xl text-brand-dark`
- Цена: `font-sans text-lg font-medium text-brand-dark`
- Описание: `font-sans text-sm font-light text-brand-dark/70`, `line-clamp-2`

### About Card (hover-карточка с видео)
- Десктоп: `aspect-[3/4]`, изображение сменяется видео при hover
- Плашка: `bg-[#ffefcb]`, двойная рамка:
  - Внешняя: `border-[1.5px] border-[#121212]`
  - Внутренняя: `border border-[#121212]/40`
- Текст: `text-[#121212]`, заголовок `font-heading`, описание `font-serif italic`
- Стрелка: появляется при hover, `translateY` анимация
- Мобильные: сетка (изображение сверху, плашка overlapping с `-mt-10`)

## Header

- `fixed top-0 z-50`, два состояния (прозрачный ↔ компактный), переход `1000ms`
- Навигация: `text-[13px]`, `font-semibold`, uppercase, `tracking-[1.5px]`
  - Активная: `text-[#fffdf9]`
  - Неактивная: `text-[#d0d0d0]`, hover → `text-[#c9a96e]`
- Языковой switcher: pill-кнопки, `text-[11px]`, `tracking-[1.2px]`
  - Активный: `border-[#fffdf9] text-[#fffdf9] bg-[#fffdf9]/10`
  - Неактивный: `border-transparent text-[#d0d0d0]`, hover → `text-[#fffdf9] border-[#d0d0d0]/30`
- Корзина: `rounded-full`, `border border-[#fffdf9]`, hover → `border-[#c9a96e] text-[#c9a96e]`
- Бейдж корзины: `bg-[#c9a96e] text-[#121212]`, `rounded-full`, `text-[10px]`

## Footer

- Фон: `bg-[#5a1212]`, фоновый паттерн `background-hero.png` с `opacity-95`
- Текст: белый (`text-white`), заголовки `text-white/60`
- Соц-иконки: `w-10 h-10 rounded-full bg-white text-[#5a1212]`, hover → `bg-brand-gold text-white`
- Ссылки: `text-[11px]`, uppercase, `tracking-[0.12em]`, `text-white/50`, hover → `text-brand-gold`
- Логотип: по центру, 140×140px

---

# Ornaments & Decor

## Вертикальные орнаментальные линии

CSS-класс `.ornament-line` создаёт вертикальные декоративные полосы по краям контента.

- Фон: `url('/ornament-v.png')`, `repeat-y`
- Размер: `18px` (mobile) → `35px` (desktop, ≥768px)
- Позиционирование: `absolute`, `top-0 bottom-0`, `z-index: 30`
- `pointer-events: none` (не блокируют взаимодействие)
- Левая сторона: `.ornament-line-left` (`left: 0`)
- Правая сторона: `.ornament-line-right` (`right: 0`, `scaleX(-1)` для зеркального отражения)

### Стили орнаментов

**Burgundy (тёплый, светлый):**
```css
filter: brightness(1.2) sepia(0) saturate(1.1);
mix-blend-mode: screen;
```
Используется на светлых секциях для создания тёплого акцента.

**Parchment (тёмный, насыщенный):**
```css
filter: contrast(1.5) brightness(0.6) sepia(0.4) saturate(1.2);
mix-blend-mode: multiply;
```
Используется для создания глубокого рустикального эффекта.

## Угловой орнамент

Изображение `ornament-corner.png` используется как декоративный угловой элемент.

## Разделители секций

```css
width: 100%;
height: 1px;
background: linear-gradient(to right, transparent, rgba(212, 175, 55, 0.3), transparent);
```
Tailwind: `w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent`

---

# Motion & Animation

## Принципы

- Анимации служат акцентом, а не основой восприятия.
- Предпочтение отдаётся микро-взаимодействиям: hover, fade-in, плавные переходы.
- Все анимации уважают `motion-reduce: transition-none`.

## Токены длительности

| Назначение | Длительность | Easing |
|---|---|---|
| Hover-переходы (стандарт) | `200ms` | ease |
| Hover-переходы (крупные) | `300ms` | ease |
| Плавные трансформации | `500ms` | ease-in-out |
| Масштабирование изображений | `700ms` | ease |
| Header-переход | `1000ms` | ease |
| Fade-in появление | `700ms` | ease-out |

## Эффекты

- **Fade-in:** `opacity 0 → 1` + `translateY(10px) → 0`
- **Header transition:** `bg-transparent` → `bg-[#7e2424]/95`, `h-[88px]` → `h-[64px]`
- **Card image scale:** `group-hover:scale-105` (700ms)
- **Arrow reveal (About cards):** `opacity-0 translate-y-4` → `opacity-100 translate-y-0` (500ms)
- **Logo crossfade:** два абсолютно позиционированных изображения, opacity-переход 1000ms

---

# Do's and Don'ts

## Do

- Используй кремовый фон (`#F5F2EB`) как основной, тёмный (`#121212`) — только для Hero и фонов медиа.
- Используй Skiff для заголовков, Nunito Sans для текста и навигации.
- Сохраняй uppercase + tracking для всех заголовков, кнопок и навигации.
- Применяй золото (`#D4AF37`, `#c9a96e`) точечно: hover, разделители, иконки.
- Используй двойные рамки (outline + border) для кнопок на светлом фоне.
- Используй орнаментальные линии для создания этнического настроения.
- Добавляй fade-in анимацию для ключевых секций при загрузке.
- Используй тёплый белый (`#fffdf9`), а не чистый `#FFFFFF`, на тёмных поверхностях.
- Разделяй секции золотым градиентным разделителем.

## Don't

- Не используй тёмную тему как основной режим — сайт светлый и тёплый.
- Не заменяй Skiff на системные шрифты для заголовков.
- Не используй золото (`#D4AF37`) как фон больших поверхностей.
- Не добавляй яркие, насыщенные цвета вне брендовой палитры.
- Не используй крупные тени (box-shadow) — только `shadow-sm` для карточек.
- Не перегружай анимациями — используй преимущественно hover-эффекты и fade-in.
- Не используй pill-форму для карточек — только `rounded-sm`.
- Не уменьшай tracking на заголовках и кнопках — просторная типографика важна для бренда.
- Не забывай про `motion-reduce` для accessibility.