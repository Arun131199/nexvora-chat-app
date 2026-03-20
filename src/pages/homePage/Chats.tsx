import { Edit } from "lucide-react";
import ChatShower from "../../components/chatshower/ChatShower";
import ChatWindow from "./ChatWindow";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { useEffect, useState } from "react";
import { setMessage, updateStatus } from "../../store/slices/messageSlices";
import messages from "../../utils/dummyData";
import { Message } from "../../types/message";
import ProfilePanel from "./ProfilePanel";
import TeamChat from "./team/TeamChat";
import TeamChatShower from "./team/TeamChatShower";

interface ChatOptions {
    id: number;
    label: string;
}

const options: ChatOptions[] = [
    { id: 1, label: "Direct" },
    { id: 2, label: "Teams" },
    { id: 3, label: "External" },
];

export default function Chats() {
    const dispatch = useAppDispatch();
    const message = useAppSelector((state) => state.messages.messages)
    const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
    const [selectedOption, setSelectedOption] = useState<string | null>("Direct")
    console.log(selectedOption);

    const latestMessages = Object.values(
        messages.reduce((acc, msg) => {
            const key = msg.senderId;
            if (
                !acc[key] ||
                new Date(msg.createdAt) > new Date(acc[key].createdAt)
            ) {
                acc[key] = msg;
            }
            return acc;
        }, {} as Record<string, (typeof messages)[0]>)
    ).sort(
        (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );





    useEffect(() => {
        dispatch(setMessage(messages))
    }, [])
    return (
        <main className="flex w-full h-screen overflow-hidden">
            <section className="hidden md:flex flex-col w-[280px] min-w-[260px] bg-[#0f1729] border-r border-gray-700 h-full">

                <div className="flex items-center justify-between border-b border-gray-700 px-4 py-3">
                    <p className="text-white font-semibold text-base">Messages</p>
                    <Edit size={18} className="text-gray-400 cursor-pointer hover:text-white transition" />
                </div>

                <div className="flex gap-1 p-2 border-b border-gray-700">
                    {options.map((value) => (
                        <button
                            key={value.id}
                            onClick={() => setSelectedOption(value.label)}
                            className="flex-1 text-gray-400 hover:text-white text-sm px-2 py-1.5 rounded-md hover:bg-[#1a2a4a] transition"

                        >
                            {value.label}
                        </button>
                    ))}
                </div>
                {
                    selectedOption === "Teams" ? (
                        <TeamChatShower />
                    ) : selectedOption ? (
                        <div className="flex-1 overflow-y-auto p-2">
                            <ChatShower
                                message={latestMessages}
                                onSelectRoom={(roomId, userId) => {
                                    setSelectedUserId(userId)
                                    setSelectedRoomId(roomId)
                                }}
                            />
                        </div>
                    ) : (
                        <div>
                            <p>Start a conversation</p>
                        </div>
                    )
                }

            </section>
            <section className="flex flex-col flex-1 bg-[#0A0A0A] min-w-0 h-full">

                {selectedOption === "Teams" ? (
                    <div className="flex flex-col h-full">
                        <TeamChat />
                    </div>
                ) : selectedRoomId ? (
                    <div className="flex flex-col h-full">
                        <div className="flex-1 overflow-y-auto">
                            <ChatWindow
                                roomId={selectedRoomId}
                                userId={selectedUserId}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full gap-2">
                        <p className="text-gray-300 text-sm">Select a conversation</p>
                        <p className="text-gray-300 text-xs">to start messaging</p>
                    </div>
                )}

            </section>
            <section className="hidden lg:flex flex-col w-[300px] min-w-[280px] bg-[#0f1729] border-l border-gray-700 h-full">
                <ProfilePanel userId={selectedUserId} />
            </section>
        </main>
    );
}