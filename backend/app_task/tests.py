import json
from django.test import TestCase
from unittest.mock import patch, MagicMock
from django.http import Http404
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
import requests
from app_task.models import TestTask, TaskCaseRelevance, TaskReport, ReportDetails
from app_project.models import Project, Env
from app_case.models import TestCase as AppCase
from app_project.models import Team


class TaskAPITestCase(TestCase):
    """测试任务管理API"""

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
            cover_name="",
            path_name=""
        )
        
        # 创建测试环境
        self.env = Env.objects.create(
            name="Test Environment",
            test_type="http",
            rerun=0
        )
        
        # 创建测试团队
        self.team = Team.objects.create(
            name="Test Team"
        )
        
        # 创建测试用例
        self.test_case = AppCase.objects.create(
            project=self.project,
            file_name="test_file.py",
            class_name="TestClass",
            case_name="test_method",
            case_hash="test_hash_123456"
        )
        
        # 创建测试任务
        self.task = TestTask.objects.create(
            project=self.project,
            name="Test Task",
            env_id=self.env.id,
            team_id=self.team.id
        )
        
        # 创建任务用例关联
        self.task_case = TaskCaseRelevance.objects.create(
            task=self.task,
            case_hash=self.test_case.case_hash
        )

    def test_create_task(self):
        """测试创建任务"""
        from app_task.api import create_task
        from app_task.schema import TaskIn
        
        # 创建任务输入数据
        task_in = TaskIn(
            project=str(self.project.id),
            name="New Task",
            env_id=self.env.id,
            team_id=self.team.id,
            cases=[self.test_case.case_hash]
        )
        
        # 创建模拟请求
        request = MagicMock()
        request.user = self.user
        
        # 调用API函数
        response = create_task(request, task=task_in)
        
        # 验证响应
        response_data = json.loads(response.content)
        self.assertTrue(response_data['success'])
        self.assertEqual(response_data['result']['name'], "New Task")
        self.assertEqual(response_data['result']['env_id'], self.env.id)
        self.assertEqual(response_data['result']['team_id'], self.team.id)
        
        # 验证数据库中任务已创建
        task = TestTask.objects.get(name="New Task")
        self.assertEqual(task.project, self.project)
        self.assertEqual(task.env_id, self.env.id)
        self.assertEqual(task.team_id, self.team.id)
        
        # 验证任务用例关联已创建
        task_cases = TaskCaseRelevance.objects.filter(task=task)
        self.assertEqual(len(task_cases), 1)
        self.assertEqual(task_cases[0].case_hash, self.test_case.case_hash)

    def test_get_task(self):
        """测试获取任务详情"""
        from app_task.api import get_task
        
        # 创建模拟请求
        request = MagicMock()
        request.user = self.user
        
        # 调用API函数
        response = get_task(request, task_id=self.task.id)
        
        # 验证响应
        response_data = json.loads(response.content)
        self.assertTrue(response_data['success'])
        self.assertEqual(response_data['result']['name'], "Test Task")
        self.assertEqual(response_data['result']['env'], self.env.id)
        self.assertIn(self.test_case.case_hash, response_data['result']['cases'])
        
        # 验证用例列表
        case_list = response_data['result']['case_list']
        self.assertEqual(len(case_list), 1)
        self.assertEqual(case_list[0]['key'], self.test_case.case_hash)
        self.assertEqual(case_list[0]['label'], "TestClass.test_method")

    def test_get_task_not_found(self):
        """测试获取不存在的任务"""
        from app_task.api import get_task
        
        # 创建模拟请求
        request = MagicMock()
        request.user = self.user
        
        # 调用API函数，应该引发ObjectDoesNotExist异常
        with self.assertRaises(ObjectDoesNotExist):
            get_task(request, task_id=999)

    def test_update_task(self):
        """测试更新任务"""
        from app_task.api import update_task
        from app_task.schema import TaskIn
        
        # 创建新测试用例
        new_test_case = AppCase.objects.create(
            project=self.project,
            file_name="new_test_file.py",
            class_name="NewTestClass",
            case_name="new_test_method",
            case_hash="new_test_hash_123456"
        )
        
        # 创建任务更新输入数据
        task_in = TaskIn(
            project=str(self.project.id),
            name="Updated Task",
            env_id=self.env.id,
            team_id=self.team.id,
            cases=[new_test_case.case_hash]  # 使用新的用例
        )
        
        # 创建模拟请求
        request = MagicMock()
        request.user = self.user
        
        # 调用API函数
        response = update_task(request, task_id=self.task.id, task=task_in)
        
        # 验证响应
        response_data = json.loads(response.content)
        self.assertTrue(response_data['success'])
        self.assertEqual(response_data['result']['name'], "Updated Task")
        
        # 验证数据库中任务已更新
        self.task.refresh_from_db()
        self.assertEqual(self.task.name, "Updated Task")
        
        # 验证任务用例关联已更新
        task_cases = TaskCaseRelevance.objects.filter(task=self.task)
        self.assertEqual(len(task_cases), 1)
        self.assertEqual(task_cases[0].case_hash, new_test_case.case_hash)

    def test_delete_task(self):
        """测试删除任务"""
        from app_task.api import delete_task
        
        # 创建模拟请求
        request = MagicMock()
        request.user = self.user
        
        # 调用API函数
        response = delete_task(request, task_id=self.task.id)
        
        # 验证响应
        response_data = json.loads(response.content)
        self.assertTrue(response_data['success'])
        
        # 验证任务已被标记为删除
        self.task.refresh_from_db()
        self.assertTrue(self.task.is_delete)
        
        # 验证任务用例关联已被删除
        task_cases = TaskCaseRelevance.objects.filter(task=self.task)
        self.assertEqual(len(task_cases), 0)

    @patch('app_task.api.seldom_running')
    @patch('app_task.api.clear_test_modules')
    @patch('app_task.api.file')
    @patch('app_task.api.LocalGitResource')
    def test_running_task(self, mock_local_git_resource, mock_file, mock_clear_test_modules, mock_seldom_running):
        """测试运行任务"""
        from app_task.api import running_task
        
        # 创建模拟请求
        request = MagicMock()
        request.user = self.user
        
        # 模拟 LocalGitResource
        mock_local_instance = MagicMock()
        mock_local_git_resource.return_value = mock_local_instance
        mock_local_instance.git_project_dir.return_value = '/path/to/project'
        
        # 模拟 file 模块
        mock_file.join.return_value = '/path/to/project/test_cases'
        mock_file.add_to_path = MagicMock()
        
        # 调用API函数
        response = running_task(request, task_id=self.task.id)
        
        # 验证响应
        response_data = json.loads(response.content)
        self.assertTrue(response_data['success'])
        
        # 验证mock是否被正确调用
        mock_local_git_resource.assert_called_once()
        mock_clear_test_modules.assert_called_once()
        mock_file.add_to_path.assert_called_once()
        mock_seldom_running.assert_called_once()

    def test_running_task_already_running(self):
        """测试运行已经在执行中的任务"""
        from app_task.api import running_task
        
        # 将任务状态设置为执行中
        self.task.status = 1
        self.task.save()
        
        # 创建模拟请求
        request = MagicMock()
        request.user = self.user
        
        # 调用API函数
        response = running_task(request, task_id=self.task.id)
        
        # 验证响应
        response_data = json.loads(response.content)
        self.assertFalse(response_data['success'])
        self.assertEqual(response_data['error']['code'], 10052)  # TASK_RUNNING 错误码
        self.assertEqual(response_data['error']['message'], "任务正在运行中")

    def test_get_result_list(self):
        """测试获取报告详细信息"""
        from app_task.api import get_result_list
        from app_task.schema import ReportIn
        
        # 创建测试报告
        report = TaskReport.objects.create(
            task=self.task,
            name="Test Report",
            passed=1,
            error=0,
            failure=0,
            skipped=0,
            tests=1,
            run_time="1.0"
        )
        
        # 创建测试报告详情
        report_detail = ReportDetails.objects.create(
            result=report,
            class_name="TestClass",
            name="test_method",
            run_time="1.0",
            doc="Test method doc",
            system_out="Test output",
            error_out="",  # 空表示无错误
            failure_out="",  # 空表示无失败
            skipped_message=""  # 空表示未跳过
        )
        
        # 创建报告查询输入数据
        report_in = ReportIn(type="success")  # 查询成功的用例
        
        # 创建模拟请求
        request = MagicMock()
        request.user = self.user
        
        # 调用API函数
        response = get_result_list(request, report_id=report.id, result=report_in)
        
        # 验证响应
        response_data = json.loads(response.content)
        self.assertTrue(response_data['success'])
        self.assertEqual(len(response_data['result']), 1)
        self.assertEqual(response_data['result'][0]['name'], "test_method")
        self.assertEqual(response_data['result'][0]['class_name'], "TestClass")

    @patch('app_task.api.requests.post')
    def test_create_timed_task(self, mock_post):
        """测试创建定时任务"""
        from app_task.api import create_timed
        from app_task.schema import TimedIn
        
        # 创建模拟HTTP响应
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_post.return_value = mock_response
        
        # 创建定时任务输入数据
        timed_in = TimedIn(
            task_id=self.task.id,
            second="0",
            minute="*",
            hour="*",
            day="*",
            month="*",
            day_of_week="*"
        )
        
        # 创建模拟请求
        request = MagicMock()
        request.user = self.user
        
        # 调用API函数
        response = create_timed(request, timed=timed_in)
        
        # 验证响应
        response_data = json.loads(response.content)
        self.assertTrue(response_data['success'])
        
        # 验证任务已更新定时任务信息
        self.task.refresh_from_db()
        self.assertNotEqual(self.task.timed, "")
        
        # 验证HTTP请求被调用
        mock_post.assert_called_once()

    @patch('app_task.api.requests.post')
    def test_create_timed_task_connection_error(self, mock_post):
        """测试创建定时任务时连接错误"""
        from app_task.api import create_timed
        from app_task.schema import TimedIn
        
        # 模拟连接错误 - 使用requests.exceptions.ConnectionError
        mock_post.side_effect = requests.exceptions.ConnectionError("Connection failed")
        
        # 创建定时任务输入数据
        timed_in = TimedIn(
            task_id=self.task.id,
            second="0",
            minute="*",
            hour="*",
            day="*",
            month="*",
            day_of_week="*"
        )
        
        # 创建模拟请求
        request = MagicMock()
        request.user = self.user
        
        # 调用API函数
        response = create_timed(request, timed=timed_in)
        
        # 验证响应
        response_data = json.loads(response.content)
        self.assertFalse(response_data['success'])
        self.assertEqual(response_data['error']['code'], 10056)  # TIMED_TASK_FAILED 错误码

    @patch('app_task.api.requests.put')
    def test_switch_timed_task_pause(self, mock_put):
        """测试暂停定时任务"""
        from app_task.api import switch_timed
        
        # 设置任务初始定时任务状态为运行中
        self.task.timed = json.dumps({
            "status": "running",
            "cron_job": {
                "job_id": f"cron_task_{self.task.id}",
                "url": f"http://localhost/api/task/{self.task.id}/running",
                "second": "0",
                "minute": "*",
                "hour": "*",
                "day": "*",
                "month": "*",
                "day_of_week": "*"
            }
        })
        self.task.save()
        
        # 创建模拟HTTP响应
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_put.return_value = mock_response
        
        # 创建模拟请求
        request = MagicMock()
        request.user = self.user
        
        # 调用API函数
        response = switch_timed(request, task_id=self.task.id)
        
        # 验证响应
        response_data = json.loads(response.content)
        self.assertTrue(response_data['success'])
        
        # 验证任务定时任务状态已更新
        self.task.refresh_from_db()
        timed_data = json.loads(self.task.timed)
        self.assertEqual(timed_data["status"], "pause")
        
        # 验证HTTP请求被调用
        mock_put.assert_called_once()

    @patch('app_task.api.requests.delete')
    def test_delete_timed_task(self, mock_delete):
        """测试删除定时任务"""
        from app_task.api import delete_timed
        
        # 设置任务初始定时任务状态
        self.task.timed = json.dumps({
            "status": "running",
            "cron_job": {
                "job_id": f"cron_task_{self.task.id}",
                "url": f"http://localhost/api/task/{self.task.id}/running",
                "second": "0",
                "minute": "*",
                "hour": "*",
                "day": "*",
                "month": "*",
                "day_of_week": "*"
            }
        })
        self.task.save()
        
        # 创建模拟HTTP响应
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_delete.return_value = mock_response
        
        # 创建模拟请求
        request = MagicMock()
        request.user = self.user
        
        # 调用API函数
        response = delete_timed(request, task_id=self.task.id)
        
        # 验证响应
        response_data = json.loads(response.content)
        self.assertTrue(response_data['success'])
        
        # 验证任务定时任务信息已清空
        self.task.refresh_from_db()
        self.assertEqual(self.task.timed, "")
        
        # 验证HTTP请求被调用
        mock_delete.assert_called_once()