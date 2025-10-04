import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { PatientInput } from "../domain/patient.schema";
import { patientApi } from "../infrastructure/patientApi";
import { toast } from "sonner";

export function useCreatePatient() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: PatientInput) => {
            return await patientApi.create(data);
        },
        onSuccess: () => {
            toast.success("Paciente creado con éxito");

            queryClient.invalidateQueries({ queryKey: ["patients"] });
        },
        onError: (error: any) => {
            console.error("Error creando paciente:", error);
            toast.error("Error creando paciente");
        }
    });
}