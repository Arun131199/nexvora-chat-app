import { X, Mail, Briefcase, Building2, Calendar, Shield } from "lucide-react"

import dayjs from "dayjs"
import { TeamMember } from "../../../utils/dummyTeams"

interface MemberProfilePanelProps {
    member: TeamMember
    onClose: () => void
    onBack: () => void
}

export default function MemberProfilePanel({
    member,
    onClose,
    onBack,
}: MemberProfilePanelProps) {

    return (
        <section className="flex flex-col w-full h-full bg-[#0f1729] border-l border-gray-700">

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
                <div className="flex items-center gap-2">
                    {/* Back button */}
                    <button
                        onClick={onBack}
                        className="text-[#4F6EF7] text-xs hover:underline"
                    >
                        ← Team
                    </button>
                </div>
                <button
                    onClick={onClose}
                    className="p-1.5 rounded-md hover:bg-gray-800 transition"
                >
                    <X size={18} className="text-gray-400 hover:text-white" />
                </button>
            </div>

            {/* Avatar */}
            <div className="flex flex-col items-center gap-4 py-8 border-b border-gray-800">
                <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                        {member.name.charAt(0).toUpperCase()}
                    </div>
                    <span className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-[#0f1729] ${member.isOnline ? "bg-green-500" : "bg-gray-500"
                        }`} />
                </div>

                <div className="text-center">
                    <p className="text-white font-semibold text-lg">{member.name}</p>
                    {/* Team Role */}
                    <span className={`text-xs px-3 py-1 rounded-full mt-1 inline-block ${member.teamRole === "Admin"
                            ? "bg-[#4F6EF7]/20 text-[#4F6EF7]"
                            : "bg-gray-700 text-gray-400"
                        }`}>
                        {member.teamRole}
                    </span>
                    <p className="text-xs text-gray-400 mt-2">
                        {member.isOnline ? "Active now" : "Offline"}
                    </p>
                </div>
            </div>

            {/* Details */}
            <div className="flex flex-col gap-5 px-5 py-6 text-sm">
                <div className="flex items-start gap-3">
                    <Mail size={18} className="text-indigo-400 mt-1" />
                    <div>
                        <p className="text-gray-400 text-xs uppercase">Email</p>
                        <p className="text-white break-all">{member.email}</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <Briefcase size={18} className="text-indigo-400 mt-1" />
                    <div>
                        <p className="text-gray-400 text-xs uppercase">Role</p>
                        <p className="text-white">{member.role}</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <Building2 size={18} className="text-indigo-400 mt-1" />
                    <div>
                        <p className="text-gray-400 text-xs uppercase">Department</p>
                        <p className="text-white">{member.department}</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <Shield size={18} className="text-indigo-400 mt-1" />
                    <div>
                        <p className="text-gray-400 text-xs uppercase">Team Role</p>
                        <p className="text-white">{member.teamRole}</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <Calendar size={18} className="text-indigo-400 mt-1" />
                    <div>
                        <p className="text-gray-400 text-xs uppercase">Joined</p>
                        <p className="text-white">
                            {dayjs(member.joinedAt).format("MMM DD, YYYY")}
                        </p>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="mt-auto p-5 border-t border-gray-800 flex flex-col gap-3">
                <button className="w-full bg-[#4F6EF7] hover:bg-[#6B85FF] text-white text-sm font-medium py-2.5 rounded-lg transition-all">
                    Send Message
                </button>
                <button className="w-full bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#4F6EF7] text-[#8A8A8A] hover:text-white text-sm font-medium py-2.5 rounded-lg transition-all">
                    Start Video Call
                </button>
            </div>

        </section>
    )
}