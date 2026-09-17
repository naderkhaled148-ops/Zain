// Sound effects and Arabic speech synthesis engine for 6-year-old learners

class SoundEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private currentAudio: HTMLAudioElement | null = null;
  private activeUtterance: SpeechSynthesisUtterance | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private audioCache = new Map<string, string>();
  private isAudioUnlocked: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      // Pre-load speech synthesis voices
      this.initSpeechVoices();

      // Listen for first user gesture to unlock audio
      const unlock = () => {
        this.unlockAudio();
        window.removeEventListener('click', unlock);
        window.removeEventListener('touchstart', unlock);
        window.removeEventListener('keydown', unlock);
      };
      window.addEventListener('click', unlock, { passive: true });
      window.addEventListener('touchstart', unlock, { passive: true });
      window.addEventListener('keydown', unlock, { passive: true });
    }
  }

  private initSpeechVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const loadVoices = () => {
      try {
        const list = window.speechSynthesis.getVoices();
        if (list && list.length > 0) {
          this.voices = list;
        }
      } catch {
        // Ignore
      }
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  public unlockAudio() {
    if (this.isAudioUnlocked) return;
    this.isAudioUnlocked = true;

    try {
      const ctx = this.getContext();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
    } catch {
      // Ignore
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      } catch {
        // Ignore
      }
    }
  }

  private getContext(): AudioContext | null {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
    if (!enabled) {
      this.stopCurrentSpeech();
    }
  }

  public isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  public stopCurrentSpeech() {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch {
        // Ignore
      }
      this.currentAudio = null;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore
      }
      this.activeUtterance = null;
    }
  }

  // Clean text: strip emojis, symbols, and excess punctuation for speech engines
  public cleanText(raw: string): string {
    if (!raw) return '';
    return raw
      .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/gu, ' ')
      .replace(/[«»"'“”„{}()[\]#@]/g, ' ')
      .replace(/\.{2,}/g, '، ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Play a soft pleasant pop sound
  public playPop() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(750, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // Fallback silent
    }
  }

  // Play a rewarding chime when answering correctly
  public playSuccess() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.26);
      });
    } catch {
      // Ignore
    }
  }

  // Play star pickup twinkle
  public playStar() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const notes = [659.25, 880, 1174.66];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);

        gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.2);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.06);
        osc.stop(ctx.currentTime + idx * 0.06 + 0.22);
      });
    } catch {
      // Ignore
    }
  }

  // Gentle reminder sound
  public playTryAgain() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(240, ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } catch {
      // Ignore
    }
  }

  // Grand celebration fanfare
  public playFanfare() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const chord = [523.25, 659.25, 783.99, 1046.5];
      chord.forEach((f) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, ctx.currentTime);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.85);
      });
    } catch {
      // Ignore
    }
  }

  // Multi-tier Arabic Speech:
  // Tier 1: High-fidelity natural voice via server audio endpoint (/api/tts)
  // Tier 2: Web Speech Synthesis API with proper Arabic voice fallback
  public speakArabic(text: string, rate: number = 0.9) {
    if (!this.soundEnabled) return;
    const cleaned = this.cleanText(text);
    if (!cleaned) return;

    this.stopCurrentSpeech();

    // Tier 1: Try audio stream from local server
    try {
      const audioUrl = `/api/tts?text=${encodeURIComponent(cleaned)}`;
      const audio = new Audio(audioUrl);
      this.currentAudio = audio;

      audio.onended = () => {
        if (this.currentAudio === audio) {
          this.currentAudio = null;
        }
      };

      audio.onerror = () => {
        // If server audio fails, immediately fall back to client speech synthesis
        if (this.currentAudio === audio) {
          this.currentAudio = null;
          this.speakWithSpeechSynthesis(cleaned, rate);
        }
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Play was prevented (e.g. autoplay restriction or network failure)
          this.speakWithSpeechSynthesis(cleaned, rate);
        });
      }
    } catch {
      this.speakWithSpeechSynthesis(cleaned, rate);
    }
  }

  // Tier 2 Fallback: Web Speech Synthesis
  private speakWithSpeechSynthesis(text: string, rate: number = 0.85) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = rate;
      utterance.pitch = 1.05;

      // Select Arabic voice if available
      const voices = this.voices.length > 0 ? this.voices : window.speechSynthesis.getVoices();
      const arabicVoice =
        voices.find((v) => v.lang.startsWith('ar-SA')) ||
        voices.find((v) => v.lang.startsWith('ar-EG')) ||
        voices.find((v) => v.lang.startsWith('ar'));

      if (arabicVoice) {
        utterance.voice = arabicVoice;
      }

      // Keep instance reference to avoid Chrome garbage-collection drop bug
      this.activeUtterance = utterance;

      utterance.onend = () => {
        this.activeUtterance = null;
      };

      utterance.onerror = () => {
        this.activeUtterance = null;
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      // Silent fail
    }
  }

  public speakPraise() {
    const praises = [
      'أَحْسَنْتَ يَا بَطَل!',
      'مُمْتَازٌ جِدًّا!',
      'عَبْقَرِيٌّ صَغِير!',
      'إِجَابَةٌ رَائِعَةٌ وَصَحِيحَة!',
      'مَا شَاءَ الله.. أَنْتَ ذَكِيٌّ جِدًّا!'
    ];
    const chosen = praises[Math.floor(Math.random() * praises.length)];
    this.playSuccess();
    this.speakArabic(chosen);
  }

  public speakEncouragement() {
    const encourages = [
      'حَاوِلْ مَرَّةً أُخْرَى يَا شُجَاع!',
      'قَرِيبٌ جِدًّا.. فَكِّرْ مَرَّةً ثَانِيَة!',
      'أَنْتَ تَسْتَطِيع، جَرِّبْ مَجَدَّدًا!'
    ];
    const chosen = encourages[Math.floor(Math.random() * encourages.length)];
    this.playTryAgain();
    this.speakArabic(chosen);
  }
}

export const sound = new SoundEngine();
