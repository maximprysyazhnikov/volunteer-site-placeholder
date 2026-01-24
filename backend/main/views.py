from drf_spectacular.utils import extend_schema
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from main.models import HelpCategory, Help
from .serializers import HelpCategorySerializer, HelpListSerializer, HelpRetrieveSerializer
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


class HelpViewSet(ModelViewSet):
    queryset = Help.objects.all()

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

    def get_serializer_class(self):
        if self.action in {"retrieve", "update", "partial_update"}:
            return HelpRetrieveSerializer
        return HelpListSerializer
