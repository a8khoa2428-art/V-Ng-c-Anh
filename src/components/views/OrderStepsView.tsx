import React from 'react';
import { ChevronUp, ChevronDown, Move } from 'lucide-react';

interface StepItem {
  id: string;
  text: string;
  correctOrder: number;
}

interface OrderStepsViewProps {
  currentOrder: StepItem[];
  onMoveStep: (index: number, direction: 'up' | 'down') => void;
  onSubmit: () => void;
}

export const OrderStepsView: React.FC<OrderStepsViewProps> = ({
  currentOrder,
  onMoveStep,
  onSubmit
}) => {
  return (
    <div className="space-y-5">
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center gap-1.5 font-medium">
        <Move className="w-4 h-4 text-rose-500 shrink-0" />
        <span>Sử dụng các nút mũi tên LÊN / XUỐNG để sắp xếp các bước theo đúng trình tự khoa học:</span>
      </div>

      <div className="space-y-3">
        {currentOrder.map((step, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === currentOrder.length - 1;

          return (
            <div
              key={step.id}
              className="p-3.5 sm:p-4 rounded-2xl border-2 border-slate-200 bg-white hover:border-slate-300 shadow-xs flex items-center justify-between gap-3 transition-all"
            >
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 font-black text-sm flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="text-slate-800 text-sm sm:text-base font-semibold pt-1 leading-snug">
                  {step.text}
                </span>
              </div>

              {/* Move Buttons */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => onMoveStep(idx, 'up')}
                  disabled={isFirst}
                  className={`p-2 rounded-xl border transition-all ${
                    isFirst
                      ? 'border-slate-100 text-slate-300 bg-slate-50 cursor-not-allowed'
                      : 'border-slate-200 text-slate-700 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300 active:scale-95 cursor-pointer'
                  }`}
                  title="Di chuyển lên"
                  aria-label="Di chuyển lên"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onMoveStep(idx, 'down')}
                  disabled={isLast}
                  className={`p-2 rounded-xl border transition-all ${
                    isLast
                      ? 'border-slate-100 text-slate-300 bg-slate-50 cursor-not-allowed'
                      : 'border-slate-200 text-slate-700 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300 active:scale-95 cursor-pointer'
                  }`}
                  title="Di chuyển xuống"
                  aria-label="Di chuyển xuống"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-2 flex justify-end">
        <button
          onClick={onSubmit}
          className="px-8 py-3.5 rounded-2xl font-bold text-base shadow-md bg-gradient-to-r from-rose-500 to-red-600 text-white hover:from-rose-600 hover:to-red-700 shadow-rose-500/25 cursor-pointer active:scale-98 transition-all"
        >
          Kiểm tra thứ tự
        </button>
      </div>
    </div>
  );
};
