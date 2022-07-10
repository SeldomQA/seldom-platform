import os
import time
import threading
from django.shortcuts import get_object_or_404
from django.forms.models import model_to_dict
from ninja import Router
from seldom.logging import log
from seldom import TestMainExtend
from app_project.models import Project
from app_case.models import TestCase
from xml.dom.minidom import parse
from utils.response import response
from backend.settings import BASE_DIR

# test report dir
REPORT_DIR = os.path.join(BASE_DIR, "reports")

router = Router(tags=["task"])


@router.post('/create')
def create_task(request, case_id: int):
    """
    创建任务
    """
    return response()
