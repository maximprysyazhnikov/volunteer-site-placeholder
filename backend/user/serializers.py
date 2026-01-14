from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import User

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["role"] = user.role
        token["username"] = user.username
        return token


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, min_length=8)
    role = serializers.ChoiceField(
        choices=[
            User.Role.DISTRESSED,
            User.Role.VOLUNTEER,
        ]
    )

    class Meta:
        model = User
        fields = ["username", "password", "email", "role"]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            password=validated_data["password"],
            email=validated_data["email"],
            role=validated_data["role"],
        )
        return user
