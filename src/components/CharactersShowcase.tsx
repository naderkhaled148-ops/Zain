import React, { useState } from 'react';
import { EducationalCharacter } from '../types';
import { EDUCATIONAL_CHARACTERS } from '../data/charactersData';
import { sound } from '../utils/soundEffects';
import { Volume2, Sparkles, MessageCircle, Star, Award, Heart, CheckCircle2 } from 'lucide-react';

interface CharactersShowcaseProps {
  selectedCharacterId: string;
  onSelectCharacter: (charId: string) => void;
}

export const CharactersShowcase: React.FC<CharactersShowcaseProps> = ({
  selectedCharacterId,
  onSelectCharacter
}) => {
  const activeChar = EDUCATIONAL_CHARACTERS.find(c => c.id === selectedCharacterId) || EDUCATIONAL_CHARACTERS[0];
  const [adviceIndex, setAdviceIndex] = useState<number>(0);

  const handleNextAdvice = () => {
    sound.playPop();
    setAdviceIndex(prev => (prev + 1) % activeChar.advice.length);
    const nextAdvice = activeChar.advice[(adviceIndex + 1) % activeChar.advice.length];
    sound.speakArabic(nextAdvice);
  };

  return (
    <div className="space-y-6">
      {/* Banner / Intro */}
      <div className="bg-gradient-to-r from-amber-400 via-pink-400 to-indigo-500 rounded-3xl p-6 sm:p-8 text-white shadow-md border-2 border-white/40">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-black bg-white/30 px-3 py-1 rounded-full backdrop-blur-xs">
              أَصْدِقَاءُ التَّعَلُّمِ الْأَوْفِيَاء
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-kids mt-1">
              شَخْصِيَّاتُ مُغَامَرَاتِ الصَّفِّ الْأَوَّل
            </h2>
            <p className="text-xs sm:text-sm text-white/90 font-medium mt-1 max-w-xl leading-relaxed">
              تَعَرَّفْ عَلَى أَبْطَالِنَا الأَرْبَعَةِ! كُلُّ شَخْصِيَّةٍ تُرَافِقُكَ فِي مَادَّةٍ أَوْ مَهَارَةٍ، انْقُرْ عَلَى صَدِيقِكَ لِتَسْمَعَ صَوْتَهُ وَنَصَائِحَهُ الذَّهَبِيَّة!
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/30">
            <span className="text-3xl animate-bounce">{activeChar.avatar}</span>
            <div>
              <div className="text-[11px] text-yellow-200 font-bold">صَدِيقُكَ الْحَالِيّ</div>
              <div className="font-kids font-black text-sm text-white">{activeChar.name}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Characters Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {EDUCATIONAL_CHARACTERS.map((char) => {
          const isSelected = char.id === activeChar.id;

          return (
            <div
              key={char.id}
              onClick={() => {
                sound.playPop();
                sound.speakArabic(char.greetingVoice);
                onSelectCharacter(char.id);
                setAdviceIndex(0);
              }}
              className={`rounded-3xl p-5 cursor-pointer transition-all duration-300 relative border-3 flex flex-col justify-between ${
                isSelected
                  ? 'bg-white shadow-xl scale-102 border-amber-400 ring-4 ring-amber-200'
                  : 'bg-white/80 hover:bg-white hover:shadow-md border-slate-200'
              }`}
            >
              {/* Top Role Badge */}
              <div>
                <div className="flex items-center justify-between gap-1 mb-3">
                  <span className="text-xs font-black font-kids px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700">
                    {char.specialtyBadge}
                  </span>
                  {isSelected && (
                    <span className="text-emerald-500 bg-emerald-50 p-1 rounded-full">
                      <CheckCircle2 className="w-5 h-5 fill-emerald-100" />
                    </span>
                  )}
                </div>

                {/* Avatar & Name */}
                <div className="text-center my-2">
                  <div 
                    className={`w-24 h-24 mx-auto rounded-3xl flex items-center justify-center text-6xl shadow-md border-4 transition-transform hover:scale-110 bg-gradient-to-br ${char.bgGradient} ${char.borderColor}`}
                  >
                    <span className="drop-shadow-md">{char.avatar}</span>
                  </div>

                  <h3 className="font-kids font-black text-lg text-slate-800 mt-3">
                    {char.name}
                  </h3>

                  <div className="text-xs font-bold text-amber-600 mt-0.5">
                    {char.role}
                  </div>
                </div>

                {/* Catchphrase quote */}
                <div className="bg-amber-50/70 border border-amber-100 rounded-2xl p-2.5 my-3 text-center">
                  <p className="text-xs font-medium text-slate-600 italic">
                    «{char.catchphrase}»
                  </p>
                </div>
              </div>

              {/* Action listen button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  sound.playPop();
                  sound.speakArabic(char.greetingVoice);
                  onSelectCharacter(char.id);
                }}
                className="w-full mt-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:scale-95 text-white font-kids font-bold text-xs py-2 px-3 rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all"
              >
                <Volume2 className="w-4 h-4" />
                <span>اسْتَمِعْ لِلتَّحِيَّةِ 🔊</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Selected Character Deep-Dive Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-amber-200">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Large Avatar */}
          <div className={`w-28 h-28 sm:w-36 sm:h-36 rounded-3xl flex items-center justify-center text-7xl sm:text-8xl shadow-lg border-4 bg-gradient-to-br ${activeChar.bgGradient} ${activeChar.borderColor} shrink-0 animate-playful`}>
            <span>{activeChar.avatar}</span>
          </div>

          {/* Details & Live Talking Box */}
          <div className="flex-1 text-center md:text-right space-y-3">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="text-xs font-black font-kids bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
                {activeChar.subject}
              </span>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                {activeChar.role}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black font-kids text-slate-800">
              صَدِيقُكَ المُفَضَّل: {activeChar.name}
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              {activeChar.personality}
            </p>

            {/* Talking Balloon with sound */}
            <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-4 relative text-right flex items-start gap-3 shadow-xs">
              <MessageCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="text-xs font-bold text-amber-700 mb-1">
                  💡 نَصِيحَةُ {activeChar.name.split(' ')[0]} الذَّهَبِيَّة ({adviceIndex + 1} مِنْ {activeChar.advice.length}):
                </div>
                <div className="text-base font-kids font-bold text-slate-800">
                  «{activeChar.advice[adviceIndex]}»
                </div>
              </div>

              <div className="flex flex-col gap-1 shrink-0">
                <button
                  onClick={() => sound.speakArabic(activeChar.advice[adviceIndex])}
                  className="bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-xl text-xs font-bold shadow-xs transition-all"
                  title="استمع للنصيحة"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextAdvice}
                  className="bg-white hover:bg-amber-100 text-amber-800 border border-amber-300 p-2 rounded-xl text-xs font-bold shadow-xs transition-all"
                  title="نصيحة أخرى"
                >
                  نَصِيحَةٌ أُخْرَى 🔄
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
