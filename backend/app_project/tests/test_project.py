import json
from django.test import TestCase
from unittest.mock import patch, MagicMock
from django.http import Http404
from django.contrib.auth import get_user_model
from app_project.models import Project, Env
from app_case.models import TestCase as AppCase, TestCaseTemp
from app_task.models import TestTask


class ProjectAPITestCase(TestCase):
    """测试项目管理API"""

    def setUp(self):
        """初始化测试数据"""
        # 创建测试用户
        User = get_user_model()
        self.user = User.objects.create_user(username='testuser', password='testpass')
        
        # 创建测试项目
        self.project = Project.objects.create(
            name="Test Project",
            address="https://github.com/test/test.git",
            case_dir="test_dir",
            cover_name="",  # 添加必须字段
            path_name=""    # 添加必须字段
        )
        
        # 创建测试环境
        self.env = Env.objects.create(
            name="Test Environment",
            test_type="http",
            rerun=0  # 添加必须字段
        )

    def test_create_project(self):
        """测试创建项目"""
        from app_project.api.project_api import create_project
        from app_project.schema import ProjectIn
        
        # 创建项目输入数据
        project_in = ProjectIn(
            name="New Project",
            address="https://github.com/new/project.git",
            case_dir="new_test_dir",
            cover_name="",  # 添加必须字段
            path_name=""    # 添加必须字段
        )
        
        # 创建模拟请求
        request = MagicMock()
        request.user = self.user
        # 正确模拟has_perm方法
        request.user.has_perm = MagicMock(return_value=True)
        
        # 调用API函数
        with patch('app_project.api.project_api.is_valid_git_repo_url', return_value=True):
            response = create_project(request, project_in)
        
        # 验证响应
        response_data = json.loads(response.content)
        self.assertTrue(response_data['success'])
        self.assertEqual(response_data['result']['name'], "New Project")
        
        # 验证数据库中项目已创建
        project = Project.objects.get(name="New Project")
        self.assertEqual(project.address, "https://github.com/new/project.git")
        self.assertEqual(project.case_dir, "new_test_dir")

    def test_get_projects(self):
        """测试获取项目列表"""
        from app_project.api.project_api import get_projects
        
        # 创建模拟请求
        request = MagicMock()
        request.user = self.user
        
        # 调用API函数
        with patch('app_project.api.project_api.LocalGitResource') as mock_local_git:
            mock_instance = mock_local_git.return_value
            mock_instance.git_project_is_exists.return_value = True
            response = get_projects(request)
        
        # 验证响应
        response_data = json.loads(response.content)
        self.assertTrue(response_data['success'])
        self.assertEqual(len(response_data['result']), 1)
        self.assertEqual(response_data['result'][0]['name'], "Test Project")

    def test_get_project(self):
        """测试获取单个项目"""
        from app_project.api.project_api import get_project
        
        # 创建模拟请求
        request = MagicMock()
        request.user = self.user
        
        # 调用API函数
        response = get_project(request, self.project.id)
        
        # 验证响应
        response_data = json.loads(response.content)
        self.assertTrue(response_data['success'])
        self.assertEqual(response_data['result']['name'], "Test Project")

    @patch('app_project.api.project_api.get_object_or_404')
    def test_get_project_not_found(self, mock_get_object_or_404):
        """测试获取不存在的项目"""
        from app_project.api.project_api import get_project
        
        # 配置mock抛出Http404异常
        mock_get_object_or_404.side_effect = Http404()
        
        # 创建模拟请求
        request = MagicMock()
        request.user = self.user
        
        # 调用API函数
        with self.assertRaises(Http404):
            get_project(request, 999)

    def test_update_project(self):
        """测试更新项目"""
        from app_project.api.project_api import update_project
        from app_project.schema import ProjectIn
        
        # 创建项目更新输入数据
        project_in = ProjectIn(
            name="Updated Project",
            address="https://github.com/updated/project.git",
            case_dir="updated_test_dir",
            cover_name="",  # 添加必须字段
            path_name=""    # 添加必须字段
        )
        
        # 创建模拟请求
        request = MagicMock()
        request.user = self.user
        # 正确模拟has_perm方法
        request.user.has_perm = MagicMock(return_value=True)
        
        # 调用API函数
        with patch('app_project.api.project_api.is_valid_git_repo_url', return_value=True):
            response = update_project(request, self.project.id, project_in)
        
        # 验证响应
        response_data = json.loads(response.content)
        self.assertTrue(response_data['success'])
        
        # 验证数据库中项目已更新
        self.project.refresh_from_db()
        self.assertEqual(self.project.name, "Updated Project")
        self.assertEqual(self.project.address, "https://github.com/updated/project.git")
        self.assertEqual(self.project.case_dir, "updated_test_dir")

    def test_delete_project(self):
        """测试删除项目"""
        from app_project.api.project_api import delete_project
        
        # 创建模拟请求
        request = MagicMock()
        request.user = self.user
        # 正确模拟has_perm方法
        request.user.has_perm = MagicMock(return_value=True)
        
        # 调用API函数
        response = delete_project(request, self.project.id)
        
        # 验证响应
        response_data = json.loads(response.content)
        self.assertTrue(response_data['success'])
        
        # 验证项目已被标记为删除
        self.project.refresh_from_db()
        self.assertTrue(self.project.is_delete)