import os
import logging
from typing import Optional

logger = logging.getLogger(__name__)


def send_order_notification(order) -> bool:
    """
    Отправляет уведомление о новом заказе в Telegram.
    Возвращает True при успехе, False при ошибке или отсутствии токена.
    """
    token = os.getenv("TELEGRAM_BOT_TOKEN", "").strip()
    chat_id = os.getenv("TELEGRAM_CHAT_ID", "").strip()

    if not token or not chat_id:
        logger.info("Telegram notification skipped: TOKEN or CHAT_ID not configured")
        return False

    # Формируем текст сообщения
    items_text = ""
    for item in order.items.all():
        items_text += (
            f"• {item.dish_name} — {item.quantity} шт. × {item.price} СOM\n"
        )

    message = (
        f"🛎 <b>Новый заказ #{order.id}</b>\n"
        f"━━━━━━━━━━━━━━━━\n"
        f"👤 <b>Имя:</b> {order.customer_name}\n"
        f"📞 <b>Телефон:</b> {order.customer_phone}\n"
        f"📍 <b>Адрес:</b> {order.address or '—'}\n"
        f"━━━━━━━━━━━━━━━━\n"
        f"<b>Позиции:</b>\n"
        f"{items_text}"
        f"━━━━━━━━━━━━━━━━\n"
        f"💰 <b>Итого:</b> {order.total_amount} СOM\n"
        f"📅 <b>Дата:</b> {order.created_at.strftime('%d.%m.%Y %H:%M')}"
    )

    if order.comment:
        message += f"\n━━━━━━━━━━━━━━━━\n💬 <b>Комментарий:</b>\n{order.comment}"

    try:
        import requests

        url = f"https://api.telegram.org/bot{token}/sendMessage"
        payload = {
            "chat_id": chat_id,
            "text": message,
            "parse_mode": "HTML",
        }
        resp = requests.post(url, json=payload, timeout=10)
        resp.raise_for_status()
        logger.info(f"Telegram notification sent for order #{order.id}")
        return True

    except Exception as e:
        logger.error(f"Failed to send Telegram notification for order #{order.id}: {e}")
        return False