import { Message } from "../types/message";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";


export const createMessage = (
    senderId: string,
    receiverId: string,
    roomId: string,
    content: string,
    type: Message["type"] = "text",
    senderName: string,
    receiverName: string,
): Message => ({
    id: uuidv4(),
    senderId,
    receiverId,
    roomId,
    type,
    content,
    status: "sent",
    createdAt: dayjs().toISOString(),
    senderName,
    receiverName,
})