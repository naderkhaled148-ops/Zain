import React, { useState } from 'react';
import { UserProgress, AchievementBadge } from '../types';
import { SYSTEM_BADGES } from '../data/charactersData';
import { INITIAL_STICKERS } from '../data/curriculumData';
import { sound } from '../utils/soundEffects';
import { Trophy, Sparkles, Flame, Check, Lock, Star, Award, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EnhancedRewardsProps {
  progress: UserProgress;
  onEarnRewards: (stars: number, coins: number, xp: number) => void;
  onUnlockSticker: (stickerId: string, cost: number) => void;
  onUnlockBadge?: (badgeId: string) => void;
}

export const EnhancedRewards: React.FC<EnhancedRewardsProps> = ({
  progress,
  onEarnRewards,
  onUnlockSticker,
  onUnlockBadge
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'wheel' | 'badges' | 'stickers'>('badges');
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
      {/* Dynamic Header with Live Level & Economy Counters */}
      <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 rounded-3xl p-6 sm:p-8 text-amber-950 shadow-md border-2 border-yellow-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-black bg-white/40 px-3 py-1 rounded-full">
            خَزِينَةُ الْأَبْطَالِ وَالتَّشْجِيع
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-kids mt-1">
            نِظَامُ الْمُكَافَآتِ وَالشَّارَاتِ التَّفَاعُلِيّ
          </h2>
          <p className="text-xs sm:text-sm text-amber-900 font-medium mt-1">
            اكْسِبْ نُقَاطَ الْخِبْرَةِ (XP) وَالنُّجُومَ وَالْعُمْلَاتِ عِنْدَ إِكْمَالِ الْأَنْشِطَةِ لِفَتْحِ الشَّارَاتِ الْمُمَيَّزَةِ!
          </p>
        </div>

        {/* Real-time counters */}
        <div className="flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-amber-300">
          <div className="text-center px-2 sm:px-3">
            <div className="text-2xl sm:text-3xl font-black font-kids text-amber-600">⭐ {progress.stars}</div>
            <div className="text-[10px] sm:text-[11px] font-bold text-slate-500">نُجُومٌ لَامِعَة</div>
          </div>
          <div className="w-px h-10 bg-amber-300" />
          <div className="text-center px-2 sm:px-3">
            <div className="text-2xl sm:text-3xl font-black font-kids text-amber-900">🪙 {progress.coins}</div>
            <div className="text-[10px] sm:text-[11px] font-bold text-slate-500">عُمْلَاتٌ ذَهَبِيَّة</div>
          </div>
          <div className="w-px h-10 bg-amber-300" />
          <div className="text-center px-2 sm:px-3">
            <div className="text-2xl sm:text-3xl font-black font-kids text-purple-700">⚡ {progress.xp}</div>
            <div className="text-[10px] sm:text-[11px] font-bold text-slate-500">نُقَاطُ خِبْرَة</div>
          </div>
        </div>
      </div>

      {/* Rewards Navigation Sub-Tabs */}
      <div className="flex items-center justify-center gap-2 bg-white p-2 rounded-2xl border border-amber-200">
        <button
          onClick={() => {
            sound.playPop();
            setActiveSubTab('badges');
          }}
          className={`flex-1 py-2.5 px-4 rounded-xl font-kids font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
            activeSubTab === 'badges'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'text-slate-600 hover:bg-amber-50'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>شَارَاتُ التَّفَوُّقِ الْمُمَيَّزَة 🏅</span>
        </button>

        <button
          onClick={() => {
            sound.playPop();
            setActiveSubTab('wheel');
          }}
          className={`flex-1 py-2.5 px-4 rounded-xl font-kids font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
            activeSubTab === 'wheel'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'text-slate-600 hover:bg-amber-50'
          }`}
        >
          <Gift className="w-4 h-4" />
          <span>عَجَلَةُ الْحَظِّ وَالْحَمَاس 🔥</span>
        </button>

        <button
          onClick={() => {
            sound.playPop();
            setActiveSubTab('stickers');
          }}
          className={`flex-1 py-2.5 px-4 rounded-xl font-kids font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
            activeSubTab === 'stickers'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'text-slate-600 hover:bg-amber-50'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>أَلْبُومُ الْمُلْصَقَات 🖼️</span>
        </button>
      </div>

      {/* VIEW 1: Achievement Badges */}
      {activeSubTab === 'badges' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-amber-100 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🏅</span>
              <div>
                <h3 className="font-kids font-black text-xl text-slate-800">
                  لَوْحَةُ الشَّارَاتِ وَالأَوْسِمَةِ التَّحْفِيزِيَّة
                </h3>
                <p className="text-xs text-slate-500">
                  تُفْتَحُ هَذِهِ الشَّارَاتُ تِلْقَائِيًّا عِنْدَ إِتْقَانِ الْقِرَاءَةِ، الْكِتَابَةِ، الْحِسَابِ، وَالِانْضِبَاطِ الْيَوْمِيّ!
                </p>
              </div>
            </div>

            <div className="text-xs font-bold bg-amber-100 text-amber-900 px-3 py-1.5 rounded-full">
              مَفْتُوح: {progress.unlockedBadges?.length || 2} مِنْ {SYSTEM_BADGES.length}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SYSTEM_BADGES.map((badge) => {
              const isUnlocked = progress.unlockedBadges?.includes(badge.id) || badge.isUnlocked;

              return (
                <div
                  key={badge.id}
                  onClick={() => {
                    sound.playPop();
                    sound.speakArabic(`${badge.title}: ${badge.description}`);
                  }}
                  className={`p-5 rounded-3xl border-3 transition-all relative flex flex-col justify-between cursor-pointer select-none ${
                    isUnlocked
                      ? 'bg-gradient-to-b from-yellow-50 via-white to-amber-50 border-amber-400 shadow-md hover:scale-102'
                      : 'bg-slate-50 border-slate-200 opacity-70 hover:opacity-90'
                  }`}
                >
                  <div>
                    {/* Top Status Icon */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200">
                        {badge.category === 'reading' && '📚 قِرَاءَة'}
                        {badge.category === 'writing' && '✍️ كِتَابَة'}
                        {badge.category === 'math' && '🧮 حِسَاب'}
                        {badge.category === 'streak' && '🔥 حَمَاس'}
                        {badge.category === 'mastery' && '👑 تَفَوُّق'}
                      </span>

                      {isUnlocked ? (
                        <span className="text-emerald-600 bg-emerald-100 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>مُحَقَّق</span>
                        </span>
                      ) : (
                        <span className="text-slate-400 bg-slate-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          <span>قَيْدُ التَّحْقِيق</span>
                        </span>
                      )}
                    </div>

                    {/* Badge Icon */}
                    <div className="text-center my-2">
                      <div className={`text-5xl sm:text-6xl mb-2 transition-transform ${isUnlocked ? 'animate-playful drop-shadow-md' : 'grayscale opacity-50'}`}>
                        {badge.icon}
                      </div>

                      <h4 className="font-kids font-black text-base text-slate-800">
                        {badge.title}
                      </h4>

                      <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed">
                        {badge.description}
                      </p>
                    </div>
                  </div>

                  {/* Rewards value */}
                  <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-center justify-between text-xs font-bold">
                    <span className="text-amber-700">⭐ +{badge.rewardStars} نُجُوم</span>
                    <span className="text-amber-900">🪙 +{badge.rewardCoins} عُمْلَة</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: Daily Habit Streak & Spin Wheel */}
      {activeSubTab === 'wheel' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Wheel (7 cols) */}
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

            <div className="relative w-64 h-64 sm:w-72 sm:h-72 my-2 flex items-center justify-center">
              <div className="absolute -top-3 z-20 text-3xl font-black text-red-500 drop-shadow-md">
                🔻
              </div>

              <div
                className="w-full h-full rounded-full border-8 border-yellow-300 shadow-xl overflow-hidden relative transition-transform duration-[3000ms] ease-out"
                style={{
                  transform: `rotate(${wheelRotation}deg)`,
                  background: 'conic-gradient(#F59E0B 0deg 60deg, #3B82F6 60deg 120deg, #10B981 120deg 180deg, #EC4899 180deg 240deg, #8B5CF6 240deg 300deg, #EF4444 300deg 360deg)'
                }}
              >
                <div className="absolute inset-0 m-auto w-16 h-16 bg-white rounded-full border-4 border-yellow-300 shadow-md flex items-center justify-center font-kids text-xl font-black text-amber-700 z-10">
                  ✏️
                </div>
              </div>
            </div>

            {lastWonPrize && (
              <div className="mt-4 bg-emerald-100 text-emerald-900 px-4 py-2 rounded-xl font-kids font-bold text-sm animate-bounce">
                🎉 مَبْرُوك! فُزْتَ بِـ {lastWonPrize}!
              </div>
            )}

            <button
              onClick={handleSpinWheel}
              disabled={isSpinning}
              className="mt-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:scale-95 text-white font-black font-kids text-lg px-8 py-3 rounded-2xl shadow-lg transition-all disabled:opacity-50"
            >
              {isSpinning ? 'جَارِي الدَّوَرَان... 🌀' : 'لُفَّ الْقَلَمَ الْآن! 🚀'}
            </button>
          </div>

          {/* 7-Days Streak (5 cols) */}
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
      )}

      {/* VIEW 3: Stickers & Medals Album */}
      {activeSubTab === 'stickers' && (
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
      )}
    </div>
  );
};
