import { Message } from "../types/message";

export interface Team {
    id: string;
    name: string;
    description: string;
    memberCount: number;
    isActive: boolean;
    createdAt: string;
    lastActivity: string;
}

export interface TeamMessage extends Message {
    teamId: string;
    teamName: string;
}

export interface TeamMember {
    id: string;
    name: string;
    email: string;
    role: string;
    department: string;
    isOnline: boolean;
    joinedAt: string;
    teamId: string;
    teamRole: "Admin" | "Member" | "Guest";
}

export const dummyTeams: Team[] = [
    { id: "team_001", name: "Engineering", description: "Frontend & Backend dev team", memberCount: 12, isActive: true, createdAt: "2024-01-10", lastActivity: "2026-03-18T10:30:00.000Z" },
    { id: "team_002", name: "Design", description: "UI/UX & Brand team", memberCount: 6, isActive: true, createdAt: "2024-01-12", lastActivity: "2026-03-18T09:45:00.000Z" },
    { id: "team_003", name: "Product", description: "Product & Strategy team", memberCount: 8, isActive: true, createdAt: "2024-01-15", lastActivity: "2026-03-18T08:20:00.000Z" },
    { id: "team_004", name: "DevOps", description: "Infrastructure & CI/CD team", memberCount: 5, isActive: false, createdAt: "2024-02-01", lastActivity: "2026-03-17T14:00:00.000Z" },
    { id: "team_005", name: "Marketing", description: "Growth & Content team", memberCount: 7, isActive: true, createdAt: "2024-02-10", lastActivity: "2026-03-18T07:30:00.000Z" },
];

export const dummyTeamMembers: TeamMember[] = [

    {
        id: "user_002",
        name: "Ravi",
        email: "ravi@nexora.com",
        role: "Frontend Developer",
        department: "Engineering",
        isOnline: true,
        joinedAt: "2024-01-15",
        teamId: "team_001",
        teamRole: "Admin",
    },
    {
        id: "user_004",
        name: "Priya",
        email: "priya@nexora.com",
        role: "Backend Developer",
        department: "Engineering",
        isOnline: false,
        joinedAt: "2024-03-10",
        teamId: "team_001",
        teamRole: "Member",
    },
    {
        id: "user_005",
        name: "Vikram",
        email: "vikram@nexora.com",
        role: "DevOps Engineer",
        department: "Infrastructure",
        isOnline: false,
        joinedAt: "2024-04-05",
        teamId: "team_001",
        teamRole: "Member",
    },

    {
        id: "user_003",
        name: "Kumar",
        email: "kumar@nexora.com",
        role: "UI/UX Designer",
        department: "Design",
        isOnline: true,
        joinedAt: "2024-02-20",
        teamId: "team_002",
        teamRole: "Admin",
    },
    {
        id: "user_002",
        name: "Ravi",
        email: "ravi@nexora.com",
        role: "Frontend Developer",
        department: "Engineering",
        isOnline: true,
        joinedAt: "2024-01-15",
        teamId: "team_002",
        teamRole: "Member",
    },

    {
        id: "user_004",
        name: "Priya",
        email: "priya@nexora.com",
        role: "Backend Developer",
        department: "Engineering",
        isOnline: false,
        joinedAt: "2024-03-10",
        teamId: "team_003",
        teamRole: "Admin",
    },
    {
        id: "user_005",
        name: "Vikram",
        email: "vikram@nexora.com",
        role: "DevOps Engineer",
        department: "Infrastructure",
        isOnline: false,
        joinedAt: "2024-04-05",
        teamId: "team_003",
        teamRole: "Member",
    },

    {
        id: "user_005",
        name: "Vikram",
        email: "vikram@nexora.com",
        role: "DevOps Engineer",
        department: "Infrastructure",
        isOnline: false,
        joinedAt: "2024-04-05",
        teamId: "team_004",
        teamRole: "Admin",
    },
    {
        id: "user_002",
        name: "Ravi",
        email: "ravi@nexora.com",
        role: "Frontend Developer",
        department: "Engineering",
        isOnline: true,
        joinedAt: "2024-01-15",
        teamId: "team_004",
        teamRole: "Member",
    },

    {
        id: "user_003",
        name: "Kumar",
        email: "kumar@nexora.com",
        role: "UI/UX Designer",
        department: "Design",
        isOnline: true,
        joinedAt: "2024-02-20",
        teamId: "team_005",
        teamRole: "Admin",
    },
    {
        id: "user_004",
        name: "Priya",
        email: "priya@nexora.com",
        role: "Backend Developer",
        department: "Engineering",
        isOnline: false,
        joinedAt: "2024-03-10",
        teamId: "team_005",
        teamRole: "Member",
    },
];

export const dummyTeamMessages: TeamMessage[] = [
    // Engineering
    { id: "tmsg_001", teamId: "team_001", teamName: "Engineering", senderId: "user_002", senderName: "Ravi", receiverId: "team_001", receiverName: "Engineering", roomId: "team_001", content: "React 18 upgrade பண்ணிட்டோம் — all tests passing ✅", type: "text", status: "read", isOnline: true, createdAt: "2026-03-18T10:00:00.000Z" },
    { id: "tmsg_002", teamId: "team_001", teamName: "Engineering", senderId: "user_004", senderName: "Priya", receiverId: "team_001", receiverName: "Engineering", roomId: "team_001", content: "Spring Boot 3.2 migration PR ready — review பண்ணுங்க 🚀", type: "text", status: "read", isOnline: false, createdAt: "2026-03-18T10:05:00.000Z" },
    { id: "tmsg_003", teamId: "team_001", teamName: "Engineering", senderId: "user_005", senderName: "Vikram", receiverId: "team_001", receiverName: "Engineering", roomId: "team_001", content: "Docker compose file update பண்ணினேன் — pull பண்ணுங்க", type: "text", status: "delivered", isOnline: false, createdAt: "2026-03-18T10:30:00.000Z" },

    // Design
    { id: "tmsg_004", teamId: "team_002", teamName: "Design", senderId: "user_003", senderName: "Kumar", receiverId: "team_002", receiverName: "Design", roomId: "team_002", content: "Nexora v2 Figma file share பண்றேன் — feedback குடுங்க 🎨", type: "text", status: "read", isOnline: true, createdAt: "2026-03-18T09:00:00.000Z" },
    { id: "tmsg_005", teamId: "team_002", teamName: "Design", senderId: "user_002", senderName: "Ravi", receiverId: "team_002", receiverName: "Design", roomId: "team_002", content: "Dark theme colors super-ஆ இருக்கு 👌", type: "text", status: "read", isOnline: true, createdAt: "2026-03-18T09:15:00.000Z" },
    { id: "tmsg_006", teamId: "team_002", teamName: "Design", senderId: "user_003", senderName: "Kumar", receiverId: "team_002", receiverName: "Design", roomId: "team_002", content: "Component library ready — Storybook link போட்டுள்ளேன்", type: "text", status: "delivered", isOnline: true, createdAt: "2026-03-18T09:45:00.000Z" },

    // Product
    { id: "tmsg_007", teamId: "team_003", teamName: "Product", senderId: "user_004", senderName: "Priya", receiverId: "team_003", receiverName: "Product", roomId: "team_003", content: "Q2 roadmap deck ready — meeting 3pm இருக்கு 📋", type: "text", status: "read", isOnline: false, createdAt: "2026-03-18T08:00:00.000Z" },
    { id: "tmsg_008", teamId: "team_003", teamName: "Product", senderId: "user_005", senderName: "Vikram", receiverId: "team_003", receiverName: "Product", roomId: "team_003", content: "User research findings share பண்றேன் — 500 responses வந்தது", type: "text", status: "read", isOnline: false, createdAt: "2026-03-18T08:20:00.000Z" },

    // DevOps
    { id: "tmsg_009", teamId: "team_004", teamName: "DevOps", senderId: "user_005", senderName: "Vikram", receiverId: "team_004", receiverName: "DevOps", roomId: "team_004", content: "Production deploy successful ✅ — v2.1.0 live ஆச்சு", type: "text", status: "read", isOnline: false, createdAt: "2026-03-17T14:00:00.000Z" },
    { id: "tmsg_010", teamId: "team_004", teamName: "DevOps", senderId: "user_002", senderName: "Ravi", receiverId: "team_004", receiverName: "DevOps", roomId: "team_004", content: "CI/CD pipeline — build time 40% குறைஞ்சது 🔥", type: "text", status: "sent", isOnline: true, createdAt: "2026-03-17T14:30:00.000Z" },

    // Marketing
    { id: "tmsg_011", teamId: "team_005", teamName: "Marketing", senderId: "user_003", senderName: "Kumar", receiverId: "team_005", receiverName: "Marketing", roomId: "team_005", content: "Launch campaign assets ready — social media posts approve பண்ணுங்க", type: "text", status: "read", isOnline: true, createdAt: "2026-03-18T07:00:00.000Z" },
    { id: "tmsg_012", teamId: "team_005", teamName: "Marketing", senderId: "user_004", senderName: "Priya", receiverId: "team_005", receiverName: "Marketing", roomId: "team_005", content: "Newsletter draft sent — feedback by EOD குடுங்க 📧", type: "text", status: "delivered", isOnline: false, createdAt: "2026-03-18T07:30:00.000Z" },
];