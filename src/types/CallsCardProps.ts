export interface CallsCardProps {
    id: string
    senderName: string
    recevierName: string
    isOnline: boolean
    callType: "video" | "audio"
    callStatus: "missed" | "ended" | "rejected"
    time: string
    createdAt: string  
    peerId: string     
    roomId: string    
}