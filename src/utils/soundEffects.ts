// Sound effects and Arabic speech synthesis engine for 6-year-old learners

class SoundEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;

  constructor() {
    // Lazy audio context creation on user interaction
  }

  private getContext(): AudioContext | null {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
  }

  public isSoundEnabled(): boolean {
    return this.soundEnabled;
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
      // Audio fallback silent
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

  // Arabic Speech Synthesis
  public speakArabic(text: string, rate: number = 0.85) {
    if (!this.soundEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    try {
      window.speechSynthesis.cancel(); // Stop any pending speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA'; // Arabic
      utterance.rate = rate; // Slightly slower for clear 6-year-old listening
      utterance.pitch = 1.1; // Friendly warm pitch

      // Try finding an Arabic voice
      const voices = window.speechSynthesis.getVoices();
      const arabicVoice = voices.find(v => v.lang.startsWith('ar'));
      if (arabicVoice) {
        utterance.voice = arabicVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      // Fallback
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
