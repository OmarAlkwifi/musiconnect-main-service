from abc import ABC, abstractmethod
from typing import Dict, Any, List

class MusicServiceInterface(ABC):
    service_name: str = "spotify"

    def __init__(self, user_id: str):
        self.user_id = user_id

    @abstractmethod
    def get_user_profile(self) -> Dict[str, Any]: ...

    @abstractmethod
    def get_playlists(self, limit: int, offset: int) -> Dict[str, Any]: ...

    @abstractmethod
    def get_saved_tracks(self, limit: int, offset: int) -> Dict[str, Any]: ...

    @abstractmethod
    def create_playlist(self, name: str, description: str, public: bool) -> Dict[str, Any]: ...

    @abstractmethod
    def add_tracks_to_playlist(self, playlist_id: str, uris: List[str]) -> Dict[str, Any]: ...

    @abstractmethod
    def remove_tracks_from_playlist(self, playlist_id: str, uris: List[str]) -> Dict[str, Any]: ...

    @abstractmethod
    def reorder_playlist_tracks(self, playlist_id: str, range_start: int, insert_before: int, range_length: int) -> Dict[str, Any]: ...
