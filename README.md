# Dastorkon — сайт этно-кафе

Веб-платформа для этно-кафе **Dastorkon**: интерактивное меню, оформление блюд и бронирование столиков. Монорепозиторий из Next.js-фронтенда и Django REST API бэкенда.

## ✨ Возможности

- **Интерактивное меню** — блюда с категориями, характеристиками (тегами), фотографиями и сборками (комбо)
- **Мультиязычность** — русский 🇷🇺, английский 🇬🇧, кыргызский 🇰🇬
- **Оформление заказов** — корзина, оформление заказа, уведомления в Telegram
- **Админ-панель Jazzmin** — удобное управление каталогом, заказами и контентом
- **Три языка интерфейса** c сохранением в выборе через cookie
- **Адаптивный дизайн** — десктоп, планшет, мобильные (<768px)

## 🛠 Стек

### Frontend — `./frontend/`

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS** — дизайн-система на цветовых токенах
- **Zustand** — стейт-менеджмент (корзина, UI)
- **i18n** — маршрутизация и словари для ru/en/ky

### Backend — `./backend/`

- **Django 6** + **Django REST Framework**
- **PostgreSQL** — основная БД
- **django-modeltranslation** — переводы моделей (ru/en/ky)
- **Jazzmin** — кастомная админ-панель
- **django-admin-sortable2** — сортировка в админке
- **Whitenoise** — статика в production
- **Telegram-бот** — уведомления о новых заказах

## 🚀 Быстрый старт

### 1. База данных (PostgreSQL)

Создайте базу и пользователя:

```sql
CREATE USER dastorkon WITH PASSWORD 'your-password';
CREATE DATABASE dastorkon_db OWNER dastorkon;
```

Для быстрого восстановления из дампа:

```bash
psql -U dastorkon -d dastorkon_db -f dump.sql
```

### 2. Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # настройте подключение к БД
python manage.py migrate --noinput
python manage.py createsuperuser --noinput --username admin --email admin@example.com
python manage.py seed_menu --noinput   # наполнение меню (опционально)
python manage.py runserver
```

### 3. Frontend

```bash
cd frontend
npm install
cp .env.local.example .env.local   # укажите API-адрес бэкенда
npm run dev
```

Сайт будет доступен по адресу `http://localhost:3000`, админка — `http://localhost:8000/admin/`.

## 📂 Структура проекта

```
.
├── frontend/          # Next.js storefront
│   ├── app/           # страницы и маршрутизация ([locale])
│   ├── components/    # React-компоненты (меню, корзина, home)
│   ├── messages/      # i18n-словари ru/en/ky
│   ├── store/         # Zustand-сторы
│   └── types/         # TypeScript-типы (синхронизированы с API)
├── backend/           # Django REST API
│   ├── config/        # настройки проекта
│   ├── core/          # каталог: блюда, категории, теги, комбо
│   ├── orders/        # заказы, позиции, Telegram-уведомления
│   └── media/         # загруженные изображения
├── dump.sql           # PostgreSQL-дамп базы
├── docs/adr/          # Architectural Decision Records
├── DESIGN.md          # дизайн-система (токены, типографика)
├── CONTEXT.md         # глоссарий предметной области
└── CLAUDE.md          # инструкции для AI-агентов
```

## 🗄 Домен

| Термин | Описание |
| --- | --- |
| **Dish** | Позиция меню: категория, цена, вес, фото, теги |
| **Category** | Раздел меню (Салаты, Горячее и т.д.) с SVG-иконкой |
| **Combo** | Сборка из нескольких блюд по фиксированной цене |
| **Tag** | Характеристика блюда (Острое, Хит, Вегетарианское) |
| **Order** | Заказ клиента со статусом и позициями |

Статусы заказа: `new` → `processing` → `completed` / `cancelled`.

## 📄 Лицензия

Проект находится в стадии разработки. Все права защищены.
