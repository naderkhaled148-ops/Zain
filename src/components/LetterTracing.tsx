import React, { useRef, useState, useEffect } from 'react';
import { UNITS } from '../data/curriculumData';
import { sound } from '../utils/soundEffects';
import { Eraser, RotateCcw, CheckCircle, Sparkles, Palette, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LetterTracingProps {
  onEarnRewards: (stars: number, coins: number, xp: number) => void;
}

export const LetterTracing: React.FC<LetterTracingProps> = ({ onEarnRewards }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedLetter, setSelectedLetter] = useState<string>('أ');
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [brushColor, setBrushColor] = useState<string>('#EF4444');
  const [brushSize, setBrushSize] = useState<number>(14);
  const [hasDrawn, setHasDrawn] = useState<boolean>(false);
  const [formMode, setFormMode] = useState<'isolated' | 'connected'>('isolated');

  const allLetters = UNITS.flatMap(u => u.letters);

  const colors = [
    { label: 'أحمر', color: '#EF4444' },
    { label: 'أزرق', color: '#3B82F6' },
    { label: 'أخضر', color: '#10B981' },
    { label: 'برتقالي', color: '#F97316' },
    { label: 'بنفسجي', color: '#8B5CF6' },
    { label: 'وردي', color: '#EC4899' },
  ];

  // Draw background guidelines and dotted letter
  const drawBackground = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reset background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // School notebook lines
    const lineY1 = canvas.height * 0.35;
    const lineY2 = canvas.height * 0.65;
    const lineBaseline = canvas.height * 0.72;

    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 6]);

    ctx.beginPath();
    ctx.moveTo(30, lineY1);
    ctx.lineTo(canvas.width - 30, lineY1);
    ctx.moveTo(30, lineY2);
    ctx.lineTo(canvas.width - 30, lineY2);
    ctx.stroke();

    // Baseline (solid warm line for kids)
    ctx.strokeStyle = '#FCD34D';
    ctx.lineWidth = 3;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(20, lineBaseline);
    ctx.lineTo(canvas.width - 20, lineBaseline);
    ctx.stroke();

    // Dotted guide letter
    ctx.save();
    ctx.fillStyle = '#CBD5E1';
    ctx.font = 'bold 240px "Tajawal", "Marhey", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(selectedLetter, canvas.width / 2, canvas.height / 2);

    // Green start dot to guide 6-year-old child where to begin writing!
    ctx.fillStyle = '#10B981';
    ctx.beginPath();
    ctx.arc(canvas.width / 2 + 50, canvas.height * 0.28, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('ابدأ', canvas.width / 2 + 50, canvas.height * 0.28);

    ctx.restore();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 640;
      canvas.height = 380;
      drawBackground();
      setHasDrawn(false);
    }
  }, [selectedLetter, formMode]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawn(true);

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    sound.playPop();
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    sound.playPop();
    drawBackground();
    setHasDrawn(false);
  };

  const handleCheckDrawing = () => {
    if (!hasDrawn) {
      sound.speakArabic('اكْتُبِ الْحَرْفَ أَوَّلًا يَا شُجَاع!');
      return;
    }
    sound.playSuccess();
    sound.speakArabic('مَا شَاءَ الله! خَطُّكَ رَائِعٌ وَجَمِيلٌ يَا بَطَل!');
    onEarnRewards(2, 5, 25);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-6">
      {/* Intro Bar */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-amber-100 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✍️</span>
            <h2 className="text-xl font-black font-kids text-slate-800">
              سَبُّورَةُ الْكِتَابَةِ وَخَطِّي الْجَمِيل
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            تَتَبَّعِ النُّقَاطَ بِالْقَلَمِ مِنَ النُّقْطَةِ الْخَضْرَاءِ «ابْدَأْ» وَاكْتُبِ الْحَرْفَ بِاتِّجَاهِهِ الصَّحِيحِ.
          </p>
        </div>

        {/* Letter Audio Help */}
        <button
          onClick={() => sound.speakArabic(`حَرْفُ ${selectedLetter}`)}
          className="flex items-center gap-2 bg-amber-100 hover:bg-amber-200 active:scale-95 text-amber-900 px-4 py-2 rounded-2xl font-bold font-kids text-sm transition-all"
        >
          <Volume2 className="w-5 h-5 text-amber-700" />
          <span>انْطِقِ الْحَرْف ({selectedLetter})</span>
        </button>
      </div>

      {/* Letter Carousel Selector */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-3 sm:p-4 border border-amber-200/80">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {allLetters.slice(0, 15).map((char) => (
            <button
              key={char}
              onClick={() => {
                sound.playPop();
                setSelectedLetter(char);
              }}
              className={`w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center font-kids text-2xl font-black transition-all ${
                char === selectedLetter
                  ? 'bg-amber-500 text-white shadow-md scale-110 ring-2 ring-white'
                  : 'bg-white hover:bg-amber-100 text-slate-800 border border-amber-100'
              }`}
            >
              {char}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Tracing Canvas Card */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-amber-100">
        {/* Drawing Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-100">
          {/* Colors */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 hidden sm:inline">أَلْوَانُ الْقَلَم:</span>
            <div className="flex items-center gap-1.5">
              {colors.map((c) => (
                <button
                  key={c.color}
                  onClick={() => {
                    sound.playPop();
                    setBrushColor(c.color);
                  }}
                  className={`w-8 h-8 rounded-full transition-transform ${
                    brushColor === c.color ? 'scale-125 ring-2 ring-offset-2 ring-slate-400' : 'hover:scale-110'
                  }`}
                  style={{ backgroundColor: c.color }}
                  title={c.label}
                />
              ))}
            </div>
          </div>

          {/* Stroke Widths & Clear */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => {
                sound.playPop();
                setBrushSize(8);
              }}
              className={`px-2.5 py-1 text-xs rounded-xl font-bold ${brushSize === 8 ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-700'}`}
            >
              دَقِيق
            </button>
            <button
              onClick={() => {
                sound.playPop();
                setBrushSize(16);
              }}
              className={`px-2.5 py-1 text-xs rounded-xl font-bold ${brushSize === 16 ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-700'}`}
            >
              عَرِيض
            </button>
            <button
              onClick={handleClear}
              className="flex items-center gap-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl font-bold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>مَسْح</span>
            </button>
          </div>
        </div>

        {/* The HTML5 Canvas Stage */}
        <div className="relative w-full overflow-hidden rounded-2xl border-4 border-amber-200 shadow-inner bg-white flex items-center justify-center touch-none">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full h-auto max-h-[380px] cursor-crosshair"
          />
        </div>

        {/* Praise & Submission Bar */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 font-medium">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>اكْتُبْ بِخَطٍّ جَمِيلٍ ثُمَّ اضْغَطْ لِتَحْصُلَ عَلَى الْمُكَافَأَة!</span>
          </div>

          <button
            onClick={handleCheckDrawing}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 active:scale-95 text-white font-black font-kids text-base px-6 py-2.5 rounded-2xl shadow-md flex items-center gap-2 transition-all"
          >
            <CheckCircle className="w-5 h-5" />
            <span>خَطِّي جَمِيل! (+٥ 🪙)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
