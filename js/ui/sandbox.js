/**
 * Kids Computer Lab — Mouse Sandbox Game
 * Teaches pointer movement, clicking, and dragging.
 * @module ui/sandbox
 */

import audio from '../audio.js';

export function renderMouseGame(stepData, options = {}) {
  const { onComplete = () => {} } = options;
  const container = document.createElement('div');
  container.className = 'mouse-sandbox';

  // Game state
  let score = 0;
  const totalTargets = stepData.targets || 5;
  const gameType = stepData.gameType || 'click'; // 'click' or 'drag'

  // Header
  const header = document.createElement('div');
  header.style.cssText = 'text-align:center; margin-bottom:var(--space-4);';
  const title = document.createElement('h3');
  title.style.fontSize = 'var(--text-2xl)';
  title.textContent = stepData.instructions || 'Click the targets!';
  header.appendChild(title);
  
  const scoreDisplay = document.createElement('div');
  scoreDisplay.style.cssText = 'font-size:var(--text-xl); font-weight:bold; color:var(--color-primary);';
  scoreDisplay.textContent = `Score: 0 / ${totalTargets}`;
  header.appendChild(scoreDisplay);
  
  container.appendChild(header);

  // Play area
  const playArea = document.createElement('div');
  playArea.className = 'sandbox-area';
  playArea.style.cssText = `
    position: relative;
    width: 100%;
    height: 300px;
    background: #e0f7fa;
    border: 4px dashed #81d4fa;
    border-radius: 16px;
    overflow: hidden;
    touch-action: none; /* Prevent scrolling while playing */
  `;
  container.appendChild(playArea);

  // Target spawner
  function spawnTarget() {
    if (score >= totalTargets) {
      setTimeout(() => {
        onComplete({ score, stars: 3 });
      }, 500);
      return;
    }

    const target = document.createElement('div');
    target.className = 'sandbox-target animate-scale-in';
    
    // Random position
    const size = 60;
    const padding = 20;
    const maxX = playArea.clientWidth - size - padding;
    const maxY = playArea.clientHeight - size - padding;
    const x = Math.max(padding, Math.floor(Math.random() * maxX));
    const y = Math.max(padding, Math.floor(Math.random() * maxY));

    target.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      background: var(--color-accent);
      border-radius: 50%;
      box-shadow: 0 4px 0 #d97d15;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      cursor: pointer;
      user-select: none;
    `;
    target.textContent = '🌟';

    // Interaction
    if (gameType === 'click') {
      target.addEventListener('click', () => {
        handleSuccess(target);
      });
    } else if (gameType === 'drag') {
      target.draggable = true;
      // Add a drop zone
      const dropZone = document.createElement('div');
      dropZone.style.cssText = `
        position: absolute;
        right: 20px;
        bottom: 20px;
        width: 80px;
        height: 80px;
        background: rgba(102, 187, 106, 0.3);
        border: 4px dashed #66bb6a;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 30px;
      `;
      dropZone.textContent = '📥';
      playArea.appendChild(dropZone);

      // Drag events
      let isDragging = false;
      
      target.addEventListener('mousedown', (e) => {
        isDragging = true;
        target.style.zIndex = 10;
        e.preventDefault(); // Prevent text selection
      });

      document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const rect = playArea.getBoundingClientRect();
        let newX = e.clientX - rect.left - size/2;
        let newY = e.clientY - rect.top - size/2;
        
        // Boundaries
        newX = Math.max(0, Math.min(newX, playArea.clientWidth - size));
        newY = Math.max(0, Math.min(newY, playArea.clientHeight - size));

        target.style.left = newX + 'px';
        target.style.top = newY + 'px';
      });

      const checkDrop = () => {
        if (!isDragging) return;
        isDragging = false;
        target.style.zIndex = 1;

        const tRect = target.getBoundingClientRect();
        const dRect = dropZone.getBoundingClientRect();

        // Check intersection
        if (!(tRect.right < dRect.left || 
              tRect.left > dRect.right || 
              tRect.bottom < dRect.top || 
              tRect.top > dRect.bottom)) {
          dropZone.remove();
          handleSuccess(target);
        } else {
          // Snap back
          target.style.left = x + 'px';
          target.style.top = y + 'px';
          audio.playIncorrect();
        }
      };

      document.addEventListener('mouseup', checkDrop);
      // Clean up listener when done
      target.cleanup = () => document.removeEventListener('mouseup', checkDrop);
    }

    playArea.appendChild(target);
  }

  function handleSuccess(target) {
    if (target.cleanup) target.cleanup();
    audio.playStar();
    target.style.transform = 'scale(0)';
    target.style.opacity = '0';
    setTimeout(() => {
      target.remove();
      score++;
      scoreDisplay.textContent = `Score: ${score} / ${totalTargets}`;
      spawnTarget();
    }, 300);
  }

  // Start game after a short delay
  setTimeout(() => {
    // Only spawn if we actually have dimensions
    if (playArea.clientWidth > 0) {
       spawnTarget();
    } else {
       // Wait for layout
       const observer = new ResizeObserver(() => {
          observer.disconnect();
          spawnTarget();
       });
       observer.observe(playArea);
    }
  }, 100);

  return container;
}

export default { renderMouseGame };
