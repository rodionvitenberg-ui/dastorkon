# backend/core/admin.py
from django.contrib import admin
from modeltranslation.admin import TranslationAdmin
from .models import Category, Dish, ComboCategory, Combo

@admin.register(Category)
class CategoryAdmin(TranslationAdmin):
    list_display = ('title', 'order')
    list_editable = ('order',)

@admin.register(Dish)
class DishAdmin(TranslationAdmin):
    list_display = ('title', 'category', 'price', 'is_active', 'order')
    list_filter = ('category', 'is_active')
    list_editable = ('price', 'is_active', 'order')
    # Добавили поиск по short_description
    search_fields = ('title', 'short_description', 'description')

@admin.register(ComboCategory)
class ComboCategoryAdmin(TranslationAdmin):
    list_display = ('title', 'order')
    list_editable = ('order',)

@admin.register(Combo)
class ComboAdmin(TranslationAdmin):
    list_display = ('title', 'category', 'price', 'is_active', 'order')
    list_filter = ('category', 'is_active')
    list_editable = ('price', 'is_active', 'order')
    search_fields = ('title', 'short_description', 'description')
    filter_horizontal = ('dishes',)  # Удобный интерфейс для выбора блюд