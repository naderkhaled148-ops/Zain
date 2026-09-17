import React from 'react';
import { AppTab } from '../types';
import { BookOpen, PenTool, Puzzle, Calculator, BookHeart, HelpCircle, Trophy, Gamepad2, Users } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface NavigationProps {
  currentTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  onOpenCharacters?: () => void;
}

interface TabItem {
  id: AppTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  activeBg: string;
  badge?: string;
}

export const Navigation: React.FC<NavigationProps> = ({ currentTab, onSelectTab, onOpenCharacters }) => {
  const tabs: TabItem[] = [
    {
      id: 'games',
      label: 'الْأَلْعَابُ التَّفَاعُلِيَّة',
      icon: Gamepad2,
      color: 'text-rose-500',
      activeBg: 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-rose-200',
      badge: '٣ أَلْعَاب 🎮'
    },
    {
      id: 'letters',
      label: 'نَادِي الْحُرُوف',
      icon: BookOpen,
      color: 'text-rose-500',
      activeBg: 'bg-rose-500 text-white shadow-rose-200'
    },
    {
      id: 'tracing',
      label: 'سَبُّورَةُ الْكِتَابَة',
      icon: PenTool,
      color: 'text-amber-500',
      activeBg: 'bg-amber-500 text-white shadow-amber-200'
    },
    {
      id: 'words',
      label: 'تَرْكِيبُ الْكَلِمَات',
      icon: Puzzle,
      color: 'text-emerald-600',
      activeBg: 'bg-emerald-600 text-white shadow-emerald-200'
    },
    {
      id: 'math',
      label: 'أَلْعَابُ الْحِسَاب',
      icon: Calculator,
      color: 'text-blue-500',
      activeBg: 'bg-blue-500 text-white shadow-blue-200'
    },
    {
      id: 'stories',
      label: 'حِكَايَاتٌ وَأَنَاشِيد',
      icon: BookHeart,
      color: 'text-indigo-500',
      activeBg: 'bg-indigo-500 text-white shadow-indigo-200'
    },
    {
      id: 'quiz',
      label: 'الِاخْتِبَارُ التَّفَاعُلِي',
      icon: HelpCircle,
      color: 'text-purple-500',
      activeBg: 'bg-purple-600 text-white shadow-purple-200',
      badge: 'جَوَائِز ⭐'
    },
    {
      id: 'rewards',
      label: 'نِظَامُ الْمُكَافَآت',
      icon: Trophy,
      color: 'text-yellow-600',
      activeBg: 'bg-amber-500 text-white shadow-amber-200',
      badge: 'شَارَات 🏅'
    }
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-amber-100 py-2.5 px-3 sticky top-[72px] sm:top-[76px] z-30 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playPop();
                onSelectTab(tab.id);
              }}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl font-bold font-kids text-xs sm:text-sm whitespace-nowrap transition-all duration-200 select-none relative ${
                isActive
                  ? `${tab.activeBg} shadow-md scale-105 ring-2 ring-white`
                  : 'bg-amber-50/60 hover:bg-amber-100/80 text-slate-700 hover:text-slate-900 border border-amber-100'
              }`}
            >
              <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'text-white' : tab.color}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold shadow-xs ${
                  isActive ? 'bg-white text-slate-900' : 'bg-yellow-400 text-amber-950 animate-pulse'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
