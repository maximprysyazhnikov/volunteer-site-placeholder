from debug_toolbar.toolbar import debug_toolbar_urls
from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)
from user.views import CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('admin/', admin.site.urls),
    # OpenAPI schema
    path('api/v1/schema/', SpectacularAPIView.as_view(), name='schema'),

    # Swagger UI
    path(
        'api/v1/swagger/',
        SpectacularSwaggerView.as_view(url_name='schema'),
        name='swagger-ui',
    ),

    # Redoc UI
    path(
        'api/v1/redoc/',
        SpectacularRedocView.as_view(url_name='schema'),
        name='redoc',
    ),
    path("api/v1/", include("main.urls")),
    path("api/v1/user/", include("user.urls")),
    path("api/v1/token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/v1/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
] + debug_toolbar_urls()
