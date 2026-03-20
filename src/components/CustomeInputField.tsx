import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps {
    label: string;
    type?: "text" | "password" | "email" | "number";
    isDropdown?: boolean;
    mainStyle?: string;
    placeholder?: string;
    options?: any[];
    onChangeInput: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    icon?: React.ReactNode;
    name: string;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export default function CustomeInputField({
    label,
    name,
    type = "text",
    isDropdown = false,
    mainStyle = "",
    placeholder = "",
    options = [],
    onChangeInput,
    icon,
    onBlur
}: InputProps) {

    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";

    return (
        <section className={`flex flex-col gap-1 ${mainStyle}`}>
            <label htmlFor={label} className="text-lg text-gray-100 text-left w-full">
                {label}
            </label>

            {isDropdown ? (
                <select
                    id={label}
                    className="p-2 rounded-md bg-[#020617] border border-gray-600 text-white"
                    onChange={onChangeInput}
                >
                    {options.map((opt, i) => (
                        <option key={i}>{opt}</option>
                    ))}
                </select>
            ) : (
                <div className="flex items-center border border-gray-600 rounded-md bg-[#020617] px-2 focus-within:border-blue-500">
                    {icon && (
                        <span className="text-gray-400 mr-2">
                            {icon}
                        </span>
                    )}

                    <input
                        id={label}
                        name={name}
                        type={isPassword ? (showPassword ? "text" : "password") : type}
                        placeholder={placeholder}
                        onChange={onChangeInput}
                        className="w-full p-2 bg-transparent text-white outline-none focus:none"
                        onBlur={onBlur}
                    />
                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-gray-400 ml-2"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    )}
                </div>
            )}
        </section>
    );
}