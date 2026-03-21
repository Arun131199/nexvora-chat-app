import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { authApi } from "../../api/authApi"

interface AuthUser {
    id: string;
    name: string;
    isOnline: boolean;
}

interface AuthState {
    currentUser: AuthUser | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}

// const initialState: AuthState = {
//     currentUser: null,
//     token: localStorage.getItem("nexora_token"),
//     isLoading: false,
//     error: null,
// }
const initialState: AuthState = {
    currentUser: {
        id: "user_001",
        name: "Arun",
        isOnline: true,
    },
    token: null,
    isLoading: false,
    error: null,
}
export const loginThunk = createAsyncThunk(
    "auth/login",
    async (data: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const res = await authApi.login(data)
            localStorage.setItem("nexora_token", res.token)
            return res
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message ?? "Invalid email or password"
            )
        }
    }
)

export const getMeThunk = createAsyncThunk(
    "auth/getMe",
    async (_, { rejectWithValue }) => {
        try {
            const res = await authApi.getMe()
            return res
        } catch (err: any) {
            return rejectWithValue("Session expired")
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<AuthUser>) => {
            state.currentUser = action.payload
        },
        clearCurrentUser: (state) => {
            state.currentUser = null
        },
        logout: (state) => {
            state.currentUser = null
            state.token = null
            state.error = null
            localStorage.removeItem("nexora_token")
        },
        clearError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {

        // Login
        builder
            .addCase(loginThunk.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.isLoading = false
                state.token = action.payload.token
                state.currentUser = action.payload.user
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string
            })

        // Get Me
        builder
            .addCase(getMeThunk.fulfilled, (state, action) => {
                state.currentUser = action.payload
            })
            .addCase(getMeThunk.rejected, (state) => {
                state.currentUser = null
                state.token = null
                localStorage.removeItem("nexora_token")
            })
    },
})

export const {
    setCurrentUser,
    clearCurrentUser,
    logout,
    clearError,
} = authSlice.actions

export default authSlice.reducer