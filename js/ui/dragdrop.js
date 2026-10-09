/**
 * Kids Computer Lab — Drag & Drop with Tap/Keyboard Alternative
 * Sorting/matching activities accessible via drag, tap, and keyboard.
 * @module ui/dragdrop
 */

import audio from '../audio.js';

/**
 * Render a sort/match activity step.
 * Items are sorted into categorized zones.
 *
 * @param {Object} stepData - Sort step data from lesson JSON
 * @param {Object} options
 * @param {boolean} options.isUKG - UKG mode
 * @param {Function} options.onComplete - Called when sorting is complete
 * @returns {HTMLElement} Sort game container
 */
export function renderSortGame(stepData, options = {}) {
  const { isUKG = false, onComplete = () => {} } = options;

  const container = document.createElement('div');
  container.className = 'sort-game';

  // State
  let selectedItem = null;
  let correctCount = 0;
  const totalItems = stepData.items.length;
  const placedItems = new Set();

  // Instructions
  if (stepData.instructions) {
    const instr = document.createElement('p');
    instr.style.cssText = 'text-align: center; font-size: var(--text-lg); color: var(--color-text-secondary); margin-bottom: var(--space-4);';
    instr.textContent = stepData.instructions;
    container.appendChild(instr);
  }

  // Items pool
  const itemsPool = document.createElement('div');
  itemsPool.className = 'sort-game__items';
  itemsPool.setAttribute('aria-label', 'Items to sort');

  stepData.items.forEach(item => {
    const el = createSortItem(item);
    itemsPool.appendChild(el);
  });

  container.appendChild(itemsPool);

  // Sort zones
  const zonesContainer = document.createElement('div');
  zonesContainer.className = 'sort-zones';

  stepData.zones.forEach(zone => {
    const zoneEl = document.createElement('div');
    zoneEl.className = 'sort-zone';
    zoneEl.dataset.zoneId = zone.id;
    zoneEl.setAttribute('role', 'region');
    zoneEl.setAttribute('aria-label', `${zone.title} category`);

    const title = document.createElement('div');
    title.className = 'sort-zone__title';
    title.textContent = zone.icon ? `${zone.icon} ${zone.title}` : zone.title;
    zoneEl.appendChild(title);

    const itemsArea = document.createElement('div');
    itemsArea.className = 'sort-zone__items';
    zoneEl.appendChild(itemsArea);

    // Drop zone click handler (for tap-to-place)
    zoneEl.addEventListener('click', () => {
      if (selectedItem) {
        placeItem(selectedItem, zone, zoneEl);
      }
    });

    // Drag over/drop
    zoneEl.addEventListener('dragover', (e) => {
      e.preventDefault();
      zoneEl.classList.add('sort-zone--active');
    });

    zoneEl.addEventListener('dragleave', () => {
      zoneEl.classList.remove('sort-zone--active');
    });

    zoneEl.addEventListener('drop', (e) => {
      e.preventDefault();
      zoneEl.classList.remove('sort-zone--active');
      const itemId = e.dataTransfer.getData('text/plain');
      const item = stepData.items.find(i => i.id === itemId);
      if (item) {
        placeItem(item, zone, zoneEl);
      }
    });

    zonesContainer.appendChild(zoneEl);
  });

  container.appendChild(zonesContainer);

  // Feedback area
  const feedback = document.createElement('div');
  feedback.setAttribute('aria-live', 'polite');
  feedback.style.cssText = 'margin-top: var(--space-4);';
  container.appendChild(feedback);

  function createSortItem(item) {
    const el = document.createElement('div');
    el.className = 'sort-item';
    el.dataset.itemId = item.id;
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.setAttribute('aria-label', `${item.label}. Drag to a category or click to select, then click a category.`);
    el.draggable = true;

    if (isUKG) {
      el.style.cssText = 'min-height: 64px; font-size: var(--text-lg); padding: var(--space-4) var(--space-5);';
    }

    // Icon
    if (item.icon) {
      const icon = document.createElement('span');
      icon.style.fontSize = '1.4em';
      icon.textContent = item.icon;
      icon.setAttribute('aria-hidden', 'true');
      el.appendChild(icon);
    }

    // Label
    const label = document.createElement('span');
    label.textContent = item.label;
    el.appendChild(label);

    // Drag start
    el.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', item.id);
      el.classList.add('sort-item--dragging');
      setTimeout(() => el.style.opacity = '0.4', 0);
    });

    el.addEventListener('dragend', () => {
      el.classList.remove('sort-item--dragging');
      el.style.opacity = '';
    });

    // Click to select (tap alternative)
    el.addEventListener('click', () => {
      if (placedItems.has(item.id)) return;

      // Deselect previous
      if (selectedItem) {
        const prev = itemsPool.querySelector(`[data-item-id="${selectedItem.id}"]`);
        if (prev) prev.classList.remove('sort-item--selected');
      }

      selectedItem = item;
      el.classList.add('sort-item--selected');
      audio.playClick();
    });

    // Keyboard: Enter/Space to select, then arrow to zone
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        el.click();
      }
    });

    return el;
  }

  function placeItem(item, zone, zoneEl) {
    if (placedItems.has(item.id)) return;

    const isCorrect = item.zone === zone.id;
    placedItems.add(item.id);

    // Remove from pool
    const poolItem = itemsPool.querySelector(`[data-item-id="${item.id}"]`);

    if (isCorrect) {
      correctCount++;
      audio.playCorrect();

      // Move to zone
      if (poolItem) {
        poolItem.classList.remove('sort-item--selected');
        poolItem.classList.add('sort-item--correct');
        poolItem.draggable = false;
        poolItem.removeAttribute('tabindex');
        const zoneItems = zoneEl.querySelector('.sort-zone__items');
        zoneItems.appendChild(poolItem);
      }

      feedback.innerHTML = `
        <div class="quiz__feedback quiz__feedback--correct animate-slide-up">
          ✅ ${escapeHtml(item.label)} → ${escapeHtml(zone.title)}. Correct!
        </div>
      `;
    } else {
      placedItems.delete(item.id); // Allow retry
      audio.playIncorrect();

      if (poolItem) {
        poolItem.classList.remove('sort-item--selected');
        poolItem.classList.add('sort-item--incorrect');
        setTimeout(() => poolItem.classList.remove('sort-item--incorrect'), 800);
      }

      feedback.innerHTML = `
        <div class="quiz__feedback quiz__feedback--incorrect animate-slide-up">
          Hmm, ${escapeHtml(item.label)} doesn't go there. Try again! 🤔
        </div>
      `;
    }

    selectedItem = null;

    // Check completion
    if (placedItems.size === totalItems) {
      setTimeout(() => {
        const stars = correctCount === totalItems ? 3 : correctCount >= totalItems * 0.7 ? 2 : 1;
        onComplete({ correctCount, totalItems, stars });
      }, 800);
    }
  }

  return container;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

export default { renderSortGame };
