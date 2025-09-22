from marshmallow import Schema, fields


class PurchaseSchema(Schema):
    id = fields.Int(dump_only=True)
    course_id = fields.Int()
    status = fields.Str()
    tier = fields.Str()
    created_at = fields.DateTime()
    transaction_reference = fields.Str(allow_none=True)

