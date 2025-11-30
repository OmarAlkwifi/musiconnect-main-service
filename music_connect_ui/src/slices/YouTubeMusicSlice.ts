import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

interface YouTubeMusicUser {
    id: string
    name: string
}

interface Song {
    id: string,
    name: string,
    artist: string,
}

interface Playlist {
    name: string,
    songs: Song[],
}

interface SearchRequest {
    query: string,
}

interface SearchResponse {
    results: Song[]
}

interface FetchPlaylistRequest {
    userId: string,
    name: string,
}

interface FetchPlaylistResponse {
    playlists: Playlist[]
}

interface YouTubeMusicSlice {
    user: YouTubeMusicUser,
    playlists: Playlist[],
    searchResults: Song[],
    query: string,
    error: string,
    loading: boolean,
    results: SearchResponse,
}

const initialState: YouTubeMusicSlice = {
    user: null,
    playlists: [],
    searchResults: [],
    query: "",
    error: "",
    loading: false,
    results: null,
};

export const fetchUser = createAsyncThunk(
    "YouTubeMusic/fetchUser",
    async () => {
        try {
            // Call to fetch user / login
            const response = await fetch("");

            return await response.json();
        } catch (error) {
            throw (error.message);
        }
    }
);


export const search = createAsyncThunk(
    "YouTubeMusic/search",
    async () => {
        try {
            // Call to search YouTubeMusic
            const response = await fetch("");

            return await response.json();
        } catch (error) {
            throw (error.message);
        }
    }
);

export const fetchPlaylists = createAsyncThunk(
    "YouTubeMusic/fetchPlaylists",
    async () => {
        try {
            // Call to fetch user playlists
            const response = await fetch("");

            return await response.json();
        } catch (error) {
            throw (error.message);
        }
    }
);

export const createPlaylist = createAsyncThunk(
    "YouTubeMusic/createPlaylist",
    async () => {
        try {
            // Call to create new playlist for user
            const response = await fetch("");

            return await response.json();
        } catch (error) {
            throw (error.message);
        }
    }
);

const YouTubeMusicSlice = createSlice({
    name: "YouTubeMusic",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = "An error occurred";
            })
            .addCase(search.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(search.fulfilled, (state, action) => {
                state.loading = false;
                state.results = action.payload;
            })
            .addCase(search.rejected, (state, action) => {
                state.loading = false;
                state.error = "An error occurred";
            })
            .addCase(fetchPlaylists.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPlaylists.fulfilled, (state, action) => {
                state.loading = false;
                state.playlists = action.payload;
            })
            .addCase(fetchPlaylists.rejected, (state, action) => {
                state.loading = false;
                state.error = "An error occurred";
            })
            .addCase(createPlaylist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPlaylist.fulfilled, (state, action) => {
                state.loading = false;
                state.playlists = action.payload;
            })
            .addCase(createPlaylist.rejected, (state, action) => {
                state.loading = false;
                state.error = "An error occurred";
            });
    },
});

export default YouTubeMusicSlice.reducer;