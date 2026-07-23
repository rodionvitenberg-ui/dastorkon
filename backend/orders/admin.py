from django.contrib import admin
from django.utils.html import format_html
from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ('dish_name', 'price')
    fields = ('dish', 'dish_name', 'price', 'quantity')
    classes = ('collapse',)


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer_name', 'customer_phone', 'total_amount', 'status_badge', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('customer_name', 'customer_phone', 'address')
    readonly_fields = ('total_amount', 'created_at', 'updated_at')
    list_editable = ()
    fieldsets = (
        ('Клиент', {
            'fields': ('customer_name', 'customer_phone', 'address')
        }),
        ('Заказ', {
            'fields': ('total_amount', 'status', 'comment')
        }),
        ('Даты', {
            'fields': ('created_at', 'updated_at')
        }),
    )
    inlines = [OrderItemInline]
    actions = ['mark_processing', 'mark_completed', 'mark_cancelled']

    def status_badge(self, obj):
        colors = {
            'new': ('Новый', '#3b82f6'),
            'processing': ('В обработке', '#f59e0b'),
            'completed': ('Завершён', '#10b981'),
            'cancelled': ('Отменён', '#ef4444'),
        }
        label, color = colors.get(obj.status, (obj.status, '#6b7280'))
        return format_html(
            '<span style="background:{}; color:white; padding:3px 8px; '
            'border-radius:4px; font-weight:600; font-size:12px;">{}</span>',
            color, label
        )
    status_badge.short_description = "Статус"
    status_badge.admin_order_field = 'status'

    def mark_processing(self, request, queryset):
        queryset.update(status='processing')
    mark_processing.short_description = "Перевести в «В обработке»"

    def mark_completed(self, request, queryset):
        queryset.update(status='completed')
    mark_completed.short_description = "Перевести в «Завершён»"

    def mark_cancelled(self, request, queryset):
        queryset.update(status='cancelled')
    mark_cancelled.short_description = "Перевести в «Отменён»"


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'order_link', 'dish_name', 'price', 'quantity')
    list_filter = ('order__status',)
    search_fields = ('dish_name', 'order__customer_name')
    readonly_fields = ('dish', 'dish_name', 'price', 'quantity', 'order')

    def order_link(self, obj):
        return format_html(
            '<a href="{}">Заказ #{}</a>',
            f'/admin/orders/order/{obj.order.id}/change/',
            obj.order.id
        )
    order_link.short_description = "Заказ"