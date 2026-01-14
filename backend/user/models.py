from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    class Role(models.TextChoices):
        VOLUNTEER = "volunteer", "Volunteer"
        DISTRESSED = "distressed", "Distressed"
        ADMIN = "admin", "Admin"

    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.DISTRESSED,
    )

    def __str__(self):
        return self.username
