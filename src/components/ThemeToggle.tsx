"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "../context/ThemeContext"
import { Button } from "@/components/ui/button"

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full transition-colors"
            title={`Cambiar a modo ${theme === "light" ? "oscuro" : "claro"}`}
        >
            {theme === "light" ? (
                <Moon className="h-5 w-5 text-slate-700 dark:text-slate-200" />
            ) : (
                <Sun className="h-5 w-5 text-yellow-500" />
            )}
        </Button>
    )
}
