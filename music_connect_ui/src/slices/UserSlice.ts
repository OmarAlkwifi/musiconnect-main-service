import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

interface User {
    name: string,
    username: string,
    password: string,
    sessionActive: boolean
}

interface UserResponse {

}

interface UserRequest {

}

interface CreateUserRequest {

}

interface UserSlice {
    user: User,
    error: string,
    loading: boolean
}

const initialState: UserSlice = {
    user: {
        name: "",
        username: "",
        password: "",
        sessionActive: false,
    },
    error: "",
    loading: false,
};

export const fetchUser = createAsyncThunk(
    "user/fetchUser",
    async () => {
        try {
            // Get user data / authenticate
            const response = await fetch("");

            return await response.json();
        } catch (error) {
            throw (error.message);
        }
    }
);

export const createUserAccount = createAsyncThunk(
    "user/createAccount",
    async () => {
        try {
            // Get user data / authenticate
            const response = await fetch("");

            return await response.json();
        } catch (error) {
            throw (error.message);
        }
    }
);

export const logout = createAsyncThunk(
    "user/logout",
    async () => {
        try {
            // Get user data / authenticate
            const response = await fetch("");

            return await response.json();
        } catch (error) {
            throw (error.message);
        }
    }
);

const UserSlice = createSlice({
    name: "users",
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
            .addCase(createUserAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUserAccount.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(createUserAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = "An error occurred";
            })
            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = "An error occurred";
            });
    },
});

export default UserSlice.reducer;