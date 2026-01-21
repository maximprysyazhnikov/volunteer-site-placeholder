from django.db import models


class HelpCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name = "help category"
        verbose_name_plural = "help categories"
        ordering = ("name",)

    def __str__(self):
        return self.name