import errno
import hashlib
import os
import shutil
import stat


def get_hash(string: str) -> str:
    """
    生成字符串hash
     :param string:
    """
    md5 = hashlib.md5()
    sign_bytes_utf8 = string.encode()
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
        """

        :param func:
        :param path:
        :param exc:
        :return:
        """
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
