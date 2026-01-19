from django.urls import path, include
from .views import RegisterView
from rest_framework.routers import DefaultRouter
from user.views import UserViewSet

router = DefaultRouter()
router.register("user", UserViewSet)

urlpatterns = [
    path("user/register/", RegisterView.as_view(), name="register"),
    path("", include(router.urls)),
]