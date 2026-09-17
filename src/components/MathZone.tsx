import React, { useState, useEffect } from 'react';
import { MATH_DATA } from '../data/curriculumData';
import { EASY_MATH_DATA, HARD_MATH_DATA, getDifficultyConfig } from '../data/difficultyData';
import { DifficultyLevel, MathItem } from '../types';
import { sound } from '../utils/soundEffects';
import { Sparkles, CheckCircle2, ArrowLeft, Volume2, HelpCircle, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MathZoneProps {
  onEarnRewards: (stars: number, coins: number, xp: number) => void;
  difficultyLevel?: DifficultyLevel;
  onOpenSettings?: () => void;
}

export const MathZone: React.FC<MathZoneProps> = ({ 
  onEarnRewards, 
  difficultyLevel = 'medium',
  onOpenSettings 
}) => {
  const diffConfig = getDifficultyConfig(difficultyLevel);

  // Pick dataset based on difficulty level
  const activeDataset: MathItem[] = difficultyLevel === 'easy' 
    ? EASY_MATH_DATA 
    : difficultyLevel === 'hard' 
      ? HARD_MATH_DATA 
      : MATH_DATA;

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  // Reset index if dataset changes
  useEffect(() => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
  }, [difficultyLevel]);

  const currentItem = activeDataset[currentIdx] || activeDataset[0];

  const handleSelectOption = (opt: string | number) => {
    if (isAnswered) return;
    setSelectedOption(opt);
    setIsAnswered(true);

    const correct = opt === currentItem.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      sound.playSuccess();
      sound.speakPraise();
      const earnedStars = difficultyLevel === 'hard' ? 3 : 2;
      const earnedCoins = difficultyLevel === 'hard' ? 8 : 5;
      const earnedXp = Math.round(20 * diffConfig.rewardMultiplier);
      onEarnRewards(earnedStars, earnedCoins, earnedXp);
      confetti({
        particleCount: difficultyLevel === 'hard' ? 50 : 35,
        spread: 60,
        origin: { y: 0.6 }
      });
    } else {
      sound.playTryAgain();
      sound.speakEncouragement();
    }
  };

  const handleNextQuestion = () => {
    sound.playPop();
    setIsAnswered(false);
    setSelectedOption(null);
    setCurrentIdx((prev) => (prev + 1) % activeDataset.length);
  };

  const renderVisuals = () => {
    if (currentItem.type === 'count') {
      return (
        <div className="flex flex-wrap items-center justify-center gap-3 my-6 max-w-md mx-auto p-4 bg-white/80 rounded-2xl border border-amber-200">
          {Array.from({ length: currentItem.itemCount1 }).map((_, i) => (
            <div
              key={i}
              onClick={() => {
                sound.playPop();
                sound.speakArabic(`${i + 1}`);
              }}
              className="text-4xl sm:text-5xl cursor-pointer transform hover:scale-125 transition-transform"
              title={`عنصر رقم ${i + 1}`}
            >
              {currentItem.itemsEmoji}
            </div>
          ))}
        </div>
      );
    }

    if (currentItem.type === 'add') {
      return (
        <div className="flex items-center justify-center gap-3 sm:gap-6 my-6 max-w-lg mx-auto p-4 bg-white/80 rounded-2xl border border-amber-200">
          {/* Group 1 */}
          <div className="flex items-center gap-1.5 p-3 bg-amber-50 rounded-xl border border-amber-200">
            {Array.from({ length: currentItem.itemCount1 }).map((_, i) => (
              <span key={i} className="text-3xl sm:text-4xl">{currentItem.itemsEmoji}</span>
            ))}
            <span className="font-kids font-black text-xl text-amber-900 mr-2">({currentItem.itemCount1})</span>
          </div>

          <span className="text-3xl font-black text-slate-700">+</span>

          {/* Group 2 */}
          <div className="flex items-center gap-1.5 p-3 bg-blue-50 rounded-xl border border-blue-200">
            {Array.from({ length: currentItem.itemCount2 || 0 }).map((_, i) => (
              <span key={i} className="text-3xl sm:text-4xl">{currentItem.itemsEmoji}</span>
            ))}
            <span className="font-kids font-black text-xl text-blue-900 mr-2">({currentItem.itemCount2})</span>
          </div>
        </div>
      );
    }

    if (currentItem.type === 'subtract') {
      return (
        <div className="flex flex-col items-center justify-center gap-3 my-6 max-w-md mx-auto p-4 bg-white/80 rounded-2xl border border-amber-200">
          <div className="flex items-center gap-2">
            {Array.from({ length: currentItem.itemCount1 }).map((_, i) => {
              const isRemoved = i >= currentItem.itemCount1 - (currentItem.itemCount2 || 0);
              return (
                <div key={i} className="relative">
                  <span className={`text-4xl sm:text-5xl transition-opacity ${isRemoved ? 'opacity-30' : 'opacity-100'}`}>
                    {currentItem.itemsEmoji}
                  </span>
                  {isRemoved && (
                    <span className="absolute inset-0 flex items-center justify-center text-red-500 font-black text-3xl">
                      ✕
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-xs text-slate-500 font-bold">
            كَانَ عَدَدُهَا {currentItem.itemCount1} وَطَارَتْ مِنْهَا {currentItem.itemCount2}!
          </p>
        </div>
      );
    }

    if (currentItem.type === 'shapes') {
      return (
        <div className="flex items-center justify-center gap-4 my-6 text-6xl">
          <span className="p-4 bg-amber-100 rounded-3xl border-2 border-amber-300 animate-playful">
            {currentItem.itemsEmoji}
          </span>
        </div>
      );
    }

    if (currentItem.type === 'compare') {
      return (
        <div className="flex items-center justify-center gap-6 my-6 max-w-md mx-auto p-4 bg-white/80 rounded-2xl border border-amber-200">
          <div className="text-center p-3 bg-amber-100 rounded-2xl w-24">
            <div className="text-4xl font-black font-kids text-amber-900">٧</div>
            <div className="text-xs text-amber-700 font-bold mt-1">٧ سَمَكَات</div>
          </div>
          <div className="text-2xl font-black font-kids text-slate-400">...</div>
          <div className="text-center p-3 bg-blue-100 rounded-2xl w-24">
            <div className="text-4xl font-black font-kids text-blue-900">٣</div>
            <div className="text-xs text-blue-700 font-bold mt-1">٣ سَمَكَات</div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-6">
      {/* Title Bar */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-amber-100 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔢</span>
            <h2 className="text-xl font-black font-kids text-slate-800">
              أَلْعَابُ الْحِسَابِ وَالْعَدِّ الْمُمْتِع
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            تَعَلَّمِ الْأَعْدَادَ مِن ١ إِلَى ١٠ وَالْجَمْعَ وَالطَّرْحَ وَالْأَشْكَالَ الْهَنْدَسِيَّة.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onOpenSettings && (
            <button
              onClick={() => {
                sound.playPop();
                onOpenSettings();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs border transition-all hover:scale-105 cursor-pointer ${diffConfig.borderClass} ${diffConfig.bgClass} ${diffConfig.textClass}`}
              title="تعديل مستوى الصعوبة للأنشطة"
            >
              <span>{diffConfig.icon}</span>
              <span>المستوى: {diffConfig.labelShort}</span>
              <span className="text-[10px] opacity-75 underline mr-1">(تغيير)</span>
            </button>
          )}

          <button
            onClick={() => sound.speakArabic(currentItem.question)}
            className="flex items-center gap-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 px-3 py-1.5 rounded-xl font-bold text-xs"
          >
            <Volume2 className="w-4 h-4 text-amber-700" />
            <span>اقْرَأِ السُّؤَال</span>
          </button>
          <span className="text-xs font-bold bg-amber-100 text-amber-900 px-3 py-1.5 rounded-full">
            تَمْرِين {currentIdx + 1} مِنْ {activeDataset.length}
          </span>
        </div>
      </div>

      {/* Main Math Card */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-amber-50 rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-blue-200 text-center">
        <span className="text-xs sm:text-sm font-bold bg-blue-100 text-blue-800 px-3 py-1 rounded-full inline-block mb-3">
          {currentItem.title}
        </span>

        <h3 className="text-xl sm:text-2xl font-black font-kids text-slate-800 mb-2">
          {currentItem.question}
        </h3>

        {/* Dynamic Visual Problem Demonstration */}
        {renderVisuals()}

        {/* Options Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto mt-6">
          {currentItem.options.map((opt) => {
            const isSelected = selectedOption === opt;
            const isThisCorrect = opt === currentItem.correctAnswer;

            let btnStyle = 'bg-white hover:bg-amber-100 text-slate-800 border-2 border-slate-200';
            if (isAnswered) {
              if (isThisCorrect) {
                btnStyle = 'bg-emerald-500 text-white border-2 border-emerald-600 shadow-md scale-105';
              } else if (isSelected) {
                btnStyle = 'bg-rose-500 text-white border-2 border-rose-600';
              } else {
                btnStyle = 'bg-slate-100 text-slate-400 opacity-60 border-slate-200';
              }
            }

            return (
              <button
                key={opt}
                disabled={isAnswered}
                onClick={() => handleSelectOption(opt)}
                className={`py-4 px-3 rounded-2xl font-kids font-black text-xl sm:text-2xl transition-all duration-200 active:scale-95 cursor-pointer ${btnStyle}`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {/* Feedback Message */}
        {isAnswered && (
          <div className="mt-6 flex flex-col items-center justify-center gap-3">
            <div className={`text-lg font-kids font-bold flex items-center gap-2 ${
              isCorrect ? 'text-emerald-600' : 'text-rose-600'
            }`}>
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  <span>إِجَابَةٌ رَائِعَةٌ وَصَحِيحَة! أَحْسَنْتَ يَا بَطَل (+٥ 🪙)</span>
                </>
              ) : (
                <>
                  <HelpCircle className="w-6 h-6 text-rose-500" />
                  <span>الْإِجَابَةُ الصَّحِيحَةُ هِيَ: {currentItem.correctAnswer}</span>
                </>
              )}
            </div>

            <button
              onClick={handleNextQuestion}
              className="mt-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-kids font-bold text-base px-6 py-2.5 rounded-2xl shadow-md flex items-center gap-2 transition-all"
            >
              <span>التَّمْرِينُ التَّالِي</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Math Activities List */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-amber-100">
        <h4 className="font-kids font-bold text-slate-700 text-sm mb-3">
          اخْتَرْ تَمْرِينَكَ الْمُفَضَّل:
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {MATH_DATA.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                sound.playPop();
                setIsAnswered(false);
                setSelectedOption(null);
                setCurrentIdx(idx);
              }}
              className={`p-3 rounded-2xl text-right border transition-all ${
                idx === currentIdx
                  ? 'bg-blue-500 text-white border-blue-600 shadow-sm'
                  : 'bg-slate-50 hover:bg-blue-50/50 text-slate-700 border-slate-200'
              }`}
            >
              <div className="text-xl mb-1">{item.itemsEmoji}</div>
              <div className="font-kids font-bold text-xs truncate">{item.title}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
