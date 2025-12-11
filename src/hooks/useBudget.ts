import { useState, useMemo } from "react";
import { toast } from 'sonner';
import {
  CostCenter,
  Account,
  User,
  Header,
  Line,
  IncomeLine,
  TemplateField
} from '../schemas/types';

// ======== Datos de muestra ========
export const COST_CENTERS: CostCenter[] = [
  { "id": 1, "clave": "TIJ", "nombre": "TIJ" },
  { "id": 2, "clave": "IMSS LEO", "nombre": "IMSS LEO" },
  { "id": 3, "clave": "IMSS TORR", "nombre": "IMSS TORR" },
  { "id": 4, "clave": "TORR TX", "nombre": "TORR TX" },
  { "id": 5, "clave": "SEDENA", "nombre": "SEDENA" },
  { "id": 6, "clave": "HGR", "nombre": "HGR" },
  { "id": 7, "clave": "IMSS GDL", "nombre": "IMSS GDL" },
  { "id": 8, "clave": "CMNO OFT", "nombre": "CMNO OFT" },
  { "id": 9, "clave": "INC", "nombre": "INC" },
  { "id": 10, "clave": "BIOMEDIC", "nombre": "BIOMEDIC" },
  { "id": 11, "clave": "DIRADJ", "nombre": "DIRADJ" },
  { "id": 12, "clave": "OPERA", "nombre": "OPERA" },
  { "id": 13, "clave": "IMSS TOR", "nombre": "IMSS TOR" },
  { "id": 14, "clave": "CMNO", "nombre": "CMNO" },
  { "id": 15, "clave": "VTAS", "nombre": "VTAS" },
  { "id": 16, "clave": "ADMON", "nombre": "ADMON" },
  { "id": 17, "clave": "DIRGRAL", "nombre": "DIRGRAL" },
  { "id": 18, "clave": "SISTEC", "nombre": "SISTEC" },
  { "id": 19, "clave": "ASUN REG", "nombre": "ASUN REG" },
  { "id": 20, "clave": "SERVADM", "nombre": "SERVADM" },
  { "id": 21, "clave": "COMPRAS", "nombre": "COMPRAS" },
  { "id": 22, "clave": "HOSTING", "nombre": "HOSTING" },
  { "id": 23, "clave": "IMSS TIJ", "nombre": "IMSS TIJ" }
];

export const ACCOUNTS: Account[] = [
  { "id": 1, "clave": "VIATICOS COMPROBADOS", "nombre": "Viaticos Comprobados", "tipo_gasto": "viaticos" },
  { "id": 2, "clave": "MANTENIMIENTO DE MOB Y EQPO DE OFICINA", "nombre": "Mantenimiento De Mob Y Eqpo De Oficina", "tipo_gasto": "papeleria" },
  { "id": 3, "clave": "INSTRUMENTAL MEDICO", "nombre": "Instrumental Medico", "tipo_gasto": "otros" },
  { "id": 4, "clave": "EQUIPO MEDICO", "nombre": "Equipo Medico", "tipo_gasto": "otros" },
  { "id": 5, "clave": "COSTO DE REPARACION", "nombre": "Costo De Reparacion", "tipo_gasto": "mantenimiento" },
  { "id": 6, "clave": "CAPACITACION AL PERSONAL", "nombre": "Capacitacion Al Personal", "tipo_gasto": "capacitacion" },
  { "id": 7, "clave": "GASTOS NOTARIALES", "nombre": "Gastos Notariales", "tipo_gasto": "otros" },
  { "id": 8, "clave": "TRADUCCIONES", "nombre": "Traducciones", "tipo_gasto": "otros" },
  { "id": 9, "clave": "SERVICIOS DE APOYO ADMINISTRATIVO", "nombre": "Servicios De Apoyo Administrativo", "tipo_gasto": "otros" },
  { "id": 10, "clave": "REGISTRO DE MARCAS Y PATENTES", "nombre": "Registro De Marcas Y Patentes", "tipo_gasto": "otros" },
  { "id": 11, "clave": "MOBILIARIO Y EQUIPO MENOR", "nombre": "Mobiliario Y Equipo Menor", "tipo_gasto": "otros" },
  { "id": 12, "clave": "UNIFORMES", "nombre": "Uniformes", "tipo_gasto": "otros" },
  { "id": 13, "clave": "MATERIAL PARA  CAPACITACION", "nombre": "Material Para  Capacitacion", "tipo_gasto": "capacitacion" },
  { "id": 14, "clave": "PASAJES Y ESTACIONAMIENTOS", "nombre": "Pasajes Y Estacionamientos", "tipo_gasto": "viaticos" },
  { "id": 15, "clave": "UTILES DE TRABAJO", "nombre": "Utiles De Trabajo", "tipo_gasto": "papeleria" },
  { "id": 16, "clave": "ASEO Y LIMPIEZA", "nombre": "Aseo Y Limpieza", "tipo_gasto": "otros" },
  { "id": 17, "clave": "MENSAJERIA Y PAQUETERIA", "nombre": "Mensajeria Y Paqueteria", "tipo_gasto": "otros" },
  { "id": 18, "clave": "NO DEDUCIBLE", "nombre": "No Deducible", "tipo_gasto": "otros" },
  { "id": 19, "clave": "MANTENIMIENTO DE EQPO DE TRANSPORTE", "nombre": "Mantenimiento De Eqpo De Transporte", "tipo_gasto": "mantenimiento" },
  { "id": 20, "clave": "COMIDAS AL PERSONAL", "nombre": "Comidas Al Personal", "tipo_gasto": "otros" },
  { "id": 21, "clave": "TENENCIAS Y DERECHOS VEHICULARES", "nombre": "Tenencias Y Derechos Vehiculares", "tipo_gasto": "otros" },
  { "id": 22, "clave": "DIVERSOS", "nombre": "Diversos", "tipo_gasto": "otros" },
  { "id": 23, "clave": "SEGUROS Y PRIMAS", "nombre": "Seguros Y Primas", "tipo_gasto": "otros" },
  { "id": 24, "clave": "SOFTWARE Y ACCESORIOS COMPUTO", "nombre": "Software Y Accesorios Computo", "tipo_gasto": "otros" },
  { "id": 25, "clave": "CUOTAS Y SUSCRIPCIONES", "nombre": "Cuotas Y Suscripciones", "tipo_gasto": "otros" },
  { "id": 26, "clave": "PROMOCIONES EN VENTAS", "nombre": "Promociones En Ventas", "tipo_gasto": "publicidad" },
  { "id": 27, "clave": "SERVICIOS ADMINISTRATIVOS", "nombre": "Servicios Administrativos", "tipo_gasto": "otros" },
  { "id": 28, "clave": "PAPELERIA Y ART DE OFICINA", "nombre": "Papeleria Y Art De Oficina", "tipo_gasto": "papeleria" },
  { "id": 29, "clave": "PROTECCION CIVIL", "nombre": "Proteccion Civil", "tipo_gasto": "otros" },
  { "id": 30, "clave": "MANTENIMIENTO DEL LOCAL Y OFICINA", "nombre": "Mantenimiento Del Local Y Oficina", "tipo_gasto": "mantenimiento" },
  { "id": 31, "clave": "EQUIPO DE COMPUTO AF", "nombre": "Equipo De Computo Af", "tipo_gasto": "otros" },
  { "id": 32, "clave": "TELEFONO FAX Y CORREO", "nombre": "Telefono Fax Y Correo", "tipo_gasto": "otros" },
  { "id": 33, "clave": "HONORARIOS A PERSONAS FISICAS", "nombre": "Honorarios A Personas Fisicas", "tipo_gasto": "otros" },
  { "id": 34, "clave": "EXPOSICIONES Y CONGRESOS", "nombre": "Exposiciones Y Congresos", "tipo_gasto": "congresos" },
  { "id": 35, "clave": "PUBLICIDAD Y PROPAGANDAS", "nombre": "Publicidad Y Propagandas", "tipo_gasto": "publicidad" },
  { "id": 36, "clave": "ARRENDAMIENTO EQUIPO MEDICO", "nombre": "Arrendamiento Equipo Medico", "tipo_gasto": "otros" },
  { "id": 37, "clave": "ARRENDAMIENTO DE LOCAL Y OFICINA", "nombre": "Arrendamiento De Local Y Oficina", "tipo_gasto": "otros" },
  { "id": 38, "clave": "ARRENDAMIENTO DE AUTOS", "nombre": "Arrendamiento De Autos", "tipo_gasto": "otros" },
  { "id": 39, "clave": "SERVICIOS DE VIGILANCIA", "nombre": "Servicios De Vigilancia", "tipo_gasto": "otros" },
  { "id": 40, "clave": "GASOLINA", "nombre": "Gasolina", "tipo_gasto": "otros" },
  { "id": 41, "clave": "FINIQUITOS", "nombre": "Finiquitos", "tipo_gasto": "otros" },
  { "id": 42, "clave": "PRESTACIONES", "nombre": "Prestaciones", "tipo_gasto": "otros" },
  { "id": 43, "clave": "SUELDOS Y SALARIOS", "nombre": "Sueldos Y Salarios", "tipo_gasto": "otros" }
];

export const USERS: User[] = [
  { "id": 1, "name": "ASISTENCIA BIOMEDICA" },
  { "id": 2, "name": "ASUNTOS REGULATORIOS" },
  { "id": 3, "name": "TECNOVIGILANCIA" },
  { "id": 4, "name": "ALMACÉN" },
  { "id": 5, "name": "ADMINISTRACIÓN Y FINANZAS" },
  { "id": 6, "name": "RECURSOS HUMANOS" },
  { "id": 7, "name": "CALIDAD" },
  { "id": 8, "name": "SEGURIDAD E HIGIENE" },
  { "id": 9, "name": "SISTEMA DE GESTIÓN DE CALIDAD" },
  { "id": 10, "name": "SISTEMAS" },
  { "id": 11, "name": "VENTAS" },
  { "id": 12, "name": "ASISTENCIA BIOMÉDICA" },
  { "id": 13, "name": "ALTA DIRECCIÓN" },
  { "id": 14, "name": "LICITACIONES" },
  { "id": 15, "name": "CUENTAS POR PAGAR" },
  { "id": 16, "name": "TESORERIA" },
  { "id": 17, "name": "DIR ADMON Y FINANZAS" }
];

export const INCOME_COST_CENTERS: CostCenter[] = [
  { id: 1, clave: "HGR-RAZA-CARD", nombre: "Hospital General La Raza - Cardiología" },
  { id: 2, clave: "LEON-CARD", nombre: "León IMSS - Cardiología" },
  { id: 3, clave: "LEON-TRAS", nombre: "León IMSS - Trasplantes" },
  { id: 4, clave: "CMNO-CARD", nombre: "CMNO IMSS - Cardiología" },
  { id: 5, clave: "CMNO-OFT", nombre: "CMNO IMSS - Oftalmología" },
  { id: 6, clave: "SEDENA-CARD", nombre: "SEDENA - Cardiología" },
  { id: 7, clave: "TIJ-CARD", nombre: "Tijuana IMSS - Cardiología" },
  { id: 8, clave: "TORR-CARD", nombre: "Torreón IMSS - Cardiología" },
  { id: 9, clave: "TORR-TRAS", nombre: "Torreón IMSS - Trasplantes" },
];

export const INCOME_ITEMS = [
  {
    id: 1,
    codigo: "20.04.001",
    descripcion: "VIDEO BRONCOSCOPÍA FLEXIBLE TRANSOPERATORIA",
    precio_unitario: 69575,
  },
  {
    id: 2,
    codigo: "20.01.934",
    descripcion: "SELLOS HEMOSTÁTICOS DE FIBRINA Y/O POLISACÁRIDO",
    precio_unitario: 32362,
  },
  {
    id: 3,
    codigo: "20.01.004",
    descripcion: "CIRUGÍA DE VÁLVULA CON O SIN IMPLANTE DE PRÓTESIS...",
    precio_unitario: 84433,
  },
  {
    id: 4,
    codigo: "20.03.001",
    descripcion: "PROCEDIMIENTOS PULMONARES POR TORACOSCOPÍA",
    precio_unitario: 52614,
  },
  {
    id: 5,
    codigo: "20.01.855",
    descripcion:
      "VÁLVULAS BIOLÓGICAS DE BAJO PERFIL PARA IMPLANTE SUPRANULAR",
    precio_unitario: 130642,
  },
  {
    id: 6,
    codigo: "20.01.001",
    descripcion:
      "REVASCULARIZACIÓN AORTOCORONARIA CON DERIVACIÓN CARDIOPULMONAR",
    precio_unitario: 113955,
  },
  {
    id: 7,
    codigo: "20.01.006",
    descripcion: "CORRECCIÓN QUIRÚRGICA DE CARDIOPATÍAS CONGÉNITAS COMPLEJAS",
    precio_unitario: 100111,
  },
];

export const TEMPLATES: Record<string, TemplateField[]> = {
  viaticos: [
    { name: "mes", label: "Mes (1-12)", type: "number", min: 1, max: 12, required: true },
    { name: "destino", label: "Destino", type: "text", required: true },
    { name: "motivo", label: "Motivo", type: "text", required: true },
    { name: "dias", label: "Días", type: "number", min: 1, required: true },
    { name: "transporte", label: "Transporte ($)", type: "number", min: 0, required: true },
    { name: "hospedaje", label: "Hospedaje ($)", type: "number", min: 0, required: true },
    { name: "alimentacion", label: "Alimentación ($)", type: "number", min: 0, required: true },
    { name: "monto_total", label: "Monto total ($)", type: "number", min: 0, required: true },
  ],
  papeleria: [
    { name: "mes", label: "Mes (1-12)", type: "number", min: 1, max: 12, required: true },
    { name: "insumo", label: "Insumo", type: "text", required: true },
    { name: "unidad", label: "Unidad", type: "text" },
    { name: "cantidad", label: "Cantidad", type: "number", min: 1, required: true },
    { name: "proveedor_estimado", label: "Proveedor estimado", type: "text" },
    { name: "monto_total", label: "Monto total ($)", type: "number", min: 0, required: true },
  ],
  congresos: [
    { name: "mes", label: "Mes (1-12)", type: "number", min: 1, max: 12, required: true },
    { name: "evento", label: "Evento", type: "text", required: true },
    { name: "ciudad", label: "Ciudad", type: "text", required: true },
    { name: "participantes", label: "Participantes", type: "number", min: 1, required: true },
    { name: "cuota", label: "Cuota ($)", type: "number", min: 0, required: true },
    { name: "hospedaje", label: "Hospedaje ($)", type: "number", min: 0, required: true },
    { name: "transporte", label: "Transporte ($)", type: "number", min: 0, required: true },
    { name: "monto_total", label: "Monto total ($)", type: "number", min: 0, required: true },
  ],
  mantenimiento: [
    { name: "mes", label: "Mes (1-12)", type: "number", min: 1, max: 12, required: true },
    { name: "equipo_area", label: "Equipo/Área", type: "text", required: true },
    { name: "frecuencia", label: "Frecuencia", type: "text", required: true },
    { name: "proveedor", label: "Proveedor", type: "text" },
    { name: "monto_total", label: "Monto total ($)", type: "number", min: 0, required: true },
  ],
  capacitacion: [
    { name: "mes", label: "Mes (1-12)", type: "number", min: 1, max: 12, required: true },
    { name: "curso", label: "Curso", type: "text", required: true },
    { name: "proveedor", label: "Proveedor", type: "text", required: true },
    { name: "horas", label: "Horas", type: "number", min: 1, required: true },
    { name: "asistentes", label: "Asistentes", type: "number", min: 1, required: true },
    { name: "monto_total", label: "Monto total ($)", type: "number", min: 0, required: true },
  ],
  publicidad: [
    { name: "mes", label: "Mes (1-12)", type: "number", min: 1, max: 12, required: true },
    { name: "medio", label: "Medio", type: "text", required: true },
    { name: "campana", label: "Campaña", type: "text", required: true },
    { name: "duracion", label: "Duración", type: "text" },
    { name: "monto_total", label: "Monto total ($)", type: "number", min: 0, required: true },
  ],
  otros: [
    { name: "mes", label: "Mes (1-12)", type: "number", min: 1, max: 12, required: true },
    { name: "descripcion", label: "Descripción", type: "text", required: true },
    { name: "justificacion", label: "Justificación", type: "text" },
    { name: "monto_total", label: "Monto total ($)", type: "number", min: 0, required: true },
  ],
};

export const currency = (n: number | string | undefined) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(Number(n || 0));

export function useBudget() {
  const [anio] = useState<number>(2026);
  const [rol, setRol] = useState<string>('area'); // 'area' | 'finanzas'
  const [userCC] = useState<number[]>([]); // vacío = sin restricción por CC en demo

  const [ccId, setCcId] = useState<number>(1);
  const [accountId, setAccountId] = useState<number>(1);

  // Catálogos dinámicos
  const [ccState, setCcState] = useState<CostCenter[]>(COST_CENTERS);
  const [accountsState, setAccountsState] = useState<Account[]>(ACCOUNTS);
  const [usersState, setUsersState] = useState<User[]>(USERS);
  const [owner, setOwner] = useState<string>('');
  const [rls, setRls] = useState<Record<string, any>>({ user_to_cc_ids: {}, user_to_account_ids: {} });

  const account = (accountsState.length ? accountsState : ACCOUNTS).find(a => a.id === accountId);
  const template = TEMPLATES[account?.tipo_gasto || 'otros'] || [];

  // Estado de "BD" en memoria
  const [headers, setHeaders] = useState<Header[]>([]);
  const [lines, setLines] = useState<Line[]>([]);
  const [incomeLines, setIncomeLines] = useState<IncomeLine[]>([]);

  // Form data
  const [form, setForm] = useState<any>({});
  const onChangeField = (name: string, value: any) => setForm((prev: any) => ({ ...prev, [name]: value }));

  // Form data Ingresos
  const [incomeForm, setIncomeForm] = useState<any>({
    cc_id: INCOME_COST_CENTERS[0]?.id || "",
    mes: 1,
    item_id: INCOME_ITEMS[0]?.id || "",
    cantidad: 1,
  });
  const onChangeIncomeField = (name: string, value: any) => setIncomeForm((prev: any) => ({ ...prev, [name]: value }));

  const visibleCC = useMemo(() => {
    const list = ccState.length ? ccState : COST_CENTERS;
    if (rol === 'area' && owner && rls.user_to_cc_ids && rls.user_to_cc_ids[owner]?.length) {
      const allowed = new Set(rls.user_to_cc_ids[owner]);
      return list.filter(c => allowed.has(c.id));
    }
    if (rol === 'area' && userCC.length > 0) {
      return list.filter(c => userCC.includes(c.id));
    }
    return list;
  }, [rol, owner, rls, userCC, ccState]);

  const ensureHeader = () => {
    const existing = headers.find(h => h.anio === anio && h.cc_id === ccId && h.account_id === accountId);
    if (existing) return existing.id;
    const id = headers.length + 1;
    const resolvedOwner = owner || (rol === 'area' ? (usersState[0]?.name || 'Responsable') : 'Finanzas');
    // @ts-ignore - status type assertion if strictly typed
    setHeaders(prev => [...prev, { id, anio, cc_id: ccId, account_id: accountId, owner: resolvedOwner, status: 'draft' }]);
    return id;
  };

  const addLine = () => {
    // 1) Validar campos
    for (const f of template) {
      const value = form[f.name];
      if (f.required && (value === undefined || value === "")) {
        toast.error(`El campo "${f.label}" es obligatorio.`);
        return null;
      }
      if (f.type === "number" && value !== undefined && value !== "") {
        const n = Number(value);
        if (Number.isNaN(n)) { toast.error(`El campo "${f.label}" debe ser numérico.`); return null; }
        if (f.min !== undefined && n < f.min) { toast.error(`El campo "${f.label}" debe ser mayor o igual a ${f.min}.`); return null; }
        if (f.max !== undefined && n > f.max) { toast.error(`El campo "${f.label}" debe ser menor o igual a ${f.max}.`); return null; }
      }
    }

    // 2) Validar mes
    const fMes = Number(form.mes);
    if (!fMes || fMes < 1 || fMes > 12) {
      toast.error("Mes inválido (1-12).");
      return null;
    }

    // 3) Validar monto
    const montoTotalValue = Number(form.monto_total);
    if (!montoTotalValue || montoTotalValue < 0) {
      toast.error("Monto total inválido.");
      return null;
    }

    // 4) Asegurar header
    const headerId = ensureHeader();

    // 5) Evitar duplicado
    const yaExisteMes = lines.some(l => l.header_id === headerId && l.mes === fMes);
    if (yaExisteMes) {
      toast.error("Ya existe un renglón para ese mes en este CC y Cuenta.");
      return null;
    }

    // 6) Crear renglón
    const baseRow = {
      header_id: headerId,
      mes: fMes,
      monto_total: montoTotalValue,
      gasto_real: 0,
      meta: { ...form, mes: String(fMes), monto_total: String(montoTotalValue), gasto_real: "0" },
    };

    setLines(prev => {
      const nextId = prev.length + 1;
      return [...prev, { id: nextId, ...baseRow }];
    });

    setForm({}); // Limpiar form
    toast.success("Renglón agregado exitosamente.");

    // Return info needed for replication modal
    return {
      headerId,
      mes: fMes,
      monto_total: montoTotalValue,
      meta: baseRow.meta
    };
  };

  // Logic to replicate lines (called from UI Modal)
  const replicateLine = (headerId: number, _sourceMes: number, targetMonths: number[], monto_total: number, meta: any) => {
    const validMonths: number[] = [];
    const existingMonths: number[] = [];

    // Filter valid months
    targetMonths.forEach(m => {
      if (lines.some(l => l.header_id === headerId && l.mes === m)) {
        existingMonths.push(m);
      } else {
        validMonths.push(m);
      }
    });

    if (validMonths.length === 0) {
      if (existingMonths.length > 0) toast.warning("No se replicó nada: los meses seleccionados ya existen.");
      return;
    }

    setLines(prev => {
      const next = [...prev];
      let nextId = next.length + 1;
      for (const m of validMonths) {
        next.push({
          id: nextId++,
          header_id: headerId,
          mes: m,
          monto_total: Number(monto_total),
          gasto_real: 0,
          meta: { ...meta, mes: String(m) }
        });
      }
      return next;
    });

    toast.success(`Se replicó en ${validMonths.length} meses.`);
    if (existingMonths.length > 0) {
      toast.info(`Omitidos: ${existingMonths.join(", ")} (ya existían).`);
    }
  };

  const addIncomeLine = () => {
    const { cc_id, mes, item_id, cantidad } = incomeForm;
    const nMes = Number(mes);
    const nCC = Number(cc_id);
    const nItem = Number(item_id);
    const nCant = Number(cantidad);

    if (!nCC) { toast.error("Debes seleccionar un centro de costos."); return; }
    const item = INCOME_ITEMS.find((i) => i.id === nItem);
    if (!item) { toast.error("Artículo inválido."); return; }

    const unitPrice = Number(item.precio_unitario) || 0;
    const total = unitPrice * nCant;

    setIncomeLines((prev) => {
      const nextId = prev.length ? prev[prev.length - 1].id + 1 : 1;
      return [...prev, { id: nextId, cc_id: nCC, mes: nMes, item_id: nItem, cantidad: nCant, total }];
    });
    setIncomeForm((prev: any) => ({ ...prev, cantidad: 1 }));
  };

  const consolidated = useMemo(() => {
    const approvedIds = headers.filter(h => ['approved', 'locked'].includes(h.status)).map(h => h.id);
    return lines.filter(l => approvedIds.includes(l.header_id)).map(l => {
      const h = headers.find(x => x.id === l.header_id);
      if (!h) return null;
      const ccObj = (ccState.length ? ccState : COST_CENTERS).find(c => c.id === h.cc_id);
      const accObj = (accountsState.length ? accountsState : ACCOUNTS).find(a => a.id === h.account_id);
      const presupuesto = l.monto_total || 0;
      const gastoReal = typeof l.gasto_real === "number" ? l.gasto_real : 0;
      return {
        lineId: l.id,
        cc: ccObj?.clave || "",
        cuenta: accObj?.clave || "",
        mes: l.mes,
        presupuesto,
        gasto_real: gastoReal,
        pendiente: Math.max(presupuesto - gastoReal, 0),
      };
    }).filter(Boolean);
  }, [headers, lines, ccState, accountsState]);

  const exportToCSV = () => {
    if (!consolidated || consolidated.length === 0) {
      toast.error("No hay datos aprobados para exportar.");
      return;
    }
    const monthNames: Record<number, string> = { 1: "Enero", 2: "Febrero", 3: "Marzo", 4: "Abril", 5: "Mayo", 6: "Junio", 7: "Julio", 8: "Agosto", 9: "Septiembre", 10: "Octubre", 11: "Noviembre", 12: "Diciembre" };
    const headersCSV = ["Centro de Costos", "Cuenta", "Mes", "Monto"];
    const escapeCSV = (value: any) => {
      const str = String(value ?? "");
      return (str.includes('"') || str.includes(",") || str.includes("\n")) ? `"${str.replace(/"/g, '""')}"` : str;
    };
    const realRows = consolidated.map((r: any) => {
      const mesNombre = monthNames[r.mes] || r.mes;
      return [r.cc || "", r.cuenta || "", mesNombre, r.presupuesto ?? ""];
    });

    const csvContent = headersCSV.join(",") + "\n" + realRows.map((r: any) => r.map(escapeCSV).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "presupuesto_2026_consolidado.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const approveHeader = (id: number, decision: 'approved' | 'rejected' | 'locked') => {
    setHeaders(prev => prev.map(h => h.id === id ? { ...h, status: decision } : h));
  };

  const updateRealExpense = (lineId: number, newValue: string) => {
    const n = Number(newValue);
    if (Number.isNaN(n) || n < 0) {
      toast.error("El gasto real debe ser un número válido.");
      return;
    }
    setLines(prev => prev.map(l => l.id === lineId ? { ...l, gasto_real: n } : l));
  };

  const backlog = useMemo(() => {
    return headers.map(h => ({
      ...h,
      cc: (ccState.length ? ccState : COST_CENTERS).find(c => c.id === h.cc_id)?.clave,
      cuenta: (accountsState.length ? accountsState : ACCOUNTS).find(a => a.id === h.account_id)?.clave,
      totalLineas: lines.filter(l => l.header_id === h.id).length,
      totalMonto: lines.filter(l => l.header_id === h.id).reduce((a, b) => a + b.monto_total, 0)
    }));
  }, [headers, lines, ccState, accountsState]);

  const progressByCostCenter = useMemo(() => {
    if (!backlog || backlog.length === 0) return [];
    // @ts-ignore
    const allCC = Array.from(new Set(backlog.map(b => b.cc).filter(Boolean))).sort();
    return allCC.map(cc => {
      const ccBacklog = backlog.filter(b => b.cc === cc);
      const totalPackages = ccBacklog.length;
      if (totalPackages === 0) return { cc, totalPackages: 0, submittedOrAbove: 0, approvedOrLocked: 0, status: "Pendiente", progress: 0, totalLines: 0, totalAmount: 0 };

      const submittedOrAbove = ccBacklog.filter(b => b.status && b.status !== "draft").length;
      const approvedOrLocked = ccBacklog.filter(b => b.status === "approved" || b.status === "locked").length;
      const status = approvedOrLocked === totalPackages ? "Completado" : submittedOrAbove > 0 ? "En proceso" : "En borrador";
      const progress = Math.round((submittedOrAbove / totalPackages) * 100);
      const totalLines = ccBacklog.reduce((acc, b) => acc + (b.totalLineas || 0), 0);
      const totalAmount = ccBacklog.reduce((acc, b) => acc + (b.totalMonto || 0), 0);

      return { cc, totalPackages, submittedOrAbove, approvedOrLocked, status, progress, totalLines, totalAmount };
    });
  }, [backlog]);

  const incomeSummary = useMemo(() => {
    const grouped: any = {};
    for (const line of incomeLines) {
      const k = `${line.cc_id}|${line.mes}`;
      if (!grouped[k]) grouped[k] = { cc_id: line.cc_id, mes: line.mes, total: 0 };
      grouped[k].total += Number(line.total) || 0;
    }
    return Object.values(grouped).map((r: any) => {
      const cc = INCOME_COST_CENTERS.find(c => c.id === r.cc_id);
      return { cc_clave: cc?.clave || "", cc_nombre: cc?.nombre || "", mes: r.mes, total: r.total };
    });
  }, [incomeLines]);

  return {
    anio, rol, setRol, userCC,
    ccId, setCcId, accountId, setAccountId, owner, setOwner,
    ccState, setCcState, accountsState, setAccountsState, usersState, setUsersState, rls, setRls,
    account, template, visibleCC,
    headers, lines, setLines, incomeLines,
    form, onChangeField, addLine, replicateLine,
    incomeForm, onChangeIncomeField, addIncomeLine,
    consolidated, exportToCSV, approveHeader, updateRealExpense,
    backlog, progressByCostCenter, incomeSummary
  };
}
