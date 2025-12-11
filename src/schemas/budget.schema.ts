import { z } from "zod";

export const budgetFormSchema = z.object({
    mes: z.coerce.number()
        .min(1, "Selecciona un mes válido (1-12).")
        .max(12, "Selecciona un mes válido (1-12)."),
    monto_total: z.coerce.number()
        .min(1, "El monto total debe ser mayor a 0."),
    // Estos campos pueden ser opcionales o requeridos según la plantilla
    // pero como son dinámicos, validamos lo básico
    destino: z.string().optional(),
    motivo: z.string().optional(),
    dias: z.coerce.number().optional(),
    transporte: z.coerce.number().optional(),
    hospedaje: z.coerce.number().optional(),
    alimentacion: z.coerce.number().optional(),
    insumo: z.string().optional(),
    cantidad: z.coerce.number().optional(),
    proveedor: z.string().optional(),
    curso: z.string().optional(),
    medio: z.string().optional(),
    campana: z.string().optional(),
    descripcion: z.string().optional(),
});

export type BudgetFormData = z.infer<typeof budgetFormSchema>;
