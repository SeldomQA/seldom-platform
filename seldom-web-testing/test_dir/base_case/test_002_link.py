import seldom


class LinkTest(seldom.TestCase):
    """
    链接
    """

    def test_link(self):
        """
        测试链接
        """
        self.open("https://sahitest.com/demo/linkTest.htm")
        self.click_text("linkByContent")
        self.sleep(2)
        self.click_text("Back")


if __name__ == '__main__':
    seldom.main(debug=True)



