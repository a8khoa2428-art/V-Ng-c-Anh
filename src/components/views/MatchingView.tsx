import React, { useState } from 'react';
import { Link2, Check, RotateCcw } from 'lucide-react';

interface MatchingPair {
  id: string;
  left: string;
  right: string;
}

interface MatchingViewProps {
  pairs: MatchingPair[];
  shuffledRights: { id: string; text: string }[];
  matchedPairs: Record<string, string>; // leftId -> rightId
  onPairChange: (newMatchedPairs: Record<string, string>) => void;
  onSubmit: () => void;
}

export const MatchingView: React.FC<MatchingViewProps> = ({
  pairs,
  shuffledRights,
  matchedPairs,
  onPairChange,
  onSubmit
}) => {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);

  const handleSelectLeft = (leftId: string) => {
    setSelectedLeft(leftId === selectedLeft ? null : leftId);
  };

  const handleSelectRight = (rightId: string) => {
    if (!selectedLeft) return;

    // Check if rightId was already linked to another left, remove that link
    const updated = { ...matchedPairs };
    Object.keys(updated).forEach(k => {
      if (updated[k] === rightId) {
        delete updated[k];
      }
    });

    updated[selectedLeft] = rightId;
    onPairChange(updated);
    setSelectedLeft(null);
  };

  const handleResetPairs = () => {
    onPairChange({});
    setSelectedLeft(null);
  };

  const allPaired = pairs.every(p => Boolean(matchedPairs[p.id]));

  // Visual color mapping for matched pairs
  const pairColors = [
    'border-rose-400 bg-rose-50 text-rose-800',
    'border-sky-400 bg-sky-50 text-sky-800',
    'border-emerald-400 bg-emerald-50 text-emerald-800',
    'border-amber-400 bg-amber-50 text-amber-800'
  ];

  return (
    <div className="space-y-5">
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-medium">
          <Link2 className="w-4 h-4 text-rose-500" />
          <span>Hướng dẫn: Chạm chọn 1 mục ở cột TRÁI, sau đó chạm chọn mục tương ứng ở cột PHẢI.</span>
        </div>
        {Object.keys(matchedPairs).length > 0 && (
          <button
            onClick={handleResetPairs}
            className="text-xs text-rose-600 font-bold hover:underline flex items-center gap-1 ml-2 shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Nối lại</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left column */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Cột A (Khái niệm / Thành phần)
          </span>
          {pairs.map((pair, idx) => {
            const isSelected = selectedLeft === pair.id;
            const pairedRightId = matchedPairs[pair.id];
            const isPaired = Boolean(pairedRightId);
            const colorClass = isPaired ? pairColors[idx % pairColors.length] : '';

            return (
              <button
                key={pair.id}
                onClick={() => handleSelectLeft(pair.id)}
                className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 cursor-pointer ${
                  isSelected
                    ? 'border-rose-500 bg-rose-100 ring-2 ring-rose-300 font-bold shadow-md'
                    : isPaired
                    ? `${colorClass} font-semibold shadow-xs`
                    : 'border-slate-200 bg-white hover:border-slate-300 font-medium'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-sm sm:text-base text-slate-800">{pair.left}</span>
                </div>
                {isPaired && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Right column */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Cột B (Chức năng / Định nghĩa)
          </span>
          {shuffledRights.map((item, idx) => {
            // Find which left pair matched with this item
            const linkedLeftKey = Object.keys(matchedPairs).find(k => matchedPairs[k] === item.id);
            const linkedLeftIndex = linkedLeftKey ? pairs.findIndex(p => p.id === linkedLeftKey) : -1;
            const isPaired = linkedLeftIndex !== -1;
            const colorClass = isPaired ? pairColors[linkedLeftIndex % pairColors.length] : '';

            return (
              <button
                key={item.id}
                onClick={() => handleSelectRight(item.id)}
                disabled={!selectedLeft && !isPaired}
                className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 cursor-pointer ${
                  isPaired
                    ? `${colorClass} font-semibold shadow-xs`
                    : selectedLeft
                    ? 'border-rose-300 bg-white hover:bg-rose-50 hover:border-rose-400 font-medium animate-pulse'
                    : 'border-slate-200 bg-white opacity-70 font-medium cursor-not-allowed'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-800 leading-snug">{item.text}</span>
                </div>
                {isPaired && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white/80 shrink-0">
                    Khớp với {linkedLeftIndex + 1}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <button
          onClick={onSubmit}
          disabled={!allPaired}
          className={`px-8 py-3.5 rounded-2xl font-bold text-base shadow-md transition-all ${
            allPaired
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
