import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type FormData = z.infer<typeof schema>;

export default function Login() {

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
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-sm bg-white rounded-lg shadow p-6">
                <h1 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h1>
                <form onSubmit={handleSubmit(fakeLogin)} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Correo electrónico</label>
                        <input
                            type="email"
                            {...register('email')}
                            className="w-full border rounded p-2"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Contraseña</label>
                        <input
                            type="password"
                            {...register('password')}
                            className="w-full border rounded p-2"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    )
}