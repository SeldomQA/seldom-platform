from datetime import datetime, timedelta
from typing import Optional, Dict
import jwt
from django.contrib.auth.models import User
from django.core.cache import cache

SECRET_KEY = "seldom-platform-007"  # 建议放到配置文件中


class CustomToken:
    """
    自定义token类
    """

    def __init__(self):
        self.secret = SECRET_KEY
        self.expire_hours = 1  # token 过期时间(小时)
        self.blacklist_prefix = "token_blacklist_"

    def create_token(self, user_id: int, username: str) -> str:
        """
        生成token
        :param user_id: 用户id
        :param username: 用户名
        :return: token字符串
        """
        user = User.objects.get(id=user_id)
        payload = {
            "user_id": user_id,
            "username": username,
            "permissions": [perm.codename for perm in user.user_permissions.all()],
            "exp": datetime.utcnow() + timedelta(hours=self.expire_hours),
            "iat": datetime.utcnow()
        }

        token = jwt.encode(payload, self.secret, algorithm="HS256")
        return token

    def check_token(self, token: str) -> bool:
        """
        验证token
        :param token: token字符串
        :return: bool
        """
        try:
            # 先检查是否在黑名单中
            if self.is_blacklisted(token):
                return False
                
            jwt.decode(token, self.secret, algorithms=["HS256"])
            return True
        except jwt.ExpiredSignatureError:
            return False
        except jwt.InvalidTokenError:
            return False

    def get_token_info(self, token: str) -> Optional[Dict]:
        """
        获取token中的信息
        :param token: token字符串
        :return: dict/None
        """
        try:
            payload = jwt.decode(token, self.secret, algorithms=["HS256"])
            return payload
        except:
            return None

    def invalidate_token(self, token: str) -> None:
        """
        使token失效（加入黑名单）
        :param token: token字符串
        """
        try:
            # 获取token的过期时间
            payload = jwt.decode(token, self.secret, algorithms=["HS256"])
            exp = datetime.fromtimestamp(payload['exp'])
            now = datetime.utcnow()
            
            # 计算剩余有效时间（秒）
            ttl = int((exp - now).total_seconds())
            
            if ttl > 0:
                # 将token加入黑名单，过期时间与token原过期时间一致
                cache.set(f"{self.blacklist_prefix}{token}", True, ttl)
        except jwt.InvalidTokenError:
            pass

    def is_blacklisted(self, token: str) -> bool:
        """
        检查token是否在黑名单中
        :param token: token字符串
        :return: bool
        """
        return cache.get(f"{self.blacklist_prefix}{token}", False)
