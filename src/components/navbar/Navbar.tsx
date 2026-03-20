import { Bell, Search } from "lucide-react";

interface SearchPorp {
    search: string
}

export default function Navbar() {
    return (
        <main className="w-full border-b border-gray-800 bg-[#0b1220] px-6 py-3 shadow-md">
            <section className="flex items-center justify-between gap-4">

                <div className="flex items-center w-full max-w-md border border-gray-700 rounded-md bg-[#020617] px-3 focus-within:border-blue-500">
                    <Search size={18} className="text-gray-400 mr-2" />
                    <input
                        type="text"
                        placeholder="Search across Nexora"
                        className="w-full bg-transparent p-2 text-sm text-white outline-none placeholder-gray-500"
                    />
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative cursor-pointer">
                        <span className="flex items-center justify-center border border-gray-700 rounded-full bg-[#020617] p-2 hover:bg-[#1e293b] transition">
                            <Bell className="text-gray-300" size={20} />
                        </span>
                        <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] px-1 rounded-full">
                            3
                        </span>
                    </div>

                    <div className="flex items-center gap-2 cursor-pointer">
                        <img
                            src="https://i.pravatar.cc/40"
                            alt="profile"
                            className="w-9 h-9 rounded-full border border-gray-700 object-cover"
                        />
                    </div>

                </div>
            </section>
        </main>
    );
}