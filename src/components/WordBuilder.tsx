import React, { useState } from 'react';
import { WORD_BLENDS } from '../data/curriculumData';
import { sound } from '../utils/soundEffects';
import { Sparkles, Volume2, RotateCcw, CheckCircle, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

interface WordBuilderProps {
  onEarnRewards: (stars: number, coins: number, xp: number) => void;
}

export const WordBuilder: React.FC<WordBuilderProps> = ({ onEarnRewards }) => {
  const [wordIndex, setWordIndex] = useState<number>(0);
  const currentWord = WORD_BLENDS[wordIndex];
  const [assembledLetters, setAssembledLetters] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Available letter tiles to click
  const [availableLetters, setAvailableLetters] = useState<string[]>(() => {
    return [...currentWord.letters].sort(() => Math.random() - 0.5);
  });

  const resetWord = (index: number) => {
    setWordIndex(index);
    setAssembledLetters([]);
    setIsSuccess(false);
    setAvailableLetters([...WORD_BLENDS[index].letters].sort(() => Math.random() - 0.5));
  };

  const handlePickLetter = (letter: string, indexInAvailable: number) => {
    sound.playPop();
    sound.speakArabic(letter);

    const nextAssembled = [...assembledLetters, letter];
    setAssembledLetters(nextAssembled);

    // Remove picked letter from available
    const nextAvailable = [...availableLetters];
    nextAvailable.splice(indexInAvailable, 1);
    setAvailableLetters(nextAvailable);

    // Check if word completed
    if (nextAssembled.length === currentWord.letters.length) {
      const isCorrect = nextAssembled.every((char, i) => char === currentWord.letters[i]);
      if (isCorrect) {
        setIsSuccess(true);
        sound.playSuccess();
        sound.speakArabic(`مُمْتَاز! كَلِمَةُ «${currentWord.word}» .. ${currentWord.meaning}`);
        onEarnRewards(2, 5, 20);
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 }
        });
      } else {
        sound.playTryAgain();
        sound.speakArabic('حَاوِلْ مَرَّةً أُخْرَى بِتَرْتِيبِ الْحُرُوفِ الصَّحِيحِ!');
        setTimeout(() => {
          setAssembledLetters([]);
          setAvailableLetters([...currentWord.letters].sort(() => Math.random() - 0.5));
        }, 1200);
      }
    }
  };

  const handleUndo = () => {
    if (assembledLetters.length === 0 || isSuccess) return;
    sound.playPop();
    const last = assembledLetters[assembledLetters.length - 1];
    setAssembledLetters(assembledLetters.slice(0, -1));
    setAvailableLetters([...availableLetters, last]);
  };

  const handleNextWord = () => {
    sound.playPop();
    const nextIdx = (wordIndex + 1) % WORD_BLENDS.length;
    resetWord(nextIdx);
  };

  return (
    <div className="space-y-6">
      {/* Title Card */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-amber-100 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧩</span>
            <h2 className="text-xl font-black font-kids text-slate-800">
              أَدْمِجُ وَأَقْرَأُ: تَرْكِيبُ الْكَلِمَاتِ
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            اضْغَطْ عَلَى الْحُرُوفِ بِالتَّرْتِيبِ لِتُكَوِّنَ كَلِمَةً صَحِيحَةً وَتَسْتَمِعَ لَهَا.
          </p>
        </div>

        {/* Word Counter */}
        <div className="text-xs sm:text-sm font-bold bg-amber-100 text-amber-900 px-3 py-1.5 rounded-full">
          الْكَلِمَة {wordIndex + 1} مِنْ {WORD_BLENDS.length}
        </div>
      </div>

      {/* Main Puzzle Card */}
      <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-amber-200 text-center relative overflow-hidden">
        {/* Word Meaning & Illustration */}
        <div className="flex flex-col items-center justify-center">
          <div className="text-6xl sm:text-7xl mb-2 animate-playful drop-shadow-sm">
            {currentWord.emoji}
          </div>
          <div className="text-sm font-medium text-slate-500 mb-6">
            {currentWord.meaning}
          </div>
        </div>

        {/* Assembly Slots */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 my-6">
          {currentWord.letters.map((_, idx) => {
            const char = assembledLetters[idx];
            return (
              <div
                key={idx}
                className={`w-16 h-20 sm:w-20 sm:h-24 rounded-2xl flex items-center justify-center font-kids text-3xl sm:text-4xl font-black border-3 transition-all ${
                  char
                    ? isSuccess
                      ? 'border-emerald-500 bg-emerald-100 text-emerald-900 scale-105 shadow-md'
                      : 'border-amber-400 bg-amber-100 text-amber-950 shadow-sm'
                    : 'border-dashed border-amber-300 bg-white/70 text-slate-300'
                }`}
              >
                {char || '?'}
              </div>
            );
          })}
        </div>

        {/* Success Message Banner */}
        {isSuccess && (
          <div className="bg-emerald-500 text-white py-3 px-6 rounded-2xl max-w-md mx-auto mb-6 shadow-md flex items-center justify-center gap-2 font-kids text-xl font-bold animate-bounce">
            <CheckCircle className="w-6 h-6 text-yellow-300" />
            <span>رَائِع! كَلِمَةُ «{currentWord.word}» كَامِلَة!</span>
            <button
              onClick={() => sound.speakArabic(currentWord.word)}
              className="bg-white/20 hover:bg-white/30 p-1.5 rounded-lg"
              title="استمع للكلمة"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Available Letters Pool */}
        <div className="mt-4">
          <p className="text-xs font-bold text-slate-400 mb-3">
            اخْتَرِ الْحُرُوفَ بِالتَّرْتِيبِ:
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {availableLetters.map((letter, idx) => (
              <button
                key={idx}
                disabled={isSuccess}
                onClick={() => handlePickLetter(letter, idx)}
                className="w-14 h-16 sm:w-16 sm:h-18 rounded-2xl bg-white hover:bg-amber-400 hover:text-white active:scale-90 text-slate-800 font-kids text-2xl sm:text-3xl font-black border-2 border-amber-200 shadow-sm transition-all transform select-none cursor-pointer"
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={handleUndo}
            disabled={assembledLetters.length === 0 || isSuccess}
            className="flex items-center gap-1.5 text-xs sm:text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold transition-all disabled:opacity-40"
          >
            <RotateCcw className="w-4 h-4" />
            <span>تَرَاجُع</span>
          </button>

          <button
            onClick={handleNextWord}
            className="flex items-center gap-2 text-sm sm:text-base bg-amber-500 hover:bg-amber-600 active:scale-95 text-white px-6 py-2 rounded-2xl font-black font-kids shadow-md transition-all"
          >
            <span>الْكَلِمَةُ التَّالِيَة</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Word Palette */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-amber-100">
        <h4 className="font-kids font-bold text-slate-700 text-sm mb-3">
          قَائِمَةُ كَلِمَاتِ الْمَنْهَج:
        </h4>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-2">
          {WORD_BLENDS.map((wb, idx) => (
            <button
              key={wb.word}
              onClick={() => {
                sound.playPop();
                resetWord(idx);
              }}
              className={`p-2 rounded-xl text-center border font-kids font-bold text-sm transition-all ${
                idx === wordIndex
                  ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                  : 'bg-slate-50 hover:bg-amber-50 text-slate-700 border-slate-200'
              }`}
            >
              <div className="text-xl mb-0.5">{wb.emoji}</div>
              <div>{wb.word}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
