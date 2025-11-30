from pydantic import BaseModel
from typing import List, Optional


class AddTracksRequest(BaseModel):
    uris: List[str]


class RemoveTracksRequest(BaseModel):
    uris: List[str]


class ReorderTracksRequest(BaseModel):
    range_start: int
    insert_before: int
    range_length: Optional[int] = 1


class CreatePlaylistRequest(BaseModel):
    name: str
    description: Optional[str] = None
    public: bool = False
