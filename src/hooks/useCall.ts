import { useCallback, useRef } from "react"
import Peer, { MediaConnection } from "peerjs"
import { useAppDispatch, useAppSelector } from "./useAppDispatch"
import { acceptCall, endCall } from "../store/slices/callSlice"

export const useCall = () => {
    const dispatch = useAppDispatch()
    const callState = useAppSelector((state) => state.call)
    const currentUser = useAppSelector((state) => state.auth.currentUser)

    const peerRef = useRef<Peer | null>(null)
    const callRef = useRef<MediaConnection | null>(null)
    const localStreamRef = useRef<MediaStream | null>(null)
    const localVideoRef = useRef<HTMLVideoElement | null>(null)
    const remoteVideoRef = useRef<HTMLVideoElement | null>(null)
    const isConnectedRef = useRef(false)

    const getLocalStream = useCallback(async (video = true) => {
        const stream = await navigator.mediaDevices.getUserMedia({
            video,
            audio: true,
        })
        localStreamRef.current = stream
        if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream
        }
        return stream
    }, [])

    const startScreenShare = useCallback(async () => {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
        })
        if (localVideoRef.current) {
            localVideoRef.current.srcObject = screenStream
        }
        return screenStream
    }, [])

    const initiateCall = useCallback(async (
        peerId: string,
        callType: "video" | "audio"
    ) => {
        try {
            const stream = await getLocalStream(callType === "video")
            const myPeerId = `${currentUser?.id}_${Date.now()}`
            const peer = new Peer(myPeerId, {
                debug: 2,
            })
            peerRef.current = peer
            isConnectedRef.current = false

            peer.on("open", (id) => {
                console.log("My peer ID:", id)

                const call = peer.call(peerId, stream)
                callRef.current = call

                call.on("stream", (remoteStream) => {
                    console.log("Remote stream received ✅")
                    isConnectedRef.current = true
                    if (remoteVideoRef.current) {
                        remoteVideoRef.current.srcObject = remoteStream
                    }
                    dispatch(acceptCall())
                })
                call.on("close", () => {
                    console.log("Call closed")
                    if (isConnectedRef.current) {
                        dispatch(endCall())
                    }
                })

                call.on("error", (err) => {
                    console.error("Call error:", err)
                })
            })

            peer.on("error", (err) => {
                console.error("Peer error:", err.type, err)

                if (err.type !== "peer-unavailable") {
                    dispatch(endCall())
                }
            })

        } catch (err) {
            console.error("initiateCall error:", err)
        }
    }, [currentUser])

    const answerCall = useCallback(async (
        callType: "video" | "audio"
    ) => {
        try {
            const stream = await getLocalStream(callType === "video")

            const myPeerId = `${currentUser?.id}_${Date.now()}`
            const peer = new Peer(myPeerId, {
                debug: 2,
            })
            peerRef.current = peer
            isConnectedRef.current = false

            peer.on("open", () => {
                peer.on("call", (call) => {
                    callRef.current = call
                    call.answer(stream)

                    call.on("stream", (remoteStream) => {
                        isConnectedRef.current = true
                        if (remoteVideoRef.current) {
                            remoteVideoRef.current.srcObject = remoteStream
                        }
                        dispatch(acceptCall())
                    })

                    call.on("close", () => {
                        if (isConnectedRef.current) {
                            dispatch(endCall())
                        }
                    })
                })
            })

            peer.on("error", (err) => {
                console.error("Peer error:", err)
                if (err.type !== "peer-unavailable") {
                    dispatch(endCall())
                }
            })

        } catch (err) {
            console.error("answerCall error:", err)
        }
    }, [currentUser])

    const hangUp = useCallback(() => {
        isConnectedRef.current = false
        callRef.current?.close()
        peerRef.current?.destroy()
        localStreamRef.current?.getTracks().forEach((t) => t.stop())

        if (localVideoRef.current) localVideoRef.current.srcObject = null
        if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null

        callRef.current = null
        peerRef.current = null
        localStreamRef.current = null

        dispatch(endCall())
    }, [])

    const toggleMuteTrack = useCallback(() => {
        localStreamRef.current?.getAudioTracks().forEach((track) => {
            track.enabled = !track.enabled
        })
    }, [])

    const toggleVideoTrack = useCallback(() => {
        localStreamRef.current?.getVideoTracks().forEach((track) => {
            track.enabled = !track.enabled
        })
    }, [])

    return {
        localVideoRef,
        remoteVideoRef,
        initiateCall,
        answerCall,
        hangUp,
        toggleMuteTrack,
        toggleVideoTrack,
        startScreenShare,
    }
}
