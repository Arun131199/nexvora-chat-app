import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./slices/messageSlices"
import authReducer from './slices/authSlice'
import profileReducer from "./slices/profileSlice";
import callReducer from './slices/callSlice'
import teamReducer from "./slices/teamSlice"

export const store = configureStore({
    reducer: {
        messages: messageReducer,
        auth: authReducer,
        profile: profileReducer,
        call: callReducer,
        team: teamReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;