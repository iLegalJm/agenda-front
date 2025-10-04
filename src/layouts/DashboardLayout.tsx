"use client"

import { useState } from "react"
import { useLocation, Link } from "react-router-dom"
import {
    Menu,
    Home,
    LogOut,
    User,
    Hospital,
    ChevronLeft,
    Bell,
    X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import ThemeToggle from "@/components/ThemeToggle"
import { toast } from "sonner"
import { useAuth } from "@/features/auth/hooks/useAuth"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { logout } = useAuth()
    const location = useLocation()

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
        <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-slate-100">
            {/* Overlay para mobile */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar Desktop y Mobile */}
            <aside
                className={cn(
                    "flex flex-col bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 transition-all duration-300 shadow-lg",
                    // Desktop
                    "hidden md:flex",
                    sidebarOpen ? "w-64" : "w-20",
                    // Mobile
                    "md:relative fixed inset-y-0 left-0 z-50",
                    mobileMenuOpen ? "flex" : "hidden md:flex"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
                    <div className={cn(
                        "flex items-center gap-3 transition-opacity duration-300",
                        !sidebarOpen && "md:opacity-0 md:w-0"
                    )}>
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                            <Hospital className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap">
                            MediApp
                        </span>
                    </div>

                    {/* Botón de cerrar en mobile / Toggle en desktop */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                            if (window.innerWidth < 768) {
                                setMobileMenuOpen(false)
                            } else {
                                setSidebarOpen(!sidebarOpen)
                            }
                        }}
                        className="hover:bg-slate-100 dark:hover:bg-slate-800 flex-shrink-0"
                    >
                        {window.innerWidth < 768 ? (
                            <X className="h-5 w-5" />
                        ) : sidebarOpen ? (
                            <ChevronLeft className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </Button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    <NavItem
                        href="/dashboard"
                        icon={<Home />}
                        open={sidebarOpen}
                        active={location.pathname === "/dashboard"}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Inicio
                    </NavItem>
                    <NavItem
                        href="/dashboard/patients"
                        icon={<User />}
                        open={sidebarOpen}
                        active={location.pathname.startsWith("/dashboard/patients")}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Pacientes
                    </NavItem>
                </nav>

                {/* Footer with User Info */}
                <div className={cn(
                    "p-4 border-t border-slate-200 dark:border-slate-800 transition-all duration-300",
                    !sidebarOpen && "md:opacity-0 md:h-0 md:p-0 md:overflow-hidden"
                )}>
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                        <Avatar className="h-8 w-8 flex-shrink-0">
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                                A
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">Admin</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                admin@example.com
                            </p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="flex items-center justify-between p-4 border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-slate-200 dark:border-slate-800 shadow-sm sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                        <div>
                            <h1 className="text-xl font-bold">Dashboard</h1>
                            <p className="text-sm text-slate-500 dark:text-slate-400 hidden sm:block">
                                Bienvenido de vuelta
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <ThemeToggle />

                        {/* Notifications */}
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
                        </Button>

                        {/* User Menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="flex items-center gap-2 px-2 sm:px-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="" />
                                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm">
                                            A
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="hidden lg:block">Admin</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Perfil</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="text-red-600 dark:text-red-400"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Cerrar sesión</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 p-4 sm:p-6 overflow-auto">
                    <div className="max-w-7xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}

function NavItem({
    href,
    icon,
    children,
    open,
    active = false,
    onClick,
}: {
    href: string
    icon: React.ReactNode
    children: React.ReactNode
    open: boolean
    active?: boolean
    onClick?: () => void
}) {
    return (
        <Link
            to={href}
            onClick={onClick}
            className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
                active
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
            )}
        >
            <span className={cn(
                "h-5 w-5 transition-transform group-hover:scale-110 flex-shrink-0",
                active && "text-white"
            )}>
                {icon}
            </span>
            <span className={cn(
                "font-medium transition-all duration-300",
                !open && "md:opacity-0 md:w-0 md:overflow-hidden"
            )}>
                {children}
            </span>
            {/* Tooltip solo en desktop cuando está colapsado */}
            {!open && (
                <span className="hidden md:block absolute left-full ml-6 px-2 py-1 bg-slate-900 dark:bg-slate-700 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                    {children}
                </span>
            )}
        </Link>
    )
}