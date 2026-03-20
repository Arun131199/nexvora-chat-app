import { useEffect, useRef } from "react"
import { Client } from "@stomp/stompjs"
import { useAppDispatch } from "./useAppDispatch"
import { getStompClient } from "../config/websocket"
import { addMessage } from "../store/slices/messageSlices"
import { Message } from "../types/message"

export const useWebSocket = (roomId: string) => {
    const clientRef = useRef<Client | null>(null)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const client = getStompClient()
        clientRef.current = client
        client.activate()

        client.onConnect = () => {
            client.subscribe(`/topic/room/${roomId}`, (stompMessage) => {
                const message: Message = JSON.parse(stompMessage.body)
                dispatch(addMessage(message))
            })
        }
        return () => {
            void client.deactivate()
        }

    }, [roomId])

    const sendMessage = (message: Message) => {
        if (clientRef.current?.connected) {
            clientRef.current.publish({
                destination: "/app/chat.send",
                body: JSON.stringify(message)
            })
        }
    }

    return { sendMessage }
}