export interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    roomId: string;
    type: "text" | "image" | "file";
    content: string;
    status: "sent" | "delivered" | "read";
    createdAt: string;
    senderName: string;
    senderAvatar?: string;
    receiverName: string;
    isOnline: boolean;
    callType?: "video" | "audio";
    callStatus?: "missed" | "ended" | "rejected";
    callDuration?: number;
}