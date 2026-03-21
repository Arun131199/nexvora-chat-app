import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TeamMessage } from "../../utils/dummyTeams"

interface TeamState {
    messages: TeamMessage[]
}

const initialState: TeamState = {
    messages: [],
}

const teamSlice = createSlice({
    name: "team",
    initialState,
    reducers: {
        addTeamMessage: (state, action: PayloadAction<TeamMessage>) => {
            state.messages.push({
                ...action.payload,
                status: "read",
            })
        },
        setTeamMessages: (state, action: PayloadAction<TeamMessage[]>) => {
            state.messages = action.payload
        },
        clearTeamMessages: (state) => {
            state.messages = []
        },
    },
})

export const { addTeamMessage, setTeamMessages, clearTeamMessages } =
    teamSlice.actions
export default teamSlice.reducer