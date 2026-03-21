import { useState, useRef, useEffect } from "react"
import { Send, Paperclip, Smile, Users, Video, PhoneCall, Phone, PhoneMissed } from "lucide-react"
import { useAppSelector, useAppDispatch } from "../../../hooks/useAppDispatch"
import { dummyTeams, TeamMessage } from "../../../utils/dummyTeams"
import { createMessage } from "../../../utils/createMessage"
import { useWebSocket } from "../../../hooks/useWebSocked"
import { startCall } from "../../../store/slices/callSlice"
import dayjs from "dayjs"
import { addTeamMessage } from "../../../store/slices/teamSlice"
import { useCall } from "../../../hooks/useCall"

interface TeamChatProps {
    teamId: string
    messages: TeamMessage[]
    onOpenProfile: () => void
}

export default function TeamChat({ teamId, messages, onOpenProfile }: TeamChatProps) {
    const [input, setInput] = useState("")
    const bottomRef = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch()
    const currentUser = useAppSelector((state) => state.auth.currentUser)

    const team = dummyTeams.find((t) => t.id === teamId)
    const { sendMessage } = useWebSocket(teamId)
    const { initiateCall } = useCall()
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const handleSend = () => {
        if (!input.trim() || !currentUser) return
        const msg = createMessage(
            currentUser.id,
            currentUser.name,
            teamId,
            team?.name ?? "Team",
            teamId,
            input
        )
        dispatch(addTeamMessage(msg as TeamMessage))
        sendMessage(msg)
        setInput("")
    }

    const handleVideoCall = () => {
        dispatch(startCall({
            callType: "video",
            roomId: teamId,
            peerId: teamId,
            peerName: team?.name ?? "Team",
            isInitiator: true,
        }))
        initiateCall(teamId, "video")
    }
    const handleAudioCall = () => {
        dispatch(startCall({
            callType: "audio",
            roomId: teamId,
            peerId: teamId,
            peerName: team?.name ?? "Team",
            isInitiator: true,
        }))
        initiateCall(teamId, "audio") 
    }

    return (
        <div className="flex flex-col h-screen bg-[#0A0A0A]">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[#202020] bg-[#111111]">
                <div
                    onClick={onOpenProfile}
                    className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold cursor-pointer hover:opacity-80 transition-all"
                >
                    {team?.name.charAt(0).toUpperCase()}
                </div>

                <div className="flex items-center justify-between w-full">
                    <div
                        onClick={onOpenProfile}
                        className="flex flex-col justify-center cursor-pointer"
                    >
                        <p className="text-white text-sm font-semibold leading-tight">
                            {team?.name}
                        </p>
                        <p className="text-[#8A8A8A] text-xs flex items-center gap-1">
                            <Users size={10} />
                            {team?.memberCount} members
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleVideoCall}
                            title="Team Video Call"
                            className="text-white border border-gray-700 p-2 rounded-lg hover:bg-[#1a2a4a] hover:border-[#4F6EF7] transition-all cursor-pointer"
                        >
                            <Video size={18} />
                        </button>
                        <button
                            onClick={handleAudioCall}
                            title="Team Audio Call"
                            className="text-white border border-gray-700 p-2 rounded-lg hover:bg-[#1a2a4a] hover:border-[#4F6EF7] transition-all cursor-pointer"
                        >
                            <PhoneCall size={18} />
                        </button>
                        <button
                            onClick={onOpenProfile}
                            title="Team Info"
                            className="text-white border border-gray-700 p-2 rounded-lg hover:bg-[#1a2a4a] hover:border-[#4F6EF7] transition-all cursor-pointer"
                        >
                            <Users size={18} />
                        </button>

                    </div>
                </div>
            </div>

            {/* ── Messages ── */}
            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">

                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full gap-2">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                            {team?.name.charAt(0).toUpperCase()}
                        </div>
                        <p className="text-white text-sm font-medium mt-2">{team?.name}</p>
                        <p className="text-[#3D3D3D] text-xs">Start the conversation! 💬</p>
                    </div>
                )}

                {messages.map((msg, index) => {
                    const isMine = msg.senderId === currentUser?.id
                    const prevMsg = messages[index - 1]
                    const showAvatar = !prevMsg || prevMsg.senderId !== msg.senderId
                    const showTime = !messages[index + 1] || messages[index + 1].senderId !== msg.senderId

                    // ✅ Call message card
                    if (msg.type === "call") {
                        return (
                            <div
                                key={msg.id}
                                className={`flex items-center gap-2 ${isMine ? "flex-row-reverse" : "flex-row"}`}
                            >
                                <div className="w-7 h-7 flex-shrink-0" />
                                <div className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl border text-sm max-w-[60%] ${msg.callStatus === "missed"
                                    ? "bg-red-500/10 border-red-500/30"
                                    : "bg-[#141414] border-[#202020]"
                                    }`}>
                                    {msg.callStatus === "missed" ? (
                                        <PhoneMissed size={16} className="text-red-400 flex-shrink-0" />
                                    ) : msg.callType === "video" ? (
                                        <Video size={16} className="text-[#4F6EF7] flex-shrink-0" />
                                    ) : (
                                        <Phone size={16} className="text-[#4F6EF7] flex-shrink-0" />
                                    )}
                                    <div className="flex flex-col">
                                        <p className={`text-sm font-medium ${msg.callStatus === "missed" ? "text-red-400" : "text-white"
                                            }`}>
                                            {msg.content}
                                        </p>
                                        <p className="text-[#8A8A8A] text-[10px]">
                                            {dayjs(msg.createdAt).format("hh:mm A")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    // ✅ Normal message
                    return (
                        <div
                            key={msg.id}
                            className={`flex items-end gap-2 ${isMine ? "flex-row-reverse" : "flex-row"}`}
                        >
                            <div className="w-7 h-7 flex-shrink-0">
                                {showAvatar && !isMine && (
                                    <div className="w-7 h-7 rounded-full bg-[#1a2a4a] flex items-center justify-center text-white text-xs font-medium cursor-pointer hover:opacity-80 transition-all">
                                        {msg.senderName.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>

                            <div className={`flex flex-col gap-1 max-w-[60%] ${isMine ? "items-end" : "items-start"}`}>
                                {showAvatar && (
                                    <p className="text-[#8A8A8A] text-xs px-1">
                                        {isMine ? currentUser?.name : msg.senderName}
                                        {" · "}
                                        {dayjs(msg.createdAt).format("hh:mm A")}
                                    </p>
                                )}
                                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed break-words ${isMine
                                    ? "bg-[#4F6EF7] text-white rounded-br-none"
                                    : "bg-[#141414] border border-[#202020] text-gray-200 rounded-bl-none"
                                    }`}>
                                    {msg.content}
                                </div>
                                {isMine && showTime && (
                                    <p className="text-[#3D3D3D] text-[10px] px-1">
                                        {msg.status === "read" ? "✓✓ Read"
                                            : msg.status === "delivered" ? "✓✓ Delivered"
                                                : "✓ Sent"}
                                    </p>
                                )}
                            </div>
                        </div>
                    )
                })}

                <div ref={bottomRef} />
            </div>

            {/* ── Input Bar ── */}
            <div className="flex items-center gap-3 px-4 py-3 border-t border-[#202020] bg-[#111111]">
                <button
                    title="Attach file"
                    className="text-[#8A8A8A] hover:text-white transition-all p-2 rounded-lg hover:bg-[#1A1A1A]"
                >
                    <Paperclip size={18} />
                </button>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder={`Message ${team?.name ?? "Team"}...`}
                    className="flex-1 bg-[#1A1A1A] border border-[#2A2A2A] text-white text-sm rounded-xl px-4 py-2.5 outline-none focus:border-[#4F6EF7] placeholder:text-[#3D3D3D] transition-all"
                />
                <button
                    title="Emoji"
                    className="text-[#8A8A8A] hover:text-white transition-all p-2 rounded-lg hover:bg-[#1A1A1A]"
                >
                    <Smile size={18} />
                </button>
                <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="bg-[#4F6EF7] hover:bg-[#6B85FF] disabled:opacity-40 disabled:cursor-not-allowed text-white p-2.5 rounded-xl transition-all"
                >
                    <Send size={18} />
                </button>
            </div>

        </div>
    )
}