/**
 * Kids Computer Lab — Typing Game
 * Teaches finding and tapping keys on a keyboard.
 * @module ui/typing
 */

import audio from '../audio.js';

export function renderTypingGame(stepData, options = {}) {
  const { onComplete = () => {} } = options;
  const container = document.createElement('div');
  container.className = 'typing-game';

  const sequence = stepData.sequence || ['A', 'B', 'C'];
  let currentIndex = 0;

  // Header
  const header = document.createElement('div');
  header.style.cssText = 'text-align:center; margin-bottom:var(--space-4);';
  
  const title = document.createElement('h3');
  title.style.fontSize = 'var(--text-2xl)';
  title.textContent = stepData.instructions || 'Find the key and tap it!';
  header.appendChild(title);
  
  container.appendChild(header);

  // Target Letter Display
  const targetDisplay = document.createElement('div');
  targetDisplay.style.cssText = `
    font-size: 80px;
    font-weight: bold;
    color: var(--color-primary);
    text-align: center;
    margin: var(--space-4) 0;
    height: 100px;
    line-height: 100px;
  `;
  container.appendChild(targetDisplay);

  // On-screen keyboard for visual reference and click support
  const keyboard = document.createElement('div');
  keyboard.className = 'virtual-keyboard';
  keyboard.style.cssText = `
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    max-width: 600px;
    margin: 0 auto;
    background: #e0e0e0;
    padding: 16px;
    border-radius: 12px;
    border-bottom: 6px solid #bdbdbd;
  `;

  // QWERTY layout
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  const keyEls = {};

  rows.forEach((row, rowIndex) => {
    const rowEl = document.createElement('div');
    rowEl.style.cssText = `
      display: flex;
      justify-content: center;
      width: 100%;
      gap: 8px;
      margin-left: ${rowIndex * 20}px;
    `;

    row.forEach(key => {
      const btn = document.createElement('button');
      btn.textContent = key;
      btn.style.cssText = `
        width: 45px;
        height: 50px;
        border: none;
        background: white;
        border-radius: 6px;
        font-size: 20px;
        font-weight: bold;
        color: #333;
        box-shadow: 0 4px 0 #bbb;
        cursor: pointer;
        transition: transform 0.1s, box-shadow 0.1s;
      `;

      btn.addEventListener('mousedown', () => {
        btn.style.transform = 'translateY(4px)';
        btn.style.boxShadow = '0 0 0 #bbb';
      });

      btn.addEventListener('mouseup', () => {
        btn.style.transform = 'translateY(0)';
        btn.style.boxShadow = '0 4px 0 #bbb';
      });

      btn.addEventListener('click', () => {
        handleKeyPress(key);
      });

      keyEls[key] = btn;
      rowEl.appendChild(btn);
    });

    keyboard.appendChild(rowEl);
  });

  container.appendChild(keyboard);

  // Logic
  function updateTarget() {
    if (currentIndex >= sequence.length) {
      targetDisplay.textContent = '🎉';
      setTimeout(() => {
        onComplete({ score: sequence.length, stars: 3 });
      }, 1000);
      return;
    }

    const currentKey = sequence[currentIndex];
    targetDisplay.textContent = currentKey;
    targetDisplay.className = 'animate-pop-in';
    
    // Reset animation
    setTimeout(() => {
      targetDisplay.className = '';
    }, 300);

    // Highlight key on keyboard
    Object.values(keyEls).forEach(btn => {
      btn.style.background = 'white';
      btn.style.color = '#333';
    });
    
    if (keyEls[currentKey]) {
      keyEls[currentKey].style.background = 'var(--color-accent)';
      keyEls[currentKey].style.color = 'white';
    }
  }

  function handleKeyPress(key) {
    if (currentIndex >= sequence.length) return;
    
    const targetKey = sequence[currentIndex];
    
    if (key.toUpperCase() === targetKey) {
      audio.playCorrect();
      // Flash green
      if (keyEls[targetKey]) {
        keyEls[targetKey].style.background = 'var(--color-success)';
      }
      currentIndex++;
      setTimeout(updateTarget, 300);
    } else {
      audio.playIncorrect();
      // Flash red
      if (keyEls[key]) {
        const oldBg = keyEls[key].style.background;
        keyEls[key].style.background = '#e74c3c';
        keyEls[key].style.color = 'white';
        setTimeout(() => {
          if (currentIndex < sequence.length && sequence[currentIndex] !== key) {
            keyEls[key].style.background = 'white';
            keyEls[key].style.color = '#333';
          }
        }, 300);
      }
    }
  }

  // Physical keyboard listener
  const keydownListener = (e) => {
    // Ignore special keys
    if (e.ctrlKey || e.altKey || e.metaKey || e.key.length !== 1) return;
    
    const key = e.key.toUpperCase();
    if (/[A-Z]/.test(key)) {
      handleKeyPress(key);
    }
  };

  document.addEventListener('keydown', keydownListener);

  // Cleanup on complete
  const originalOnComplete = onComplete;
  options.onComplete = (result) => {
    document.removeEventListener('keydown', keydownListener);
    originalOnComplete(result);
  };

  updateTarget();

  return container;
}

export default { renderTypingGame };
