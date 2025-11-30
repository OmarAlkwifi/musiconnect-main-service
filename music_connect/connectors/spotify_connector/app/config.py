from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # --- Spotify Credentials ---
    SPOTIFY_CLIENT_ID: str
    SPOTIFY_CLIENT_SECRET: str
    SPOTIFY_REDIRECT_URI: str

    # --- OAuth Scopes ---
    SPOTIFY_SCOPES: str = (
        "user-read-email "
        "playlist-read-private "
        "playlist-modify-private "
        "playlist-modify-public "
        "user-library-read "
        "user-library-modify"
    )

    # --- Service Basics ---
    BASE_URL: str = "http://localhost:8081"

    # --- Storage Backend ---
    STORAGE_BACKEND: str = "memory"   # memory or redis

    # --- CORS ---
    CORS_ALLOWED_ORIGINS: List[str] = ["*"]
    CORS_ALLOWED_METHODS: List[str] = ["*"]
    CORS_ALLOWED_HEADERS: List[str] = ["*"]

    # --- Logging ---
    LOG_LEVEL: str = "INFO"

    class Config:
        env_file = ".env"


settings = Settings()
