import seldom


class WindowTest(seldom.TestCase):
    """
    多窗口
    """

    def test_window(self):
        """
        测试窗口
        """
        self.open("https://sahitest.com/demo/")
        # 打开新窗口
        self.click_text("Window Open Test")
        self.switch_to_window(1)
        self.sleep(2)
        self.switch_to_window(0)
        # 打开新窗口 标题
        self.click_text("Window Open Test With Title")
        self.switch_to_window(2)
        self.sleep(2)
        self.assertTitle("With Title")


if __name__ == '__main__':
    seldom.main(debug=True)
