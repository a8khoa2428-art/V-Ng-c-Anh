import React from 'react';
import { CheckCircle2, AlertCircle, ArrowRight, RotateCcw, Star, Award } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  isCorrect: boolean;
  isFirstTry: boolean;
  correctAnswerText: string;
  explanation: string;
  onRetry: () => void;
  onNext: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  isCorrect,
  isFirstTry,
  correctAnswerText,
  explanation,
  onRetry,
  onNext
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 p-6 sm:p-7 transition-transform">
        {isCorrect ? (
          /* CORRECT STATE */
          <div className="text-center space-y-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner">
              <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 animate-bounce" />
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-800">
                {isFirstTry ? 'Chính xác! Xuất sắc lắm!' : 'Đúng rồi! Em đã nhớ bài rồi!'}
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                {isFirstTry ? 'Em trả lời chính xác ngay lần thử đầu tiên!' : 'Tuyệt vời, em đã hiểu và chọn đúng đáp án!'}
              </p>
            </div>

            {/* Stars earned badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800">
              <div className="flex gap-1">
                {isFirstTry ? (
                  <>
                    <Star className="w-5 h-5 fill-amber-400 text-amber-500 animate-spin" style={{ animationDuration: '3s' }} />
                    <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
                    <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
                  </>
                ) : (
                  <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
                )}
              </div>
              <span className="font-extrabold text-sm sm:text-base">
                +{isFirstTry ? '3 sao vàng' : '1 sao khích lệ'}
              </span>
            </div>

            {/* Explanation box */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-left">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wide mb-1">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Ghi nhớ kiến thức chuẩn</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {explanation}
              </p>
            </div>

            <button
              onClick={onNext}
              className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-base sm:text-lg shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
            >
              <span>Tiếp tục câu tiếp theo</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          /* INCORRECT STATE */
          <div className="text-center space-y-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shadow-inner">
              <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 animate-pulse" />
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-800">
                Chưa đúng rồi, cùng xem lại nhé!
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Không sao cả! Hãy đọc kĩ đáp án đúng và lời giải thích bên dưới, sau đó thử lại nhé.
              </p>
            </div>

            {/* Correct answer reveal */}
            <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200 text-left space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 uppercase tracking-wide">
                <span>Đáp án đúng là:</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-rose-200 font-bold text-sm sm:text-base text-rose-900 leading-snug">
                {correctAnswerText}
              </div>

              {/* Brief explanation from syllabus */}
              <div className="pt-1 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <span className="font-semibold text-rose-950">Giải thích chuẩn: </span>
                <span>{explanation}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 italic">
              * Vị trí các đáp án sẽ được xáo trộn để em ghi nhớ bản chất kiến thức.
            </p>

            <button
              onClick={onRetry}
              className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-bold text-base sm:text-lg shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Thử lại câu này ngay</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
