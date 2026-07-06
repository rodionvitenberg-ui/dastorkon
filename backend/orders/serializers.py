from rest_framework import serializers
from .models import Order, OrderItem
from core.models import Dish

class OrderItemSerializer(serializers.ModelSerializer):
    dish_id = serializers.PrimaryKeyRelatedField(
        queryset=Dish.objects.all(),
        source='dish',
        write_only=True
    )

    class Meta:
        model = OrderItem
        fields = ['id', 'dish_id', 'dish_name', 'price', 'quantity']
        read_only_fields = ['id', 'dish_name', 'price']

    def create(self, validated_data):
        dish = validated_data.pop('dish')
        validated_data['dish_name'] = dish.title
        validated_data['price'] = dish.price
        return super().create(validated_data)


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = [
            'id', 'customer_name', 'customer_phone', 'address',
            'comment', 'total_amount', 'status', 'created_at', 'items'
        ]
        read_only_fields = ['id', 'status', 'created_at', 'total_amount']

    def create(self, validated_data):
        items_data = validated_data.pop('items')

        # Считаем общую сумму
        total = 0
        for item_data in items_data:
            dish = item_data.get('dish')
            if dish:
                total += float(dish.price) * item_data.get('quantity', 1)

        validated_data['total_amount'] = total

        # Создаем сам заказ
        order = Order.objects.create(**validated_data)

        # Создаем позиции заказа (используем serializer каждого item)
        for item_data in items_data:
            item_serializer = OrderItemSerializer(data=item_data)
            item_serializer.is_valid(raise_exception=True)
            item_serializer.save(order=order)

        return order
