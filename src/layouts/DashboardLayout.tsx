"use client"

import { useState } from "react"
import {
    Menu,
    Home,
    // LayoutDashboard,
    // Settings,
    LogOut,
    User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import ThemeToggle from "@/components/ThemeToggle"
import { toast } from "sonner"
import { useAuth } from "@/context/AuthContext"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const { logout } = useAuth()

    const handleLogout = () => {
        toast("¿Seguro que quieres salir?", {
            description: "Tu sesión se cerrará inmediatamente.",
            action: {
                label: "Salir",
                onClick: () => {
                    logout()
                    toast.success("Sesión cerrada con éxito")
                },
            },
        })
    }

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
            {/* Sidebar */}
            <aside
                className={cn(
                    "hidden md:flex flex-col bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transition-all duration-300",
                    sidebarOpen ? "w-64" : "w-20"
                )}
            >
                <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                    <span className={cn("font-bold text-lg transition-opacity", !sidebarOpen && "opacity-0")}>
                        MiApp
                    </span>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <NavItem href="/dashboard" icon={<Home />} open={sidebarOpen}>Inicio</NavItem>
                    {/* <NavItem href="/dashboard/stats" icon={<LayoutDashboard />} open={sidebarOpen}>Estadísticas</NavItem> */}
                    {/* <NavItem href="/dashboard/settings" icon={<Settings />} open={sidebarOpen}>Configuración</NavItem> */}
                </nav>
            </aside>

            {/* Main */}
            <div className="flex-1 flex flex-col">
                <header className="flex items-center justify-between p-4 border-b bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                    <h1 className="text-lg font-semibold">Dashboard</h1>
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <User className="h-4 w-4" /> Perfil
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            className="flex items-center gap-2"
                            onClick={handleLogout}
                        >
                            <LogOut className="h-4 w-4" /> Salir
                        </Button>
                    </div>
                </header>

                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    )
}

function NavItem({
    href,
    icon,
    children,
    open,
}: {
    href: string
    icon: React.ReactNode
    children: React.ReactNode
    open: boolean
}) {
    return (
        <a
            href={href}
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
            <span className="h-5 w-5">{icon}</span>
            {open && <span className="transition-opacity">{children}</span>}
        </a>
    )
}
