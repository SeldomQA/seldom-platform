from django.test import TestCase as JTestCase
from app_case.models import TestCase, CaseResult
from app_project.models import Project


class TestCaseModels(JTestCase):
    def setUp(self):
        # 创建测试项目
        self.project = Project.objects.create(
            name='test_project',
            address='https://github.com/test/test.git',
            run_version='v1.0',
            case_dir='test_cases'
        )
        
        # 创建测试用例
        self.test_case = TestCase.objects.create(
            project=self.project,
            file_name='test_file.py',
            class_name='TestClass',
            class_doc='Test class doc',
            case_name='test_method',
            case_doc='Test method doc',
            label='test_label',
            case_hash='test_hash'
        )
        
        # 创建测试结果
        self.case_result = CaseResult.objects.create(
            case=self.test_case,
            name='test_result',
            report='test_report',
            passed=1,
            error=0,
            failure=0,
            skipped=0,
            tests=1,
            system_out='test_system_out',
            run_time=1.0
        )
    
    def test_model_creation(self):
        """测试模型创建的基本属性"""
        # 测试测试用例创建
        self.assertEqual(self.test_case.file_name, 'test_file.py')
        self.assertEqual(self.test_case.project, self.project)
        self.assertEqual(self.test_case.class_name, 'TestClass')
        self.assertEqual(self.test_case.class_doc, 'Test class doc')
        self.assertEqual(self.test_case.case_name, 'test_method')
        self.assertEqual(self.test_case.case_doc, 'Test method doc')
        self.assertEqual(self.test_case.label, 'test_label')
        self.assertEqual(self.test_case.case_hash, 'test_hash')
        self.assertEqual(self.test_case.status, 0)  # 0表示未执行
        self.assertIsNotNone(self.test_case.create_time)
        self.assertIsNotNone(self.test_case.update_time)
        
        # 测试测试结果创建
        self.assertEqual(self.case_result.case, self.test_case)
        self.assertEqual(self.case_result.name, 'test_result')
        self.assertEqual(self.case_result.report, 'test_report')
        self.assertEqual(self.case_result.passed, 1)
        self.assertEqual(self.case_result.error, 0)
        self.assertEqual(self.case_result.failure, 0)
        self.assertEqual(self.case_result.skipped, 0)
        self.assertEqual(self.case_result.tests, 1)
        self.assertEqual(self.case_result.system_out, 'test_system_out')
        self.assertEqual(self.case_result.run_time, 1.0)
        self.assertIsNotNone(self.case_result.create_time)
        
        # 测试字符串表示
        self.assertEqual(str(self.test_case), 'test_method')
        self.assertEqual(str(self.case_result), 'test_result')

    def test_model_relationships(self):
        """测试模型间的关系"""
        # 测试项目与测试用例的关系
        self.assertEqual(self.project.testcase_set.count(), 1)
        self.assertIn(self.test_case, self.project.testcase_set.all())
        
        # 测试测试用例与测试结果的关系
        self.assertEqual(self.test_case.caseresult_set.count(), 1)
        self.assertIn(self.case_result, self.test_case.caseresult_set.all())

    def test_model_updates(self):
        """测试模型更新"""
        # 更新测试用例状态
        self.test_case.status = 1  # 1表示执行中
        self.test_case.save()
        self.test_case.refresh_from_db()
        self.assertEqual(self.test_case.status, 1)
        
        # 更新测试结果数据
        self.case_result.passed = 2
        self.case_result.save()
        self.case_result.refresh_from_db()
        self.assertEqual(self.case_result.passed, 2)

    def test_create_additional_case(self):
        """测试创建额外的测试用例"""
        # 创建另一个测试用例
        another_case = TestCase.objects.create(
            project=self.project,
            file_name='another_test_file.py',
            class_name='AnotherTestClass',
            case_name='another_test_method',
            case_hash='another_hash'
        )
        
        # 验证创建的属性
        self.assertEqual(another_case.project, self.project)
        self.assertEqual(another_case.file_name, 'another_test_file.py')
        self.assertEqual(another_case.class_name, 'AnotherTestClass')
        self.assertEqual(another_case.case_name, 'another_test_method')
        self.assertEqual(another_case.case_hash, 'another_hash')
        self.assertIsNotNone(another_case.create_time)
        self.assertIsNotNone(another_case.update_time)
        
        # 验证项目关联
        self.assertIn(another_case, self.project.testcase_set.all())
        self.assertEqual(self.project.testcase_set.count(), 2)