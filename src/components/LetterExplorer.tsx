import React, { useState } from 'react';
import { UNITS, LETTERS_DATA } from '../data/curriculumData';
import { LetterInfo } from '../types';
import { sound } from '../utils/soundEffects';
import { Volume2, Sparkles, CheckCircle2, Music, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LetterExplorerProps {
  onEarnRewards: (stars: number, coins: number, xp: number) => void;
}

export const LetterExplorer: React.FC<LetterExplorerProps> = ({ onEarnRewards }) => {
  const [activeUnitId, setActiveUnitId] = useState<number>(1);
  const currentUnit = UNITS.find(u => u.id === activeUnitId) || UNITS[0];
  const [selectedLetterChar, setSelectedLetterChar] = useState<string>(currentUnit.letters[0]);
  const [activeMovement, setActiveMovement] = useState<'fatha' | 'damma' | 'kasra' | 'sukun'>('fatha');
  const [testedWords, setTestedWords] = useState<Record<string, boolean>>({});

  const letterInfo: LetterInfo = LETTERS_DATA[selectedLetterChar] || LETTERS_DATA['أ'];

  const handleSelectLetter = (char: string) => {
    sound.playPop();
    setSelectedLetterChar(char);
    const info = LETTERS_DATA[char];
    if (info) {
      sound.speakArabic(`حَرْفُ ال${info.name}`);
    } else {
      sound.speakArabic(char);
    }
  };

  const handlePronounceMovement = (type: 'fatha' | 'damma' | 'kasra' | 'sukun') => {
    setActiveMovement(type);
    sound.playPop();
    const item = letterInfo.harakat[type];
    sound.speakArabic(`${item.char} .. ${item.word}`);
  };

  const handleTestWord = (word: string) => {
    sound.speakArabic(word);
    if (!testedWords[word]) {
      sound.playStar();
      setTestedWords(prev => ({ ...prev, [word]: true }));
      onEarnRewards(1, 2, 10);
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.7 }
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Unit Selector Strip */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-amber-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎒</span>
            <h2 className="text-lg sm:text-xl font-black font-kids text-slate-800">
              وَحَدَاتُ مَنْهَجِ اللُّغَةِ الْعَرَبِيَّة
            </h2>
          </div>
          <span className="text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-bold">
            سلاح التلميذ - الصف الأول
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
          {UNITS.map((unit) => {
            const isSelected = unit.id === activeUnitId;
            return (
              <button
                key={unit.id}
                onClick={() => {
                  sound.playPop();
                  setActiveUnitId(unit.id);
                  setSelectedLetterChar(unit.letters[0]);
                  sound.speakArabic(unit.theme);
                }}
                className={`p-3 rounded-2xl text-right transition-all duration-200 border-2 relative overflow-hidden ${
                  isSelected
                    ? 'border-amber-500 bg-gradient-to-br from-amber-50 to-orange-50 shadow-md scale-102'
                    : 'border-slate-100 bg-slate-50/50 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{unit.badge}</span>
                  <span className="text-[11px] font-bold text-slate-400">
                    الوحدة {unit.id}
                  </span>
                </div>
                <div className="mt-1 font-black font-kids text-base text-slate-800">
                  {unit.theme}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 truncate">
                  {unit.letters.join(' - ')}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Letters Carousel for active unit */}
      <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 rounded-3xl p-4 sm:p-5 shadow-sm border border-amber-200/70">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔤</span>
            <h3 className="font-kids font-black text-base sm:text-lg text-slate-800">
              اخْتَرْ حَرْفًا لِتَبْدَأَ الرِّحْلَة:
            </h3>
          </div>
          <span className="text-xs text-amber-700 font-bold bg-amber-100 px-2.5 py-0.5 rounded-lg">
            اضْغَطْ لِتَسْمَعَ الصَّوْت 🔊
          </span>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-2 scrollbar-none">
          {currentUnit.letters.map((char) => {
            const isSelected = char === selectedLetterChar;
            const info = LETTERS_DATA[char];
            return (
              <button
                key={char}
                onClick={() => handleSelectLetter(char)}
                className={`w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-2xl flex flex-col items-center justify-center font-kids text-2xl sm:text-3xl font-black transition-all transform select-none ${
                  isSelected
                    ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg scale-110 ring-4 ring-amber-200'
                    : 'bg-white hover:bg-amber-100 text-slate-800 shadow-sm border-2 border-amber-100 hover:scale-105'
                }`}
              >
                <span>{char}</span>
                {info && (
                  <span className={`text-[10px] font-bold ${isSelected ? 'text-amber-100' : 'text-slate-400'}`}>
                    {info.name}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Detailed Letter Exploration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Big Letter Card & Harakat (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Main Letter Card */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-amber-100 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center text-5xl sm:text-6xl font-black font-kids text-white shadow-md relative"
                  style={{ backgroundColor: letterInfo.color }}
                >
                  {letterInfo.letter}
                  <button 
                    onClick={() => sound.speakArabic(`حَرْفُ ال${letterInfo.name}`)}
                    className="absolute -bottom-2 -left-2 bg-white text-slate-800 p-1.5 rounded-full shadow-md hover:scale-110 transition-transform"
                    title="استمع للاسم"
                  >
                    <Volume2 className="w-4 h-4 text-amber-600" />
                  </button>
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black font-kids text-slate-800">
                    حَرْفُ ال{letterInfo.name}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium mt-0.5">
                    الْوَحْدَة: {letterInfo.unitTitle}
                  </p>
                  <button
                    onClick={() => {
                      sound.playStar();
                      onEarnRewards(2, 5, 20);
                      sound.speakPraise();
                      confetti({ particleCount: 35, spread: 60 });
                    }}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-800 px-3 py-1 rounded-full font-bold transition-colors"
                  >
                    <Award className="w-3.5 h-3.5 text-emerald-600" />
                    أَتْقَنْتُ حَرْفَ ال{letterInfo.name}! (+٥ 🪙)
                  </button>
                </div>
              </div>

              <div className="text-4xl animate-playful">
                {letterInfo.harakat.fatha.emoji}
              </div>
            </div>

            {/* Harakat Tabs (The 4 Movements: Fatha, Damma, Kasra, Sukun) */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <span className="font-kids font-bold text-slate-700 text-sm">
                  أَصْوَاتُ الْحَرْفِ بِالْحَرَكَاتِ الْقَصِيرَة:
                </span>
                <span className="text-xs text-slate-400">انْقُرْ لِلِاسْتِمَاع</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {(['fatha', 'damma', 'kasra', 'sukun'] as const).map((type) => {
                  const item = letterInfo.harakat[type];
                  const isCur = activeMovement === type;
                  const labels = {
                    fatha: 'الْفَتْحَة (ـَ)',
                    damma: 'الضَّمَّة (ـُ)',
                    kasra: 'الْكَسْرَة (ـِ)',
                    sukun: 'السُّكُون (ـْ)'
                  };

                  return (
                    <button
                      key={type}
                      onClick={() => handlePronounceMovement(type)}
                      className={`p-3 rounded-2xl text-center border-2 transition-all duration-200 cursor-pointer ${
                        isCur
                          ? 'border-amber-500 bg-amber-50 shadow-md scale-102 ring-2 ring-amber-200'
                          : 'border-slate-100 bg-slate-50/70 hover:bg-amber-50/50'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-500 mb-1">{labels[type]}</div>
                      <div className="text-3xl font-black font-kids text-amber-600 my-1">{item.char}</div>
                      <div className="flex items-center justify-center gap-1 mt-1 text-sm font-bold text-slate-800">
                        <span>{item.emoji}</span>
                        <span>{item.word}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Sound Big Highlight */}
              <div className="mt-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4 rounded-2xl flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="text-4xl bg-white/20 p-2 rounded-xl">
                    {letterInfo.harakat[activeMovement].emoji}
                  </div>
                  <div>
                    <div className="text-2xl font-black font-kids flex items-center gap-2">
                      <span>{letterInfo.harakat[activeMovement].char}</span>
                      <span className="text-amber-200">«{letterInfo.harakat[activeMovement].word}»</span>
                    </div>
                    <div className="text-xs text-white/90 font-medium mt-0.5">
                      {letterInfo.harakat[activeMovement].meaning}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => sound.speakArabic(`${letterInfo.harakat[activeMovement].char} .. ${letterInfo.harakat[activeMovement].word}`)}
                  className="bg-white hover:bg-amber-100 active:scale-95 text-amber-900 p-3 rounded-xl font-bold flex items-center gap-1.5 shadow-sm text-sm"
                >
                  <Volume2 className="w-5 h-5 text-amber-600" />
                  <span>انْطِقْ مَعِي</span>
                </button>
              </div>
            </div>
          </div>

          {/* Letter Rhyme & Song from textbook */}
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-3xl p-5 border border-rose-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-rose-800 font-kids font-bold">
                <Music className="w-5 h-5 text-rose-500" />
                <span>أُنْشُودَةُ الْحَرْف (هَيَّا نُغَنِّي 🎵):</span>
              </div>
              <button
                onClick={() => {
                  sound.playFanfare();
                  sound.speakArabic(`${letterInfo.song.verse1} ... ${letterInfo.song.verse2}`);
                }}
                className="bg-rose-500 hover:bg-rose-600 active:scale-95 text-white px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 shadow-sm"
              >
                <Volume2 className="w-4 h-4" />
                <span>غَنِّ مَعِي</span>
              </button>
            </div>
            <div className="bg-white/80 rounded-2xl p-4 text-center space-y-1 text-slate-800 font-kids text-lg sm:text-xl font-bold border border-rose-200/50">
              <p className="text-rose-600">{letterInfo.song.verse1}</p>
              <p className="text-amber-600">{letterInfo.song.verse2}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Letter Shapes & Practice Words (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Letter Forms in Words (منفصل، أول، وسط، آخر) */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-amber-100">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🔍</span>
              <h4 className="font-kids font-black text-base text-slate-800">
                أَشْكَالُ حَرْفِ ({letterInfo.letter}) فِي الْكَلِمَة:
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div 
                onClick={() => sound.speakArabic(`حَرْفُ ${letterInfo.name} مُنْفَصِل: ${letterInfo.forms.isolated}`)}
                className="bg-slate-50 hover:bg-amber-50 p-3 rounded-2xl border border-slate-100 text-center cursor-pointer transition-colors"
              >
                <span className="text-xs text-slate-400 font-bold block mb-1">مُنْفَصِل</span>
                <span className="text-3xl font-black font-kids text-slate-800">{letterInfo.forms.isolated}</span>
              </div>

              <div 
                onClick={() => sound.speakArabic(`حَرْفُ ${letterInfo.name} فِي أَوَّلِ الْكَلِمَة: ${letterInfo.forms.initial}`)}
                className="bg-slate-50 hover:bg-amber-50 p-3 rounded-2xl border border-slate-100 text-center cursor-pointer transition-colors"
              >
                <span className="text-xs text-slate-400 font-bold block mb-1">أَوَّل الْكَلِمَة</span>
                <span className="text-3xl font-black font-kids text-slate-800">{letterInfo.forms.initial}</span>
              </div>

              <div 
                onClick={() => sound.speakArabic(`حَرْفُ ${letterInfo.name} فِي وَسَطِ الْكَلِمَة: ${letterInfo.forms.medial}`)}
                className="bg-slate-50 hover:bg-amber-50 p-3 rounded-2xl border border-slate-100 text-center cursor-pointer transition-colors"
              >
                <span className="text-xs text-slate-400 font-bold block mb-1">وَسَط الْكَلِمَة</span>
                <span className="text-3xl font-black font-kids text-slate-800">{letterInfo.forms.medial}</span>
              </div>

              <div 
                onClick={() => sound.speakArabic(`حَرْفُ ${letterInfo.name} فِي آخِرِ الْكَلِمَة: ${letterInfo.forms.final}`)}
                className="bg-slate-50 hover:bg-amber-50 p-3 rounded-2xl border border-slate-100 text-center cursor-pointer transition-colors"
              >
                <span className="text-xs text-slate-400 font-bold block mb-1">آخِر الْكَلِمَة</span>
                <span className="text-3xl font-black font-kids text-slate-800">{letterInfo.forms.final}</span>
              </div>
            </div>
          </div>

          {/* Practice Words Bank */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-amber-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🌟</span>
                <h4 className="font-kids font-black text-base text-slate-800">
                  كَلِمَاتُ الْحَرْفِ (اقْرَأْ وَاكْسِبْ!):
                </h4>
              </div>
              <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                +١ نجمة
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {letterInfo.practiceWords.map((word) => {
                const isChecked = testedWords[word];
                return (
                  <button
                    key={word}
                    onClick={() => handleTestWord(word)}
                    className={`p-3 rounded-2xl flex items-center justify-between border-2 transition-all ${
                      isChecked
                        ? 'border-emerald-400 bg-emerald-50/60 text-emerald-900'
                        : 'border-slate-100 bg-slate-50 hover:border-amber-300 text-slate-700'
                    }`}
                  >
                    <span className="font-kids font-bold text-lg">{word}</span>
                    {isChecked ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-slate-400 text-center mt-3">
              انْقُرْ عَلَى كُلِّ كَلِمَةٍ لِتَسْمَعَهَا وَتَجْمَعَ النُّجُومَ اللَّامِعَة!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
