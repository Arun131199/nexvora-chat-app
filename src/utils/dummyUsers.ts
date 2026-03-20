import { Users } from "../types/user";

const users: Users[] = [
    {
        id: "user_002",
        name: "Ravi",
        email: "ravi@nexora.com",
        role: "Frontend Developer",
        department: "Engineering",
        isOnline: true,
        joinedAt: "2024-01-15",
    },
    {
        id: "user_003",
        name: "Kumar",
        email: "kumar@nexora.com",
        role: "UI/UX Designer",
        department: "Design",
        isOnline: true,
        joinedAt: "2024-02-20",
    },
    {
        id: "user_004",
        name: "Priya",
        email: "priya@nexora.com",
        role: "Backend Developer",
        department: "Engineering",
        isOnline: false,
        joinedAt: "2024-03-10",
    },
    {
        id: "user_005",
        name: "Vikram",
        email: "vikram@nexora.com",
        role: "DevOps Engineer",
        department: "Infrastructure",
        isOnline: false,
        joinedAt: "2024-04-05",
    },
]

export default users;