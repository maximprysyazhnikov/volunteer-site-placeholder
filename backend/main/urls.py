from django.urls import include, path
from rest_framework import routers

from .views import HelpCategoryViewSet, HelpViewSet, ping

router = routers.DefaultRouter()
router.register('help-category', HelpCategoryViewSet)
router.register('help', HelpViewSet)

urlpatterns = [
    path("ping/", ping),
    path("", include(router.urls)),
]