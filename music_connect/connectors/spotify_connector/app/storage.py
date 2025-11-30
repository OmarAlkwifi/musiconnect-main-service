import json
from typing import Dict, Any, Optional
from app.config import settings

try:
    import redis
except:
    redis = None


class TokenStore:
    def put_tokens(self, user_id: str, data: Dict[str, Any]): ...
    def get_tokens(self, user_id: str) -> Optional[Dict[str, Any]]: ...
    def set_state(self, state: str, user_id: str): ...
    def pop_state(self, state: str) -> Optional[str]: ...


class InMemoryTokenStore(TokenStore):
    def __init__(self):
        self.tokens = {}
        self.states = {}

    def put_tokens(self, user_id, data):
        self.tokens[user_id] = data

    def get_tokens(self, user_id):
        return self.tokens.get(user_id)

    def set_state(self, state, user_id):
        self.states[state] = user_id

    def pop_state(self, state):
        return self.states.pop(state, None)


if settings.STORAGE_BACKEND == "redis":
    class RedisTokenStore(TokenStore):
        def __init__(self, url):
            self.client = redis.Redis.from_url(url)

        def put_tokens(self, user_id, data):
            self.client.set(user_id, json.dumps(data))

        def get_tokens(self, user_id):
            raw = self.client.get(user_id)
            return json.loads(raw) if raw else None

        def set_state(self, state, user_id):
            self.client.setex(f"state:{state}", 600, user_id)

        def pop_state(self, state):
            key = f"state:{state}"
            val = self.client.get(key)
            if val:
                self.client.delete(key)
                return val.decode()
            return None

    token_store = RedisTokenStore(settings.REDIS_URL)
else:
    token_store = InMemoryTokenStore()
