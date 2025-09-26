import { useQuery } from '@tanstack/react-query';
import { listarMedicos } from '../api/medicosApi';

export default function Medicos() {

    const { data, isLoading, error } = useQuery({
        queryKey: ['medicos'],
        queryFn: listarMedicos
    });

    if (isLoading) return <p>Cargando...</p>;

    if (error) return <p>Error al cargar los médicos</p>;



    return (
        <div>
            <h1 className="text-xl font-bold mb-4">Lista de Médicos</h1>
            <ul className="list-disc pl-6">
                {data?.map((m: any) => (
                    <li key={m.id}>{m.nombre} – {m.especialidad}</li>
                ))}
            </ul>
        </div>
    )
}