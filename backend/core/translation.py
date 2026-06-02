# backend/core/translation.py
from modeltranslation.translator import register, TranslationOptions
from .models import Category, Dish, ComboCategory, Combo

@register(Category)
class CategoryTranslationOptions(TranslationOptions):
    fields = ('title', 'description')

@register(Dish)
class DishTranslationOptions(TranslationOptions):
    # Добавили short_description в кортеж
    fields = ('title', 'short_description', 'description')

@register(ComboCategory)
class ComboCategoryTranslationOptions(TranslationOptions):
    fields = ('title', 'description')

@register(Combo)
class ComboTranslationOptions(TranslationOptions):
    fields = ('title', 'short_description', 'description')