import seldom
from seldom import Steps


class BingTest(seldom.TestCase):
    """必应测试用例"""

    def test_search_case(self):
        """搜索用例 """
        self.open("https://cn.bing.com")
        self.type(id_="sb_form_q", text="seldom", enter=True)
        self.assertTitle("seldom - 搜索")


if __name__ == '__main__':
    seldom.main(debug=True)
