import React from 'react';

interface TableRowData {
  bloodGroup: 'A' | 'B' | 'AB' | 'O';
  correctAntigens: string;
  correctAntibodies: string;
}

interface TableFillViewProps {
  rows: TableRowData[];
  userSelections: Record<string, { antigens: string; antibodies: string }>;
  onSelectCell: (bloodGroup: string, field: 'antigens' | 'antibodies', value: string) => void;
  onSubmit: () => void;
}

const ANTIGEN_CHOICES = [
  'KN A',
  'KN B',
  'Cả KN A và KN B',
  'Không có KN A và KN B'
];

const ANTIBODY_CHOICES = [
  'KT α',
  'KT β',
  'Cả KT α và KT β',
  'Không có KT'
];

export const TableFillView: React.FC<TableFillViewProps> = ({
  rows,
  userSelections,
  onSelectCell,
  onSubmit
}) => {
  const allFilled = rows.every(r => {
    const sel = userSelections[r.bloodGroup];
    return sel && sel.antigens && sel.antibodies;
  });

  return (
    <div className="space-y-5">
      <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 font-medium">
        💡 Gợi ý: Chọn đúng loại Kháng nguyên (trên hồng cầu) và Kháng thể (trong huyết tương) cho từng nhóm máu hệ ABO.
      </div>

      <div className="overflow-x-auto rounded-2xl border-2 border-slate-200 bg-white shadow-xs">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="bg-slate-100 text-slate-700 text-xs uppercase tracking-wider border-b-2 border-slate-200">
              <th className="py-3 px-4 font-black w-24">Nhóm máu</th>
              <th className="py-3 px-4 font-black">Kháng nguyên (KN) trên hồng cầu</th>
              <th className="py-3 px-4 font-black">Kháng thể (KT) trong huyết tương</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {rows.map(row => {
              const current = userSelections[row.bloodGroup] || { antigens: '', antibodies: '' };

              return (
                <tr key={row.bloodGroup} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-extrabold text-slate-900 text-base">
                    <span className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 font-black inline-flex items-center justify-center border border-rose-200">
                      {row.bloodGroup}
                    </span>
                  </td>

                  {/* Antigen cell */}
                  <td className="py-3 px-4">
                    <select
                      value={current.antigens}
                      onChange={e => onSelectCell(row.bloodGroup, 'antigens', e.target.value)}
                      className="w-full p-2.5 rounded-xl border-2 border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-800 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all cursor-pointer"
                    >
                      <option value="">-- Chọn Kháng nguyên --</option>
                      {ANTIGEN_CHOICES.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </td>

                  {/* Antibody cell */}
                  <td className="py-3 px-4">
                    <select
                      value={current.antibodies}
                      onChange={e => onSelectCell(row.bloodGroup, 'antibodies', e.target.value)}
                      className="w-full p-2.5 rounded-xl border-2 border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-800 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all cursor-pointer"
                    >
                      <option value="">-- Chọn Kháng thể --</option>
                      {ANTIBODY_CHOICES.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="pt-2 flex justify-end">
        <button
          onClick={onSubmit}
          disabled={!allFilled}
          className={`px-8 py-3.5 rounded-2xl font-bold text-base shadow-md transition-all ${
            allFilled
              ? 'bg-gradient-to-r from-rose-500 to-red-600 text-white hover:from-rose-600 hover:to-red-700 shadow-rose-500/25 cursor-pointer active:scale-98'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          Kiểm tra câu trả lời
        </button>
      </div>
    </div>
  );
};
