import os
import re

from seldom.utils import file

from backend.settings import BASE_DIR


def is_valid_git_repo_url(url: str) -> bool:
    # 检查 HTTP/HTTPS URL
    http_regex = re.compile(r'^https?://(?:[a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,6}(?:/[^\s]*)?$')
    if http_regex.match(url):
        return True
    
    # 检查 Git 协议 URL
    git_protocol_regex = re.compile(r'^git://[^/]+/(.+)$')
    if git_protocol_regex.match(url):
        return True
    
    # 检查 SSH URL
    ssh_regex = re.compile(r'^git@([^:]+):(.+)$')
    if ssh_regex.match(url):
        return True

    return False


class LocalGitResource:
    """
    本地资源目录操作
    """

    def __init__(self, project_name=None, git_address=None):
        """
        :param project_name:  API接口项目
        :param git_address: https://gitee.com/fnngj/seldom-api-testing
        """
        self.project_name = project_name
        self.git_address = git_address
        self.git_project_name = self.__git_project_name()

    def __git_project_name(self) -> str:
        """
        获取git项目名
        :return:
        """
        if "/" not in self.git_address:
            raise FileExistsError(f"project address error. {self.git_address}")

        project_repository_name = self.git_address.split("/")[-1].replace(".git", "")
        return project_repository_name

    @property
    def github_dir(self) -> str:
        """
        获得本地github地址
        backend/resource/github/
        """
        local_github_dir = file.join(BASE_DIR, "resource", "github")
        if os.path.exists(local_github_dir) is False:
            os.mkdir(local_github_dir)

        return local_github_dir

    @property
    def project_dir(self) -> str:
        """
        获取项目本地目录
        backend/resource/github/<project_name>
        :return:
        """
        if self.project_name is None:
            raise NameError("project_name is None")

        local_project_dir = file.join(self.github_dir, self.project_name)
        if not os.path.exists(local_project_dir):
            os.makedirs(local_project_dir)

        return local_project_dir

    def git_project_is_exists(self) -> bool:
        """
        判断项目代码是否存在
        :return:
        """
        if self.project_name is None or self.git_address is None:
            raise NameError("project_name or git_address is None")

        git_project_repository_dir = file.join(self.project_dir, self.git_project_name)

        return os.path.exists(git_project_repository_dir)

    def git_project_dir(self, suffix: str = None) -> str:
        """
        获取项目本地目录
        backend/resource/github/<project_name>/<git_project_name>
        :return:
        """
        if self.project_name is None or self.git_address is None:
            raise NameError("project_name or git_address is None")

        if suffix is None:
            return file.join(self.project_dir, self.git_project_name)

        return file.join(self.project_dir, f"{self.git_project_name}_{suffix}")
