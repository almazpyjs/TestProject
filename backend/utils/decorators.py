from functools import wraps
from typing import Callable

from flask import abort
from flask_jwt_extended import get_jwt


def admin_required(func: Callable):
    @wraps(func)
    def wrapper(*args, **kwargs):
        claims = get_jwt()
        if not claims.get("is_admin"):
            abort(403, description="Administrator rights required")
        return func(*args, **kwargs)

    return wrapper


def user_active_required(func: Callable):
    @wraps(func)
    def wrapper(*args, **kwargs):
        claims = get_jwt()
        if claims.get("status") != "active":
            abort(403, description="User account is blocked")
        return func(*args, **kwargs)

    return wrapper

