import json
import os
from django.core.management.base import BaseCommand
from core.models import Category, Dish


class Command(BaseCommand):
    help = 'Импорт меню из файла menu.json'

    def add_arguments(self, parser):
        parser.add_argument('--file', type=str, default='menu.json', help='Путь к JSON файлу')
        parser.add_argument(
            '--force',
            action='store_true',
            help='Очистить существующие Dish и Category перед импортом'
        )

    def handle(self, *args, **options):
        file_path = options['file']
        force = options['force']

        if not os.path.exists(file_path):
            self.stdout.write(self.style.ERROR(f'Файл {file_path} не найден!'))
            return

        with open(file_path, 'r', encoding='utf-8') as f:
            try:
                data = json.load(f)
            except json.JSONDecodeError:
                self.stdout.write(self.style.ERROR('Ошибка чтения JSON. Проверь валидность файла.'))
                return

        if not isinstance(data, list) or len(data) == 0:
            self.stdout.write(self.style.ERROR('JSON должен быть непустым массивом.'))
            return

        # Очистка существующих данных, если --force
        if force:
            self.stdout.write(self.style.WARNING('Очищаем существующие блюда и категории...'))
            Dish.objects.all().delete()
            Category.objects.all().delete()
            self.stdout.write(self.style.SUCCESS('Существующие данные удалены.'))

        # 1. Собираем все уникальные категории с сохранением порядка первого появления
        seen_categories = {}
        category_order = []
        for item in data:
            cat_title = item.get('category', '').strip()
            if not cat_title:
                continue
            if cat_title not in seen_categories:
                seen_categories[cat_title] = None  # placeholder для объекта
                category_order.append(cat_title)

        # 2. Создаём категории с order по индексу
        category_map = {}  # title -> Category object
        for idx, cat_title in enumerate(category_order):
            cat, created = Category.objects.get_or_create(
                title=cat_title,
                defaults={'order': idx}
            )
            if not created and cat.order != idx:
                cat.order = idx
                cat.save(update_fields=['order'])
            category_map[cat_title] = cat

        self.stdout.write(self.style.SUCCESS(f'Создано/обновлено {len(category_map)} категорий.'))

        # 3. Создаём блюда с order по индексу в JSON
        created_count = 0
        for idx, item in enumerate(data):
            cat_title = item.get('category', '').strip()
            category = category_map.get(cat_title)
            if not category:
                self.stdout.write(self.style.WARNING(
                    f'Пропускаем элемент "{item.get("name", "?")}" — категория "{cat_title}" не найдена.'
                ))
                continue

            name = item.get('name', '').strip()
            if not name:
                continue

            description = item.get('description', '')
            price = item.get('price', 0)
            weight = item.get('weight', '')

            # short_description: описание или название, обрезанное до 250 символов
            short_desc = (description or name)[:250]

            Dish.objects.create(
                category=category,
                title=name,
                short_description=short_desc,
                description=description,
                price=price,
                weight=weight or '',
                order=idx,
                is_active=True,
            )
            created_count += 1

        self.stdout.write(self.style.SUCCESS(f'Успешно импортировано {created_count} позиций меню!'))