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


def copytree(source_dir: str, target_dir: str) -> None:
    """
    复制项目目录
    :param source_dir:
    :param target_dir:
    """
    # 如果目标目录不存在则创建
    if not os.path.exists(target_dir):
        os.makedirs(target_dir)

    def handle_remove_read_only(func, path, exc):
        """
        删除目录
        :param func:
        :param path:
        :param exc:
        :return:
        """
        # exc 是一个异常对象，不是元组
        if isinstance(exc, PermissionError) and func in (os.rmdir, os.remove, os.unlink):
            os.chmod(path, stat.S_IRWXU | stat.S_IRWXG | stat.S_IRWXO)  # 0777
            func(path)
        elif isinstance(exc, tuple) and len(exc) > 1:
            excvalue = exc[1]
            if func in (os.rmdir, os.remove, os.unlink) and hasattr(excvalue, 'errno') and excvalue.errno == errno.EACCES:
                os.chmod(path, stat.S_IRWXU | stat.S_IRWXG | stat.S_IRWXO)  # 0777
                func(path)
            else:
                raise exc[1] from exc[0]
        else:
            raise

    # 删除
    shutil.rmtree(target_dir, onexc=handle_remove_read_only)
    # 复制
    shutil.copytree(source_dir, target_dir)
