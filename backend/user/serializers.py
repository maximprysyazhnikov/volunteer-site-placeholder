from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.conf import settings

from .models import User


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["id"] = user.id
        token["role"] = user.role
        token["email"] = user.email
        return token



class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    role = serializers.ChoiceField(
        choices=[
            User.Role.DISTRESSED,
            User.Role.VOLUNTEER,
        ]
    )

    class Meta:
        model = User
        fields = [
            "email",
            "password",
            "first_name",
            "last_name",
            "phone_number",
            "role",
        ]

    def validate_password(self, value):
        validate_password(value)
        return value

    def create(self, validated_data):
        password = validated_data.pop("password")

        user = User.objects.create_user(
            password=password,
            **validated_data
        )
        return user


class UserRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "phone_number",
            "role",
        ]
        read_only_fields = ["id", "role"]


class AdminRegisterSerializer(RegisterSerializer):
    secret_code = serializers.CharField(write_only=True, required=True)

    class Meta(RegisterSerializer.Meta):
        fields = RegisterSerializer.Meta.fields + ["secret_code"]

    def validate_secret_code(self, value):
        if value != settings.ADMIN_SECRET_CODE:
            raise serializers.ValidationError("Invalid secret code.")
        return value

    def create(self, validated_data):
        validated_data.pop("secret_code")

        user = User.objects.create_user(
            **validated_data,
            role="admin",
        )

        user.is_staff = True
        user.is_superuser = True
        user.save(update_fields=["is_staff", "is_superuser"])

        return user
