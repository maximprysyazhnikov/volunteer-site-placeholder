from rest_framework import serializers

from .models import HelpCategory


class HelpCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = HelpCategory
        fields = ['id', 'name']