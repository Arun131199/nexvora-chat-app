import { Mail, Phone, Video } from "lucide-react";
import CustomButton from "../CustomButton";
import { CallsCardProps } from "../../types/CallsCardProps";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useCall } from "../../hooks/useCall";
import { startCall } from "../../store/slices/callSlice";



export default function CallsCard({ data }: { data: CallsCardProps }) {
    const dispatch = useAppDispatch();
    const { initiateCall } = useCall();

    const handleCallAgain = () => {
        dispatch(startCall({
            callType: data.callType,
            roomId: data.roomId,
            peerId: data.peerId ?? data.id,
            peerName: data.recevierName,
            isInitiator: true
        }))

        initiateCall(data.peerId ?? data.id, data.callType)
    }
    return (
        <main className="border border-gray-700 rounded-xl p-4 bg-[#0f0f0f] hover:border-[#8440fd] transition-all duration-300 shadow-md hover:shadow-lg">
            <section className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="bg-blue-400 text-white font-semibold rounded-full h-12 w-12 flex items-center justify-center text-lg">
                            {data.senderName.slice(0, 1).toUpperCase()}
                        </div>
                        <span
                            className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-black ${data.isOnline ? "bg-green-500" : "bg-red-500"
                                }`}
                        />
                    </div>
                    <div>
                        <p className="text-white font-semibold text-lg">
                            {data.senderName}
                        </p>
                        <p className="text-gray-400 text-sm">
                            with {data.recevierName || "Unknown"}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#1f1f1f] border border-gray-600">
                    {data.callType === "video" ? (
                        <Video size={16} className="text-[#8440fd]" />
                    ) : (
                        <Phone size={16} className="text-[#8440fd]" />
                    )}
                    <span className="text-sm text-gray-300 capitalize">
                        {data.callType}
                    </span>
                </div>
            </section>

            <section className="mt-3">
                <p className="text-gray-400 text-sm">{data.time}</p>
            </section>

            <section className="flex items-center gap-3 mt-4 flex-wrap">
                <CustomButton
                    label="Message"
                    icon={<Mail size={16} />}
                />
                <CustomButton
                    label="Call Again"
                    variant="secondary"
                    icon={
                        data.callType === "video" ? (
                            <Video size={16} />
                        ) : (
                            <Phone size={16} />
                        )
                    }
                    onClick={handleCallAgain}
                />
            </section>
        </main>
    );
}