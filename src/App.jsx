
import React, { useMemo, useState } from "react";

// ======== Datos de muestra ========
const COST_CENTERS = [
  {"id":1,"clave":"TIJ","nombre":"TIJ"},
  {"id":2,"clave":"IMSS LEO","nombre":"IMSS LEO"},
  {"id":3,"clave":"IMSS TORR","nombre":"IMSS TORR"},
  {"id":4,"clave":"TORR TX","nombre":"TORR TX"},
  {"id":5,"clave":"SEDENA","nombre":"SEDENA"},
  {"id":6,"clave":"HGR","nombre":"HGR"},
  {"id":7,"clave":"IMSS GDL","nombre":"IMSS GDL"},
  {"id":8,"clave":"CMNO OFT","nombre":"CMNO OFT"},
  {"id":9,"clave":"INC","nombre":"INC"},
  {"id":10,"clave":"BIOMEDIC","nombre":"BIOMEDIC"},
  {"id":11,"clave":"DIRADJ","nombre":"DIRADJ"},
  {"id":12,"clave":"OPERA","nombre":"OPERA"},
  {"id":13,"clave":"IMSS TOR","nombre":"IMSS TOR"},
  {"id":14,"clave":"CMNO","nombre":"CMNO"},
  {"id":15,"clave":"VTAS","nombre":"VTAS"},
  {"id":16,"clave":"ADMON","nombre":"ADMON"},
  {"id":17,"clave":"DIRGRAL","nombre":"DIRGRAL"},
  {"id":18,"clave":"SISTEC","nombre":"SISTEC"},
  {"id":19,"clave":"ASUN REG","nombre":"ASUN REG"},
  {"id":20,"clave":"SERVADM","nombre":"SERVADM"},
  {"id":21,"clave":"COMPRAS","nombre":"COMPRAS"},
  {"id":22,"clave":"HOSTING","nombre":"HOSTING"},
  {"id":23,"clave":"IMSS TIJ","nombre":"IMSS TIJ"}
];
const ACCOUNTS = [
  {"id":1,"clave":"VIATICOS COMPROBADOS","nombre":"Viaticos Comprobados","tipo_gasto":"viaticos"},
  {"id":2,"clave":"MANTENIMIENTO DE MOB Y EQPO DE OFICINA","nombre":"Mantenimiento De Mob Y Eqpo De Oficina","tipo_gasto":"papeleria"},
  {"id":3,"clave":"INSTRUMENTAL MEDICO","nombre":"Instrumental Medico","tipo_gasto":"otros"},
  {"id":4,"clave":"EQUIPO MEDICO","nombre":"Equipo Medico","tipo_gasto":"otros"},
  {"id":5,"clave":"COSTO DE REPARACION","nombre":"Costo De Reparacion","tipo_gasto":"mantenimiento"},
  {"id":6,"clave":"CAPACITACION AL PERSONAL","nombre":"Capacitacion Al Personal","tipo_gasto":"capacitacion"},
  {"id":7,"clave":"GASTOS NOTARIALES","nombre":"Gastos Notariales","tipo_gasto":"otros"},
  {"id":8,"clave":"TRADUCCIONES","nombre":"Traducciones","tipo_gasto":"otros"},
  {"id":9,"clave":"SERVICIOS DE APOYO ADMINISTRATIVO","nombre":"Servicios De Apoyo Administrativo","tipo_gasto":"otros"},
  {"id":10,"clave":"REGISTRO DE MARCAS Y PATENTES","nombre":"Registro De Marcas Y Patentes","tipo_gasto":"otros"},
  {"id":11,"clave":"MOBILIARIO Y EQUIPO MENOR","nombre":"Mobiliario Y Equipo Menor","tipo_gasto":"otros"},
  {"id":12,"clave":"UNIFORMES","nombre":"Uniformes","tipo_gasto":"otros"},
  {"id":13,"clave":"MATERIAL PARA  CAPACITACION","nombre":"Material Para  Capacitacion","tipo_gasto":"capacitacion"},
  {"id":14,"clave":"PASAJES Y ESTACIONAMIENTOS","nombre":"Pasajes Y Estacionamientos","tipo_gasto":"viaticos"},
  {"id":15,"clave":"UTILES DE TRABAJO","nombre":"Utiles De Trabajo","tipo_gasto":"papeleria"},
  {"id":16,"clave":"ASEO Y LIMPIEZA","nombre":"Aseo Y Limpieza","tipo_gasto":"otros"},
  {"id":17,"clave":"MENSAJERIA Y PAQUETERIA","nombre":"Mensajeria Y Paqueteria","tipo_gasto":"otros"},
  {"id":18,"clave":"NO DEDUCIBLE","nombre":"No Deducible","tipo_gasto":"otros"},
  {"id":19,"clave":"MANTENIMIENTO DE EQPO DE TRANSPORTE","nombre":"Mantenimiento De Eqpo De Transporte","tipo_gasto":"mantenimiento"},
  {"id":20,"clave":"COMIDAS AL PERSONAL","nombre":"Comidas Al Personal","tipo_gasto":"otros"},
  {"id":21,"clave":"TENENCIAS Y DERECHOS VEHICULARES","nombre":"Tenencias Y Derechos Vehiculares","tipo_gasto":"otros"},
  {"id":22,"clave":"DIVERSOS","nombre":"Diversos","tipo_gasto":"otros"},
  {"id":23,"clave":"SEGUROS Y PRIMAS","nombre":"Seguros Y Primas","tipo_gasto":"otros"},
  {"id":24,"clave":"SOFTWARE Y ACCESORIOS COMPUTO","nombre":"Software Y Accesorios Computo","tipo_gasto":"otros"},
  {"id":25,"clave":"CUOTAS Y SUSCRIPCIONES","nombre":"Cuotas Y Suscripciones","tipo_gasto":"otros"},
  {"id":26,"clave":"PROMOCIONES EN VENTAS","nombre":"Promociones En Ventas","tipo_gasto":"publicidad"},
  {"id":27,"clave":"SERVICIOS ADMINISTRATIVOS","nombre":"Servicios Administrativos","tipo_gasto":"otros"},
  {"id":28,"clave":"PAPELERIA Y ART DE OFICINA","nombre":"Papeleria Y Art De Oficina","tipo_gasto":"papeleria"},
  {"id":29,"clave":"PROTECCION CIVIL","nombre":"Proteccion Civil","tipo_gasto":"otros"},
  {"id":30,"clave":"MANTENIMIENTO DEL LOCAL Y OFICINA","nombre":"Mantenimiento Del Local Y Oficina","tipo_gasto":"mantenimiento"},
  {"id":31,"clave":"EQUIPO DE COMPUTO AF","nombre":"Equipo De Computo Af","tipo_gasto":"otros"},
  {"id":32,"clave":"TELEFONO FAX Y CORREO","nombre":"Telefono Fax Y Correo","tipo_gasto":"otros"},
  {"id":33,"clave":"HONORARIOS A PERSONAS FISICAS","nombre":"Honorarios A Personas Fisicas","tipo_gasto":"otros"},
  {"id":34,"clave":"EXPOSICIONES Y CONGRESOS","nombre":"Exposiciones Y Congresos","tipo_gasto":"congresos"},
  {"id":35,"clave":"PUBLICIDAD Y PROPAGANDAS","nombre":"Publicidad Y Propagandas","tipo_gasto":"publicidad"},
  {"id":36,"clave":"ARRENDAMIENTO EQUIPO MEDICO","nombre":"Arrendamiento Equipo Medico","tipo_gasto":"otros"},
  {"id":37,"clave":"ARRENDAMIENTO DE LOCAL Y OFICINA","nombre":"Arrendamiento De Local Y Oficina","tipo_gasto":"otros"},
  {"id":38,"clave":"ARRENDAMIENTO DE AUTOS","nombre":"Arrendamiento De Autos","tipo_gasto":"otros"},
  {"id":39,"clave":"SERVICIOS DE VIGILANCIA","nombre":"Servicios De Vigilancia","tipo_gasto":"otros"},
  {"id":40,"clave":"GASOLINA","nombre":"Gasolina","tipo_gasto":"otros"},
  {"id":41,"clave":"FINIQUITOS","nombre":"Finiquitos","tipo_gasto":"otros"},
  {"id":42,"clave":"PRESTACIONES","nombre":"Prestaciones","tipo_gasto":"otros"},
  {"id":43,"clave":"SUELDOS Y SALARIOS","nombre":"Sueldos Y Salarios","tipo_gasto":"otros"}
];
const USERS = [
  {"id":1,"name":"ASISTENCIA BIOMEDICA"},
  {"id":2,"name":"ASUNTOS REGULATORIOS"},
  {"id":3,"name":"TECNOVIGILANCIA"},
  {"id":4,"name":"ALMACÉN"},
  {"id":5,"name":"ADMINISTRACIÓN Y FINANZAS"},
  {"id":6,"name":"RECURSOS HUMANOS"},
  {"id":7,"name":"CALIDAD"},
  {"id":8,"name":"SEGURIDAD E HIGIENE"},
  {"id":9,"name":"SISTEMA DE GESTIÓN DE CALIDAD"},
  {"id":10,"name":"SISTEMAS"},
  {"id":11,"name":"VENTAS"},
  {"id":12,"name":"ASISTENCIA BIOMÉDICA"},
  {"id":13,"name":"ALTA DIRECCIÓN"},
  {"id":14,"name":"LICITACIONES"},
  {"id":15,"name":"CUENTAS POR PAGAR"},
  {"id":16,"name":"TESORERIA"},
  {"id":17,"name":"DIR ADMON Y FINANZAS"}
];

// ======== Plantillas por tipo de gasto ========
const TEMPLATES = {
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

// ======== Utilidades ========
const currency = (n) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(Number(n||0));

function groupBy(arr, keys) {
  return arr.reduce((acc, item) => {
    const k = keys.map(k => String(item[k])).join("|");
    if (!acc[k]) acc[k] = [];
    acc[k].push(item);
    return acc;
  }, {});
}

export default function App() {
  const [anio] = useState(2026);
  const [rol, setRol] = useState('area'); // 'area' | 'finanzas'
  const [userCC] = useState([]); // vacío = sin restricción por CC en demo

  const [ccId, setCcId] = useState(1);
  const [accountId, setAccountId] = useState(1);

  // Catálogos dinámicos (pueden cargarse por JSON en modo Finanzas)
  const [ccState, setCcState] = useState(COST_CENTERS);
  const [accountsState, setAccountsState] = useState(ACCOUNTS);
  const [usersState, setUsersState] = useState(USERS);
  const [owner, setOwner] = useState('');
  const [rls, setRls] = useState({ user_to_cc_ids: {}, user_to_account_ids: {} });

  const account = (accountsState.length ? accountsState : ACCOUNTS).find(a => a.id === accountId);
  const template = TEMPLATES[account?.tipo_gasto || 'otros'] || [];

  // Estado de "BD" en memoria
  const [headers, setHeaders] = useState([]); // {id, anio, cc_id, account_id, owner, status}
  const [lines, setLines] = useState([]); // {id, header_id, mes, monto_total, meta}

  // Form data
  const [form, setForm] = useState({});

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

  const onChangeField = (name, value) => setForm(prev => ({ ...prev, [name]: value }));

  const ensureHeader = () => {
    const existing = headers.find(h => h.anio===anio && h.cc_id===ccId && h.account_id===accountId);
    if (existing) return existing.id;
    const id = headers.length + 1;
    const resolvedOwner = owner || (rol === 'area' ? (usersState[0]?.name || 'Responsable') : 'Finanzas');
    setHeaders(prev => [...prev, { id, anio, cc_id: ccId, account_id: accountId, owner: resolvedOwner, status: 'draft' }]);
    return id;
  };

const addLine = () => {
  // 0) Tabla para mostrar mes bonito en mensajes
  const monthNames = {
    1: "Enero",
    2: "Febrero",
    3: "Marzo",
    4: "Abril",
    5: "Mayo",
    6: "Junio",
    7: "Julio",
    8: "Agosto",
    9: "Septiembre",
    10: "Octubre",
    11: "Noviembre",
    12: "Diciembre",
  };

  // 1) Validar campos según la plantilla del tipo de gasto
  for (const f of template) {
    const value = form[f.name];

    if (f.required && (value === undefined || value === "")) {
      alert(`El campo "${f.label}" es obligatorio.`);
      return;
    }

    if (f.type === "number" && value !== undefined && value !== "") {
      const n = Number(value);
      if (Number.isNaN(n)) {
        alert(`El campo "${f.label}" debe ser numérico.`);
        return;
      }
      if (f.min !== undefined && n < f.min) {
        alert(`El campo "${f.label}" debe ser mayor o igual a ${f.min}.`);
        return;
      }
      if (f.max !== undefined && n > f.max) {
        alert(`El campo "${f.label}" debe ser menor o igual a ${f.max}.`);
        return;
      }
    }
  }

// 2) Validar mes (guardamos siempre 1–12)
const fMes = Number(form.mes);
if (!fMes || fMes < 1 || fMes > 12) {
  alert("Mes inválido (1-12).");
  return;
}

// 3) Validar monto_total (usamos lo que ya venga en el formulario)
const montoTotalValue = Number(form.monto_total);
if (!montoTotalValue || montoTotalValue < 0) {
alert("Monto total inválido.");
return;
}

  // 4) Asegurar el header (paquete año + CC + cuenta)
  const headerId = ensureHeader();

  // 5) Evitar duplicado de mes para esta combinación
  const yaExisteMes = lines.some(
    (l) => l.header_id === headerId && l.mes === fMes
  );
  if (yaExisteMes) {
    alert(
      "Ya existe un renglón para ese mes en este centro de costos y cuenta. Usa edición si quieres modificarlo."
    );
    return;
  }

  // 6) Armar renglón base (mes original)
  const baseRow = {
  header_id: headerId,
  mes: fMes,
  monto_total: montoTotalValue,
  meta: { ...form, mes: String(fMes), monto_total: String(montoTotalValue) },
};


  // Lista de renglones a insertar (1 + N meses replicados)
  const rowsToAdd = [baseRow];

  const nombreMes = monthNames[fMes] || fMes;

  // 7) Preguntar si quiere copiar a varios meses adicionales
  const quiereReplicar = window.confirm(
    `Se agregó el renglón para el mes de ${nombreMes}.\n\n¿Quieres copiar EXACTAMENTE este mismo importe a OTROS meses adicionales?`
  );

  if (quiereReplicar) {
    const entrada = window.prompt(
      "Escribe los meses adicionales (1-12) separados por coma.\nEjemplo: 2,3,4,5,6,7,8,9,10,11,12"
    );

    if (entrada && entrada.trim() !== "") {
      const partes = entrada
        .split(",")
        .map((p) => p.trim())
        .filter((p) => p !== "");

      const mesesNumericos = partes
        .map((p) => Number(p))
        .filter((n) => !Number.isNaN(n));

      // Normalizar: solo 1–12, sin el mes original, sin duplicados
      const vistos = new Set();
      const mesesValidos = [];
      for (const m of mesesNumericos) {
        if (m < 1 || m > 12) continue;
        if (m === fMes) continue; // no repetir el original
        if (vistos.has(m)) continue;
        vistos.add(m);
        mesesValidos.push(m);
      }

      if (mesesValidos.length === 0) {
        alert("No se detectaron meses adicionales válidos para replicar.");
      } else {
        // Para cada mes válido, si no existe ya, lo agregamos
        const yaExistian = [];
        const agregados = [];

        for (const m of mesesValidos) {
          const existeMes = lines.some(
            (l) => l.header_id === headerId && l.mes === m
          );
          if (existeMes) {
            yaExistian.push(m);
          } else {
            agregados.push(m);
            rowsToAdd.push({
              header_id: headerId,
              mes: m,
              monto_total: Number(form.monto_total),
              meta: { ...form, mes: String(m) },
            });
          }
        }

        // Mensaje de resumen para el usuario
        if (agregados.length > 0) {
          const listaOk = agregados
            .map((m) => monthNames[m] || m)
            .join(", ");
          alert(
            `Se replicó el renglón en los meses: ${listaOk}.`
          );
        }

        if (yaExistian.length > 0) {
          const listaYa = yaExistian
            .map((m) => monthNames[m] || m)
            .join(", ");
          alert(
            `No se replicó en los meses ${listaYa} porque ya tenían renglones cargados para este centro de costos y cuenta.`
          );
        }
      }
    }
  }

  // 8) Insertar todos los renglones (1 o más) con IDs consecutivos
  setLines((prev) => {
    const next = [...prev];
    let nextId = next.length + 1;
    for (const row of rowsToAdd) {
      next.push({ id: nextId++, ...row });
    }
    return next;
  });

  // 9) Limpiar formulario
  setForm({});
};

// 🚀 Exportar el consolidado (aprobado/bloqueado) a CSV / Excel
const exportToCSV = () => {
  if (!consolidated || consolidated.length === 0) {
    alert("No hay datos aprobados o bloqueados para exportar.");
    return;
  }

  // Mapeo de mes numérico a nombre
  const monthNames = {
    1: "Enero",
    2: "Febrero",
    3: "Marzo",
    4: "Abril",
    5: "Mayo",
    6: "Junio",
    7: "Julio",
    8: "Agosto",
    9: "Septiembre",
    10: "Octubre",
    11: "Noviembre",
    12: "Diciembre",
  };

  const headersCSV = ["Centro de Costos", "Cuenta", "Mes", "Monto"];

  const escapeCSV = (value) => {
    const str = String(value ?? "");
    if (str.includes('"') || str.includes(",") || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = consolidated.map((r) => {
    const mesNombre = monthNames[r.mes] || r.mes;
    return [
      r.cc || "",
      r.cuenta || "",
      mesNombre,
      r.monto ?? "",
    ];
  });

  const csvContent =
    headersCSV.join(",") +
    "\n" +
    rows.map((r) => r.map(escapeCSV).join(",")).join("\n");

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




  const submitHeader = () => {
    const headerId = ensureHeader();
    setHeaders(prev => prev.map(h => h.id===headerId ? { ...h, status: 'submitted' } : h));
  };

  const approveHeader = (id, decision) => {
    setHeaders(prev => prev.map(h => h.id===id ? { ...h, status: decision } : h));
  };

  const consolidated = useMemo(() => {
    const approvedIds = headers.filter(h => ['approved','locked'].includes(h.status)).map(h => h.id);
    const rows = lines.filter(l => approvedIds.includes(l.header_id)).map(l => {
      const h = headers.find(x => x.id === l.header_id);
      return {
        cc_id: h.cc_id,
        account_id: h.account_id,
        mes: l.mes,
        monto: l.monto_total,
      };
    });
    const grouped = groupBy(rows, ['cc_id','account_id','mes']);
    const output = Object.entries(grouped).map(([key, items]) => {
      const [cc_id, account_id, mes] = key.split('|').map(Number);
      const sum = items.reduce((a,b) => a + b.monto, 0);
      const ccList = ccState.length ? ccState : COST_CENTERS; const cc = ccList.find(c => c.id===cc_id);
      const accList = accountsState.length ? accountsState : ACCOUNTS; const acc = accList.find(a => a.id===account_id);
      return { cc: cc?.clave || '', cuenta: acc?.clave || '', mes, monto: sum };
    }).sort((a,b) => a.cc.localeCompare(b.cc) || a.cuenta.localeCompare(b.cuenta) || a.mes - b.mes);
    return output;
  }, [headers, lines, ccState, accountsState]);

  const backlog = useMemo(() => {
    return headers.map(h => ({
      ...h,
      cc: (ccState.length ? ccState : COST_CENTERS).find(c => c.id===h.cc_id)?.clave,
      cuenta: (accountsState.length ? accountsState : ACCOUNTS).find(a => a.id===h.account_id)?.clave,
      totalLineas: lines.filter(l => l.header_id===h.id).length,
      totalMonto: lines.filter(l => l.header_id===h.id).reduce((a,b)=>a+b.monto_total,0)
    }));
  }, [headers, lines, ccState, accountsState]);
// Mapa de avance por Centro de Costos basado en backlog
const progressByCostCenter = useMemo(() => {
  if (!backlog || backlog.length === 0) return [];

  // Lista única de centros de costos presentes en el backlog
  const allCC = Array.from(
    new Set(backlog.map((b) => b.cc).filter(Boolean))
  ).sort();

  return allCC.map((cc) => {
    const ccBacklog = backlog.filter((b) => b.cc === cc);
    const totalPackages = ccBacklog.length;

    if (totalPackages === 0) {
      return {
        cc,
        totalPackages: 0,
        submittedOrAbove: 0,
        approvedOrLocked: 0,
        status: "Pendiente",
        progress: 0,
        totalLines: 0,
        totalAmount: 0,
      };
    }

    const submittedOrAbove = ccBacklog.filter(
      (b) => b.status && b.status !== "draft"
    ).length;

    const approvedOrLocked = ccBacklog.filter(
      (b) => b.status === "approved" || b.status === "locked"
    ).length;

    const status =
      approvedOrLocked === totalPackages
        ? "Completado"
        : submittedOrAbove > 0
        ? "En proceso"
        : "En borrador";

    // % de avance = paquetes al menos "submitted" / paquetes totales
    const progress = Math.round(
      (submittedOrAbove / totalPackages) * 100
    );

    // Sumamos renglones y montos desde el backlog
    const totalLines = ccBacklog.reduce(
      (acc, b) => acc + (b.totalLineas || 0),
      0
    );
    const totalAmount = ccBacklog.reduce(
      (acc, b) => acc + (b.totalMonto || 0),
      0
    );

    return {
      cc,
      totalPackages,
      submittedOrAbove,
      approvedOrLocked,
      status,
      progress,
      totalLines,
      totalAmount,
    };
  });
}, [backlog]);


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col gap-2 sm:flex-row items-start sm:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Demo · Control Presupuestal 2026 · Ryse Médica</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm">Rol:</span>
            <select className="border rounded px-2 py-1" value={rol} onChange={e=>setRol(e.target.value)}>
              <option value="area">Usuario de Área</option>
              <option value="finanzas">Finanzas (Admin)</option>
            </select>
            {rol==='finanzas' && (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const raw = prompt('Pega aquí el JSON de configuración (COST_CENTERS, ACCOUNTS, USERS)');
                    if (!raw) return;
                    try {
                      const parsed = JSON.parse(raw);
                      if (parsed.COST_CENTERS) setCcState(parsed.COST_CENTERS);
                      if (parsed.ACCOUNTS) setAccountsState(parsed.ACCOUNTS);
                      if (parsed.USERS) setUsersState(parsed.USERS);
                      alert('Catálogos cargados correctamente.');
                    } catch(e){
                      alert('JSON inválido: ' + e.message);
                    }
                  }}
                  className="px-3 py-1 rounded-lg bg-indigo-600 text-white text-sm"
                >Cargar config</button>
                <button
                  onClick={() => {
                    const raw = prompt('Pega aquí el JSON de RLS (rls_from_presupuesto.json)');
                    if (!raw) return;
                    try {
                      const parsed = JSON.parse(raw);
                      if (parsed.RLS) setRls(parsed.RLS);
                      if (parsed.DIMENSIONS?.COST_CENTERS) setCcState(parsed.DIMENSIONS.COST_CENTERS);
                      if (parsed.DIMENSIONS?.ACCOUNTS) setAccountsState(parsed.DIMENSIONS.ACCOUNTS);
                      if (parsed.DIMENSIONS?.USERS) setUsersState(parsed.DIMENSIONS.USERS);
                      alert('RLS y catálogos cargados.');
                    } catch(e){ alert('JSON inválido: ' + e.message); }
                  }}
                  className="px-3 py-1 rounded-lg bg-fuchsia-600 text-white text-sm"
                >Cargar RLS</button>
              </div>
            )}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 bg-white rounded-2xl shadow p-5">
            <h2 className="text-lg font-semibold mb-4">Captura presupuestal</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Año</label>
                <input className="w-full border rounded px-3 py-2 bg-gray-100" value={anio} readOnly />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Centro de Costos</label>
                <select className="w-full border rounded px-3 py-2" value={ccId} onChange={e=>setCcId(Number(e.target.value))}>
                  {visibleCC.map(c => (
                    <option key={c.id} value={c.id}>{c.clave} · {c.nombre}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Cuenta</label>
                <select className="w-full border rounded px-3 py-2" value={accountId} onChange={e=>setAccountId(Number(e.target.value))}>
                  {(() => {
                    const list = accountsState.length ? accountsState : ACCOUNTS;
                    if (rol==='area' && owner && rls.user_to_account_ids && rls.user_to_account_ids[owner]?.length) {
                      const allowed = new Set(rls.user_to_account_ids[owner]);
                      return list.filter(a => allowed.has(a.id)).map(a => (
                        <option key={a.id} value={a.id}>{a.clave} · {a.nombre}</option>
                      ));
                    }
                    return list.map(a => (
                      <option key={a.id} value={a.id}>{a.clave} · {a.nombre}</option>
                    ));
                  })()}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Responsable / Área</label>
                <select className="w-full border rounded px-3 py-2" value={owner} onChange={e=>setOwner(e.target.value)}>
                  <option value="">Selecciona…</option>
                  {(usersState.length ? usersState : USERS).map(u => (
                    <option key={u.id} value={u.name}>{u.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {template.map((f) => (
    <div key={f.name}>
      <label className="block text-sm text-gray-600 mb-1">{f.label}</label>

      {/* Campo especial: MES como lista desplegable */}
      {f.name === "mes" ? (
        <select
  value={form[f.name] || ""}
  onChange={(e) => onChangeField(f.name, e.target.value)}
  className="w-full border rounded px-3 py-2 bg-white"
  required={f.required}
>
  <option value="">Selecciona mes…</option>

  <option value="1">Enero</option>
  <option value="2">Febrero</option>
  <option value="3">Marzo</option>
  <option value="4">Abril</option>
  <option value="5">Mayo</option>
  <option value="6">Junio</option>
  <option value="7">Julio</option>
  <option value="8">Agosto</option>
  <option value="9">Septiembre</option>
  <option value="10">Octubre</option>
  <option value="11">Noviembre</option>
  <option value="12">Diciembre</option>
</select>

      ) : (
        <input
          type={f.type}
          min={f.min}
          max={f.max}
          required={f.required}
          value={form[f.name] || ""}
          onChange={(e) => onChangeField(f.name, e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      )}
    </div>
  ))}
</div>



            <div className="flex gap-3 mt-5">
              <button onClick={addLine} className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow">Agregar renglón</button>
        
            </div>
          </section>

          <aside className="bg-white rounded-2xl shadow p-5">
            <h3 className="text-md font-semibold mb-2">Renglones capturados</h3>
            <ul className="max-h-72 overflow-auto divide-y">
              {lines.filter(l => headers.find(h => h.id===l.header_id && h.cc_id===ccId && h.account_id===accountId)).map(l => (
                <li key={l.id} className="py-2 text-sm flex justify-between">
                  <span>Mes {l.mes}</span>
                  <span className="font-medium">{currency(l.monto_total)}</span>
                </li>
              ))}
              {lines.length === 0 && <li className="text-sm text-gray-500">Sin renglones capturados.</li>}
            </ul>
          </aside>
        </div>

        {rol === 'finanzas' && (
          <div className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-6">
          
<section className="bg-white rounded-2xl shadow p-5">
  <h2 className="text-lg font-semibold mb-3">Mapa de avance por Centro de Costos</h2>
  
  <div className="overflow-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-gray-600">
          <th className="py-2">Centro de Costos</th>
          <th>Estatus</th>
          <th>Avance</th>
          <th>Paquetes</th>
          <th>Renglones</th>
          <th>Total capturado</th>
        </tr>
      </thead>
      <tbody>
        {progressByCostCenter.map((r) => (
          <tr key={r.cc} className="border-t">
            <td className="py-2">{r.cc}</td>
            <td>
              <span
                className={`px-2 py-1 rounded text-white text-xs ${
                  r.status === "Completado"
                    ? "bg-emerald-600"
                    : r.status === "En proceso"
                    ? "bg-amber-500"
                    : r.status === "En borrador"
                    ? "bg-slate-500"
                    : "bg-gray-400"
                }`}
              >
                {r.status}
              </span>
            </td>
            <td className="w-48">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-blue-600"
                    style={{ width: `${r.progress}%` }}
                  />
                </div>
                <span className="text-xs text-gray-700 w-10 text-right">
                  {r.progress}%
                </span>
              </div>
            </td>
            <td>{r.totalPackages}</td>
            <td>{r.totalLines}</td>
            <td className="font-medium">
              {currency(r.totalAmount)}
            </td>
          </tr>
        ))}

        {progressByCostCenter.length === 0 && (
          <tr>
            <td colSpan={6} className="py-6 text-center text-gray-500">
              Aún no hay centros de costos con capturas.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</section>

            <section className="bg-white rounded-2xl shadow p-5">
              <h2 className="text-lg font-semibold mb-3">Backlog (por paquete)</h2>
              <button
  onClick={exportToCSV}
  className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
>
  Exportar consolidado a Excel (CSV)
</button>

              <div className="overflow-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-600">
                      <th className="py-2">ID</th>
                      <th>CC</th>
                      <th>Cuenta</th>
                      <th>Owner</th>
                      <th>Estatus</th>
                      <th># Líneas</th>
                      <th>Total</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {backlog.map(b => (
                      <tr key={b.id} className="border-t">
                        <td className="py-2">{b.id}</td>
                        <td>{b.cc}</td>
                        <td>{b.cuenta}</td>
                        <td>{b.owner}</td>
                        <td>
                          <span className={`px-2 py-1 rounded text-white text-xs ${b.status==='submitted' ? 'bg-amber-600' : b.status==='approved' ? 'bg-emerald-600' : b.status==='rejected' ? 'bg-rose-600' : b.status==='locked' ? 'bg-gray-800' : 'bg-gray-400'}`}>{b.status}</span>
                        </td>
                        <td>{b.totalLineas}</td>
                        <td className="font-medium">{currency(b.totalMonto)}</td>
                        <td className="space-x-2">
                          <button onClick={()=>approveHeader(b.id,'approved')} className="px-2 py-1 rounded bg-emerald-600 text-white">Aprobar</button>
                          <button onClick={()=>approveHeader(b.id,'rejected')} className="px-2 py-1 rounded bg-rose-600 text-white">Rechazar</button>
                          <button onClick={()=>approveHeader(b.id,'locked')} className="px-2 py-1 rounded bg-gray-800 text-white">Bloquear</button>
                        </td>
                      </tr>
                    ))}
                    {backlog.length===0 && (
                      <tr><td colSpan={8} className="py-6 text-center text-gray-500">Aún no hay paquetes capturados.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow p-5">
              <h2 className="text-lg font-semibold mb-3">Consolidado (aprobado/bloqueado)</h2>
              <div className="overflow-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-600">
                      <th className="py-2">CC</th>
                      <th>Cuenta</th>
                      <th>Mes</th>
                      <th>Monto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {consolidated.map((r, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="py-2">{r.cc}</td>
                        <td>{r.cuenta}</td>
                        <td>{r.mes}</td>
                        <td className="font-medium">{currency(r.monto)}</td>
                      </tr>
                    ))}
                    {consolidated.length===0 && (
                      <tr><td colSpan={4} className="py-6 text-center text-gray-500">Sin datos aprobados.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}

        <footer className="mt-10 text-xs text-gray-500">
          <p>Esta demo es ilustrativa; en producción se usarán base de datos, RLS por CC, y flujos de aprobación formales.</p>
        </footer>
      </div>
    </div>
  );
}
