// src/features/patients/application/useUpdatePatient.ts
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { patientApi } from "../infrastructure/patientApi"
import { type PatientInput } from "../domain/patient.schema"

export function useUpdatePatient() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: PatientInput }) =>
            patientApi.update(id, data),
        onSuccess: () => {
            toast.success("✅ Paciente actualizado correctamente")
            queryClient.invalidateQueries({ queryKey: ["patients"] })
        },
        onError: () => {
            toast.error("❌ No se pudo actualizar el paciente")
        },
    })
}
