import os
from datetime import timedelta


class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "super-secret-key")
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URL",
        f"sqlite:///{os.path.join(os.path.dirname(__file__), 'app.db')}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "jwt-secret-key")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=2)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)
    SECURITY_PASSWORD_SALT = os.environ.get("SECURITY_PASSWORD_SALT", "password-salt")
    FRONTEND_URL = os.environ.get("FRONTEND_URL", "http://localhost:5173")
    MAIL_SENDER = os.environ.get("MAIL_SENDER", "no-reply@pythonmastery.com")
    MAIL_SUPPRESS_SEND = os.environ.get("MAIL_SUPPRESS_SEND", "True") == "True"
    ALLOWED_ORIGINS = os.environ.get("ALLOWED_ORIGINS", "*")
    LOG_FILE = os.environ.get(
        "ADMIN_LOG_FILE",
        os.path.join(os.path.dirname(__file__), "admin_actions.log")
    )


class TestConfig(Config):
    SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:"
    TESTING = True
    WTF_CSRF_ENABLED = False

