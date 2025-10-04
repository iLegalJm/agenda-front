import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { PatientSchema, type PatientInput } from "../../domain/patient.schema";
import { useCreatePatient } from "../../application/useCreatePatient";
import { useUpdatePatient } from "../../application/useUpdatePatient";
import type { Patient } from "../../domain/patient";

interface PatientFormProps {
    onSuccess?: () => void;
    patient?: Patient;
}

export function PatientForm({ onSuccess, patient }: PatientFormProps) {
    const form = useForm<PatientInput>({
        resolver: zodResolver(PatientSchema),
        defaultValues: patient
            ? {
                primerNombre: patient.primerNombre,
                segundoNombre: patient.segundoNombre || "",
                apellidoPaterno: patient.apellidoPaterno,
                apellidoMaterno: patient.apellidoMaterno || "",
                fechaNacimiento: patient.fechaNacimiento.split("T")[0], // Convertir a formato YYYY-MM-DD
                dni: patient.dni,
                direccion: patient.direccion || "",
            }
            : {
                primerNombre: "",
                segundoNombre: "",
                apellidoPaterno: "",
                apellidoMaterno: "",
                fechaNacimiento: "",
                dni: "",
                direccion: "",
            }
    });

    const create = useCreatePatient();
    const update = useUpdatePatient();

    const onSubmit = (values: PatientInput) => {
        if (patient?.id) {
            update.mutate(
                { id: patient.id, data: values },
                {
                    onSuccess: () => {
                        form.reset()
                        onSuccess?.()
                    },
                }
            );
        } else {
            create.mutate(values, {
                onSuccess: () => {
                    form.reset();
                    onSuccess?.();
                }
            });
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                <FormField
                    control={form.control}
                    name="primerNombre"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Primer nombre</FormLabel>
                            <FormControl>
                                <Input placeholder="Ej: Juan" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="segundoNombre"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Segundo nombre</FormLabel>
                            <FormControl>
                                <Input placeholder="Ej: Carlos" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="apellidoPaterno"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Apellido paterno</FormLabel>
                            <FormControl>
                                <Input placeholder="Ej: García" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="apellidoMaterno"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Apellido materno</FormLabel>
                            <FormControl>
                                <Input placeholder="Ej: López" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="fechaNacimiento"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Fecha de nacimiento</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dni"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>DNI</FormLabel>
                            <FormControl>
                                <Input placeholder="Ej: 12345678" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="direccion"
                    render={({ field }) => (
                        <FormItem className="md:col-span-2">
                            <FormLabel>Dirección</FormLabel>
                            <FormControl>
                                <Input placeholder="Ej: Calle Falsa 123" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="md:col-span-2 flex justify-end pt-2">
                    <Button type="submit" disabled={create.isPending || update.isPending}>
                        {patient
                            ? update.isPending
                                ? "Actualizando..."
                                : "Actualizar paciente"
                            : create.isPending
                                ? "Guardando..."
                                : "Guardar paciente"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
