import React from 'react';
import { Check, X } from 'lucide-react';

interface TrueFalseViewProps {
  statement: string;
  selectedChoice: boolean | null;
  onSelectChoice: (choice: boolean) => void;
  onSubmit: () => void;
}

export const TrueFalseView: React.FC<TrueFalseViewProps> = ({
  statement,
  selectedChoice,
  onSelectChoice,
  onSubmit
}) => {
  return (
    <div className="space-y-6">
      {/* Statement Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/60 border-2 border-amber-200/80 shadow-xs">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-1.5">
          Nhận định cần đánh giá:
        </span>
        <p className="text-base sm:text-lg font-semibold text-slate-800 leading-relaxed">
          &ldquo;{statement}&rdquo;
        </p>
      </div>

      {/* Two Big Choices */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => onSelectChoice(true)}
          className={`p-5 rounded-2xl border-2 flex items-center justify-center gap-3 transition-all cursor-pointer ${
            selectedChoice === true
              ? 'border-emerald-500 bg-emerald-50 ring-4 ring-emerald-200 text-emerald-800 font-black shadow-md'
              : 'border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/40 text-slate-700 font-bold'
          }`}
        >
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              selectedChoice === true ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-600'
            }`}
          >
            <Check className="w-6 h-6 stroke-[3]" />
          </div>
          <span className="text-lg">ĐÚNG</span>
        </button>

        <button
          onClick={() => onSelectChoice(false)}
          className={`p-5 rounded-2xl border-2 flex items-center justify-center gap-3 transition-all cursor-pointer ${
            selectedChoice === false
              ? 'border-rose-500 bg-rose-50 ring-4 ring-rose-200 text-rose-800 font-black shadow-md'
              : 'border-slate-200 bg-white hover:border-rose-300 hover:bg-rose-50/40 text-slate-700 font-bold'
          }`}
        >
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              selectedChoice === false ? 'bg-rose-500 text-white' : 'bg-rose-100 text-rose-600'
            }`}
          >
            <X className="w-6 h-6 stroke-[3]" />
          </div>
          <span className="text-lg">SAI</span>
        </button>
      </div>

      <div className="pt-2 flex justify-end">
        <button
          onClick={onSubmit}
          disabled={selectedChoice === null}
          className={`px-8 py-3.5 rounded-2xl font-bold text-base shadow-md transition-all ${
            selectedChoice !== null
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
