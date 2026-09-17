import { UserAccount, UserProgress } from '../types';

const ACCOUNTS_STORAGE_KEY = 'grade1_arabic_math_accounts_v1';
const CURRENT_USER_ID_KEY = 'grade1_arabic_math_current_user_id_v1';

export const DEFAULT_INITIAL_PROGRESS: UserProgress = {
  stars: 15,
  coins: 60,
  xp: 80,
  level: 1,
  streakDays: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedLessons: ['أ', 'ب'],
  unlockedStickers: ['st1', 'st2'],
  unlockedBadges: ['badge_first_step', 'badge_streak_fire', 'badge_wheel_spinner'],
  selectedCharacterId: 'kimo',
  gameStats: {
    readingScore: 2,
    writingScore: 1,
    mathScore: 2,
    gamesPlayed: 5
  }
};

const DEFAULT_DEMO_ACCOUNT: UserAccount = {
  id: 'demo-hero-1',
  username: 'بطل_المستقبل',
  password: '123',
  displayName: 'بَطَلُ الْمُسْتَقْبَل',
  avatar: '🦁',
  createdAt: new Date().toISOString(),
  progress: { ...DEFAULT_INITIAL_PROGRESS }
};

export function getStoredAccounts(): UserAccount[] {
  try {
    const raw = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
    if (!raw) {
      // Initialize with demo account
      const initial = [DEFAULT_DEMO_ACCOUNT];
      localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return [DEFAULT_DEMO_ACCOUNT];
  } catch (err) {
    console.error('Failed to load accounts:', err);
    return [DEFAULT_DEMO_ACCOUNT];
  }
}

export function saveAccounts(accounts: UserAccount[]): void {
  try {
    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
  } catch (err) {
    console.error('Failed to save accounts:', err);
  }
}

export function getCurrentUserId(): string | null {
  try {
    return localStorage.getItem(CURRENT_USER_ID_KEY);
  } catch {
    return null;
  }
}

export function setCurrentUserId(userId: string | null): void {
  try {
    if (userId) {
      localStorage.setItem(CURRENT_USER_ID_KEY, userId);
    } else {
      localStorage.removeItem(CURRENT_USER_ID_KEY);
    }
  } catch {
    // Ignore
  }
}

export function getActiveUser(): UserAccount | null {
  const currentId = getCurrentUserId();
  const accounts = getStoredAccounts();
  if (currentId) {
    const found = accounts.find(acc => acc.id === currentId);
    if (found) return found;
  }
  return null;
}

export function saveActiveUserProgress(userId: string, progress: UserProgress): void {
  const accounts = getStoredAccounts();
  const index = accounts.findIndex(a => a.id === userId);
  if (index !== -1) {
    accounts[index].progress = progress;
    saveAccounts(accounts);
  }
}
