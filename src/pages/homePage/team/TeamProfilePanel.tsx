import { X, Users } from "lucide-react"
import { dummyTeams, dummyTeamMembers, TeamMember } from "../../../utils/dummyTeams"
import dayjs from "dayjs"

interface TeamProfilePanelProps {
    teamId: string // ✅ null இல்ல — Chats.tsx-ல null check பண்ணிட்டோம்
    onClose: () => void
    onSelectMember: (member: TeamMember) => void
}

export default function TeamProfilePanel({
    teamId,
    onClose,
    onSelectMember,
}: TeamProfilePanelProps) {

    const team = dummyTeams.find((t) => t.id === teamId)
    const members = dummyTeamMembers.filter((m) => m.teamId === teamId)

    if (!team) return null

    return (
        <section className="flex flex-col w-full h-full bg-[#0f1729] border-l border-gray-700">

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
                <p className="text-white font-semibold text-base">Team Info</p>
                <button
                    onClick={onClose}
                    className="p-1.5 rounded-md hover:bg-gray-800 transition"
                >
                    <X size={18} className="text-gray-400 hover:text-white" />
                </button>
            </div>

            {/* Team Avatar */}
            <div className="flex flex-col items-center gap-3 py-6 border-b border-gray-800 px-5">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                    {team.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-center">
                    <p className="text-white font-semibold text-lg">{team.name}</p>
                    <p className="text-[#8A8A8A] text-xs mt-1">{team.description}</p>
                </div>

                {/* Stats */}
                <div className="flex gap-4 mt-2">
                    <div className="flex flex-col items-center">
                        <p className="text-white font-semibold text-lg">{team.memberCount}</p>
                        <p className="text-[#8A8A8A] text-xs">Members</p>
                    </div>
                    <div className="w-px bg-gray-700" />
                    <div className="flex flex-col items-center">
                        <p className={`font-semibold text-lg ${team.isActive ? "text-green-400" : "text-red-400"}`}>
                            {team.isActive ? "Active" : "Inactive"}
                        </p>
                        <p className="text-[#8A8A8A] text-xs">Status</p>
                    </div>
                    <div className="w-px bg-gray-700" />
                    <div className="flex flex-col items-center">
                        <p className="text-white font-semibold text-lg">
                            {dayjs(team.createdAt).format("MMM YY")}
                        </p>
                        <p className="text-[#8A8A8A] text-xs">Created</p>
                    </div>
                </div>
            </div>

            {/* Members */}
            <div className="flex flex-col flex-1 overflow-y-auto">
                <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-800">
                    <Users size={14} className="text-[#4F6EF7]" />
                    <p className="text-[#8A8A8A] text-xs uppercase tracking-wider">
                        Members ({members.length})
                    </p>
                </div>

                <div className="flex flex-col gap-1 p-3">
                    {members.map((member) => (
                        <div
                            key={`${member.id}-${member.teamId}`}
                            onClick={() => onSelectMember(member)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#1a2a4a] cursor-pointer transition-all"
                        >
                            <div className="relative flex-shrink-0">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                                    {member.name.charAt(0).toUpperCase()}
                                </div>
                                <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#0f1729] ${member.isOnline ? "bg-green-500" : "bg-gray-500"
                                    }`} />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <p className="text-white text-sm font-medium truncate">{member.name}</p>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full flex-shrink-0 ml-1 ${member.teamRole === "Admin"
                                            ? "bg-[#4F6EF7]/20 text-[#4F6EF7]"
                                            : member.teamRole === "Guest"
                                                ? "bg-amber-500/20 text-amber-400"
                                                : "bg-gray-700 text-gray-400"
                                        }`}>
                                        {member.teamRole}
                                    </span>
                                </div>
                                <p className="text-[#8A8A8A] text-xs truncate">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    )
}