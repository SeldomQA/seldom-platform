"""
page object model
Using the poium Library
https://github.com/SeldomQA/poium
```
> pip install poium=1.0.4
```
"""
import seldom
from seldom import Seldom
# from seldom.utils import file
# file.add_to_path(file.dir_dir)
from pages.po_page import BaiduPage


class BaiduTest(seldom.TestCase):
    """
    page object 设计模式
    """

    def test_case(self):
        """
        A simple test
        """
        page = BaiduPage(Seldom.driver)
        page.open("https://www.baidu.com")
        page.search_input = "seldom"
        page.search_button.click()
        self.assertTitle("seldom_百度搜索")


if __name__ == '__main__':
    seldom.main(browser='chrome', debug=True)
