from __future__ import annotations

import sys
from pathlib import Path

from flask import Flask, jsonify

if __package__ is None or __package__ == "":
    # Allow running "flask --app app.py" from the backend folder by
    # exposing the repository root to the import system so that
    # ``backend`` behaves like a regular package.
    current_dir = Path(__file__).resolve().parent
    repository_root = current_dir.parent
    if str(repository_root) not in sys.path:
        sys.path.insert(0, str(repository_root))

from backend.config import Config
from backend.extensions import db, init_extensions, jwt
from backend.models import AdminLog, User
from backend.routes.admin import admin_bp
from backend.routes.auth import auth_bp
from backend.routes.courses import courses_bp
from backend.routes.users import user_bp
from backend.seed import seed_database


def create_app(config_class: type[Config] = Config) -> Flask:
    app = Flask(__name__)
    app.config.from_object(config_class)

    Path(app.instance_path).mkdir(parents=True, exist_ok=True)

    init_extensions(app)
    register_error_handlers(app)
    register_shellcontext(app)
    register_jwt_callbacks()
    register_blueprints(app)

    @app.cli.command("seed")
    def seed_command():
        seed_database()
        print("Database seeded with demo data")

    return app


def register_blueprints(app: Flask) -> None:
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(user_bp, url_prefix="/api/user")
    app.register_blueprint(courses_bp, url_prefix="/api/courses")
    app.register_blueprint(admin_bp, url_prefix="/api/admin")


def register_error_handlers(app: Flask) -> None:
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({"error": "Not found", "message": str(error)}), 404

    @app.errorhandler(400)
    def bad_request(error):
        return jsonify({"error": "Bad request", "message": str(error)}), 400

    @app.errorhandler(401)
    def unauthorized(error):
        return jsonify({"error": "Unauthorized", "message": str(error)}), 401

    @app.errorhandler(403)
    def forbidden(error):
        return jsonify({"error": "Forbidden", "message": str(error)}), 403

    @app.errorhandler(500)
    def server_error(error):
        return jsonify({"error": "Server error", "message": str(error)}), 500


def register_shellcontext(app: Flask) -> None:
    @app.shell_context_processor
    def shell_context():
        return {"db": db, "User": User, "AdminLog": AdminLog}


def register_jwt_callbacks() -> None:
    @jwt.additional_claims_loader
    def add_claims(identity):
        user = User.query.get(identity)
        return {
            "is_admin": user.is_admin if user else False,
            "status": user.status if user else "inactive",
            "tier": user.tier if user else "basic",
        }

    @jwt.user_identity_loader
    def user_identity_lookup(user: User | int):
        if isinstance(user, User):
            return user.id
        return user

    @jwt.user_lookup_loader
    def user_lookup_callback(_jwt_header, jwt_data):
        identity = jwt_data["sub"]
        return User.query.get(identity)

    @jwt.token_in_blocklist_loader
    def check_if_token_revoked(jwt_header, jwt_payload):
        # Simple placeholder for blacklisting.
        return False

    @jwt.invalid_token_loader
    def invalid_token(reason: str):
        return jsonify({"error": "Invalid token", "message": reason}), 401

    @jwt.expired_token_loader
    def expired_token(jwt_header, jwt_payload):
        return jsonify({"error": "Token expired"}), 401

    @jwt.revoked_token_loader
    def revoked_token(jwt_header, jwt_payload):
        return jsonify({"error": "Token revoked"}), 401


if __name__ == "__main__":
    application = create_app()
    with application.app_context():
        db.create_all()
        if not User.query.filter_by(email="admin@example.com").first():
            seed_database()
    application.run(debug=True)

