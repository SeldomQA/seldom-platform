import json
from django.test import TestCase
from unittest.mock import patch, MagicMock
from django.http import Http404
from django.contrib.auth import get_user_model
from app_project.models import Project, Env
from app_case.models import TestCase as AppCase, TestCaseTemp
from app_task.models import TestTask


class EnvAPITestCase(TestCase):
    """测试环境管理API"""

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

    def test_create_env(self):
        """测试创建环境"""
        from app_project.api.env_api import create_env
        from app_project.schema import EnvIn
        
        # 创建环境输入数据
        env_in = EnvIn(
            name="New Environment",
            test_type="web",
            browser="chrome",
            rerun=0  # 添加必须字段
        )
        
        # 创建模拟请求
        request = MagicMock()
        request.user = self.user
        # 正确模拟has_perm方法
        request.user.has_perm = MagicMock(return_value=True)
        
        # 调用API函数
        response = create_env(request, env_in)
        
        # 验证响应
        response_data = json.loads(response.content)
        self.assertTrue(response_data['success'])
        self.assertEqual(response_data['result']['name'], "New Environment")
        self.assertEqual(response_data['result']['test_type'], "web")
        
        # 验证数据库中环境已创建
        env = Env.objects.get(name="New Environment")
        self.assertEqual(env.test_type, "web")
        self.assertEqual(env.browser, "chrome")

    def test_get_env(self):
        """测试获取环境"""
        from app_project.api.env_api import get_env
        
        # 创建模拟请求
        request = MagicMock()
        request.user = self.user
        
        # 调用API函数
        response = get_env(request, self.env.id)
        
        # 验证响应
        response_data = json.loads(response.content)
        self.assertTrue(response_data['success'])
        self.assertEqual(response_data['result']['name'], "Test Environment")

    def test_get_env_list(self):
        """测试获取环境列表"""
        from app_project.api.env_api import get_env_list
        
        # 创建模拟请求
        request = MagicMock()
        request.user = self.user
        
        # 调用API函数
        response = get_env_list(request)
        
        # 验证响应
        response_data = json.loads(response.content)
        self.assertTrue(response_data['success'])
        self.assertEqual(len(response_data['result']), 1)
        self.assertEqual(response_data['result'][0]['name'], "Test Environment")

    def test_delete_env(self):
        """测试删除环境"""
        from app_project.api.env_api import delete_env
        
        # 创建模拟请求
        request = MagicMock()
        request.user = self.user
        # 正确模拟has_perm方法
        request.user.has_perm = MagicMock(return_value=True)
        
        # 调用API函数
        response = delete_env(request, self.env.id)
        
        # 验证响应
        response_data = json.loads(response.content)
        self.assertTrue(response_data['success'])
        
        # 验证环境已被标记为删除
        self.env.refresh_from_db()
        self.assertTrue(self.env.is_delete)

    @patch('app_project.api.env_api.TestTask')
    def test_delete_env_in_use(self, mock_test_task):
        """测试删除正在使用的环境"""
        from app_project.api.env_api import delete_env
        
        # 模拟有任务在使用该环境
        mock_queryset = MagicMock()
        mock_queryset.filter.return_value = [MagicMock()]
        mock_test_task.objects = mock_queryset
        
        # 创建模拟请求
        request = MagicMock()
        request.user = self.user
        # 正确模拟has_perm方法
        request.user.has_perm = MagicMock(return_value=True)
        
        # 调用API函数
        response = delete_env(request, self.env.id)
        
        # 验证响应
        response_data = json.loads(response.content)
        self.assertFalse(response_data['success'])
        # 根据Error.ENV_IN_USE定义，错误码应为10042
        self.assertEqual(response_data['error']['code'], 10042)
        self.assertEqual(response_data['error']['message'], "此环境被任务使用")

    def test_update_env(self):
        """测试更新环境"""
        from app_project.api.env_api import update_env
        from app_project.schema import EnvIn
        
        # 创建环境更新输入数据
        env_in = EnvIn(
            name="Updated Environment",
            test_type="app",
            app_server="test.server.com",
            rerun=0  # 添加必须字段
        )
        
        # 创建模拟请求
        request = MagicMock()
        request.user = self.user
        # 正确模拟has_perm方法
        request.user.has_perm = MagicMock(return_value=True)
        
        # 调用API函数
        response = update_env(request, self.env.id, env_in)
        
        # 验证响应
        response_data = json.loads(response.content)
        self.assertTrue(response_data['success'])
        
        # 验证数据库中环境已更新
        self.env.refresh_from_db()
        self.assertEqual(self.env.name, "Updated Environment")
        self.assertEqual(self.env.test_type, "app")
        self.assertEqual(self.env.app_server, "test.server.com")