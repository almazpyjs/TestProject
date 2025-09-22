from __future__ import annotations

from datetime import datetime

from flask import Blueprint, jsonify, request
from flask_jwt_extended import current_user, jwt_required

from extensions import db
from models import Lesson, LessonProgress, Notification, SubscriptionTier
from schemas.purchase import PurchaseSchema
from schemas.user import NotificationSchema, UserSchema
from utils.decorators import user_active_required
from utils.email import send_email

user_bp = Blueprint("user", __name__)
user_schema = UserSchema()
purchase_schema = PurchaseSchema(many=True)
notification_schema = NotificationSchema(many=True)


@user_bp.get("/me")
@jwt_required()
@user_active_required
def get_profile():
    return jsonify({"user": user_schema.dump(current_user)})


@user_bp.put("/me")
@jwt_required()
@user_active_required
def update_profile():
    payload = request.get_json() or {}
    full_name = payload.get("full_name")
    tier = payload.get("tier")

    if full_name is not None:
        current_user.full_name = full_name

    if tier in {tier.value for tier in SubscriptionTier}:
        current_user.tier = tier

    db.session.commit()
    return jsonify({"message": "Profile updated", "user": user_schema.dump(current_user)})


@user_bp.get("/purchases")
@jwt_required()
def purchases():
    return jsonify({"purchases": purchase_schema.dump(current_user.purchases)})


@user_bp.post("/progress")
@jwt_required()
@user_active_required
def update_progress():
    payload = request.get_json() or {}
    lesson_id = payload.get("lesson_id")
    completed = bool(payload.get("completed", True))

    lesson = Lesson.query.get_or_404(lesson_id)

    progress = LessonProgress.query.filter_by(
        user_id=current_user.id, lesson_id=lesson.id
    ).first()

    if not progress:
        progress = LessonProgress(user_id=current_user.id, lesson_id=lesson.id)
        db.session.add(progress)

    progress.completed = completed
    progress.completed_at = datetime.utcnow() if completed else None
    db.session.commit()

    completed_count = LessonProgress.query.filter_by(
        user_id=current_user.id, completed=True
    ).count()
    total_lessons = Lesson.query.count()
    progress_percentage = (completed_count / total_lessons * 100) if total_lessons else 0

    if progress_percentage >= 100:
        send_email(
            subject="Поздравляем с завершением курса!",
            recipient=current_user.email,
            body="Ваш сертификат готов. Загрузите его в личном кабинете.",
        )

    return jsonify(
        {
            "message": "Progress updated",
            "progress_percentage": round(progress_percentage, 2),
        }
    )


@user_bp.get("/notifications")
@jwt_required()
def list_notifications():
    notifications = Notification.query.filter_by(user_id=current_user.id).order_by(
        Notification.created_at.desc()
    )
    return jsonify({"notifications": notification_schema.dump(notifications)})


@user_bp.post("/notifications/read")
@jwt_required()
def mark_notifications():
    payload = request.get_json() or {}
    notification_ids = payload.get("ids", [])

    Notification.query.filter(
        Notification.user_id == current_user.id,
        Notification.id.in_(notification_ids),
    ).update({"is_read": True}, synchronize_session=False)
    db.session.commit()

    return jsonify({"message": "Notifications updated"})

