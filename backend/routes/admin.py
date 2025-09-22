from __future__ import annotations

import json
from datetime import datetime

from flask import Blueprint, jsonify, request
from flask_jwt_extended import current_user, jwt_required

from backend.extensions import db
from backend.models import (
    AdminLog,
    Chapter,
    Course,
    Lesson,
    Notification,
    Section,
    SubscriptionTier,
    User,
    UserStatus,
)
from backend.schemas.course import CourseSchema
from backend.schemas.user import UserSchema
from backend.utils.decorators import admin_required
from backend.utils.email import send_email

admin_bp = Blueprint("admin", __name__)
admin_user_schema = UserSchema(many=True)
course_schema = CourseSchema()


def _log_admin_action(action: str, metadata: dict | None = None) -> None:
    entry = AdminLog(admin_id=current_user.id, action=action, payload=json.dumps(metadata or {}))
    db.session.add(entry)
    db.session.commit()


@admin_bp.get("/users")
@jwt_required()
@admin_required
def list_users():
    users = User.query.order_by(User.created_at.desc()).all()
    return jsonify({"users": admin_user_schema.dump(users)})


@admin_bp.patch("/users/<int:user_id>")
@jwt_required()
@admin_required
def update_user(user_id: int):
    user = User.query.get_or_404(user_id)
    payload = request.get_json() or {}

    if "full_name" in payload:
        user.full_name = payload["full_name"]
    if "tier" in payload and payload["tier"] in {t.value for t in SubscriptionTier}:
        user.tier = payload["tier"]
    if "status" in payload and payload["status"] in {s.value for s in UserStatus}:
        user.status = payload["status"]
        if user.status == UserStatus.BLOCKED.value:
            send_email(
                subject="Доступ приостановлен",
                recipient=user.email,
                body="Администратор временно заблокировал ваш аккаунт.",
            )
    db.session.commit()
    _log_admin_action("update_user", {"user_id": user.id, "payload": payload})
    return jsonify({"message": "User updated"})


@admin_bp.delete("/users/<int:user_id>")
@jwt_required()
@admin_required
def delete_user(user_id: int):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    _log_admin_action("delete_user", {"user_id": user.id})
    return jsonify({"message": "User deleted"})


@admin_bp.post("/users/<int:user_id>/notify")
@jwt_required()
@admin_required
def notify_user(user_id: int):
    user = User.query.get_or_404(user_id)
    payload = request.get_json() or {}
    title = payload.get("title", "Новое уведомление")
    message = payload.get("message", "")

    notification = Notification(user_id=user.id, title=title, message=message)
    db.session.add(notification)
    db.session.commit()
    _log_admin_action("notify_user", {"user_id": user.id, "title": title})

    send_email(subject=title, recipient=user.email, body=message)
    return jsonify({"message": "Notification sent"})


@admin_bp.post("/courses")
@jwt_required()
@admin_required
def create_course():
    payload = request.get_json() or {}
    course = Course(
        title=payload.get("title", "Новый курс"),
        description=payload.get("description", ""),
        level=payload.get("level", "beginner"),
        price=payload.get("price", 0.0),
        slug=payload.get("slug"),
        hero_video_url=payload.get("hero_video_url"),
    )
    if not course.slug:
        return jsonify({"error": "Slug is required"}), 400

    db.session.add(course)
    db.session.commit()
    _log_admin_action("create_course", {"course_id": course.id})
    return jsonify({"course": course_schema.dump(course)}), 201


@admin_bp.put("/courses/<int:course_id>")
@jwt_required()
@admin_required
def update_course(course_id: int):
    course = Course.query.get_or_404(course_id)
    payload = request.get_json() or {}

    for attr in ["title", "description", "level", "price", "hero_video_url", "slug", "is_active"]:
        if attr in payload:
            setattr(course, attr, payload[attr])
    db.session.commit()
    _log_admin_action("update_course", {"course_id": course.id})
    return jsonify({"course": course_schema.dump(course)})


@admin_bp.delete("/courses/<int:course_id>")
@jwt_required()
@admin_required
def delete_course(course_id: int):
    course = Course.query.get_or_404(course_id)
    db.session.delete(course)
    db.session.commit()
    _log_admin_action("delete_course", {"course_id": course.id})
    return jsonify({"message": "Course removed"})


@admin_bp.post("/courses/<int:course_id>/chapters")
@jwt_required()
@admin_required
def create_chapter(course_id: int):
    course = Course.query.get_or_404(course_id)
    payload = request.get_json() or {}
    chapter = Chapter(
        course_id=course.id,
        title=payload.get("title", "Новая глава"),
        order_index=payload.get("order_index", len(course.chapters)),
    )
    db.session.add(chapter)
    db.session.commit()
    _log_admin_action("create_chapter", {"chapter_id": chapter.id})
    return jsonify({"message": "Chapter created", "chapter_id": chapter.id}), 201


@admin_bp.post("/chapters/<int:chapter_id>/sections")
@jwt_required()
@admin_required
def create_section(chapter_id: int):
    chapter = Chapter.query.get_or_404(chapter_id)
    payload = request.get_json() or {}
    section = Section(
        chapter_id=chapter.id,
        title=payload.get("title", "Новый раздел"),
        summary=payload.get("summary"),
        order_index=payload.get("order_index", len(chapter.sections)),
    )
    db.session.add(section)
    db.session.commit()
    _log_admin_action("create_section", {"section_id": section.id})
    return jsonify({"message": "Section created", "section_id": section.id}), 201


@admin_bp.post("/sections/<int:section_id>/lessons")
@jwt_required()
@admin_required
def create_lesson(section_id: int):
    section = Section.query.get_or_404(section_id)
    payload = request.get_json() or {}
    lesson = Lesson(
        section_id=section.id,
        title=payload.get("title", "Новый урок"),
        content=payload.get("content", ""),
        video_url=payload.get("video_url"),
        attachments=json.dumps(payload.get("attachments", [])),
        order_index=payload.get("order_index", len(section.lessons)),
        estimated_minutes=payload.get("estimated_minutes", 15),
    )
    db.session.add(lesson)
    db.session.commit()
    _log_admin_action("create_lesson", {"lesson_id": lesson.id})
    return jsonify({"message": "Lesson created", "lesson_id": lesson.id}), 201


@admin_bp.put("/lessons/<int:lesson_id>")
@jwt_required()
@admin_required
def update_lesson(lesson_id: int):
    lesson = Lesson.query.get_or_404(lesson_id)
    payload = request.get_json() or {}

    for attr in ["title", "content", "video_url", "order_index", "estimated_minutes"]:
        if attr in payload:
            setattr(lesson, attr, payload[attr])
    if "attachments" in payload:
        lesson.attachments = json.dumps(payload["attachments"])

    db.session.commit()
    _log_admin_action("update_lesson", {"lesson_id": lesson.id})
    return jsonify({"message": "Lesson updated"})


@admin_bp.post("/preview")
@jwt_required()
@admin_required
def preview_content():
    payload = request.get_json() or {}
    content = payload.get("content", "")
    return jsonify({"preview": content})

