import { Client } from "@stomp/stompjs"

let stompClient: Client | null = null

export const getStompClient = (): Client => {
    if (!stompClient) {
        stompClient = new Client({
            brokerURL: "ws://localhost:8080/ws",
            reconnectDelay: 5000,
            onConnect: () => console.log("WebSocket Connected ✅"),
            onDisconnect: () => console.log("WebSocket Disconnected ❌"),
            onStompError: (frame) => console.error("STOMP Error:", frame),
        })
    }
    return stompClient
}