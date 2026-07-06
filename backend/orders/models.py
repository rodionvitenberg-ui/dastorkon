from django.db import models
from core.models import Dish

class Order(models.Model):
    STATUS_CHOICES = (
        ('new', 'Новый'),
        ('processing', 'В обработке'),
        ('completed', 'Завершен'),
        ('cancelled', 'Отменен'),
    )

    customer_name = models.CharField(max_length=100, verbose_name='Имя клиента')
    customer_phone = models.CharField(max_length=20, verbose_name='Телефон')
    address = models.CharField(max_length=255, blank=True, null=True, verbose_name='Адрес доставки')
    comment = models.TextField(blank=True, null=True, verbose_name='Комментарий к заказу')
    
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Общая сумма', default=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new', verbose_name='Статус')
    
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Дата обновления')

    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'
        ordering = ['-created_at']

    def __str__(self):
        return f"Заказ #{self.id} от {self.customer_name}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE, verbose_name='Заказ')
    dish = models.ForeignKey(Dish, on_delete=models.SET_NULL, null=True, verbose_name='Блюдо')
    
    # Фиксируем название и цену на момент заказа, чтобы при изменении цен в меню история заказов не ломалась
    dish_name = models.CharField(max_length=255, verbose_name='Название блюда')
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Цена за единицу')
    quantity = models.PositiveIntegerField(default=1, verbose_name='Количество')

    class Meta:
        verbose_name = 'Позиция заказа'
        verbose_name_plural = 'Позиции заказа'

    def __str__(self):
        return f"{self.dish_name} x {self.quantity} (Заказ #{self.order.id})"