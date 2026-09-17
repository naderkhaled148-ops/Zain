export type AppTab = 
  | 'letters' 
  | 'games'
  | 'tracing' 
  | 'words' 
  | 'math' 
  | 'stories' 
  | 'quiz' 
  | 'rewards';

export interface EducationalCharacter {
  id: string;
  name: string;
  role: string;
  subject: string;
  avatar: string;
  color: string;
  bgGradient: string;
  borderColor: string;
  textColor: string;
  personality: string;
  catchphrase: string;
  greetingVoice: string;
  specialtyBadge: string;
  advice: string[];
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'reading' | 'writing' | 'math' | 'streak' | 'mastery';
  requiredCount: number;
  currentCount?: number;
  isUnlocked: boolean;
  unlockedAt?: string;
  rewardStars: number;
  rewardCoins: number;
}

export interface LetterInfo {
  letter: string;
  name: string;
  unit: 1 | 2 | 3 | 4;
  unitTitle: string;
  color: string;
  forms: {
    isolated: string;
    initial: string;
    medial: string;
    final: string;
  };
  harakat: {
    fatha: { char: string; word: string; meaning: string; emoji: string };
    damma: { char: string; word: string; meaning: string; emoji: string };
    kasra: { char: string; word: string; meaning: string; emoji: string };
    sukun: { char: string; word: string; meaning: string; emoji: string };
  };
  song: {
    title: string;
    verse1: string;
    verse2: string;
  };
  practiceWords: string[];
}

export interface UnitInfo {
  id: number;
  title: string;
  theme: string;
  badge: string;
  color: string;
  description: string;
  letters: string[];
  sightWords: string[];
  story: {
    title: string;
    content: string[];
    sightWordsHighlighted: string[];
    moral: string;
  };
  song: {
    title: string;
    lyrics: string[];
  };
}

export interface MathItem {
  id: string;
  type: 'count' | 'add' | 'subtract' | 'shapes' | 'compare';
  title: string;
  question: string;
  itemsEmoji: string;
  itemCount1: number;
  itemCount2?: number;
  operator?: '+' | '-' | '>' | '<' | '=';
  shapeTarget?: string;
  options: (number | string)[];
  correctAnswer: number | string;
  visualLabel: string;
}

export interface QuizQuestion {
  id: string;
  type: 'sound' | 'missing-letter' | 'word-match' | 'sight-word' | 'math';
  question: string;
  audioPrompt?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  emojiHint?: string;
}

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface UserProgress {
  stars: number;
  coins: number;
  xp: number;
  level: number;
  streakDays: number;
  lastActiveDate: string;
  completedLessons: string[];
  unlockedStickers: string[];
  unlockedBadges: string[];
  selectedCharacterId?: string;
  themeId?: ThemeId;
  buttonStyle?: ButtonStyleVariant;
  difficultyLevel?: DifficultyLevel;
  gameStats?: {
    readingScore: number;
    writingScore: number;
    mathScore: number;
    gamesPlayed: number;
  };
  lastWheelSpinDate?: string;
}

export type ThemeId = 'sunshine' | 'space' | 'forest' | 'ocean' | 'candy';
export type ButtonStyleVariant = 'rounded' | '3d' | 'classic';

export interface AppTheme {
  id: ThemeId;
  name: string;
  nameEn: string;
  icon: string;
  tagline: string;
  description: string;
  palette: string[];
  isDark: boolean;
  pageBgClass: string;
  pageGradientStyle?: string;
  headerGradient: string;
  heroBgClass: string;
  navBgClass: string;
  navBorderClass: string;
  navActiveClass: string;
  primaryBtnClass: string;
  secondaryBtnClass: string;
  accentBtnClass: string;
  cardBgClass: string;
  cardBorderClass: string;
  textPrimaryClass: string;
  textSecondaryClass: string;
  footerBgClass: string;
  accentBadgeClass: string;
  glowClass: string;
}

export interface Sticker {
  id: string;
  title: string;
  emoji: string;
  cost: number;
  requiredLevel: number;
  category: 'letters' | 'math' | 'heroes' | 'animals';
  unlocked: boolean;
}

export interface UserAccount {
  id: string;
  username: string;
  password: string;
  displayName: string;
  avatar: string;
  createdAt: string;
  progress: UserProgress;
}
