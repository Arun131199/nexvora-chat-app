import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Message } from "../../types/message";
import messages from "../../utils/dummyData";

interface MessageState {
    messages: Message[];
    isLoading: boolean;
    error: string | null;
}

const initialState: MessageState = {
    messages: messages,
    isLoading: false,
    error: null
}

const messageSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload)
        },

        setMessage: (state, action: PayloadAction<Message[]>) => {
            state.messages = action.payload
        },

        clearMessage: (state) => {
            state.messages = []
        },

        updateStatus: (state, action: PayloadAction<{ id: string; status: Message["status"] }>) => {
            const msg = state.messages.find((m) => m.id === action.payload.id);
            if (msg) {
                msg.status = action.payload.status;
            }
        }
    }
})

export const { addMessage, clearMessage, setMessage, updateStatus } = messageSlice.actions;
export default messageSlice.reducer;