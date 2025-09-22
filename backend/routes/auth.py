from __future__ import annotations

from datetime import datetime

from email_validator import EmailNotValidError, validate_email
from flask import Blueprint, jsonify, request
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    get_jwt_identity,
    jwt_required,
)
from itsdangerous import URLSafeTimedSerializer

from ..extensions import bcrypt, db
from ..models import User, UserStatus
from ..utils.email import send_email

auth_bp = Blueprint("auth", __name__)


def _generate_reset_serializer() -> URLSafeTimedSerializer:
    from flask import current_app

    return URLSafeTimedSerializer(
        current_app.config["SECRET_KEY"],
        salt=current_app.config["SECURITY_PASSWORD_SALT"],
    )


@auth_bp.post("/register")
def register():
    payload = request.get_json() or {}
    email = payload.get("email", "").strip().lower()
    password = payload.get("password", "")
    full_name = payload.get("full_name")

    try:
        validate_email(email, check_deliverability=False)
    except EmailNotValidError as exc:
        return jsonify({"error": "Invalid email", "message": str(exc)}), 400

    if len(password) < 8 or password.isalpha() or password.isdigit():
        return jsonify({"error": "Weak password", "message": "Password must contain letters and digits and be at least 8 characters."}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email exists", "message": "Account already registered"}), 409

    password_hash = bcrypt.generate_password_hash(password).decode("utf-8")
    user = User(email=email, password_hash=password_hash, full_name=full_name)
    db.session.add(user)
    db.session.commit()

    access_token = create_access_token(identity=user.id)
    refresh_token = create_refresh_token(identity=user.id)

    send_email(
        subject="Добро пожаловать в Python Mastery",
        recipient=user.email,
        body="Спасибо за регистрацию! Начните изучение Python прямо сейчас.",
    )

    return (
        jsonify(
            {
                "message": "Registration successful",
                "access_token": access_token,
                "refresh_token": refresh_token,
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "full_name": user.full_name,
                },
            }
        ),
        201,
    )


@auth_bp.post("/login")
def login():
    payload = request.get_json() or {}
    email = payload.get("email", "").strip().lower()
    password = payload.get("password", "")

    user = User.query.filter_by(email=email).first()
    if not user or not bcrypt.check_password_hash(user.password_hash, password):
        return jsonify({"error": "Invalid credentials"}), 401

    if user.status != UserStatus.ACTIVE.value:
        return jsonify({"error": "Account blocked"}), 403

    user.last_login_at = datetime.utcnow()
    db.session.commit()

    access_token = create_access_token(identity=user.id)
    refresh_token = create_refresh_token(identity=user.id)

    return jsonify(
        {
            "message": "Login successful",
            "access_token": access_token,
            "refresh_token": refresh_token,
            "user": {
                "id": user.id,
                "email": user.email,
                "full_name": user.full_name,
                "is_admin": user.is_admin,
            },
        }
    )


@auth_bp.post("/refresh")
@jwt_required(refresh=True)
def refresh_token():
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity)
    return jsonify({"access_token": access_token})


@auth_bp.post("/forgot-password")
def forgot_password():
    payload = request.get_json() or {}
    email = payload.get("email", "").strip().lower()
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "If the account exists, an email was sent."})

    serializer = _generate_reset_serializer()
    token = serializer.dumps(email)
    reset_url = f"{request.host_url.rstrip('/')}/reset-password?token={token}"
    send_email(
        subject="Сброс пароля",
        recipient=email,
        body=f"Перейдите по ссылке для восстановления пароля: {reset_url}",
    )
    return jsonify({"message": "Password reset instructions sent."})


@auth_bp.post("/reset-password")
def reset_password():
    payload = request.get_json() or {}
    token = payload.get("token")
    new_password = payload.get("password", "")

    if not token:
        return jsonify({"error": "Missing token"}), 400

    if len(new_password) < 8:
        return jsonify({"error": "Weak password"}), 400

    serializer = _generate_reset_serializer()
    try:
        email = serializer.loads(token, max_age=60 * 60 * 24)
    except Exception:
        return jsonify({"error": "Invalid or expired token"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    user.password_hash = bcrypt.generate_password_hash(new_password).decode("utf-8")
    db.session.commit()
    return jsonify({"message": "Password updated"})

