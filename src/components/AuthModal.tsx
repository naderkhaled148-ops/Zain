import React, { useState, useEffect } from 'react';
import { UserAccount, UserProgress } from '../types';
import { 
  getStoredAccounts, 
  saveAccounts, 
  setCurrentUserId, 
  deleteStoredAccount,
  findMatchingAccount,
  normalizeNumerals,
  DEFAULT_INITIAL_PROGRESS 
} from '../utils/authStorage';
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
  Users,
  Trophy,
  Star,
  Coins,
  Trash2,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount | null;
  currentProgress?: UserProgress;
  initialTab?: 'login' | 'register';
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
  { emoji: '🦖', label: 'الديناصور اللطيف' },
  { emoji: '🐱', label: 'القطة المرحة' },
  { emoji: '🎨', label: 'الفنان المبدع' },
  { emoji: '🦸', label: 'البطل الخارق' }
];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  currentProgress,
  initialTab = 'register',
  onLoginSuccess,
  onLogout,
  forceLogin = false,
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);
  
  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register form state
  const [regDisplayName, setRegDisplayName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regAvatar, setRegAvatar] = useState('🦁');
  const [hasCustomUsername, setHasCustomUsername] = useState(false);

  // Error & success messages
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Refresh stored accounts when modal opens
  const [accounts, setAccounts] = useState<UserAccount[]>([]);

  useEffect(() => {
    if (isOpen) {
      setAccounts(getStoredAccounts());
      setActiveTab(initialTab);
      setErrorMsg(null);
      setSuccessMsg(null);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  // Auto suggest username when typing display name
  const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setRegDisplayName(val);
    if (!hasCustomUsername) {
      // Create clean suggested username
      const suggested = val
        .trim()
        .replace(/\s+/g, '_')
        .toLowerCase();
      setRegUsername(suggested);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const inputId = loginIdentifier.trim();
    const inputPass = normalizeNumerals(loginPassword.trim());

    if (!inputId) {
      setErrorMsg('يرجى كتابة اسم البطل أو اسم المستخدم!');
      sound.playTryAgain();
      return;
    }

    if (!inputPass) {
      setErrorMsg('يرجى إدخال الرقم السري!');
      sound.playTryAgain();
      return;
    }

    const found = findMatchingAccount(inputId);

    if (!found) {
      setErrorMsg('لم نجد هذا الحساب المسجل. هل ترغب في إنشاء حساب جديد الآن؟');
      sound.playTryAgain();
      return;
    }

    const savedPassNorm = normalizeNumerals(found.password.trim());
    if (savedPassNorm !== inputPass) {
      setErrorMsg('الرقم السري غير صحيح، تأكد منه وحاول مجدداً!');
      sound.playTryAgain();
      return;
    }

    // Success!
    setCurrentUserId(found.id);
    setSuccessMsg(`أهلاً بك مجدداً يا بطل ${found.displayName}! 🎉`);
    sound.playFanfare();
    sound.speakArabic(`مَرْحَباً بِكَ يَا بَطَل! تَمَّ تَسْجِيلُ الدُّخُولِ بِنَجَاح!`);
    confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });

    setTimeout(() => {
      onLoginSuccess(found);
      onClose();
    }, 700);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const trimmedDisplayName = regDisplayName.trim();
    let trimmedUser = regUsername.trim().toLowerCase().replace(/\s+/g, '_');
    const trimmedPass = normalizeNumerals(regPassword.trim());

    if (!trimmedDisplayName) {
      setErrorMsg('يرجى إدخال اسمك الجميل (اسم الطفل)!');
      sound.playTryAgain();
      return;
    }

    if (!trimmedUser) {
      trimmedUser = trimmedDisplayName.toLowerCase().replace(/\s+/g, '_');
    }

    if (!trimmedPass || trimmedPass.length < 2) {
      setErrorMsg('الرقم السري أو رمز المرور يجب أن يكون رمزاً أو رقمين على الأقل (مثل 1234)!');
      sound.playTryAgain();
      return;
    }

    // Check if duplicate
    const existing = accounts.find(
      (acc) => acc.username.trim().toLowerCase() === trimmedUser
    );
    if (existing) {
      setErrorMsg('اسم المستخدم هذا مسجل مسبقاً، يمكنك تسجيل الدخول به أو اختيار اسم آخر!');
      sound.playTryAgain();
      return;
    }

    // Preserve existing progress so child doesn't lose stars and achievements
    const progressToSave: UserProgress = currentProgress ? {
      ...currentProgress,
      lastActiveDate: new Date().toISOString().split('T')[0]
    } : {
      ...DEFAULT_INITIAL_PROGRESS,
      lastActiveDate: new Date().toISOString().split('T')[0]
    };

    const newAccount: UserAccount = {
      id: 'hero_' + Date.now(),
      username: trimmedUser,
      password: trimmedPass,
      displayName: trimmedDisplayName,
      avatar: regAvatar,
      createdAt: new Date().toISOString(),
      progress: progressToSave
    };

    const updatedAccounts = [newAccount, ...accounts];
    saveAccounts(updatedAccounts);
    setCurrentUserId(newAccount.id);
    setAccounts(updatedAccounts);

    setSuccessMsg(`تم إنشاء وحفظ حساب البطل (${newAccount.displayName}) بنجاح! 🌟`);
    sound.playFanfare();
    sound.speakArabic(`مَبْرُوك يَا ${newAccount.displayName}! تَمَّ حِفْظُ حِسَابِكَ لِلِاسْتِخْدَامِ دَائِماً!`);
    confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });

    setTimeout(() => {
      onLoginSuccess(newAccount);
      onClose();
    }, 850);
  };

  const handleQuickSelectAccount = (acc: UserAccount) => {
    sound.playPop();
    setCurrentUserId(acc.id);
    setSuccessMsg(`مرحباً يا ${acc.displayName}! جاري التحميل...`);
    sound.playSuccess();
    sound.speakArabic(`أَهْلاً بِكَ يَا ${acc.displayName}!`);
    setTimeout(() => {
      onLoginSuccess(acc);
      onClose();
    }, 500);
  };

  const handleDeleteAccount = (accId: string, accName: string) => {
    if (window.confirm(`هل أنت متأكد من حذف حساب (${accName}) من هذا الجهاز؟`)) {
      const remaining = deleteStoredAccount(accId);
      setAccounts(remaining);
      sound.playPop();
      if (currentUser?.id === accId) {
        onLogout();
      }
    }
  };

  const handleFastDemoLogin = () => {
    setLoginIdentifier('batal_1');
    setLoginPassword('123');
    setErrorMsg(null);
    sound.playPop();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        id="auth-modal-card"
        className="bg-white border-4 border-amber-300 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col"
      >
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-600 p-4 sm:p-5 text-white relative shrink-0">
          {!forceLogin && (
            <button
              onClick={() => {
                sound.playPop();
                onClose();
              }}
              className="absolute top-3 left-3 p-2 rounded-full bg-black/25 hover:bg-black/40 text-white transition-colors cursor-pointer"
              title="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/25 rounded-2xl text-4xl mb-1.5 shadow-inner border border-white/40 animate-bounce">
              {currentUser ? currentUser.avatar : (activeTab === 'register' ? regAvatar : '🔐')}
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-kids tracking-wide">
              {currentUser ? 'مَلَفُّ الْبَطَلِ التَّعْلِيمِيّ' : (activeTab === 'register' ? 'إِنْشَاءُ حِسَابِ بَطَلٍ جَدِيد ✨' : 'تَسْجِيلُ الدُّخُولِ لِلْأَبْطَال 🔑')}
            </h2>
            <p className="text-xs sm:text-sm text-yellow-100 font-medium mt-1 max-w-xs mx-auto">
              {currentUser 
                ? 'حسابك محفوظ على هذا الجهاز داخل البرنامج مع كل النجوم والألعاب' 
                : 'احفظ إنجازاتك في حساب داخلي خاص بالبرنامج بدون أي حساب خارجي'}
            </p>
            <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-0.5 rounded-full bg-black/20 border border-white/20 text-[11px] text-yellow-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>تسجيل داخلي على البرنامج فقط • لا يتطلب جوجل أو إيميل</span>
            </div>
          </div>
        </div>

        {/* If User Already Logged In: Show Active Profile & Switch Options */}
        {currentUser ? (
          <div className="p-5 overflow-y-auto space-y-4">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-2xl border-2 border-amber-200">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{currentUser.avatar}</span>
                  <div>
                    <h3 className="font-black font-kids text-lg text-amber-950">
                      {currentUser.displayName}
                    </h3>
                    <p className="text-xs text-amber-800 font-mono">
                      اسم الدخول: @{currentUser.username}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    sound.playPop();
                    onLogout();
                  }}
                  className="flex items-center gap-1.5 bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1.5 rounded-xl font-kids font-bold text-xs border border-red-200 transition-colors cursor-pointer"
                >
                  <LogIn className="w-4 h-4 rotate-180" />
                  <span>خروج</span>
                </button>
              </div>

              {/* Quick stats preview */}
              <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-amber-200/60 text-center">
                <div className="bg-white/80 p-2 rounded-xl">
                  <div className="text-xs text-slate-500 font-bold">الْمُسْتَوَى</div>
                  <div className="text-base font-black font-kids text-indigo-600">
                    🏆 {currentUser.progress?.level || 1}
                  </div>
                </div>
                <div className="bg-white/80 p-2 rounded-xl">
                  <div className="text-xs text-slate-500 font-bold">النُّجُوم</div>
                  <div className="text-base font-black font-kids text-amber-500">
                    ⭐ {currentUser.progress?.stars || 0}
                  </div>
                </div>
                <div className="bg-white/80 p-2 rounded-xl">
                  <div className="text-xs text-slate-500 font-bold">الْعُمْلَات</div>
                  <div className="text-base font-black font-kids text-yellow-600">
                    🪙 {currentUser.progress?.coins || 0}
                  </div>
                </div>
              </div>
            </div>

            {/* Switch Account or Add Brother/Sister Hero */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-indigo-600" />
                  <span>تبديل البطل أو إضافة أخ / أخت:</span>
                </span>
                <button
                  onClick={() => {
                    sound.playPop();
                    onLogout();
                    setActiveTab('register');
                  }}
                  className="text-indigo-600 hover:text-indigo-800 underline flex items-center gap-1 font-bold cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>+ تسجيل بطل جديد</span>
                </button>
              </div>

              <div className="space-y-1.5">
                {accounts.map((acc) => (
                  <div 
                    key={acc.id}
                    className={`p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                      acc.id === currentUser.id 
                        ? 'border-emerald-400 bg-emerald-50/60 font-bold' 
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <button
                      onClick={() => handleQuickSelectAccount(acc)}
                      className="flex items-center gap-2.5 flex-1 text-right cursor-pointer"
                    >
                      <span className="text-2xl">{acc.avatar}</span>
                      <div>
                        <div className="text-sm font-kids font-bold text-slate-800">
                          {acc.displayName}
                          {acc.id === currentUser.id && (
                            <span className="mr-2 text-[10px] bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded-full">
                              الحساب الحالي
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          ⭐ {acc.progress?.stars || 0} نجمة • المستوى {acc.progress?.level || 1}
                        </div>
                      </div>
                    </button>

                    {acc.id !== currentUser.id && accounts.length > 1 && (
                      <button
                        onClick={() => handleDeleteAccount(acc.id, acc.displayName)}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                        title="حذف هذا الحساب من الجهاز"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-kids font-bold text-base rounded-2xl shadow-md active:scale-95 transition-all cursor-pointer mt-2"
            >
              مُتَابَعَةُ التَّعَلُّمِ وَاللَّعِب 🚀
            </button>
          </div>
        ) : (
          <>
            {/* Primary Tab Switcher */}
            <div className="flex border-b border-slate-200 bg-slate-50 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('register');
                  setErrorMsg(null);
                  sound.playPop();
                }}
                className={`flex-1 py-3 text-center font-kids font-bold text-sm sm:text-base transition-colors flex items-center justify-center gap-2 border-b-2 cursor-pointer ${
                  activeTab === 'register'
                    ? 'border-rose-500 text-rose-900 bg-white shadow-xs'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <UserPlus className="w-4 h-4 text-rose-500" />
                <span>حِسَابُ بَطَلٍ جَدِيد ✨</span>
                <span className="text-[10px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full font-bold">موصى به</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('login');
                  setErrorMsg(null);
                  sound.playPop();
                }}
                className={`flex-1 py-3 text-center font-kids font-bold text-sm sm:text-base transition-colors flex items-center justify-center gap-2 border-b-2 cursor-pointer ${
                  activeTab === 'login'
                    ? 'border-amber-500 text-amber-900 bg-white shadow-xs'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <LogIn className="w-4 h-4 text-amber-600" />
                <span>تَسْجِيلُ الدُّخُول 🔑</span>
              </button>
            </div>

            {/* Error / Success Banners */}
            {(errorMsg || successMsg) && (
              <div className="px-5 pt-3 shrink-0">
                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-bold flex items-center gap-2 animate-shake">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                    <div className="flex-1">{errorMsg}</div>
                    {errorMsg.includes('إنشاء حساب') && (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab('register');
                          setErrorMsg(null);
                        }}
                        className="bg-red-600 text-white px-2 py-1 rounded-md text-[11px] hover:bg-red-700 underline font-bold"
                      >
                        إنشاء الآن
                      </button>
                    )}
                  </div>
                )}
                {successMsg && (
                  <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-xl text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-green-600" />
                    <span>{successMsg}</span>
                  </div>
                )}
              </div>
            )}

            {/* Content Area */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
              {activeTab === 'register' ? (
                /* REGISTRATION FORM */
                <form onSubmit={handleRegister} className="space-y-3.5">
                  {/* Notice about saving current progress */}
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2.5 text-xs text-emerald-900 font-bold">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <span>سَيَتِمُّ حِفْظُ حِسَابِكَ مَعَ </span>
                      <span className="text-amber-700 font-black">⭐ {currentProgress?.stars || 15} نُجُوم </span>
                      <span>وَمُسْتَوَاكَ دَائِماً عَلَى هَذَا الْجِهَاز!</span>
                    </div>
                  </div>

                  {/* 1. Display Name (Child's Name) */}
                  <div>
                    <label className="block text-xs font-black text-slate-800 mb-1">
                      اسْمُ الْبَطَل / الطِّفْل (الَّذِي سَيُنَادِيكَ بِهِ التَّطْبِيق):
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                        <User className="w-4 h-4 text-rose-500" />
                      </span>
                      <input
                        type="text"
                        required
                        value={regDisplayName}
                        onChange={handleDisplayNameChange}
                        placeholder="اكتب اسمك الجميل (مثال: أحمد، سارة، نور، يوسف)"
                        className="w-full pr-9 pl-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm focus:border-rose-400 focus:bg-white focus:outline-hidden transition-all text-slate-800 font-bold"
                      />
                    </div>
                  </div>

                  {/* 2. Choose Avatar */}
                  <div>
                    <label className="block text-xs font-black text-slate-800 mb-1.5">
                      اخْتَرْ شَخْصِيَّتَكَ الْمُفَضَّلَة:
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {AVATAR_OPTIONS.map((av) => (
                        <button
                          key={av.emoji}
                          type="button"
                          onClick={() => {
                            setRegAvatar(av.emoji);
                            sound.playPop();
                          }}
                          className={`p-2 rounded-xl flex flex-col items-center justify-center border-2 transition-all cursor-pointer ${
                            regAvatar === av.emoji
                              ? 'border-rose-500 bg-rose-50 scale-105 shadow-sm ring-2 ring-rose-200'
                              : 'border-slate-200 hover:border-amber-300 bg-slate-50'
                          }`}
                          title={av.label}
                        >
                          <span className="text-2xl">{av.emoji}</span>
                          <span className="text-[10px] text-slate-600 font-bold truncate mt-0.5">
                            {av.label.split(' ')[0]}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3. Username / ID */}
                  <div>
                    <label className="block text-xs font-black text-slate-800 mb-1">
                      اسْمُ الدُّخُول (Username):
                    </label>
                    <input
                      type="text"
                      required
                      value={regUsername}
                      onChange={(e) => {
                        setHasCustomUsername(true);
                        setRegUsername(e.target.value);
                      }}
                      placeholder="اسم الدخول (مثل ahmed أو بطل_1)"
                      className="w-full px-3 py-2 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm focus:border-rose-400 focus:bg-white focus:outline-hidden transition-all text-slate-800"
                    />
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      يمكنك استخدام اسمك كما هو أو كتابة رمز سهل
                    </p>
                  </div>

                  {/* 4. Password / PIN */}
                  <div>
                    <label className="block text-xs font-black text-slate-800 mb-1">
                      الرَّقَمُ السِّرِّيّ (رمز سهل للحفظ مثل 1234 أو كلمة):
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                        <KeyRound className="w-4 h-4 text-indigo-500" />
                      </span>
                      <input
                        type={showRegPassword ? 'text' : 'password'}
                        required
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="اكتب رقماً سرياً سهلاً (مثل 1234)"
                        className="w-full pr-9 pl-10 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm focus:border-rose-400 focus:bg-white focus:outline-hidden transition-all text-slate-800 font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegPassword(!showRegPassword)}
                        className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                        title={showRegPassword ? 'إخفاء' : 'إظهار'}
                      >
                        {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-rose-500 via-amber-500 to-indigo-600 hover:from-rose-600 hover:to-indigo-700 text-white font-kids font-black text-base rounded-2xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-3"
                  >
                    <Sparkles className="w-5 h-5 text-yellow-300" />
                    <span>حِفْظُ الْحِسَابِ وَبَدْءُ التَّعَلُّم 🌟</span>
                  </button>
                </form>
              ) : (
                /* LOGIN FORM */
                <div className="space-y-4">
                  {/* Quick Click-to-login Existing Accounts */}
                  {accounts.length > 0 && (
                    <div className="bg-amber-50/70 p-3.5 rounded-2xl border-2 border-amber-200 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-black text-amber-900">
                        <Users className="w-4 h-4 text-amber-600" />
                        <span>اخْتَرْ حِسَابَكَ لِلدُّخُولِ السَّرِيع:</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {accounts.map((acc) => (
                          <button
                            key={acc.id}
                            type="button"
                            onClick={() => handleQuickSelectAccount(acc)}
                            className="flex items-center gap-2 p-2 bg-white hover:bg-amber-100/60 border border-amber-200 rounded-xl text-right transition-all hover:scale-102 cursor-pointer shadow-2xs"
                          >
                            <span className="text-2xl">{acc.avatar}</span>
                            <div className="overflow-hidden">
                              <div className="text-xs font-kids font-black text-slate-800 truncate">
                                {acc.displayName}
                              </div>
                              <div className="text-[10px] text-amber-700">
                                ⭐ {acc.progress?.stars || 0} • اضغط للدخول
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Manual Form */}
                  <form onSubmit={handleLogin} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-black text-slate-800 mb-1">
                        اسْمُ الْبَطَل أَوْ اسْمُ الْمُسْتَخْدِم:
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                          <User className="w-4 h-4" />
                        </span>
                        <input
                          type="text"
                          required
                          value={loginIdentifier}
                          onChange={(e) => setLoginIdentifier(e.target.value)}
                          placeholder="اكتب اسمك أو اسم المستخدم"
                          className="w-full pr-9 pl-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm focus:border-amber-400 focus:bg-white focus:outline-hidden transition-all text-slate-800 font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-800 mb-1">
                        الرَّقَمُ السِّرِّيّ:
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
                          className="w-full pr-9 pl-10 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm focus:border-amber-400 focus:bg-white focus:outline-hidden transition-all text-slate-800 font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                          className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                          title={showLoginPassword ? 'إخفاء' : 'إظهار'}
                        >
                          {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Fast Demo Fill Button */}
                    <div className="pt-1 flex items-center justify-between text-xs">
                      <button
                        type="button"
                        onClick={handleFastDemoLogin}
                        className="text-amber-700 hover:text-amber-800 underline font-bold cursor-pointer"
                      >
                        ⚡ تجربة حساب تجريبي سريع (batal_1 / 123)
                      </button>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-kids font-black text-base rounded-2xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                    >
                      <LogIn className="w-5 h-5" />
                      <span>دُخُولٌ إِلَى الْمُغَامَرَة 🚀</span>
                    </button>
                  </form>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
