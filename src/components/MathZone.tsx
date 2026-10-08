import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { MATH_DATA } from '../data/curriculumData';
import { EASY_MATH_DATA, HARD_MATH_DATA, getDifficultyConfig } from '../data/difficultyData';
import { DifficultyLevel, MathItem } from '../types';
import { sound } from '../utils/soundEffects';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft, 
  Volume2, 
  HelpCircle, 
  Trophy, 
  RefreshCw, 
  Shuffle, 
  Calculator,
  Plus,
  Minus,
  Shapes,
  Scale,
  Hash
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MathZoneProps {
  onEarnRewards: (stars: number, coins: number, xp: number) => void;
  difficultyLevel?: DifficultyLevel;
  onOpenSettings?: () => void;
}

type MathCategoryFilter = 'all' | 'count' | 'add' | 'subtract' | 'compare' | 'shapes';

// Extensive pool of emojis for variety
const MATH_EMOJIS = ['🍎', '🍓', '🍌', '🍊', '⭐', '🎈', '🐟', '🍪', '🚗', '🐱', '🦋', '🍬', '🦁', '🦆', '⚽'];

// Dynamic Math Problem Generator for infinite non-repeating exercises
function createDynamicMathItem(category: 'count' | 'add' | 'subtract' | 'compare' | 'shapes', level: DifficultyLevel): MathItem {
  const emoji = MATH_EMOJIS[Math.floor(Math.random() * MATH_EMOJIS.length)];
  const id = `dyn_${category}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

  if (category === 'count') {
    const max = level === 'easy' ? 5 : level === 'hard' ? 12 : 8;
    const count = Math.floor(Math.random() * (max - 2)) + 2;
    const wrong1 = count + 1;
    const wrong2 = Math.max(1, count - 1);
    const wrong3 = count + 2;
    const options = [count, wrong1, wrong2, wrong3].filter((v, i, a) => a.indexOf(v) === i).sort(() => Math.random() - 0.5);

    return {
      id,
      type: 'count',
      title: `عَدُّ ${emoji} الْمُمْتِع`,
      question: `كَمْ عُنْصُرًا ${emoji} أَمَامَكَ فِي الشَّاشَةِ؟`,
      itemsEmoji: emoji,
      itemCount1: count,
      options,
      correctAnswer: count,
      visualLabel: `عَدٌّ حَتَّى ${count}`
    };
  }

  if (category === 'add') {
    const max = level === 'easy' ? 4 : level === 'hard' ? 9 : 6;
    const c1 = Math.floor(Math.random() * max) + 1;
    const c2 = Math.floor(Math.random() * max) + 1;
    const sum = c1 + c2;
    const options = [sum, sum + 1, Math.max(1, sum - 1), sum + 2].filter((v, i, a) => a.indexOf(v) === i).sort(() => Math.random() - 0.5);

    return {
      id,
      type: 'add',
      title: `جَمْعُ ${emoji} اللَّذِيذ`,
      question: `مَعَنَا (${c1}) ${emoji} وَأَضَفْنَا إِلَيْهَا (${c2}) ${emoji}.. كَمْ كُلُّ الْعَنَاصِر؟`,
      itemsEmoji: emoji,
      itemCount1: c1,
      itemCount2: c2,
      operator: '+',
      options,
      correctAnswer: sum,
      visualLabel: `${c1} + ${c2}`
    };
  }

  if (category === 'subtract') {
    const max = level === 'easy' ? 6 : level === 'hard' ? 15 : 10;
    const c1 = Math.floor(Math.random() * (max - 3)) + 3;
    const c2 = Math.floor(Math.random() * (c1 - 1)) + 1;
    const diff = c1 - c2;
    const options = [diff, diff + 1, Math.max(0, diff - 1), diff + 2].filter((v, i, a) => a.indexOf(v) === i).sort(() => Math.random() - 0.5);

    return {
      id,
      type: 'subtract',
      title: `طَرْحُ ${emoji}`,
      question: `كَانَ لَدَيْنَا (${c1}) ${emoji} وَأَخَذْنَا مِنْهَا (${c2}) ${emoji}.. كَمْ بَقِيَ؟`,
      itemsEmoji: emoji,
      itemCount1: c1,
      itemCount2: c2,
      operator: '-',
      options,
      correctAnswer: diff,
      visualLabel: `${c1} - ${c2}`
    };
  }

  if (category === 'compare') {
    const max = level === 'easy' ? 8 : level === 'hard' ? 25 : 12;
    const c1 = Math.floor(Math.random() * max) + 1;
    let c2 = Math.floor(Math.random() * max) + 1;
    if (Math.random() < 0.25) c2 = c1;

    let ans = '';
    if (c1 > c2) ans = 'أَكْبَر مِنْ (> )';
    else if (c1 < c2) ans = 'أَصْغَر مِنْ (< )';
    else ans = 'يُسَاوِي (=)';

    return {
      id,
      type: 'compare',
      title: 'مُقَارَنَةُ الْأَعْدَاد',
      question: `مَا الْعَلَامَةُ الصَّحِيحَةُ بَيْنَ (${c1}) وَ (${c2})؟`,
      itemsEmoji: emoji,
      itemCount1: c1,
      itemCount2: c2,
      operator: c1 > c2 ? '>' : c1 < c2 ? '<' : '=',
      options: ['أَكْبَر مِنْ (> )', 'أَصْغَر مِنْ (< )', 'يُسَاوِي (=)'].sort(() => Math.random() - 0.5),
      correctAnswer: ans,
      visualLabel: `${c1} مقابل ${c2}`
    };
  }

  // Shapes
  const shapeList = [
    { name: 'دَائِرَة', emoji: '⭕', hint: 'مُسْتَدِيرَةٌ لَيْسَ لَهَا أَضْلَاع' },
    { name: 'مُرَبَّع', emoji: '🟩', hint: 'لَهُ ٤ أَضْلَاعٍ مُتَسَاوِيَة' },
    { name: 'مُثَلَّث', emoji: '🔺', hint: 'لَهُ ٣ أَضْلَاعٍ وَ ٣ رُؤُوس' },
    { name: 'مُسْتَطِيل', emoji: '🏷️', hint: 'شَكْلٌ رُبَاعِيٌّ كُلُّ ضِلْعَيْنِ مُتَقَابِلَيْنِ مُتَسَاوِيَان' },
  ];
  const chosenShape = shapeList[Math.floor(Math.random() * shapeList.length)];
  const shapeOptions = shapeList.map(s => s.name).sort(() => Math.random() - 0.5);

  return {
    id,
    type: 'shapes',
    title: 'تَعَرَّفْ عَلَى الشَّكْل',
    question: `مَا هُوَ الشَّكْلُ الْهَنْدَسِيُّ الَّذِي يُمَثِّلُ: ${chosenShape.emoji}؟`,
    itemsEmoji: chosenShape.emoji,
    itemCount1: 1,
    shapeTarget: chosenShape.name,
    options: shapeOptions,
    correctAnswer: chosenShape.name,
    visualLabel: chosenShape.hint
  };
}

export const MathZone: React.FC<MathZoneProps> = ({ 
  onEarnRewards, 
  difficultyLevel = 'medium',
  onOpenSettings 
}) => {
  const safeDiffLevel: DifficultyLevel = (difficultyLevel === 'easy' || difficultyLevel === 'hard') ? difficultyLevel : 'medium';
  const diffConfig = getDifficultyConfig(safeDiffLevel);
  const [selectedCategory, setSelectedCategory] = useState<MathCategoryFilter>('all');

  // Base dataset selection
  const basePool = useMemo(() => {
    const list = safeDiffLevel === 'easy' 
      ? [...EASY_MATH_DATA, ...MATH_DATA]
      : safeDiffLevel === 'hard' 
        ? [...HARD_MATH_DATA, ...MATH_DATA] 
        : [...MATH_DATA, ...EASY_MATH_DATA];
    return list;
  }, [safeDiffLevel]);

  // Queue of non-repeating items
  const [itemQueue, setItemQueue] = useState<MathItem[]>(() => {
    return [...basePool].sort(() => Math.random() - 0.5);
  });

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  // Filtered dataset according to category
  const activeDataset = useMemo(() => {
    if (selectedCategory === 'all') return itemQueue;
    const filtered = itemQueue.filter(item => item.type === selectedCategory);
    // If not enough items in filtered, generate on the fly
    if (filtered.length < 3) {
      const generated = [
        createDynamicMathItem(selectedCategory as any, safeDiffLevel),
        createDynamicMathItem(selectedCategory as any, safeDiffLevel),
        createDynamicMathItem(selectedCategory as any, safeDiffLevel),
        createDynamicMathItem(selectedCategory as any, safeDiffLevel),
      ];
      return [...filtered, ...generated];
    }
    return filtered;
  }, [itemQueue, selectedCategory, safeDiffLevel]);

  // Current problem
  const currentItem = activeDataset[currentIdx] || activeDataset[0] || basePool[0];

  const handleSelectOption = (opt: string | number) => {
    if (isAnswered) return;
    setSelectedOption(opt);
    setIsAnswered(true);

    const correct = opt === currentItem.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      sound.playSuccess();
      sound.speakPraise();
      const earnedStars = safeDiffLevel === 'hard' ? 3 : 2;
      const earnedCoins = safeDiffLevel === 'hard' ? 8 : 5;
      const earnedXp = Math.round(20 * diffConfig.rewardMultiplier);
      onEarnRewards(earnedStars, earnedCoins, earnedXp);
      confetti({
        particleCount: safeDiffLevel === 'hard' ? 50 : 35,
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

    if (currentIdx + 1 < activeDataset.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      // Reached end of current queue: generate new fresh problems!
      const cat = selectedCategory === 'all' 
        ? (['count', 'add', 'subtract', 'compare', 'shapes'][Math.floor(Math.random() * 5)] as any) 
        : selectedCategory;
      const freshItems = [
        createDynamicMathItem(cat, safeDiffLevel),
        createDynamicMathItem(cat, safeDiffLevel),
        createDynamicMathItem(cat, safeDiffLevel),
        createDynamicMathItem(cat, safeDiffLevel),
      ];
      setItemQueue(prev => [...freshItems, ...prev.slice(0, 5)]);
      setCurrentIdx(0);
      sound.speakArabic('مَسَائِلُ جَدِيدَةٌ غَيْرُ مُكَرَّرَة، وَاصِلِ التَّفَوُّقَ يَا بَطَل!');
    }
  };

  const handleGenerateFreshQuestion = () => {
    sound.playPop();
    const cat = selectedCategory === 'all' 
      ? (['count', 'add', 'subtract', 'compare', 'shapes'][Math.floor(Math.random() * 5)] as any) 
      : selectedCategory;
    const fresh = createDynamicMathItem(cat, safeDiffLevel);
    setItemQueue(prev => [fresh, ...prev]);
    setCurrentIdx(0);
    setIsAnswered(false);
    setSelectedOption(null);
    sound.speakArabic('تَمَّ تَوْلِيدُ مَسْأَلَةٍ حِسَابِيَّةٍ جَدِيدَة!');
  };

  const handleCategoryChange = (cat: MathCategoryFilter) => {
    sound.playPop();
    setSelectedCategory(cat);
    setCurrentIdx(0);
    setIsAnswered(false);
    setSelectedOption(null);
  };

  const renderVisuals = () => {
    if (!currentItem) return null;

    if (currentItem.type === 'count') {
      return (
        <div className="flex flex-wrap items-center justify-center gap-3 my-6 max-w-md mx-auto p-4 bg-white/80 rounded-2xl border-2 border-amber-200 shadow-xs">
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
        <div className="flex items-center justify-center gap-3 sm:gap-6 my-6 max-w-lg mx-auto p-4 bg-white/80 rounded-2xl border-2 border-amber-200 shadow-xs">
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
        <div className="flex flex-col items-center justify-center gap-3 my-6 max-w-md mx-auto p-4 bg-white/80 rounded-2xl border-2 border-amber-200 shadow-xs">
          <div className="flex items-center gap-2 flex-wrap justify-center">
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
          <p className="text-xs text-slate-600 font-bold">
            كَانَ عَدَدُهَا ({currentItem.itemCount1}) وَطُرِحَتْ مِنْهَا ({currentItem.itemCount2})!
          </p>
        </div>
      );
    }

    if (currentItem.type === 'shapes') {
      return (
        <div className="flex items-center justify-center gap-4 my-6 text-6xl">
          <span className="p-5 bg-amber-100 rounded-3xl border-2 border-amber-300 animate-playful shadow-xs">
            {currentItem.itemsEmoji}
          </span>
        </div>
      );
    }

    if (currentItem.type === 'compare') {
      return (
        <div className="flex items-center justify-center gap-6 my-6 max-w-md mx-auto p-4 bg-white/80 rounded-2xl border-2 border-amber-200 shadow-xs">
          <div className="text-center p-3 bg-amber-100 rounded-2xl w-24 border border-amber-300">
            <div className="text-4xl font-black font-kids text-amber-900">{currentItem.itemCount1}</div>
            <div className="text-xs text-amber-700 font-bold mt-1">
              {currentItem.itemsEmoji.repeat(Math.min(currentItem.itemCount1, 3))}
            </div>
          </div>
          <div className="text-2xl font-black font-kids text-slate-400">⚖️</div>
          <div className="text-center p-3 bg-blue-100 rounded-2xl w-24 border border-blue-300">
            <div className="text-4xl font-black font-kids text-blue-900">{currentItem.itemCount2}</div>
            <div className="text-xs text-blue-700 font-bold mt-1">
              {currentItem.itemsEmoji.repeat(Math.min(currentItem.itemCount2 || 1, 3))}
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-6">
      {/* Title Bar & Categories */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border-2 border-amber-200 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔢</span>
              <h2 className="text-xl sm:text-2xl font-black font-kids text-slate-800">
                مِنْطَقَةُ الْحِسَابِ وَالْعَدِّ الذَّكِيّ
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              أَسْئِلَةٌ حِسَابِيَّةٌ مُتَجَدِّدَةٌ تُلَبِّي جَمِيعَ مَهَارَاتِ الْعَدِّ وَالْجَمْعِ وَالطَّرْحِ دُونَ تَنَاهٍ!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleGenerateFreshQuestion}
              className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-3 py-1.5 rounded-xl font-bold font-kids text-xs shadow-xs active:scale-95 transition-all cursor-pointer"
              title="توليد مسألة جديدة فوراً"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>مَسْأَلَةٌ جَدِيدَة 🎲</span>
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
                <span>المستوى: {diffConfig.labelShort}</span>
              </button>
            )}

            <button
              onClick={() => sound.speakArabic(currentItem?.question || '')}
              className="flex items-center gap-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 px-3 py-1.5 rounded-xl font-bold text-xs cursor-pointer active:scale-95"
            >
              <Volume2 className="w-4 h-4 text-amber-700" />
              <span>اقْرَأْ لِي 🔊</span>
            </button>
          </div>
        </div>

        {/* Math Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-black text-slate-600 ml-1">تَصْنِيفُ الْمَسَائِل:</span>

          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-3 py-1.5 rounded-xl font-kids font-bold text-xs flex items-center gap-1 transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-amber-500 text-white shadow-sm ring-2 ring-amber-300'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>كُلُّ الْمَسَائِل 🌟</span>
          </button>

          <button
            onClick={() => handleCategoryChange('count')}
            className={`px-3 py-1.5 rounded-xl font-kids font-bold text-xs flex items-center gap-1 transition-all cursor-pointer ${
              selectedCategory === 'count'
                ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-300'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Hash className="w-3.5 h-3.5" />
            <span>عَدُّ الْأَشْيَاء 🍎</span>
          </button>

          <button
            onClick={() => handleCategoryChange('add')}
            className={`px-3 py-1.5 rounded-xl font-kids font-bold text-xs flex items-center gap-1 transition-all cursor-pointer ${
              selectedCategory === 'add'
                ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-300'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>عَمَلِيَّاتُ الْجَمْع ➕</span>
          </button>

          <button
            onClick={() => handleCategoryChange('subtract')}
            className={`px-3 py-1.5 rounded-xl font-kids font-bold text-xs flex items-center gap-1 transition-all cursor-pointer ${
              selectedCategory === 'subtract'
                ? 'bg-rose-600 text-white shadow-sm ring-2 ring-rose-300'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Minus className="w-3.5 h-3.5" />
            <span>عَمَلِيَّاتُ الطَّرْح ➖</span>
          </button>

          <button
            onClick={() => handleCategoryChange('compare')}
            className={`px-3 py-1.5 rounded-xl font-kids font-bold text-xs flex items-center gap-1 transition-all cursor-pointer ${
              selectedCategory === 'compare'
                ? 'bg-purple-600 text-white shadow-sm ring-2 ring-purple-300'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>مُقَارَنَةُ الأَعْدَاد ⚖️</span>
          </button>

          <button
            onClick={() => handleCategoryChange('shapes')}
            className={`px-3 py-1.5 rounded-xl font-kids font-bold text-xs flex items-center gap-1 transition-all cursor-pointer ${
              selectedCategory === 'shapes'
                ? 'bg-teal-600 text-white shadow-sm ring-2 ring-teal-300'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Shapes className="w-3.5 h-3.5" />
            <span>الأَشْكَالُ الْهَنْدَسِيَّة 🔺</span>
          </button>
        </div>
      </div>

      {/* Main Question Card */}
      {currentItem && (
        <div className="bg-gradient-to-br from-amber-50/90 via-white to-blue-50/90 rounded-3xl p-6 sm:p-8 shadow-md border-2 border-amber-200 text-center relative">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-200">
              تَمْرِين {currentIdx + 1} مِنْ {activeDataset.length}
            </span>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              {currentItem.title}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black font-kids text-slate-800 my-3 leading-relaxed">
            {currentItem.question}
          </h3>

          {/* Visual representations */}
          {renderVisuals()}

          {/* Answer Options */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto mt-6">
            {currentItem.options.map((opt) => {
              const isSelected = selectedOption === opt;
              const isCorrectOpt = opt === currentItem.correctAnswer;

              let btnStyle = 'bg-white hover:bg-amber-50 text-slate-800 border-2 border-slate-200 hover:border-amber-400';
              if (isAnswered) {
                if (isCorrectOpt) {
                  btnStyle = 'bg-emerald-500 text-white border-2 border-emerald-600 shadow-md scale-105 ring-4 ring-emerald-200';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-500 text-white border-2 border-rose-600 animate-shake';
                } else {
                  btnStyle = 'bg-slate-100 text-slate-400 opacity-50 border-slate-200';
                }
              }

              return (
                <button
                  key={opt}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(opt)}
                  className={`py-3.5 px-4 rounded-2xl font-kids font-black text-xl transition-all duration-200 active:scale-95 cursor-pointer shadow-xs ${btnStyle}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Feedback & Next */}
          {isAnswered && (
            <div className="mt-6 flex flex-col items-center justify-center gap-3 animate-in fade-in duration-200">
              <div className={`p-3 rounded-2xl border font-kids font-bold text-base max-w-md ${
                isCorrect 
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
                  : 'bg-rose-50 border-rose-300 text-rose-900'
              }`}>
                {isCorrect ? 'أَحْسَنْتَ يَا عَبْقَرِيَّ الْحِسَاب! إِجَابَةٌ صَحِيحَةٌ بَاهِرَة ⭐' : `حَاوِلْ مَرَّةً أُخْرَى! الإِجَابَةُ الصَّحِيحَةُ هِيَ: ${currentItem.correctAnswer}`}
              </div>

              <button
                onClick={handleNextQuestion}
                className="mt-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:scale-95 text-white font-kids font-bold text-base px-8 py-3 rounded-2xl shadow-md inline-flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>المَسْأَلَةُ التَّالِيَة ⬅️</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
