import React from "react";

interface ButtonProps {
    label: string;
    variant?: "primary" | "secondary";
    icon?: React.ReactNode;
    onClick?: () => void | Promise<void>;
}

export default function CustomButton({
    label,
    variant = "primary",
    icon,
    onClick
}: ButtonProps) {

    const baseStyle =
        "flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-all duration-200 cursor-pointer shadow-xl";

    const variants = {
        primary:
            "bg-[#3b82f6] text-white hover:bg-[#2563eb] border border-[#3b82f6]",
        secondary:
            "bg-[#0f172a] text-white border border-gray-700 hover:bg-[#020617]"
    };

    return (
        <button
            type="button"
            onClick={onClick}
            className={`${baseStyle} ${variants[variant]}`}
        >
            {icon && <span className="text-gray-300">{icon}</span>}
            <span className="text-sm font-medium">{label}</span>
        </button>
    );
}