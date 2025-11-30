from fastapi import APIRouter, Depends, Query, HTTPException
from fastapi.responses import RedirectResponse
from typing import Optional
import base64
import urllib.parse
import requests

from app.dependencies import get_user_id
from app.services.spotify_service import SpotifyService
from app.storage import token_manager
from app.config import settings

# Spotify endpoints
AUTH_URL = "https://accounts.spotify.com/authorize"
TOKEN_URL = "https://accounts.spotify.com/api/token"

router = APIRouter(prefix="/auth", tags=["auth"])


@router.get("/login")
async def login(user_id: str = Depends(get_user_id)):
    """
    Step 1: UI calls this → returns Spotify login URL.
    """
    return SpotifyService.build_auth_url(user_id)


@router.get("/callback")
def callback(
    code: Optional[str] = Query(default=None),
    state: Optional[str] = Query(default=None),
    error: Optional[str] = Query(default=None),
):
    """
    Step 2: Spotify redirects here with ?code=...
    This exchanges the code for access + refresh tokens.
    """

    if error:
        raise HTTPException(status_code=400, detail=f"OAuth error: {error}")

    if not code or not state:
        raise HTTPException(status_code=400, detail="Missing 'code' or 'state'.")

    if not token_manager.validate_state(state):
        raise HTTPException(status_code=400, detail="Invalid state.")

    # Build Basic Auth header
    client_creds = f"{settings.SPOTIFY_CLIENT_ID}:{settings.SPOTIFY_CLIENT_SECRET}"
    b64_client_creds = base64.b64encode(client_creds.encode()).decode()

    data = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": settings.SPOTIFY_REDIRECT_URI,
    }

    headers = {
        "Authorization": f"Basic {b64_client_creds}",
        "Content-Type": "application/x-www-form-urlencoded",
    }

    # Exchange authorization code for tokens
    resp = requests.post(TOKEN_URL, data=data, headers=headers, timeout=20)
    if resp.status_code != 200:
        raise HTTPException(
            status_code=resp.status_code,
            detail="Failed to exchange code for token."
        )

    token_payload = resp.json()
    token_manager.store_tokens(token_payload)

    # ⭐ Redirect back to UI (you can change this URL)
    return RedirectResponse("http://localhost:3000/spotify")


