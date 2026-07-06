import json
import os
from django.core.management.base import BaseCommand
from core.models import Category, Dish

class Command(BaseCommand):
    help = 'Импорт меню из файла menu.json'

    def add_arguments(self, parser):
        parser.add_argument('--file', type=str, default='menu.json', help='Путь к JSON файлу')

    def handle(self, *args, **options):
        file_path = options['file']

        if not os.path.exists(file_path):
            self.stdout.write(self.style.ERROR(f'Файл {file_path} не найден!'))
            return

        with open(file_path, 'r', encoding='utf-8') as f:
            try:
                data = json.load(f)
            except json.JSONDecodeError:
                self.stdout.write(self.style.ERROR('Ошибка чтения JSON. Проверь валидность файла.'))
                return

        created_count = 0

        for item in data:
            # Получаем или создаем категорию по title
            category, _ = Category.objects.get_or_create(title=item['category'])

            description = item.get('description', '')
            
            # Генерируем short_description, так как в модели оно обязательно
            short_desc = description[:250] if description else item.get('name', '')[:250]

            # Создаем или обновляем блюдо, чтобы не плодить дубли при повторном запуске
            Dish.objects.update_or_create(
                title=item['name'],
                category=category,
                defaults={
                    'short_description': short_desc,
                    'description': description,
                    'price': item['price'],
                    'weight': item.get('weight', '')
                }
            )
            created_count += 1

        self.stdout.write(self.style.SUCCESS(f'Успешно обработано {created_count} позиций меню!'))