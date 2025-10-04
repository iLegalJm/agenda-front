import type { Patient } from "../domain/patient";

export function mapPatientFromApi(apiPatient: any): Patient {
    return {
        id: apiPatient.id,
        primerNombre: apiPatient.primerNombre,
        segundoNombre: apiPatient.segundoNombre,
        apellidoPaterno: apiPatient.apellidoPaterno,
        apellidoMaterno: apiPatient.apellidoMaterno,
        fechaNacimiento: apiPatient.fechaNacimiento, // viene como string ISO
        dni: apiPatient.dni,
        direccion: apiPatient.direccion,
    };
}

export function mapPatientToApi(patient: Patient) {
    return {
        id: patient.id,
        primerNombre: patient.primerNombre,
        segundoNombre: patient.segundoNombre,
        apellidoPaterno: patient.apellidoPaterno,
        apellidoMaterno: patient.apellidoMaterno,
        fechaNacimiento: patient.fechaNacimiento,
        dni: patient.dni,
        direccion: patient.direccion,
    };
}