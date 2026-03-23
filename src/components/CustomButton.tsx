import React, { useState, useRef, useEffect } from "react"

interface Option {
    id: number
    label: string
    value: string
}

interface ButtonProps {
    label: string
    variant?: "primary" | "secondary"
    icon?: React.ReactNode
    onClick?: () => void | Promise<void>
    isModelOpen?: boolean
    option?: Option[]
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
    disabled?: boolean
}

export default function CustomButton({
    label,
    variant = "primary",
    icon,
    onClick,
    isModelOpen = false,
    option = [],
    onChange,
    disabled,
}: ButtonProps) {
    const [modelOpen, setModelOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setModelOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const baseStyle =
        "flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-all duration-200 cursor-pointer shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"

    const variants = {
        primary: "bg-[#3b82f6] text-white hover:bg-[#2563eb] border border-[#3b82f6]",
        secondary: "bg-[#0f172a] text-white border border-gray-700 hover:bg-[#020617]",
    }

    const handleClick = () => {
        if (isModelOpen) {
            setModelOpen((prev) => !prev)
        }
        onClick?.()
    }

    const handleOptionClick = (value: string) => {
        const fakeEvent = {
            target: { value },
        } as React.ChangeEvent<HTMLSelectElement>

        onChange?.(fakeEvent)
        setModelOpen(false) 
    }

    return (
        <div ref={dropdownRef} className="relative inline-block">

            <button
                type="button"
                onClick={handleClick}
                disabled={disabled}
                className={`${baseStyle} ${variants[variant]}`}
            >
                {icon && <span className="text-gray-300">{icon}</span>}
                <span className="text-sm font-medium">{label}</span>
            </button>
            {isModelOpen && modelOpen && option.length > 0 && (
                <div className="absolute right-0 mt-2 w-40 bg-[#020617] border border-gray-700 rounded-md shadow-lg z-50 overflow-hidden">
                    {option.map((value) => (
                        <div
                            key={value.id}
                            onClick={() => handleOptionClick(value.value)}
                            className="px-3 py-2 text-sm text-white hover:bg-[#1e293b] cursor-pointer transition-all"
                        >
                            {value.label}
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}