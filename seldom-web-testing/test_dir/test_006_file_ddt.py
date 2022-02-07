import seldom
from seldom import file_data


class FileDataTest(seldom.TestCase):
    """
    文件数据驱动
    """

    def start(self):
        self.test_url = "https://www.w3school.com.cn/tiy/t.asp?f=eg_html_form_submit"

    @file_data("json_data.json", key="name")
    def test_json_list(self, firstname, lastname):
        """
        used file_data test
        """
        self.open(self.test_url)
        self.switch_to_frame(id_="iframeResult")
        self.type(name="firstname", text=firstname, clear=True)
        self.type(name="lastname", text=lastname, clear=True)
        self.sleep(1)

    @file_data("json_data.json", key="login")
    def test_json_dict(self, username, password):
        """
        used file_data test
        """
        self.open(self.test_url)
        self.switch_to_frame(id_="iframeResult")
        self.type(name="firstname", text=username, clear=True)
        self.type(name="lastname", text=password, clear=True)
        self.sleep(1)

    @file_data("yaml_data.yaml", key="name")
    def test_yaml_list(self, firstname, lastname):
        """
        used file_data test
        """
        self.open(self.test_url)
        self.switch_to_frame(id_="iframeResult")
        self.type(name="firstname", text=firstname, clear=True)
        self.type(name="lastname", text=lastname, clear=True)
        self.sleep(1)

    @file_data("yaml_data.yaml", key="login")
    def test_yaml_list(self, username, password):
        """
        used file_data test
        """
        self.open(self.test_url)
        self.switch_to_frame(id_="iframeResult")
        self.type(name="firstname", text=username, clear=True)
        self.type(name="lastname", text=password, clear=True)
        self.sleep(1)

    @file_data("csv_data.csv", line=2)
    def test_csv(self, firstname, lastname):
        """
        used file_data test
        """
        self.open(self.test_url)
        self.switch_to_frame(id_="iframeResult")
        self.type(name="firstname", text=firstname, clear=True)
        self.type(name="lastname", text=lastname, clear=True)
        self.sleep(1)

    @file_data(file="excel_data.xlsx", sheet="Sheet1", line=2)
    def test_excel(self, firstname, lastname):
        """
        used file_data test
        """
        self.open(self.test_url)
        self.switch_to_frame(id_="iframeResult")
        self.type(name="firstname", text=firstname, clear=True)
        self.type(name="lastname", text=lastname, clear=True)
        self.sleep(1)


if __name__ == '__main__':
    seldom.main(debug=True)
