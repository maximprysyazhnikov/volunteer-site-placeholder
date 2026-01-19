from rest_framework.views import APIView
from .permissions import IsOwnerOrReadOnly
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import (
    CustomTokenObtainPairSerializer,
    RegisterSerializer,
    UserRetrieveSerializer
)
from .models import User


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response(
            {
                "message": "User registered successfully",
                "email": user.email,
                "role": user.role,
            },
            status=status.HTTP_201_CREATED,
        )


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = UserRetrieveSerializer

