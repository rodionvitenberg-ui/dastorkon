# backend/core/admin.py
from adminsortable2.admin import SortableAdminMixin
from django.contrib import admin
from modeltranslation.admin import TranslationAdmin
from .models import Category, Dish, ComboCategory, Combo, Tag
from .forms import TagForm

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
    filter_horizontal = ("tags",)

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

@admin.register(Tag)
class TagAdmin(TranslationAdmin):
    form = TagForm
    list_display = ("preview", "id", "title", "show_on_card", "order")
    list_editable = ("show_on_card", "order")
    search_fields = ("title",)
    list_filter = ("show_on_card",)