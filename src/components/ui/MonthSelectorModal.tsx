import { useState, useEffect } from 'react';
import Modal from './Modal';

interface MonthSelectorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (months: number[]) => void;
    excludeMonth?: number;
}

export default function MonthSelectorModal({ isOpen, onClose, onConfirm, excludeMonth }: MonthSelectorModalProps) {
    const [selectedMonths, setSelectedMonths] = useState<number[]>([]);
    const months = [
        { value: 1, label: "Enero" },
        { value: 2, label: "Febrero" },
        { value: 3, label: "Marzo" },
        { value: 4, label: "Abril" },
        { value: 5, label: "Mayo" },
        { value: 6, label: "Junio" },
        { value: 7, label: "Julio" },
        { value: 8, label: "Agosto" },
        { value: 9, label: "Septiembre" },
        { value: 10, label: "Octubre" },
        { value: 11, label: "Noviembre" },
        { value: 12, label: "Diciembre" },
    ];

    // Reset selection when opening
    useEffect(() => {
        if (isOpen) setSelectedMonths([]);
    }, [isOpen]);

    const toggleMonth = (m: number) => {
        setSelectedMonths(prev =>
            prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]
        );
    };

    const handleConfirm = () => {
        onConfirm(selectedMonths);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Replicar en otros meses">
            <p className="text-sm text-gray-600 mb-4">Selecciona los meses donde deseas copiar este mismo presupuesto:</p>

            <div className="grid grid-cols-3 gap-2 mb-6">
                {months.map((m) => {
                    const isExcluded = m.value === excludeMonth;
                    const isSelected = selectedMonths.includes(m.value);
                    return (
                        <button
                            key={m.value}
                            disabled={isExcluded}
                            onClick={() => toggleMonth(m.value)}
                            className={`
                px-3 py-2 rounded text-sm font-medium border transition-colors
                ${isExcluded
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                                    : isSelected
                                        ? "bg-blue-50 border-blue-200 text-blue-700 ring-1 ring-blue-500"
                                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                                }
              `}
                        >
                            {m.label}
                        </button>
                    );
                })}
            </div>

            <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                    {selectedMonths.length} meses seleccionados
                </span>
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={selectedMonths.length === 0}
                        className="px-4 py-2 rounded-lg text-white font-medium shadow-sm transition-colors bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Replicar
                    </button>
                </div>
            </div>
        </Modal>
    );
}
