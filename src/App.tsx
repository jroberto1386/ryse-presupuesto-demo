import { useBudget } from "./hooks/useBudget";
import BudgetForm from "./components/BudgetForm";
import BudgetList from "./components/BudgetList";
import Dashboard from "./components/Dashboard";
import IncomeSection from "./components/IncomeSection";
import { Toaster } from 'sonner';

export default function App() {
  const {
    anio, rol, setRol,
    ccId, setCcId, accountId, setAccountId, owner, setOwner,
    setCcState, setAccountsState, setUsersState, rls, setRls,
    template, visibleCC,
    headers, lines, incomeLines,
    form, onChangeField, addLine, replicateLine,
    incomeForm, onChangeIncomeField, addIncomeLine,
    consolidated, exportToCSV, approveHeader, updateRealExpense,
    backlog, progressByCostCenter, incomeSummary,
    accountsState, usersState // Added omitted destructured props
  } = useBudget();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col gap-2 sm:flex-row items-start sm:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Demo · Control Presupuestal 2026 · Ryse Médica</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm">Rol:</span>
            <select className="border rounded px-2 py-1" value={rol} onChange={e => setRol(e.target.value)}>
              <option value="area">Usuario de Área</option>
              <option value="finanzas">Finanzas (Admin)</option>
            </select>
            {rol === 'finanzas' && (
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
                    } catch (e: any) {
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
                    } catch (e: any) { alert('JSON inválido: ' + e.message); }
                  }}
                  className="px-3 py-1 rounded-lg bg-fuchsia-600 text-white text-sm"
                >Cargar RLS</button>
              </div>
            )}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <BudgetForm
            anio={anio}
            rol={rol}
            ccId={ccId} setCcId={setCcId}
            accountId={accountId} setAccountId={setAccountId}
            owner={owner} setOwner={setOwner}
            visibleCC={visibleCC}
            accountsState={accountsState}
            usersState={usersState}
            rls={rls}
            template={template}
            form={form}
            onChangeField={onChangeField}
            addLine={addLine}
            replicateLine={replicateLine}
          />

          <BudgetList
            lines={lines}
            headers={headers}
            ccId={ccId}
            accountId={accountId}
          />
        </div>

        {rol === 'finanzas' && (
          <div className="mt-8">
            <Dashboard
              progressByCostCenter={progressByCostCenter}
              backlog={backlog}
              consolidated={consolidated}
              exportToCSV={exportToCSV}
              approveHeader={approveHeader}
              updateRealExpense={updateRealExpense}
            />

            <div className="mt-8">
              <IncomeSection
                incomeForm={incomeForm}
                onChangeIncomeField={onChangeIncomeField}
                addIncomeLine={addIncomeLine}
                incomeLines={incomeLines}
                incomeSummary={incomeSummary}
              />
            </div>
          </div>
        )}

        <footer className="mt-10 text-xs text-gray-500">
          <p>Esta demo es ilustrativa; en producción se usarán base de datos, RLS por CC, y flujos de aprobación formales.</p>
        </footer>
      </div>
      <Toaster position="top-right" richColors />
    </div>
  );
}
