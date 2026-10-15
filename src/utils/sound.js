// Subtle synthesized audio feedback using Web Audio API
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
  }

  playBeep(freq, type, duration, gainVal = 0.05) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio not permitted or suspended, ignore gracefully
    }
  }

  pop() {
    this.playBeep(520, 'sine', 0.08, 0.06);
    setTimeout(() => this.playBeep(780, 'sine', 0.12, 0.05), 40);
  }

  remove() {
    this.playBeep(440, 'triangle', 0.06, 0.04);
    setTimeout(() => this.playBeep(330, 'sine', 0.09, 0.04), 40);
  }

  click() {
    this.playBeep(800, 'sine', 0.03, 0.02);
  }

  success() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        setTimeout(() => this.playBeep(freq, 'sine', 0.25, 0.05), idx * 80);
      });
    } catch {
      // Ignore
    }
  }
}

export const sound = new SoundFX();
