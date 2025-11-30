from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import auth, music
from app.utils.logger import get_logger

logger = get_logger(__name__)


app = FastAPI(
    title="SpotifyConnectorService",
    version="1.0.0",
    description="MusicConnect Spotify connector Wmicroservice",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health():
    return {"status": "ok", "service": "spotify_connector"}

app.include_router(auth.router)
app.include_router(music.router)

