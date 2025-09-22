from marshmallow import Schema, fields


class LessonSchema(Schema):
    id = fields.Int(dump_only=True)
    title = fields.Str()
    order_index = fields.Int()
    content = fields.Str()
    video_url = fields.Str(allow_none=True)
    estimated_minutes = fields.Int()
    attachments = fields.Str(allow_none=True)


class SectionSchema(Schema):
    id = fields.Int(dump_only=True)
    title = fields.Str()
    order_index = fields.Int()
    summary = fields.Str(allow_none=True)
    lessons = fields.List(fields.Nested(LessonSchema))


class ChapterSchema(Schema):
    id = fields.Int(dump_only=True)
    title = fields.Str()
    order_index = fields.Int()
    sections = fields.List(fields.Nested(SectionSchema))


class CourseSchema(Schema):
    id = fields.Int(dump_only=True)
    title = fields.Str()
    description = fields.Str()
    level = fields.Str()
    price = fields.Float()
    is_active = fields.Bool()
    hero_video_url = fields.Str(allow_none=True)
    slug = fields.Str()
    chapters = fields.List(fields.Nested(ChapterSchema))

