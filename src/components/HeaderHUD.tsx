import React from 'react';
import { Volume2, VolumeX, Sparkles, BookOpen, Layers, Download } from 'lucide-react';

interface HeaderHUDProps {
  currentStageNumber: number;
  stageTitle: string;
  questionIndex: number;
  totalQuestions: number;
  totalStars: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenStageSelect: () => void;
  onOpenKnowledgeModal: () => void;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({
  currentStageNumber,
  stageTitle,
  questionIndex,
  totalQuestions,
  totalStars,
  isMuted,
  onToggleMute,
  onOpenStageSelect,
  onOpenKnowledgeModal
}) => {
  const progressPercent = totalQuestions > 0 ? Math.round(((questionIndex) / totalQuestions) * 100) : 0;

  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b border-rose-100 shadow-sm sticky top-0 z-30 px-3 sm:px-6 py-2.5 transition-all">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Stage badge and name */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenStageSelect}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs sm:text-sm font-semibold border border-rose-200 transition-colors shadow-xs"
            title="Đổi màn chơi"
            aria-label="Chọn màn chơi"
          >
            <Layers className="w-4 h-4 text-rose-500" />
            <span>Màn {currentStageNumber}</span>
          </button>
          <div className="hidden sm:block">
            <h1 className="text-xs sm:text-sm font-bold text-slate-800 truncate max-w-[200px] md:max-w-[300px]">
              {stageTitle}
            </h1>
          </div>
        </div>

        {/* Progress bar in center */}
        <div className="flex-1 max-w-[180px] sm:max-w-xs flex flex-col gap-1">
          <div className="flex justify-between items-center text-[11px] sm:text-xs font-semibold text-slate-600">
            <span>Câu {questionIndex + 1}/{totalQuestions}</span>
            <span className="text-rose-600 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 sm:h-2.5 bg-rose-100 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-rose-500 to-red-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.max(5, progressPercent)}%` }}
            />
          </div>
        </div>

        {/* Stars and Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Star Counter */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs sm:text-sm font-bold shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400 animate-pulse" />
            <span className="tabular-nums">{totalStars}</span>
            <span className="text-[10px] text-amber-600 hidden xs:inline">sao</span>
          </div>

          {/* Quick Knowledge summary toggle */}
          <button
            onClick={onOpenKnowledgeModal}
            className="p-1.5 sm:p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            title="Xem tóm tắt kiến thức chuẩn"
            aria-label="Xem tóm tắt kiến thức chuẩn"
          >
            <BookOpen className="w-4 h-4 text-slate-600" />
          </button>

          {/* Download offline HTML button */}
          <a
            href="/game_khtn8_tuan_hoan.html"
            download="game_khtn8_mau_va_tuan_hoan.html"
            className="p-1.5 sm:p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors flex items-center gap-1"
            title="Tải file HTML về máy (chạy offline)"
            aria-label="Tải file HTML về máy"
          >
            <Download className="w-4 h-4" />
          </a>

          {/* Mute Audio button */}
          <button
            onClick={onToggleMute}
            className={`p-1.5 sm:p-2 rounded-xl transition-colors ${
              isMuted
                ? 'bg-rose-50 text-rose-500 hover:bg-rose-100'
                : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
            }`}
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            aria-label={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
