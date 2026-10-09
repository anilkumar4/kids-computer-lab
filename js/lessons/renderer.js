/**
 * Kids Computer Lab — Lesson Renderer
 * Data-driven lesson step renderer. Reads lesson JSON and renders
 * each step type (story, hotspot, quiz, sort, recap) in sequence.
 * @module lessons/renderer
 */

import { createMascotArea, createBoltSVG } from '../ui/mascot.js';
import { renderQuiz } from '../ui/quiz.js';
import { renderHotspot } from '../ui/hotspot.js';
import { renderSortGame } from '../ui/dragdrop.js';
import { renderMouseGame } from '../ui/sandbox.js';
import { renderTypingGame } from '../ui/typing.js';
import store from '../store.js';
import audio from '../audio.js';
import speech from '../speech.js';

/**
 * Main lesson renderer class.
 */
export class LessonRenderer {
  /**
   * @param {HTMLElement} containerEl - DOM element to render into
   */
  constructor(containerEl) {
    this.container = containerEl;
    this.lesson = null;
    this.currentStep = 0;
    this.stepResults = [];
    this._onStepComplete = null;
  }

  /**
   * Load and render a lesson.
   * @param {Object} lesson - Lesson data object
   * @param {number} [startStep=0] - Step to start from
   */
  render(lesson, startStep = 0) {
    this.lesson = lesson;
    this.currentStep = startStep;
    this.stepResults = [];
    this._renderCurrentStep();
  }

  /** Get whether the current track is UKG */
  get isUKG() {
    return this.lesson?.track === 'explorers';
  }

  /** Total number of steps */
  get totalSteps() {
    return this.lesson?.steps?.length || 0;
  }

  /** Navigate to next step */
  nextStep() {
    if (this.currentStep < this.totalSteps - 1) {
      this.currentStep++;
      this._saveProgress();
      this._renderCurrentStep('next');
    }
  }

  /** Navigate to previous step */
  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this._renderCurrentStep('prev');
    }
  }

  /** Jump to a specific step */
  goToStep(index) {
    if (index >= 0 && index < this.totalSteps) {
      this.currentStep = index;
      this._renderCurrentStep();
    }
  }

  /** Save current step progress */
  _saveProgress() {
    store.updateLessonProgress(this.lesson.id, {
      lastStep: this.currentStep
    });
  }

  /** Render the current step */
  _renderCurrentStep(direction = 'next') {
    const step = this.lesson.steps[this.currentStep];
    if (!step) return;

    // Stop any ongoing speech
    speech.stop();

    // Clear container with transition
    const animClass = direction === 'prev' ? 'step-enter-prev' : 'step-enter-next';

    this.container.innerHTML = '';
    this.container.className = `lesson-view ${animClass}`;

    // Render lesson header
    this._renderHeader();

    // Render progress dots
    this._renderProgressDots();

    // Render mascot area if step has bolt speech
    if (step.boltExpression || step.boltSpeech) {
      const mascotHtml = createMascotArea({
        expression: step.boltExpression || 'happy',
        text: step.boltSpeech || '',
        isUKG: this.isUKG
      });
      const mascotDiv = document.createElement('div');
      mascotDiv.innerHTML = mascotHtml;
      this.container.appendChild(mascotDiv.firstElementChild);

      // Speak bolt's text if speech is enabled
      if (step.boltSpeech && !store.getSetting('muted')) {
        speech.speak(step.boltSpeech);
      }
    }

    // Render step content by type
    const stepContent = this._renderStepContent(step);
    if (stepContent) {
      this.container.appendChild(stepContent);
    }

    // Render navigation buttons (unless it's a quiz or sort — they handle their own flow)
    if (step.type !== 'quiz' || this._isLastStep()) {
      this._renderNavigation(step);
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /** Render lesson title/header */
  _renderHeader() {
    const header = document.createElement('div');
    header.className = 'lesson-header';

    const trackBadge = document.createElement('span');
    trackBadge.className = `lesson-header__track lesson-header__track--${this.isUKG ? 'explorers' : 'champions'}`;
    trackBadge.textContent = this.isUKG ? '⭐ Little Explorers' : '🏆 Tech Champions';
    header.appendChild(trackBadge);

    const title = document.createElement('h1');
    title.className = 'lesson-header__title';
    title.textContent = this.lesson.title;
    header.appendChild(title);

    this.container.appendChild(header);
  }

  /** Render progress dots */
  _renderProgressDots() {
    const dots = document.createElement('div');
    dots.className = 'progress-dots';
    dots.setAttribute('role', 'tablist');
    dots.setAttribute('aria-label', 'Lesson progress');

    for (let i = 0; i < this.totalSteps; i++) {
      const dot = document.createElement('span');
      dot.className = 'progress-dot';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-selected', i === this.currentStep ? 'true' : 'false');
      dot.setAttribute('aria-label', `Step ${i + 1} of ${this.totalSteps}`);

      if (i === this.currentStep) {
        dot.classList.add('progress-dot--active');
      } else if (i < this.currentStep) {
        dot.classList.add('progress-dot--completed');
      }

      dots.appendChild(dot);
    }

    this.container.appendChild(dots);
  }

  /** Render step content based on type */
  _renderStepContent(step) {
    switch (step.type) {
      case 'story':
        return this._renderStory(step);
      case 'hotspot':
        return this._renderHotspotStep(step);
      case 'quiz':
        return this._renderQuizStep(step);
      case 'sort':
        return this._renderSortStep(step);
      case 'mouseGame':
        return this._renderMouseGameStep(step);
      case 'typing':
        return this._renderTypingStep(step);
      case 'recap':
        return this._renderRecap(step);
      case 'completion':
        return this._renderCompletion(step);
      default:
        return this._renderStory(step); // fallback
    }
  }

  /** Render a story/teaching step */
  _renderStory(step) {
    const div = document.createElement('div');
    div.className = 'step-content' + (this.isUKG ? ' step-content--ukg' : '');

    if (step.content?.text) {
      const text = document.createElement('p');
      text.className = 'step-content__text';
      text.textContent = step.content.text;
      div.appendChild(text);
    }

    if (step.content?.svgContent) {
      const imgWrapper = document.createElement('div');
      imgWrapper.className = 'step-content__image';
      imgWrapper.innerHTML = step.content.svgContent;
      div.appendChild(imgWrapper);
    }

    // Bullet points for teaching
    if (step.content?.points && step.content.points.length > 0) {
      const ul = document.createElement('ul');
      ul.style.cssText = `
        max-width: 600px;
        margin: var(--space-4) auto;
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
      `;

      step.content.points.forEach(point => {
        const li = document.createElement('li');
        li.style.cssText = `
          display: flex;
          align-items: flex-start;
          gap: var(--space-3);
          padding: var(--space-3) var(--space-4);
          background: var(--color-bg-card);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
          font-size: ${this.isUKG ? 'var(--text-xl)' : 'var(--text-lg)'};
        `;
        li.innerHTML = `<span style="font-size:1.3em;" aria-hidden="true">${point.icon || '📌'}</span> <span>${escapeHtml(point.text)}</span>`;
        ul.appendChild(li);
      });

      div.appendChild(ul);
    }

    return div;
  }

  /** Render a hotspot step */
  _renderHotspotStep(step) {
    return renderHotspot(step, {
      isUKG: this.isUKG,
      onAllVisited: () => {
        audio.playStar();
      }
    });
  }

  /** Render a quiz step */
  _renderQuizStep(step) {
    const wrapper = document.createElement('div');

    const quizEl = renderQuiz(step, {
      isUKG: this.isUKG,
      onComplete: (result) => {
        this.stepResults.push({ type: 'quiz', ...result });

        // Show completion within quiz
        const completionDiv = document.createElement('div');
        completionDiv.className = 'completion-screen animate-scale-in';
        completionDiv.style.cssText = 'margin-top: var(--space-6);';

        const stars = result.stars;
        let starsHtml = '';
        for (let i = 0; i < 3; i++) {
          starsHtml += `<span class="star-icon ${i < stars ? 'star-icon--earned' : 'star-icon--empty'}" style="display:inline-block;animation-delay:${i * 0.15}s;">⭐</span>`;
        }

        completionDiv.innerHTML = `
          <div class="stars-display">${starsHtml}</div>
          <p style="font-size: var(--text-lg); color: var(--color-text-secondary); margin: var(--space-4) 0;">
            You got ${result.score} out of ${result.total}!
          </p>
        `;

        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.className = 'btn btn--primary btn--lg';
        nextBtn.textContent = this._isLastStep() ? '🎉 Finish Lesson!' : 'Continue →';
        nextBtn.addEventListener('click', () => {
          if (this._isLastStep()) {
            this._handleLessonComplete();
          } else {
            this.nextStep();
          }
        });
        completionDiv.appendChild(nextBtn);

        wrapper.appendChild(completionDiv);

        if (stars > 0) audio.playStar();
      }
    });

    wrapper.appendChild(quizEl);
    return wrapper;
  }

  /** Render a sort/matching step */
  _renderSortStep(step) {
    const wrapper = document.createElement('div');

    const sortEl = renderSortGame(step, {
      isUKG: this.isUKG,
      onComplete: (result) => {
        this.stepResults.push({ type: 'sort', ...result });

        const completionDiv = document.createElement('div');
        completionDiv.className = 'completion-screen animate-scale-in';
        completionDiv.style.cssText = 'margin-top: var(--space-6);';

        completionDiv.innerHTML = `
          <div class="stars-display">
            ${Array(3).fill(0).map((_, i) => `<span class="star-icon ${i < result.stars ? 'star-icon--earned' : 'star-icon--empty'}" style="display:inline-block;">⭐</span>`).join('')}
          </div>
          <p style="font-size: var(--text-lg); color: var(--color-text-secondary); margin: var(--space-4) 0;">
            ${result.correctCount} of ${result.totalItems} sorted correctly!
          </p>
        `;

        const nextBtn = document.createElement('button');
        nextBtn.className = 'btn btn--primary btn--lg';
        nextBtn.textContent = this._isLastStep() ? '🎉 Finish Lesson!' : 'Continue →';
        nextBtn.addEventListener('click', () => {
          if (this._isLastStep()) {
            this._handleLessonComplete();
          } else {
            this.nextStep();
          }
        });
        completionDiv.appendChild(nextBtn);

        wrapper.appendChild(completionDiv);
        audio.playStar();
      }
    });

    wrapper.appendChild(sortEl);
    return wrapper;
  }

  /** Render a mouse sandbox step */
  _renderMouseGameStep(step) {
    const wrapper = document.createElement('div');
    const gameEl = renderMouseGame(step, {
      onComplete: (result) => {
        this.stepResults.push({ type: 'mouseGame', ...result });
        const completionDiv = document.createElement('div');
        completionDiv.className = 'completion-screen animate-scale-in';
        completionDiv.style.cssText = 'margin-top: var(--space-6);';
        completionDiv.innerHTML = `
          <div class="stars-display">
            ${Array(3).fill(0).map((_, i) => `<span class="star-icon ${i < result.stars ? 'star-icon--earned' : 'star-icon--empty'}" style="display:inline-block;">⭐</span>`).join('')}
          </div>
          <p style="font-size: var(--text-lg); margin: var(--space-4) 0;">Great pointing!</p>
        `;
        const nextBtn = document.createElement('button');
        nextBtn.className = 'btn btn--primary btn--lg';
        nextBtn.textContent = 'Continue →';
        nextBtn.addEventListener('click', () => {
          this.nextStep();
        });
        completionDiv.appendChild(nextBtn);
        wrapper.appendChild(completionDiv);
        audio.playStar();
      }
    });
    wrapper.appendChild(gameEl);
    return wrapper;
  }

  /** Render a typing step */
  _renderTypingStep(step) {
    const wrapper = document.createElement('div');
    const gameEl = renderTypingGame(step, {
      onComplete: (result) => {
        this.stepResults.push({ type: 'typing', ...result });
        const completionDiv = document.createElement('div');
        completionDiv.className = 'completion-screen animate-scale-in';
        completionDiv.style.cssText = 'margin-top: var(--space-6);';
        completionDiv.innerHTML = `
          <div class="stars-display">
            ${Array(3).fill(0).map((_, i) => `<span class="star-icon ${i < result.stars ? 'star-icon--earned' : 'star-icon--empty'}" style="display:inline-block;">⭐</span>`).join('')}
          </div>
          <p style="font-size: var(--text-lg); margin: var(--space-4) 0;">Super typing!</p>
        `;
        const nextBtn = document.createElement('button');
        nextBtn.className = 'btn btn--primary btn--lg';
        nextBtn.textContent = 'Continue →';
        nextBtn.addEventListener('click', () => {
          this.nextStep();
        });
        completionDiv.appendChild(nextBtn);
        wrapper.appendChild(completionDiv);
        audio.playStar();
      }
    });
    wrapper.appendChild(gameEl);
    return wrapper;
  }

  /** Render a recap step */
  _renderRecap(step) {
    const div = document.createElement('div');
    div.className = 'step-content' + (this.isUKG ? ' step-content--ukg' : '');

    const title = document.createElement('h3');
    title.style.cssText = 'text-align: center; margin-bottom: var(--space-6); font-size: var(--text-2xl);';
    title.textContent = '📝 What We Learned';
    div.appendChild(title);

    if (step.content?.points) {
      const list = document.createElement('div');
      list.style.cssText = 'display: flex; flex-direction: column; gap: var(--space-3); max-width: 600px; margin: 0 auto;';

      step.content.points.forEach((point, idx) => {
        const item = document.createElement('div');
        item.className = 'animate-slide-up';
        item.style.cssText = `
          display: flex; align-items: center; gap: var(--space-3);
          padding: var(--space-4);
          background: var(--color-bg-card);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          animation-delay: ${idx * 0.1}s;
          font-size: ${this.isUKG ? 'var(--text-xl)' : 'var(--text-lg)'};
        `;
        item.innerHTML = `<span style="font-size:1.5em;" aria-hidden="true">${point.icon || '✅'}</span> <span>${escapeHtml(point.text)}</span>`;
        list.appendChild(item);
      });

      div.appendChild(list);
    }

    return div;
  }

  /** Render lesson completion screen */
  _renderCompletion(step) {
    const div = document.createElement('div');
    div.className = 'completion-screen animate-scale-in';

    // Calculate overall stars
    const quizResults = this.stepResults.filter(r => r.type === 'quiz' || r.type === 'sort');
    let totalStars = 0;
    if (quizResults.length > 0) {
      const avgStars = quizResults.reduce((sum, r) => sum + r.stars, 0) / quizResults.length;
      totalStars = Math.round(avgStars);
    } else {
      totalStars = 3; // No quiz = completed = full stars
    }

    // Save completion
    store.completeLesson(this.lesson.id, totalStars);

    // Mascot celebration
    div.innerHTML = `
      <div style="margin-bottom: var(--space-4);">
        ${createBoltSVG('celebrate', this.isUKG ? 140 : 120)}
      </div>
    `;

    const title = document.createElement('h2');
    title.className = 'completion-screen__title';
    title.textContent = this.isUKG ? '🎉 Amazing Job!' : '🎉 Lesson Complete!';
    div.appendChild(title);

    // Stars
    const starsDiv = document.createElement('div');
    starsDiv.className = 'stars-display';
    for (let i = 0; i < 3; i++) {
      const star = document.createElement('span');
      star.className = `star-icon ${i < totalStars ? 'star-icon--earned' : 'star-icon--empty'}`;
      star.style.animationDelay = `${i * 0.2}s`;
      star.textContent = '⭐';
      starsDiv.appendChild(star);
    }
    div.appendChild(starsDiv);

    const msg = document.createElement('p');
    msg.className = 'completion-screen__message';
    msg.textContent = step.content?.message || `You completed "${this.lesson.title}"!`;
    div.appendChild(msg);

    // Action buttons
    const actions = document.createElement('div');
    actions.className = 'completion-screen__actions';

    const homeBtn = document.createElement('button');
    homeBtn.className = 'btn btn--outline';
    homeBtn.textContent = '🏠 Home';
    homeBtn.addEventListener('click', () => {
      window.location.hash = '#/home';
    });
    actions.appendChild(homeBtn);

    const trackBtn = document.createElement('button');
    trackBtn.className = 'btn btn--primary';
    trackBtn.textContent = this.isUKG ? '⭐ More Lessons' : '📚 Back to Lessons';
    trackBtn.addEventListener('click', () => {
      window.location.hash = `#/${this.isUKG ? 'explorers' : 'champions'}`;
    });
    actions.appendChild(trackBtn);

    div.appendChild(actions);

    // Play celebration sound
    audio.playComplete();

    // Add confetti
    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
        position: absolute;
        width: 10px;
        height: 10px;
        background-color: ${['#f1c40f', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6'][Math.floor(Math.random() * 5)]};
        left: ${Math.random() * 100}%;
        top: -10px;
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        opacity: 0;
        pointer-events: none;
        animation: confettiFall ${1 + Math.random() * 2}s ease-in forwards;
        animation-delay: ${Math.random() * 0.5}s;
      `;
      div.appendChild(confetti);
    }

    return div;
  }

  /** Check if current step is the last step */
  _isLastStep() {
    return this.currentStep >= this.totalSteps - 1;
  }

  /** Handle lesson completion */
  _handleLessonComplete() {
    // Add a completion step dynamically and go to it
    this.lesson.steps.push({
      type: 'completion',
      boltExpression: 'celebrate',
      boltSpeech: this.isUKG
        ? 'You did it! You are a star!'
        : `Great work! You've completed ${this.lesson.title}!`,
      content: {}
    });
    this.nextStep();
  }

  /** Render Back/Next navigation */
  _renderNavigation(step) {
    // Don't show nav on completion screens
    if (step.type === 'completion') return;

    const nav = document.createElement('div');
    nav.className = 'lesson-nav';

    // Back button
    const backBtn = document.createElement('button');
    backBtn.className = 'lesson-nav__btn lesson-nav__btn--prev';
    backBtn.innerHTML = '← Back';
    backBtn.disabled = this.currentStep === 0;
    backBtn.setAttribute('aria-label', 'Previous step');
    backBtn.addEventListener('click', () => {
      audio.playNav();
      this.prevStep();
    });
    nav.appendChild(backBtn);

    // Step indicator
    const indicator = document.createElement('span');
    indicator.style.cssText = 'font-size: var(--text-sm); color: var(--color-text-muted);';
    indicator.textContent = `${this.currentStep + 1} / ${this.totalSteps}`;
    nav.appendChild(indicator);

    // Next button (don't show on quiz/sort/games steps — they handle their own advancement)
    if (step.type !== 'quiz' && step.type !== 'sort' && step.type !== 'mouseGame' && step.type !== 'typing') {
      const nextBtn = document.createElement('button');
      nextBtn.className = 'lesson-nav__btn lesson-nav__btn--next';

      if (this._isLastStep()) {
        nextBtn.innerHTML = '🎉 Finish!';
        nextBtn.addEventListener('click', () => {
          audio.playNav();
          this._handleLessonComplete();
        });
      } else {
        nextBtn.innerHTML = 'Next →';
        nextBtn.addEventListener('click', () => {
          audio.playNav();
          this.nextStep();
        });
      }

      nextBtn.setAttribute('aria-label', this._isLastStep() ? 'Finish lesson' : 'Next step');
      nav.appendChild(nextBtn);
    }

    this.container.appendChild(nav);
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

export default LessonRenderer;
