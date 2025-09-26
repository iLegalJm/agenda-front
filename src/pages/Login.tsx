import { useTheme } from '../context/ThemeContext'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
    const { theme, toggleTheme } = useTheme();

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
    }

    const fakeLogin = (data: FormData) => {
        console.log('Intentando login con:', data);
        // Aquí iría la lógica real de autenticación
    }

    // const onSubmit = async (data: FormData) => {
    //     try {
    //         const user = await login(data.email, data.password);
    //         console.log('Usuario autenticado:', user);
    //         // guardar token, redirigir, etc.
    //     } catch (err) {
    //         console.error('Error de login', err);
    //     }
    // };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                {/* Cabecera con botón de tema */}
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
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

                <form onSubmit={handleSubmit(fakeLogin)} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
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

                    {/* Botón */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition-colors"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    )
}