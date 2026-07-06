# backend/core/urls.py
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, DishViewSet, ComboCategoryViewSet, ComboViewSet, TagViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'dishes', DishViewSet, basename='dish')
router.register(r'combo-categories', ComboCategoryViewSet, basename='combo-category')
router.register(r'combos', ComboViewSet, basename='combo')
router.register(r"tags", TagViewSet)


urlpatterns = [
    path('', include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    if getattr(settings, 'STATICFILES_DIRS', None):
        urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])
    elif getattr(settings, 'STATIC_ROOT', None):
        urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)