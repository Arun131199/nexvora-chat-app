import { Phone, PhoneOff, Video } from "lucide-react"
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch"
import { acceptCall, endCall } from "../../store/slices/callSlice"
import { useCall } from "../../hooks/useCall"

export default function IncomingCall() {
    const dispatch = useAppDispatch()
    const callState = useAppSelector((state) => state.call)
    const { answerCall } = useCall()

    const handleAccept = async () => {
        // Signal data WebSocket-லிருந்து வரும் — இப்போ mock
        dispatch(acceptCall())
    }

    const handleDecline = () => {
        dispatch(endCall())
    }

    if (callState.callStatus !== "ringing") return null

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
            <div className="bg-[#141414] border border-[#202020] rounded-2xl p-8 flex flex-col items-center gap-6 w-80">

                {/* Avatar */}
                <div className="w-20 h-20 rounded-full bg-[#4F6EF7] flex items-center justify-center text-white text-4xl font-bold">
                    {callState.peerName?.charAt(0).toUpperCase()}
                </div>

                <div className="text-center">
                    <p className="text-white font-semibold text-lg">{callState.peerName}</p>
                    <p className="text-[#8A8A8A] text-sm flex items-center justify-center gap-1 mt-1">
                        {callState.callType === "video"
                            ? <><Video size={14} /> Incoming video call</>
                            : <><Phone size={14} /> Incoming audio call</>
                        }
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-8">
                    <button
                        onClick={handleDecline}
                        className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all"
                    >
                        <PhoneOff size={22} className="text-white" />
                    </button>

                    <button
                        onClick={handleAccept}
                        className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-all"
                    >
                        <Phone size={22} className="text-white" />
                    </button>
                </div>

            </div>
        </div>
    )
}