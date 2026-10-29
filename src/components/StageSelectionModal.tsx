import React from 'react';
import { X, Droplet, Microscope, HeartHandshake, ShieldCheck, PlayCircle, Sparkles } from 'lucide-react';
import { STAGES_INFO } from '../game/questionsData.ts';

interface StageSelectionModalProps {
  isOpen: boolean;
  currentSelectedStage: number | 'all';
  onSelectStage: (stage: number | 'all') => void;
  onClose: () => void;
}

export const StageSelectionModal: React.FC<StageSelectionModalProps> = ({
  isOpen,
  currentSelectedStage,
  onSelectStage,
  onClose
}) => {
  if (!isOpen) return null;

  const getStageIcon = (id: number) => {
    switch (id) {
      case 1:
        return <Droplet className="w-6 h-6 text-rose-500" />;
      case 2:
        return <Microscope className="w-6 h-6 text-amber-500" />;
      case 3:
        return <HeartHandshake className="w-6 h-6 text-emerald-500" />;
      case 4:
        return <ShieldCheck className="w-6 h-6 text-blue-500" />;
      default:
        return <Sparkles className="w-6 h-6 text-rose-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-xl font-black text-slate-800">Chọn màn chơi ôn tập</h3>
            <p className="text-xs text-slate-500 mt-0.5">Em có thể chọn từng màn riêng hoặc chơi toàn bộ 4 màn</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
          {/* Option All Stages */}
          <button
            onClick={() => onSelectStage('all')}
            className={`w-full p-4 rounded-2xl border-2 text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
              currentSelectedStage === 'all'
                ? 'border-rose-500 bg-rose-50/70 ring-2 ring-rose-200 shadow-sm'
                : 'border-slate-200 bg-white hover:border-rose-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-xs">
                <PlayCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="font-black text-slate-800 text-sm sm:text-base block">
                  Chơi toàn bộ 4 màn liên tục
                </span>
                <span className="text-xs text-slate-500">
                  Tổng cộng 36 câu ôn tập toàn diện giữa kì I
                </span>
              </div>
            </div>
            {currentSelectedStage === 'all' && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-200 text-rose-800">
                Đang chọn
              </span>
            )}
          </button>

          {/* Individual Stages */}
          {STAGES_INFO.map(stage => {
            const isSelected = currentSelectedStage === stage.id;

            return (
              <button
                key={stage.id}
                onClick={() => onSelectStage(stage.id)}
                className={`w-full p-4 rounded-2xl border-2 text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-rose-500 bg-rose-50/70 ring-2 ring-rose-200 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-rose-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center shadow-2xs">
                    {getStageIcon(stage.id)}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-rose-600 block uppercase tracking-wider">
                      {stage.badge}
                    </span>
                    <span className="font-black text-slate-800 text-sm sm:text-base block leading-snug">
                      {stage.title}
                    </span>
                    <span className="text-xs text-slate-500">{stage.subtitle}</span>
                  </div>
                </div>

                {isSelected && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-200 text-rose-800">
                    Đang chọn
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
