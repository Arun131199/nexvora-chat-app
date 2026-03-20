import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthUser {
    id: string;
    name: string;
    isOnline: boolean;
}

interface AuthState {
    currentUser: AuthUser | null;
}

const initialState: AuthState = {
    currentUser: {
        id: "user_001",
        name: "Arun",
        isOnline: true,
    },
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<AuthUser>) => {
            state.currentUser = action.payload;
        },
        clearCurrentUser: (state) => {
            state.currentUser = null;
        },
    },
});

export const { setCurrentUser, clearCurrentUser } = authSlice.actions;
export default authSlice.reducer;