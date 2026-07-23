from django.core.management.base import BaseCommand
from core.models import Category

TRANSLATIONS = {
    "Бешбармак": {
        "en": "Beshbarmak",
        "ky": "Бешбармак",
    },
    "Блюда от шефа": {
        "en": "Chef's Specials",
        "ky": "Шефтин тамактары",
    },
    "Бургеры": {
        "en": "Burgers",
        "ky": "Бургерлер",
    },
    "Вегетарианские блюда": {
        "en": "Vegetarian Dishes",
        "ky": "Вегетариандык тамактар",
    },
    "Вино": {
        "en": "Wine",
        "ky": "Шарап",
    },
    "Восточные блюда": {
        "en": "Oriental Dishes",
        "ky": "Чыгыш тамактары",
    },
    "Выпечка": {
        "en": "Pastries & Baked Goods",
        "ky": "Начинкалар",
    },
    "Гарниры": {
        "en": "Side Dishes",
        "ky": "Гарнирлер",
    },
    "Горячие блюда": {
        "en": "Main Courses",
        "ky": "Ысык тамактар",
    },
    "Горячие закуски": {
        "en": "Hot Appetizers",
        "ky": "Ысык закускалар",
    },
    "Десерты": {
        "en": "Desserts",
        "ky": "Десерттер",
    },
    "Детское меню": {
        "en": "Kids' Menu",
        "ky": "Балдар менюсу",
    },
    "Добавки": {
        "en": "Add-ons",
        "ky": "Кошумчалар",
    },
    "Европейские блюда": {
        "en": "European Dishes",
        "ky": "Европа тамактары",
    },
    "Завтраки": {
        "en": "Breakfast",
        "ky": "Эртең мененки тамак",
    },
    "Закуски": {
        "en": "Appetizers",
        "ky": "Закускалар",
    },
    "Закуски к пиву": {
        "en": "Beer Snacks",
        "ky": "Пивого закускалар",
    },
    "Коктейли": {
        "en": "Cocktails",
        "ky": "Коктейлдер",
    },
    "Кофе": {
        "en": "Coffee",
        "ky": "Кофе",
    },
    "Крепкий алкоголь": {
        "en": "Spirits",
        "ky": "Күчтүү алкоголь",
    },
    "Кыргызские блюда": {
        "en": "Kyrgyz Dishes",
        "ky": "Кыргыз тамактары",
    },
    "Лагман": {
        "en": "Lagman",
        "ky": "Лагман",
    },
    "Манты": {
        "en": "Manti",
        "ky": "Манты",
    },
    "Мясные блюда": {
        "en": "Meat Dishes",
        "ky": "Эт тамактары",
    },
    "Напитки": {
        "en": "Beverages",
        "ky": "Суусундуктар",
    },
    "Пиво": {
        "en": "Beer",
        "ky": "Пиво",
    },
    "Пицца": {
        "en": "Pizza",
        "ky": "Пицца",
    },
    "Плов": {
        "en": "Plov",
        "ky": "Плов",
    },
    "Салаты": {
        "en": "Salads",
        "ky": "Салаттар",
    },
    "Соусы": {
        "en": "Sauces",
        "ky": "Соустар",
    },
    "Супы": {
        "en": "Soups",
        "ky": "Шорполор",
    },
    "Тандыр сеты": {
        "en": "Tandyr Sets",
        "ky": "Тандыр сеттери",
    },
    "Тандыр стейки": {
        "en": "Tandyr Steaks",
        "ky": "Тандыр стейктери",
    },
    "Чай": {
        "en": "Tea",
        "ky": "Чай",
    },
    "Алкогольные коктейли": {
        "en": "Alcoholic Cocktails",
        "ky": "Алкоголдук коктейлдер",
    },
    "Шашлык": {
        "en": "Shashlik",
        "ky": "Шашлык",
    },
}


class Command(BaseCommand):
    help = "Заполняет переводы (en, ky) для всех категорий меню"

    def handle(self, *args, **options):
        updated = 0
        skipped = 0
        not_found = 0

        for cat in Category.objects.all():
            ru_title = cat.title
            if ru_title in TRANSLATIONS:
                t = TRANSLATIONS[ru_title]
                has_change = False
                if cat.title_en != t["en"]:
                    cat.title_en = t["en"]
                    has_change = True
                if cat.title_ky != t["ky"]:
                    cat.title_ky = t["ky"]
                    has_change = True
                if has_change:
                    cat.save(update_fields=["title_en", "title_ky"])
                    self.stdout.write(f"  ✓ {ru_title} → en: {t['en']}, ky: {t['ky']}")
                    updated += 1
                else:
                    skipped += 1
            else:
                self.stdout.write(self.style.WARNING(f"  ? {ru_title} — перевод не найден"))
                not_found += 1

        self.stdout.write(self.style.SUCCESS(
            f"\nГотово: обновлено {updated}, без изменений {skipped}, не найдено {not_found}"
        ))