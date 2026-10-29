import React from 'react';
import { ArrowRight, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface BloodCompatibilityViewProps {
  donorGroup: 'A' | 'B' | 'AB' | 'O';
  recipientGroup: 'A' | 'B' | 'AB' | 'O';
  willAgglutinate: boolean;
  options: { id: string; text: string }[];
  selectedOptionId: string | null;
  onSelectOption: (id: string) => void;
  onSubmit: () => void;
}

export const BloodCompatibilityView: React.FC<BloodCompatibilityViewProps> = ({
  donorGroup,
  recipientGroup,
  willAgglutinate,
  options,
  selectedOptionId,
  onSelectOption,
  onSubmit
}) => {
  return (
    <div className="space-y-6">
      {/* Simulation Stage Card */}
      <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Mô phỏng xét nghiệm truyền máu
          </span>
          <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
            <Info className="w-3.5 h-3.5" />
            Quan tâm: KN người cho & KT người nhận
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-around gap-4 py-2">
          {/* Donor */}
          <div className="flex flex-col items-center p-3.5 rounded-2xl bg-white border-2 border-rose-200 shadow-xs w-full sm:w-44 text-center">
            <span className="text-xs font-bold text-slate-500">NGƯỜI CHO</span>
            <div className="w-14 h-14 rounded-2xl bg-rose-500 text-white font-black text-2xl flex items-center justify-center shadow-md my-1.5">
              {donorGroup}
            </div>
            <span className="text-[11px] font-semibold text-rose-700">
              Kháng nguyên (KN) trên hồng cầu
            </span>
          </div>

          {/* Transfer Flow & Agglutination Indicator */}
          <div className="flex flex-col items-center">
            <div className="p-2 rounded-full bg-slate-200 text-slate-600 mb-1">
              <ArrowRight className="w-5 h-5 hidden sm:block" />
              <ArrowRight className="w-5 h-5 block sm:hidden rotate-90" />
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs font-black flex items-center gap-1 shadow-xs ${
                willAgglutinate
                  ? 'bg-rose-100 text-rose-800 border border-rose-300'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              }`}
            >
              {willAgglutinate ? (
                <>
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  <span>KẾT DÍNH HỒNG CẦU</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>KHÔNG KẾT DÍNH</span>
                </>
              )}
            </div>
          </div>

          {/* Recipient */}
          <div className="flex flex-col items-center p-3.5 rounded-2xl bg-white border-2 border-indigo-200 shadow-xs w-full sm:w-44 text-center">
            <span className="text-xs font-bold text-slate-500">NGƯỜI NHẬN</span>
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white font-black text-2xl flex items-center justify-center shadow-md my-1.5">
              {recipientGroup}
            </div>
            <span className="text-[11px] font-semibold text-indigo-700">
              Kháng thể (KT) trong huyết tương
            </span>
          </div>
        </div>
      </div>

      {/* Question prompt for explanation */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
          Chọn giải thích khoa học chính xác:
        </span>

        <div className="grid grid-cols-1 gap-3">
          {options.map((opt, idx) => {
            const letter = String.fromCharCode(65 + idx);
            const isSelected = selectedOptionId === opt.id;

            return (
              <button
                key={opt.id}
                onClick={() => onSelectOption(opt.id)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 group cursor-pointer ${
                  isSelected
                    ? 'border-rose-500 bg-rose-50/80 shadow-md ring-2 ring-rose-200'
                    : 'border-slate-200 bg-white hover:border-rose-300 hover:bg-slate-50/80 shadow-xs'
                }`}
              >
                <span
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-rose-500 text-white'
                      : 'bg-slate-100 text-slate-700 group-hover:bg-rose-100 group-hover:text-rose-700'
                  }`}
                >
                  {letter}
                </span>
                <span className="text-slate-800 text-sm sm:text-base font-medium pt-1 leading-snug">
                  {opt.text}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <button
          onClick={onSubmit}
          disabled={!selectedOptionId}
          className={`px-8 py-3.5 rounded-2xl font-bold text-base shadow-md transition-all ${
            selectedOptionId
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
