import secrets


def generate_reset_code():
    return f"{secrets.randbelow(10**6):06d}"
