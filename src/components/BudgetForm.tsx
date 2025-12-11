import { useState } from 'react';
import { ACCOUNTS, USERS } from '../hooks/useBudget';
import MonthSelectorModal from './ui/MonthSelectorModal';
import { CostCenter, Account, User, TemplateField } from '../schemas/types';

interface BudgetFormProps {
    anio: number;
    rol: string;
    ccId: number;
    setCcId: (id: number) => void;
    accountId: number;
    setAccountId: (id: number) => void;
    owner: string;
    setOwner: (owner: string) => void;
    visibleCC: CostCenter[];
    accountsState: Account[];
    usersState: User[];
    rls: any; // TODO: Define RLS type strictly
    template: TemplateField[];
    form: any;
    onChangeField: (name: string, value: any) => void;
    addLine: () => any;
    replicateLine: (headerId: number, sourceMes: number, targetMonths: number[], total: number, meta: any) => void;
}

export default function BudgetForm({
    anio,
    rol,
    ccId, setCcId,
    accountId, setAccountId,
    owner, setOwner,
    visibleCC,
    accountsState,
    usersState,
    rls,
    template,
    form,
    onChangeField,
    addLine,
    replicateLine
}: BudgetFormProps) {
    const [showReplicateModal, setShowReplicateModal] = useState(false);
    const [lastAddedLine, setLastAddedLine] = useState<{ headerId: number, mes: number, monto_total: number, meta: any } | null>(null);

    const handleAddLine = () => {
        const result = addLine();
        if (result) {
            setLastAddedLine(result);
            setShowReplicateModal(true);
        }
    };

    const confirmReplication = (months: number[]) => {
        if (lastAddedLine && months.length > 0) {
            replicateLine(
                lastAddedLine.headerId,
                lastAddedLine.mes,
                months,
                lastAddedLine.monto_total,
                lastAddedLine.meta
            );
        }
    };

    return (
        <>
            <section className="lg:col-span-2 bg-white rounded-2xl shadow p-5">
                <h2 className="text-lg font-semibold mb-4">Captura presupuestal</h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Año</label>
                        <input className="w-full border rounded px-3 py-2 bg-gray-100" value={anio} readOnly />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Centro de Costos</label>
                        <select className="w-full border rounded px-3 py-2" value={ccId} onChange={e => setCcId(Number(e.target.value))}>
                            {visibleCC.map(c => (
                                <option key={c.id} value={c.id}>{c.clave} · {c.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Cuenta</label>
                        <select className="w-full border rounded px-3 py-2" value={accountId} onChange={e => setAccountId(Number(e.target.value))}>
                            {(() => {
                                const list = accountsState.length ? accountsState : ACCOUNTS;
                                if (rol === 'area' && owner && rls.user_to_account_ids && rls.user_to_account_ids[owner]?.length) {
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
                        <select className="w-full border rounded px-3 py-2" value={owner} onChange={e => setOwner(e.target.value)}>
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
                    <button onClick={handleAddLine} className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow">Agregar renglón</button>
                </div>
            </section>

            <MonthSelectorModal
                isOpen={showReplicateModal}
                onClose={() => setShowReplicateModal(false)}
                onConfirm={confirmReplication}
                excludeMonth={lastAddedLine?.mes}
            />
        </>
    );
}
