from marshmallow import Schema, fields


class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    email = fields.Email(required=True)
    full_name = fields.Str(allow_none=True)
    status = fields.Str()
    tier = fields.Str()
    is_admin = fields.Bool()
    created_at = fields.DateTime()
    last_login_at = fields.DateTime(allow_none=True)


class NotificationSchema(Schema):
    id = fields.Int(dump_only=True)
    title = fields.Str()
    message = fields.Str()
    category = fields.Str()
    is_read = fields.Bool()
    created_at = fields.DateTime()

