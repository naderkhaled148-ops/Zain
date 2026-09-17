import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/curriculumData';
import { QuizQuestion, DifficultyLevel } from '../types';
import { getDifficultyConfig } from '../data/difficultyData';
import { sound } from '../utils/soundEffects';
import { Sparkles, Trophy, CheckCircle2, RotateCcw, Volume2, Award, Heart, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizModalProps {
  onEarnRewards: (stars: number, coins: number, xp: number) => void;
  onFinishQuiz?: () => void;
  difficultyLevel?: DifficultyLevel;
  onOpenSettings?: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ 
  onEarnRewards,
  difficultyLevel = 'medium',
  onOpenSettings 
}) => {
  const diffConfig = getDifficultyConfig(difficultyLevel);

  // Filter or prioritize questions based on difficulty
  const activeQuestions: QuizQuestion[] = React.useMemo(() => {
    if (difficultyLevel === 'easy') {
      // Easy: focus on foundational sound, word-match, and basic math with high hints
      return QUIZ_QUESTIONS.filter(q => q.type === 'sound' || q.type === 'word-match' || q.id === 'q6');
    }
    return QUIZ_QUESTIONS;
  }, [difficultyLevel]);

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const question: QuizQuestion = activeQuestions[currentIdx] || activeQuestions[0];

  const handleSelectAnswer = (option: string) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
    setIsAnswered(true);

    const isCorrect = option === question.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
      sound.playSuccess();
      sound.speakPraise();
      const stars = difficultyLevel === 'hard' ? 3 : 2;
      const coins = difficultyLevel === 'hard' ? 8 : 5;
      const xp = Math.round(20 * diffConfig.rewardMultiplier);
      onEarnRewards(stars, coins, xp);
      confetti({
        particleCount: difficultyLevel === 'hard' ? 45 : 30,
        spread: 50,
        origin: { y: 0.6 }
      });
    } else {
      sound.playTryAgain();
      sound.speakEncouragement();
    }
  };

  const handleNext = () => {
    sound.playPop();
    setIsAnswered(false);
    setSelectedAnswer(null);

    if (currentIdx + 1 < activeQuestions.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      // Finished all questions!
      setQuizFinished(true);
      sound.playFanfare();
      sound.speakArabic('مَبْرُوكٌ يَا بَطَل! لَقَدْ أَكْمَلْتَ الِاخْتِبَارَ بِنَجَاحٍ بَاهِر!');
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 }
      });
    }
  };

  const handleRestart = () => {
    sound.playPop();
    setCurrentIdx(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setQuizFinished(false);
  };

  // Certificate / Results Screen
  if (quizFinished) {
    const total = activeQuestions.length;
    const percentage = Math.round((score / total) * 100);

    return (
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border-4 border-amber-300 text-center max-w-xl mx-auto my-6 relative overflow-hidden">
        {/* Ribbon decoration */}
        <div className="text-6xl mb-3 animate-bounce">🏆</div>
        
        <span className="text-xs uppercase font-bold text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
          شَهَادَةُ تَفَوُّق وَإِتْقَان
        </span>

        <h3 className="text-2xl sm:text-3xl font-black font-kids text-slate-800 mt-2">
          مَبْرُوكٌ يَا بَطَلَ الصَّفِّ الْأَوَّل!
        </h3>

        <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
          لَقَدْ أَجَبْتَ عَلَى <strong className="text-emerald-600 text-lg">{score}</strong> مِنْ أَقْصَى <strong className="text-slate-800 text-lg">{total}</strong> أَسْئِلَة بِنِسْبَةِ ({percentage}%)!
        </p>

        {/* Big Score Box */}
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-5 my-6 border-2 border-amber-200 flex items-center justify-around">
          <div>
            <div className="text-3xl font-black font-kids text-amber-600">⭐ {score * (difficultyLevel === 'hard' ? 3 : 2)}</div>
            <div className="text-xs font-bold text-slate-500">نُجُوم مُكْتَسَبَة</div>
          </div>
          <div className="h-10 w-px bg-amber-200" />
          <div>
            <div className="text-3xl font-black font-kids text-yellow-600">🪙 {score * (difficultyLevel === 'hard' ? 8 : 5)}</div>
            <div className="text-xs font-bold text-slate-500">عُمْلَات ذَهَبِيَّة</div>
          </div>
        </div>

        <button
          onClick={handleRestart}
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:scale-95 text-white font-black font-kids text-lg px-8 py-3 rounded-2xl shadow-md inline-flex items-center gap-2 transition-all cursor-pointer"
        >
          <RotateCcw className="w-5 h-5" />
          <span>إِعَادَةُ الِاخْتِبَار لِجَمْعِ الْمَزِيد</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-amber-100 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            <h2 className="text-xl font-black font-kids text-slate-800">
              الِاخْتِبَارُ التَّقْيِيمِيُّ الذَّكِيّ
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            أَسْئِلَةٌ مُسْتَوْحَاةٌ مِنْ تَقْيِيمَاتِ كِتَابِ سِلاحِ التِّلْمِيذِ الشَّامِلَةِ.
          </p>
        </div>

        {/* Progress & Audio & Difficulty */}
        <div className="flex items-center gap-2">
          {onOpenSettings && (
            <button
              onClick={() => {
                sound.playPop();
                onOpenSettings();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs border transition-all hover:scale-105 cursor-pointer ${diffConfig.borderClass} ${diffConfig.bgClass} ${diffConfig.textClass}`}
              title="تعديل مستوى الصعوبة في الإعدادات"
            >
              <span>{diffConfig.icon}</span>
              <span>المستوى: {diffConfig.labelShort}</span>
              <span className="text-[10px] opacity-75 underline mr-1">(تغيير)</span>
            </button>
          )}

          <button
            onClick={() => sound.speakArabic(question.question)}
            className="flex items-center gap-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 px-3 py-1.5 rounded-xl font-bold text-xs cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-amber-700" />
            <span>اقْرَأْ لِي السُّؤَال</span>
          </button>
          <span className="text-xs font-bold bg-amber-100 text-amber-900 px-3 py-1.5 rounded-full">
            السُّؤَال {currentIdx + 1} مِنْ {activeQuestions.length}
          </span>
        </div>
      </div>

      {/* Progress Line */}
      <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden p-0.5">
        <div 
          className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-300"
          style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
        />
      </div>

      {/* Active Question Box */}
      <div className="bg-gradient-to-br from-amber-50 via-white to-purple-50 rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-purple-200 text-center">
        {question.emojiHint && (
          <div className="text-5xl sm:text-6xl mb-3 animate-playful">
            {question.emojiHint}
          </div>
        )}

        <h3 className="text-xl sm:text-2xl font-black font-kids text-slate-800 mb-6">
          {question.question}
        </h3>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
          {question.options.map((opt) => {
            const isSelected = selectedAnswer === opt;
            const isCorrect = opt === question.correctAnswer;

            let style = 'bg-white hover:bg-purple-50 text-slate-800 border-2 border-slate-200';
            if (isAnswered) {
              if (isCorrect) {
                style = 'bg-emerald-500 text-white border-2 border-emerald-600 shadow-md scale-102';
              } else if (isSelected) {
                style = 'bg-rose-500 text-white border-2 border-rose-600';
              } else {
                style = 'bg-slate-100 text-slate-400 opacity-60 border-slate-200';
              }
            }

            return (
              <button
                key={opt}
                disabled={isAnswered}
                onClick={() => handleSelectAnswer(opt)}
                className={`py-4 px-4 rounded-2xl font-kids font-black text-lg sm:text-xl transition-all duration-200 active:scale-95 cursor-pointer ${style}`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {/* Explanation & Next */}
        {isAnswered && (
          <div className="mt-6 flex flex-col items-center justify-center gap-3">
            <p className="text-sm sm:text-base font-kids font-bold text-slate-700">
              {question.explanation}
            </p>

            <button
              onClick={handleNext}
              className="mt-2 bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-kids font-bold text-base px-8 py-2.5 rounded-2xl shadow-md inline-flex items-center gap-2 transition-all"
            >
              <span>{currentIdx + 1 === QUIZ_QUESTIONS.length ? 'عَرْضُ النَّتِيجَةِ 🏆' : 'السُّؤَالُ التَّالِي ⬅️'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
