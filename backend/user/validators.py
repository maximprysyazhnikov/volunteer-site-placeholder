import re
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _


class CustomPasswordValidator:
    SPECIAL_CHARS = r"""[.,;:?!…—–()\[\]{}"«»„“‘’]"""
    CYRILLIC_CHARS = r"[А-Яа-яІіЇїЄєЁё]"

    def validate(self, password, user=None):
        # Length validation
        if not 8 <= len(password) <= 20:
            raise ValidationError(
                _("Password must be between 8 and 20 characters long."),
                code="invalid_length",
            )

        # Whitespace / non-printable characters
        if re.search(r"\s", password):
            raise ValidationError(
                _("Password must not contain spaces or non-printable characters."),
                code="whitespace_not_allowed",
            )

        # Cyrillic characters are not allowed
        if re.search(self.CYRILLIC_CHARS, password):
            raise ValidationError(
                _("Password must not contain Cyrillic characters."),
                code="cyrillic_not_allowed",
            )

        # At least one uppercase Latin letter
        if not re.search(r"[A-Z]", password):
            raise ValidationError(
                _("Password must contain at least one uppercase Latin letter."),
                code="no_uppercase",
            )

        # At least one digit
        if not re.search(r"\d", password):
            raise ValidationError(
                _("Password must contain at least one digit."),
                code="no_digit",
            )

        # At least one special character
        if not re.search(self.SPECIAL_CHARS, password):
            raise ValidationError(
                _("Password must contain at least one special character."),
                code="no_special_char",
            )

    def get_help_text(self):
        return _(
            "Password must be 8–20 characters long, contain no spaces or Cyrillic characters, "
            "and include at least one uppercase Latin letter, one digit, "
            "and one special character."
        )