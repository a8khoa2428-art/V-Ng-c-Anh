import React from 'react';

interface MultipleChoiceViewProps {
  options: { id: string; text: string }[];
  selectedOptionId: string | null;
  onSelectOption: (id: string) => void;
  onSubmit: () => void;
}

export const MultipleChoiceView: React.FC<MultipleChoiceViewProps> = ({
  options,
  selectedOptionId,
  onSelectOption,
  onSubmit
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3">
        {options.map((opt, idx) => {
          const letter = String.fromCharCode(65 + idx); // A, B, C, D
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
