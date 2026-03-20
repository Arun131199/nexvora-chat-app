import { X, Mail, Briefcase, Building2, Calendar, Phone, Video } from "lucide-react"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { closeProfile } from "../../store/slices/profileSlice"
import dummyUsers from "../../utils/dummyUsers"
import dayjs from "dayjs"
import CustomButton from "../../components/CustomButton"

interface ProfilePanelProps {
    userId: string;
    onClose: () => void;
}

export default function ProfilePanel({ userId, }: ProfilePanelProps) {
    const dispatch = useAppDispatch()
    const user = dummyUsers.find((u) => u.id === userId)

    if (!user) return null

    return (
        <section className="flex flex-col w-full h-full bg-[#0f1729]/95 backdrop-blur-xl border-l border-gray-700">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800 sticky top-0 bg-[#0f1729]/90 backdrop-blur-md z-10">
                <p className="text-white font-semibold text-base">Profile</p>
                {/* <button
                    onClick={() => dispatch(closeProfile())}
                    className="p-1.5 rounded-md hover:bg-gray-800 transition"
                >
                    <X size={18} className="text-gray-400 hover:text-white" />
                </button> */}
            </div>

            <div className="flex flex-col items-center gap-4 py-8 border-b border-gray-800">
                <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span
                        className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-[#0f1729] ${user.isOnline ? "bg-green-500" : "bg-gray-500"
                            }`}
                    />
                </div>

                <div className="text-center">
                    <p className="text-white font-semibold text-lg">{user.name}</p>
                    <p className="text-xs text-gray-400 mt-1">
                        {user.isOnline ? "Active now" : "Offline"}
                    </p>
                </div>

                <div className="flex gap-3 mt-2">
                   
                    <button className="p-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition">
                        <Phone size={18} className="text-gray-300" />
                    </button>
                    <button className="p-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition">
                        <Video size={18} className="text-gray-300" />
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-5 px-5 py-6 text-sm">
                <div className="flex items-start gap-3">
                    <Mail size={18} className="text-indigo-400 mt-1" />
                    <div>
                        <p className="text-gray-400 text-xs uppercase">Email</p>
                        <p className="text-white break-all">{user.email}</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <Briefcase size={18} className="text-indigo-400 mt-1" />
                    <div>
                        <p className="text-gray-400 text-xs uppercase">Role</p>
                        <p className="text-white">{user.role}</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <Building2 size={18} className="text-indigo-400 mt-1" />
                    <div>
                        <p className="text-gray-400 text-xs uppercase">Department</p>
                        <p className="text-white">{user.department}</p>
                    </div>
                </div>

                {/* Joined */}
                <div className="flex items-start gap-3">
                    <Calendar size={18} className="text-indigo-400 mt-1" />
                    <div>
                        <p className="text-gray-400 text-xs uppercase">Joined</p>
                        <p className="text-white">
                            {dayjs(user.joinedAt).format("MMM DD, YYYY")}
                        </p>
                    </div>
                </div>
            </div>

        </section>
    )
}