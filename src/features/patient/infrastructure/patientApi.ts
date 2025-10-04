import api from "@/features/infraestructure/api";
import { mapPatientFromApi, mapPatientToApi } from "./patientMapper";
import type { Patient } from "../domain/patient";
import type { PatientInput } from "../domain/patient.schema";

export const patientApi = {
    async getAll(): Promise<Patient[]> {
        const { data } = await api.get("/patients");
        return data.map(mapPatientFromApi);
    },

    async create(patient: PatientInput): Promise<Patient> {
        const payload = mapPatientToApi(patient);
        const { data } = await api.post("/patients", payload);
        return mapPatientFromApi(data);
    },

    async update(id: number, patient: PatientInput): Promise<Patient> {
        if (!id) {
            throw new Error("Patient ID is required for update");
        }

        const payload = mapPatientToApi(patient);
        const { data } = await api.put(`/patients/${id}`, payload);
        return mapPatientFromApi(data);
    },

    async remove(id: number): Promise<void> {
        await api.delete(`/patients/${id}`);
    }
}