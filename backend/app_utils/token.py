import hashlib
import time

from django.core import signing
from django.core.cache import cache

# token组成、配置
HEADER = {'typ': 'JWP', 'alg': 'default'}
KEY = 'HUANG_XIA_HAN'
SALT = 'seldomplatform'
TIME_OUT = 720 * 60  # 720min


class TokenMethod:
    """
    Token method
    """

    @staticmethod
    def encrypt(obj):
        """加密"""
        value = signing.dumps(obj, key=KEY, salt=SALT)
        value = signing.b64_encode(value.encode()).decode()
        return value

    @staticmethod
    def decrypt(src):
        """解密"""
        src = signing.b64_decode(src.encode()).decode()
        raw = signing.loads(src, key=KEY, salt=SALT)
        return raw

    def create_token(self, username):
        """
        生成token信息
        """
        # 1. 加密头信息
        header = self.encrypt(HEADER)
        # 2. 构造Payload
        payload = {"username": username, "iat": time.time()}
        payload = self.encrypt(payload)
        # 3. 生成签名
        md5 = hashlib.md5()
        md5.update(("%s.%s" % (header, payload)).encode())
        signature = md5.hexdigest()
        token = "%s.%s.%s" % (header, payload, signature)
        # 存储到缓存中
        cache.set(username, token, TIME_OUT)
        return token

    def delete_token(self, token):
        """
        删除token
        """
        username = self.get_username(token)
        cache.delete(username)

    def get_payload(self, token):
        """
        获取参数
        """
        payload = str(token).split('.')[1]
        payload = self.decrypt(payload)
        return payload

    def get_username(self, token):
        """
        通过token获取用户名
        """
        payload = self.get_payload(token)
        return payload['username']

    def check_token(self, token):
        """
        检查token是否有效
        """
        username = self.get_username(token)
        last_token = cache.get(username)
        if last_token:
            return last_token == token
        return False
