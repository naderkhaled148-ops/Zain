import React, { useState } from 'react';
import { ReadingGame } from './ReadingGame';
import { WritingGame } from './WritingGame';
import { MathGame } from './MathGame';
import { sound } from '../../utils/soundEffects';
import { BookOpen, PenTool, Calculator, Sparkles, Award } from 'lucide-react';

interface MiniGamesHubProps {
  onEarnRewards: (stars: number, coins: number, xp: number) => void;
  onCompleteGameScore?: (game: 'reading' | 'writing' | 'math') => void;
}

type ActiveSubGame = 'reading' | 'writing' | 'math';

export const MiniGamesHub: React.FC<MiniGamesHubProps> = ({
  onEarnRewards,
  onCompleteGameScore
}) => {
  const [activeGame, setActiveGame] = useState<ActiveSubGame>('reading');

  const gameTabs = [
    {
      id: 'reading' as ActiveSubGame,
      title: 'سَلَّةُ الْحَرَكَاتِ (الْقِرَاءَة)',
      icon: BookOpen,
      character: '🦁 كِيمُو',
      badge: 'قِرَاءَةٌ وَأَصْوَات',
      color: 'text-rose-600',
      activeBg: 'bg-rose-500 text-white shadow-rose-200'
    },
    {
      id: 'writing' as ActiveSubGame,
      title: 'قِطَارُ الْكَلِمَاتِ (الْكِتَابَة)',
      icon: PenTool,
      character: '🐰 فَرْفُوش',
      badge: 'كِتَابَةٌ وَتَرْكِيب',
      color: 'text-pink-600',
      activeBg: 'bg-pink-500 text-white shadow-pink-200'
    },
    {
      id: 'math' as ActiveSubGame,
      title: 'إِطْعَامُ سِمْسِم (الْحِسَاب)',
      icon: Calculator,
      character: '🐵 سِمْسِم',
      badge: 'عَدٌّ وَجَمْع',
      color: 'text-blue-600',
      activeBg: 'bg-blue-600 text-white shadow-blue-200'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Sub-Tabs Switcher */}
      <div className="bg-white rounded-3xl p-3 sm:p-4 shadow-sm border border-amber-100 flex items-center justify-center gap-2 overflow-x-auto">
        {gameTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeGame === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playPop();
                setActiveGame(tab.id);
              }}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-kids font-black text-xs sm:text-sm whitespace-nowrap transition-all duration-200 active:scale-95 ${
                isActive
                  ? `${tab.activeBg} shadow-md scale-102 ring-2 ring-white`
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'text-white' : tab.color}`} />
              <div className="text-right">
                <div>{tab.title}</div>
                <div className={`text-[10px] font-bold ${isActive ? 'text-white/80' : 'text-slate-400'}`}>
                  مَعَ {tab.character}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Render Active Mini Game */}
      {activeGame === 'reading' && (
        <ReadingGame
          onEarnRewards={onEarnRewards}
          onCompleteGameScore={onCompleteGameScore}
        />
      )}

      {activeGame === 'writing' && (
        <WritingGame
          onEarnRewards={onEarnRewards}
          onCompleteGameScore={onCompleteGameScore}
        />
      )}

      {activeGame === 'math' && (
        <MathGame
          onEarnRewards={onEarnRewards}
          onCompleteGameScore={onCompleteGameScore}
        />
      )}
    </div>
  );
};
