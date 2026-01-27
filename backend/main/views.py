from drf_spectacular.utils import extend_schema, extend_schema_view, OpenApiResponse
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated

from main.models import HelpCategory, Help
from .serializers import HelpCategorySerializer, HelpListSerializer, HelpRetrieveSerializer
from .permissions import IsAdminOrReadOnly, IsAdminOrIsOwner

from django.utils import timezone


@extend_schema(
    summary="Health check",
    description="Returns API health status",
    responses={200: dict},
    tags=["Health"]
)
@api_view(["GET"])
def ping(request):
    return Response({"ping": "pong"})


@extend_schema_view(
    list=extend_schema(
        summary="List help categories",
        tags=["Help Categories"],
    ),
    retrieve=extend_schema(
        summary="Retrieve a help category",
        tags=["Help Categories"],
    ),
    create=extend_schema(
        summary="Create a help category (admin only)",
        tags=["Help Categories"],
    ),
    update=extend_schema(
        summary="Update a help category (PUT, admin only)",
        tags=["Help Categories"],
    ),
    partial_update=extend_schema(
        summary="Partially update a help category (PATCH, admin only)",
        description="Update one or more fields of a help category",
        tags=["Help Categories"],
    ),
    destroy=extend_schema(
        summary="Delete a help category (admin only)",
        tags=["Help Categories"],
    ),
)
class HelpCategoryViewSet(ModelViewSet):
    queryset = HelpCategory.objects.all()
    serializer_class = HelpCategorySerializer
    permission_classes = [IsAdminOrReadOnly]


@extend_schema_view(
    list=extend_schema(
        summary="List help requests and offers",
        tags=["Help"],
    ),
    retrieve=extend_schema(
        summary="Retrieve help details",
        tags=["Help"],
    ),
    create=extend_schema(
        summary="Create a help request or offer",
        description=(
            "Role-based behavior:\n"
            "- Volunteers can create only OFFERS\n"
            "- Distressed users can create only REQUESTS"
        ),
        tags=["Help"],
    ),
    update=extend_schema(
        summary="Update help (owner or admin)",
        tags=["Help"],
    ),
    partial_update=extend_schema(
        summary="Partially update help (owner or admin)",
        description="Update one or more fields of a help object",
        tags=["Help"],
    ),
    destroy=extend_schema(
        summary="Delete help (owner or admin)",
        tags=["Help"],
    ),

    respond=extend_schema(
        summary="Respond to a help request or offer",
        description=(
            "Marks help as IN_PROGRESS and assigns the current user as counterpart.\n\n"
            "Rules:\n"
            "- You cannot respond to your own help\n"
            "- Volunteers cannot respond to offers\n"
            "- Distressed users cannot respond to requests\n"
            "- Help must not be DONE or already IN_PROGRESS"
        ),
        request=None,
        responses={
            200: OpenApiResponse(description="Help is now in progress"),
            401: OpenApiResponse(description="Not authenticated"),
            403: OpenApiResponse(description="Forbidden"),
        },
        tags=["Help"],
    ),
    complete=extend_schema(
        summary="Complete help",
        description=(
            "Marks help as DONE and sets completed_at.\n\n"
            "Rules:\n"
            "- Help must be IN_PROGRESS\n"
            "- Only creator or admin can complete help"
        ),
        request=None,
        responses={
            200: OpenApiResponse(description="Help marked as done"),
            401: OpenApiResponse(description="Not authenticated"),
            403: OpenApiResponse(description="Forbidden"),
        },
        tags=["Help"],
    ),
)
class HelpViewSet(ModelViewSet):
    queryset = Help.objects.all()
    schema_tags = ["Help"]

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

    def get_serializer_class(self):
        if self.action in {"retrieve", "update", "partial_update"}:
            return HelpRetrieveSerializer
        return HelpListSerializer

    def get_permissions(self):
        if self.action in ["create", "respond", "complete"]:
            return [IsAuthenticated()]
        if self.action in ["update", "partial_update", "destroy"]:
            return [IsAdminOrIsOwner()]
        return [AllowAny()]


    @action(
        detail=True,
        methods=["post"],
        url_path="respond",
    )
    def respond(self, request, pk=None):
        user = request.user
        if not user.is_authenticated:
            return Response(
                {"detail": "Not authenticated"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        help_obj = self.get_object()
        if help_obj.status == Help.Status.IN_PROGRESS:
            return Response(
                {"detail": "This help is already in progress"},
                status=status.HTTP_403_FORBIDDEN,
            )

        if help_obj.status == Help.Status.DONE:
            return Response(
                {"detail": "This help is already done"},
                status=status.HTTP_403_FORBIDDEN,
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

    @action(
        detail=True,
        methods=["post"],
        url_path="complete",
    )
    def complete(self, request, pk=None):
        user = request.user
        if not user.is_authenticated:
            return Response(
                {"detail": "Not authenticated"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        help_obj = self.get_object()
        if help_obj.status == Help.Status.NEW:
            return Response(
                {"detail": "This help wasn't taken"},
                status=status.HTTP_403_FORBIDDEN
            )

        if help_obj.status == Help.Status.DONE:
            return Response(
                {"detail": "This help was already done"},
                status=status.HTTP_403_FORBIDDEN
            )

        if user != help_obj.creator and user.role != "admin":
            return Response(
                {"detail": "You cannot complete someone else's help"},
                status=status.HTTP_403_FORBIDDEN
            )

        help_obj.status = Help.Status.DONE
        help_obj.completed_at = timezone.now()
        help_obj.save()

        return Response(
            {"detail": "Help is done"},
            status=status.HTTP_200_OK,
        )
