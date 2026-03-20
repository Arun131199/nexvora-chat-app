import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Users } from "../../types/user";

interface ProfileState {
    selectedUser: Users | null;
    isOpen: boolean
}

const initialState: ProfileState = {
    selectedUser: null,
    isOpen: false
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        openProfile: (state, action: PayloadAction<Users>) => {
            state.selectedUser = action.payload;
            state.isOpen = true;
        },

        closeProfile: (state) => {
            state.selectedUser = null;
            state.isOpen = false
        }
    }
})

export const { openProfile, closeProfile } = profileSlice.actions;
export default profileSlice.reducer;