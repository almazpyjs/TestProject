from __future__ import annotations

from random import randint
from time import sleep

from flask import Blueprint, jsonify, request
from flask_jwt_extended import current_user, jwt_required

from extensions import db
from models import Course, Lesson, Purchase, SubscriptionTier
from schemas.course import CourseSchema, LessonSchema
from schemas.purchase import PurchaseSchema
from utils.decorators import user_active_required

courses_bp = Blueprint("courses", __name__)
course_schema = CourseSchema(many=True)
course_detail_schema = CourseSchema()
lesson_schema = LessonSchema()
purchase_schema = PurchaseSchema()


@courses_bp.get("/")
def list_courses():
    level = request.args.get("level")
    query = Course.query.filter_by(is_active=True)
    if level:
        query = query.filter(Course.level == level)
    search = request.args.get("search")
    if search:
        query = query.filter(Course.title.ilike(f"%{search}%"))
    courses = query.order_by(Course.created_at.desc()).all()
    return jsonify({"courses": course_schema.dump(courses)})


@courses_bp.get("/<slug>")
def course_detail(slug: str):
    course = Course.query.filter_by(slug=slug).first_or_404()
    return jsonify({"course": course_detail_schema.dump(course)})


@courses_bp.get("/<slug>/lessons/<int:lesson_id>")
@jwt_required(optional=True)
def lesson_detail(slug: str, lesson_id: int):
    course = Course.query.filter_by(slug=slug).first_or_404()
    lesson = Lesson.query.filter_by(id=lesson_id).first_or_404()

    is_unlocked = False
    if current_user:
        is_unlocked = any(
            purchase.course_id == course.id and purchase.status == "paid"
            for purchase in current_user.purchases
        )

    if not is_unlocked and not lesson.order_index == 0:
        return jsonify({"error": "Purchase required"}), 402

    return jsonify({"lesson": lesson_schema.dump(lesson)})


@courses_bp.post("/<slug>/purchase")
@jwt_required()
@user_active_required
def purchase_course(slug: str):
    course = Course.query.filter_by(slug=slug).first_or_404()
    payload = request.get_json() or {}
    tier = payload.get("tier", SubscriptionTier.PREMIUM.value)

    purchase = Purchase.query.filter_by(course_id=course.id, user_id=current_user.id).first()
    if purchase and purchase.status == "paid":
        return jsonify({"message": "Course already purchased"})

    if purchase is None:
        purchase = Purchase(course_id=course.id, user_id=current_user.id)
        db.session.add(purchase)

    purchase.tier = tier
    purchase.status = "processing"
    db.session.commit()

    # Simulate payment delay and completion
    spinner_duration = int(payload.get("duration", 3))
    spinner_duration = max(1, min(spinner_duration, 10))
    sleep(spinner_duration)

    purchase.status = "paid"
    purchase.transaction_reference = f"PY-{randint(100000, 999999)}"
    db.session.commit()

    return jsonify(
        {
            "message": "Course purchased successfully",
            "purchase": purchase_schema.dump(purchase),
        }
    )


@courses_bp.get("/<slug>/progress")
@jwt_required()
@user_active_required
def course_progress(slug: str):
    course = Course.query.filter_by(slug=slug).first_or_404()
    total_lessons = sum(len(section.lessons) for chapter in course.chapters for section in chapter.sections)
    if total_lessons == 0:
        return jsonify({"progress": 0})

    completed = sum(
        1
        for chapter in course.chapters
        for section in chapter.sections
        for lesson in section.lessons
        if any(p.lesson_id == lesson.id and p.completed for p in current_user.progresses)
    )
    progress_percentage = completed / total_lessons * 100
    return jsonify({"progress": round(progress_percentage, 2)})

