import React from 'react';
import { Sparkles, Flame, Volume2, VolumeX, Award, Heart, Users, User, LogIn } from 'lucide-react';
import { UserProgress, UserAccount } from '../types';
import { sound } from '../utils/soundEffects';
import { EDUCATIONAL_CHARACTERS } from '../data/charactersData';

interface HeaderProps {
  progress: UserProgress;
  currentUser: UserAccount | null;
  isSoundOn: boolean;
  onToggleSound: () => void;
  onOpenRewards: () => void;
  onOpenCharacters?: () => void;
  onOpenAuth: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  progress,
  currentUser,
  isSoundOn,
  onToggleSound,
  onOpenRewards,
  onOpenCharacters,
  onOpenAuth
}) => {
  // Compute level titles
  const getLevelTitle = (level: number) => {
    if (level === 1) return 'بُرْعُمٌ مُكْتَشِف';
    if (level === 2) return 'قَارِئٌ مَاهِر';
    if (level === 3) return 'عَبْقَرِيٌّ صَغِير';
    if (level === 4) return 'بَطَلُ الْحُرُوف';
    return 'سُلْطَانُ الْمَعْرِفَة';
  };

  const activeChar = EDUCATIONAL_CHARACTERS.find(c => c.id === progress.selectedCharacterId) || EDUCATIONAL_CHARACTERS[0];
  const nextLevelXp = progress.level * 100;
  const currentLevelProgress = Math.min(100, Math.round(((progress.xp % 100) / 100) * 100));

  return (
    <header className="bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-500 p-3 sm:p-4 text-white shadow-lg sticky top-0 z-40">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Logo and Child Mascot Profile */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              sound.playPop();
              sound.speakArabic(activeChar.greetingVoice);
              if (onOpenCharacters) onOpenCharacters();
            }}
            title="انقر للتحدث مع شخصيتك المفضلة أو تغييرها"
            className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-white/40 transform hover:scale-105 active:scale-95 transition-transform cursor-pointer relative"
          >
            <span>{activeChar.avatar}</span>
            <span className="absolute -bottom-1 -right-1 bg-yellow-300 text-amber-950 text-[10px] font-black px-1 rounded-md shadow-xs border border-white/40">
              صَدِيقِي
            </span>
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl md:text-2xl font-black font-kids tracking-wide text-white drop-shadow-sm">
                مُغَامَرَاتُ الْحُرُوفِ وَالْأَرْقَامِ
              </h1>
              <span className="hidden sm:inline-block bg-yellow-300 text-amber-900 text-xs px-2.5 py-0.5 rounded-full font-bold shadow-sm">
                الصَّفُّ الْأَوَّل
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5 text-white/90 text-xs sm:text-sm font-medium">
              <span className="flex items-center gap-1 bg-black/15 px-2 py-0.5 rounded-md">
                <Award className="w-3.5 h-3.5 text-yellow-300" />
                <span>الْمُسْتَوَى {progress.level}:</span>
                <strong className="text-yellow-200">{getLevelTitle(progress.level)}</strong>
              </span>
              <button
                type="button"
                onClick={onOpenCharacters}
                className="hidden md:inline-flex items-center gap-1 text-white hover:text-yellow-200 transition-colors bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded-md text-xs font-bold"
              >
                <Users className="w-3.5 h-3.5 text-yellow-300" />
                <span>أَصْدِقَائِي (٤)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats and Rewards Ribbon */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Daily Streak */}
          <div 
            title="أيّام الاستمرار والنشاط اليومي"
            className="flex items-center gap-1 sm:gap-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-md px-2.5 sm:px-3 py-1.5 rounded-xl border border-white/30 cursor-pointer transition-all"
            onClick={() => {
              sound.playPop();
              sound.speakArabic(`حَمَاسُ الْيَوْمِ ${progress.streakDays} أَيَّامٍ مُتَتَالِيَة! أَنْتَ بَطَلٌ مُلْتَزِم!`);
            }}
          >
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200 fill-amber-300 animate-bounce" />
            <div className="text-right">
              <div className="text-[10px] text-amber-100 font-bold leading-none">حَمَاسُكَ</div>
              <div className="text-sm sm:text-base font-black text-white">{progress.streakDays} يَوْم</div>
            </div>
          </div>

          {/* Stars */}
          <div 
            title="النجوم الذهبية التي جمعتها"
            className="flex items-center gap-1 sm:gap-1.5 bg-amber-500/80 hover:bg-amber-500 px-2.5 sm:px-3 py-1.5 rounded-xl border border-yellow-200/50 cursor-pointer shadow-sm transition-all"
            onClick={() => {
              sound.playStar();
              sound.speakArabic(`لَدَيْكَ ${progress.stars} نُجُومٍ لَامِعَةٍ! مُمْتَاز!`);
            }}
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-200 fill-yellow-200" />
            <div className="text-right">
              <div className="text-[10px] text-yellow-100 font-bold leading-none">نُجُوم</div>
              <div className="text-sm sm:text-base font-black text-yellow-100">{progress.stars}</div>
            </div>
          </div>

          {/* Coins / Rewards button */}
          <button
            onClick={() => {
              sound.playPop();
              onOpenRewards();
            }}
            className="flex items-center gap-1 sm:gap-1.5 bg-yellow-400 hover:bg-yellow-300 active:scale-95 text-amber-950 px-2.5 sm:px-3 py-1.5 rounded-xl border-2 border-yellow-100 shadow-md font-bold transition-all cursor-pointer"
          >
            <span className="text-base sm:text-lg">🪙</span>
            <div className="text-right">
              <div className="text-[10px] text-amber-900 font-bold leading-none">الْكَنْز</div>
              <div className="text-sm sm:text-base font-black">{progress.coins}</div>
            </div>
          </button>

          {/* User Account / Profile Button */}
          {currentUser ? (
            <button
              type="button"
              onClick={() => {
                sound.playPop();
                onOpenAuth();
              }}
              className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-md px-2.5 sm:px-3 py-1.5 rounded-xl border border-white/40 shadow-xs cursor-pointer active:scale-95 transition-all text-right"
              title="إدارة الحساب والرقم السري وتبديل البطل"
            >
              <span className="text-base sm:text-lg">{currentUser.avatar}</span>
              <div className="hidden sm:block">
                <div className="text-[10px] text-yellow-200 font-bold leading-none">
                  @{currentUser.username}
                </div>
                <div className="text-xs font-black text-white truncate max-w-[95px]">
                  {currentUser.displayName}
                </div>
              </div>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                sound.playPop();
                onOpenAuth();
              }}
              className="flex items-center gap-1.5 bg-yellow-300 hover:bg-yellow-200 text-amber-950 px-2.5 sm:px-3 py-1.5 rounded-xl font-kids font-bold text-xs shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>دخول / حساب</span>
            </button>
          )}

          {/* Sound Toggle */}
          <button
            onClick={() => {
              sound.playPop();
              onToggleSound();
            }}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              isSoundOn 
                ? 'bg-white/20 hover:bg-white/30 text-white border-white/30' 
                : 'bg-red-500/80 hover:bg-red-500 text-white border-red-300'
            }`}
            title={isSoundOn ? 'كتم الصوت' : 'تشغيل الصوت'}
          >
            {isSoundOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mini XP progress bar */}
      <div className="max-w-6xl mx-auto mt-2.5 pt-1 border-t border-white/20 flex items-center justify-between text-xs text-white/90">
        <div className="flex items-center gap-2">
          <span>تَقَدُّمُ الْمُسْتَوَى:</span>
          <div className="w-24 sm:w-36 md:w-56 h-2.5 bg-black/20 rounded-full overflow-hidden p-0.5 border border-white/20">
            <div 
              className="h-full bg-gradient-to-r from-yellow-300 to-green-300 rounded-full transition-all duration-500"
              style={{ width: `${currentLevelProgress}%` }}
            />
          </div>
          <span className="font-bold text-yellow-200">{currentLevelProgress}%</span>
        </div>
        <div className="font-kids text-yellow-100">
          ✨ {nextLevelXp - (progress.xp % 100)} نُقْطَة لِلْمُسْتَوَى التَّالِي
        </div>
      </div>
    </header>
  );
};
