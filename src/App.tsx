import React, { useState, useEffect } from 'react';
import { AppTab, UserProgress, UserAccount } from './types';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { LetterExplorer } from './components/LetterExplorer';
import { LetterTracing } from './components/LetterTracing';
import { WordBuilder } from './components/WordBuilder';
import { MathZone } from './components/MathZone';
import { StoryReader } from './components/StoryReader';
import { QuizModal } from './components/QuizModal';
import { EnhancedRewards } from './components/EnhancedRewards';
import { MiniGamesHub } from './components/games/MiniGamesHub';
import { CharactersShowcase } from './components/CharactersShowcase';
import { AuthModal } from './components/AuthModal';
import { EDUCATIONAL_CHARACTERS, SYSTEM_BADGES } from './data/charactersData';
import { sound } from './utils/soundEffects';
import { 
  getActiveUser, 
  setCurrentUserId, 
  saveActiveUserProgress, 
  DEFAULT_INITIAL_PROGRESS 
} from './utils/authStorage';
import { Volume2, Sparkles, Heart, Users, Gamepad2, X, LogIn, KeyRound, UserCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'egyptian_grade1_arabic_math_v2';

export default function App() {
  const [currentTab, setCurrentTab] = useState<AppTab>('games');
  const [isSoundOn, setIsSoundOn] = useState<boolean>(true);
  const [showCharactersModal, setShowCharactersModal] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);

  // Authenticated user state
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    return getActiveUser();
  });

  // Initialize or load progress
  const [progress, setProgress] = useState<UserProgress>(() => {
    const active = getActiveUser();
    if (active && active.progress) {
      return active.progress;
    }
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore
    }
    return DEFAULT_INITIAL_PROGRESS;
  });

  // Save progress changes locally and to user account
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      if (currentUser) {
        saveActiveUserProgress(currentUser.id, progress);
      }
    } catch {
      // Ignore
    }
  }, [progress, currentUser]);

  const handleToggleSound = () => {
    const next = !isSoundOn;
    setIsSoundOn(next);
    sound.setSoundEnabled(next);
  };

  const handleLoginSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    if (user.progress) {
      setProgress(user.progress);
    }
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setCurrentUserId(null);
    setCurrentUser(null);
    sound.speakArabic('تَمَّ تَسْجِيلُ الْخُرُوج، إِلَى اللِّقَاءِ يَا بَطَل!');
  };

  const handleEarnRewards = (addStars: number, addCoins: number, addXp: number) => {
    setProgress((prev) => {
      const newXp = prev.xp + addXp;
      const newLevel = Math.floor(newXp / 100) + 1;
      const leveledUp = newLevel > prev.level;

      let newBadges = [...(prev.unlockedBadges || [])];
      // Check level 2 badge
      if (newLevel >= 2 && !newBadges.includes('badge_champion')) {
        newBadges.push('badge_champion');
      }

      if (leveledUp) {
        sound.playFanfare();
        sound.speakArabic(`مَبْرُوك! لَقَدِ ارْتَقَيْتَ إِلَى الْمُسْتَوَى ${newLevel}! أَنْتَ بَطَلٌ حَقِيقِيّ!`);
      }

      return {
        ...prev,
        stars: prev.stars + addStars,
        coins: prev.coins + addCoins,
        xp: newXp,
        level: newLevel,
        unlockedBadges: newBadges
      };
    });
  };

  const handleCompleteGameScore = (game: 'reading' | 'writing' | 'math') => {
    setProgress((prev) => {
      const prevStats = prev.gameStats || { readingScore: 0, writingScore: 0, mathScore: 0, gamesPlayed: 0 };
      const nextStats = {
        ...prevStats,
        readingScore: game === 'reading' ? prevStats.readingScore + 1 : prevStats.readingScore,
        writingScore: game === 'writing' ? prevStats.writingScore + 1 : prevStats.writingScore,
        mathScore: game === 'math' ? prevStats.mathScore + 1 : prevStats.mathScore,
        gamesPlayed: prevStats.gamesPlayed + 1
      };

      const newBadges = [...(prev.unlockedBadges || [])];
      if (nextStats.readingScore >= 5 && !newBadges.includes('badge_reading_star')) {
        newBadges.push('badge_reading_star');
        sound.speakArabic('مَبْرُوك! حَصَلْتَ عَلَى شَارَةِ فَارِسِ الْحُرُوفِ وَالْكَلِمَات!');
      }
      if (nextStats.writingScore >= 5 && !newBadges.includes('badge_writing_pro')) {
        newBadges.push('badge_writing_pro');
        sound.speakArabic('مَبْرُوك! حَصَلْتَ عَلَى شَارَةِ خَطَّاطِ الصَّفِّ الْأَوَّل!');
      }
      if (nextStats.mathScore >= 5 && !newBadges.includes('badge_math_genius')) {
        newBadges.push('badge_math_genius');
        sound.speakArabic('مَبْرُوك! حَصَلْتَ عَلَى شَارَةِ عَبْقَرِيِّ الْأَرْقَامِ الصَّغِير!');
      }

      return {
        ...prev,
        gameStats: nextStats,
        unlockedBadges: newBadges
      };
    });
  };

  const handleUnlockSticker = (stickerId: string, cost: number) => {
    setProgress((prev) => {
      const nextStickers = [...prev.unlockedStickers, stickerId];
      const newBadges = [...(prev.unlockedBadges || [])];
      if (nextStickers.length >= 3 && !newBadges.includes('badge_collector')) {
        newBadges.push('badge_collector');
      }

      return {
        ...prev,
        coins: Math.max(0, prev.coins - cost),
        unlockedStickers: nextStickers,
        unlockedBadges: newBadges
      };
    });
  };

  const handleSelectCharacter = (charId: string) => {
    setProgress((prev) => ({
      ...prev,
      selectedCharacterId: charId
    }));
  };

  const activeChar = EDUCATIONAL_CHARACTERS.find(c => c.id === progress.selectedCharacterId) || EDUCATIONAL_CHARACTERS[0];

  return (
    <div className="min-h-screen bg-[#FFFDF6] flex flex-col font-reading text-slate-800">
      {/* Top Header */}
      <Header
        progress={progress}
        currentUser={currentUser}
        isSoundOn={isSoundOn}
        onToggleSound={handleToggleSound}
        onOpenRewards={() => setCurrentTab('rewards')}
        onOpenCharacters={() => setShowCharactersModal(true)}
        onOpenAuth={() => setShowAuthModal(true)}
      />

      {/* Guest / Login encouragement banner when not logged in */}
      {!currentUser && (
        <div className="bg-amber-500 text-amber-950 px-4 py-2 text-xs sm:text-sm font-medium border-b border-amber-600/30 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-base">🔐</span>
            <span>
              <strong>تَنْبِيهٌ مُهِمّ:</strong> لَمْ تُسَجِّلْ دُخُولَكَ بَعْد! سَجِّلْ بِاسْمِ مُسْتَخْدِمٍ وَرَقَمٍ سِرِّيٍّ لِحِفْظِ نُجُومِكَ وَإِنْجَازَاتِكَ!
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              sound.playPop();
              setShowAuthModal(true);
            }}
            className="bg-white hover:bg-yellow-100 text-amber-950 px-3 py-1 rounded-xl font-kids font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1"
          >
            <KeyRound className="w-3.5 h-3.5 text-amber-700" />
            <span>تَسْجِيلُ الدُّخُولِ / حِسَابٌ جَدِيد</span>
          </button>
        </div>
      )}

      {/* Navigation tabs */}
      <Navigation
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        onOpenCharacters={() => setShowCharactersModal(true)}
      />

      {/* Hero Banner with Selected Character Companion */}
      <section className="bg-gradient-to-r from-amber-100/70 via-rose-50/50 to-indigo-50/60 border-b border-amber-200/50 py-3 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playPop();
                sound.speakArabic(activeChar.greetingVoice);
                setShowCharactersModal(true);
              }}
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-3xl shadow-sm border-2 border-amber-300 bg-white hover:scale-105 active:scale-95 transition-transform"
            >
              {activeChar.avatar}
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-kids font-black text-sm sm:text-base text-slate-800">
                  مُرَافِقُكَ الْيَوْم: {activeChar.name}
                </span>
                <span className="text-[11px] font-bold text-amber-800 bg-amber-200/70 px-2 py-0.5 rounded-full">
                  {activeChar.role}
                </span>
              </div>
              <p className="text-xs text-slate-600 italic">
                «{activeChar.catchphrase}»
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playPop();
                setShowCharactersModal(true);
              }}
              className="flex items-center gap-1.5 bg-white hover:bg-amber-50 text-amber-900 border border-amber-300 px-3 py-1.5 rounded-xl font-kids font-bold text-xs shadow-xs transition-all"
            >
              <Users className="w-4 h-4 text-amber-600" />
              <span>شَخْصِيَّاتُ الْبَرْنَامَج (٤)</span>
            </button>

            <button
              onClick={() => {
                sound.playPop();
                setCurrentTab('games');
              }}
              className="flex items-center gap-1.5 bg-gradient-to-r from-rose-500 to-amber-500 text-white px-3 py-1.5 rounded-xl font-kids font-bold text-xs shadow-xs hover:opacity-95 transition-all"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>الْأَلْعَابُ الْمُصَغَّرَة 🎮</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Educational Workspace */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 md:p-8">
        {currentTab === 'games' && (
          <MiniGamesHub
            onEarnRewards={handleEarnRewards}
            onCompleteGameScore={handleCompleteGameScore}
          />
        )}

        {currentTab === 'letters' && (
          <LetterExplorer onEarnRewards={handleEarnRewards} />
        )}

        {currentTab === 'tracing' && (
          <LetterTracing onEarnRewards={handleEarnRewards} />
        )}

        {currentTab === 'words' && (
          <WordBuilder onEarnRewards={handleEarnRewards} />
        )}

        {currentTab === 'math' && (
          <MathZone onEarnRewards={handleEarnRewards} />
        )}

        {currentTab === 'stories' && (
          <StoryReader onEarnRewards={handleEarnRewards} />
        )}

        {currentTab === 'quiz' && (
          <QuizModal onEarnRewards={handleEarnRewards} />
        )}

        {currentTab === 'rewards' && (
          <EnhancedRewards
            progress={progress}
            onEarnRewards={handleEarnRewards}
            onUnlockSticker={handleUnlockSticker}
          />
        )}
      </main>

      {/* Characters Showcase Modal */}
      {showCharactersModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-5xl w-full p-4 sm:p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto border-4 border-amber-300">
            <button
              onClick={() => setShowCharactersModal(false)}
              className="absolute top-4 left-4 bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-2xl transition-all"
              title="إغلاق النافذة"
            >
              <X className="w-6 h-6" />
            </button>

            <CharactersShowcase
              selectedCharacterId={progress.selectedCharacterId || 'kimo'}
              onSelectCharacter={handleSelectCharacter}
            />

            <div className="mt-6 text-center">
              <button
                onClick={() => setShowCharactersModal(false)}
                className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-kids font-bold text-base px-8 py-2.5 rounded-2xl shadow-md transition-all"
              >
                مُوافِق! الْعَوْدَةُ لِلْمُغَامَرَة 🚀
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Child Mascot Footer Message */}
      <footer className="bg-amber-100/70 border-t border-amber-200/80 py-4 px-4 text-center mt-8">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-amber-900 font-medium">
          <div className="flex items-center gap-2">
            <span className="text-2xl animate-playful">{activeChar.avatar}</span>
            <span>
              <strong>صَدِيقُكَ {activeChar.name.split(' ')[0]} يَقُول:</strong> «{activeChar.advice[0]}»
            </span>
          </div>

          <button
            onClick={() => {
              sound.playStar();
              sound.speakArabic(activeChar.advice[0]);
            }}
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-kids font-bold px-3.5 py-1.5 rounded-xl shadow-xs transition-all"
          >
            <Volume2 className="w-4 h-4" />
            <span>اسْتَمِعْ لِـ {activeChar.name.split(' ')[0]}</span>
          </button>
        </div>
      </footer>

      {/* User Login / Register Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        currentUser={currentUser}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
      />
    </div>
  );
}

