import { Message } from "../types/message";

const messages: Message[] = [

    // ── Ravi with Arun ──
    {
        id: "msg_001",
        senderId: "user_002",
        senderName: "Ravi",
        receiverId: "user_001",
        receiverName: "Arun",
        roomId: "room_001",
        content: "Hey! Nexora ready-ஆ?",
        type: "text",
        status: "read",
        createdAt: "2026-03-18T10:00:00.000Z",
        isOnline: true
    },
    {
        id: "msg_002",
        senderId: "user_002",
        senderName: "Ravi",
        receiverId: "user_001",
        receiverName: "Arun",
        roomId: "room_001",
        content: "WebSocket setup பண்றோம் 🚀",
        type: "text",
        status: "read",
        createdAt: "2026-03-18T10:05:00.000Z",
        isOnline: true
    },
    {
        id: "msg_003",
        senderId: "user_002",
        senderName: "Ravi",
        receiverId: "user_001",
        receiverName: "Arun",
        roomId: "room_001",
        content: "Files share feature கூட add பண்ணோம்",
        type: "text",
        status: "delivered",
        createdAt: "2026-03-18T10:10:00.000Z", // ← latest
        isOnline: true
    }, {
        id: "msg_013",
        senderId: "user_001",
        senderName: "Arun",
        receiverId: "user_002",
        receiverName: "Ravi",
        roomId: "room_001",
        content: "Almost ready da 😎",
        type: "text",
        status: "read",
        createdAt: "2026-03-18T10:02:00.000Z",
        isOnline: true
    },
    {
        id: "msg_014",
        senderId: "user_001",
        senderName: "Arun",
        receiverId: "user_002",
        receiverName: "Ravi",
        roomId: "room_001",
        content: "WebSocket done, testing now",
        type: "text",
        status: "delivered",
        createdAt: "2026-03-18T10:07:00.000Z",
        isOnline: true
    },

    // ── Kumar with Arun ──
    {
        id: "msg_004",
        senderId: "user_003",
        senderName: "Kumar",
        receiverId: "user_001",
        receiverName: "Arun",
        roomId: "room_002",
        content: "Design review meeting இருக்கா?",
        type: "text",
        status: "read",
        createdAt: "2026-03-18T09:00:00.000Z",
        isOnline: true
    },
    {
        id: "msg_005",
        senderId: "user_003",
        senderName: "Kumar",
        receiverId: "user_001",
        receiverName: "Arun",
        roomId: "room_002",
        content: "3pm-க்கு confirm பண்ணுங்க",
        type: "text",
        status: "read",
        createdAt: "2026-03-18T09:10:00.000Z",
        isOnline: true
    },
    {
        id: "msg_006",
        senderId: "user_003",
        senderName: "Kumar",
        receiverId: "user_001",
        receiverName: "Arun",
        roomId: "room_002",
        content: "Figma file share பண்றேன்",
        type: "text",
        status: "delivered",
        createdAt: "2026-03-18T09:20:00.000Z", // ← latest
        isOnline: true
    },
    {
        id: "msg_015",
        senderId: "user_001",
        senderName: "Arun",
        receiverId: "user_003",
        receiverName: "Kumar",
        roomId: "room_002",
        content: "Yes bro, 3pm okay 👍",
        type: "text",
        status: "read",
        createdAt: "2026-03-18T09:12:00.000Z",
        isOnline: true
    },
    {
        id: "msg_016",
        senderId: "user_001",
        senderName: "Arun",
        receiverId: "user_003",
        receiverName: "Kumar",
        roomId: "room_002",
        content: "Send pannunga, check panren",
        type: "text",
        status: "delivered",
        createdAt: "2026-03-18T09:25:00.000Z",
        isOnline: true
    },

    // ── Priya with Arun ──
    {
        id: "msg_007",
        senderId: "user_004",
        senderName: "Priya",
        receiverId: "user_001",
        receiverName: "Arun",
        roomId: "room_003",
        content: "Spring Boot setup ஆச்சா?",
        type: "text",
        status: "read",
        createdAt: "2026-03-18T08:00:00.000Z",
        isOnline: false
    },
    {
        id: "msg_008",
        senderId: "user_004",
        senderName: "Priya",
        receiverId: "user_001",
        receiverName: "Arun",
        roomId: "room_003",
        content: "JWT auth integrate பண்ணோம்",
        type: "text",
        status: "read",
        createdAt: "2026-03-18T08:15:00.000Z",
        isOnline: false
    },
    {
        id: "msg_009",
        senderId: "user_004",
        senderName: "Priya",
        receiverId: "user_001",
        receiverName: "Arun",
        roomId: "room_003",
        content: "API testing பண்ணலாம் நாளைக்கு",
        type: "text",
        status: "sent",
        createdAt: "2026-03-18T08:30:00.000Z",
        isOnline: false
    },
    {
        id: "msg_017",
        senderId: "user_001",
        senderName: "Arun",
        receiverId: "user_004",
        receiverName: "Priya",
        roomId: "room_003",
        content: "Setup almost done 👍",
        type: "text",
        status: "read",
        createdAt: "2026-03-18T08:10:00.000Z",
        isOnline: false
    },
    {
        id: "msg_018",
        senderId: "user_001",
        senderName: "Arun",
        receiverId: "user_004",
        receiverName: "Priya",
        roomId: "room_003",
        content: "Tomorrow test pannalaam",
        type: "text",
        status: "sent",
        createdAt: "2026-03-18T08:35:00.000Z",
        isOnline: false
    },

    // ── Vikram with Arun ──
    {
        id: "msg_010",
        senderId: "user_005",
        senderName: "Vikram",
        receiverId: "user_001",
        receiverName: "Arun",
        roomId: "room_004",
        content: "Video call feature எப்போ?",
        type: "text",
        status: "read",
        createdAt: "2026-03-18T07:00:00.000Z",
        isOnline: false
    },
    {
        id: "msg_011",
        senderId: "user_005",
        senderName: "Vikram",
        receiverId: "user_001",
        receiverName: "Arun",
        roomId: "room_004",
        content: "WebRTC docs பாத்தேன் 👍",
        type: "text",
        status: "read",
        createdAt: "2026-03-18T07:10:00.000Z",
        isOnline: false
    },
    {
        id: "msg_012",
        senderId: "user_005",
        senderName: "Vikram",
        receiverId: "user_001",
        receiverName: "Arun",
        roomId: "room_004",
        content: "Coturn server setup பண்ணணும்",
        type: "text",
        status: "sent",
        createdAt: "2026-03-18T07:20:00.000Z", // ← latest
        isOnline: false
    },
    {
        id: "msg_019",
        senderId: "user_001",
        senderName: "Arun",
        receiverId: "user_005",
        receiverName: "Vikram",
        roomId: "room_004",
        content: "Working on WebRTC bro 🔥",
        type: "text",
        status: "read",
        createdAt: "2026-03-18T07:05:00.000Z",
        isOnline: false
    },
    {
        id: "msg_020",
        senderId: "user_001",
        senderName: "Arun",
        receiverId: "user_005",
        receiverName: "Vikram",
        roomId: "room_004",
        content: "Coturn next task 👍",
        type: "text",
        status: "sent",
        createdAt: "2026-03-18T07:25:00.000Z",
        isOnline: false
    }

]

export default messages;
