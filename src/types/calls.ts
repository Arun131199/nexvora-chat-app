export interface CallState {
    isInCall: boolean;
    isSetupInProgress: boolean;
    callType: "video" | "audio" | null;
    roomId: string | null;
    peerId: string | null;
    peerName: string | null;
    isInitiator: boolean;
    isMuted: boolean;
    isVideoOff: boolean;
    isScreenSharing: boolean;
    isChatOpen: boolean;
    callStatus: "idle" | "calling" | "ringing" | "connected" | "ended",
    callDuration: number
}
