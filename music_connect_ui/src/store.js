import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/UserSlice.ts";
import searchReducer from "./slices/SearchSlice.ts";
import spotifyReducer from "./slices/SpotifySlice.ts";
import youtubeMusicReducer from "./slices/YouTubeMusicSlice.ts";

const store = configureStore({
    reducer: {
        users: userReducer,
        search: searchReducer,
        spotify: spotifyReducer,
        youtubeMusic: youtubeMusicReducer
    },
});

export default store;