# backend/core/views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Category, Dish, ComboCategory, Combo
from .serializers import (
    CategoryWithDishesSerializer, 
    DishDetailSerializer,
    ComboCategoryWithCombosSerializer,
    ComboDetailSerializer,
    ComboListSerializer
)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """API для категорий блюд со всеми активными блюдами"""
    queryset = Category.objects.prefetch_related('dishes').all()
    serializer_class = CategoryWithDishesSerializer
    
    @action(detail=True, methods=['get'])
    def dishes(self, request, pk=None):
        """Получить все активные блюда категории"""
        category = self.get_object()
        dishes = category.dishes.filter(is_active=True).order_by('order')
        serializer = DishDetailSerializer(dishes, many=True, context={'request': request})
        return Response(serializer.data)


class DishViewSet(viewsets.ReadOnlyModelViewSet):
    """API для блюд"""
    queryset = Dish.objects.filter(is_active=True)
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return DishDetailSerializer
        return DishDetailSerializer
    
    @action(detail=True, methods=['get'])
    def combos(self, request, pk=None):
        """Получить все сборки, в которые входит это блюдо"""
        dish = self.get_object()
        combos = dish.combos.filter(is_active=True).order_by('order')
        serializer = ComboListSerializer(combos, many=True, context={'request': request})
        return Response(serializer.data)


class ComboCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """API для категорий сборок со всеми активными сборками"""
    queryset = ComboCategory.objects.prefetch_related('combos').all()
    serializer_class = ComboCategoryWithCombosSerializer
    
    @action(detail=True, methods=['get'])
    def combos(self, request, pk=None):
        """Получить все активные сборки категории"""
        category = self.get_object()
        combos = category.combos.filter(is_active=True).order_by('order')
        serializer = ComboDetailSerializer(combos, many=True, context={'request': request})
        return Response(serializer.data)


class ComboViewSet(viewsets.ReadOnlyModelViewSet):
    """API для сборок"""
    queryset = Combo.objects.filter(is_active=True).prefetch_related('dishes')
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ComboDetailSerializer
        return ComboListSerializer
    
    @action(detail=True, methods=['get'])
    def dishes(self, request, pk=None):
        """Получить все блюда в сборке"""
        combo = self.get_object()
        dishes = combo.dishes.filter(is_active=True).order_by('order')
        serializer = DishDetailSerializer(dishes, many=True, context={'request': request})
        return Response(serializer.data)
