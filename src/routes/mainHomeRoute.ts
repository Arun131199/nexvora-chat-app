import Calls from "../pages/homePage/Calls";
import Chats from "../pages/homePage/Chats";
import Dashboard from "../pages/homePage/Dashboard";
import Files from "../pages/homePage/Files";
import Messages from "../pages/homePage/Messages";

const mainHomeRoutes = [
    {
        path: "dashboard",
        Component: Dashboard,
        children: [
            {
                path: "files",
                Component: Files
            },
            {
                path: "calls",
                Component: Calls
            },
            {
                path: "messages",
                Component: Messages
            },
            {
                path: "chats",
                Component: Chats
            }
        ]
    }
]

export default mainHomeRoutes;