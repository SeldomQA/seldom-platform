import json
from django.test import TestCase
from unittest.mock import patch, MagicMock
from django.http import Http404
from django.core.exceptions import ObjectDoesNotExist
from app_team.models import Team
from app_team.schema import TeamIn


class TeamAPITestCase(TestCase):
    """测试团队管理API"""

    def setUp(self):
        """初始化测试数据"""
        # 创建测试团队
        self.team = Team.objects.create(
            name="Test Team",
            email="test@example.com"
        )

    def test_create_team(self):
        """测试创建团队"""
        from app_team.api import create_team
        from app_team.schema import TeamIn
        
        # 创建团队输入数据
        team_in = TeamIn(
            name="New Team",
            email="new@example.com"
        )
        
        # 创建模拟请求
        request = MagicMock()
        
        # 调用API函数
        with patch('app_team.api.validate_email', return_value=True):
            response = create_team(request, team=team_in)
        
        # 验证响应
        response_data = json.loads(response.content)
        self.assertTrue(response_data['success'])
        self.assertEqual(response_data['result']['name'], "New Team")
        self.assertEqual(response_data['result']['email'], "new@example.com")
        
        # 验证数据库中团队已创建
        team = Team.objects.get(name="New Team")
        self.assertEqual(team.email, "new@example.com")

    def test_create_team_invalid_email(self):
        """测试创建团队时邮箱格式错误"""
        from app_team.api import create_team
        from app_team.schema import TeamIn
        
        # 创建团队输入数据（邮箱格式错误）
        team_in = TeamIn(
            name="New Team",
            email="invalid-email"
        )
        
        # 创建模拟请求
        request = MagicMock()
        
        # 调用API函数
        with patch('app_team.api.validate_email', return_value=False):
            response = create_team(request, team=team_in)
        
        # 验证响应
        response_data = json.loads(response.content)
        self.assertFalse(response_data['success'])
        self.assertEqual(response_data['error']['code'], 10041)  # TEAM_EMAIL_ERROR 错误码
        self.assertEqual(response_data['error']['message'], "邮箱格式错误")

    def test_create_team_duplicate(self):
        """测试创建重复团队"""
        from app_team.api import create_team
        from app_team.schema import TeamIn
        
        # 创建团队输入数据（与已有团队相同）
        team_in = TeamIn(
            name="Test Team",
            email="test@example.com"
        )
        
        # 创建模拟请求
        request = MagicMock()
        
        # 调用API函数
        with patch('app_team.api.validate_email', return_value=True):
            response = create_team(request, team=team_in)
        
        # 验证响应
        response_data = json.loads(response.content)
        self.assertFalse(response_data['success'])
        self.assertEqual(response_data['error']['code'], 10042)  # TEAM_EXIST_ERROR 错误码
        self.assertEqual(response_data['error']['message'], "创建团队已经存在")

    def test_get_teams(self):
        """测试获取团队列表"""
        from app_team.api import get_teams
        
        # 创建模拟请求
        request = MagicMock()
        
        # 调用API函数
        response = get_teams(request)
        
        # 验证响应
        response_data = json.loads(response.content)
        self.assertTrue(response_data['success'])
        self.assertEqual(len(response_data['result']), 1)
        self.assertEqual(response_data['result'][0]['name'], "Test Team")
        self.assertEqual(response_data['result'][0]['email'], "test@example.com")

    def test_get_team(self):
        """测试获取单个团队"""
        from app_team.api import get_team
        
        # 创建模拟请求
        request = MagicMock()
        
        # 调用API函数
        response = get_team(request, team_id=self.team.id)
        
        # 验证响应
        response_data = json.loads(response.content)
        self.assertTrue(response_data['success'])
        self.assertEqual(response_data['result']['name'], "Test Team")
        self.assertEqual(response_data['result']['email'], "test@example.com")

    def test_get_team_not_found(self):
        """测试获取不存在的团队"""
        from app_team.api import get_team
        
        # 创建模拟请求
        request = MagicMock()
        
        # 调用API函数，应该引发Http404异常
        with self.assertRaises(Http404):
            get_team(request, team_id=999)

    def test_update_team(self):
        """测试更新团队"""
        from app_team.api import update_team
        from app_team.schema import TeamIn
        
        # 创建团队更新输入数据
        team_in = TeamIn(
            name="Updated Team",
            email="updated@example.com"
        )
        
        # 创建模拟请求
        request = MagicMock()
        
        # 调用API函数
        with patch('app_team.api.validate_email', return_value=True):
            response = update_team(request, team_id=self.team.id, team=team_in)
        
        # 验证响应
        response_data = json.loads(response.content)
        self.assertTrue(response_data['success'])
        self.assertEqual(response_data['result']['name'], "Updated Team")
        self.assertEqual(response_data['result']['email'], "updated@example.com")
        
        # 验证数据库中团队已更新
        self.team.refresh_from_db()
        self.assertEqual(self.team.name, "Updated Team")
        self.assertEqual(self.team.email, "updated@example.com")

    def test_update_team_invalid_email(self):
        """测试更新团队时邮箱格式错误"""
        from app_team.api import update_team
        from app_team.schema import TeamIn
        
        # 创建团队更新输入数据（邮箱格式错误）
        team_in = TeamIn(
            name="Updated Team",
            email="invalid-email"
        )
        
        # 创建模拟请求
        request = MagicMock()
        
        # 调用API函数
        with patch('app_team.api.validate_email', return_value=False):
            response = update_team(request, team_id=self.team.id, team=team_in)
        
        # 验证响应
        response_data = json.loads(response.content)
        self.assertFalse(response_data['success'])
        self.assertEqual(response_data['error']['code'], 10041)  # TEAM_EMAIL_ERROR 错误码
        self.assertEqual(response_data['error']['message'], "邮箱格式错误")

    def test_delete_team(self):
        """测试删除团队"""
        from app_team.api import delete_team
        
        # 创建模拟请求
        request = MagicMock()
        
        # 调用API函数
        response = delete_team(request, team_id=self.team.id)
        
        # 验证响应
        response_data = json.loads(response.content)
        self.assertTrue(response_data['success'])
        
        # 验证团队已被标记为删除
        self.team.refresh_from_db()
        self.assertTrue(self.team.is_delete)