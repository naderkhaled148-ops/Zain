import React from 'react';
import { 
  X, 
  Palette, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Check, 
  Sliders, 
  Eye, 
  RotateCcw,
  Sun,
  Moon,
  Zap,
  GraduationCap,
  ShieldCheck,
  Award
} from 'lucide-react';
import { ThemeId, ButtonStyleVariant, AppTheme, DifficultyLevel } from '../types';
import { APP_THEMES, BUTTON_STYLE_CLASSES } from '../data/themesData';
import { DIFFICULTY_CONFIGS, getDifficultyConfig } from '../data/difficultyData';
import { sound } from '../utils/soundEffects';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentThemeId: ThemeId;
  currentButtonStyle: ButtonStyleVariant;
  currentDifficulty?: DifficultyLevel;
  onSelectTheme: (themeId: ThemeId) => void;
  onSelectButtonStyle: (style: ButtonStyleVariant) => void;
  onSelectDifficulty?: (difficulty: DifficultyLevel) => void;
  isSoundOn: boolean;
  onToggleSound: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentThemeId,
  currentButtonStyle,
  currentDifficulty = 'medium',
  onSelectTheme,
  onSelectButtonStyle,
  onSelectDifficulty,
  isSoundOn,
  onToggleSound
}) => {
  if (!isOpen) return null;

  const activeTheme = APP_THEMES.find(t => t.id === currentThemeId) || APP_THEMES[0];
  const activeBtnConfig = BUTTON_STYLE_CLASSES[currentButtonStyle];
  const activeDifficultyConfig = getDifficultyConfig(currentDifficulty);

  const handleThemeClick = (theme: AppTheme) => {
    sound.playStar();
    onSelectTheme(theme.id);
    const audioAnnouncements: Record<ThemeId, string> = {
      space: 'مَبْرُوك! تَمَّ تَفْعِيلُ مَظْهَرِ الْفَضَاءِ الْكَوْنِيِّ وَالنُّجُومِ اللَّامِعَة!',
      forest: 'رَائِع! تَمَّ تَفْعِيلُ مَظْهَرِ الْغَابَةِ الْخَضْرَاءِ وَالطَّبِيعَةِ الْمُنْعِشَة!',
      ocean: 'مُمْتَاز! تَمَّ تَفْعِيلُ مَظْهَرِ أَعْمَاقِ الْمُحِيطِ وَالْأَمْوَاجِ الزَّرْقَاء!',
      sunshine: 'أَهْلاً بِكَ! تَمَّ تَفْعِيلُ مَظْهَرِ شُرُوقِ الشَّمْسِ الذَّهَبِيِّ الدَّافِئ!',
      candy: 'يَا لَهُ مِنْ جَمَال! تَمَّ تَفْعِيلُ مَظْهَرِ عَالَمِ الْحَلْوَى اللَّذِيذ!'
    };
    sound.speakArabic(audioAnnouncements[theme.id] || `تَمَّ اخْتِيَارُ ${theme.name}`);
  };

  const handleButtonStyleClick = (variant: ButtonStyleVariant) => {
    sound.playPop();
    onSelectButtonStyle(variant);
    const names: Record<ButtonStyleVariant, string> = {
      rounded: 'أَزْرَارٌ دَائِرِيَّةٌ نَاعِمَة',
      '3d': 'أَزْرَارٌ ثُلَاثِيَّةُ الْأَبْعَاد',
      classic: 'أَزْرَارٌ كَلَاسِيكِيَّة'
    };
    sound.speakArabic(`تَمَّ اخْتِيَارُ ${names[variant]}`);
  };

  const handleDifficultyClick = (level: DifficultyLevel) => {
    sound.playSuccess();
    if (onSelectDifficulty) {
      onSelectDifficulty(level);
    }
    const config = DIFFICULTY_CONFIGS[level];
    sound.speakArabic(config.speechAnnouncement);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full p-5 sm:p-7 shadow-2xl relative max-h-[92vh] overflow-y-auto border-4 border-amber-300 text-slate-800"
        style={{ direction: 'rtl' }}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playPop();
            onClose();
          }}
          className="absolute top-4 left-4 bg-slate-100 hover:bg-slate-200 text-slate-700 p-2.5 rounded-2xl transition-all active:scale-95 cursor-pointer shadow-xs"
          title="إغلاق الإعدادات"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-500 flex items-center justify-center text-white shadow-md">
            <Palette className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black font-kids text-slate-800 flex items-center gap-2">
              <span>مُخَصِّصُ الْمَظْهَرِ وَالْإِعْدَادَات</span>
              <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                Theme Customizer 🎨
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              اختر ألوانك المفضلة وشكل الأزرار لتخصيص كامل التطبيق حسب رغبتك!
            </p>
          </div>
        </div>

        {/* SECTION 1: THEME CUSTOMIZER (Color Palettes) */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base sm:text-lg font-black font-kids text-slate-800 flex items-center gap-2">
              <span className="text-xl">🎨</span>
              <span>اخْتَرْ بَالِيتَةَ الْأَلْوَانِ (Color Palettes)</span>
            </h3>
            <span className="text-xs text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full font-bold">
              المظهر النشط: {activeTheme.icon} {activeTheme.name}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {APP_THEMES.map((theme) => {
              const isSelected = theme.id === currentThemeId;

              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => handleThemeClick(theme)}
                  className={`group relative text-right p-3.5 rounded-2xl border-2 transition-all duration-200 cursor-pointer overflow-hidden ${
                    isSelected
                      ? 'border-indigo-600 shadow-lg scale-[1.02] ring-2 ring-indigo-400/40 bg-indigo-50/40'
                      : 'border-slate-200 hover:border-indigo-300 hover:shadow-md bg-slate-50/60'
                  }`}
                >
                  {/* Selected check badge */}
                  {isSelected && (
                    <span className="absolute top-2.5 left-2.5 bg-indigo-600 text-white rounded-full p-1 shadow-md animate-in zoom-in-75">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  )}

                  {/* Header row: Icon & Name */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl p-1.5 rounded-xl bg-white shadow-xs border border-slate-100">
                      {theme.icon}
                    </span>
                    <div>
                      <div className="font-kids font-bold text-sm text-slate-800 flex items-center gap-1.5">
                        <span>{theme.name}</span>
                        {theme.isDark && (
                          <span className="text-[10px] bg-slate-800 text-cyan-300 px-1.5 py-0.2 rounded font-mono">
                            Dark 🌙
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-600 font-mono">
                        {theme.nameEn}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-2">
                    {theme.tagline}
                  </p>

                  {/* Color Swatches */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                    <span className="text-[10px] font-bold text-slate-600">الألوان:</span>
                    <div className="flex items-center gap-1.5">
                      {theme.palette.map((hex, idx) => (
                        <div
                          key={idx}
                          className="w-5 h-5 rounded-full border border-white shadow-xs"
                          style={{ backgroundColor: hex }}
                          title={hex}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Mini Preview Bar */}
                  <div 
                    className="mt-2.5 p-2 rounded-xl text-center text-xs font-bold text-white shadow-xs"
                    style={{
                      background: theme.palette[0] === '#090D1A' 
                        ? 'linear-gradient(to right, #0284c7, #6366f1, #a855f7)'
                        : `linear-gradient(to right, ${theme.palette[0]}, ${theme.palette[1]})`
                    }}
                  >
                    نموذج زر المظهر 🚀
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: BUTTON STYLES (أنماط وأشكال الأزرار) */}
        <div className="mb-8 p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base sm:text-lg font-black font-kids text-slate-800 flex items-center gap-2">
              <span className="text-xl">🔘</span>
              <span>نَمَطُ وَشَكْلُ الْأَزْرَار (Button Styles)</span>
            </h3>
            <span className="text-xs text-indigo-700 font-bold bg-indigo-100 px-2 py-0.5 rounded-full">
              {activeBtnConfig.icon} {activeBtnConfig.label}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(Object.keys(BUTTON_STYLE_CLASSES) as ButtonStyleVariant[]).map((styleKey) => {
              const item = BUTTON_STYLE_CLASSES[styleKey];
              const isSelected = styleKey === currentButtonStyle;

              return (
                <button
                  key={styleKey}
                  type="button"
                  onClick={() => handleButtonStyleClick(styleKey)}
                  className={`p-3.5 text-right rounded-2xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-indigo-600 shadow-md ring-2 ring-indigo-300/50'
                      : 'bg-white/70 hover:bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xl">{item.icon}</span>
                    {isSelected && (
                      <span className="bg-indigo-600 text-white p-0.5 rounded-full">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <div className="font-kids font-bold text-xs sm:text-sm text-slate-800 mb-1">
                    {item.label}
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug mb-2.5">
                    {item.preview}
                  </p>
                  
                  {/* Live Button Preview */}
                  <div className="pt-1.5 border-t border-slate-100">
                    <div 
                      className={`text-center py-1.5 px-3 text-xs font-bold text-white ${activeTheme.primaryBtnClass} ${item.className}`}
                    >
                      زر تجريبي
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 3: PARENT DIFFICULTY CONTROLS */}
        <div className="mb-8 p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-indigo-50/70 via-purple-50/50 to-amber-50/60 border-2 border-indigo-200/80 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 border-b border-indigo-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black font-kids text-indigo-950 flex items-center gap-2">
                  <span>تَعْدِيلُ مُسْتَوَى الصُّعُوبَة (لِأَوْلِيَاءِ الْأُمُور)</span>
                  <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full font-bold">
                    👨‍👩‍👧‍👦 خَاصٌّ بِالْوَالِدَيْن
                  </span>
                </h3>
                <p className="text-xs text-indigo-900/80">
                  اختر مستوى الأنشطة المناسب لمهارات طفلك (سهل، متوسط، صعب) لضبط الحساب والحروف والألعاب
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-indigo-200 shadow-2xs">
              <span className="text-xs text-slate-500 font-medium">الْمُسْتَوَى النَّشِط:</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${activeDifficultyConfig.activeBadgeClass}`}>
                {activeDifficultyConfig.icon} {activeDifficultyConfig.labelShort}
              </span>
            </div>
          </div>

          {/* Difficulty Level Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-3">
            {(Object.keys(DIFFICULTY_CONFIGS) as DifficultyLevel[]).map((levelKey) => {
              const diff = DIFFICULTY_CONFIGS[levelKey];
              const isSelected = levelKey === currentDifficulty;

              return (
                <button
                  key={levelKey}
                  type="button"
                  onClick={() => handleDifficultyClick(levelKey)}
                  className={`text-right p-3.5 rounded-2xl border-2 transition-all duration-200 cursor-pointer relative flex flex-col justify-between ${
                    isSelected
                      ? `bg-white shadow-md scale-[1.02] ring-2 ring-indigo-400/40 ${diff.borderClass}`
                      : 'bg-white/80 hover:bg-white border-slate-200 hover:border-indigo-200'
                  }`}
                >
                  {/* Top Bar: Icon, Name & Checkmark */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl p-1 rounded-xl bg-slate-50 border border-slate-100 shadow-2xs">
                          {diff.icon}
                        </span>
                        <div>
                          <div className="font-kids font-bold text-sm text-slate-800">
                            {diff.label}
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono">
                            {diff.englishLabel}
                          </div>
                        </div>
                      </div>

                      {isSelected && (
                        <span className="bg-indigo-600 text-white p-1 rounded-full shadow-xs">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>

                    {/* Age recommendation */}
                    <div className="mb-2">
                      <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                        👥 الفئة: {diff.ageGroup}
                      </span>
                    </div>

                    {/* Summary */}
                    <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
                      {diff.summary}
                    </p>

                    {/* Activity Adaptations Checklist */}
                    <div className="space-y-1.5 text-[10px] text-slate-700 border-t border-slate-100 pt-2 mb-2">
                      <div className="flex items-start gap-1">
                        <span className="text-xs">🔢</span>
                        <span>{diff.mathDetails}</span>
                      </div>
                      <div className="flex items-start gap-1">
                        <span className="text-xs">📖</span>
                        <span>{diff.languageDetails}</span>
                      </div>
                      <div className="flex items-start gap-1">
                        <span className="text-xs">🎮</span>
                        <span>{diff.gamesDetails}</span>
                      </div>
                    </div>
                  </div>

                  {/* Level status indicator */}
                  <div className="pt-2 border-t border-slate-100">
                    <div 
                      className={`text-center py-1 px-2 rounded-xl text-xs font-bold transition-colors ${
                        isSelected 
                          ? diff.activeBadgeClass 
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {isSelected ? '✓ الْمُسْتَوَى الْمُفَعَّلُ حَالِيًّا' : 'انْقُرْ لِلتَّفْعِيل'}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Parental guidance tip */}
          <div className="flex items-center gap-2 text-xs text-indigo-900 bg-white/70 p-2.5 rounded-xl border border-indigo-100">
            <span className="text-base">💡</span>
            <span>
              <strong>نَصِيحَةٌ لِلْوَالِدَيْن:</strong> يُمْكِنُكُمْ تَغْيِيرُ مُسْتَوَى الصُّعُوبَةِ فِي أَيِّ وَقْتٍ مَعَ تَقَدُّمِ طِفْلِكَ، وَسَتَبْقَى جَمِيعُ النُّجُومِ وَالْأَوْسِمَةِ مَحْفُوظَةً كَمَا هِيَ.
            </span>
          </div>
        </div>

        {/* SECTION 4: AUDIO & VOICE SETTINGS */}
        <div className="mb-6 p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80">
          <h3 className="text-base font-black font-kids text-amber-950 mb-3 flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-amber-700" />
            <span>إِعْدَادَاتُ الصَّوْتِ وَالنُّطْق</span>
          </h3>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  onToggleSound();
                  sound.playPop();
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-kids font-bold text-xs transition-all cursor-pointer ${
                  isSoundOn 
                    ? 'bg-green-600 hover:bg-green-700 text-white shadow-xs' 
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                {isSoundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span>{isSoundOn ? 'الصوت يعمل (مفعل)' : 'الصوت مكتوم'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.unlockAudio();
                  sound.playSuccess();
                  sound.speakArabic('أَهْلاً بِكَ! صَوْتُ الْبَرْنَامَجِ يَعْمَلُ بِمُنْتَهَى الْوُضُوحِ وَالنَّقَاء!');
                }}
                className="flex items-center gap-1.5 bg-white hover:bg-amber-100 text-amber-950 px-3 py-2 rounded-xl font-kids font-bold text-xs border border-amber-300 shadow-2xs transition-all cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                <span>اخْتِبَارُ النُّطْقِ الْآن</span>
              </button>
            </div>

            <div className="text-xs text-amber-900/80 font-medium">
              💡 الصوت يشمل نطق الحروف بالحركات، الكلمات، والقصص المشوقة.
            </div>
          </div>
        </div>

        {/* Modal Footer / Save & Close */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={() => {
              sound.playPop();
              onSelectTheme('sunshine');
              onSelectButtonStyle('rounded');
              sound.speakArabic('تَمَّتِ اسْتِعَادَةُ الْمَظْهَرِ الْأَصْلِيّ');
            }}
            className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-800 font-bold px-2 py-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>اسْتِعَادَةُ الْمَظْهَرِ الْأَصْلِيّ (Default)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className={`px-7 py-2.5 text-white font-kids font-bold text-sm shadow-md transition-all cursor-pointer ${activeTheme.primaryBtnClass} ${activeBtnConfig.className}`}
          >
            حِفْظُ وَإِغْلَاق (تَمَام) ✅
          </button>
        </div>
      </div>
    </div>
  );
};
