import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patientApi } from "../infrastructure/patientApi";
import { toast } from "sonner";

export function useDeletePatient() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            return await patientApi.remove(id);
        },
        onSuccess: () => {
            toast.success("Paciente eliminado con éxito");
            queryClient.invalidateQueries({ queryKey: ["patients"] });
        },
        onError: (error: any) => {
            console.error("Error eliminando paciente:", error);
            toast.error("Error eliminando paciente");
        }
    });
}