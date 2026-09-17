import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
import { Volume2, Sparkles, RotateCcw, CheckCircle2, ArrowLeft, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReadingGameProps {
  onEarnRewards: (stars: number, coins: number, xp: number) => void;
  onCompleteGameScore?: (game: 'reading' | 'writing' | 'math') => void;
}

interface ReadingBasketItem {
  id: string;
  word: string;
  char: string;
  imageEmoji: string;
  meaning: string;
  category: 'fatha' | 'damma' | 'kasra';
  categoryLabel: string;
}

export const ReadingGame: React.FC<ReadingGameProps> = ({ onEarnRewards, onCompleteGameScore }) => {
  const allApples: ReadingBasketItem[] = [
    { id: 'a1', word: 'أَرْنَب', char: 'أَ', imageEmoji: '🐇', meaning: 'أَرْنَب يَجْرِي', category: 'fatha', categoryLabel: 'حَرَكَةُ الْفَتْحَة (ـَ)' },
    { id: 'a2', word: 'أُذُن', char: 'أُ', imageEmoji: '👂', meaning: 'أُذُن نَسْمَعُ بِهَا', category: 'damma', categoryLabel: 'حَرَكَةُ الضَّمَّة (ـُ)' },
    { id: 'a3', word: 'إِبْرَة', char: 'إِ', imageEmoji: '🪡', meaning: 'إِبْرَة نَخِيطُ بِهَا', category: 'kasra', categoryLabel: 'حَرَكَةُ الْكَسْرَة (ـِ)' },
    { id: 'a4', word: 'بَقَرَة', char: 'بَ', imageEmoji: '🐄', meaning: 'بَقَرَة تُعْطِينَا لَبَنًا', category: 'fatha', categoryLabel: 'حَرَكَةُ الْفَتْحَة (ـَ)' },
    { id: 'a5', word: 'بُرْتُقَال', char: 'بُ', imageEmoji: '🍊', meaning: 'بُرْتُقَال لَذِيذ', category: 'damma', categoryLabel: 'حَرَكَةُ الضَّمَّة (ـُ)' },
    { id: 'a6', word: 'بِطِّيخ', char: 'بِ', imageEmoji: '🍉', meaning: 'بِطِّيخ صَيْفِيّ', category: 'kasra', categoryLabel: 'حَرَكَةُ الْكَسْرَة (ـِ)' },
    { id: 'a7', word: 'سَمَكَة', char: 'سَ', imageEmoji: '🐟', meaning: 'سَمَكَة تَعُوم', category: 'fatha', categoryLabel: 'حَرَكَةُ الْفَتْحَة (ـَ)' },
    { id: 'a8', word: 'سُلَحْفَاة', char: 'سُ', imageEmoji: '🐢', meaning: 'سُلَحْفَاة صَبُورَة', category: 'damma', categoryLabel: 'حَرَكَةُ الضَّمَّة (ـُ)' },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [basketFatha, setBasketFatha] = useState<ReadingBasketItem[]>([]);
  const [basketDamma, setBasketDamma] = useState<ReadingBasketItem[]>([]);
  const [basketKasra, setBasketKasra] = useState<ReadingBasketItem[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  const currentApple = allApples[currentIndex];

  const baskets = [
    { key: 'fatha', title: 'سَلَّةُ الْفَتْحَة', symbol: 'ـَ', color: 'bg-rose-50 border-rose-300 text-rose-800', hoverColor: 'border-rose-500 bg-rose-100', items: basketFatha },
    { key: 'damma', title: 'سَلَّةُ الضَّمَّة', symbol: 'ـُ', color: 'bg-blue-50 border-blue-300 text-blue-800', hoverColor: 'border-blue-500 bg-blue-100', items: basketDamma },
    { key: 'kasra', title: 'سَلَّةُ الْكَسْرَة', symbol: 'ـِ', color: 'bg-emerald-50 border-emerald-300 text-emerald-800', hoverColor: 'border-emerald-500 bg-emerald-100', items: basketKasra },
  ];

  const handlePlaceInBasket = (basketKey: 'fatha' | 'damma' | 'kasra') => {
    if (!currentApple || isFinished) return;

    if (currentApple.category === basketKey) {
      // Correct match!
      sound.playSuccess();
      sound.speakArabic(`أَحْسَنْتَ يَا بَطَل! كَلِمَةُ «${currentApple.word}» تَبْدَأُ بِحَرْفِ «${currentApple.char}» مَعَ ${currentApple.categoryLabel}`);
      onEarnRewards(1, 3, 15);
      if (onCompleteGameScore) onCompleteGameScore('reading');

      if (basketKey === 'fatha') setBasketFatha(prev => [...prev, currentApple]);
      if (basketKey === 'damma') setBasketDamma(prev => [...prev, currentApple]);
      if (basketKey === 'kasra') setBasketKasra(prev => [...prev, currentApple]);

      setFeedback(`صَحِيح! وَضَعْتَ «${currentApple.word}» فِي السَّلَّةِ الصَّحِيحَة! ⭐`);

      if (currentIndex + 1 < allApples.length) {
        setTimeout(() => {
          setFeedback(null);
          setCurrentIndex(prev => prev + 1);
        }, 1100);
      } else {
        setTimeout(() => {
          setIsFinished(true);
          sound.playFanfare();
          sound.speakArabic('مَبْرُوكٌ يَا بَطَلَ الْقِرَاءَة! لَقَدْ صَنَّفْتَ جَمِيعَ ثِمَارِ الْحُرُوفِ بِنَجَاح!');
          onEarnRewards(5, 20, 50);
          confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
        }, 1200);
      }
    } else {
      // Wrong basket
      sound.playTryAgain();
      sound.speakArabic(`حَاوِلْ مَرَّةً أُخْرَى! انْظُرْ جَيِّدًا إِلَى حَرَكَةِ حَرْفِ «${currentApple.char}»`);
      setFeedback(`انْتَبِهْ! «${currentApple.word}» لا تَبْدَأُ بِهَذِهِ الْحَرَكَةِ! فَتِّشْ عَنْ سَلَّتِهَا الصَّحِيحَة 🍎`);
    }
  };

  const handleRestart = () => {
    sound.playPop();
    setCurrentIndex(0);
    setBasketFatha([]);
    setBasketDamma([]);
    setBasketKasra([]);
    setIsFinished(false);
    setFeedback(null);
  };

  if (isFinished) {
    return (
      <div className="bg-white rounded-3xl p-6 sm:p-8 text-center border-4 border-amber-300 shadow-md max-w-xl mx-auto my-4 space-y-4">
        <div className="text-6xl animate-bounce">🧺🍎</div>
        <span className="text-xs uppercase font-black bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
          إِنْجَازُ بَطَلِ الْقِرَاءَة
        </span>
        <h3 className="text-2xl sm:text-3xl font-black font-kids text-slate-800">
          مَبْرُوكٌ يَا صَاحِبَ السَّلَّةِ السِّحْرِيَّة!
        </h3>
        <p className="text-slate-600 font-medium text-sm sm:text-base">
          لَقَدْ صَنَّفْتَ كُلَّ كَلِمَاتِ الْحَرَكَاتِ (الْفَتْحَة، الضَّمَّة، الْكَسْرَة) وَفُزْتَ بِـ <strong>٢٠ عُمْلَةً 🪙</strong> وَ <strong>٥ نُجُومٍ ⭐</strong>!
        </p>

        <button
          onClick={handleRestart}
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 text-white font-kids font-bold text-base px-8 py-3 rounded-2xl shadow-md inline-flex items-center gap-2 transition-all active:scale-95"
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
      <div className="bg-gradient-to-r from-rose-400 via-amber-400 to-orange-400 rounded-3xl p-5 sm:p-6 text-white shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍎</span>
            <h2 className="text-xl sm:text-2xl font-black font-kids">
              لُعْبَةُ الْقِرَاءَة: سَلَّةُ الْحَرَكَاتِ وَالْأَصْوَات
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-white/95 mt-1 font-medium">
            مَعَ كِيمُو الشِّبْلِ الشُّجَاع 🦁: اسْحَبِ الثَّمَرَةَ أَوْ انْقُرْ عَلَى السَّلَّةِ الَّتِي تُنَاسِبُ حَرَكَةَ الْحَرْفِ!
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/25 px-3 py-1.5 rounded-2xl border border-white/30 text-xs font-bold">
          <span>التَّقَدُّم:</span>
          <span>{currentIndex + 1} / {allApples.length}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / allApples.length) * 100}%` }}
        />
      </div>

      {/* Active Word Card to Drag/Classify */}
      {currentApple && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-amber-200 text-center max-w-md mx-auto relative overflow-hidden">
          <div className="text-xs font-bold text-amber-700 bg-amber-50 inline-block px-3 py-1 rounded-full mb-2">
            مَا هِيَ حَرَكَةُ الْحَرْفِ الْمُمَيَّز؟
          </div>

          {/* Fruit / Emoji */}
          <div className="text-6xl my-2 animate-playful">
            {currentApple.imageEmoji}
          </div>

          {/* Word in Large Arabic Naskh */}
          <div className="text-4xl sm:text-5xl font-black font-kids text-slate-800 my-2">
            {currentApple.word}
          </div>

          <div className="text-sm text-slate-500 font-medium mb-3">
            الحرف الأول: <span className="text-2xl font-black text-rose-600 font-kids">{currentApple.char}</span>
          </div>

          {/* Speak word button */}
          <button
            onClick={() => {
              sound.playPop();
              sound.speakArabic(currentApple.word);
            }}
            className="inline-flex items-center gap-2 bg-amber-100 hover:bg-amber-200 active:scale-95 text-amber-900 px-4 py-2 rounded-2xl text-xs font-bold transition-all"
          >
            <Volume2 className="w-4 h-4 text-amber-700" />
            <span>اسْتَمِعْ لِلْكَلِمَةِ</span>
          </button>

          {/* Draggable indicator */}
          <div
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain', currentApple.category);
              setActiveDragId(currentApple.id);
            }}
            onDragEnd={() => setActiveDragId(null)}
            className="mt-4 p-3 bg-amber-50 border-2 border-dashed border-amber-400 rounded-2xl cursor-grab active:cursor-grabbing hover:bg-amber-100/60 transition-all"
          >
            <span className="text-xs font-bold text-amber-900 flex items-center justify-center gap-1">
              <span>✋ انْقُرْ عَلَى السَّلَّةِ بِالأَسْفَلِ، أَوْ اسْحَبِ الْبِطَاقَةَ إِلَيْهَا!</span>
            </span>
          </div>

          {feedback && (
            <div className="mt-3 text-xs sm:text-sm font-kids font-bold text-slate-700 p-2 rounded-xl bg-slate-50 border border-slate-200 animate-pulse">
              {feedback}
            </div>
          )}
        </div>
      )}

      {/* 3 Baskets Drop Targets */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {baskets.map((basket) => {
          return (
            <div
              key={basket.key}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handlePlaceInBasket(basket.key as any);
              }}
              onClick={() => handlePlaceInBasket(basket.key as any)}
              className={`rounded-3xl p-5 border-3 transition-all cursor-pointer text-center relative flex flex-col justify-between min-h-[160px] active:scale-95 shadow-sm hover:shadow-md ${basket.color}`}
            >
              <div>
                <div className="text-4xl mb-1">🧺</div>
                <h3 className="font-kids font-black text-xl mb-1">
                  {basket.title}
                </h3>
                <span className="text-3xl font-black font-reading px-3 py-0.5 rounded-xl bg-white/70 shadow-xs inline-block">
                  {basket.symbol}
                </span>
              </div>

              {/* Items collected in this basket */}
              <div className="mt-3 pt-3 border-t border-slate-200/50 flex flex-wrap items-center justify-center gap-1.5 min-h-[36px]">
                {basket.items.length === 0 ? (
                  <span className="text-[11px] font-medium text-slate-400">السَّلَّةُ فَارِغَة</span>
                ) : (
                  basket.items.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-kids font-bold bg-white px-2 py-0.5 rounded-lg shadow-xs flex items-center gap-1"
                    >
                      <span>{item.imageEmoji}</span>
                      <span>{item.word}</span>
                    </span>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
