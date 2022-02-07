import seldom


class FormTest(seldom.TestCase):
    """
    表单
    """

    def test_from(self):
        """
        测试表单
        """
        self.open("https://sahitest.com/demo/formTest.htm")
        # 警告框
        self.accept_alert()
        # 输入框
        self.type(name="t1", text="input1")
        self.type(xpath="/html/body/form/table/tbody/tr[3]/td[2]/input", text="input2")
        self.type(name="name", text="input3")
        self.type(css="[name$=a_dollar]", text="input4")
        self.type(name="ta1", text="hello world\n")
        # 复选框
        self.click(css="[value=cv1]")
        self.click(css="[value=cv2]")
        self.click(css="[value=cv3]")
        self.click(css="[type=checkbox]", index=3)
        # 单选框
        self.click(name="r1")
        self.click(name="r1", index=1)
        # 密码框
        self.type(xpath="//*[@type='password']", index=0, text="123")
        self.type(xpath="//*[@type='password']", index=1, text="456")
        self.window_scroll(height=800)
        self.sleep(2)
        # 下拉选择框
        self.select(name="s1", value="o2")
        self.accept_alert()
        self.select(name="s1", text="o3")
        self.accept_alert()
        self.select(name="s1", index=1)
        self.accept_alert()


if __name__ == '__main__':
    seldom.main(debug=True)



