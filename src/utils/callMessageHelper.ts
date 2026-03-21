import { v4 as uuidv4 } from "uuid"
import dayjs from "dayjs"
import { Message } from "../types/message"

export const formatCallDuration = (seconds: number): string => {
    if (seconds === 0) return "0:00"
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
    return `${m}:${s.toString().padStart(2, "0")}`
}

export const createCallMessage = (
    senderId: string,
    senderName: string,
    receiverId: string,
    receiverName: string,
    roomId: string,
    callType: "video" | "audio",
    callStatus: "ended" | "missed" | "rejected",
    callDuration: number
): Message => ({
    id: uuidv4(),
    senderId,
    senderName,
    receiverId,
    receiverName,
    roomId,
    content: callStatus === "ended"
        ? `${callType === "video" ? "Video" : "Voice"} call · ${formatCallDuration(callDuration)}`
        : callStatus === "missed"
            ? `Missed ${callType === "video" ? "video" : "voice"} call`
            : `${callType === "video" ? "Video" : "Voice"} call declined`,
    type: "call",
    callType,
    callStatus,
    callDuration,
    status: "read",
    createdAt: dayjs().toISOString(),
})