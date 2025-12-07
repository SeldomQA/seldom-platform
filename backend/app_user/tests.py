import json
from django.test import TestCase
from unittest.mock import patch, MagicMock
from django.contrib.auth.models import User
from app_user.schema import RegisterIn, LoginIn, LogoutIn


class UserAPITestCase(TestCase):
    """测试用户管理API"""

    def setUp(self):
        """初始化测试数据"""
        # 创建测试用户
        self.user = User.objects.create_user(
            username="testuser",
            password="testpassword"
        )

    def test_register_success(self):
        """测试用户注册成功"""
        from app_user.api import register
        from backend.settings import ALLOW_REGISTRATION
        
        # 创建注册输入数据
        register_in = RegisterIn(
            username="newuser",
            password="newpassword",
            password2="newpassword"
        )
        
        # 创建模拟请求
        request = MagicMock()
        
        # 调用API函数
        with patch('app_user.api.ALLOW_REGISTRATION', True):
            response = register(request, params=register_in)
        
        # 验证响应
        response_data = json.loads(response.content)
        self.assertTrue(response_data['success'])
        self.assertEqual(response_data['result']['username'], "newuser")
        self.assertIn('id', response_data['result'])
        self.assertIn('permissions', response_data['result'])
        
        # 验证数据库中用户已创建
        user = User.objects.get(username="newuser")
        self.assertTrue(user.check_password("newpassword"))

    def test_register_restricted(self):
        """测试注册受限"""
        from app_user.api import register
        
        # 创建注册输入数据
        register_in = RegisterIn(
            username="newuser",
            password="newpassword",
            password2="newpassword"
        )
        
        # 创建模拟请求
        request = MagicMock()
        
        # 调用API函数
        with patch('app_user.api.ALLOW_REGISTRATION', False):
            response = register(request, params=register_in)
        
        # 验证响应
        response_data = json.loads(response.content)
        self.assertFalse(response_data['success'])
        self.assertEqual(response_data['error']['code'], 40012)  # REGISTER_RESTRICT 错误码
        self.assertEqual(response_data['error']['message'], "未开放注册, 联系作者获取体验账号")

    def test_register_password_mismatch(self):
        """测试注册时密码不匹配"""
        from app_user.api import register
        from backend.settings import ALLOW_REGISTRATION
        
        # 创建注册输入数据（密码不匹配）
        register_in = RegisterIn(
            username="newuser",
            password="newpassword",
            password2="differentpassword"
        )
        
        # 创建模拟请求
        request = MagicMock()
        
        # 调用API函数
        with patch('app_user.api.ALLOW_REGISTRATION', True):
            response = register(request, params=register_in)
        
        # 验证响应
        response_data = json.loads(response.content)
        self.assertFalse(response_data['success'])
        self.assertEqual(response_data['error']['code'], 10012)  # PAWD_ERROR 错误码
        self.assertEqual(response_data['error']['message'], "两次密码不一致")

    def test_register_user_exists(self):
        """测试注册已存在的用户"""
        from app_user.api import register
        from backend.settings import ALLOW_REGISTRATION
        
        # 创建注册输入数据（用户名已存在）
        register_in = RegisterIn(
            username="testuser",  # 已存在的用户名
            password="newpassword",
            password2="newpassword"
        )
        
        # 创建模拟请求
        request = MagicMock()
        
        # 调用API函数
        with patch('app_user.api.ALLOW_REGISTRATION', True):
            response = register(request, params=register_in)
        
        # 验证响应
        response_data = json.loads(response.content)
        self.assertFalse(response_data['success'])
        self.assertEqual(response_data['error']['code'], 10013)  # USER_HAS_REGISTERED 错误码
        self.assertEqual(response_data['error']['message'], "用户已注册")

    def test_login_success(self):
        """测试用户登录成功"""
        from app_user.api import login
        
        # 创建登录输入数据
        login_in = LoginIn(
            username="testuser",
            password="testpassword"
        )
        
        # 创建模拟请求
        request = MagicMock()
        
        # 调用API函数
        with patch('app_user.api.CustomToken') as mock_token_class:
            # 模拟token生成
            mock_token_instance = MagicMock()
            mock_token_instance.create_token.return_value = "test_token"
            mock_token_class.return_value = mock_token_instance
            
            response = login(request, data=login_in)
        
        # 验证响应
        response_data = json.loads(response.content)
        self.assertTrue(response_data['success'])
        self.assertEqual(response_data['result']['username'], "testuser")
        self.assertEqual(response_data['result']['token'], "test_token")
        self.assertIn('user_id', response_data['result'])
        self.assertIn('permissions', response_data['result'])

    def test_login_wrong_password(self):
        """测试用户登录密码错误"""
        from app_user.api import login
        
        # 创建登录输入数据（密码错误）
        login_in = LoginIn(
            username="testuser",
            password="wrongpassword"
        )
        
        # 创建模拟请求
        request = MagicMock()
        
        # 调用API函数
        response = login(request, data=login_in)
        
        # 验证响应
        response_data = json.loads(response.content)
        self.assertFalse(response_data['success'])
        self.assertEqual(response_data['error']['code'], 10015)  # LOGIN_PAWD_ERROR 错误码
        self.assertEqual(response_data['error']['message'], "密码错误")

    def test_login_user_not_exist(self):
        """测试登录不存在的用户"""
        from app_user.api import login
        
        # 创建登录输入数据（用户不存在）
        login_in = LoginIn(
            username="nonexistentuser",
            password="anypassword"
        )
        
        # 创建模拟请求
        request = MagicMock()
        
        # 调用API函数
        response = login(request, data=login_in)
        
        # 验证响应
        response_data = json.loads(response.content)
        self.assertFalse(response_data['success'])
        self.assertEqual(response_data['error']['code'], 10014)  # LOGIN_USSER_ERROR 错误码
        self.assertEqual(response_data['error']['message'], "用户名错误")

    def test_logout(self):
        """测试用户登出"""
        from app_user.api import logout
        
        # 创建登出输入数据
        logout_in = LogoutIn(token="test_token")
        
        # 创建模拟请求
        request = MagicMock()
        
        # 调用API函数
        with patch('app_user.api.CustomToken') as mock_token_class:
            # 模拟token失效
            mock_token_instance = MagicMock()
            mock_token_instance.invalidate_token = MagicMock()
            mock_token_class.return_value = mock_token_instance
            
            response = logout(request, params=logout_in)
        
        # 验证响应
        response_data = json.loads(response.content)
        self.assertTrue(response_data['success'])
        
        # 验证token失效方法被调用
        mock_token_instance.invalidate_token.assert_called_once_with("test_token")