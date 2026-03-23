import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface Option {
    id: number;
    label: string;
    value: string;
}

interface InputProps {
    label: string;
    type?: "text" | "password" | "email" | "number";
    isDropdown?: boolean;
    mainStyle?: string;
    placeholder?: string;
    options?: Option[];
    onChangeInput: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void;
    icon?: React.ReactNode;
    name: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
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
    onBlur,
}: InputProps) {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
        <section className={`flex flex-col gap-1 ${mainStyle}`}>
            {/* Label */}
            <label
                htmlFor={name}
                className="text-sm text-gray-300 text-left w-full"
            >
                {label}
            </label>

            {/* Dropdown */}
            {isDropdown ? (
                <select
                    id={name}
                    name={name}
                    className="p-2 rounded-md bg-[#020617] border border-gray-600 text-white focus:border-[#8440fd] outline-none"
                    onChange={onChangeInput}
                    defaultValue=""
                >
                    {/* Placeholder option */}
                    <option value="" disabled>
                        {placeholder || "Select option"}
                    </option>

                    {options.map((opt) => (
                        <option key={opt.id} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            ) : (
                /* Input */
                <div className="flex items-center border border-gray-600 rounded-md bg-[#020617] px-2 focus-within:border-[#8440fd] transition">

                    {icon && <span className="text-gray-400 mr-2">{icon}</span>}

                    <input
                        id={name}
                        name={name}
                        type={isPassword ? (showPassword ? "text" : "password") : type}
                        placeholder={placeholder}
                        onChange={onChangeInput}
                        onBlur={onBlur}
                        className="w-full p-2 bg-transparent text-white outline-none"
                    />

                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-gray-400 ml-2 hover:text-white"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    )}
                </div>
            )}
        </section>
    );
}