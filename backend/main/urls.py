from django.urls import path, include

from .views import ping

from .views import HelpCategoryViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register('help-category', HelpCategoryViewSet)

urlpatterns = [
    path("ping/", ping),
    path("", include(router.urls)),
]