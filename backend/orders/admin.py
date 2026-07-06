from django.contrib import admin
from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ('dish_name', 'price')
    fields = ('dish', 'dish_name', 'price', 'quantity')


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer_name', 'customer_phone', 'total_amount', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('customer_name', 'customer_phone', 'address')
    readonly_fields = ('total_amount', 'created_at', 'updated_at')
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


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'dish_name', 'price', 'quantity')
    list_filter = ('order__status',)
    search_fields = ('dish_name', 'order__customer_name')