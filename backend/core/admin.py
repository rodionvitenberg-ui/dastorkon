# backend/core/admin.py
from adminsortable2.admin import SortableAdminMixin
from django.contrib import admin
from django.utils.html import format_html
from modeltranslation.admin import TranslationAdmin
from .models import Category, Dish, ComboCategory, Combo, Tag
from .forms import TagForm


@admin.register(Category)
class CategoryAdmin(TranslationAdmin):
    list_display = ('title', 'icon_preview', 'order')
    list_editable = ('order',)
    search_fields = ('title',)

    def icon_preview(self, obj):
        if obj.icon:
            return format_html(
                '<span class="admin-icon-preview">{}</span>',
                obj.icon.read().decode('utf-8') if hasattr(obj.icon, 'read') else '',
            )
        return "—"
    icon_preview.short_description = "Иконка"


@admin.register(Dish)
class DishAdmin(TranslationAdmin):
    list_display = ('title', 'category', 'price', 'weight', 'is_active', 'order', 'image_preview')
    list_filter = ('category', 'is_active', 'tags')
    list_editable = ('price', 'is_active', 'order')
    search_fields = ('title', 'short_description', 'description')
    filter_horizontal = ("tags",)
    fieldsets = (
        ('Основное', {
            'fields': ('category', 'title', 'short_description', 'description')
        }),
        ('Цена и вес', {
            'fields': ('price', 'weight')
        }),
        ('Фотографии', {
            'fields': ('image', 'image_2', 'image_3'),
            'description': 'Главное фото обязательно. Дополнительные фото — опционально.'
        }),
        ('Настройки', {
            'fields': ('tags', 'is_active', 'order')
        }),
    )
    actions = ['make_active', 'make_inactive']

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" class="admin-image-preview" />',
                obj.image.url
            )
        return "—"
    image_preview.short_description = "Фото"

    def make_active(self, request, queryset):
        queryset.update(is_active=True)
    make_active.short_description = "Включить показ в меню"

    def make_inactive(self, request, queryset):
        queryset.update(is_active=False)
    make_inactive.short_description = "Отключить показ в меню"


@admin.register(ComboCategory)
class ComboCategoryAdmin(TranslationAdmin):
    list_display = ('title', 'icon_preview', 'order')
    list_editable = ('order',)
    search_fields = ('title',)

    def icon_preview(self, obj):
        if obj.icon:
            return format_html(
                '<span class="admin-icon-preview">{}</span>',
                obj.icon.read().decode('utf-8') if hasattr(obj.icon, 'read') else '',
            )
        return "—"
    icon_preview.short_description = "Иконка"


@admin.register(Combo)
class ComboAdmin(TranslationAdmin):
    list_display = ('title', 'category', 'price', 'is_active', 'order', 'image_preview')
    list_filter = ('category', 'is_active')
    list_editable = ('price', 'is_active', 'order')
    search_fields = ('title', 'short_description', 'description')
    filter_horizontal = ('dishes',)
    fieldsets = (
        ('Основное', {
            'fields': ('category', 'title', 'short_description', 'description')
        }),
        ('Цена', {
            'fields': ('price',)
        }),
        ('Фотографии', {
            'fields': ('image', 'image_2', 'image_3'),
            'description': 'Главное фото обязательно. Дополнительные фото — опционально.'
        }),
        ('Блюда в сборке', {
            'fields': ('dishes',)
        }),
        ('Настройки', {
            'fields': ('is_active', 'order')
        }),
    )
    actions = ['make_active', 'make_inactive']

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" class="admin-image-preview" />',
                obj.image.url
            )
        return "—"
    image_preview.short_description = "Фото"

    def make_active(self, request, queryset):
        queryset.update(is_active=True)
    make_active.short_description = "Включить показ в меню"

    def make_inactive(self, request, queryset):
        queryset.update(is_active=False)
    make_inactive.short_description = "Отключить показ в меню"


@admin.register(Tag)
class TagAdmin(TranslationAdmin):
    form = TagForm
    list_display = ("preview", "id", "title", "show_on_card", "order")
    list_editable = ("show_on_card", "order")
    search_fields = ("title",)
    list_filter = ("show_on_card",)