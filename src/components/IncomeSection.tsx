import { INCOME_COST_CENTERS, INCOME_ITEMS, currency } from '../hooks/useBudget';
import { IncomeLine } from '../schemas/types';

interface IncomeSummaryItem {
    cc_clave: string;
    cc_nombre: string;
    mes: number;
    total: number;
}

interface IncomeSectionProps {
    incomeForm: any;
    onChangeIncomeField: (name: string, value: any) => void;
    addIncomeLine: () => void;
    incomeLines: IncomeLine[];
    incomeSummary: IncomeSummaryItem[];
}

export default function IncomeSection({
    incomeForm,
    onChangeIncomeField,
    addIncomeLine,
    incomeLines,
    incomeSummary
}: IncomeSectionProps) {
    return (
        <section className="bg-white rounded-2xl shadow p-5 xl:col-span-2">
            <h2 className="text-lg font-semibold mb-4">
                Presupuesto de Ingresos por Hospital
            </h2>

            {/* Formulario de captura */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {/* Año fijo 2026 */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Año</label>
                    <input
                        type="number"
                        value={2026}
                        disabled
                        className="w-full border rounded px-3 py-2 bg-gray-50"
                    />
                </div>

                {/* Centro de costos */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Centro de Costos
                    </label>
                    <select
                        className="w-full border rounded px-3 py-2"
                        value={incomeForm.cc_id || ""}
                        onChange={(e) => onChangeIncomeField("cc_id", e.target.value)}
                    >
                        <option value="">Selecciona CC...</option>
                        {INCOME_COST_CENTERS.map((cc) => (
                            <option key={cc.id} value={cc.id}>
                                {cc.clave} · {cc.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Mes */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Mes (1–12)</label>
                    <select
                        className="w-full border rounded px-3 py-2"
                        value={incomeForm.mes || ""}
                        onChange={(e) => onChangeIncomeField("mes", Number(e.target.value))}
                    >
                        <option value="">Selecciona mes...</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                </div>

                {/* Procedimiento / artículo */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Procedimiento / Artículo
                    </label>
                    <select
                        className="w-full border rounded px-3 py-2"
                        value={incomeForm.item_id || ""}
                        onChange={(e) => onChangeIncomeField("item_id", e.target.value)}
                    >
                        <option value="">Selecciona...</option>
                        {INCOME_ITEMS.map((it) => (
                            <option key={it.id} value={it.id}>
                                {it.codigo} · {it.descripcion}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Cantidad y totales calculados */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Cantidad estimada
                    </label>
                    <input
                        type="number"
                        min={1}
                        className="w-full border rounded px-3 py-2"
                        value={incomeForm.cantidad || ""}
                        onChange={(e) => onChangeIncomeField("cantidad", e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Precio unitario
                    </label>
                    <input
                        type="text"
                        disabled
                        className="w-full border rounded px-3 py-2 bg-gray-50"
                        value={(() => {
                            const it = INCOME_ITEMS.find(
                                (i) => i.id === Number(incomeForm.item_id)
                            );
                            return it ? currency(it.precio_unitario) : "";
                        })()}
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Importe total
                    </label>
                    <input
                        type="text"
                        disabled
                        className="w-full border rounded px-3 py-2 bg-gray-50"
                        value={(() => {
                            const it = INCOME_ITEMS.find(
                                (i) => i.id === Number(incomeForm.item_id)
                            );
                            const cant = Number(incomeForm.cantidad || 0);
                            if (!it || !cant) return "";
                            return currency(it.precio_unitario * cant);
                        })()}
                    />
                </div>
            </div>

            <button
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 mb-6"
                onClick={addIncomeLine}
            >
                Agregar renglón de ingreso
            </button>

            {/* Renglones capturados */}
            <h3 className="text-md font-semibold mb-2">
                Renglones de ingreso capturados
            </h3>
            <div className="overflow-auto mb-6">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-gray-600">
                            <th className="py-2">CC</th>
                            <th>Mes</th>
                            <th>Procedimiento</th>
                            <th>Cantidad</th>
                            <th>Importe</th>
                        </tr>
                    </thead>
                    <tbody>
                        {incomeLines.map((l) => {
                            const cc = INCOME_COST_CENTERS.find((c) => c.id === l.cc_id);
                            const item = INCOME_ITEMS.find((i) => i.id === l.item_id);
                            return (
                                <tr key={l.id} className="border-t">
                                    <td className="py-2">
                                        {cc?.clave} · {cc?.nombre}
                                    </td>
                                    <td>{l.mes}</td>
                                    <td>{item ? `${item.codigo} · ${item.descripcion}` : ""}</td>
                                    <td>{l.cantidad}</td>
                                    <td className="font-medium">{currency(l.total)}</td>
                                </tr>
                            );
                        })}
                        {incomeLines.length === 0 && (
                            <tr>
                                <td colSpan={5} className="py-4 text-center text-gray-500">
                                    Aún no hay renglones de ingreso capturados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Resumen por CC + mes */}
            <h3 className="text-md font-semibold mb-2">
                Resumen por Centro de Costos y mes
            </h3>
            <div className="overflow-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-gray-600">
                            <th className="py-2">CC</th>
                            <th>Centro de Costos</th>
                            <th>Mes</th>
                            <th>Total proyectado ($)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {incomeSummary.map((r, idx) => (
                            <tr key={idx} className="border-t">
                                <td className="py-2">{r.cc_clave}</td>
                                <td>{r.cc_nombre}</td>
                                <td>{r.mes}</td>
                                <td className="font-medium">{currency(r.total)}</td>
                            </tr>
                        ))}
                        {incomeSummary.length === 0 && (
                            <tr>
                                <td colSpan={4} className="py-4 text-center text-gray-500">
                                    Aún no hay ingresos proyectados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
