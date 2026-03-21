import { Edit } from "lucide-react";
import ChatShower from "../../components/chatshower/ChatShower";
import ChatWindow from "./ChatWindow";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { useEffect, useState } from "react";
import { setMessage } from "../../store/slices/messageSlices";
import { setTeamMessages } from "../../store/slices/teamSlice"; // ✅ add
import messages from "../../utils/dummyData";
import { dummyTeamMessages, dummyTeams, TeamMember } from "../../utils/dummyTeams";
import ProfilePanel from "./ProfilePanel";
import TeamChat from "./team/TeamChat";
import TeamChatShower from "./team/TeamChatShower";
import TeamProfilePanel from "./team/TeamProfilePanel";
import MemberProfilePanel from "./team/MemberProfilePanel";

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

    // ✅ Redux-லிருந்து எடு
    const directMessages = useAppSelector((state) => state.messages.messages);
    const teamMessages = useAppSelector((state) => state.team.messages); // ✅

    const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [selectedOption, setSelectedOption] = useState<string>("Direct");
    const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
    const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

    // ✅ Page load-ல both load பண்ணு
    useEffect(() => {
        dispatch(setMessage(messages))
        dispatch(setTeamMessages(dummyTeamMessages)) // ✅
    }, [])

    // ✅ Direct — latest per sender
    const latestMessages = Object.values(
        directMessages.reduce((acc, msg) => {
            const key = msg.senderId;
            if (
                !acc[key] ||
                new Date(msg.createdAt).getTime() > new Date(acc[key].createdAt).getTime()
            ) {
                acc[key] = msg;
            }
            return acc;
        }, {} as Record<string, (typeof directMessages)[0]>)
    ).sort(
        (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // ✅ Teams — latest per team — Redux-லிருந்து
    const latestTeamMessages = Object.values(
        teamMessages.reduce((acc, msg) => {
            const key = msg.teamId;
            if (
                !acc[key] ||
                new Date(msg.createdAt).getTime() > new Date(acc[key].createdAt).getTime()
            ) {
                acc[key] = msg;
            }
            return acc;
        }, {} as Record<string, (typeof teamMessages)[0]>)
    ).sort(
        (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // ✅ Selected team messages — Redux-லிருந்து filter
    const selectedTeamMessage = teamMessages.filter(
        (msg) => msg.teamId === selectedTeamId
    );

    return (
        <main className="flex w-full h-screen overflow-hidden">

            {/* Sidebar */}
            <section className="hidden md:flex flex-col w-[280px] min-w-[260px] bg-[#0f1729] border-r border-gray-700 h-full">

                <div className="flex items-center justify-between border-b border-gray-700 px-4 py-3">
                    <p className="text-white font-semibold text-base">Messages</p>
                    <Edit size={18} className="text-gray-400 cursor-pointer hover:text-white transition" />
                </div>

                <div className="flex gap-1 p-2 border-b border-gray-700">
                    {options.map((value) => (
                        <button
                            key={value.id}
                            onClick={() => {
                                setSelectedOption(value.label);
                                setSelectedRoomId(null);
                                setSelectedUserId(null);
                                setSelectedTeamId(null);
                                setIsProfileOpen(false);
                                setSelectedMember(null);
                            }}
                            className={`flex-1 text-sm px-2 py-1.5 rounded-md transition ${selectedOption === value.label
                                    ? "bg-[#4F6EF7] text-white"
                                    : "text-gray-400 hover:text-white hover:bg-[#1a2a4a]"
                                }`}
                        >
                            {value.label}
                        </button>
                    ))}
                </div>

                <div className="flex-1 overflow-y-auto p-2">
                    {selectedOption === "Teams" ? (
                        <TeamChatShower
                            teams={dummyTeams}
                            latestMessages={latestTeamMessages} // ✅ Redux data
                            selectedTeamId={selectedTeamId}
                            onSelectTeam={(teamId) => {
                                setSelectedTeamId(teamId);
                                setSelectedRoomId(null);
                                setSelectedUserId(null);
                                setIsProfileOpen(false);
                                setSelectedMember(null);
                            }}
                        />
                    ) : selectedOption === "Direct" ? (
                        <ChatShower
                            message={latestMessages}
                            onSelectRoom={(roomId, userId) => {
                                setSelectedUserId(userId);
                                setSelectedRoomId(roomId);
                                setIsProfileOpen(false);
                            }}
                        />
                    ) : (
                        <div className="flex items-center justify-center mt-10">
                            <p className="text-[#3D3D3D] text-sm">No external chats</p>
                        </div>
                    )}
                </div>

            </section>

            {/* Chat Area */}
            <section className="flex flex-col flex-1 bg-[#0A0A0A] min-w-0 h-full">
                {selectedOption === "Teams" && selectedTeamId ? (
                    <TeamChat
                        teamId={selectedTeamId}
                        messages={selectedTeamMessage} // ✅ Redux data
                        onOpenProfile={() => setIsProfileOpen(true)}
                    />
                ) : selectedOption === "Direct" && selectedRoomId && selectedUserId ? (
                    <ChatWindow
                        roomId={selectedRoomId}
                        userId={selectedUserId}
                        onOpenProfile={() => setIsProfileOpen(true)}
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center h-full gap-2">
                        <p className="text-[#3D3D3D] text-sm">
                            {selectedOption === "Teams" ? "Select a team" : "Select a conversation"}
                        </p>
                        <p className="text-[#3D3D3D] text-xs">to start messaging</p>
                    </div>
                )}
            </section>

            {/* Profile Panel */}
            {isProfileOpen && (
                <section className="hidden lg:flex flex-col w-[300px] min-w-[280px] bg-[#0f1729] border-l border-gray-700 h-full">
                    {selectedMember ? (
                        <MemberProfilePanel
                            member={selectedMember}
                            onClose={() => {
                                setIsProfileOpen(false)
                                setSelectedMember(null)
                            }}
                            onBack={() => setSelectedMember(null)}
                        />
                    ) : selectedOption === "Teams" && selectedTeamId ? (
                        <TeamProfilePanel
                            teamId={selectedTeamId}
                            onClose={() => setIsProfileOpen(false)}
                            onSelectMember={(member) => setSelectedMember(member)}
                        />
                    ) : selectedOption === "Direct" && selectedUserId ? (
                        <ProfilePanel
                            userId={selectedUserId}
                            onClose={() => setIsProfileOpen(false)}
                        />
                    ) : null}
                </section>
            )}

        </main>
    );
}