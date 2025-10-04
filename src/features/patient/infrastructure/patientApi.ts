import api from "@/features/infraestructure/api";
import { mapPatientFromApi, mapPatientToApi } from "./patientMapper";
import type { Patient } from "../domain/patient";
import type { PatientInput } from "../domain/patient.schema";

export const patientApi = {
    async getAll(): Promise<Patient[]> {
        const response = await api.get("/patient/v1/api");
        return response.data.data.map(mapPatientFromApi);
    },

    async create(patient: PatientInput): Promise<Patient> {
        const payload = mapPatientToApi(patient);
        const response = await api.post("/patient/v1/api", payload);
        return mapPatientFromApi(response.data.data);
    },

    async update(id: number, patient: PatientInput): Promise<Patient> {
        if (!id) {
            throw new Error("Patient ID is required for update");
        }

        const payload = mapPatientToApi(patient);
        const response = await api.put(`/patient/v1/api/${id}`, payload);
        return mapPatientFromApi(response.data.data);
    },

    async remove(id: number): Promise<void> {
        await api.delete(`/patient/v1/api/${id}`);
    }
}