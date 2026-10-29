import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  type Question,
  type MultipleChoiceQuestion,
  type TrueFalseQuestion,
  type MatchingQuestion,
  type TubeDragQuestion,
  type TableFillQuestion,
  type BloodCompatibilityQuestion,
  type OrderStepsQuestion,
  type FillBlankQuestion
} from '../game/questionsData.ts';
import { shuffleArray, checkShortAnswer } from '../game/bloodLogic.ts';
import { soundEngine } from '../utils/soundEffects.ts';
import { MultipleChoiceView } from './views/MultipleChoiceView.tsx';
import { TrueFalseView } from './views/TrueFalseView.tsx';
import { MatchingView } from './views/MatchingView.tsx';
import { TubeDragView } from './views/TubeDragView.tsx';
import { TableFillView } from './views/TableFillView.tsx';
import { BloodCompatibilityView } from './views/BloodCompatibilityView.tsx';
import { OrderStepsView } from './views/OrderStepsView.tsx';
import { FillBlankView } from './views/FillBlankView.tsx';
import { FeedbackModal } from './FeedbackModal.tsx';
import { HelpCircle, Sparkles } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onQuestionCompleted: (questionId: string, earnedStars: number, wasFirstTry: boolean) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onQuestionCompleted
}) => {
  // Track whether the user got it right on the very first try
  const [isFirstTry, setIsFirstTry] = useState<boolean>(true);
  const [feedbackOpen, setFeedbackOpen] = useState<boolean>(false);
  const [isLastCheckCorrect, setIsLastCheckCorrect] = useState<boolean>(false);
  const [correctAnswerSummary, setCorrectAnswerSummary] = useState<string>('');

  // State for multiple choice & blood compatibility
  const [shuffledOptions, setShuffledOptions] = useState<{ id: string; text: string }[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  // State for true/false
  const [selectedTFChoice, setSelectedTFChoice] = useState<boolean | null>(null);

  // State for matching
  const [shuffledRights, setShuffledRights] = useState<{ id: string; text: string }[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});

  // State for tube drag
  const [tubeAssignments, setTubeAssignments] = useState<Record<string, 'upper' | 'lower' | undefined>>({});

  // State for table fill
  const [tableSelections, setTableSelections] = useState<Record<string, { antigens: string; antibodies: string }>>({});

  // State for order steps
  const [currentStepOrder, setCurrentStepOrder] = useState<OrderStepsQuestion['steps']>([]);

  // State for fill blank
  const [fillBlankText, setFillBlankText] = useState<string>('');

  // Initialize or reset question states whenever `question.id` changes
  useEffect(() => {
    setIsFirstTry(true);
    setFeedbackOpen(false);
    setIsLastCheckCorrect(false);
    resetComponentState(true);
  }, [question.id]);

  const resetComponentState = (initialShuffle: boolean = false) => {
    switch (question.type) {
      case 'multiple_choice':
      case 'blood_compatibility': {
        const opts = shuffleArray(question.options);
        setShuffledOptions(opts);
        setSelectedOptionId(null);
        break;
      }
      case 'true_false': {
        setSelectedTFChoice(null);
        break;
      }
      case 'matching': {
        const rights = question.pairs.map(p => ({ id: p.id, text: p.right }));
        setShuffledRights(shuffleArray(rights));
        setMatchedPairs({});
        break;
      }
      case 'tube_drag': {
        setTubeAssignments({});
        break;
      }
      case 'table_fill': {
        setTableSelections({});
        break;
      }
      case 'order_steps': {
        // Shuffle the initial steps if it's currently sorted, or reverse
        const shuffled = shuffleArray(question.steps);
        // Ensure not accidentally already in exact order on start
        const isAlreadyOrdered = shuffled.every((st, idx) => st.correctOrder === idx + 1);
        if (isAlreadyOrdered && shuffled.length > 1) {
          shuffled.reverse();
        }
        setCurrentStepOrder(shuffled);
        break;
      }
      case 'fill_blank': {
        setFillBlankText('');
        break;
      }
    }
  };

  // Prepare correct answer display text
  const getCorrectAnswerDisplay = (): string => {
    switch (question.type) {
      case 'multiple_choice': {
        const correct = question.options.find(o => o.id === question.correctOptionId);
        return correct ? correct.text : '';
      }
      case 'true_false': {
        return question.isCorrect ? 'ĐÚNG' : 'SAI';
      }
      case 'matching': {
        return question.pairs.map((p, idx) => `${idx + 1}. ${p.left} ➔ ${p.right}`).join('\n');
      }
      case 'tube_drag': {
        return 'Tầng trên (Huyết tương): Huyết tương (~90% nước, dinh dưỡng, hormone)\nTầng dưới (Tế bào máu): Hồng cầu, Bạch cầu, Tiểu cầu';
      }
      case 'table_fill': {
        return question.rows
          .map(r => `Nhóm ${r.bloodGroup}: [${r.correctAntigens}] và [${r.correctAntibodies}]`)
          .join('\n');
      }
      case 'blood_compatibility': {
        const correct = question.options.find(o => o.id === question.correctOptionId);
        return correct ? correct.text : (question.willAgglutinate ? 'Có kết dính hồng cầu' : 'Không kết dính');
      }
      case 'order_steps': {
        const sorted = [...question.steps].sort((a, b) => a.correctOrder - b.correctOrder);
        return sorted.map((s, i) => `${i + 1}. ${s.text}`).join('\n');
      }
      case 'fill_blank': {
        return `Từ cần điền là: "${question.correctWord}"`;
      }
    }
  };

  // Evaluate submission
  const handleCheckAnswer = () => {
    soundEngine.playClick();
    let isCorrect = false;

    switch (question.type) {
      case 'multiple_choice': {
        isCorrect = selectedOptionId === question.correctOptionId;
        break;
      }
      case 'true_false': {
        isCorrect = selectedTFChoice === question.isCorrect;
        break;
      }
      case 'matching': {
        isCorrect = question.pairs.every(p => matchedPairs[p.id] === p.id);
        break;
      }
      case 'tube_drag': {
        isCorrect = question.items.every(it => tubeAssignments[it.id] === it.targetZone);
        break;
      }
      case 'table_fill': {
        isCorrect = question.rows.every(r => {
          const sel = tableSelections[r.bloodGroup];
          return (
            sel &&
            sel.antigens === r.correctAntigens &&
            sel.antibodies === r.correctAntibodies
          );
        });
        break;
      }
      case 'blood_compatibility': {
        isCorrect = selectedOptionId === question.correctOptionId;
        break;
      }
      case 'order_steps': {
        isCorrect = currentStepOrder.every((st, idx) => st.correctOrder === idx + 1);
        break;
      }
      case 'fill_blank': {
        isCorrect = checkShortAnswer(fillBlankText, [question.correctWord]);
        break;
      }
    }

    setIsLastCheckCorrect(isCorrect);
    setCorrectAnswerSummary(getCorrectAnswerDisplay());

    if (isCorrect) {
      if (isFirstTry) {
        soundEngine.playCorrectFirstTry();
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 }
          });
        } catch {
          // ignore if canvas unavailable
        }
      } else {
        soundEngine.playCorrectRetry();
      }
    } else {
      soundEngine.playIncorrectEncouraging();
    }

    setFeedbackOpen(true);
  };

  // When user clicks retry in FeedbackModal
  const handleRetryAfterWrong = () => {
    setFeedbackOpen(false);
    setIsFirstTry(false); // No longer first try
    // Reshuffle options so student doesn't memorize option positions!
    resetComponentState(true);
  };

  // When user continues to next question
  const handleNextQuestion = () => {
    setFeedbackOpen(false);
    const earnedStars = isFirstTry ? 3 : 1;
    onQuestionCompleted(question.id, earnedStars, isFirstTry);
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-rose-100 shadow-xl overflow-hidden transition-all">
      {/* Top Banner of Question Card */}
      <div className="bg-gradient-to-r from-rose-50 to-orange-50 px-5 sm:px-8 py-4 border-b border-rose-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
            {questionNumber}
          </span>
          <div>
            <span className="text-xs font-bold text-rose-700 uppercase tracking-wider block">
              {question.stageTitle}
            </span>
            <h2 className="text-base sm:text-lg font-black text-slate-800 leading-tight">
              {question.title}
            </h2>
          </div>
        </div>

        {/* Cognitive badge */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span
            className={`text-[11px] font-bold px-2.5 py-1 rounded-full border shadow-2xs ${
              question.cognitiveLevel === 'nhận biết'
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : question.cognitiveLevel === 'thông hiểu'
                ? 'bg-purple-50 text-purple-700 border-purple-200'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}
          >
            {question.cognitiveLevel.toUpperCase()}
          </span>

          <div
            className={`hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
              isFirstTry
                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                : 'bg-slate-100 text-slate-600'
            }`}
            title={isFirstTry ? 'Trả lời đúng ngay lần đầu nhận 3 sao' : 'Trả lời đúng sau khi xem đáp án nhận 1 sao'}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>{isFirstTry ? 'Tối đa 3 sao' : '1 sao'}</span>
          </div>
        </div>
      </div>

      {/* Main Question Body */}
      <div className="p-5 sm:p-8 space-y-6">
        {/* Question Prompt */}
        <div className="flex items-start gap-3 text-slate-800">
          <HelpCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
          <p className="text-base sm:text-lg font-bold leading-relaxed">
            {question.prompt}
          </p>
        </div>

        {/* Dynamic Interactive Question Type View */}
        {question.type === 'multiple_choice' && (
          <MultipleChoiceView
            options={shuffledOptions}
            selectedOptionId={selectedOptionId}
            onSelectOption={id => setSelectedOptionId(id)}
            onSubmit={handleCheckAnswer}
          />
        )}

        {question.type === 'true_false' && (
          <TrueFalseView
            statement={question.statement}
            selectedChoice={selectedTFChoice}
            onSelectChoice={choice => setSelectedTFChoice(choice)}
            onSubmit={handleCheckAnswer}
          />
        )}

        {question.type === 'matching' && (
          <MatchingView
            pairs={question.pairs}
            shuffledRights={shuffledRights}
            matchedPairs={matchedPairs}
            onPairChange={pairs => setMatchedPairs(pairs)}
            onSubmit={handleCheckAnswer}
          />
        )}

        {question.type === 'tube_drag' && (
          <TubeDragView
            items={question.items}
            assignments={tubeAssignments}
            onAssignItem={(id, zone) => setTubeAssignments(prev => ({ ...prev, [id]: zone }))}
            onSubmit={handleCheckAnswer}
          />
        )}

        {question.type === 'table_fill' && (
          <TableFillView
            rows={question.rows}
            userSelections={tableSelections}
            onSelectCell={(group, field, val) => {
              setTableSelections(prev => ({
                ...prev,
                [group]: {
                  ...(prev[group] || { antigens: '', antibodies: '' }),
                  [field]: val
                }
              }));
            }}
            onSubmit={handleCheckAnswer}
          />
        )}

        {question.type === 'blood_compatibility' && (
          <BloodCompatibilityView
            donorGroup={question.donorGroup}
            recipientGroup={question.recipientGroup}
            willAgglutinate={question.willAgglutinate}
            options={shuffledOptions}
            selectedOptionId={selectedOptionId}
            onSelectOption={id => setSelectedOptionId(id)}
            onSubmit={handleCheckAnswer}
          />
        )}

        {question.type === 'order_steps' && (
          <OrderStepsView
            currentOrder={currentStepOrder}
            onMoveStep={(idx, direction) => {
              const updated = [...currentStepOrder];
              const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
              if (targetIdx >= 0 && targetIdx < updated.length) {
                [updated[idx], updated[targetIdx]] = [updated[targetIdx], updated[idx]];
                setCurrentStepOrder(updated);
              }
            }}
            onSubmit={handleCheckAnswer}
          />
        )}

        {question.type === 'fill_blank' && (
          <FillBlankView
            sentenceParts={question.sentenceParts}
            wordBank={question.wordBank}
            userText={fillBlankText}
            onTextChange={txt => setFillBlankText(txt)}
            onSubmit={handleCheckAnswer}
          />
        )}
      </div>

      {/* Immediate Reveal & Retry Modal */}
      <FeedbackModal
        isOpen={feedbackOpen}
        isCorrect={isLastCheckCorrect}
        isFirstTry={isFirstTry}
        correctAnswerText={correctAnswerSummary}
        explanation={question.explanation}
        onRetry={handleRetryAfterWrong}
        onNext={handleNextQuestion}
      />
    </div>
  );
};
