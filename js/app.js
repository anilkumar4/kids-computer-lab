/**
 * Kids Computer Lab — Main Application
 * Initializes the router, store, and wire up the UI views.
 * @module app
 */

import router from './router.js';
import store from './store.js';
import audio from './audio.js';
import speech from './speech.js';
import { createBoltSVG } from './ui/mascot.js';
import LessonRenderer from './lessons/renderer.js';

// --- State ---
let lessonIndex = null;

// --- DOM Elements ---
const DOM = {
  app: document.getElementById('app-content'),
  homeView: document.getElementById('view-home'),
  trackView: document.getElementById('view-track'),
  lessonView: document.getElementById('view-lesson'),
  grownupsView: document.getElementById('view-grownups'),
  navBack: document.getElementById('nav-back'),
  soundToggle: document.getElementById('sound-toggle'),
  toast: document.getElementById('toast'),
  resumeBanner: document.getElementById('resume-banner')
};

const lessonRenderer = new LessonRenderer(DOM.lessonView);

// --- Initialization ---
async function init() {
  console.log('🚀 Kids Computer Lab initializing...');
  
  // Load lesson index
  try {
    const res = await fetch('./data/lesson-index.json');
    lessonIndex = await res.json();
  } catch (err) {
    console.error('Failed to load lesson index:', err);
    showToast('Failed to load lessons. Please refresh.');
    return;
  }

  // Setup UI controls
  setupControls();

  // Setup Routes
  setupRoutes();

  // Initial navigation
  if (!window.location.hash) {
    router.navigate('/home');
  } else {
    router.refresh();
  }

  // Handle first user gesture to unlock audio
  document.body.addEventListener('click', () => {
    // Just a dummy call to ensure audio context is allowed to init
    if (!audio._initialized) {
      audio._init();
    }
  }, { once: true });
}

function setupControls() {
  // Sound Toggle
  if (DOM.soundToggle) {
    const updateSoundIcon = () => {
      const isMuted = store.getSetting('muted');
      DOM.soundToggle.innerHTML = isMuted ? '🔇' : '🔊';
      DOM.soundToggle.classList.toggle('sound-toggle--muted', isMuted);
      DOM.soundToggle.setAttribute('aria-label', isMuted ? 'Turn sound on' : 'Turn sound off');
    };
    
    updateSoundIcon();
    
    DOM.soundToggle.addEventListener('click', () => {
      const isMuted = store.toggleMute();
      audio.muted = isMuted;
      speech.muted = isMuted;
      updateSoundIcon();
      
      // Stop speech immediately if muted
      if (isMuted) speech.stop();
      
      // Only play click if we just turned it ON
      if (!isMuted) audio.playClick();
    });
  }

  // Global back button
  if (DOM.navBack) {
    DOM.navBack.addEventListener('click', (e) => {
      e.preventDefault();
      audio.playClick();
      // Simple logic: if in a lesson, go to track. If in track/grownups, go home.
      const hash = window.location.hash;
      if (hash.startsWith('#/lesson/')) {
        const track = store.profile.track || 'explorers';
        router.navigate(`/${track}`);
      } else {
        router.navigate('/home');
      }
    });
  }
}

// --- View Management ---

function hideAllViews() {
  DOM.homeView.classList.remove('view--active');
  DOM.trackView.classList.remove('view--active');
  DOM.lessonView.classList.remove('view--active');
  DOM.grownupsView.classList.remove('view--active');
  speech.stop(); // Stop talking on view change
}

function updateNav(showBack) {
  if (DOM.navBack) {
    DOM.navBack.style.display = showBack ? 'flex' : 'none';
  }
}

function showToast(message, duration = 3000) {
  if (!DOM.toast) return;
  DOM.toast.textContent = message;
  DOM.toast.classList.add('toast--visible');
  setTimeout(() => {
    DOM.toast.classList.remove('toast--visible');
  }, duration);
}

// --- Routing ---

function setupRoutes() {
  router
    .beforeEach((path) => {
      hideAllViews();
    })
    .on('/home', renderHome)
    .on('/explorers', () => renderTrack('explorers'))
    .on('/champions', () => renderTrack('champions'))
    .on('/lesson/:id', (params) => renderLesson(params.id))
    .on('/grownups', renderGrownups)
    .notFound(() => {
      console.warn('Route not found, redirecting to home');
      router.navigate('/home');
    });
}

function renderHome() {
  DOM.homeView.classList.add('view--active');
  updateNav(false);
  
  // Render hero mascot
  const heroMascot = document.getElementById('hero-mascot');
  if (heroMascot && !heroMascot.hasChildNodes()) {
    heroMascot.innerHTML = createBoltSVG('wave', 180);
    heroMascot.style.cursor = 'pointer';
    heroMascot.title = "Click me!";
    heroMascot.onclick = () => {
      audio.playStar();
      speech.speak("Welcome to the Kids Computer Lab! Pick a track below to start learning!");
      heroMascot.style.animation = 'none';
      setTimeout(() => heroMascot.style.animation = 'pop-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)', 10);
    };
  }

  // Handle Track Selection
  const btnExplorers = document.getElementById('btn-explorers');
  const btnChampions = document.getElementById('btn-champions');

  if (btnExplorers) {
    btnExplorers.onclick = () => {
      audio.playClick();
      store.setTrack('explorers');
      router.navigate('/explorers');
    };
  }
  
  if (btnChampions) {
    btnChampions.onclick = () => {
      audio.playClick();
      store.setTrack('champions');
      router.navigate('/champions');
    };
  }

  // Update Resume Banner
  if (DOM.resumeBanner) {
    const lastLesson = store.getLastLesson();
    if (lastLesson && !lastLesson.completed) {
      // Find track info
      let trackObj = null;
      let lessonTitle = "Resume Lesson";
      for (const key in lessonIndex.tracks) {
        const found = lessonIndex.tracks[key].lessons.find(l => l.id === lastLesson.id);
        if (found) {
          trackObj = lessonIndex.tracks[key];
          lessonTitle = found.title;
          break;
        }
      }

      if (trackObj) {
        DOM.resumeBanner.style.display = 'flex';
        DOM.resumeBanner.querySelector('.resume-banner__lesson').textContent = `${trackObj.title}: ${lessonTitle}`;
        DOM.resumeBanner.onclick = () => {
          audio.playClick();
          router.navigate(`/lesson/${lastLesson.id}`);
        };
      } else {
        DOM.resumeBanner.style.display = 'none';
      }
    } else {
      DOM.resumeBanner.style.display = 'none';
    }
  }
}

function renderTrack(trackId) {
  DOM.trackView.classList.add('view--active');
  updateNav(true);
  
  const trackData = lessonIndex.tracks[trackId];
  if (!trackData) {
    router.navigate('/home');
    return;
  }

  // Setup Track Header
  const header = document.getElementById('track-header');
  header.className = `track-header track-header--${trackId}`;
  
  const icon = trackId === 'explorers' ? '⭐' : '🏆';
  header.innerHTML = `
    <div class="track-header__icon" style="font-size: 40px; display:flex; align-items:center; justify-content:center; background:var(--color-bg-card); border-radius:var(--radius-full); box-shadow:var(--shadow-sm); margin:0 auto var(--space-4); width:80px; height:80px;">
      ${icon}
    </div>
    <h1 class="track-header__title">${trackData.title}</h1>
    <p class="track-header__desc">${trackData.description}</p>
  `;

  // Render Lesson List
  const list = document.getElementById('lesson-list');
  list.innerHTML = '';

  let completedCount = 0;

  trackData.lessons.forEach((lesson, index) => {
    const progress = store.getLessonProgress(lesson.id);
    const isCompleted = progress?.completed;
    if (isCompleted) completedCount++;

    const item = document.createElement('div');
    item.className = `lesson-item animate-slide-up ${isCompleted ? 'lesson-item--completed' : ''}`;
    item.style.animationDelay = `${index * 0.05}s`;
    
    // Disable if planned
    if (lesson.status === 'planned') {
      item.style.opacity = '0.6';
      item.style.cursor = 'not-allowed';
      item.title = 'Coming soon!';
    } else {
      item.onclick = () => {
        audio.playClick();
        router.navigate(`/lesson/${lesson.id}`);
      };
    }

    item.innerHTML = `
      <div class="lesson-item__number">${index + 1}</div>
      <div class="lesson-item__info">
        <div class="lesson-item__title">${escapeHtml(lesson.title)}</div>
        <div class="lesson-item__summary">${escapeHtml(lesson.summary)}</div>
      </div>
      <div class="lesson-item__stars">
        ${Array(3).fill(0).map((_, i) => `
          <svg class="lesson-item__star ${i < (progress?.stars || 0) ? '' : 'lesson-item__star--empty'}" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
        `).join('')}
      </div>
    `;

    list.appendChild(item);
  });

  // Update Progress Bar
  const progFill = document.getElementById('track-progress-fill');
  const progText = document.getElementById('track-progress-text');
  if (progFill && progText) {
    const pct = trackData.lessons.length > 0 ? (completedCount / trackData.lessons.length) * 100 : 0;
    progFill.style.width = `${pct}%`;
    progText.textContent = `${completedCount} / ${trackData.lessons.length}`;
    
    // Certificate Button if 100%
    if (completedCount === trackData.lessons.length && trackData.lessons.length > 0) {
      const certBtn = document.createElement('button');
      certBtn.className = 'btn btn--primary animate-pop-in';
      certBtn.style.cssText = 'margin: var(--space-4) auto 0; display: block;';
      certBtn.innerHTML = '🖨️ Print My Certificate!';
      certBtn.onclick = () => {
        audio.playStar();
        const certTrackName = document.getElementById('cert-track-name');
        if (certTrackName) {
          certTrackName.textContent = `The ${trackData.title} Track`;
        }
        setTimeout(() => window.print(), 500);
      };
      
      // Append to progress area
      const progressContainer = document.querySelector('.track-progress').parentNode;
      progressContainer.insertBefore(certBtn, list);
    }
  }
}

async function renderLesson(lessonId) {
  DOM.lessonView.classList.add('view--active');
  updateNav(true);
  
  DOM.lessonView.innerHTML = `
    <div class="spinner"></div>
    <div style="text-align:center; color:var(--color-text-muted);">Loading lesson...</div>
  `;

  try {
    const res = await fetch(`./data/lessons/${lessonId}.json`);
    if (!res.ok) throw new Error('Network response was not ok');
    const lessonData = await res.json();
    
    // Make sure we have the renderer
    DOM.lessonView.innerHTML = '';
    
    // Find where we left off
    const progress = store.getLessonProgress(lessonId);
    const startStep = (!progress?.completed && progress?.lastStep) ? progress.lastStep : 0;

    lessonRenderer.render(lessonData, startStep);
  } catch (err) {
    console.error('Failed to load lesson data:', err);
    DOM.lessonView.innerHTML = `
      <div class="empty-state">
        <div style="font-size: 48px; margin-bottom: 16px;">🚧</div>
        <h3>Lesson Not Found</h3>
        <p>We couldn't load this lesson right now.</p>
        <button class="btn btn--primary" style="margin-top: 24px;" onclick="window.history.back()">Go Back</button>
      </div>
    `;
  }
}

function renderGrownups() {
  DOM.grownupsView.classList.add('view--active');
  updateNav(true);
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Start
document.addEventListener('DOMContentLoaded', init);
