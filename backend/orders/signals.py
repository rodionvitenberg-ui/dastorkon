from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Order
from .telegram import send_order_notification


@receiver(post_save, sender=Order)
def notify_new_order(sender, instance, created, **kwargs):
    """
    Отправляет уведомление в Telegram только при создании нового заказа.
    """
    if created:
        send_order_notification(instance)