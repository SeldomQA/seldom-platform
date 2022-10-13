import os
import stat
import errno
import shutil
import hashlib
from seldom.utils import file
from backend.settings import BASE_DIR


def github_dir() -> str:
    """
    获得本地github地址
    """
    local_github_dir = file.join(BASE_DIR, "github")
    if os.path.exists(local_github_dir) is False:
        os.mkdir(local_github_dir)

    return local_github_dir


def project_dir(project_address: str, temp=False) -> str:
    """
    获得项目本地路径
    :param project_address:
    :param temp:
    """
    if "/" not in project_address:
        raise FileExistsError(f"project address error. {project_address}")

    # 本地项目地址
    project_name = project_address.split("/")[-1].replace(".git", "")
    if temp is True:
        project_address = file.join(github_dir(), project_name + "_temp")
    else:
        project_address = file.join(github_dir(), project_name)

    if temp is True and os.path.exists(project_address) is False:
        os.mkdir(project_address)

    return project_address


def get_hash(string: str) -> str:
    """
    生成字符串hash
     :param string:
    """
    md5 = hashlib.md5()
    sign_bytes_utf8 = string.encode(encoding="utf-8")
    md5.update(sign_bytes_utf8)
    string_hash = md5.hexdigest()
    return string_hash


def copytree(project_dir: str, copy_dir: str) -> None:
    """
    复制项目目录
    :param project_dir:
    :param copy_dir:
    """
    def handle_remove_read_only(func, path, exc):
        excvalue = exc[1]
        if func in (os.rmdir, os.remove, os.unlink) and excvalue.errno == errno.EACCES:
            os.chmod(path, stat.S_IRWXU | stat.S_IRWXG | stat.S_IRWXO)  # 0777
            func(path)
        else:
            raise

    # 删除
    shutil.rmtree(copy_dir, onerror=handle_remove_read_only)
    # 复制
    shutil.copytree(project_dir, copy_dir)
