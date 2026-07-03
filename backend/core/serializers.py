# backend/core/serializers.py
from rest_framework import serializers
from django.utils import translation
from .models import Category, Dish, ComboCategory, Combo, Tag


# ============================
# Универсальная функция локализации
# ============================

from django.utils import translation

LANG_EQUIV = {
    "kg": "ky",   # если фронт использует kg, а modeltranslation использует ky
    "ky": "ky",
    "ru": "ru",
    "en": "en",
}

def _localized_value(obj, field: str, context: dict | None = None, default_lang: str = "ru"):
    """
    Надёжный выбор локализованного поля.
    Порядок языка: request.LANGUAGE_CODE -> translation.get_language() -> default_lang
    Поддерживает эквивалентность kg <-> ky.
    Порядок поиска значения:
      1) field_<lang> (и эквиваленты, если есть)
      2) field_<default_lang>
      3) field (базовое)
    """
    # 1) язык из request в context
    lang = None
    if context:
        req = context.get("request")
        if req:
            lang = getattr(req, "LANGUAGE_CODE", None)

    # 2) глобальная активная локаль
    if not lang:
        lang = translation.get_language()

    if not lang:
        lang = default_lang

    lang = str(lang).split("-")[0].lower()

    # нормализуем (поддержка kg/ky)
    norm = LANG_EQUIV.get(lang, lang)

    # пробуем основной вариант
    candidates = [norm]
    # если norm == 'ky', также попробуем 'kg' и наоборот
    if norm == "ky":
        candidates.append("kg")
    elif norm == "kg":
        candidates.append("ky")

    # 1) пробуем field_<candidate>
    for c in candidates:
        val = getattr(obj, f"{field}_{c}", None)
        if val:
            return val

    # 2) пробуем default_lang (обычно ru)
    val = getattr(obj, f"{field}_{default_lang}", None)
    if val:
        return val

    # 3) базовое поле
    return getattr(obj, field, "") or ""


# ============================
# Dish (список)
# ============================

class TagSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()

    class Meta:
        model = Tag
        fields = ["id", "title", "show_on_card", "color_text", "color_bg"]

    def get_title(self, obj):
        return _localized_value(obj, "title", context=self.context)

class DishListSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    short_description = serializers.SerializerMethodField()
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = Dish
        fields = ["id", "title", "short_description", "price", "images", "tags"]

    def get_title(self, obj):
        return _localized_value(obj, "title", context=self.context)

    def get_short_description(self, obj):
        return _localized_value(obj, "short_description", context=self.context)

    def get_images(self, obj):
        request = self.context.get("request")
        images_list = []
        for img_field in [obj.image, obj.image_2, obj.image_3]:
            if img_field:
                images_list.append(request.build_absolute_uri(img_field.url) if request else img_field.url)
        return images_list


# ============================
# Dish (детальная страница)
# ============================

class DishDetailSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    short_description = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    category_name = serializers.SerializerMethodField()
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = Dish
        fields = [
            "id",
            "title",
            "short_description",
            "description",
            "price",
            "images",
            "category_name",
            "tags"
        ]

    def get_title(self, obj):
        return _localized_value(obj, "title", context=self.context)

    def get_short_description(self, obj):
        return _localized_value(obj, "short_description", context=self.context)

    def get_description(self, obj):
        return _localized_value(obj, "description", context=self.context)

    def get_category_name(self, obj):
        if not getattr(obj, "category", None):
            return ""
        return _localized_value(obj.category, "title", context=self.context)

    def get_images(self, obj):
        request = self.context.get("request")
        images_list = []
        for img_field in [obj.image, obj.image_2, obj.image_3]:
            if img_field:
                images_list.append(request.build_absolute_uri(img_field.url) if request else img_field.url)
        return images_list


# ============================
# Category
# ============================

class CategoryWithDishesSerializer(serializers.ModelSerializer):
    dishes = serializers.SerializerMethodField()
    icon = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ["id", "title", "description", "icon", "dishes"]

    def get_title(self, obj):
        return _localized_value(obj, "title", context=self.context)

    def get_description(self, obj):
        return _localized_value(obj, "description", context=self.context)

    def get_icon(self, obj):
        if not obj.icon:
            return None
        request = self.context.get("request")
        return request.build_absolute_uri(obj.icon.url) if request else obj.icon.url

    def get_dishes(self, obj):
        active_dishes = obj.dishes.filter(is_active=True).order_by("order")
        # Копируем контекст и гарантируем передачу request
        ctx = dict(self.context or {})
        if self.context and self.context.get("request"):
            ctx["request"] = self.context.get("request")
        return DishListSerializer(active_dishes, many=True, context=ctx).data


# ============================
# Combo (список)
# ============================

class ComboListSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    short_description = serializers.SerializerMethodField()

    class Meta:
        model = Combo
        fields = ["id", "title", "short_description", "price", "images"]

    def get_title(self, obj):
        return _localized_value(obj, "title", context=self.context)

    def get_short_description(self, obj):
        return _localized_value(obj, "short_description", context=self.context)

    def get_images(self, obj):
        request = self.context.get("request")
        images_list = []
        for img_field in [obj.image, obj.image_2, obj.image_3]:
            if img_field:
                images_list.append(request.build_absolute_uri(img_field.url) if request else img_field.url)
        return images_list


# ============================
# Combo (детальная страница)
# ============================

class ComboDetailSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()
    dishes = DishListSerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    title = serializers.SerializerMethodField()
    short_description = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    category_name = serializers.SerializerMethodField()

    class Meta:
        model = Combo
        fields = [
            "id",
            "title",
            "short_description",
            "description",
            "price",
            "images",
            "category_name",
            "dishes",
            "tags"
        ]

    def get_title(self, obj):
        return _localized_value(obj, "title", context=self.context)

    def get_short_description(self, obj):
        return _localized_value(obj, "short_description", context=self.context)

    def get_description(self, obj):
        return _localized_value(obj, "description", context=self.context)

    def get_category_name(self, obj):
        if not getattr(obj, "category", None):
            return ""
        return _localized_value(obj.category, "title", context=self.context)

    def get_images(self, obj):
        request = self.context.get("request")
        images_list = []
        for img_field in [obj.image, obj.image_2, obj.image_3]:
            if img_field:
                images_list.append(request.build_absolute_uri(img_field.url) if request else img_field.url)
        return images_list


# ============================
# ComboCategory
# ============================

class ComboCategoryWithCombosSerializer(serializers.ModelSerializer):
    combos = serializers.SerializerMethodField()
    icon = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()

    class Meta:
        model = ComboCategory
        fields = ["id", "title", "description", "icon", "combos"]

    def get_title(self, obj):
        return _localized_value(obj, "title", context=self.context)

    def get_description(self, obj):
        return _localized_value(obj, "description", context=self.context)

    def get_icon(self, obj):
        if not obj.icon:
            return None
        request = self.context.get("request")
        return request.build_absolute_uri(obj.icon.url) if request else obj.icon.url

    def get_combos(self, obj):
        active_combos = obj.combos.filter(is_active=True).order_by("order")
        ctx = dict(self.context or {})
        if self.context and self.context.get("request"):
            ctx["request"] = self.context.get("request")
        return ComboListSerializer(active_combos, many=True, context=ctx).data