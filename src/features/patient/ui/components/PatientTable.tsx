import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { type Patient } from "../../domain/patient"

interface PatientTableProps {
    patients: Patient[]
    onDelete?: (id: number) => void
    onEdit?: (patient: Patient) => void
}

export function PatientTable({ patients, onDelete, onEdit }: PatientTableProps) {
    return (
        <div className="border rounded-2xl shadow-sm bg-card overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>DNI</TableHead>
                        <TableHead>Fecha nacimiento</TableHead>
                        <TableHead>Dirección</TableHead>
                        <TableHead className="text-center">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {patients.map((p) => (
                        <TableRow key={p.id}>
                            <TableCell>
                                {p.primerNombre} {p.segundoNombre ?? ""} {p.apellidoPaterno}{" "}
                                {p.apellidoMaterno}
                            </TableCell>
                            <TableCell>{p.dni}</TableCell>
                            <TableCell>
                                {new Date(p.fechaNacimiento).toLocaleDateString("es-ES")}
                            </TableCell>
                            <TableCell>{p.direccion ?? "—"}</TableCell>
                            <TableCell className="text-center">
                                <div className="flex gap-2 justify-center">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onEdit?.(p)}
                                    >
                                        ✏️ Editar
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => p.id && onDelete?.(p.id)}
                                    >
                                        🗑️
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}