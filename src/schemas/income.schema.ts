import { z } from "zod";

export const incomeFormSchema = z.object({
    cc_id: z.coerce.number().min(1, "Selecciona un centro de costos."),
    mes: z.coerce.number().min(1, "Selecciona un mes válido.").max(12),
    item_id: z.coerce.number().min(1, "Selecciona un procedimiento/artículo."),
    cantidad: z.coerce.number().min(1, "La cantidad debe ser mayor a 0."),
});

export type IncomeFormData = z.infer<typeof incomeFormSchema>;
