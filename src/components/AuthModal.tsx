import React, { useState } from 'react';
import { UserAccount } from '../types';
import { getStoredAccounts, saveAccounts, setCurrentUserId, DEFAULT_INITIAL_PROGRESS } from '../utils/authStorage';
import { sound } from '../utils/soundEffects';
import { 
  User, 
  KeyRound, 
  Eye, 
  EyeOff, 
  Sparkles, 
  LogIn, 
  UserPlus, 
  X, 
  CheckCircle2, 
  AlertCircle,
  Users
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount | null;
  onLoginSuccess: (user: UserAccount) => void;
  onLogout: () => void;
  forceLogin?: boolean;
}

const AVATAR_OPTIONS = [
  { emoji: '🦁', label: 'الأسد الشجاع' },
  { emoji: '🚀', label: 'رائد الفضاء' },
  { emoji: '🌟', label: 'النجم اللامع' },
  { emoji: '🦊', label: 'الثعلب الذكي' },
  { emoji: '🐼', label: 'الباندا المحبوب' },
  { emoji: '🦄', label: 'المهر السحري' },
  { emoji: '🐬', label: 'الدلفين السريع' },
  { emoji: '👑', label: 'البطل الملكي' },
];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess,
  onLogout,
  forceLogin = false,
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  // Login form state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register form state
  const [regDisplayName, setRegDisplayName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regAvatar, setRegAvatar] = useState('🦁');

  // Error & success messages
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const accounts = getStoredAccounts();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const trimmedUser = loginUsername.trim().toLowerCase();
    const trimmedPass = loginPassword.trim();

    if (!trimmedUser || !trimmedPass) {
      setErrorMsg('يرجى كتابة اسم المستخدم والرقم السري!');
      sound.playTryAgain();
      return;
    }

    const found = accounts.find(
      (acc) => acc.username.trim().toLowerCase() === trimmedUser
    );

    if (!found) {
      setErrorMsg('اسم المستخدم غير مسجل، يمكنك إنشاء حساب جديد!');
      sound.playTryAgain();
      return;
    }

    if (found.password !== trimmedPass) {
      setErrorMsg('الرقم السري غير صحيح، حاول مرة أخرى!');
      sound.playTryAgain();
      return;
    }

    // Success!
    setCurrentUserId(found.id);
    setSuccessMsg(`أهلاً بك مجدداً يا بطل ${found.displayName}! 🎉`);
    sound.playFanfare();
    sound.speakArabic(`مَرْحَباً بِكَ يَا بَطَل! تَمَّ تَسْجِيلُ الدُّخُولِ بِنَجَاح!`);
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });

    setTimeout(() => {
      onLoginSuccess(found);
      onClose();
    }, 800);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const trimmedDisplayName = regDisplayName.trim();
    const trimmedUser = regUsername.trim().toLowerCase();
    const trimmedPass = regPassword.trim();

    if (!trimmedDisplayName) {
      setErrorMsg('يرجى إدخال اسمك الجميل!');
      sound.playTryAgain();
      return;
    }

    if (!trimmedUser || trimmedUser.length < 2) {
      setErrorMsg('يرجى اختيار اسم مستخدم مناسب (حرفين على الأقل)!');
      sound.playTryAgain();
      return;
    }

    if (!trimmedPass || trimmedPass.length < 3) {
      setErrorMsg('الرقم السري يجب أن يكون 3 رموز أو أرقام على الأقل!');
      sound.playTryAgain();
      return;
    }

    // Check if username taken
    const existing = accounts.find(
      (acc) => acc.username.trim().toLowerCase() === trimmedUser
    );
    if (existing) {
      setErrorMsg('اسم المستخدم هذا محجوز مسبقاً، اختر اسماً آخر!');
      sound.playTryAgain();
      return;
    }

    const newAccount: UserAccount = {
      id: 'user_' + Date.now(),
      username: trimmedUser,
      password: trimmedPass,
      displayName: trimmedDisplayName,
      avatar: regAvatar,
      createdAt: new Date().toISOString(),
      progress: {
        ...DEFAULT_INITIAL_PROGRESS,
        lastActiveDate: new Date().toISOString().split('T')[0]
      }
    };

    const updatedAccounts = [...accounts, newAccount];
    saveAccounts(updatedAccounts);
    setCurrentUserId(newAccount.id);

    setSuccessMsg(`تم إنشاء حساب البطل ${newAccount.displayName} بنجاح! 🌟`);
    sound.playFanfare();
    sound.speakArabic(`مَبْرُوك! أَهْلاً بِكَ فِي عَالَمِ الْمَعْرِفَةِ يَا بَطَل!`);
    confetti({ particleCount: 80, spread: 90, origin: { y: 0.6 } });

    setTimeout(() => {
      onLoginSuccess(newAccount);
      onClose();
    }, 900);
  };

  const handleFastDemoLogin = () => {
    setLoginUsername('بطل_المستقبل');
    setLoginPassword('123');
    setErrorMsg(null);
    sound.playPop();
  };

  const handleQuickSwitch = (acc: UserAccount) => {
    setLoginUsername(acc.username);
    setLoginPassword(acc.password);
    setActiveTab('login');
    sound.playPop();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        id="auth-modal-card"
        className="bg-white border-4 border-amber-300 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden relative"
      >
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-500 p-4 text-white relative">
          {!forceLogin && (
            <button
              onClick={() => {
                sound.playPop();
                onClose();
              }}
              className="absolute top-3 left-3 p-1.5 rounded-full bg-black/20 hover:bg-black/30 text-white transition-colors"
              title="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 rounded-2xl text-3xl mb-1 shadow-inner border border-white/40">
              {currentUser ? currentUser.avatar : '🔐'}
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-kids tracking-wide">
              {currentUser ? 'حِسَابُ الْبَطَلِ التَّعْلِيمِيّ' : 'بَوَّابَةُ دُخُولِ الْأَبْطَال'}
            </h2>
            <p className="text-xs sm:text-sm text-yellow-100 font-medium mt-0.5">
              احفظ نقاطك ونجومك وشاراتك برقمك السري الخاص
            </p>
          </div>
        </div>

        {/* If Already Logged In: Show Profile Card with Logout / Switch option */}
        {currentUser && (
          <div className="p-5 border-b border-amber-100 bg-amber-50/50">
            <div className="flex items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border-2 border-amber-200 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-3xl">
                  {currentUser.avatar}
                </div>
                <div>
                  <div className="font-kids font-bold text-base text-slate-800">
                    {currentUser.displayName}
                  </div>
                  <div className="text-xs text-slate-500 font-mono">
                    اسم المستخدم: @{currentUser.username}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  sound.playPop();
                  onLogout();
                }}
                className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors"
              >
                <LogIn className="w-3.5 h-3.5 rotate-180" />
                <span>خروج</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50">
          <button
            type="button"
            onClick={() => {
              setActiveTab('login');
              setErrorMsg(null);
              sound.playPop();
            }}
            className={`flex-1 py-3 text-center font-kids font-bold text-sm sm:text-base transition-colors flex items-center justify-center gap-2 border-b-2 ${
              activeTab === 'login'
                ? 'border-amber-500 text-amber-900 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>تسجيل الدخول</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('register');
              setErrorMsg(null);
              sound.playPop();
            }}
            className={`flex-1 py-3 text-center font-kids font-bold text-sm sm:text-base transition-colors flex items-center justify-center gap-2 border-b-2 ${
              activeTab === 'register'
                ? 'border-rose-500 text-rose-900 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>حساب بطل جديد</span>
          </button>
        </div>

        {/* Messages */}
        <div className="px-5 pt-3">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-medium flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{errorMsg}</span>
            </div>
          )}
          {successMsg && (
            <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-xl text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-green-600" />
              <span>{successMsg}</span>
            </div>
          )}
        </div>

        {/* Form Body */}
        <div className="p-5">
          {activeTab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-3.5">
              {/* Username Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  اسْمُ الْمُسْتَخْدِم (Username):
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    placeholder="مثال: بطل_المستقبل أو ahmed"
                    className="w-full pr-9 pl-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm focus:border-amber-400 focus:bg-white focus:outline-hidden transition-all text-slate-800"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  الرَّقَمُ السِّرِّيّ (Password):
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                    <KeyRound className="w-4 h-4" />
                  </span>
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="اكتب الرقم السري هنا"
                    className="w-full pr-9 pl-10 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm focus:border-amber-400 focus:bg-white focus:outline-hidden transition-all text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 hover:text-slate-600"
                    title={showLoginPassword ? 'إخفاء' : 'إظهار'}
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Fast Demo / Test Fill */}
              <div className="pt-1 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={handleFastDemoLogin}
                  className="text-amber-700 hover:text-amber-800 underline font-bold"
                >
                  ⚡ تجربة حساب تجريبي سريع (بطل_المستقبل / 123)
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-kids font-bold text-base rounded-2xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <LogIn className="w-5 h-5" />
                <span>دُخُولٌ إِلَى الْمُغَامَرَة 🚀</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3">
              {/* Display Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  اسْمُ الْبَطَل / الطِّفْل:
                </label>
                <input
                  type="text"
                  required
                  value={regDisplayName}
                  onChange={(e) => setRegDisplayName(e.target.value)}
                  placeholder="مثال: أحمد، سارة، يوسف"
                  className="w-full px-3 py-2 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm focus:border-rose-400 focus:bg-white focus:outline-hidden transition-all"
                />
              </div>

              {/* Username */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  اسْمُ الْمُسْتَخْدِم (بدون مسافات):
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    placeholder="مثال: ahmed_hero أو بطل_1"
                    className="w-full pr-9 pl-3 py-2 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm focus:border-rose-400 focus:bg-white focus:outline-hidden transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  الرَّقَمُ السِّرِّيّ (سهل للتذكر):
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                    <KeyRound className="w-4 h-4" />
                  </span>
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="مثال: 123456"
                    className="w-full pr-9 pl-10 py-2 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm focus:border-rose-400 focus:bg-white focus:outline-hidden transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegPassword(!showRegPassword)}
                    className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 hover:text-slate-600"
                  >
                    {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Choose Avatar */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  اخْتَرْ صُورَةَ شَخْصِيَّتِكَ:
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {AVATAR_OPTIONS.map((av) => (
                    <button
                      key={av.emoji}
                      type="button"
                      onClick={() => {
                        setRegAvatar(av.emoji);
                        sound.playPop();
                      }}
                      className={`p-2 rounded-xl flex flex-col items-center justify-center text-2xl border-2 transition-all cursor-pointer ${
                        regAvatar === av.emoji
                          ? 'border-rose-500 bg-rose-50 scale-105 shadow-xs'
                          : 'border-slate-200 hover:border-amber-300 bg-slate-50'
                      }`}
                    >
                      <span>{av.emoji}</span>
                      <span className="text-[10px] text-slate-600 font-bold truncate mt-0.5">
                        {av.label.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Register */}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-rose-500 to-indigo-600 hover:from-rose-600 hover:to-indigo-700 text-white font-kids font-bold text-base rounded-2xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span>إِنْشَاءُ حِسَابٍ وَبَدْءُ الرِّحْلَة ✨</span>
              </button>
            </form>
          )}

          {/* Quick Existing Accounts Switcher */}
          {accounts.length > 0 && (
            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-xs text-slate-600 font-bold mb-2">
                <Users className="w-3.5 h-3.5 text-amber-600" />
                <span>حسابات مسجلة على هذا الجهاز:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {accounts.map((acc) => (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => handleQuickSwitch(acc)}
                    className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-lg text-xs font-medium transition-colors"
                  >
                    <span>{acc.avatar}</span>
                    <span>{acc.displayName}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
