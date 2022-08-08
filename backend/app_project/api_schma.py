from ninja import Schema


class ProjectIn(Schema):
    """项目入参"""
    name: str
    address: str
    case_dir: str
    cover_name: str = None
    path_name: str = None
