from drf_spectacular.utils import extend_schema
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import status

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

    @action(
        detail=True,
        methods=["post"],
        url_path="respond",
    )
    def respond(self, request, pk=None):
        help_obj = self.get_object()
        user = request.user

        if help_obj.status == Help.Status.IN_PROGRESS:
            return Response(
                {"detail": "This help is already in progress"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if help_obj.status == Help.Status.DONE:
            return Response(
                {"detail": "This help is already done"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not user.is_authenticated:
            return Response(
                {"detail": "Not authenticated"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        if help_obj.creator == user:
            return Response(
                {"detail": "You cannot respond to your own help"},
                status=status.HTTP_403_FORBIDDEN
            )

        if help_obj.kind == Help.Kind.OFFER and user.role == "volunteer":
            return Response(
                {"detail": "Volunteers cannot respond to offers"},
                status=status.HTTP_403_FORBIDDEN
            )

        if help_obj.kind == Help.Kind.REQUEST and user.role == "distressed":
            return Response(
                {"detail": "The Distressed cannot respond to requests"},
                status=status.HTTP_403_FORBIDDEN
            )

        help_obj.status = Help.Status.IN_PROGRESS
        help_obj.counterpart = user
        help_obj.save()

        return Response(
            {"detail": "Help is in progress"},
            status=status.HTTP_200_OK,
        )

