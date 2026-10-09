/**
 * Kids Computer Lab — Quiz Engine
 * Renders quiz questions (MCQ, picture-choice, matching) with
 * feedback, explanations, and accessibility support.
 * @module ui/quiz
 */

import audio from '../audio.js';
import speech from '../speech.js';

/**
 * Render a quiz step.
 * @param {Object} quizData - Quiz step data from lesson JSON
 * @param {Object} options - Rendering options
 * @param {boolean} options.isUKG - UKG mode (larger targets, simpler text)
 * @param {Function} options.onComplete - Called when quiz is answered
 * @returns {HTMLElement} Quiz container element
 */
export function renderQuiz(quizData, options = {}) {
  const { isUKG = false, onComplete = () => {} } = options;
  const container = document.createElement('div');
  container.className = 'quiz';

  // Track state across questions
  const state = {
    currentQuestion: 0,
    correctCount: 0,
    totalQuestions: quizData.questions.length,
    answered: false
  };

  function renderQuestion() {
    const q = quizData.questions[state.currentQuestion];
    container.innerHTML = '';
    state.answered = false;

    // Question counter (for multi-question quizzes)
    if (state.totalQuestions > 1) {
      const counter = document.createElement('div');
      counter.className = 'quiz__counter';
      counter.style.cssText = 'text-align:center; font-size:var(--text-sm); color:var(--color-text-muted); margin-bottom:var(--space-3);';
      counter.textContent = `Question ${state.currentQuestion + 1} of ${state.totalQuestions}`;
      container.appendChild(counter);
    }

    // Question prompt
    const prompt = document.createElement('h3');
    prompt.className = 'quiz__question';
    if (isUKG) prompt.style.fontSize = 'var(--text-2xl)';
    prompt.textContent = q.prompt;
    container.appendChild(prompt);
    
    speech.speak(q.prompt);

    // Options grid
    const optionsGrid = document.createElement('div');
    optionsGrid.className = 'quiz__options';
    optionsGrid.setAttribute('role', 'radiogroup');
    optionsGrid.setAttribute('aria-label', q.prompt);

    if (isUKG) {
      optionsGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(150px, 1fr))';
    }

    q.options.forEach((opt, idx) => {
      const optBtn = document.createElement('button');
      optBtn.className = 'quiz__option';
      optBtn.setAttribute('role', 'radio');
      optBtn.setAttribute('aria-checked', 'false');
      optBtn.setAttribute('tabindex', '0');
      optBtn.dataset.index = idx;
      optBtn.dataset.correct = opt.correct ? 'true' : 'false';

      if (isUKG) {
        optBtn.style.minHeight = '80px';
        optBtn.style.padding = 'var(--space-4)';
      }

      // Image option (picture-choice)
      if (opt.image) {
        const img = document.createElement('div');
        img.className = 'quiz__option-image';
        img.innerHTML = opt.image.startsWith('<svg') ? opt.image : createPlaceholderImage(opt.label);
        img.setAttribute('aria-hidden', 'true');
        optBtn.appendChild(img);
      }

      // Label
      const label = document.createElement('span');
      label.className = 'quiz__option-label';
      if (isUKG) label.style.fontSize = 'var(--text-xl)';
      label.textContent = opt.label;
      optBtn.appendChild(label);

      optBtn.addEventListener('click', () => handleAnswer(optBtn, opt, q));
      optBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleAnswer(optBtn, opt, q);
        }
      });

      optionsGrid.appendChild(optBtn);
    });

    container.appendChild(optionsGrid);

    // Focus first option
    requestAnimationFrame(() => {
      const firstOpt = optionsGrid.querySelector('.quiz__option');
      if (firstOpt) firstOpt.focus();
    });
  }

  function handleAnswer(optBtn, opt, question) {
    if (state.answered) return;
    state.answered = true;

    // Mark all options as disabled
    const allOpts = container.querySelectorAll('.quiz__option');
    allOpts.forEach(o => {
      o.classList.add('quiz__option--disabled');
      o.setAttribute('aria-disabled', 'true');

      if (o.dataset.correct === 'true') {
        o.classList.add('quiz__option--correct');
      }
    });

    // Mark the selected option
    optBtn.classList.add('quiz__option--selected');
    optBtn.setAttribute('aria-checked', 'true');

    const isCorrect = opt.correct === true;

    if (isCorrect) {
      optBtn.classList.add('quiz__option--correct');
      state.correctCount++;
      audio.playCorrect();
    } else {
      optBtn.classList.add('quiz__option--incorrect');
      audio.playIncorrect();
    }

    // Feedback
    const feedback = document.createElement('div');
    feedback.className = `quiz__feedback quiz__feedback--${isCorrect ? 'correct' : 'incorrect'}`;
    feedback.setAttribute('role', 'alert');

    const feedbackText = isCorrect
      ? (question.feedback?.correct || 'Great job! That\'s right! ⭐')
      : (question.feedback?.incorrect || 'Not quite — let\'s try again!');

    feedback.innerHTML = `
      <div>${escapeHtml(feedbackText)}</div>
      ${question.explanation ? `<div class="quiz__explanation">${escapeHtml(question.explanation)}</div>` : ''}
    `;
    container.appendChild(feedback);

    speech.speak(feedbackText + (question.explanation ? ". " + question.explanation : ""));

    // Next question or complete
    const nextBtn = document.createElement('button');

    if (!isCorrect) {
      // Allow retry for UKG
      if (isUKG) {
        nextBtn.className = 'btn btn--accent';
        nextBtn.style.cssText = 'margin: var(--space-4) auto; display: block;';
        nextBtn.textContent = '🔄 Try Again!';
        nextBtn.addEventListener('click', () => {
          state.answered = false;
          renderQuestion();
        });
      } else {
        // For Class 4, show next or complete
        nextBtn.className = 'btn btn--primary';
        nextBtn.style.cssText = 'margin: var(--space-4) auto; display: block;';
        nextBtn.textContent = state.currentQuestion < state.totalQuestions - 1 ? 'Next Question →' : 'See Results';
        nextBtn.addEventListener('click', () => advanceQuiz());
      }
    } else {
      nextBtn.className = 'btn btn--primary';
      nextBtn.style.cssText = 'margin: var(--space-4) auto; display: block;';
      nextBtn.textContent = state.currentQuestion < state.totalQuestions - 1 ? 'Next Question →' : (isUKG ? '🎉 All Done!' : 'See Results');
      nextBtn.addEventListener('click', () => advanceQuiz());
    }

    container.appendChild(nextBtn);
    nextBtn.focus();
  }

  function advanceQuiz() {
    state.currentQuestion++;
    if (state.currentQuestion < state.totalQuestions) {
      renderQuestion();
    } else {
      // Quiz complete
      const score = state.correctCount;
      const total = state.totalQuestions;
      const stars = score === total ? 3 : score >= total * 0.5 ? 2 : score > 0 ? 1 : 0;

      onComplete({ score, total, stars });
    }
  }

  renderQuestion();
  return container;
}

/**
 * Create a simple SVG placeholder image for quiz options.
 */
function createPlaceholderImage(label) {
  const colors = ['#7ec8e3', '#f0a03c', '#66bb6a', '#ef5350', '#ab47bc', '#26c6da'];
  const color = colors[Math.abs(hashCode(label)) % colors.length];

  return `<svg viewBox="0 0 100 100" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="12" fill="${color}" opacity="0.2"/>
    <text x="50" y="55" text-anchor="middle" font-size="14" fill="${color}" font-weight="bold" font-family="sans-serif">${escapeHtml(label)}</text>
  </svg>`;
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

export default { renderQuiz };
