import { useEffect, useState } from "react"
import {
    Mic, MicOff, Video, VideoOff,
    Monitor, PhoneOff, Users
} from "lucide-react"
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch"
import {
    toggleMute, toggleVideo, toggleScreenShare, endCall
} from "../../store/slices/callSlice"
import { addMessage } from "../../store/slices/messageSlices"
import { addTeamMessage } from "../../store/slices/teamSlice"
import { useCall } from "../../hooks/useCall"
import { createCallMessage } from "../../utils/callMessageHelper"
import { TeamMessage } from "../../utils/dummyTeams"

export default function CallWindow() {
    const dispatch = useAppDispatch()
    const callState = useAppSelector((state) => state.call)
    const currentUser = useAppSelector((state) => state.auth.currentUser)
    const [callDuration, setCallDuration] = useState(0)

    const {
        localVideoRef,
        remoteVideoRef,
        hangUp,
        toggleMuteTrack,
        toggleVideoTrack,
        startScreenShare,
    } = useCall()

    const isTeamCall = callState.peerId?.startsWith("team_") ?? false

    // ✅ Duration timer
    useEffect(() => {
        if (callState.callStatus !== "connected") return
        const timer = setInterval(() => setCallDuration((d) => d + 1), 1000)
        return () => clearInterval(timer)
    }, [callState.callStatus])

    // ✅ Local camera — CallWindow mount ஆனா attach பண்ணு
    useEffect(() => {
        if (callState.callType !== "video") return

        let stream: MediaStream

        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then((s) => {
                stream = s
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream
                }
            })
            .catch((err) => console.error("Local camera error:", err))

        return () => {
            // Cleanup — CallWindow unmount ஆனா stop பண்ணு
            stream?.getTracks().forEach((t) => t.stop())
        }
    }, [callState.isInCall, callState.callType])

    const formatDuration = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, "0")
        const s = (seconds % 60).toString().padStart(2, "0")
        return `${m}:${s}`
    }

    const handleHangUp = () => {
        if (currentUser && callState.roomId) {
            const callMsg = createCallMessage(
                currentUser.id,
                currentUser.name,
                callState.peerId ?? "",
                callState.peerName ?? "",
                callState.roomId,
                callState.callType ?? "audio",
                callState.callStatus === "connected" ? "ended" : "missed",
                callDuration,
            )
            if (isTeamCall) {
                dispatch(addTeamMessage(callMsg as TeamMessage))
            } else {
                dispatch(addMessage(callMsg))
            }
        }
        hangUp()
        dispatch(endCall())
    }

    const handleToggleMute = () => {
        toggleMuteTrack()
        dispatch(toggleMute())
    }

    const handleToggleVideo = () => {
        toggleVideoTrack()
        dispatch(toggleVideo())
    }

    const handleScreenShare = async () => {
        await startScreenShare()
        dispatch(toggleScreenShare())
    }

    return (
        <div className="fixed inset-0 bg-[#0A0A0A] z-[9999] flex flex-col">

            {/* ── Header ── */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#111111] border-b border-[#202020]">
                <div className="flex items-center gap-3">
                    {isTeamCall ? (
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                            {callState.peerName?.charAt(0).toUpperCase()}
                        </div>
                    ) : (
                        <div className="w-9 h-9 rounded-full bg-[#4F6EF7] flex items-center justify-center text-white text-sm font-medium">
                            {callState.peerName?.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <div>
                        <div className="flex items-center gap-2">
                            <p className="text-white text-sm font-semibold">{callState.peerName}</p>
                            {isTeamCall && (
                                <span className="text-[10px] bg-[#4F6EF7]/20 text-[#4F6EF7] px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <Users size={9} /> Team
                                </span>
                            )}
                        </div>
                        <p className="text-[#22C55E] text-xs">
                            {callState.callStatus === "connected"
                                ? formatDuration(callDuration)
                                : "Calling..."}
                        </p>
                    </div>
                </div>

                {callState.isScreenSharing && (
                    <span className="text-xs bg-[#4F6EF7]/20 text-[#4F6EF7] px-3 py-1 rounded-full flex items-center gap-1">
                        <Monitor size={12} /> Sharing screen
                    </span>
                )}
            </div>

            {/* ── Calling screen ── */}
            {callState.callStatus !== "connected" && (
                <div className="flex-1 flex flex-col items-center justify-center gap-6 bg-[#0A0A0A]">
                    {isTeamCall ? (
                        <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-5xl font-bold animate-pulse">
                            {callState.peerName?.charAt(0).toUpperCase()}
                        </div>
                    ) : (
                        <div className="w-28 h-28 rounded-full bg-[#4F6EF7] flex items-center justify-center text-white text-5xl font-bold animate-pulse">
                            {callState.peerName?.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <div className="text-center">
                        <p className="text-white text-xl font-semibold">{callState.peerName}</p>
                        {isTeamCall && (
                            <p className="text-[#8A8A8A] text-xs mt-0.5 flex items-center justify-center gap-1">
                                <Users size={11} /> Group call
                            </p>
                        )}
                        <p className="text-[#8A8A8A] text-sm mt-1">
                            {callState.callType === "video" ? "Video calling..." : "Audio calling..."}
                        </p>
                    </div>

                    {/* ✅ Calling screen-லயும் local video preview show பண்ணு */}
                    {callState.callType === "video" && (
                        <div className="w-48 h-36 rounded-xl overflow-hidden border-2 border-[#4F6EF7] mt-4">
                            <video
                                ref={localVideoRef}
                                autoPlay
                                playsInline
                                muted
                                className="w-full h-full object-cover scale-x-[-1]"
                            />
                        </div>
                    )}
                </div>
            )}

            {/* ── Connected screen ── */}
            {callState.callStatus === "connected" && (
                <div className="flex-1 relative bg-[#0A0A0A]">

                    {/* Remote video */}
                    {callState.callType === "video" && (
                        <video
                            ref={remoteVideoRef}
                            autoPlay
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    )}

                    {/* Audio call avatar */}
                    {callState.callType === "audio" && (
                        <div className="flex flex-col items-center justify-center h-full gap-4">
                            {isTeamCall ? (
                                <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-5xl font-bold">
                                    {callState.peerName?.charAt(0).toUpperCase()}
                                </div>
                            ) : (
                                <div className="w-28 h-28 rounded-full bg-[#4F6EF7] flex items-center justify-center text-white text-5xl font-bold">
                                    {callState.peerName?.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <p className="text-white text-xl font-semibold">{callState.peerName}</p>
                            <p className="text-[#22C55E] text-sm">{formatDuration(callDuration)}</p>
                        </div>
                    )}

                    {/* ✅ Local video — bottom right */}
                    {callState.callType === "video" && !callState.isVideoOff && (
                        <div className="absolute bottom-4 right-4 w-40 h-28 rounded-xl overflow-hidden border-2 border-[#4F6EF7] shadow-lg">
                            <video
                                ref={localVideoRef}
                                autoPlay
                                playsInline
                                muted
                                className="w-full h-full object-cover scale-x-[-1]"
                            />
                            <div className="absolute bottom-1 left-2">
                                <p className="text-white text-[10px] font-medium">
                                    {currentUser?.name} (You)
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Video off placeholder */}
                    {callState.callType === "video" && callState.isVideoOff && (
                        <div className="absolute bottom-4 right-4 w-40 h-28 rounded-xl bg-[#141414] border border-[#202020] flex items-center justify-center">
                            <div className="flex flex-col items-center gap-1">
                                <div className="w-10 h-10 rounded-full bg-[#4F6EF7] flex items-center justify-center text-white text-sm font-medium">
                                    {currentUser?.name.charAt(0).toUpperCase()}
                                </div>
                                <p className="text-[#8A8A8A] text-[10px]">Camera off</p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* ── Controls ── */}
            <div className="flex items-center justify-center gap-4 py-6 bg-[#111111] border-t border-[#202020]">
                <button
                    onClick={handleToggleMute}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${callState.isMuted
                            ? "bg-red-500/20 border border-red-500 text-red-400"
                            : "bg-[#1A1A1A] border border-gray-700 text-white hover:bg-[#2A2A2A]"
                        }`}
                >
                    {callState.isMuted ? <MicOff size={20} /> : <Mic size={20} />}
                </button>

                {callState.callType === "video" && (
                    <button
                        onClick={handleToggleVideo}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${callState.isVideoOff
                                ? "bg-red-500/20 border border-red-500 text-red-400"
                                : "bg-[#1A1A1A] border border-gray-700 text-white hover:bg-[#2A2A2A]"
                            }`}
                    >
                        {callState.isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
                    </button>
                )}

                <button
                    onClick={handleScreenShare}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${callState.isScreenSharing
                            ? "bg-[#4F6EF7]/20 border border-[#4F6EF7] text-[#4F6EF7]"
                            : "bg-[#1A1A1A] border border-gray-700 text-white hover:bg-[#2A2A2A]"
                        }`}
                >
                    <Monitor size={20} />
                </button>

                <button
                    onClick={handleHangUp}
                    className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all shadow-lg"
                >
                    <PhoneOff size={22} className="text-white" />
                </button>
            </div>
        </div>
    )
}