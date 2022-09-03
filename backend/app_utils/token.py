import time
from django.core import signing
import hashlib
from django.core.cache import cache

#token组成、配置
HEADER = {'typ': 'JWP', 'alg': 'default'}
KEY = 'HUANG_XIA_HAN'
SALT = 'seldomplatform'
TIME_OUT = 720 * 60  # 720min

class TokenMethod:
    #加密
    def encrypt(obj):
        """加密"""
        value = signing.dumps(obj, key=KEY, salt=SALT)
        value = signing.b64_encode(value.encode()).decode()
        return value

    #解密
    def decrypt(src):
        """解密"""
        src = signing.b64_decode(src.encode()).decode()
        raw = signing.loads(src, key=KEY, salt=SALT)
        print(type(raw))
        return raw

    #生成token
    def create_token(username):
        """生成token信息"""
        # 1. 加密头信息
        header = TokenMethod.encrypt(HEADER)
        # 2. 构造Payload
        payload = {"username": username, "iat": time.time()}
        payload = TokenMethod.encrypt(payload)
        # 3. 生成签名
        md5 = hashlib.md5()
        md5.update(("%s.%s" % (header, payload)).encode())
        signature = md5.hexdigest()
        token = "%s.%s.%s" % (header, payload, signature)
        # 存储到缓存中
        cache.set(username, token, TIME_OUT)
        return token

    #获取参数
    def get_payload(token):
        payload = str(token).split('.')[1]
        payload = TokenMethod.decrypt(payload)
        return payload


    # 通过token获取用户名
    def get_username(token):
        payload = TokenMethod.get_payload(token)
        return payload['username']
        pass

    #检查token是否有效
    def check_token(token):
        username = TokenMethod.get_username(token)
        last_token = cache.get(username)
        if last_token:
            return last_token == token
        return False