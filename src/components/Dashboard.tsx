import StatCard from './StatCard';
import { currency } from '../hooks/useBudget';

interface DashboardProps {
    progressByCostCenter: any[]; // TODO: Define strict type
    backlog: any[]; // TODO: Define strict type
    consolidated: any[]; // TODO: Define strict type
    exportToCSV: () => void;
    approveHeader: (id: number, decision: 'approved' | 'rejected' | 'locked') => void;
    updateRealExpense: (lineId: number, newValue: string) => void;
}

export default function Dashboard({
    progressByCostCenter,
    backlog,
    consolidated,
    exportToCSV,
    approveHeader,
    updateRealExpense
}: DashboardProps) {
    return (
        <div className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Mapa de avance por centro de costos */}
            <StatCard title="Mapa de avance por Centro de Costos">
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
                                            className={`px-2 py-1 rounded text-white text-xs ${r.status === "Completado"
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
            </StatCard>

            {/* Backlog */}
            <StatCard title="Backlog (por paquete)">
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
                                        <span className={`px-2 py-1 rounded text-white text-xs ${b.status === 'submitted' ? 'bg-amber-600' : b.status === 'approved' ? 'bg-emerald-600' : b.status === 'rejected' ? 'bg-rose-600' : b.status === 'locked' ? 'bg-gray-800' : 'bg-gray-400'}`}>{b.status}</span>
                                    </td>
                                    <td>{b.totalLineas}</td>
                                    <td className="font-medium">{currency(b.totalMonto)}</td>
                                    <td className="space-x-2">
                                        <button onClick={() => approveHeader(b.id, 'approved')} className="px-2 py-1 rounded bg-emerald-600 text-white">Aprobar</button>
                                        <button onClick={() => approveHeader(b.id, 'rejected')} className="px-2 py-1 rounded bg-rose-600 text-white">Rechazar</button>
                                        <button onClick={() => approveHeader(b.id, 'locked')} className="px-2 py-1 rounded bg-gray-800 text-white">Bloquear</button>
                                    </td>
                                </tr>
                            ))}
                            {backlog.length === 0 && (
                                <tr><td colSpan={8} className="py-6 text-center text-gray-500">Aún no hay paquetes capturados.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </StatCard>

            {/* Consolidado */}
            <StatCard title="Consolidado (aprobado/bloqueado)" className="xl:col-span-2">
                <div className="overflow-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-gray-600">
                                <th className="py-2">CC</th>
                                <th>Cuenta</th>
                                <th>Mes</th>
                                <th>Presupuesto ($)</th>
                                <th>Gasto real ($)</th>
                                <th>Pendiente ($)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {consolidated.map((r) => (
                                <tr key={r.lineId} className="border-t">
                                    <td className="py-2">{r.cc}</td>
                                    <td>{r.cuenta}</td>
                                    <td>{r.mes}</td>
                                    <td className="font-medium">
                                        {currency(r.presupuesto)}
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            min={0}
                                            className="w-28 border rounded px-2 py-1 text-right"
                                            value={r.gasto_real}
                                            onChange={(e) =>
                                                updateRealExpense(r.lineId, e.target.value)
                                            }
                                        />
                                    </td>
                                    <td className="font-medium">
                                        {currency(r.pendiente)}
                                    </td>
                                </tr>
                            ))}

                            {consolidated.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="py-6 text-center text-gray-500">
                                        Sin datos aprobados.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </StatCard>
        </div>
    );
}
