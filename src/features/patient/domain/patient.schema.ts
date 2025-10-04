import { z } from "zod";

export const PatientSchema = z.object({
    id: z.number().optional(),
    primerNombre: z.string().min(2, "El primer nombre es obligatorio"),
    segundoNombre: z.string().optional(),
    apellidoPaterno: z.string().min(2, "El apellido paterno es obligatorio"),
    apellidoMaterno: z.string().min(2, "El apellido materno es obligatorio"),
    fechaNacimiento: z.string().refine(
        (val) => !isNaN(Date.parse(val)),
        "La fecha de nacimiento no es válida"
    ),
    dni: z.string().min(8, "El DNI debe tener al menos 8 caracteres"),
    direccion: z.string().optional(),
});

export type PatientInput = z.infer<typeof PatientSchema>;