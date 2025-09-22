from datetime import datetime
from enum import Enum

from sqlalchemy import func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .extensions import db


class UserStatus(Enum):
    ACTIVE = "active"
    BLOCKED = "blocked"


class SubscriptionTier(Enum):
    BASIC = "basic"
    PREMIUM = "premium"


class TimestampMixin:
    created_at: Mapped[datetime] = mapped_column(
        default=datetime.utcnow, server_default=func.now(), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        server_default=func.now(),
        nullable=False,
    )


class User(db.Model, TimestampMixin):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(nullable=False)
    full_name: Mapped[str | None]
    status: Mapped[str] = mapped_column(default=UserStatus.ACTIVE.value, nullable=False)
    tier: Mapped[str] = mapped_column(default=SubscriptionTier.BASIC.value, nullable=False)
    is_admin: Mapped[bool] = mapped_column(default=False, nullable=False)
    last_login_at: Mapped[datetime | None]

    purchases: Mapped[list["Purchase"]] = relationship(back_populates="user")
    progresses: Mapped[list["LessonProgress"]] = relationship(back_populates="user")
    notifications: Mapped[list["Notification"]] = relationship(back_populates="user")

    def __repr__(self) -> str:  # pragma: no cover - debug helper
        return f"<User {self.email}>"


class Course(db.Model, TimestampMixin):
    __tablename__ = "courses"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(nullable=False)
    description: Mapped[str]
    level: Mapped[str] = mapped_column(default="beginner", nullable=False)
    price: Mapped[float] = mapped_column(default=0.0, nullable=False)
    is_active: Mapped[bool] = mapped_column(default=True, nullable=False)
    hero_video_url: Mapped[str | None]
    slug: Mapped[str] = mapped_column(unique=True, nullable=False)

    chapters: Mapped[list["Chapter"]] = relationship(
        back_populates="course", cascade="all, delete-orphan"
    )
    purchases: Mapped[list["Purchase"]] = relationship(back_populates="course")


class Chapter(db.Model, TimestampMixin):
    __tablename__ = "chapters"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(nullable=False)
    order_index: Mapped[int] = mapped_column(default=0, nullable=False)
    course_id: Mapped[int] = mapped_column(db.ForeignKey("courses.id"), nullable=False)

    course: Mapped[Course] = relationship(back_populates="chapters")
    sections: Mapped[list["Section"]] = relationship(
        back_populates="chapter", cascade="all, delete-orphan"
    )


class Section(db.Model, TimestampMixin):
    __tablename__ = "sections"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(nullable=False)
    order_index: Mapped[int] = mapped_column(default=0, nullable=False)
    summary: Mapped[str | None]
    chapter_id: Mapped[int] = mapped_column(db.ForeignKey("chapters.id"), nullable=False)

    chapter: Mapped[Chapter] = relationship(back_populates="sections")
    lessons: Mapped[list["Lesson"]] = relationship(
        back_populates="section", cascade="all, delete-orphan"
    )


class Lesson(db.Model, TimestampMixin):
    __tablename__ = "lessons"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(nullable=False)
    order_index: Mapped[int] = mapped_column(default=0, nullable=False)
    content: Mapped[str] = mapped_column(default="", nullable=False)
    video_url: Mapped[str | None]
    estimated_minutes: Mapped[int] = mapped_column(default=15, nullable=False)
    attachments: Mapped[str | None]
    section_id: Mapped[int] = mapped_column(db.ForeignKey("sections.id"), nullable=False)

    section: Mapped[Section] = relationship(back_populates="lessons")
    progresses: Mapped[list["LessonProgress"]] = relationship(back_populates="lesson")


class LessonProgress(db.Model, TimestampMixin):
    __tablename__ = "lesson_progress"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(db.ForeignKey("users.id"), nullable=False)
    lesson_id: Mapped[int] = mapped_column(db.ForeignKey("lessons.id"), nullable=False)
    completed: Mapped[bool] = mapped_column(default=False, nullable=False)
    completed_at: Mapped[datetime | None]

    user: Mapped[User] = relationship(back_populates="progresses")
    lesson: Mapped[Lesson] = relationship(back_populates="progresses")


class Purchase(db.Model, TimestampMixin):
    __tablename__ = "purchases"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(db.ForeignKey("users.id"), nullable=False)
    course_id: Mapped[int] = mapped_column(db.ForeignKey("courses.id"), nullable=False)
    status: Mapped[str] = mapped_column(default="pending", nullable=False)
    tier: Mapped[str] = mapped_column(default=SubscriptionTier.BASIC.value, nullable=False)
    transaction_reference: Mapped[str | None]

    user: Mapped[User] = relationship(back_populates="purchases")
    course: Mapped[Course] = relationship(back_populates="purchases")


class Notification(db.Model, TimestampMixin):
    __tablename__ = "notifications"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(db.ForeignKey("users.id"), nullable=False)
    title: Mapped[str] = mapped_column(nullable=False)
    message: Mapped[str] = mapped_column(nullable=False)
    is_read: Mapped[bool] = mapped_column(default=False, nullable=False)
    category: Mapped[str] = mapped_column(default="general", nullable=False)

    user: Mapped[User] = relationship(back_populates="notifications")


class AdminLog(db.Model, TimestampMixin):
    __tablename__ = "admin_logs"

    id: Mapped[int] = mapped_column(primary_key=True)
    admin_id: Mapped[int] = mapped_column(db.ForeignKey("users.id"), nullable=False)
    action: Mapped[str] = mapped_column(nullable=False)
    metadata: Mapped[str | None]

    admin: Mapped[User] = relationship()

