from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


@admin.register(User)
class UserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ("Role", {"fields": ("role",)}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ("Role", {"fields": ("role",)}),
    )

