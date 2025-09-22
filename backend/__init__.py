"""Backend package for the Python Mastery platform."""

from .app import create_app

app = create_app()

__all__ = ["app", "create_app"]
