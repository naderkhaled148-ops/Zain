import React from 'react';
import { AppTab, AppTheme, ButtonStyleVariant } from '../types';
import { BookOpen, PenTool, Puzzle, Calculator, BookHeart, HelpCircle, Trophy, Gamepad2, Users } from 'lucide-react';
import { sound } from '../utils/soundEffects';
import { BUTTON_STYLE_CLASSES } from '../data/themesData';

interface NavigationProps {
  currentTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  onOpenCharacters?: () => void;
  theme?: AppTheme;
  buttonStyle?: ButtonStyleVariant;
}

interface TabItem {
  id: AppTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  activeBg: string;
  badge?: string;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  currentTab, 
  onSelectTab, 
  onOpenCharacters,
  theme,
  buttonStyle = 'rounded'
}) => {
  const btnConfig = BUTTON_STYLE_CLASSES[buttonStyle] || BUTTON_STYLE_CLASSES.rounded;

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

  const navBg = theme?.navBgClass || 'bg-white/95 backdrop-blur-md';
  const navBorder = theme?.navBorderClass || 'border-amber-100';
  const isDark = theme?.isDark ?? false;

  return (
    <nav className={`${navBg} border-b ${navBorder} py-2.5 px-3 sticky top-[72px] sm:top-[76px] z-30 shadow-sm transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          const activeClasses = theme 
            ? `${theme.navActiveClass} scale-105` 
            : `${tab.activeBg} shadow-md scale-105 ring-2 ring-white`;

          const inactiveClasses = isDark
            ? 'bg-[#141c38] hover:bg-[#1d274c] text-indigo-100 hover:text-white border border-indigo-800/80 shadow-xs'
            : 'bg-white/80 hover:bg-white text-slate-700 hover:text-slate-900 border border-slate-200/90 shadow-2xs';

          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playPop();
                onSelectTab(tab.id);
              }}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 font-bold font-kids text-xs sm:text-sm whitespace-nowrap select-none relative cursor-pointer ${
                buttonStyle === '3d' ? 'rounded-2xl' : buttonStyle === 'classic' ? 'rounded-xl' : 'rounded-2xl'
              } ${
                isActive
                  ? `${activeClasses} ${buttonStyle === '3d' ? 'shadow-[0_4px_0_rgba(0,0,0,0.2)]' : 'shadow-md'}`
                  : inactiveClasses
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

