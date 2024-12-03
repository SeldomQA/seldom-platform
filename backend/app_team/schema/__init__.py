from ninja import Schema


class TeamIn(Schema):
    """项目入参"""
    name: str
    email: str
