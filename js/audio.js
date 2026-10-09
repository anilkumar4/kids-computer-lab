/**
 * Kids Computer Lab — Audio Module
 * Web Audio API sound effects with global mute control.
 * All sounds triggered by user gesture only.
 * @module audio
 */

class AudioController {
  constructor() {
    this._context = null;
    this._muted = false;
    this._initialized = false;
  }

  /** Lazy-init AudioContext (must happen after user gesture) */
  _init() {
    if (this._initialized) return true;
    try {
      this._context = new (window.AudioContext || window.webkitAudioContext)();
      this._initialized = true;
      return true;
    } catch (err) {
      console.warn('[Audio] Web Audio API unavailable:', err);
      return false;
    }
  }

  /** Resume context if suspended (required by autoplay policy) */
  async _resume() {
    if (this._context?.state === 'suspended') {
      try {
        await this._context.resume();
      } catch {
        // Silently fail
      }
    }
  }

  /** Set mute state */
  set muted(value) {
    this._muted = value;
  }

  get muted() {
    return this._muted;
  }

  /**
   * Play a synthesized tone.
   * @param {number} frequency - Hz
   * @param {number} duration - seconds
   * @param {string} type - 'sine', 'square', 'triangle', 'sawtooth'
   * @param {number} volume - 0.0 to 1.0
   */
  playTone(frequency = 440, duration = 0.15, type = 'sine', volume = 0.3) {
    if (this._muted || !this._init()) return;
    this._resume();

    const ctx = this._context;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.value = frequency;
    gain.gain.value = volume;

    // Quick fade out to avoid clicks
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  }

  /** Play a happy "correct answer" sound */
  playCorrect() {
    if (this._muted || !this._init()) return;
    this.playTone(523, 0.12, 'sine', 0.25);   // C5
    setTimeout(() => this.playTone(659, 0.12, 'sine', 0.25), 120);  // E5
    setTimeout(() => this.playTone(784, 0.2, 'sine', 0.25), 240);   // G5
  }

  /** Play a gentle "try again" sound */
  playIncorrect() {
    if (this._muted || !this._init()) return;
    this.playTone(330, 0.15, 'triangle', 0.2);  // E4
    setTimeout(() => this.playTone(262, 0.2, 'triangle', 0.2), 150);  // C4
  }

  /** Play a click / tap sound */
  playClick() {
    if (this._muted || !this._init()) return;
    this.playTone(800, 0.05, 'sine', 0.15);
  }

  /** Play a star earned celebration sound */
  playStar() {
    if (this._muted || !this._init()) return;
    this.playTone(587, 0.1, 'sine', 0.2);   // D5
    setTimeout(() => this.playTone(740, 0.1, 'sine', 0.2), 100);  // F#5
    setTimeout(() => this.playTone(880, 0.15, 'sine', 0.2), 200); // A5
    setTimeout(() => this.playTone(1175, 0.25, 'sine', 0.2), 300); // D6
  }

  /** Play a lesson complete fanfare */
  playComplete() {
    if (this._muted || !this._init()) return;
    const notes = [523, 587, 659, 784, 880, 1047]; // C5 scale up
    notes.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.15, 'sine', 0.2), i * 100);
    });
  }

  /** Play a navigation / transition sound */
  playNav() {
    if (this._muted || !this._init()) return;
    this.playTone(600, 0.08, 'sine', 0.1);
  }

  /** Play a badge earned sound */
  playBadge() {
    if (this._muted || !this._init()) return;
    this.playTone(440, 0.1, 'sine', 0.25);
    setTimeout(() => this.playTone(554, 0.1, 'sine', 0.25), 100);
    setTimeout(() => this.playTone(659, 0.1, 'sine', 0.25), 200);
    setTimeout(() => this.playTone(880, 0.3, 'sine', 0.25), 300);
  }
}

const audio = new AudioController();
export default audio;
