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

  // ✅ Local stream get பண்ணு
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

  // ✅ Screen share
  const startScreenShare = useCallback(async () => {
    const screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    })
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = screenStream
    }
    return screenStream
  }, [])

  // ✅ Call initiate — PeerJS
  const initiateCall = useCallback(async (
    peerId: string,
    callType: "video" | "audio"
  ) => {
    const stream = await getLocalStream(callType === "video")

    // PeerJS peer create பண்ணு
    const peer = new Peer(currentUser?.id ?? Math.random().toString(36))
    peerRef.current = peer

    peer.on("open", () => {
      // Remote peer-ஐ call பண்ணு
      const call = peer.call(peerId, stream)
      callRef.current = call

      call.on("stream", (remoteStream) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream
        }
        dispatch(acceptCall())
      })

      call.on("close", () => dispatch(endCall()))
      call.on("error", () => dispatch(endCall()))
    })

    peer.on("error", (err) => {
      console.error("PeerJS error:", err)
      dispatch(endCall())
    })
  }, [currentUser])

  // ✅ Answer call
  const answerCall = useCallback(async (
    callType: "video" | "audio"
  ) => {
    const stream = await getLocalStream(callType === "video")
    const peer = new Peer(currentUser?.id ?? Math.random().toString(36))
    peerRef.current = peer

    peer.on("call", (call) => {
      callRef.current = call
      call.answer(stream)

      call.on("stream", (remoteStream) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream
        }
        dispatch(acceptCall())
      })

      call.on("close", () => dispatch(endCall()))
    })
  }, [currentUser])

  // ✅ Hang up
  const hangUp = useCallback(() => {
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