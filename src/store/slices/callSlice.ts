import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CallState } from "../../types/calls"

const initialState: CallState = {
    isInCall: false,
    isSetupInProgress: false,
    callType: null,
    roomId: null,
    peerId: null,
    peerName: null,
    isInitiator: false,
    isMuted: false,
    isVideoOff: false,
    isScreenSharing: false,
    isChatOpen: false,
    callStatus: "idle",
    callDuration: 0, // ✅ add
}

const callSlice = createSlice({
    name: "call",
    initialState,
    reducers: {
        startCall: (state, action: PayloadAction<{
            callType: "video" | "audio"
            roomId: string
            peerId: string
            peerName: string
            isInitiator: boolean
        }>) => {
            state.isInCall = true
            state.isSetupInProgress = false
            state.callType = action.payload.callType
            state.roomId = action.payload.roomId
            state.peerId = action.payload.peerId
            state.peerName = action.payload.peerName
            state.isInitiator = action.payload.isInitiator
            state.callStatus = "calling"
            state.callDuration = 0
        },
        acceptCall: (state) => {
            state.isSetupInProgress = false
            state.callStatus = "connected"
        },
        setCallSetupInProgress: (state, action: PayloadAction<boolean>) => {
            state.isSetupInProgress = action.payload
        },
        tickCallDuration: (state) => {
            state.callDuration += 1 
        },
        endCall: () => initialState,
        toggleMute: (state) => { state.isMuted = !state.isMuted },
        toggleVideo: (state) => { state.isVideoOff = !state.isVideoOff },
        toggleScreenShare: (state) => { state.isScreenSharing = !state.isScreenSharing },
        toggleChat: (state) => { state.isChatOpen = !state.isChatOpen },
        setCallStatus: (state, action: PayloadAction<CallState["callStatus"]>) => {
            state.callStatus = action.payload
        },
    },
})

export const {
    startCall, acceptCall, endCall,
    toggleMute, toggleVideo, toggleScreenShare,
    toggleChat, setCallStatus, tickCallDuration, setCallSetupInProgress,
} = callSlice.actions

export default callSlice.reducer
