import { MessageSquare, Phone, Folder } from 'lucide-react'
import logo from '../../../public/svg-icon/nexora_icon_3d.svg'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const sideBarOption = [
    {
        id: 1,
        label: "Chat",
        icon: <MessageSquare size={20} />,
        navigatePath: "chats"
    },
    {
        id: 2,
        label: "Calls",
        icon: <Phone size={20} />,
        navigatePath: "calls"
    },
    {
        id: 3,
        label: "Files",
        icon: <Folder size={20} />,
        navigatePath: "files"
    },
]

export default function SideBar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <main
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className={`h-screen bg-[#020617] border-r border-gray-800 flex flex-col py-4 gap-6 transition-all duration-300 ${isOpen ? "w-48 px-3" : "w-20 items-center"
                }`}
        >
            <section className="flex justify-center">
                <img src={logo} className=' object-contain' alt='logo' height={12} width={70}/>
            </section>
            <section className="flex flex-col gap-3">
                {sideBarOption.map((value) => (
                    <div
                        key={value.id}
                        onClick={() => navigate(value.navigatePath)}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-[#1e293b] transition`}
                    >
                        <span className="text-gray-400">
                            {value.icon}
                        </span>
                        {isOpen && (
                            <span className="text-gray-300 text-sm whitespace-nowrap">
                                {value.label}
                            </span>
                        )}
                    </div>
                ))}
            </section>

        </main>
    )
}