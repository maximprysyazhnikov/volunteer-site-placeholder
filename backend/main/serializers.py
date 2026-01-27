from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from user.serializers import UserRetrieveSerializer

from .models import Help, HelpCategory


class HelpCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = HelpCategory
        fields = ['id', 'name']


class HelpListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(
        source="category.name",
        read_only=True,
    )

    class Meta:
        model = Help
        fields = [
            "id",
            "title",
            "location",
            "description",
            "kind",
            "category",
            "category_name",
            "status",
            "creator",
            "counterpart",
            "created_at",
            "updated_at",
            "completed_at"
        ]
        read_only_fields = [
            "status",
            "creator",
            "created_at",
            "updated_at",
            "completed_at",
            "counterpart",
        ]

    def validate_kind(self, value):
        request = self.context.get("request")
        user = request.user if request else None

        if not user or not user.is_authenticated:
            return value

        role = user.role

        if role == "volunteer" and value != Help.Kind.OFFER:
            raise ValidationError(
                "Volunteers can create only offers."
            )

        if role == "distressed" and value != Help.Kind.REQUEST:
            raise ValidationError(
                "Distressed can create only requests."
            )

        return value


class HelpRetrieveSerializer(HelpListSerializer):

    creator_info = UserRetrieveSerializer(
        read_only=True,
        many=False,
        source="creator",
    )
    counterpart_info = UserRetrieveSerializer(
        read_only=True,
        many=False,
        source="counterpart",
    )

    class Meta:
        model = Help
        fields = [
            "id",
            "title",
            "location",
            "description",
            "kind",
            "category",
            "category_name",
            "status",
            "creator",
            "creator_info",
            "counterpart",
            "counterpart_info",
            "created_at",
            "updated_at",
            "completed_at"
        ]
        read_only_fields = [
            "status",
            "creator",
            "created_at",
            "updated_at",
            "completed_at",
            "counterpart",
            "kind",
        ]


class HelpRespondSerializer(serializers.ModelSerializer):
    class Meta:
        model = Help
        fields = ()


class HelpCompleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Help
        fields = ()