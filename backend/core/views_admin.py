# backend/core/views_admin.py
from django.contrib.admin.views.decorators import staff_member_required
from django.shortcuts import render
from django.utils import timezone
from datetime import datetime, timedelta

from orders.models import Order
from core.models import Dish, Category, Combo, ComboCategory, Tag


STATUS_COLORS = {
    'new': '#3b82f6',
    'processing': '#f59e0b',
    'completed': '#10b981',
    'cancelled': '#ef4444',
}

STATUS_LABELS = {
    'new': 'Новый',
    'processing': 'В обработке',
    'completed': 'Завершён',
    'cancelled': 'Отменён',
}


@staff_member_required
def admin_dashboard(request):
    """Кастомная главная страница админ-панели Dastorkon."""
    
    # Статистика заказов
    today = timezone.now().date()
    today_start = timezone.make_aware(
        datetime.combine(today, datetime.min.time())
    )
    
    orders_total = Order.objects.count()
    orders_new = Order.objects.filter(status='new').count()
    orders_processing = Order.objects.filter(status='processing').count()
    orders_completed = Order.objects.filter(status='completed').count()
    orders_cancelled = Order.objects.filter(status='cancelled').count()
    orders_today = Order.objects.filter(created_at__gte=today_start).count()
    
    # Последние 10 заказов — передаём как список словарей для удобства шаблона
    recent_qs = Order.objects.order_by('-created_at')[:10]
    recent_orders = []
    for order in recent_qs:
        recent_orders.append({
            'order': order,
            'color': STATUS_COLORS.get(order.status, '#6b7280'),
            'label': STATUS_LABELS.get(order.status, order.status),
        })
    
    # Статистика по меню
    dishes_count = Dish.objects.count()
    dishes_active = Dish.objects.filter(is_active=True).count()
    categories_count = Category.objects.count()
    combos_count = Combo.objects.count()
    combo_categories_count = ComboCategory.objects.count()
    tags_count = Tag.objects.count()
    
    context = {
        'title': 'Главная панель',
        'orders_total': orders_total,
        'orders_new': orders_new,
        'orders_processing': orders_processing,
        'orders_completed': orders_completed,
        'orders_cancelled': orders_cancelled,
        'orders_today': orders_today,
        'recent_orders': recent_orders,
        'dishes_count': dishes_count,
        'dishes_active': dishes_active,
        'categories_count': categories_count,
        'combos_count': combos_count,
        'combo_categories_count': combo_categories_count,
        'tags_count': tags_count,
        'has_permission': request.user.is_active and request.user.is_staff,
    }
    
    return render(request, 'admin/dashboard.html', context)