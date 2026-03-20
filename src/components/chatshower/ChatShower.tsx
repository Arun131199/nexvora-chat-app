import { Check, CheckCheck } from "lucide-react"
import { Message } from "../../types/message"
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { updateStatus } from "../../store/slices/messageSlices";

interface ChatShowerProps {
    message: Message[];
    onSelectRoom: (roomId: string, userId: string) => void
}

export default function ChatShower({ message, onSelectRoom }: ChatShowerProps) {

    const dispatch = useAppDispatch()
    const handleClick = (msg: Message) => {
        if (msg.status !== "read") {
            dispatch(updateStatus({ id: msg.id, status: "read" }))
        }
         onSelectRoom(msg.roomId, msg.senderId)
    }
    return (
        <section className="w-full flex flex-col gap-3 px-2">
            {message.map((value) => (
                <div
                    key={value.id}
                    onClick={() => {
                        handleClick(value)
                    }}
                    className={`group cursor-pointer flex items-start gap-3 p-4 rounded-2xl transition-all duration-200
  ${value.status === "read"
                            ? "bg-gray-900/70 border-gray-700"
                            : "bg-gray-800 border-blue-500"
                        }
  hover:border-gray-500 hover:shadow-lg
`}
                >
                    <div className="relative flex-shrink-0">
                        <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-lg shadow-md">
                            {value.senderName.slice(0, 1).toUpperCase()}
                        </div>
                        <span
                            className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-gray-900 ${value.isOnline ? "bg-green-500" : "bg-red-500"
                                }`}
                        />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                            <p className="text-white font-semibold text-base truncate">
                                {value.senderName}
                            </p>
                            <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition">
                                {
                                    new Date(value.createdAt).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })
                                }
                            </span>
                        </div>


                        <div className="flex items-center justify-between">
                            <p
                                className={`text-sm mt-1 leading-relaxed break-words ${value.status === "read"
                                    ? "text-gray-300"
                                    : "text-white font-semibold"
                                    }`}
                            >
                                {value.content.length > 20
                                    ? value.content.slice(0, 20) + "..."
                                    : value.content}
                            </p>

                            <span
                                className={
                                    value.status === "read"
                                        ? "text-green-500"
                                        : value.status === "delivered"
                                            ? "text-gray-400"
                                            : "text-gray-500"
                                }
                            >
                                {value.status === "read" || value.status === "delivered" ? (
                                    <CheckCheck size={15} />
                                ) : (
                                    <Check size={15} />
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    )
}