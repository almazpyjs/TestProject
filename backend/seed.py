from __future__ import annotations

from extensions import bcrypt, db
from models import Chapter, Course, Lesson, Section, SubscriptionTier, User
from utils.sanitization import sanitize_html


def seed_database() -> None:
    admin = User.query.filter_by(email="admin@example.com").first()
    if not admin:
        admin = User(
            email="admin@example.com",
            full_name="Администратор",
            is_admin=True,
            tier=SubscriptionTier.PREMIUM.value,
            password_hash=bcrypt.generate_password_hash("admin123").decode("utf-8"),
        )
        db.session.add(admin)

    course = Course.query.filter_by(slug="python-mastery").first()
    if not course:
        course = Course(
            title="Python Mastery",
            slug="python-mastery",
            description="Полный курс Python от нуля до уровня Middle",
            level="beginner",
            price=199.0,
            hero_video_url="https://www.youtube.com/embed/rfscVS0vtbw",
        )
        db.session.add(course)
        db.session.flush()

        chapter1 = Chapter(title="Основы Python", order_index=1, course_id=course.id)
        chapter2 = Chapter(title="Встроенные библиотеки", order_index=2, course_id=course.id)
        db.session.add_all([chapter1, chapter2])
        db.session.flush()

        section1 = Section(
            title="Переменные и типы данных",
            order_index=1,
            chapter_id=chapter1.id,
            summary="Изучаем основы синтаксиса и типы данных",
        )
        section2 = Section(
            title="Условные операторы",
            order_index=2,
            chapter_id=chapter1.id,
            summary="if, elif, else",
        )
        section3 = Section(
            title="Циклы",
            order_index=3,
            chapter_id=chapter1.id,
            summary="for и while",
        )
        section4 = Section(
            title="Работа с os и sys",
            order_index=1,
            chapter_id=chapter2.id,
            summary="Автоматизация и окружение",
        )
        section5 = Section(
            title="Модуль datetime",
            order_index=2,
            chapter_id=chapter2.id,
            summary="Работа со временем",
        )
        section6 = Section(
            title="Collections и itertools",
            order_index=3,
            chapter_id=chapter2.id,
            summary="Мощные структуры данных",
        )
        db.session.add_all([section1, section2, section3, section4, section5, section6])
        db.session.flush()

        lessons = [
            Lesson(
                section_id=section1.id,
                title="Введение в переменные",
                order_index=1,
                content=sanitize_html(
                    """<h2>Переменные</h2><p>В Python переменная создается при присвоении значения.</p><pre><code>name = 'Pythonist'</code></pre>"""
                ),
                video_url="https://www.youtube.com/embed/_uQrJ0TkZlc",
                attachments='["variables.pdf"]',
            ),
            Lesson(
                section_id=section2.id,
                title="Условные операторы",
                order_index=1,
                content=sanitize_html(
                    """<h2>if/else</h2><p>Примеры использования условий.</p><pre><code>if score &gt;= 90:\n    grade = 'A'</code></pre>"""
                ),
                attachments='["conditions.ipynb"]',
            ),
            Lesson(
                section_id=section3.id,
                title="Циклы",
                order_index=1,
                content=sanitize_html(
                    """<h2>Циклы</h2><p>Циклы позволяют повторять действия.</p><pre><code>for item in items:\n    print(item)</code></pre>"""
                ),
            ),
            Lesson(
                section_id=section4.id,
                title="Работа с os и sys",
                order_index=1,
                content=sanitize_html(
                    """<h2>os и sys</h2><p>Путь к автоматизации.</p><pre><code>import os, sys</code></pre>"""
                ),
            ),
            Lesson(
                section_id=section5.id,
                title="Datetime основы",
                order_index=1,
                content=sanitize_html(
                    """<h2>datetime</h2><p>Даты и время.</p><pre><code>from datetime import datetime</code></pre>"""
                ),
            ),
            Lesson(
                section_id=section6.id,
                title="Collections и itertools",
                order_index=1,
                content=sanitize_html(
                    """<h2>collections</h2><p>Работаем с Counter.</p><pre><code>from collections import Counter</code></pre>"""
                ),
            ),
        ]
        db.session.add_all(lessons)

    db.session.commit()

