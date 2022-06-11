import os
from django.shortcuts import get_object_or_404
from django.forms.models import model_to_dict
from ninja import Router
from app_project.models import Project
from app_case.models import TestCase
from seldom import TestMainExtend
from utils.response import response


router = Router(tags=["case"])


@router.post('/{case_id}/running')
def running_case(request, case_id: int):
    """
    运行测试用例
    """
    case = get_object_or_404(TestCase, pk=case_id)
    case_info = [{
        "file": case.file_name,
        "class": {
            "name": case.class_name,
            "doc": case.class_doc
        },
        "method": {
            "name": case.case_name,
            "doc": case.case_doc
        }
    }]
    project = Project.objects.get(id=case.project_id)

    test_dir = os.path.join(project.address, "test_dir")
    print(">>>", test_dir)
    main_extend = TestMainExtend(path=test_dir)
    main_extend.run_cases(case_info)
    return response()
