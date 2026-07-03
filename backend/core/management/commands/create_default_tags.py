from django.core.management.base import BaseCommand
from core.models import Tag

DEFAULT_TAGS = [
    ("Острое", "#C0392B"),
    ("Новинка", "#B8860B"),
    ("С чесноком", "#2B1E17"),
    ("Без лука", "#2B1E17"),
    ("Постное", "#2B1E17"),
    ("Сытное", "#2B1E17"),
    ("Суп", "#2B1E17"),
    ("Гриль", "#C0392B"),
    ("Хит продаж", "#B8860B"),
    ("Большая порция", "#2B1E17"),
    ("Маленькая порция", "#2B1E17"),
    ("Охлаждённое", "#2B1E17"),
    ("Горячее", "#C0392B"),
    ("Сладкое", "#B8860B"),
    ("Диетическое", "#2B1E17"),
    ("Остро‑сладкое", "#C0392B"),
    ("Сезонное", "#B8860B"),
]

class Command(BaseCommand):
    help = "Создаёт предустановленные теги"

    def handle(self, *args, **kwargs):
        for i, (title, color) in enumerate(DEFAULT_TAGS):
            tag, created = Tag.objects.get_or_create(
                title=title,
                defaults={
                    "color_text": "#2B1E17",
                    "color_bg_hex": color,
                    "order": i,
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f"Создан тег: {title}"))
            else:
                self.stdout.write(f"Уже существует: {title}")
