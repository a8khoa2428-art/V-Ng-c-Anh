import React from 'react';
import { Trophy, Star, Sparkles, RotateCcw, CheckCircle2, AlertTriangle, Layers, BookOpen, Download } from 'lucide-react';
import { type Question } from '../game/questionsData.ts';

interface GameSummaryProps {
  totalStars: number;
  totalQuestions: number;
  firstTryCount: number;
  reviewedQuestions: { question: Question; earnedStars: number }[];
  stageTitle: string;
  onRestartAll: () => void;
  onOpenStageSelect: () => void;
  onOpenKnowledgeModal: () => void;
}

export const GameSummary: React.FC<GameSummaryProps> = ({
  totalStars,
  totalQuestions,
  firstTryCount,
  reviewedQuestions,
  stageTitle,
  onRestartAll,
  onOpenStageSelect,
  onOpenKnowledgeModal
}) => {
  const retryCount = totalQuestions - firstTryCount;
  const maxPossibleStars = totalQuestions * 3;
  const scorePercentage = Math.round((totalStars / maxPossibleStars) * 100);

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Hero Victory Card */}
      <div className="bg-gradient-to-br from-rose-500 via-red-500 to-amber-500 rounded-3xl p-6 sm:p-10 text-white shadow-2xl text-center relative overflow-hidden">
        {/* Background decorative circles */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-amber-400/20 blur-xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/30">
            <Trophy className="w-12 h-12 sm:w-14 sm:h-14 text-amber-200" />
          </div>

          <div>
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase bg-white/20 px-3 py-1 rounded-full text-amber-100 border border-white/20">
              Hoàn thành ôn tập xuất sắc
            </span>
            <h2 className="text-2xl sm:text-4xl font-black mt-2 text-white">
              {stageTitle}
            </h2>
            <p className="text-rose-100 text-sm sm:text-base max-w-md mx-auto mt-1 font-medium">
              Em đã hoàn thành trọn vẹn tất cả các câu hỏi ôn tập chủ đề Máu và hệ tuần hoàn!
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto pt-2">
            <div className="bg-white/15 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/20">
              <div className="flex items-center justify-center gap-1 text-amber-300">
                <Star className="w-4 h-4 fill-amber-300" />
                <span className="text-xl sm:text-2xl font-black">{totalStars}</span>
              </div>
              <span className="text-[11px] sm:text-xs text-rose-100 block font-semibold mt-0.5">
                Tổng số sao
              </span>
            </div>

            <div className="bg-white/15 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/20">
              <div className="flex items-center justify-center gap-1 text-emerald-300">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-xl sm:text-2xl font-black">{firstTryCount}</span>
              </div>
              <span className="text-[11px] sm:text-xs text-rose-100 block font-semibold mt-0.5">
                Đúng ngay lần đầu
              </span>
            </div>

            <div className="bg-white/15 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/20">
              <div className="flex items-center justify-center gap-1 text-sky-200">
                <Sparkles className="w-4 h-4" />
                <span className="text-xl sm:text-2xl font-black">{scorePercentage}%</span>
              </div>
              <span className="text-[11px] sm:text-xs text-rose-100 block font-semibold mt-0.5">
                Độ thành thạo
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Questions needing review list */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-100 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-rose-500" />
            <h3 className="font-extrabold text-slate-800 text-lg">
              Sổ tay ghi nhớ sau lượt chơi
            </h3>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
            {retryCount === 0 ? 'Hoàn hảo 100%' : `${retryCount} câu từng cần ôn lại`}
          </span>
        </div>

        {retryCount === 0 ? (
          <div className="p-6 text-center space-y-2 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <p className="font-bold text-base">Tuyệt đỉnh! Toàn bộ các câu đều được em giải quyết ngay lần đầu tiên!</p>
            <p className="text-xs text-emerald-700">Em đã nắm vững 100% nội dung bài học chuẩn.</p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Dưới đây là các câu em đã từng trả lời sai và được hướng dẫn sửa lại. Hãy đọc lại ghi nhớ chuẩn nhé:
            </p>
            {reviewedQuestions
              .filter(item => item.earnedStars < 3)
              .map((item, idx) => (
                <div
                  key={item.question.id}
                  className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-black text-amber-900 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{item.question.title} ({item.question.stageTitle})</span>
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 shrink-0">
                      Đã khắc phục (+1 sao)
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 font-semibold">
                    &ldquo;{item.question.prompt}&rdquo;
                  </p>
                  <div className="text-xs text-slate-700 pt-1 border-t border-amber-200/60 leading-relaxed">
                    <span className="font-bold text-amber-950">Kiến thức chuẩn: </span>
                    <span>{item.question.explanation}</span>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          onClick={onRestartAll}
          className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-bold text-base shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Chơi lại (Xáo câu hỏi & đáp án)</span>
        </button>

        <button
          onClick={onOpenStageSelect}
          className="flex-1 py-4 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-base border-2 border-slate-200 flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all"
        >
          <Layers className="w-5 h-5 text-slate-600" />
          <span>Chọn màn chơi khác</span>
        </button>

        <button
          onClick={onOpenKnowledgeModal}
          className="sm:w-auto py-4 px-5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-base border-2 border-amber-200 flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all"
        >
          <BookOpen className="w-5 h-5 text-amber-600" />
          <span className="hidden sm:inline">Ôn đề cương</span>
        </button>

        <a
          href="/game_khtn8_tuan_hoan.html"
          download="game_khtn8_mau_va_tuan_hoan.html"
          className="sm:w-auto py-4 px-5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-base border-2 border-emerald-300 flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all"
          title="Tải file HTML về máy"
        >
          <Download className="w-5 h-5 text-emerald-700" />
          <span>Tải file HTML</span>
        </a>
      </div>
    </div>
  );
};
