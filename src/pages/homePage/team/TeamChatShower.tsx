import dayjs from "dayjs"
import { Team, TeamMessage } from "../../../utils/dummyTeams"
import { Video, Phone, PhoneMissed } from "lucide-react"

interface TeamShowerProps {
    teams: Team[]
    latestMessages: TeamMessage[]
    selectedTeamId: string | null
    onSelectTeam: (teamId: string) => void
}

export default function TeamShower({
    teams,
    latestMessages,
    selectedTeamId,
    onSelectTeam,
}: TeamShowerProps) {


    const getMessagePreview = (msg: TeamMessage): string => {
        if (msg.type === "call") {
            if (msg.callStatus === "missed") {
                return `Missed ${msg.callType === "video" ? "video" : "voice"} call`
            }
            return msg.content 
        }
        const preview = msg.content.length > 22
            ? msg.content.slice(0, 22) + "..."
            : msg.content
        return `${msg.senderName}: ${preview}`
    }


    const getCallIcon = (msg: TeamMessage) => {
        if (msg.type !== "call") return null
        if (msg.callStatus === "missed") {
            return <PhoneMissed size={11} className="text-red-400 flex-shrink-0" />
        }
        if (msg.callType === "video") {
            return <Video size={11} className="text-[#4F6EF7] flex-shrink-0" />
        }
        return <Phone size={11} className="text-[#4F6EF7] flex-shrink-0" />
    }

    return (
        <section className="w-full flex flex-col gap-1">
            {teams.map((team) => {
                const latestMsg = latestMessages.find(
                    (msg) => msg.teamId === team.id
                )
                const isSelected = selectedTeamId === team.id

                return (
                    <div
                        key={team.id}
                        onClick={() => onSelectTeam(team.id)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all ${isSelected
                                ? "bg-[#4F6EF7]/20 border border-[#4F6EF7]/40"
                                : "hover:bg-[#1a2a4a] border border-transparent"
                            }`}
                    >
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                                {team.name.charAt(0).toUpperCase()}
                            </div>
                            {team.isActive && (
                                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0f1729]" />
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                                <p className="text-white text-sm font-semibold truncate">
                                    {team.name}
                                </p>
                                {latestMsg && (
                                    <p className="text-[#8A8A8A] text-[10px] flex-shrink-0 ml-2">
                                        {dayjs(latestMsg.createdAt).format("hh:mm A")}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center justify-between gap-1">
                                <div className="flex items-center gap-1 min-w-0">
                                    {/* ✅ Call icon */}
                                    {latestMsg && getCallIcon(latestMsg)}
                                    <p className={`text-xs truncate ${latestMsg?.type === "call" && latestMsg.callStatus === "missed"
                                            ? "text-red-400"
                                            : "text-[#8A8A8A]"
                                        }`}>
                                        {latestMsg
                                            ? getMessagePreview(latestMsg)
                                            : team.description}
                                    </p>
                                </div>
                                <span className="text-[#3D3D3D] text-[10px] flex-shrink-0 ml-1">
                                    {team.memberCount}
                                </span>
                            </div>
                        </div>

                    </div>
                )
            })}
        </section>
    )
}
