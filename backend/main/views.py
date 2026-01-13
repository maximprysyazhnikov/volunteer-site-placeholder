from drf_spectacular.utils import extend_schema
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view


@extend_schema(
    summary="Health check",
    description="Returns API health status",
    responses={200: dict},
)
@api_view(["GET"])
def ping(request):
    return Response({"ping": "pong"})
