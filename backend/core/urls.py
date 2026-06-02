# backend/core/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, DishViewSet, ComboCategoryViewSet, ComboViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'dishes', DishViewSet, basename='dish')
router.register(r'combo-categories', ComboCategoryViewSet, basename='combo-category')
router.register(r'combos', ComboViewSet, basename='combo')

urlpatterns = [
    path('', include(router.urls)),
]
