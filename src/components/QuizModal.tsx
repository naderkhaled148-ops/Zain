import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { QuizQuestion, DifficultyLevel, QuizSubject } from '../types';
import { getDifficultyConfig } from '../data/difficultyData';
import { 
  getNonRepeatingQuestions, 
  markQuestionAsSeen, 
  COMPREHENSIVE_QUESTION_BANK 
} from '../data/questionBank';
import { sound } from '../utils/soundEffects';
import { 
  Sparkles, 
  Trophy, 
  CheckCircle2, 
  RotateCcw, 
  Volume2, 
  Award, 
  Heart, 
  HelpCircle, 
  BookOpen, 
  Calculator, 
  Brain, 
  Zap, 
  Layers, 
  RefreshCw,
  Shuffle
} from 'lucide-react';
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
  const safeDiffLevel: DifficultyLevel = (difficultyLevel === 'easy' || difficultyLevel === 'hard') ? difficultyLevel : 'medium';
  const diffConfig = getDifficultyConfig(safeDiffLevel);

  // Filter & configuration state
  const [selectedSubject, setSelectedSubject] = useState<QuizSubject>('all');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [quizKey, setQuizKey] = useState<number>(1); // used to force reload fresh questions

  // Active Questions set for current test
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => {
    return getNonRepeatingQuestions({
      subject: 'all',
      difficulty: safeDiffLevel,
      count: 10
    });
  });

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Load fresh non-repeating questions whenever subject, difficulty, count or quizKey changes
  const loadFreshQuiz = useCallback((subj: QuizSubject = selectedSubject, count: number = questionCount) => {
    sound.playPop();
    const fresh = getNonRepeatingQuestions({
      subject: subj,
      difficulty: safeDiffLevel,
      count
    });
    setQuestions(fresh);
    setCurrentIdx(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setQuizFinished(false);
    setQuizKey(prev => prev + 1);
  }, [selectedSubject, questionCount, difficultyLevel]);

  // Handle changing subject filter
  const handleSubjectChange = (newSubj: QuizSubject) => {
    setSelectedSubject(newSubj);
    loadFreshQuiz(newSubj, questionCount);
    sound.speakArabic(
      newSubj === 'arabic' ? 'اخْتِبَارُ اللُّغَةِ الْعَرَبِيَّة' :
      newSubj === 'math' ? 'اخْتِبَارُ الرِّيَاضِيَّاتِ وَالْحِسَاب' :
      newSubj === 'logic' ? 'اخْتِبَارُ الذَّكَاءِ وَالْأَنْمَاط' :
      'الِاخْتِبَارُ الشَّامِلُ الْمُنَوَّع'
    );
  };

  // Handle changing question count
  const handleCountChange = (count: number) => {
    setQuestionCount(count);
    loadFreshQuiz(selectedSubject, count);
  };

  const question: QuizQuestion = questions[currentIdx] || questions[0];

  const handleSelectAnswer = (option: string) => {
    if (isAnswered || !question) return;
    setSelectedAnswer(option);
    setIsAnswered(true);

    // Track as seen so it doesn't repeat
    markQuestionAsSeen(question.id);

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

    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      // Finished all questions!
      setQuizFinished(true);
      sound.playFanfare();
      sound.speakArabic('مَبْرُوكٌ يَا بَطَل! لَقَدْ أَكْمَلْتَ الِاخْتِبَارَ بِنَجَاحٍ بَاهِر!');
      confetti({
        particleCount: 110,
        spread: 90,
        origin: { y: 0.5 }
      });
    }
  };

  const handleRestartWithNewQuestions = () => {
    loadFreshQuiz(selectedSubject, questionCount);
    sound.speakArabic('اخْتِبَارٌ جَدِيدٌ بَأَسْئِلَةٍ جَدِيدَةٍ كُلِّيًّا، انْطَلِقْ يَا بَطَل!');
  };

  // Certificate / Results Screen
  if (quizFinished) {
    const total = questions.length;
    const percentage = Math.round((score / total) * 100);

    return (
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border-4 border-amber-300 text-center max-w-xl mx-auto my-6 relative overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        <div className="text-6xl mb-3 animate-bounce">🏆</div>
        
        <span className="text-xs uppercase font-black text-amber-700 bg-amber-100 px-3.5 py-1 rounded-full border border-amber-300">
          شَهَادَةُ تَفَوُّق وَإِتْقَان لِلأَبْطَال
        </span>

        <h3 className="text-2xl sm:text-3xl font-black font-kids text-slate-800 mt-3">
          مَبْرُوكٌ يَا بَطَلَ الصَّفِّ الْأَوَّل!
        </h3>

        <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
          أَجَبْتَ عَلَى <strong className="text-emerald-600 text-xl font-kids">{score}</strong> مِنْ أَقْصَى <strong className="text-slate-800 text-xl font-kids">{total}</strong> أَسْئِلَة بِنِسْبَةِ ({percentage}%)!
        </p>

        {/* Big Score Box */}
        <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 rounded-2xl p-5 my-6 border-2 border-amber-200 flex items-center justify-around shadow-inner">
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

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleRestartWithNewQuestions}
            className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 active:scale-95 text-white font-black font-kids text-base px-6 py-3 rounded-2xl shadow-md inline-flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Shuffle className="w-5 h-5 text-yellow-300" />
            <span>اخْتِبَارٌ جَدِيد بَأَسْئِلَةٍ مُخْتَلِفَة ✨</span>
          </button>

          <button
            onClick={() => loadFreshQuiz(selectedSubject, questionCount)}
            className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:scale-95 text-white font-black font-kids text-base px-6 py-3 rounded-2xl shadow-md inline-flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>إِعَادَةُ الِاخْتِبَار 🔄</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 1. Header & Test Mode Selection Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border-2 border-amber-200 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              <h2 className="text-xl sm:text-2xl font-black font-kids text-slate-800">
                بَنْكُ الِاخْتِبَارَاتِ التَّقْيِيمِيَّةِ الذَّكِيَّة
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              أَسْئِلَةٌ مُتَجَدِّدَةٌ وَمُنَوَّعَةٌ لَا تَتَكَرَّرُ تُلَبِّي جَمِيعَ مَهَارَاتِ الصَّفِّ الْأَوَّل!
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* New fresh questions button */}
            <button
              onClick={handleRestartWithNewQuestions}
              className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-3 py-1.5 rounded-xl font-bold font-kids text-xs shadow-xs active:scale-95 transition-all cursor-pointer"
              title="توليد وتغيير الأسئلة بأسئلة جديدة غير مكررة فوراً"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>تَوْلِيدُ أَسْئِلَةٍ جَدِيدَة 🎲</span>
            </button>

            {onOpenSettings && (
              <button
                onClick={() => {
                  sound.playPop();
                  onOpenSettings();
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs border transition-all hover:scale-105 cursor-pointer ${diffConfig.borderClass} ${diffConfig.bgClass} ${diffConfig.textClass}`}
                title="تعديل مستوى الصعوبة"
              >
                <span>{diffConfig.icon}</span>
                <span>{diffConfig.labelShort}</span>
              </button>
            )}
          </div>
        </div>

        {/* Test Subject Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-black text-slate-600 ml-1">اخْتَرْ نَوْعَ الِاخْتِبَار:</span>
          
          <button
            onClick={() => handleSubjectChange('all')}
            className={`px-3 py-1.5 rounded-xl font-kids font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              selectedSubject === 'all'
                ? 'bg-amber-500 text-white shadow-sm ring-2 ring-amber-300'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>شَامِلٌ مُنَوَّع 🌟</span>
          </button>

          <button
            onClick={() => handleSubjectChange('arabic')}
            className={`px-3 py-1.5 rounded-xl font-kids font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              selectedSubject === 'arabic'
                ? 'bg-rose-500 text-white shadow-sm ring-2 ring-rose-300'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>اللُّغَةُ الْعَرَبِيَّة 📖</span>
          </button>

          <button
            onClick={() => handleSubjectChange('math')}
            className={`px-3 py-1.5 rounded-xl font-kids font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              selectedSubject === 'math'
                ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-300'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>الرِّيَاضِيَّاتُ وَالْحِسَاب 🧮</span>
          </button>

          <button
            onClick={() => handleSubjectChange('logic')}
            className={`px-3 py-1.5 rounded-xl font-kids font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              selectedSubject === 'logic'
                ? 'bg-purple-600 text-white shadow-sm ring-2 ring-purple-300'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>الذَّكَاءُ وَالْأَنْمَاط 🧩</span>
          </button>
        </div>

        {/* Number of questions selector */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-600">عَدَدُ الأَسْئِلَة:</span>
            {[5, 10, 15].map((cnt) => (
              <button
                key={cnt}
                onClick={() => handleCountChange(cnt)}
                className={`px-2.5 py-1 rounded-lg font-kids font-black transition-all cursor-pointer ${
                  questionCount === cnt
                    ? 'bg-slate-800 text-yellow-300 shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cnt === 5 ? '٥ (سَرِيع)' : cnt === 10 ? '١٠ (قِيَاسِيّ)' : '١٥ (شَامِل)'}
              </button>
            ))}
          </div>

          <div className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            🛡️ خَاصِّيَّةُ عَدَمِ التَّكْرَارِ مُفَعَّلَة (أسئلة فريدة)
          </div>
        </div>
      </div>

      {/* 2. Question Progress & Audio Bar */}
      <div className="flex items-center justify-between gap-2 px-1">
        <span className="text-xs font-black font-kids bg-amber-100 text-amber-950 px-3 py-1.5 rounded-full border border-amber-300">
          السُّؤَال {currentIdx + 1} مِنْ {questions.length}
        </span>

        {question?.categoryLabel && (
          <span className="text-xs font-bold bg-indigo-100 text-indigo-900 px-3 py-1.5 rounded-full border border-indigo-200">
            🏷️ {question.categoryLabel}
          </span>
        )}

        <button
          onClick={() => sound.speakArabic(question?.question || '')}
          className="flex items-center gap-1.5 bg-amber-200 hover:bg-amber-300 text-amber-950 px-3 py-1.5 rounded-xl font-bold text-xs cursor-pointer active:scale-95 transition-all"
        >
          <Volume2 className="w-4 h-4 text-amber-800" />
          <span>اقْرَأْ لِي السُّؤَال 🔊</span>
        </button>
      </div>

      {/* Progress Line */}
      <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden p-0.5 shadow-inner">
        <div 
          className="h-full bg-gradient-to-r from-amber-400 via-rose-400 to-emerald-500 rounded-full transition-all duration-300"
          style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* 3. Active Question Box */}
      {question && (
        <div className="bg-gradient-to-br from-amber-50/80 via-white to-purple-50/80 rounded-3xl p-6 sm:p-8 shadow-md border-2 border-purple-200 text-center relative">
          {question.emojiHint && (
            <div className="text-5xl sm:text-6xl mb-3 animate-playful select-none">
              {question.emojiHint}
            </div>
          )}

          <h3 className="text-xl sm:text-2xl font-black font-kids text-slate-800 mb-6 leading-relaxed whitespace-pre-line">
            {question.question}
          </h3>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-lg mx-auto">
            {question.options.map((opt) => {
              const isSelected = selectedAnswer === opt;
              const isCorrect = opt === question.correctAnswer;

              let style = 'bg-white hover:bg-purple-50 text-slate-800 border-2 border-slate-200 hover:border-purple-300';
              if (isAnswered) {
                if (isCorrect) {
                  style = 'bg-emerald-500 text-white border-2 border-emerald-600 shadow-md scale-102 ring-4 ring-emerald-200';
                } else if (isSelected) {
                  style = 'bg-rose-500 text-white border-2 border-rose-600 animate-shake';
                } else {
                  style = 'bg-slate-100 text-slate-400 opacity-60 border-slate-200';
                }
              }

              return (
                <button
                  key={opt}
                  disabled={isAnswered}
                  onClick={() => handleSelectAnswer(opt)}
                  className={`py-3.5 px-4 rounded-2xl font-kids font-black text-lg sm:text-xl transition-all duration-200 active:scale-95 cursor-pointer shadow-xs ${style}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Explanation & Next */}
          {isAnswered && (
            <div className="mt-6 flex flex-col items-center justify-center gap-3 animate-in fade-in duration-200">
              <div className="p-3 bg-white/90 rounded-2xl border-2 border-purple-200 max-w-md shadow-xs">
                <p className="text-sm sm:text-base font-kids font-bold text-slate-800">
                  {question.explanation}
                </p>
              </div>

              <button
                onClick={handleNext}
                className="mt-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 active:scale-95 text-white font-kids font-bold text-base px-8 py-3 rounded-2xl shadow-md inline-flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>{currentIdx + 1 === questions.length ? 'عَرْضُ النَّتِيجَةِ الشَّامِلَة 🏆' : 'السُّؤَالُ التَّالِي ⬅️'}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
