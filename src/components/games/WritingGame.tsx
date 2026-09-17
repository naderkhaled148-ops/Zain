import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
import { Sparkles, CheckCircle2, RotateCcw, Volume2, ArrowLeft, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface WritingGameProps {
  onEarnRewards: (stars: number, coins: number, xp: number) => void;
  onCompleteGameScore?: (game: 'reading' | 'writing' | 'math') => void;
}

interface LetterPuzzleChallenge {
  id: string;
  word: string;
  imageEmoji: string;
  meaning: string;
  parts: {
    letter: string;
    soundName: string;
    positionLabel: string;
  }[];
}

export const WritingGame: React.FC<WritingGameProps> = ({ onEarnRewards, onCompleteGameScore }) => {
  const challenges: LetterPuzzleChallenge[] = [
    {
      id: 'w1',
      word: 'أَب',
      imageEmoji: '👨',
      meaning: 'أَبِي الْعَزِيز',
      parts: [
        { letter: 'أَ', soundName: 'أَلِف فَتْحَة', positionLabel: 'أَوَّل الْكَلِمَة' },
        { letter: 'بْ', soundName: 'بَاء سُكُون', positionLabel: 'آخِر الْكَلِمَة' },
      ]
    },
    {
      id: 'w2',
      word: 'أُمّ',
      imageEmoji: '👩',
      meaning: 'أُمِّي الْحَبِيبَة',
      parts: [
        { letter: 'أُ', soundName: 'أَلِف ضَمَّة', positionLabel: 'أَوَّل الْكَلِمَة' },
        { letter: 'مّ', soundName: 'مِيم مُشَدَّدَة', positionLabel: 'آخِر الْكَلِمَة' },
      ]
    },
    {
      id: 'w3',
      word: 'نَمْل',
      imageEmoji: '🐜',
      meaning: 'نَمْلَة نَشِيطَة',
      parts: [
        { letter: 'نَـ', soundName: 'نُون فَتْحَة', positionLabel: 'أَوَّل الْكَلِمَة' },
        { letter: 'ـمْـ', soundName: 'مِيم سُكُون', positionLabel: 'وَسَط الْكَلِمَة' },
        { letter: 'ـل', soundName: 'لَام', positionLabel: 'آخِر الْكَلِمَة' },
      ]
    },
    {
      id: 'w4',
      word: 'حَبْل',
      imageEmoji: '🪢',
      meaning: 'حَبْل قَوِيّ',
      parts: [
        { letter: 'حَـ', soundName: 'حَاء فَتْحَة', positionLabel: 'أَوَّل الْكَلِمَة' },
        { letter: 'ـبْـ', soundName: 'بَاء سُكُون', positionLabel: 'وَسَط الْكَلِمَة' },
        { letter: 'ـل', soundName: 'لَام', positionLabel: 'آخِر الْكَلِمَة' },
      ]
    },
    {
      id: 'w5',
      word: 'لَبَن',
      imageEmoji: '🥛',
      meaning: 'لَبَن طَازَج',
      parts: [
        { letter: 'لَـ', soundName: 'لَام فَتْحَة', positionLabel: 'أَوَّل الْكَلِمَة' },
        { letter: 'ـبَـ', soundName: 'بَاء فَتْحَة', positionLabel: 'وَسَط الْكَلِمَة' },
        { letter: 'ـن', soundName: 'نُون', positionLabel: 'آخِر الْكَلِمَة' },
      ]
    }
  ];

  const [levelIdx, setLevelIdx] = useState<number>(0);
  const currentChallenge = challenges[levelIdx];

  // Train slots filled by the child
  const [filledSlots, setFilledSlots] = useState<(string | null)[]>(() => 
    new Array(currentChallenge.parts.length).fill(null)
  );

  // Scrambled letters available on the ground
  const [availableTiles, setAvailableTiles] = useState<{ id: string; letter: string; used: boolean }[]>(() => {
    return currentChallenge.parts
      .map((p, i) => ({ id: `tile_${i}`, letter: p.letter, used: false }))
      .sort(() => Math.random() - 0.5);
  });

  const [isLevelSolved, setIsLevelSolved] = useState<boolean>(false);
  const [isGameCompleted, setIsGameCompleted] = useState<boolean>(false);

  const handleTileClick = (tile: { id: string; letter: string; used: boolean }) => {
    if (tile.used || isLevelSolved) return;

    // Find first empty slot
    const firstEmptyIndex = filledSlots.findIndex(s => s === null);
    if (firstEmptyIndex === -1) return;

    sound.playPop();
    sound.speakArabic(tile.letter);

    const nextFilled = [...filledSlots];
    nextFilled[firstEmptyIndex] = tile.letter;
    setFilledSlots(nextFilled);

    // Mark tile as used
    setAvailableTiles(prev => prev.map(t => t.id === tile.id ? { ...t, used: true } : t));

    // If all slots are filled, verify!
    if (firstEmptyIndex === filledSlots.length - 1) {
      const isCorrect = nextFilled.every((char, i) => char === currentChallenge.parts[i].letter);

      if (isCorrect) {
        setIsLevelSolved(true);
        sound.playSuccess();
        sound.speakArabic(`مُمْتَاز! لَقَدْ رَكَّبْتَ عَرَبَاتِ قِطَارِ كَلِمَةِ «${currentChallenge.word}»!`);
        onEarnRewards(2, 5, 20);
        if (onCompleteGameScore) onCompleteGameScore('writing');
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      } else {
        sound.playTryAgain();
        sound.speakArabic('تَرْتِيبُ الْحُرُوفِ غَيْرُ صَحِيح، أَعِدِ الْمُحَاوَلَةَ يَا شَاطِر!');
        setTimeout(() => {
          setFilledSlots(new Array(currentChallenge.parts.length).fill(null));
          setAvailableTiles(prev => prev.map(t => ({ ...t, used: false })));
        }, 1200);
      }
    }
  };

  const handleRemoveFromSlot = (slotIdx: number) => {
    if (isLevelSolved) return;
    const letterInSlot = filledSlots[slotIdx];
    if (!letterInSlot) return;

    sound.playPop();
    const nextFilled = [...filledSlots];
    nextFilled[slotIdx] = null;
    setFilledSlots(nextFilled);

    // Return the tile to unused
    const tileToFree = availableTiles.find(t => t.used && t.letter === letterInSlot);
    if (tileToFree) {
      setAvailableTiles(prev => prev.map(t => t.id === tileToFree.id ? { ...t, used: false } : t));
    }
  };

  const handleNextChallenge = () => {
    sound.playPop();
    if (levelIdx + 1 < challenges.length) {
      const nextIdx = levelIdx + 1;
      setLevelIdx(nextIdx);
      setIsLevelSolved(false);
      setFilledSlots(new Array(challenges[nextIdx].parts.length).fill(null));
      setAvailableTiles(
        challenges[nextIdx].parts
          .map((p, i) => ({ id: `tile_${i}`, letter: p.letter, used: false }))
          .sort(() => Math.random() - 0.5)
      );
    } else {
      setIsGameCompleted(true);
      sound.playFanfare();
      sound.speakArabic('مَبْرُوكٌ يَا خَطَّاطَ الْمُسْتَقْبَل! لَقَدْ بَنَيْتَ كُلَّ قِطَارَاتِ الْكَلِمَاتِ بِنَجَاح!');
      onEarnRewards(5, 20, 50);
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
    }
  };

  const handleRestartGame = () => {
    sound.playPop();
    setLevelIdx(0);
    setIsGameCompleted(false);
    setIsLevelSolved(false);
    setFilledSlots(new Array(challenges[0].parts.length).fill(null));
    setAvailableTiles(
      challenges[0].parts
        .map((p, i) => ({ id: `tile_${i}`, letter: p.letter, used: false }))
        .sort(() => Math.random() - 0.5)
    );
  };

  if (isGameCompleted) {
    return (
      <div className="bg-white rounded-3xl p-6 sm:p-8 text-center border-4 border-pink-300 shadow-md max-w-xl mx-auto my-4 space-y-4">
        <div className="text-6xl animate-bounce">🚂✨</div>
        <span className="text-xs uppercase font-black bg-pink-100 text-pink-900 px-3 py-1 rounded-full">
          شَهَادَةُ سَائِقِ قِطَارِ الْحُرُوف
        </span>
        <h3 className="text-2xl sm:text-3xl font-black font-kids text-slate-800">
          مَبْرُوكٌ يَا فَنَّانَ الْكِتَابَة!
        </h3>
        <p className="text-slate-600 font-medium text-sm sm:text-base">
          مَعَ فَرْفُوش الأَرْنَب 🐰 لَقَدْ رَكَّبْتَ جَمِيعَ كَلِمَاتِ الْكِتَابَةِ الْمُتَّصِلَةِ وَفُزْتَ بِـ <strong>٢٠ عُمْلَةً 🪙</strong> وَ <strong>٥ نُجُومٍ ⭐</strong>!
        </p>

        <button
          onClick={handleRestartGame}
          className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 text-white font-kids font-bold text-base px-8 py-3 rounded-2xl shadow-md inline-flex items-center gap-2 transition-all active:scale-95"
        >
          <RotateCcw className="w-5 h-5" />
          <span>إِعَادَةُ قِطَارِ الْكَلِمَات</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Game Header */}
      <div className="bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 rounded-3xl p-5 sm:p-6 text-white shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚂</span>
            <h2 className="text-xl sm:text-2xl font-black font-kids">
              لُعْبَةُ الْكِتَابَة: قِطَارُ تَرْكِيبِ الْحُرُوفِ الْمُتَّصِلَة
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-white/95 mt-1 font-medium">
            مَعَ فَرْفُوشَ الْأَرْنَبِ الْفَنَّان 🐰: رَتِّبْ حُرُوفَ الْكَلِمَةِ فِي عَرَبَاتِ الْقِطَارِ بِحَسَبِ مَوْقِعِهَا الصَّحِيحِ!
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/25 px-3 py-1.5 rounded-2xl border border-white/30 text-xs font-bold">
          <span>الْكَلِمَة:</span>
          <span>{levelIdx + 1} / {challenges.length}</span>
        </div>
      </div>

      {/* Target Word & Train Stage */}
      <div className="bg-gradient-to-b from-white to-pink-50/60 rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-pink-200 text-center">
        {/* Target Emoji Hint */}
        <div className="text-6xl mb-2 animate-playful">
          {currentChallenge.imageEmoji}
        </div>
        <h3 className="font-kids font-black text-xl sm:text-2xl text-slate-800">
          هَيَّا نُكَوِّنْ كَلِمَةَ: «{currentChallenge.word}»
        </h3>
        <p className="text-xs text-slate-500 mt-0.5 mb-6 font-medium">
          {currentChallenge.meaning}
        </p>

        {/* The Train Engine & Wagons (RTL) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 my-6">
          {/* Train Engine */}
          <div className="w-20 h-24 sm:w-24 sm:h-28 bg-gradient-to-t from-pink-600 to-rose-500 rounded-3xl shadow-md border-4 border-yellow-300 flex flex-col items-center justify-center text-white relative">
            <span className="text-3xl sm:text-4xl">🚂</span>
            <span className="text-[10px] font-kids font-black text-yellow-200 mt-1">الْقَاطِرَة</span>
            <div className="absolute -bottom-2 w-4 h-4 bg-slate-800 rounded-full border-2 border-slate-300" />
          </div>

          {/* Wagons Slots (from right to left) */}
          {filledSlots.map((char, slotIdx) => {
            const partInfo = currentChallenge.parts[slotIdx];
            const isFilled = char !== null;

            return (
              <div
                key={slotIdx}
                onClick={() => isFilled && handleRemoveFromSlot(slotIdx)}
                className={`w-20 h-24 sm:w-24 sm:h-28 rounded-3xl border-3 flex flex-col items-center justify-between p-2 relative transition-all cursor-pointer select-none ${
                  isFilled
                    ? 'bg-white border-pink-400 shadow-md scale-102 hover:border-red-400'
                    : 'bg-pink-100/60 border-dashed border-pink-300 hover:bg-pink-200/50'
                }`}
              >
                {/* Wagon Wheels */}
                <div className="absolute -bottom-2.5 flex items-center justify-between w-12">
                  <div className="w-3.5 h-3.5 bg-slate-800 rounded-full border-2 border-yellow-300" />
                  <div className="w-3.5 h-3.5 bg-slate-800 rounded-full border-2 border-yellow-300" />
                </div>

                <span className="text-[9px] font-bold text-slate-400">
                  {partInfo.positionLabel}
                </span>

                <div className="text-3xl sm:text-4xl font-black font-reading text-pink-600">
                  {char || '؟'}
                </div>

                <span className="text-[9px] font-bold text-pink-700 bg-pink-50 px-1.5 py-0.5 rounded-md">
                  {isFilled ? 'انْقُرْ لِلْإِعَادَة' : 'فَارِغ'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Available Letters on the ground */}
        <div className="mt-8 pt-6 border-t border-pink-200">
          <div className="text-xs font-bold text-slate-500 mb-3">
            انْقُرْ عَلَى الْحَرْفِ لِيَصْعَدَ إِلَى عَرَبَتِهِ الصَّحِيحَةِ:
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {availableTiles.map((tile) => {
              return (
                <button
                  key={tile.id}
                  disabled={tile.used || isLevelSolved}
                  onClick={() => handleTileClick(tile)}
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl font-black font-reading text-2xl sm:text-3xl transition-all duration-200 flex items-center justify-center shadow-md active:scale-90 ${
                    tile.used
                      ? 'bg-slate-100 text-slate-300 border-2 border-slate-200 cursor-not-allowed opacity-40'
                      : 'bg-white text-slate-800 border-3 border-pink-300 hover:border-pink-500 hover:bg-pink-50'
                  }`}
                >
                  {tile.letter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Solved Success Banner */}
        {isLevelSolved && (
          <div className="mt-6 bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 animate-bounce">
            <div className="flex items-center gap-2 text-emerald-800 font-kids font-bold text-base">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <span>أَحْسَنْتَ يَا بَطَل! اكْتَمَلَ قِطَارُ كَلِمَةِ «{currentChallenge.word}» بِنَجَاح!</span>
            </div>

            <button
              onClick={handleNextChallenge}
              className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-kids font-bold text-sm px-6 py-2 rounded-xl shadow-md transition-all"
            >
              الْكَلِمَةُ التَّالِيَة ➡️
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
