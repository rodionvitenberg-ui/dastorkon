from django.core.management.base import BaseCommand
from core.models import Dish
from deep_translator import GoogleTranslator
import time
import re

# Google Translate поддерживает не все языки напрямую.
# Кыргызский может работать как 'ky'.
LANG_MAP = {
    "en": "en",
    "ky": "ky",
}

BATCH_DELAY = 0.3  # сек между запросами, чтобы не получить 429


def _translate(text: str, target: str) -> str:
    """Безопасный перевод с повторными попытками."""
    if not text or not text.strip():
        return ""
    text = text.strip()

    # Если текст уже на латинице (английские названия блюд, брендов) — не переводим
    # Короткие числовые строки, единицы измерения — пропускаем
    if re.match(r'^[\d\s\w.,/\\-]+$', text) and not re.search(r'[а-яё]', text, re.IGNORECASE):
        return text

    for attempt in range(3):
        try:
            if target == "ky":
                # У deep-translator ky может не быть, пробуем GoogleTranslator напрямую
                result = GoogleTranslator(source="ru", target="ky").translate(text)
            else:
                result = GoogleTranslator(source="ru", target="en").translate(text)
            time.sleep(BATCH_DELAY)
            return result if result else text
        except Exception as e:
            time.sleep(1.5)
            if attempt == 2:
                print(f"  ⚠ Ошибка перевода «{text[:40]}» → {target}: {e}")
                return text


class Command(BaseCommand):
    help = "Переводит названия и описания всех блюд на en и ky через Google Translate"

    def add_arguments(self, parser):
        parser.add_argument(
            "--force",
            action="store_true",
            help="Перевести все блюда, даже если перевод уже существует"
        )

    def handle(self, *args, **options):
        force = options["force"]

        dishes = Dish.objects.all()
        total = dishes.count()
        self.stdout.write(f"Найдено блюд: {total}")

        translated = 0
        skipped = 0
        errors = 0

        for idx, dish in enumerate(dishes, 1):
            ru_title = dish.title
            ru_short = dish.short_description or ""
            ru_desc = dish.description or ""

            needs_en = force or not dish.title_en
            needs_ky = force or not dish.title_ky

            if not needs_en and not needs_ky:
                skipped += 1
                if idx % 50 == 0:
                    self.stdout.write(f"  [{idx}/{total}] пропущено {skipped}...")
                continue

            self.stdout.write(f"\n  [{idx}/{total}] {ru_title[:50]}")

            # EN
            if needs_en:
                try:
                    en_title = _translate(ru_title, "en")
                    en_short = _translate(ru_short, "en") if ru_short else ""
                    en_desc = _translate(ru_desc, "en") if ru_desc else ""
                    dish.title_en = en_title
                    dish.short_description_en = en_short
                    dish.description_en = en_desc
                    self.stdout.write(f"    en: {en_title[:60]}")
                except Exception as e:
                    self.stdout.write(self.style.ERROR(f"    en ERROR: {e}"))
                    errors += 1

            # KY
            if needs_ky:
                try:
                    ky_title = _translate(ru_title, "ky")
                    ky_short = _translate(ru_short, "ky") if ru_short else ""
                    ky_desc = _translate(ru_desc, "ky") if ru_desc else ""
                    dish.title_ky = ky_title
                    dish.short_description_ky = ky_short
                    dish.description_ky = ky_desc
                    self.stdout.write(f"    ky: {ky_title[:60]}")
                except Exception as e:
                    self.stdout.write(self.style.ERROR(f"    ky ERROR: {e}"))
                    errors += 1

            dish.save(update_fields=[
                "title_en", "title_ky",
                "short_description_en", "short_description_ky",
                "description_en", "description_ky",
            ])
            translated += 1

        self.stdout.write(self.style.SUCCESS(
            f"\nГотово! Переведено: {translated}, пропущено: {skipped}, ошибок: {errors}"
        ))