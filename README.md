# Python Mastery Learning Platform

Полноценная платформа для обучения Python от нуля до уровня Middle, включающая backend на Flask и frontend на React + Tailwind CSS. Реализованы регистрация, авторизация с JWT, симуляция покупки курса, управление прогрессом и мощная админ-панель с WYSIWYG-редактором.

## Особенности
- **Backend**: Flask, SQLAlchemy, JWT, защита CSRF/XSS через безопасные практики, хэширование паролей (bcrypt), email-уведомления (логируются в консоль).
- **Frontend**: Vite + React + Tailwind CSS, адаптивный дизайн, темная/светлая тема, плавные анимации (Framer Motion), поддержка от 320px.
- **База**: SQLite по умолчанию (легко заменить на PostgreSQL через переменную окружения `DATABASE_URL`).
- **Курс**: Иерархия курсов → глав → подразделов → уроков. Уроки содержат текст, видео, вложения и прогресс пользователя.
- **Админ-панель**: Управление пользователями и контентом, блокировка, уведомления, добавление глав/уроков через WYSIWYG (CKEditor).

## Быстрый старт

### Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\\Scripts\\activate
pip install -r requirements.txt
flask --app app.py shell  # по желанию для проверки
flask --app app.py db upgrade  # если используете миграции
flask --app app.py seed        # заполнение демо-данными (создаст admin@example.com/admin123)
flask --app app.py run
```
Backend запустится на `http://localhost:5000`.

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Интерфейс доступен на `http://localhost:5173`. Vite проксирует запросы `/api` на Flask.

## Учётные записи
- **Админ**: `admin@example.com / admin123`
- **Новый пользователь**: регистрируется через интерфейс.

## Структура проекта
```
backend/  – Flask-приложение (модели, маршруты, сиды)
frontend/ – Vite + React приложение
```

## Тестовые данные
После выполнения команды `flask --app app.py seed` доступен курс «Python Mastery» с двумя главами:
- Глава 1: Основы Python (переменные, условные операторы, циклы)
- Глава 2: Встроенные библиотеки (os/sys, datetime, collections/itertools)

## Безопасность
- JWT с дополнительными claim-ами (роль, статус, тариф)
- Валидация email/паролей, хэширование bcrypt
- Обработчики ошибок и запрет доступа для заблокированных пользователей
- Логирование админ-действий и email-уведомлений

## Дальнейшее развитие
- Интеграция с реальным платежным провайдером (Stripe/ЮKassa)
- Добавление метрик прогресса, чатов и лайв-сессий
- Экспорт сертификатов в PDF

Приятного обучения!
