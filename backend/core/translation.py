from modeltranslation.translator import register, TranslationOptions
from .models import Category, Dish, Tag, ComboCategory, Combo

@register(Category)
class CategoryTranslationOptions(TranslationOptions):
    fields = ('title', 'description')
    required_languages = ('ru',)

@register(Dish)
class DishTranslationOptions(TranslationOptions):
    fields = ('title', 'short_description', 'description')
    required_languages = ('ru',)

@register(Tag)
class TagTranslationOptions(TranslationOptions):
    fields = ('title',)
    required_languages = ('ru',)

@register(ComboCategory)
class ComboCategoryTranslationOptions(TranslationOptions):
    fields = ('title', 'description')
    required_languages = ('ru',)

@register(Combo)
class ComboTranslationOptions(TranslationOptions):
    fields = ('title', 'short_description', 'description')
    required_languages = ('ru',)
