from pydantic import BaseModel

class AuthLoginResponse(BaseModel):
    auth_url: str
    state: str
