export interface Patient {
    id?: number;
    primerNombre: string;
    segundoNombre?: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    fechaNacimiento: string; // ISO string (vendrá del backend)
    dni: string;
    direccion?: string;
}