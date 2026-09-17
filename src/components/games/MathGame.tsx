import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
import { Sparkles, CheckCircle2, RotateCcw, Volume2, ArrowLeft, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MathGameProps {
  onEarnRewards: (stars: number, coins: number, xp: number) => void;
  onCompleteGameScore?: (game: 'reading' | 'writing' | 'math') => void;
}

interface BananaProblem {
  id: string;
  question: string;
  type: 'count' | 'add' | 'compare';
  targetNumber: number;
  countGroupA: number;
  countGroupB?: number;
  symbol?: string;
  fruitEmoji: string;
  options: (number | string)[];
  correctAnswer: number | string;
  explanation: string;
}

export const MathGame: React.FC<MathGameProps> = ({ onEarnRewards, onCompleteGameScore }) => {
  const problems: BananaProblem[] = [
    {
      id: 'm1',
      question: 'أَطْعِمْ سِمْسِم: كَمْ مَوْزَةً لَذِيذَةً فِي الشَّاشَةِ؟ 🍌',
      type: 'count',
      targetNumber: 4,
      countGroupA: 4,
      fruitEmoji: '🍌',
      options: [3, 4, 5, 2],
      correctAnswer: 4,
      explanation: 'عَفَارِم يَا عَبْقَرِيّ! هُنَاكَ ٤ مَوْزَاتٍ لَذِيذَةٍ!'
    },
    {
      id: 'm2',
      question: 'مَعَ سِمْسِم ٣ تُفَّاحَات 🍎 وَأَعْطَاهُ صَدِيقُهُ ٢ تُفَّاحَة 🍎.. كَمْ كُلُّ التُّفَّاح؟',
      type: 'add',
      targetNumber: 5,
      countGroupA: 3,
      countGroupB: 2,
      symbol: '+',
      fruitEmoji: '🍎',
      options: [4, 5, 6, 3],
      correctAnswer: 5,
      explanation: 'بَطَل! ٣ + ٢ = ٥ تُفَّاحَاتٍ!'
    },
    {
      id: 'm3',
      question: 'قَارِنْ: مَجْمُوعَةُ ٥ فَرَاوْلَة 🍓 أَمْ مَجْمُوعَةُ ٣ فَرَاوْلَة 🍓؟ اخْتَرِ الْعَلَامَةَ:',
      type: 'compare',
      targetNumber: 5,
      countGroupA: 5,
      countGroupB: 3,
      fruitEmoji: '🍓',
      options: ['أَكْبَرُ مِنْ ( > )', 'أَصْغَرُ مِنْ ( < )', 'يُسَاوِي ( = )'],
      correctAnswer: 'أَكْبَرُ مِنْ ( > )',
      explanation: 'مُمْتَاز! ٥ فَرَاوْلَة أَكْبَرُ مِنْ ( > ) ٣ فَرَاوْلَة!'
    },
    {
      id: 'm4',
      question: 'عُدَّ الْبُرْتُقَالَاتِ الْمُنْعِشَة: كَمْ بُرْتُقَالَةً مَعَنَا؟ 🍊',
      type: 'count',
      targetNumber: 6,
      countGroupA: 6,
      fruitEmoji: '🍊',
      options: [5, 6, 7, 4],
      correctAnswer: 6,
      explanation: 'أَحْسَنْتَ! هُنَاكَ ٦ بُرْتُقَالَاتٍ!'
    },
    {
      id: 'm5',
      question: 'مَسْأَلَةُ الْجَمْعِ السَّرِيع: ٤ مَوْزَات 🍌 + ٣ مَوْزَات 🍌 = ؟',
      type: 'add',
      targetNumber: 7,
      countGroupA: 4,
      countGroupB: 3,
      symbol: '+',
      fruitEmoji: '🍌',
      options: [6, 7, 8, 5],
      correctAnswer: 7,
      explanation: 'رَائِعٌ جِدًّا! ٤ + ٣ = ٧ مَوْزَاتٍ لِسِمْسِم!'
    }
  ];

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [fedBananas, setFedBananas] = useState<number>(0);
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);

  const activeProblem = problems[currentIdx];

  const handleSelectOption = (opt: number | string) => {
    if (isAnswered) return;
    setSelectedOption(opt);
    setIsAnswered(true);

    const isCorrect = opt === activeProblem.correctAnswer;
    if (isCorrect) {
      sound.playSuccess();
      sound.speakArabic(activeProblem.explanation);
      setFedBananas(prev => prev + 1);
      onEarnRewards(2, 5, 20);
      if (onCompleteGameScore) onCompleteGameScore('math');
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    } else {
      sound.playTryAgain();
      sound.speakArabic('حَاوِلْ مَرَّةً أُخْرَى يَا بَطَل! عُدَّ الْفَاكِهَةَ بِتَأَنٍّ!');
    }
  };

  const handleNextProblem = () => {
    sound.playPop();
    setIsAnswered(false);
    setSelectedOption(null);

    if (currentIdx + 1 < problems.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setIsGameFinished(true);
      sound.playFanfare();
      sound.speakArabic('مَبْرُوكٌ يَا عَبْقَرِيَّ الْحِسَاب! لَقَدْ أَطْعَمْتَ سِمْسِم وَحَلَلْتَ كُلَّ الْمَسَائِلِ بِتَفَوُّق!');
      onEarnRewards(5, 20, 50);
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
    }
  };

  const handleRestart = () => {
    sound.playPop();
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setFedBananas(0);
    setIsGameFinished(false);
  };

  if (isGameFinished) {
    return (
      <div className="bg-white rounded-3xl p-6 sm:p-8 text-center border-4 border-blue-300 shadow-md max-w-xl mx-auto my-4 space-y-4">
        <div className="text-6xl animate-bounce">🐵🍌🎉</div>
        <span className="text-xs uppercase font-black bg-blue-100 text-blue-900 px-3 py-1 rounded-full">
          وِسَامُ عَبْقَرِيِّ الْحِسَابِ الصَّغِير
        </span>
        <h3 className="text-2xl sm:text-3xl font-black font-kids text-slate-800">
          سِمْسِمُ سَعِيدٌ جِدًّا بِكَ!
        </h3>
        <p className="text-slate-600 font-medium text-sm sm:text-base">
          لَقَدْ أَطْعَمْتَ سِمْسِم <strong>{fedBananas}</strong> فَاكِهَةٍ لَذِيذَةٍ وَفُزْتَ بِـ <strong>٢٠ عُمْلَةً 🪙</strong> وَ <strong>٥ نُجُومٍ ⭐</strong>!
        </p>

        <button
          onClick={handleRestart}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 text-white font-kids font-bold text-base px-8 py-3 rounded-2xl shadow-md inline-flex items-center gap-2 transition-all active:scale-95"
        >
          <RotateCcw className="w-5 h-5" />
          <span>الْعَبْ مَرَّةً ثَانِيَة</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Game Header */}
      <div className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500 rounded-3xl p-5 sm:p-6 text-white shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐵</span>
            <h2 className="text-xl sm:text-2xl font-black font-kids">
              لُعْبَةُ الْحِسَاب: إِطْعَامُ سِمْسِمَ الْقِرْدِ الْعَبْقَرِيّ
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-white/95 mt-1 font-medium">
            مَعَ سِمْسِم 🐵: عُدَّ الْفَوَاكِهَ، وَاحْسُبْ مَسَائِلَ الْجَمْعِ، وَقَارِنْ بَيْنَ الْأَعْدَادِ!
          </p>
        </div>

        {/* Monkey Hunger / Banana fed counter */}
        <div className="flex items-center gap-2 bg-white/25 px-3 py-1.5 rounded-2xl border border-white/30 text-xs font-bold">
          <span>شَبَعُ سِمْسِم:</span>
          <span className="text-yellow-200">🍌 {fedBananas} / {problems.length}</span>
        </div>
      </div>

      {/* Main Interactive Calculation Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-blue-200 text-center">
        {/* Monkey Avatar & Question */}
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="text-5xl sm:text-6xl animate-playful">🐵</div>
          <div className="text-right">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">
              السُّؤَال {currentIdx + 1} مِنْ {problems.length}
            </span>
            <h3 className="font-kids font-black text-lg sm:text-xl text-slate-800 mt-1">
              {activeProblem.question}
            </h3>
          </div>
        </div>

        {/* Interactive Fruit Visual Counting Board */}
        <div className="bg-gradient-to-br from-blue-50/50 via-cyan-50/40 to-yellow-50/50 rounded-3xl p-6 my-6 border border-blue-100 max-w-xl mx-auto flex flex-wrap items-center justify-center gap-4">
          {/* Group A */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-3 bg-white/80 rounded-2xl border border-blue-200">
            {Array.from({ length: activeProblem.countGroupA }).map((_, i) => (
              <button
                key={`a_${i}`}
                type="button"
                onClick={() => {
                  sound.playPop();
                  sound.speakArabic(`${i + 1}`);
                }}
                className="text-4xl sm:text-5xl transform hover:scale-125 active:scale-95 transition-transform"
                title={`عنصر ${i + 1}`}
              >
                {activeProblem.fruitEmoji}
              </button>
            ))}
          </div>

          {/* Plus sign if add */}
          {activeProblem.symbol && (
            <div className="text-3xl font-black font-reading text-blue-600 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-xs border border-blue-200">
              {activeProblem.symbol}
            </div>
          )}

          {/* Group B if add or compare */}
          {activeProblem.countGroupB !== undefined && (
            <div className="flex flex-wrap items-center justify-center gap-2 p-3 bg-white/80 rounded-2xl border border-blue-200">
              {Array.from({ length: activeProblem.countGroupB }).map((_, i) => (
                <button
                  key={`b_${i}`}
                  type="button"
                  onClick={() => {
                    sound.playPop();
                    sound.speakArabic(`${activeProblem.countGroupA + i + 1}`);
                  }}
                  className="text-4xl sm:text-5xl transform hover:scale-125 active:scale-95 transition-transform"
                  title={`عنصر ${i + 1}`}
                >
                  {activeProblem.fruitEmoji}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="text-xs font-bold text-slate-400 mb-4">
          💡 انْقُرْ عَلَى الْفَاكِهَةِ لِعَدِّهَا بِصَوْتٍ عَالٍ!
        </div>

        {/* Options to click */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 max-w-xl mx-auto">
          {activeProblem.options.map((opt) => {
            const isSelected = selectedOption === opt;
            const isCorrect = opt === activeProblem.correctAnswer;

            let btnStyle = 'bg-white hover:bg-blue-50 text-slate-800 border-2 border-slate-200';
            if (isAnswered) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-500 text-white border-2 border-emerald-600 shadow-md scale-102';
              } else if (isSelected) {
                btnStyle = 'bg-rose-500 text-white border-2 border-rose-600';
              } else {
                btnStyle = 'bg-slate-100 text-slate-400 opacity-50 border-slate-200';
              }
            }

            return (
              <button
                key={String(opt)}
                disabled={isAnswered}
                onClick={() => handleSelectOption(opt)}
                className={`py-4 px-3 rounded-2xl font-kids font-black text-xl transition-all duration-200 active:scale-95 cursor-pointer shadow-xs ${btnStyle}`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {/* Feedback & Next */}
        {isAnswered && (
          <div className="mt-6 flex flex-col items-center justify-center gap-3 animate-fade-in">
            <p className="text-sm sm:text-base font-kids font-bold text-slate-700">
              {activeProblem.explanation}
            </p>

            <button
              onClick={handleNextProblem}
              className="mt-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-kids font-bold text-base px-8 py-2.5 rounded-2xl shadow-md inline-flex items-center gap-2 transition-all"
            >
              <span>{currentIdx + 1 === problems.length ? 'عَرْضُ النَّتِيجَةِ 🏆' : 'الْمَسْأَلَةُ التَّالِيَة ➡️'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
