import React from 'react';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

interface TubeItem {
  id: string;
  name: string;
  targetZone: 'upper' | 'lower';
  hint: string;
}

interface TubeDragViewProps {
  items: TubeItem[];
  assignments: Record<string, 'upper' | 'lower' | undefined>; // itemId -> zone
  onAssignItem: (itemId: string, zone: 'upper' | 'lower') => void;
  onSubmit: () => void;
}

export const TubeDragView: React.FC<TubeDragViewProps> = ({
  items,
  assignments,
  onAssignItem,
  onSubmit
}) => {
  const upperItems = items.filter(it => assignments[it.id] === 'upper');
  const lowerItems = items.filter(it => assignments[it.id] === 'lower');
  const unassignedItems = items.filter(it => !assignments[it.id]);

  const allAssigned = items.every(it => Boolean(assignments[it.id]));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        {/* Test Tube Illustration Column */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50/80 rounded-3xl border-2 border-slate-200">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Ống nghiệm máu sau khi lắng tách lớp
          </span>

          <div className="relative w-36 h-72 rounded-b-full border-4 border-slate-400 bg-white shadow-inner flex flex-col overflow-hidden">
            {/* Top opening rim */}
            <div className="w-full h-4 bg-slate-200 border-b-2 border-slate-300 shrink-0" />

            {/* UPPER ZONE: Plasma */}
            <div
              className={`w-full flex-1 bg-gradient-to-b from-amber-100 to-amber-200 p-2 border-b-2 border-dashed border-amber-400 flex flex-col items-center justify-center transition-all ${
                upperItems.length > 0 ? 'bg-amber-200/90' : ''
              }`}
            >
              <div className="text-center">
                <span className="text-xs font-black text-amber-900 block bg-amber-300/80 px-2 py-0.5 rounded-full shadow-2xs">
                  TẦNG TRÊN (Huyết tương)
                </span>
                <span className="text-[10px] text-amber-800 font-semibold mt-0.5 block">
                  (~90% là nước, lỏng nhẹ)
                </span>
              </div>
              <div className="mt-1 flex flex-wrap gap-1 justify-center max-w-[120px]">
                {upperItems.map(it => (
                  <span
                    key={it.id}
                    className="text-[10px] font-bold bg-white text-amber-950 px-1.5 py-0.5 rounded-md border border-amber-300 shadow-xs truncate max-w-[110px]"
                    title={it.name}
                  >
                    ✓ {it.name.split('(')[0].trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* LOWER ZONE: Formed Elements */}
            <div
              className={`w-full flex-1 bg-gradient-to-b from-rose-400 to-red-600 p-2 flex flex-col items-center justify-center transition-all ${
                lowerItems.length > 0 ? 'bg-red-700/95' : ''
              }`}
            >
              <div className="text-center">
                <span className="text-xs font-black text-white block bg-red-800/80 px-2 py-0.5 rounded-full shadow-2xs">
                  TẦNG DƯỚI (Tế bào máu)
                </span>
                <span className="text-[10px] text-red-100 font-semibold mt-0.5 block">
                  (Hồng cầu, Bạch cầu, Tiểu cầu)
                </span>
              </div>
              <div className="mt-1 flex flex-wrap gap-1 justify-center max-w-[120px]">
                {lowerItems.map(it => (
                  <span
                    key={it.id}
                    className="text-[10px] font-bold bg-white text-red-900 px-1.5 py-0.5 rounded-md border border-red-300 shadow-xs truncate max-w-[110px]"
                    title={it.name}
                  >
                    ✓ {it.name.split('(')[0].trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Item Selection Column */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Các thành phần cần xếp vào ống nghiệm ({items.length - unassignedItems.length}/{items.length} đã xếp):
            </span>

            <div className="space-y-2.5">
              {items.map(it => {
                const currentZone = assignments[it.id];

                return (
                  <div
                    key={it.id}
                    className={`p-3 rounded-2xl border-2 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                      currentZone === 'upper'
                        ? 'border-amber-400 bg-amber-50/70 shadow-xs'
                        : currentZone === 'lower'
                        ? 'border-rose-400 bg-rose-50/70 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex-1 pr-2">
                      <span className="font-bold text-sm text-slate-800 block">{it.name}</span>
                      <span className="text-xs text-slate-500">{it.hint}</span>
                    </div>

                    {/* Zone Assignment Buttons */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => onAssignItem(it.id, 'upper')}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                          currentZone === 'upper'
                            ? 'bg-amber-500 text-white shadow-xs'
                            : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                        }`}
                      >
                        <ArrowUpCircle className="w-3.5 h-3.5" />
                        <span>Tầng trên</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onAssignItem(it.id, 'lower')}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                          currentZone === 'lower'
                            ? 'bg-rose-500 text-white shadow-xs'
                            : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                        }`}
                      >
                        <ArrowDownCircle className="w-3.5 h-3.5" />
                        <span>Tầng dưới</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <button
          onClick={onSubmit}
          disabled={!allAssigned}
          className={`px-8 py-3.5 rounded-2xl font-bold text-base shadow-md transition-all ${
            allAssigned
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
