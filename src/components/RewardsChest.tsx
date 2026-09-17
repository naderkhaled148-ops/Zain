import React, { useState } from 'react';
import { UserProgress, Sticker } from '../types';
import { INITIAL_STICKERS } from '../data/curriculumData';
import { sound } from '../utils/soundEffects';
import { Trophy, Sparkles, Flame, Check, Lock, Star, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RewardsChestProps {
  progress: UserProgress;
  onEarnRewards: (stars: number, coins: number, xp: number) => void;
  onUnlockSticker: (stickerId: string, cost: number) => void;
}

export const RewardsChest: React.FC<RewardsChestProps> = ({
  progress,
  onEarnRewards,
  onUnlockSticker
}) => {
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [wheelRotation, setWheelRotation] = useState<number>(0);
  const [lastWonPrize, setLastWonPrize] = useState<string | null>(null);

  const wheelSegments = [
    { label: '+١٠ عُمْلَات', type: 'coins', amount: 10, stars: 1, xp: 20, color: '#F59E0B' },
    { label: '+٣ نُجُوم', type: 'stars', amount: 5, stars: 3, xp: 25, color: '#3B82F6' },
    { label: '+٢٠ نُقْطَة', type: 'xp', amount: 5, stars: 1, xp: 40, color: '#10B981' },
    { label: '+١٥ عُمْلَة', type: 'coins', amount: 15, stars: 2, xp: 30, color: '#EC4899' },
    { label: 'كَنْزٌ كَبِير! ⭐', type: 'all', amount: 25, stars: 5, xp: 50, color: '#8B5CF6' },
    { label: '+٥ عُمْلَات', type: 'coins', amount: 5, stars: 1, xp: 15, color: '#EF4444' },
  ];

  const handleSpinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setLastWonPrize(null);
    sound.playPop();

    const randomSegment = Math.floor(Math.random() * wheelSegments.length);
    const extraDegrees = 360 * 5 + (randomSegment * (360 / wheelSegments.length));
    const newRot = wheelRotation + extraDegrees;
    setWheelRotation(newRot);

    setTimeout(() => {
      setIsSpinning(false);
      const prize = wheelSegments[randomSegment];
      setLastWonPrize(prize.label);
      sound.playFanfare();
      sound.speakArabic(`مَبْرُوك! فُزْتَ بِـ ${prize.label}!`);
      onEarnRewards(prize.stars, prize.amount, prize.xp);
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 }
      });
    }, 3000);
  };

  const daysOfWeek = ['الْسَّبْت', 'الأَحَد', 'الإِثْنَيْن', 'الثُّلاثَاء', 'الأَرْبِعَاء', 'الْخَمِيس', 'الْجُمُعَة'];

  return (
    <div className="space-y-6">
      {/* Header Overview */}
      <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 rounded-3xl p-6 sm:p-8 text-amber-950 shadow-md border-2 border-yellow-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-black bg-white/40 px-3 py-1 rounded-full">
            خَزِينَةُ الْأَبْطَالِ وَالتَّشْجِيع
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-kids mt-1">
            كَنْزُ الْمُكَافَآتِ وَأَلْبُومُ الْمُلْصَقَات
          </h2>
          <p className="text-xs sm:text-sm text-amber-900 font-medium mt-1">
            كُلَّمَا قَرَأْتَ وَكَتَبْتَ وَحَسَبْتَ أَكْثَرَ، جَمَعْتَ عُمْلَاتٍ لِتَفْتَحَ مُلْصَقَاتٍ نَادِرَةً!
          </p>
        </div>

        {/* Big Balance Display */}
        <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm p-3.5 rounded-2xl border border-amber-200">
          <div className="text-center px-3">
            <div className="text-3xl font-black font-kids text-amber-700">⭐ {progress.stars}</div>
            <div className="text-[11px] font-bold text-slate-500">نُجُوم مُضِيئَة</div>
          </div>
          <div className="w-px h-10 bg-amber-300" />
          <div className="text-center px-3">
            <div className="text-3xl font-black font-kids text-amber-900">🪙 {progress.coins}</div>
            <div className="text-[11px] font-bold text-slate-500">عُمْلَات ذَهَبِيَّة</div>
          </div>
        </div>
      </div>

      {/* Grid: Daily Wheel & 7-Day Streak */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* The Lucky Letter Wheel (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-sm border border-amber-100 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🎡</span>
            <h3 className="font-kids font-black text-xl text-slate-800">
              عَجَلَةُ الْحَظِّ الْيَوْمِيَّة (لُعْبَةُ لَفِّ الْقَلَم)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mb-6">
            مُسْتَوْحَاةٌ مِنْ لُعْبَةِ «لَفِّ الْقَلَمِ» فِي صَفْحَةِ ١٣٥ مِنْ سِلَاحِ التِّلْمِيذِ!
          </p>

          {/* Wheel Graphic */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 my-2 flex items-center justify-center">
            {/* Pointer / Arrow */}
            <div className="absolute -top-3 z-20 text-3xl font-black text-red-500 drop-shadow-md">
              🔻
            </div>

            {/* Spinning Circle */}
            <div
              className="w-full h-full rounded-full border-8 border-yellow-300 shadow-xl overflow-hidden relative transition-transform duration-[3000ms] ease-out"
              style={{
                transform: `rotate(${wheelRotation}deg)`,
                background: 'conic-gradient(#F59E0B 0deg 60deg, #3B82F6 60deg 120deg, #10B981 120deg 180deg, #EC4899 180deg 240deg, #8B5CF6 240deg 300deg, #EF4444 300deg 360deg)'
              }}
            >
              {/* Center Cap */}
              <div className="absolute inset-0 m-auto w-16 h-16 bg-white rounded-full border-4 border-yellow-300 shadow-md flex items-center justify-center font-kids text-xl font-black text-amber-700 z-10">
                ✏️
              </div>
            </div>
          </div>

          {/* Won Prize Notice */}
          {lastWonPrize && (
            <div className="mt-4 bg-emerald-100 text-emerald-900 px-4 py-2 rounded-xl font-kids font-bold text-sm animate-bounce">
              🎉 مَبْرُوك! فُزْتَ بِـ {lastWonPrize}!
            </div>
          )}

          {/* Spin Trigger Button */}
          <button
            onClick={handleSpinWheel}
            disabled={isSpinning}
            className="mt-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:scale-95 text-white font-black font-kids text-lg px-8 py-3 rounded-2xl shadow-lg transition-all disabled:opacity-50"
          >
            {isSpinning ? 'جَارِي الدَّوَرَان... 🌀' : 'لُفَّ الْقَلَمَ الْآن! 🚀'}
          </button>
        </div>

        {/* 7-Days Continuous Habit Streak (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 shadow-sm border border-amber-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-6 h-6 text-orange-500 fill-orange-500 animate-pulse" />
              <h3 className="font-kids font-black text-xl text-slate-800">
                حَمَاسُ الْأَيَّامِ الْمُتَتَالِيَة
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              ادْخُلْ كُلَّ يَوْمٍ وَتَدَرَّبْ لِتُحَافِظَ عَلَى شُعْلَةِ الْحَمَاسِ مُتَّقِدَةً!
            </p>

            {/* Streak Counter Badge */}
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 text-center my-3">
              <div className="text-4xl font-black font-kids text-orange-600 flex items-center justify-center gap-2">
                <span>🔥</span>
                <span>{progress.streakDays}</span>
                <span>أَيَّام</span>
              </div>
              <p className="text-xs text-orange-700 font-bold mt-1">
                تَقَدُّمٌ مُمْتَاز! أَنْتَ بَطَلٌ مُنْضَبِطٌ وَشُجَاع.
              </p>
            </div>

            {/* 7 Days Progress Check */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 my-4">
              {daysOfWeek.map((day, idx) => {
                const isPassed = idx < progress.streakDays;
                return (
                  <div
                    key={day}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl text-center transition-all ${
                      isPassed
                        ? 'bg-amber-500 text-white font-black shadow-sm'
                        : 'bg-slate-100 text-slate-400 font-bold'
                    }`}
                  >
                    <span className="text-[9px] truncate mb-1">{day.slice(0, 3)}</span>
                    <span className="text-sm">{isPassed ? '✓' : '○'}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-amber-50 rounded-2xl p-3 border border-amber-100 text-center">
            <span className="text-xs text-amber-800 font-bold flex items-center justify-center gap-1">
              <Award className="w-4 h-4 text-amber-600" />
              <span>أَكْمِلْ ٧ أَيَّامٍ لِتَرْبَحَ وِسَامَ «بَطَلِ الأُسْبُوعِ» 🏆</span>
            </span>
          </div>
        </div>
      </div>

      {/* Stickers & Medals Album */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-amber-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🖼️</span>
            <h3 className="font-kids font-black text-xl text-slate-800">
              أَلْبُومُ الْمُلْصَقَاتِ وَالأَوْسِمَةِ السِّحْرِيَّة
            </h3>
          </div>
          <span className="text-xs bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-bold">
            افْتَحْ بِمَحْصُولِكَ مِنَ الْعُمْلَات
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
          {INITIAL_STICKERS.map((stk) => {
            const isUnlocked = progress.unlockedStickers.includes(stk.id) || stk.unlocked;
            const canAfford = progress.coins >= stk.cost;

            return (
              <div
                key={stk.id}
                className={`p-4 rounded-2xl text-center border-2 transition-all relative flex flex-col justify-between ${
                  isUnlocked
                    ? 'border-yellow-400 bg-gradient-to-b from-yellow-50 to-amber-50 shadow-sm'
                    : 'border-slate-200 bg-slate-50 opacity-90'
                }`}
              >
                <div>
                  <div className={`text-4xl sm:text-5xl mb-2 transition-transform ${isUnlocked ? 'hover:scale-125' : 'grayscale opacity-50'}`}>
                    {stk.emoji}
                  </div>
                  <div className="font-kids font-bold text-xs sm:text-sm text-slate-800">
                    {stk.title}
                  </div>
                </div>

                <div className="mt-3">
                  {isUnlocked ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg">
                      <Check className="w-3.5 h-3.5" />
                      <span>مَفْتُوح</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => {
                        if (canAfford) {
                          sound.playSuccess();
                          sound.speakArabic(`مَبْرُوك! فَتَحْتَ مُلْصَقَ ${stk.title}!`);
                          onUnlockSticker(stk.id, stk.cost);
                          confetti({ particleCount: 40, spread: 50 });
                        } else {
                          sound.playTryAgain();
                          sound.speakArabic(`تَحْتَاجُ إِلَى ${stk.cost} عُمْلَة لِتَفْتَحَ هَذَا الْمُلْصَق! تَدَرَّبْ أَكْثَر!`);
                        }
                      }}
                      className={`w-full py-1.5 px-2 rounded-xl text-xs font-bold font-kids transition-all flex items-center justify-center gap-1 ${
                        canAfford
                          ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-xs'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <Lock className="w-3 h-3" />
                      <span>{stk.cost} 🪙</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
