import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  QUESTIONS_DATA,
  STAGES_INFO,
  type Question
} from './game/questionsData.ts';
import { shuffleArray } from './game/bloodLogic.ts';
import { soundEngine } from './utils/soundEffects.ts';
import { HeaderHUD } from './components/HeaderHUD.tsx';
import { QuestionCard } from './components/QuestionCard.tsx';
import { GameSummary } from './components/GameSummary.tsx';
import { StageSelectionModal } from './components/StageSelectionModal.tsx';
import { KnowledgeReviewModal } from './components/KnowledgeReviewModal.tsx';
import {
  Play,
  Sparkles,
  Droplet,
  Microscope,
  HeartHandshake,
  ShieldCheck,
  BookOpen,
  Volume2,
  VolumeX,
  Award,
  Layers,
  Download
} from 'lucide-react';

export default function App() {
  // Game states: 'title' | 'playing' | 'summary'
  const [gameState, setGameState] = useState<'title' | 'playing' | 'summary'>('title');

  // Stage selection: 1 | 2 | 3 | 4 | 'all'
  const [selectedStage, setSelectedStage] = useState<number | 'all'>('all');

  // Active question list (shuffled on start/restart)
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  // Scoring and review history
  const [totalStars, setTotalStars] = useState<number>(0);
  const [firstTryCount, setFirstTryCount] = useState<number>(0);
  const [reviewedQuestions, setReviewedQuestions] = useState<
    { question: Question; earnedStars: number }[]
  >([]);

  // Modals & audio
  const [isStageSelectOpen, setIsStageSelectOpen] = useState<boolean>(false);
  const [isKnowledgeModalOpen, setIsKnowledgeModalOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Check ?autostart=1 in query params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') {
      startGame('all');
    }
  }, []);

  // Sync body dataset state for styling and verification
  useEffect(() => {
    document.body.dataset.state =
      gameState === 'title' ? 'title' : gameState === 'summary' ? 'gameover' : 'playing';
  }, [gameState]);

  // Handle keyboard shortcuts (Enter or Space to start on title screen)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState === 'title' && (e.key === 'Enter' || e.code === 'Space')) {
        // Prevent default space scroll
        e.preventDefault();
        startGame(selectedStage);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, selectedStage]);

  // Start or restart a game session
  const startGame = useCallback((stageChoice: number | 'all') => {
    soundEngine.playClick();
    setSelectedStage(stageChoice);

    // Filter questions by stage
    let filtered: Question[] = [];
    if (stageChoice === 'all') {
      filtered = [...QUESTIONS_DATA];
    } else {
      filtered = QUESTIONS_DATA.filter(q => q.stageId === stageChoice);
    }

    // Shuffle question order!
    const shuffledQuestions = shuffleArray(filtered);

    setActiveQuestions(shuffledQuestions);
    setCurrentQuestionIndex(0);
    setTotalStars(0);
    setFirstTryCount(0);
    setReviewedQuestions([]);
    setGameState('playing');
  }, []);

  // Handle question completion
  const handleQuestionCompleted = (
    questionId: string,
    earnedStars: number,
    wasFirstTry: boolean
  ) => {
    setTotalStars(prev => prev + earnedStars);
    if (wasFirstTry) {
      setFirstTryCount(prev => prev + 1);
    }

    const currentQ = activeQuestions[currentQuestionIndex];
    if (currentQ) {
      setReviewedQuestions(prev => [...prev, { question: currentQ, earnedStars }]);
    }

    // Advance to next question or show summary
    if (currentQuestionIndex + 1 < activeQuestions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Completed all questions in session!
      soundEngine.playFanfare();
      setGameState('summary');
    }
  };

  const handleToggleMute = () => {
    const newMuted = soundEngine.toggleMute();
    setIsMuted(newMuted);
  };

  const currentQuestion = activeQuestions[currentQuestionIndex];

  // Title of current stage or general title
  const currentStageTitle = useMemo(() => {
    if (selectedStage === 'all') {
      return currentQuestion ? `Toàn bộ đề mục · ${currentQuestion.stageTitle}` : 'Toàn bộ 4 màn';
    }
    const st = STAGES_INFO.find(s => s.id === selectedStage);
    return st ? st.title : 'Khoa học tự nhiên 8';
  }, [selectedStage, currentQuestion]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/60 via-slate-50 to-amber-50/40 text-slate-900 font-sans flex flex-col selection:bg-rose-500 selection:text-white">
      {/* =================================================================== */}
      {/* 1. TITLE / LANDING SCREEN */}
      {/* =================================================================== */}
      {gameState === 'title' && (
        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 max-w-4xl mx-auto w-full">
          {/* Top floating utility bar */}
          <div className="w-full flex justify-between items-center gap-2 mb-6 flex-wrap">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsKnowledgeModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-rose-50 text-slate-700 text-xs sm:text-sm font-bold border border-slate-200 shadow-2xs transition-colors cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-rose-500" />
                <span>Xem tóm tắt đề cương</span>
              </button>

              <a
                href="/game_khtn8_tuan_hoan.html"
                download="game_khtn8_mau_va_tuan_hoan.html"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-bold border border-emerald-200 shadow-2xs transition-colors cursor-pointer"
                title="Tải về máy tính hoặc điện thoại để chơi offline không cần mạng"
              >
                <Download className="w-4 h-4 text-emerald-600" />
                <span>Tải file HTML (Chơi offline)</span>
              </a>
            </div>

            <button
              onClick={handleToggleMute}
              className={`p-2 rounded-full border transition-colors cursor-pointer ${
                isMuted
                  ? 'bg-rose-50 border-rose-200 text-rose-500'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
              title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
              aria-label={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Hero Emblem & Title */}
          <div className="text-center space-y-4 max-w-2xl">
            {/* Visual Icon Emblem */}
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-rose-500 to-red-600 shadow-xl shadow-rose-500/30 text-white transform hover:rotate-3 transition-transform">
              <Droplet className="w-12 h-12 sm:w-14 sm:h-14 fill-white/20 stroke-[2.2]" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/80 border border-rose-200 text-rose-800 text-xs font-black uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-rose-600 fill-rose-500" />
                <span>Khoa học tự nhiên lớp 8 · Ôn tập giữa kì I</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                MÁU VÀ HỆ TUẦN HOÀN
              </h1>
              <p className="text-slate-600 text-sm sm:text-base font-medium mt-2 max-w-lg mx-auto">
                Game tương tác ghi nhớ kiến thức: Thành phần máu, Nhóm máu ABO, Nguyên tắc truyền máu, Miễn dịch & Vaccine.
              </p>
            </div>

            {/* Feature Highlights Banner */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs text-slate-600 font-semibold">
              <span className="px-3 py-1 bg-white rounded-full border border-slate-200 shadow-2xs">
                ⭐ Không giới hạn lượt thử
              </span>
              <span className="px-3 py-1 bg-white rounded-full border border-slate-200 shadow-2xs">
                💡 Xem đáp án & giải thích khi chưa đúng
              </span>
              <span className="px-3 py-1 bg-white rounded-full border border-slate-200 shadow-2xs">
                🔄 Tự động xáo đáp án để ghi nhớ sâu
              </span>
            </div>

            {/* Primary Action Button */}
            <div className="pt-3">
              <button
                data-start="true"
                onClick={() => startGame(selectedStage)}
                className="w-full sm:w-auto px-10 py-4 rounded-3xl bg-gradient-to-r from-rose-500 via-red-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-black text-lg sm:text-xl shadow-xl shadow-rose-500/30 flex items-center justify-center gap-3 mx-auto cursor-pointer active:scale-98 transition-all group"
              >
                <Play className="w-6 h-6 fill-white group-hover:scale-110 transition-transform" />
                <span>
                  {selectedStage === 'all'
                    ? 'Bắt đầu ôn tập (Tất cả 4 màn)'
                    : `Bắt đầu Màn ${selectedStage}`}
                </span>
              </button>
              <p className="text-[11px] text-slate-400 mt-2">
                Nhấn <strong>Enter</strong> hoặc phím <strong>Cách (Space)</strong> để bắt đầu ngay
              </p>
              <div className="pt-2">
                <a
                  href="/game_khtn8_tuan_hoan.html"
                  download="game_khtn8_mau_va_tuan_hoan.html"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-rose-600 hover:text-rose-700 hover:underline cursor-pointer py-1 px-3 rounded-lg hover:bg-rose-50/80 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Hoặc bấm vào đây để tải file HTML về máy chơi offline</span>
                </a>
              </div>
            </div>
          </div>

          {/* 4 Interactive Stage Cards */}
          <div className="w-full mt-10">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                Chọn màn chơi theo chủ đề (4 màn kiến thức chuẩn):
              </span>
              {selectedStage !== 'all' && (
                <button
                  onClick={() => setSelectedStage('all')}
                  className="text-xs text-rose-600 font-bold hover:underline cursor-pointer"
                >
                  Chọn chơi cả 4 màn
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {STAGES_INFO.map(stage => {
                const isSelected = selectedStage === stage.id;
                return (
                  <button
                    key={stage.id}
                    onClick={() => setSelectedStage(stage.id)}
                    className={`p-4 rounded-3xl border-2 text-left transition-all flex items-start gap-3.5 cursor-pointer ${
                      isSelected
                        ? 'border-rose-500 bg-rose-50/80 ring-2 ring-rose-200 shadow-md'
                        : 'border-slate-200 bg-white hover:border-rose-300 hover:bg-slate-50/80 shadow-xs'
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs ${
                        isSelected ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {stage.id === 1 && <Droplet className="w-6 h-6" />}
                      {stage.id === 2 && <Microscope className="w-6 h-6" />}
                      {stage.id === 3 && <HeartHandshake className="w-6 h-6" />}
                      {stage.id === 4 && <ShieldCheck className="w-6 h-6" />}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black text-rose-600 uppercase tracking-wider">
                          {stage.badge}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-200 text-rose-800">
                            Đã chọn
                          </span>
                        )}
                      </div>
                      <h3 className="font-black text-slate-800 text-sm sm:text-base leading-tight mt-0.5">
                        {stage.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{stage.subtitle}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 2. PLAYING SCREEN */}
      {/* =================================================================== */}
      {gameState === 'playing' && (
        <div className="flex-1 flex flex-col">
          {/* Top Persistent HUD */}
          <HeaderHUD
            currentStageNumber={currentQuestion ? currentQuestion.stageId : 1}
            stageTitle={currentStageTitle}
            questionIndex={currentQuestionIndex}
            totalQuestions={activeQuestions.length}
            totalStars={totalStars}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            onOpenStageSelect={() => setIsStageSelectOpen(true)}
            onOpenKnowledgeModal={() => setIsKnowledgeModalOpen(true)}
          />

          {/* Main Question Area */}
          <main className="flex-1 max-w-3xl mx-auto w-full p-4 sm:p-6 flex flex-col justify-center">
            {currentQuestion ? (
              <QuestionCard
                key={currentQuestion.id}
                question={currentQuestion}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={activeQuestions.length}
                onQuestionCompleted={handleQuestionCompleted}
              />
            ) : (
              <div className="text-center p-8 bg-white rounded-3xl shadow-sm">
                <p className="text-slate-600 font-bold">Không tìm thấy câu hỏi phù hợp.</p>
                <button
                  onClick={() => setGameState('title')}
                  className="mt-4 px-6 py-2.5 rounded-2xl bg-rose-500 text-white font-bold"
                >
                  Quay về màn hình chính
                </button>
              </div>
            )}
          </main>
        </div>
      )}

      {/* =================================================================== */}
      {/* 3. SUMMARY SCREEN */}
      {/* =================================================================== */}
      {gameState === 'summary' && (
        <div className="flex-1 flex flex-col p-4 sm:p-6 max-w-4xl mx-auto w-full justify-center">
          <GameSummary
            totalStars={totalStars}
            totalQuestions={activeQuestions.length}
            firstTryCount={firstTryCount}
            reviewedQuestions={reviewedQuestions}
            stageTitle={currentStageTitle}
            onRestartAll={() => startGame(selectedStage)}
            onOpenStageSelect={() => setIsStageSelectOpen(true)}
            onOpenKnowledgeModal={() => setIsKnowledgeModalOpen(true)}
          />
        </div>
      )}

      {/* Modals */}
      <StageSelectionModal
        isOpen={isStageSelectOpen}
        currentSelectedStage={selectedStage}
        onSelectStage={stage => {
          setIsStageSelectOpen(false);
          startGame(stage);
        }}
        onClose={() => setIsStageSelectOpen(false)}
      />

      <KnowledgeReviewModal
        isOpen={isKnowledgeModalOpen}
        onClose={() => setIsKnowledgeModalOpen(false)}
      />
    </div>
  );
}
