import { useTheme } from '../context/ThemeContext'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { login } from '../api/authApi';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const schema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
    const { login } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        setError("");

        try {
            await login(data.email, data.password);

            window.location.href = "/dashboard";
        } catch (err) {
            setError("Credenciales inválidas");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                {/* Cabecera con botón de tema */}
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
                        Iniciar Sesión
                    </h1>
                    <button
                        onClick={toggleTheme}
                        className="ml-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                        title={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
                    >
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            autoFocus
                            {...register('email')}
                            className="w-full border rounded p-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Contraseña */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            {...register('password')}
                            className="w-full border rounded p-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Error */}
                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}

                    {/* Botón */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition-colors ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {loading ? "Ingresando..." : "Entrar"}
                    </button>
                </form>
            </div>
        </div>
    )
}