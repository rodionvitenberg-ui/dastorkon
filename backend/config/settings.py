# config/settings.py
from pathlib import Path
import os
from dotenv import load_dotenv
from django.conf.locale import LANG_INFO

BASE_DIR = Path(__file__).resolve().parent.parent

# Загружаем .env
load_dotenv(BASE_DIR / ".env")

# =========================
# Основные настройки
# =========================

SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key")
DEBUG = os.getenv("DEBUG", "True") == "True"

ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "localhost,127.0.0.1").split(",")

# =========================
# Приложения
# =========================

INSTALLED_APPS = [
    "jazzmin",
    "modeltranslation",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    "rest_framework",
    "corsheaders",
    "adminsortable2",

    "core",
    "orders",
]

# =========================
# Middleware
# =========================

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.locale.LocaleMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

# =========================
# Templates
# =========================

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"

# =========================
# База данных (PostgreSQL)
# =========================

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.getenv("DB_NAME", "dastorkon"),
        "USER": os.getenv("DB_USER", "postgres"),
        "PASSWORD": os.getenv("DB_PASSWORD", "postgres"),
        "HOST": os.getenv("DB_HOST", "127.0.0.1"),
        "PORT": os.getenv("DB_PORT", "5432"),
    }
}

# =========================
# Пароли
# =========================

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# =========================
# Локализация
# =========================

# Базовый язык
LANGUAGE_CODE = "ru"

LANGUAGES = [
    ("ru", "Russian"),
    ("en", "English"),
    ("ky", "Kyrgyz"),
]

MODELTRANSLATION_DEFAULT_LANGUAGE = "ru"
MODELTRANSLATION_LANGUAGES = ("ru", "en", "ky")

USE_I18N = True
USE_L10N = True
USE_TZ = True

TIME_ZONE = "UTC"

# =========================
# Статика и медиа
# =========================

STATIC_URL = "/static/"

STATIC_ROOT = BASE_DIR / 'staticfiles'

STATICFILES_DIRS = [
    BASE_DIR / 'static',
]

MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")

# =========================
# CORS
# =========================

CORS_ALLOWED_ORIGINS = os.getenv("CORS_ALLOWED_ORIGINS", "http://localhost:3000").split(",")

# =========================
# Jazzmin (кастомная админка)
# =========================

JAZZMIN_SETTINGS = {
    "site_title": "Dastorkon",
    "site_header": "Dastorkon",
    # Non-empty so Jazzmin does not fall back to Django "Администрирование …"
    "site_brand": "\u200b",
    "site_logo": "admin/img/logo.png",
    "site_logo_classes": "img-responsive d-none",
    "site_icon": None,
    "welcome_sign": "Добро пожаловать в админ-панель Dastorkon",
    "copyright": "Dastorkon Etno-Cafe",
    "search_model": ["core.Dish", "core.Category", "orders.Order"],
    "user_avatar": None,
    "topmenu_links": [
        {"name": "Главная", "url": "admin:index", "permissions": ["auth.view_user"]},
        {"model": "auth.User"},
    ],
    "usermenu_links": [],
    "show_sidebar": True,
    "navigation_expanded": True,
    "hide_apps": [],
    "hide_models": [],
    "order_with_respect_to": [
        "orders",
        "core",
    ],
    "custom_links": {},
    "icons": {
        "auth": "fas fa-users-cog",
        "auth.user": "fas fa-user",
        "auth.Group": "fas fa-users",
        "orders.Order": "fas fa-shopping-cart",
        "orders.OrderItem": "fas fa-box",
        "core.Dish": "fas fa-utensils",
        "core.Category": "fas fa-list",
        "core.Tag": "fas fa-tags",
        "core.Combo": "fas fa-layer-group",
        "core.ComboCategory": "fas fa-folder-open",
    },
    "default_icon_parents": "fas fa-chevron-circle-right",
    "default_icon_children": "fas fa-circle",
    "related_modal_active": False,
    "custom_css": "admin/css/dastorkon-admin.css",
    "custom_js": None,
    "use_google_fonts_cdn": False,
    "show_ui_builder": False,
    "changeform_format": "horizontal_tabs",
    "changeform_format_overrides": {
        "auth.user": "collapsible",
        "auth.group": "vertical_tabs",
    },
}

JAZZMIN_UI_TWEAKS = {
    "navbar": "navbar-dark navbar-no-bg",
    "theme": "flatly",
    "sidebar": "sidebar-dark-danger",
    "sidebar_nav_child_hide_on_collapse": True,
    "dark_mode_theme": None,
    "button_classes": {
        "primary": "btn-outline-primary",
        "secondary": "btn-outline-secondary",
        "info": "btn-outline-info",
        "warning": "btn-outline-warning",
        "danger": "btn-outline-danger",
        "success": "btn-outline-success",
    },
    "actions_sticky_top": False,
}

# =========================
# DRF
# =========================

REST_FRAMEWORK = {
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 8,
}