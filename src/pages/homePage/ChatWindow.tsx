import { useState, useRef, useEffect } from "react"
import { Send, Paperclip, Smile, Video, PhoneCall, EllipsisVertical } from "lucide-react"
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch"
import { useWebSocket } from "../../hooks/useWebSocked"
import { createMessage } from "../../utils/createMessage"
import dayjs from "dayjs"
import users from "../../utils/dummyUsers"
import { openProfile } from "../../store/slices/profileSlice"

interface ChatViewProps {
    roomId: string;
    userId: string;
    onOpenProfile: () => void;
}

export default function ChatWindow({ roomId, userId, onOpenProfile }: ChatViewProps) {
    const [input, setInput] = useState("")
    const bottomRef = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch()
    const receiverUser = users.find((user) => user.id === userId)
    const currentUser = useAppSelector((state) => state.auth.currentUser)
    const allMessages = useAppSelector((state) => state.messages.messages)
    const messages = allMessages.filter((msg) => msg.roomId === roomId)

    const { sendMessage } = useWebSocket(roomId)

    const handleOpenProfile = () => {
        if (receiverUser) {
            dispatch(openProfile(receiverUser))
        }
    }


    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const receiverMsg = messages.find(
        (msg) => msg.senderId !== currentUser?.id
    )

    const handleSend = () => {
        if (!input.trim() || !currentUser) return

        const msg = createMessage(
            currentUser.id,
            currentUser.name,
            receiverMsg?.senderId ?? "",
            receiverMsg?.senderName ?? "",
            roomId,
            input
        )
        sendMessage(msg)
        setInput("")
    }

    return (
        <div className="flex flex-col h-screen bg-[#0A0A0A]">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[#202020] bg-[#111111]">
                <div className="w-9 h-9 rounded-full bg-[#4F6EF7] flex items-center justify-center text-white text-sm font-medium cursor-pointer" >
                    {receiverUser?.name.charAt(0).toUpperCase() ?? "?"}
                </div>
                <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col justify-center">
                        <p className="text-white text-sm font-semibold leading-tight">
                            {receiverUser?.name ?? "Unknown"}
                        </p>
                        <p
                            className={`text-xs ${receiverMsg?.isOnline ? "text-green-500" : "text-red-400"
                                }`}
                        >
                            {receiverUser?.isOnline ? "Online" : "Offline"}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="text-white border border-gray-600 p-2 rounded-lg hover:bg-gray-800 transition cursor-pointer">
                            <Video size={20} />
                        </button>
                        <button className="text-white border border-gray-600 p-2 rounded-lg hover:bg-gray-800 transition cursor-pointer">
                            <PhoneCall size={20} />
                        </button>
                        <button className="text-white border border-gray-600 p-2 rounded-lg hover:bg-gray-800 transition cursor-pointer">
                            <EllipsisVertical size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">

                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full gap-2">
                        <p className="text-gray-200 text-sm">No messages yet</p>
                        <p className="text-gray-200 text-xs">Say hello! 👋</p>
                    </div>
                )}

                {messages.map((msg, index) => {
                    const isMine = msg.senderId === currentUser?.id
                    const prevMsg = messages[index - 1]
                    const showAvatar = !prevMsg || prevMsg.senderId !== msg.senderId

                    return (
                        <div
                            key={msg.id}
                            className={`flex items-end gap-2 ${isMine ? "flex-row-reverse" : "flex-row"}`}
                        >
                            <div className="w-7 h-7 flex-shrink-0">
                                {showAvatar && (
                                    <div className="w-7 h-7 rounded-full bg-[#1a2a4a] flex items-center justify-center text-white text-xs font-medium cursor-pointer">
                                        {msg.senderName.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>

                            <div className={`flex flex-col gap-1 max-w-[60%] ${isMine ? "items-end" : "items-start"}`}>
                                {showAvatar && (
                                    <p className="text-[#8A8A8A] text-xs px-1">
                                        {isMine ? currentUser?.name : msg.senderName} · {dayjs(msg.createdAt).format("hh:mm A")}
                                    </p>
                                )}
                                <div
                                    className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${isMine
                                        ? "bg-[#4F6EF7] text-white rounded-br-none"
                                        : "bg-[#141414] border border-[#202020] text-gray-200 rounded-bl-none"
                                        }`}
                                >
                                    {msg.content}
                                </div>
                                {isMine && (
                                    <p className="text-[#3D3D3D] text-[10px] px-1">
                                        {msg.status === "read"
                                            ? "✓✓ Read"
                                            : msg.status === "delivered"
                                                ? "✓✓ Delivered"
                                                : "✓ Sent"}
                                    </p>
                                )}
                            </div>
                        </div>
                    )
                })}

                <div ref={bottomRef} />
            </div>
            <div className="flex items-center gap-3 px-4 py-3 border-t border-[#202020] bg-[#111111]">
                <button className="text-[#8A8A8A] hover:text-white transition-all p-2 rounded-lg hover:bg-[#1A1A1A]">
                    <Paperclip size={18} />
                </button>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type a message..."
                    className="flex-1 bg-[#1A1A1A] border border-[#2A2A2A] text-white text-sm rounded-xl px-4 py-2.5 outline-none focus:border-[#4F6EF7] placeholder:text-[#3D3D3D] transition-all"
                />
                <button className="text-[#8A8A8A] hover:text-white transition-all p-2 rounded-lg hover:bg-[#1A1A1A]">
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