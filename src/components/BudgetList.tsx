import { currency } from '../hooks/useBudget';
import { Line, Header } from '../schemas/types';

interface BudgetListProps {
    lines: Line[];
    headers: Header[];
    ccId: number;
    accountId: number;
}

export default function BudgetList({ lines, headers, ccId, accountId }: BudgetListProps) {
    const filteredLines = lines.filter(l =>
        headers.find(h => h.id === l.header_id && h.cc_id === ccId && h.account_id === accountId)
    );

    return (
        <aside className="bg-white rounded-2xl shadow p-5">
            <h3 className="text-md font-semibold mb-2">Renglones capturados</h3>
            <ul className="max-h-72 overflow-auto divide-y">
                {filteredLines.map((l: Line) => (
                    <li key={l.id} className="py-2 text-sm flex justify-between">
                        <span>Mes {l.mes}</span>
                        <span className="font-medium">{currency(l.monto_total)}</span>
                    </li>
                ))}
                {filteredLines.length === 0 && <li className="text-sm text-gray-500">Sin renglones capturados.</li>}
            </ul>
        </aside>
    );
}
