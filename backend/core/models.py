# backend/core/models.py
from django.db import models
from django.core.validators import FileExtensionValidator # Импортируем валидатор расширений

class Category(models.Model):
    title = models.CharField(max_length=255, verbose_name="Название категории")
    description = models.TextField(blank=True, verbose_name="Описание категории")
    
    # НОВОЕ ПОЛЕ: Иконка SVG
    icon = models.FileField(
        upload_to='categories/icons/', 
        validators=[FileExtensionValidator(['svg'])], # Разрешаем только SVG
        blank=True, 
        null=True, 
        verbose_name="Иконка (SVG)",
        help_text="Загрузите иконку категории в формате .svg"
    )
    
    order = models.PositiveIntegerField(default=0, verbose_name="Порядок вывода")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Категория меню"
        verbose_name_plural = "Категории меню"
        ordering = ['order']


class Dish(models.Model):
    category = models.ForeignKey(
        Category, 
        related_name='dishes', 
        on_delete=models.CASCADE, 
        verbose_name="Категория"
    )
    title = models.CharField(max_length=255, verbose_name="Название блюда")
    short_description = models.CharField(
        max_length=255, 
        verbose_name="Краткое описание", 
        help_text="Отображается в общем списке меню (до 255 символов)"
    )
    description = models.TextField(verbose_name="Полное описание", help_text="Отображается на отдельной странице блюда")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Цена (KGS)")
    
    # ФОТОГРАФИИ БЛЮДА (1 обязательная, 2 дополнительные)
    image = models.ImageField(upload_to='dishes/', verbose_name="Главное фото")
    image_2 = models.ImageField(upload_to='dishes/', blank=True, null=True, verbose_name="Фото 2 (необязательно)")
    image_3 = models.ImageField(upload_to='dishes/', blank=True, null=True, verbose_name="Фото 3 (необязательно)")
    
    is_active = models.BooleanField(default=True, verbose_name="Показывать в меню")
    order = models.PositiveIntegerField(default=0, verbose_name="Порядок вывода")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Блюдо"
        verbose_name_plural = "Блюда"
        ordering = ['category', 'order']


class ComboCategory(models.Model):
    title = models.CharField(max_length=255, verbose_name="Название категории сборки")
    description = models.TextField(blank=True, verbose_name="Описание категории")
    
    # Иконка SVG для категории сборок
    icon = models.FileField(
        upload_to='combo_categories/icons/', 
        validators=[FileExtensionValidator(['svg'])],
        blank=True, 
        null=True, 
        verbose_name="Иконка (SVG)",
        help_text="Загрузите иконку категории сборок в формате .svg"
    )
    
    order = models.PositiveIntegerField(default=0, verbose_name="Порядок вывода")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Категория сборки"
        verbose_name_plural = "Категории сборок"
        ordering = ['order']


class Combo(models.Model):
    category = models.ForeignKey(
        ComboCategory, 
        related_name='combos', 
        on_delete=models.CASCADE, 
        verbose_name="Категория сборки"
    )
    title = models.CharField(max_length=255, verbose_name="Название сборки")
    short_description = models.CharField(
        max_length=255, 
        verbose_name="Краткое описание", 
        help_text="Отображается в общем списке сборок (до 255 символов)"
    )
    description = models.TextField(verbose_name="Полное описание", help_text="Отображается на отдельной странице сборки")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Цена сборки (KGS)")
    
    # Связь многие-ко-многим с блюдами
    dishes = models.ManyToManyField(Dish, related_name='combos', verbose_name="Блюда в сборке")
    
    # ФОТОГРАФИИ СБОРКИ (1 обязательная, 2 дополнительные)
    image = models.ImageField(upload_to='combos/', verbose_name="Главное фото")
    image_2 = models.ImageField(upload_to='combos/', blank=True, null=True, verbose_name="Фото 2 (необязательно)")
    image_3 = models.ImageField(upload_to='combos/', blank=True, null=True, verbose_name="Фото 3 (необязательно)")
    
    is_active = models.BooleanField(default=True, verbose_name="Показывать в меню")
    order = models.PositiveIntegerField(default=0, verbose_name="Порядок вывода")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Сборка"
        verbose_name_plural = "Сборки"
        ordering = ['category', 'order']