import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import SideBar from "../../components/sidebar/SideBar";

export default function Dashboard() {
    return (
        <main className="flex h-screen overflow-hidden">
            <SideBar />
            <section className="flex flex-col flex-1 min-w-0">
                <Navbar />
                <div className="flex-1 overflow-y-auto bg-white">
                    <Outlet />
                </div>

            </section>
        </main>
    );
}