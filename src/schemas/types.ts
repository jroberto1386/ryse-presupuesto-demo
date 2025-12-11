export interface CostCenter {
    id: number;
    clave: string;
    nombre: string;
}

export interface Account {
    id: number;
    clave: string;
    nombre: string;
    tipo_gasto: string;
}

export interface User {
    id: number;
    name: string;
}

export interface TemplateField {
    name: string;
    label: string;
    type: string;
    min?: number;
    max?: number;
    required?: boolean;
}

export interface Header {
    id: number;
    anio: number;
    cc_id: number;
    account_id: number;
    owner: string;
    status: 'draft' | 'submitted' | 'approved' | 'rejected' | 'locked';
}

export interface Line {
    id: number;
    header_id: number;
    mes: number;
    monto_total: number;
    gasto_real: number;
    meta: Record<string, string | number>;
}

export interface IncomeLine {
    id: number;
    cc_id: number;
    mes: number;
    item_id: number;
    cantidad: number;
    total: number;
}
