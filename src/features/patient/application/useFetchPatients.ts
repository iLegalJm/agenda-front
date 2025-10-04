import { useQuery } from "@tanstack/react-query";
import { patientApi } from "../infrastructure/patientApi";

export function useFetchPatients() {
    return useQuery({
        queryKey: ["patients"],
        queryFn: patientApi.getAll,
    })
}