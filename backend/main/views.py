from drf_spectacular.utils import extend_schema
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from main.models import HelpCategory
from .serializers import HelpCategorySerializer
from .permissions import IsAdminOrReadOnly


@extend_schema(
    summary="Health check",
    description="Returns API health status",
    responses={200: dict},
)
@api_view(["GET"])
def ping(request):
    return Response({"ping": "pong"})


class HelpCategoryViewSet(ModelViewSet):
    queryset = HelpCategory.objects.all()
    serializer_class = HelpCategorySerializer
    permission_classes = [IsAdminOrReadOnly]
