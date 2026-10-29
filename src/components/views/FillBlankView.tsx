import React from 'react';
import { Type } from 'lucide-react';

interface FillBlankViewProps {
  sentenceParts: [string, string];
  wordBank: string[];
  userText: string;
  onTextChange: (text: string) => void;
  onSubmit: () => void;
}

export const FillBlankView: React.FC<FillBlankViewProps> = ({
  sentenceParts,
  wordBank,
  userText,
  onTextChange,
  onSubmit
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && userText.trim()) {
      onSubmit();
    }
  };

  return (
    <div className="space-y-6">
      {/* Sentence with Blank Input Box */}
      <div className="p-6 rounded-3xl bg-amber-50/70 border-2 border-amber-200/90 shadow-xs">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-2">
          Điền vào chỗ trống:
        </span>
        <div className="text-base sm:text-lg font-semibold text-slate-800 leading-relaxed flex flex-wrap items-center gap-2">
          <span>{sentenceParts[0]}</span>
          <div className="relative inline-flex items-center min-w-[140px] max-w-[220px]">
            <input
              type="text"
              value={userText}
              onChange={e => onTextChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nhập hoặc chọn từ..."
              className="w-full px-3 py-1.5 rounded-xl border-2 border-rose-400 bg-white text-rose-800 font-extrabold text-center shadow-xs focus:ring-2 focus:ring-rose-200 focus:outline-none transition-all"
            />
          </div>
          <span>{sentenceParts[1]}</span>
        </div>
      </div>

      {/* Suggested Word Bank Chips */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
          <Type className="w-3.5 h-3.5 text-slate-400" />
          <span>Ngân hàng từ gợi ý (chạm để chọn nhanh):</span>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {wordBank.map(word => {
            const isSelected = userText.trim().toLowerCase() === word.trim().toLowerCase();

            return (
              <button
                key={word}
                type="button"
                onClick={() => onTextChange(word)}
                className={`px-4 py-2 rounded-2xl text-sm font-bold border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-rose-500 bg-rose-500 text-white shadow-md'
                    : 'border-slate-200 bg-white hover:border-rose-300 hover:bg-rose-50/50 text-slate-700 shadow-xs'
                }`}
              >
                {word}
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <button
          onClick={onSubmit}
          disabled={!userText.trim()}
          className={`px-8 py-3.5 rounded-2xl font-bold text-base shadow-md transition-all ${
            userText.trim()
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
