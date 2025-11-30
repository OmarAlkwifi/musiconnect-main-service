import time
import base64
from typing import Dict, Any, List

import requests
from fastapi import HTTPException

from app.config import settings
from app.storage import token_store
from app.interfaces.music_service_interface import MusicServiceInterface
from app.utils.logger import get_logger

logger = get_logger(__name__)

AUTH_URL = "https://accounts.spotify.com/authorize"
TOKEN_URL = "https://accounts.spotify.com/api/token"
API_BASE = "https://api.spotify.com/v1"


class SpotifyService(MusicServiceInterface):

    @classmethod
    def build_auth_url(cls, user_id: str) -> Dict[str, str]:
        import uuid
        from urllib.parse import urlencode

        state = uuid.uuid4().hex
        token_store.set_state(state, user_id)

        params = {
            "client_id": settings.SPOTIFY_CLIENT_ID,
            "response_type": "code",
            "redirect_uri": settings.SPOTIFY_REDIRECT_URI,
            "scope": settings.SPOTIFY_SCOPES,
            "state": state,
        }
        return {"auth_url": f"{AUTH_URL}?{urlencode(params)}", "state": state}

    @classmethod
    def handle_auth_callback(cls, code: str, state: str):
        user_id = token_store.pop_state(state)
        if not user_id:
            raise HTTPException(400, "Invalid state")

        client_creds = f"{settings.SPOTIFY_CLIENT_ID}:{settings.SPOTIFY_CLIENT_SECRET}"
        b64 = base64.b64encode(client_creds.encode()).decode()

        headers = {
            "Authorization": f"Basic {b64}",
            "Content-Type": "application/x-www-form-urlencoded",
        }
        data = {
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": settings.SPOTIFY_REDIRECT_URI,
        }

        resp = requests.post(TOKEN_URL, headers=headers, data=data)
        if resp.status_code != 200:
            raise HTTPException(resp.status_code, resp.text)

        payload = resp.json()
        token_store.put_tokens(user_id, {
            "access_token": payload["access_token"],
            "refresh_token": payload.get("refresh_token"),
            "expires_at": int(time.time()) + payload["expires_in"],
        })

        return {"status": "ok", "user_id": user_id}

    # ---- Internal helpers ----

    def _ensure_token(self):
        tokens = token_store.get_tokens(self.user_id)
        if not tokens:
            raise HTTPException(401, "Authenticate with /auth/login first")

        if tokens["expires_at"] < time.time():
            return self._refresh()

        return tokens["access_token"]

    def _refresh(self):
        tokens = token_store.get_tokens(self.user_id)
        refresh_token = tokens.get("refresh_token")

        client_creds = f"{settings.SPOTIFY_CLIENT_ID}:{settings.SPOTIFY_CLIENT_SECRET}"
        b64 = base64.b64encode(client_creds.encode()).decode()

        resp = requests.post(
            TOKEN_URL,
            headers={"Authorization": f"Basic {b64}"},
            data={"grant_type": "refresh_token", "refresh_token": refresh_token},
        )

        if resp.status_code != 200:
            raise HTTPException(resp.status_code, resp.text)

        payload = resp.json()
        new_access = payload["access_token"]
        expires_at = int(time.time()) + payload["expires_in"]

        tokens["access_token"] = new_access
        tokens["expires_at"] = expires_at
        token_store.put_tokens(self.user_id, tokens)

        return new_access

    def _headers(self):
        token = self._ensure_token()
        return {"Authorization": f"Bearer {token}"}

    # ---- Interface Methods ----

    def get_user_profile(self):
        r = requests.get(f"{API_BASE}/me", headers=self._headers())
        return r.json()

    def get_playlists(self, limit=20, offset=0):
        r = requests.get(
            f"{API_BASE}/me/playlists",
            headers=self._headers(),
            params={"limit": limit, "offset": offset},
        )
        return r.json()

    def get_saved_tracks(self, limit=20, offset=0):
        r = requests.get(
            f"{API_BASE}/me/tracks",
            headers=self._headers(),
            params={"limit": limit, "offset": offset},
        )
        return r.json()

    def create_playlist(self, name, description, public):
        user = self.get_user_profile()
        r = requests.post(
            f"{API_BASE}/users/{user['id']}/playlists",
            headers=self._headers(),
            json={"name": name, "description": description, "public": public},
        )
        return r.json()

    def add_tracks_to_playlist(self, playlist_id, uris: List[str]):
        r = requests.post(
            f"{API_BASE}/playlists/{playlist_id}/tracks",
            headers=self._headers(),
            json={"uris": uris},
        )
        return r.json()

    def remove_tracks_from_playlist(self, playlist_id, uris: List[str]):
        r = requests.delete(
            f"{API_BASE}/playlists/{playlist_id}/tracks",
            headers=self._headers(),
            json={"tracks": [{"uri": u} for u in uris]},
        )
        return r.json()

    def reorder_playlist_tracks(self, playlist_id, range_start, insert_before, range_length):
        r = requests.put(
            f"{API_BASE}/playlists/{playlist_id}/tracks",
            headers=self._headers(),
            json={
                "range_start": range_start,
                "insert_before": insert_before,
                "range_length": range_length,
            },
        )
        return r.json()
