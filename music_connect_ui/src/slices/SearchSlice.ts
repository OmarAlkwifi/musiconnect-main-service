import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

interface Search {
    query: string,
    page: number,
}

interface SearchRequest {
    query: string,
}

interface SearchResponse {
    results: Search[]
}

interface SearchSlice {
    query: string,
    error: string,
    loading: boolean,
    results: SearchResponse,
}

const initialState: SearchSlice = {
    query: "",
    error: "",
    loading: false,
    results: null,
};

export const search = createAsyncThunk(
    "search",
    async () => {
        try {
            // Call to search all apps
            const response = await fetch("");

            return await response.json();
        } catch (error) {
            throw (error.message);
        }
    }
);

const SearchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
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
            });
    },
});

export default SearchSlice.reducer;