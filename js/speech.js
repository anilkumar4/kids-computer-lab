/**
 * Kids Computer Lab — Speech Module
 * Text-to-speech feature detection and control.
 * Progressive enhancement — lessons work without speech.
 * @module speech
 */

class SpeechController {
  constructor() {
    this._supported = 'speechSynthesis' in window;
    this._speaking = false;
    this._muted = false;
    this._currentUtterance = null;
  }

  /** Whether speech synthesis is supported */
  get isSupported() {
    return this._supported;
  }

  /** Whether speech is currently playing */
  get isSpeaking() {
    return this._speaking;
  }

  /** Set mute state */
  set muted(value) {
    this._muted = value;
    if (value) this.stop();
  }

  get muted() {
    return this._muted;
  }

  /**
   * Speak text aloud.
   * @param {string} text - The text to speak
   * @param {Object} [options] - Speech options
   * @param {string} [options.lang='en-US'] - Language code
   * @param {number} [options.rate=0.9] - Speech rate (0.1-10)
   * @param {number} [options.pitch=1.1] - Pitch (0-2)
   * @param {Function} [options.onEnd] - Callback when speech ends
   * @returns {boolean} Whether speech started successfully
   */
  speak(text, options = {}) {
    if (!this._supported || this._muted || !text) {
      return false;
    }

    // Stop any current speech
    this.stop();

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = options.lang || 'en-US';
      // Slow it down and make it more enthusiastic for kids
      utterance.rate = options.rate || 0.85; 
      utterance.pitch = options.pitch || 1.3;

      // Try to find a friendly female voice (often sounds better to kids)
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        // Look for Google voices first, they are usually high quality
        let bestVoice = voices.find(v => v.name.includes('Google UK English Female') || v.name.includes('Google US English'));
        // Fallback to any female voice or natural voice
        if (!bestVoice) bestVoice = voices.find(v => (v.name.includes('Female') || v.name.includes('Natural')) && v.lang.startsWith('en'));
        // Fallback to first English voice
        if (!bestVoice) bestVoice = voices.find(v => v.lang.startsWith('en'));
        
        if (bestVoice) {
          utterance.voice = bestVoice;
        }
      }

      utterance.onstart = () => {
        this._speaking = true;
      };

      utterance.onend = () => {
        this._speaking = false;
        this._currentUtterance = null;
        if (options.onEnd) options.onEnd();
      };

      utterance.onerror = (event) => {
        // 'interrupted' and 'canceled' are expected when stopping
        if (event.error !== 'interrupted' && event.error !== 'canceled') {
          console.warn('[Speech] Error:', event.error);
        }
        this._speaking = false;
        this._currentUtterance = null;
      };

      this._currentUtterance = utterance;
      speechSynthesis.speak(utterance);
      return true;
    } catch (err) {
      console.warn('[Speech] Failed to speak:', err);
      this._speaking = false;
      return false;
    }
  }

  /** Stop any current speech */
  stop() {
    if (!this._supported) return;

    try {
      speechSynthesis.cancel();
    } catch {
      // Silently fail
    }
    this._speaking = false;
    this._currentUtterance = null;
  }

  /** Get available voices for a language */
  getVoices(lang = 'en') {
    if (!this._supported) return [];

    try {
      return speechSynthesis.getVoices()
        .filter(v => v.lang.startsWith(lang));
    } catch {
      return [];
    }
  }

  /** Check if Hindi voice is available */
  get hasHindiVoice() {
    return this.getVoices('hi').length > 0;
  }
}

const speech = new SpeechController();
export default speech;
