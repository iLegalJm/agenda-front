import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { PatientForm } from "./PatientForm"
import { useState, useEffect } from "react"
import { type Patient } from "../../domain/patient"

interface PatientDialogProps {
    patient?: Patient
    triggerLabel?: string
}

export function PatientDialog({ patient, triggerLabel }: PatientDialogProps) {
    const [open, setOpen] = useState(false)

    // Si llega un patient (modo edición), abrimos automáticamente
    useEffect(() => {
        if (patient) setOpen(true)
    }, [patient])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {triggerLabel && (
                <DialogTrigger asChild>
                    <Button onClick={() => setOpen(true)}>
                        {triggerLabel}
                    </Button>
                </DialogTrigger>
            )}

            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        {patient ? "Editar paciente" : "Registrar nuevo paciente"}
                    </DialogTitle>
                </DialogHeader>

                <PatientForm
                    patient={patient}
                    onSuccess={() => {
                        setOpen(false)
                    }}
                />
            </DialogContent>
        </Dialog>
    )
}
