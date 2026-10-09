/**
 * Kids Computer Lab — Hotspot Interactive Diagram
 * SVG diagrams with clickable hotspots and keyboard-accessible alternatives.
 * @module ui/hotspot
 */

import audio from '../audio.js';

/**
 * Render a hotspot interactive diagram step.
 * @param {Object} stepData - Hotspot step data from lesson JSON
 * @param {Object} options
 * @param {boolean} options.isUKG - UKG mode
 * @param {Function} options.onAllVisited - Called when all hotspots explored
 * @returns {HTMLElement} Hotspot container
 */
export function renderHotspot(stepData, options = {}) {
  const { isUKG = false, onAllVisited = () => {} } = options;
  const container = document.createElement('div');
  container.className = 'step-content' + (isUKG ? ' step-content--ukg' : '');

  const visited = new Set();

  // Info display area
  const infoArea = document.createElement('div');
  infoArea.id = 'hotspot-info';
  infoArea.setAttribute('aria-live', 'polite');

  // Diagram area
  const diagramWrapper = document.createElement('div');
  diagramWrapper.className = 'hotspot-diagram';
  diagramWrapper.setAttribute('role', 'img');
  diagramWrapper.setAttribute('aria-label', stepData.diagramLabel || 'Interactive diagram');

  // Background SVG image
  if (stepData.svgContent) {
    const imgDiv = document.createElement('div');
    imgDiv.className = 'hotspot-diagram__image';
    imgDiv.innerHTML = stepData.svgContent;
    diagramWrapper.appendChild(imgDiv);
  }

  // Hotspot buttons
  stepData.hotspots.forEach((hs, idx) => {
    const btn = document.createElement('button');
    btn.className = 'hotspot-btn';
    btn.setAttribute('aria-label', `Learn about: ${hs.label}`);
    btn.setAttribute('tabindex', '0');
    btn.style.left = hs.x + '%';
    btn.style.top = hs.y + '%';
    btn.textContent = idx + 1;
    btn.dataset.id = hs.id;

    btn.addEventListener('click', () => {
      showHotspotInfo(hs, btn);
    });

    diagramWrapper.appendChild(btn);
  });

  container.appendChild(diagramWrapper);

  // Keyboard-accessible list alternative
  const listTitle = document.createElement('h4');
  listTitle.style.cssText = 'margin-top: var(--space-6); margin-bottom: var(--space-3); font-size: var(--text-lg);';
  listTitle.textContent = isUKG ? 'Tap to learn! 👆' : 'Click each part to learn about it:';
  container.appendChild(listTitle);

  const list = document.createElement('ul');
  list.className = 'hotspot-list';
  list.setAttribute('role', 'list');

  stepData.hotspots.forEach(hs => {
    const item = document.createElement('li');
    item.className = 'hotspot-list__item';
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.dataset.id = hs.id;

    // Icon
    const icon = document.createElement('span');
    icon.style.cssText = 'font-size: 1.5em; flex-shrink: 0;';
    icon.textContent = hs.icon || '🔍';
    icon.setAttribute('aria-hidden', 'true');
    item.appendChild(icon);

    // Label
    const label = document.createElement('span');
    label.style.cssText = 'font-weight: var(--font-weight-bold); flex: 1;';
    label.textContent = hs.label;
    item.appendChild(label);

    // Visit indicator
    const check = document.createElement('span');
    check.className = 'hotspot-check';
    check.style.cssText = 'font-size: 1.2em; opacity: 0;';
    check.textContent = '✅';
    check.setAttribute('aria-hidden', 'true');
    item.appendChild(check);

    item.addEventListener('click', () => showHotspotInfo(hs, item));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showHotspotInfo(hs, item);
      }
    });

    list.appendChild(item);
  });

  container.appendChild(list);
  container.appendChild(infoArea);

  function showHotspotInfo(hs, triggerEl) {
    audio.playClick();

    // Mark visited
    visited.add(hs.id);

    // Update diagram hotspot button
    const diagramBtn = diagramWrapper.querySelector(`[data-id="${hs.id}"]`);
    if (diagramBtn) diagramBtn.classList.add('hotspot-btn--visited');

    // Update list item
    const listItem = list.querySelector(`[data-id="${hs.id}"]`);
    if (listItem) {
      listItem.classList.add('hotspot-list__item--active');
      const check = listItem.querySelector('.hotspot-check');
      if (check) check.style.opacity = '1';
    }

    // Remove previous active states (except visited)
    list.querySelectorAll('.hotspot-list__item').forEach(li => {
      if (li.dataset.id !== hs.id) li.classList.remove('hotspot-list__item--active');
    });

    // Show info
    infoArea.innerHTML = `
      <div class="hotspot-info animate-slide-up">
        <div class="hotspot-info__title">${hs.icon || '📌'} ${escapeHtml(hs.label)}</div>
        <div class="hotspot-info__desc">${escapeHtml(hs.description)}</div>
      </div>
    `;

    // Check if all visited
    if (visited.size >= stepData.hotspots.length) {
      onAllVisited();
    }
  }

  return container;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

export default { renderHotspot };
