from fastapi import APIRouter, Depends, Query

from app.dependencies import get_user_id
from app.services.spotify_service import SpotifyService

from app.models.music_models import (
    AddTracksRequest,
    RemoveTracksRequest,
    ReorderTracksRequest,
    CreatePlaylistRequest,
)

router = APIRouter(prefix="/music", tags=["music"])

@router.get("/me")
def me(user_id: str = Depends(get_user_id)):
    return SpotifyService(user_id).get_user_profile()

@router.get("/playlists")
def playlists(user_id: str = Depends(get_user_id)):
    return SpotifyService(user_id).get_playlists()

@router.get("/tracks")
def tracks(user_id: str = Depends(get_user_id)):
    return SpotifyService(user_id).get_saved_tracks()

@router.post("/playlists")
def create_playlist(data: CreatePlaylistRequest, user_id: str = Depends(get_user_id)):
    return SpotifyService(user_id).create_playlist(data.name, data.description, data.public)

@router.post("/playlist/{id}/add")
def add(id: str, data: AddTracksRequest, user_id: str = Depends(get_user_id)):
    return SpotifyService(user_id).add_tracks_to_playlist(id, data.uris)

@router.post("/playlist/{id}/remove")
def remove(id: str, data: RemoveTracksRequest, user_id: str = Depends(get_user_id)):
    return SpotifyService(user_id).remove_tracks_from_playlist(id, data.uris)
