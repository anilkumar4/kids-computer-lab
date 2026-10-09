/**
 * Kids Computer Lab — Progress Store
 * localStorage-backed progress manager with versioning,
 * migration support, and graceful fallback.
 * @module store
 */

const STORAGE_KEY = 'kids-computer-lab-progress';
const SCHEMA_VERSION = 1;

/** Default state structure */
function createDefaultState() {
  return {
    version: SCHEMA_VERSION,
    profiles: {
      default: {
        track: null,
        lessons: {},
        badges: [],
        settings: {
          muted: false,
          speechEnabled: true
        }
      }
    },
    activeProfile: 'default'
  };
}

/** Check if localStorage is available */
function isStorageAvailable() {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

class ProgressStore {
  constructor() {
    this._storageAvailable = isStorageAvailable();
    this._state = null;
    this._listeners = new Set();
    this._sessionOnly = false;

    this._load();
  }

  /** Load state from localStorage or create default */
  _load() {
    if (!this._storageAvailable) {
      console.warn('[Store] localStorage unavailable — session-only mode');
      this._sessionOnly = true;
      this._state = createDefaultState();
      return;
    }

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        this._state = createDefaultState();
        this._save();
        return;
      }

      const parsed = JSON.parse(raw);
      this._state = this._migrate(parsed);
      this._save(); // save migrated state
    } catch (err) {
      console.error('[Store] Failed to load progress — resetting:', err);
      this._state = createDefaultState();
      this._save();
    }
  }

  /** Migrate state from older schema versions */
  _migrate(state) {
    if (!state || typeof state !== 'object') {
      return createDefaultState();
    }

    let current = { ...state };

    // Version 0 → 1: add settings and activeProfile
    if (!current.version || current.version < 1) {
      current.version = 1;
      if (!current.profiles) {
        current.profiles = { default: { track: null, lessons: {}, badges: [], settings: { muted: false, speechEnabled: true } } };
      }
      if (!current.activeProfile) {
        current.activeProfile = 'default';
      }
      for (const key of Object.keys(current.profiles)) {
        if (!current.profiles[key].settings) {
          current.profiles[key].settings = { muted: false, speechEnabled: true };
        }
      }
    }

    // Future migrations go here: if (current.version < 2) { ... }

    return current;
  }

  /** Persist state to localStorage */
  _save() {
    if (this._sessionOnly) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._state));
    } catch (err) {
      console.error('[Store] Failed to save progress:', err);
      if (!this._sessionOnly) {
        this._sessionOnly = true;
        this._notify('storage-warning');
      }
    }
  }

  /** Notify all listeners of state changes */
  _notify(event = 'change') {
    for (const listener of this._listeners) {
      try {
        listener(event, this._state);
      } catch (err) {
        console.error('[Store] Listener error:', err);
      }
    }
  }

  /** Subscribe to state changes. Returns unsubscribe function. */
  subscribe(listener) {
    this._listeners.add(listener);
    return () => this._listeners.delete(listener);
  }

  /** Get the active profile data */
  get profile() {
    const id = this._state.activeProfile || 'default';
    return this._state.profiles[id] || this._state.profiles.default;
  }

  /** Whether storage is in session-only mode */
  get isSessionOnly() {
    return this._sessionOnly;
  }

  // --- Lesson Progress ---

  /** Get progress for a specific lesson */
  getLessonProgress(lessonId) {
    return this.profile.lessons[lessonId] || null;
  }

  /** Check if a lesson is completed */
  isLessonCompleted(lessonId) {
    const progress = this.getLessonProgress(lessonId);
    return progress?.completed === true;
  }

  /** Update lesson progress */
  updateLessonProgress(lessonId, data) {
    if (!this.profile.lessons[lessonId]) {
      this.profile.lessons[lessonId] = {
        completed: false,
        stars: 0,
        lastStep: 0,
        quizScore: null,
        timestamp: new Date().toISOString()
      };
    }

    Object.assign(this.profile.lessons[lessonId], data, {
      timestamp: new Date().toISOString()
    });

    this._save();
    this._notify('lesson-progress');
  }

  /** Mark a lesson as completed with a star count */
  completeLesson(lessonId, stars = 1) {
    this.updateLessonProgress(lessonId, {
      completed: true,
      stars: Math.max(stars, this.getLessonProgress(lessonId)?.stars || 0)
    });
    this._notify('lesson-complete');
  }

  /** Get completed lesson count for a track */
  getTrackProgress(track) {
    const lessons = this.profile.lessons;
    const trackPrefix = track === 'explorers' ? 'a' : 'b';
    const completed = Object.entries(lessons)
      .filter(([id, data]) => id.startsWith(trackPrefix) && data.completed)
      .length;
    return completed;
  }

  /** Get the last active lesson for resume */
  getLastLesson() {
    const lessons = this.profile.lessons;
    let latest = null;

    for (const [id, data] of Object.entries(lessons)) {
      if (!latest || new Date(data.timestamp) > new Date(latest.timestamp)) {
        latest = { id, ...data };
      }
    }

    return latest;
  }

  // --- Badges ---

  /** Check if a badge has been earned */
  hasBadge(badgeId) {
    return this.profile.badges.includes(badgeId);
  }

  /** Award a badge */
  awardBadge(badgeId) {
    if (!this.hasBadge(badgeId)) {
      this.profile.badges.push(badgeId);
      this._save();
      this._notify('badge-earned');
      return true;
    }
    return false;
  }

  // --- Settings ---

  /** Get a setting value */
  getSetting(key) {
    return this.profile.settings[key];
  }

  /** Update a setting */
  setSetting(key, value) {
    this.profile.settings[key] = value;
    this._save();
    this._notify('setting-change');
  }

  /** Toggle mute */
  toggleMute() {
    const muted = !this.getSetting('muted');
    this.setSetting('muted', muted);
    return muted;
  }

  // --- Track Selection ---

  /** Set the active track */
  setTrack(track) {
    this.profile.track = track;
    this._save();
    this._notify('track-change');
  }

  // --- Reset ---

  /** Reset all progress with confirmation (must pass true) */
  resetAll(confirmed = false) {
    if (!confirmed) return false;

    this._state = createDefaultState();
    this._save();
    this._notify('reset');
    return true;
  }

  /** Export state for debugging */
  exportState() {
    return JSON.parse(JSON.stringify(this._state));
  }
}

// Singleton instance
const store = new ProgressStore();
export default store;
