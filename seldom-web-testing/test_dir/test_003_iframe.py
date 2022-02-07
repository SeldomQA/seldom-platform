import seldom


class IFrameTest(seldom.TestCase):
    """
    嵌套表单
    """

    def test_iframe(self):
        """
        测试嵌套表单
        """
        self.open("https://sahitest.com/demo/iframesTest.htm")
        self.switch_to_frame(xpath="//iframe")
        title = self.get_text(xpath="//h2")
        self.assertEqual(title, "Sahi Tests")
        self.switch_to_frame_out()
        title = self.get_text(xpath="//h2")
        self.assertEqual(title, "IFRAME Tests")


if __name__ == '__main__':
    seldom.main(debug=True)
