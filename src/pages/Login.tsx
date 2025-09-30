import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from 'sonner';

import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

const schema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
    const { login } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
            password: '',
        },
    });


    const onSubmit = async (data: FormData) => {
        setLoading(true);
        setError("");

        try {
            await login(data.email, data.password);
            toast.success("Bienvenido de nuevo!");
            window.location.href = "/dashboard";
        } catch (err) {
            setError("Credenciales inválidas");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center
    bg-gradient-to-br from-slate-100 to-slate-200
    dark:from-slate-900 dark:to-slate-800 px-4">
            <Card className="w-full max-w-sm shadow-lg
      border border-slate-200 dark:border-slate-700
      bg-white dark:bg-slate-800">

                <CardHeader className="flex flex-row justify-between items-center">
                    <CardTitle className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                        Iniciar Sesión
                    </CardTitle>
                    <button
                        onClick={toggleTheme}
                        className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                        title={`Cambiar a modo ${theme === "light" ? "oscuro" : "claro"}`}
                    >
                        {theme === "light" ? "🌙" : "☀️"}
                    </button>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                            {/* Email */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Correo electrónico</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                                <Input
                                                    placeholder="correo@ejemplo.com"
                                                    type="email"
                                                    className="pl-10 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Contraseña */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contraseña</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                                <Input
                                                    placeholder="********"
                                                    type={showPassword ? "text" : "password"}
                                                    className="pl-10 pr-10 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                                                    {...field}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-5 w-5" />
                                                    ) : (
                                                        <Eye className="h-5 w-5" />
                                                    )}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Error general */}
                            {error && (
                                <p className="text-red-500 text-sm text-center">{error}</p>
                            )}

                            {/* Botón */}
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center transition-transform hover:scale-[1.01]"
                            >
                                {loading && (
                                    <svg
                                        className="animate-spin h-5 w-5 text-white mr-2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8z"
                                        ></path>
                                    </svg>
                                )}
                                {loading ? "Ingresando..." : "Entrar"}
                            </Button>

                            {/* Extra */}
                            <div className="text-center">
                                <a
                                    href="/forgot-password"
                                    className="text-sm text-slate-600 hover:text-indigo-600 
                           dark:text-slate-400 dark:hover:text-indigo-400 transition-colors"
                                >
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )

}