import React, { useState } from 'react';
import { UNITS } from '../data/curriculumData';
import { sound } from '../utils/soundEffects';
import { BookOpen, Volume2, Sparkles, CheckCircle, Music, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

interface StoryReaderProps {
  onEarnRewards: (stars: number, coins: number, xp: number) => void;
}

export const StoryReader: React.FC<StoryReaderProps> = ({ onEarnRewards }) => {
  const [selectedUnitId, setSelectedUnitId] = useState<number>(1);
  const [activeSentenceIdx, setActiveSentenceIdx] = useState<number | null>(null);
  const [completedStories, setCompletedStories] = useState<Record<number, boolean>>({});

  const currentUnit = UNITS.find(u => u.id === selectedUnitId) || UNITS[0];
  const story = currentUnit.story;
  const song = currentUnit.song;

  const handleReadSentence = (sentence: string, idx: number) => {
    setActiveSentenceIdx(idx);
    sound.playPop();
    sound.speakArabic(sentence);
  };

  const handleFinishStory = () => {
    if (!completedStories[selectedUnitId]) {
      setCompletedStories(prev => ({ ...prev, [selectedUnitId]: true }));
      sound.playSuccess();
      sound.speakPraise();
      onEarnRewards(3, 10, 30);
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      sound.playSuccess();
      sound.speakArabic('مُمْتَاز! قَرَأْتَ هَذِهِ الْقِصَّةَ بِإِتْقَان!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Unit Selector */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-amber-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📚</span>
            <h2 className="text-xl font-black font-kids text-slate-800">
              حِكَايَاتٌ وَأَنَاشِيدُ الْمَنْهَجِ الْمُصَوَّرَة
            </h2>
          </div>
          <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
            قِصَصُ الِاسْتِمَاعِ وَالْقَارِئِ الصَّغِير
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {UNITS.map((unit) => (
            <button
              key={unit.id}
              onClick={() => {
                sound.playPop();
                setSelectedUnitId(unit.id);
                setActiveSentenceIdx(null);
                sound.speakArabic(unit.story.title);
              }}
              className={`p-3 rounded-2xl text-right border-2 transition-all ${
                unit.id === selectedUnitId
                  ? 'border-indigo-500 bg-indigo-50/70 shadow-sm ring-2 ring-indigo-200'
                  : 'border-slate-200 bg-slate-50 hover:bg-indigo-50/40 text-slate-700'
              }`}
            >
              <div className="text-2xl mb-1">{unit.badge}</div>
              <div className="font-kids font-bold text-sm text-slate-900">{unit.theme}</div>
              <div className="text-[11px] text-slate-500 truncate">{unit.story.title}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Story Book Interface */}
      <div className="bg-gradient-to-br from-amber-50/80 via-white to-orange-50/80 rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-amber-200">
        {/* Story Header */}
        <div className="text-center pb-6 border-b border-amber-200">
          <div className="text-5xl mb-3 animate-playful">{currentUnit.badge}</div>
          <h3 className="text-2xl sm:text-3xl font-black font-kids text-indigo-900">
            {story.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            الْكَلِمَاتُ الشَّائِعَةُ مُمَيَّزَةٌ بِالْلَوْنِ الْمُلَوَّن: ({story.sightWordsHighlighted.join(' - ')})
          </p>
        </div>

        {/* Story Sentences List with Interactive Audio */}
        <div className="my-6 space-y-3.5 max-w-2xl mx-auto">
          {story.content.map((sentence, idx) => {
            const isActive = activeSentenceIdx === idx;
            return (
              <div
                key={idx}
                onClick={() => handleReadSentence(sentence, idx)}
                className={`p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                  isActive
                    ? 'border-indigo-500 bg-indigo-50 shadow-md scale-102'
                    : 'border-amber-100 bg-white hover:bg-amber-50/60'
                }`}
              >
                <div className="font-kids text-lg sm:text-xl font-bold text-slate-800 leading-relaxed text-right flex-1">
                  {sentence}
                </div>
                <button
                  className={`p-2 rounded-xl shrink-0 ${
                    isActive ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-amber-200'
                  }`}
                  title="استمع للجملة"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Moral / Value of Story */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 max-w-xl mx-auto text-center mb-6">
          <div className="flex items-center justify-center gap-1.5 text-emerald-800 font-kids font-bold text-sm">
            <Star className="w-4 h-4 text-emerald-600 fill-emerald-600" />
            <span>الْقِيمَةُ وَالْهَدَفُ مِنَ الْقِصَّة:</span>
          </div>
          <p className="text-xs sm:text-sm text-emerald-700 mt-1 font-medium">
            {story.moral}
          </p>
        </div>

        {/* Completion Celebration Button */}
        <div className="text-center">
          <button
            onClick={handleFinishStory}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 active:scale-95 text-white font-black font-kids text-base sm:text-lg px-8 py-3 rounded-2xl shadow-lg inline-flex items-center gap-2 transition-all"
          >
            <CheckCircle className="w-5 h-5 text-yellow-300" />
            <span>قَرَأْتُ الْقِصَّةَ كَامِلَةً! (+١٠ 🪙)</span>
          </button>
        </div>
      </div>

      {/* Unit Chants & Songs Section */}
      <div className="bg-gradient-to-r from-rose-50 via-purple-50 to-pink-50 rounded-3xl p-6 border border-rose-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Music className="w-6 h-6 text-rose-500" />
            <h4 className="text-xl font-black font-kids text-slate-800">
              {song.title} 🎵
            </h4>
          </div>
          <button
            onClick={() => {
              sound.playFanfare();
              sound.speakArabic(song.lyrics.join(' ... '));
            }}
            className="bg-rose-500 hover:bg-rose-600 active:scale-95 text-white px-4 py-2 rounded-xl font-bold font-kids text-sm flex items-center gap-1.5 shadow-sm"
          >
            <Volume2 className="w-4 h-4" />
            <span>أَنْشِدْ مَعِي</span>
          </button>
        </div>

        <div className="bg-white/90 rounded-2xl p-5 border border-rose-100 text-center space-y-3 font-kids text-lg sm:text-xl font-bold text-slate-800 shadow-inner">
          {song.lyrics.map((verse, i) => (
            <p key={i} className="text-rose-700">{verse}</p>
          ))}
        </div>
      </div>
    </div>
  );
};
