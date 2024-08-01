import os
import sys


def find_test_modules(directory: str) -> list:
    """
    列出指定目录下的所有目录名和去掉后缀的文件名（不遍历子目录）
    :param directory: 要列出的目录路径
    returns:
    """
    dir_names = []
    file_names = []

    with os.scandir(directory) as entries:
        for entry in entries:
            if entry.is_dir():
                dir_names.append(entry.name)
            elif entry.is_file():
                file_name, _ = os.path.splitext(entry.name)
                if file_name == "__init__":
                    continue
                file_names.append(file_name)

    return dir_names + file_names


def clear_test_modules(directory: str) -> None:
    """
    清除测试用例目录（test_dir）下所有的测试模块
    :param directory:
    returns:
    """
    if not os.path.isdir(directory):
        raise NotADirectoryError(f"{directory} is not a valid directory")

    test_modules = find_test_modules(directory)
    for module_name in list(sys.modules):
        for m in test_modules:
            if module_name.startswith(m):
                try:
                    del sys.modules[module_name]
                except KeyError:
                    continue
