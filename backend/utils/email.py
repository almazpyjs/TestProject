from __future__ import annotations

from datetime import datetime
from typing import Iterable

from flask import current_app


def send_email(subject: str, recipient: str, body: str) -> None:
    """Lightweight email helper that logs outgoing messages."""
    sender = current_app.config.get("MAIL_SENDER", "no-reply@example.com")
    message = (
        f"\n--- Email ---\n"
        f"Time: {datetime.utcnow().isoformat()}\n"
        f"From: {sender}\n"
        f"To: {recipient}\n"
        f"Subject: {subject}\n"
        f"Body:\n{body}\n"
        f"--- End Email ---"
    )
    if current_app.config.get("MAIL_SUPPRESS_SEND", True):
        current_app.logger.info("Email suppressed: %s", message)
    else:
        # In production you would integrate Flask-Mail, Sendgrid etc.
        current_app.logger.info("Email sent: %s", message)


def send_bulk_email(subject: str, recipients: Iterable[str], body: str) -> None:
    for recipient in recipients:
        send_email(subject, recipient, body)

