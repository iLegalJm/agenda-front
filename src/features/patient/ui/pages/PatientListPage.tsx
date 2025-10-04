import { useState } from "react"
import { toast } from "sonner"

import { Input } from "@/components/ui/input"

import { PatientDialog } from "../components/PatientDialog"
import { PatientTable } from "../components/PatientTable"

import { useFetchPatients } from "../../application/useFetchPatients"
import { useDeletePatient } from "../../application/useDeletePatient"
import { type Patient } from "../../domain/patient"
import DashboardLayout from "@/layouts/DashboardLayout"

export function PatientListPage() {
    // 🔹 React Query hooks
    const { data: patients, isLoading } = useFetchPatients()
    const deletePatient = useDeletePatient()

    // 🔹 Estado local
    const [search, setSearch] = useState("")
    const [editingPatient, setEditingPatient] = useState<Patient | null>(null)

    // 🔹 Handlers
    const handleDelete = (id: number) => {
        if (confirm("¿Seguro que deseas eliminar este paciente?")) {
            deletePatient.mutate(id, {
                onSuccess: () => toast.success("🗑️ Paciente eliminado correctamente"),
                onError: () => toast.error("❌ No se pudo eliminar el paciente"),
            })
        }
    }

    const handleEdit = (patient: Patient) => {
        setEditingPatient(patient)
    }

    // 🔹 Filtro por nombre o DNI
    const filteredPatients =
        patients?.filter((p) =>
            `${p.primerNombre} ${p.apellidoPaterno} ${p.dni}`
                .toLowerCase()
                .includes(search.toLowerCase())
        ) || []

    return (
        <DashboardLayout>
            <div className="p-6 space-y-8">
                {/* 🧱 Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h1 className="text-3xl font-bold text-gray-800">Pacientes</h1>

                    <div className="flex gap-3 items-center">
                        <Input
                            placeholder="Buscar por nombre o DNI..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="max-w-sm"
                        />

                        {/* 🆕 Botón para crear nuevo paciente */}
                        <PatientDialog triggerLabel="➕ Nuevo paciente" />
                    </div>
                </div>

                {/* 📋 Tabla de pacientes */}
                {isLoading ? (
                    <div className="text-gray-500 italic">Cargando pacientes...</div>
                ) : (
                    <PatientTable
                        patients={filteredPatients}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                )}

                {/* ✏️ Modal para editar paciente */}
                {editingPatient && (
                    <PatientDialog
                        patient={editingPatient}
                        triggerLabel=""
                    />
                )}
            </div>
        </DashboardLayout>
    )
}
