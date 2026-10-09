/**
 * Kids Computer Lab — Bolt Mascot UI
 * SVG mascot with expression changes and speech bubbles.
 * @module ui/mascot
 */

/** SVG paths for Bolt's expressions */
const EXPRESSIONS = {
  wave: {
    eyes: 'happy',
    mouth: 'smile',
    leftArm: 'wave',
    antenna: 'glow'
  },
  happy: {
    eyes: 'happy',
    mouth: 'big-smile',
    leftArm: 'down',
    antenna: 'glow'
  },
  thinking: {
    eyes: 'look-up',
    mouth: 'hmm',
    leftArm: 'chin',
    antenna: 'pulse'
  },
  encouraging: {
    eyes: 'kind',
    mouth: 'smile',
    leftArm: 'thumbsup',
    antenna: 'glow'
  },
  celebrate: {
    eyes: 'sparkle',
    mouth: 'big-smile',
    leftArm: 'up',
    antenna: 'burst'
  },
  pointing: {
    eyes: 'look-right',
    mouth: 'smile',
    leftArm: 'point',
    antenna: 'glow'
  }
};

/**
 * Generate Bolt's SVG with a given expression.
 * @param {string} expression - Expression key
 * @param {number} size - SVG width/height
 * @returns {string} SVG markup
 */
export function createBoltSVG(expression = 'wave', size = 120) {
  const expr = EXPRESSIONS[expression] || EXPRESSIONS.wave;

  // Eye shapes
  const eyeMap = {
    'happy': `
      <ellipse cx="75" cy="80" rx="10" ry="11" fill="#fff"/>
      <ellipse cx="125" cy="80" rx="10" ry="11" fill="#fff"/>
      <circle cx="77" cy="82" r="5" fill="#2c3e50"/>
      <circle cx="127" cy="82" r="5" fill="#2c3e50"/>
      <circle cx="79" cy="80" r="2" fill="#fff"/>
      <circle cx="129" cy="80" r="2" fill="#fff"/>
    `,
    'look-up': `
      <ellipse cx="75" cy="80" rx="10" ry="11" fill="#fff"/>
      <ellipse cx="125" cy="80" rx="10" ry="11" fill="#fff"/>
      <circle cx="77" cy="76" r="5" fill="#2c3e50"/>
      <circle cx="127" cy="76" r="5" fill="#2c3e50"/>
      <circle cx="79" cy="74" r="2" fill="#fff"/>
      <circle cx="129" cy="74" r="2" fill="#fff"/>
    `,
    'kind': `
      <ellipse cx="75" cy="80" rx="10" ry="11" fill="#fff"/>
      <ellipse cx="125" cy="80" rx="10" ry="11" fill="#fff"/>
      <circle cx="75" cy="82" r="5" fill="#2c3e50"/>
      <circle cx="125" cy="82" r="5" fill="#2c3e50"/>
      <circle cx="77" cy="80" r="2" fill="#fff"/>
      <circle cx="127" cy="80" r="2" fill="#fff"/>
      <path d="M65 73 Q75 68 85 73" stroke="#2c3e50" stroke-width="2" fill="none"/>
      <path d="M115 73 Q125 68 135 73" stroke="#2c3e50" stroke-width="2" fill="none"/>
    `,
    'sparkle': `
      <ellipse cx="75" cy="80" rx="11" ry="12" fill="#fff"/>
      <ellipse cx="125" cy="80" rx="11" ry="12" fill="#fff"/>
      <circle cx="75" cy="80" r="5" fill="#2c3e50"/>
      <circle cx="125" cy="80" r="5" fill="#2c3e50"/>
      <circle cx="78" cy="78" r="2.5" fill="#fff"/>
      <circle cx="128" cy="78" r="2.5" fill="#fff"/>
      <path d="M63 72 l3 -5 3 5 -5 -3 5 0z" fill="#f1c40f" opacity="0.8"/>
      <path d="M133 72 l3 -5 3 5 -5 -3 5 0z" fill="#f1c40f" opacity="0.8"/>
    `,
    'look-right': `
      <ellipse cx="75" cy="80" rx="10" ry="11" fill="#fff"/>
      <ellipse cx="125" cy="80" rx="10" ry="11" fill="#fff"/>
      <circle cx="80" cy="82" r="5" fill="#2c3e50"/>
      <circle cx="130" cy="82" r="5" fill="#2c3e50"/>
      <circle cx="82" cy="80" r="2" fill="#fff"/>
      <circle cx="132" cy="80" r="2" fill="#fff"/>
    `
  };

  // Mouth shapes
  const mouthMap = {
    'smile': `<path d="M82 100 Q100 114 118 100" stroke="#2c3e50" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    'big-smile': `<path d="M78 98 Q100 118 122 98" stroke="#2c3e50" stroke-width="3" fill="#fff" stroke-linecap="round"/>`,
    'hmm': `<ellipse cx="100" cy="104" rx="8" ry="5" fill="#2c3e50" opacity="0.6"/>`
  };

  // Left arm positions
  const armMap = {
    'wave': `<g class="bolt-wave-arm">
      <path d="M52 120 Q30 100 25 75" stroke="#f0a03c" stroke-width="8" fill="none" stroke-linecap="round"/>
      <circle cx="23" cy="72" r="8" fill="#e8e8e8" stroke="#d0d0d0" stroke-width="1.5"/>
    </g>`,
    'down': `<g>
      <path d="M52 120 Q40 140 35 160" stroke="#f0a03c" stroke-width="8" fill="none" stroke-linecap="round"/>
      <circle cx="33" cy="162" r="8" fill="#e8e8e8" stroke="#d0d0d0" stroke-width="1.5"/>
    </g>`,
    'chin': `<g>
      <path d="M52 120 Q45 105 70 108" stroke="#f0a03c" stroke-width="8" fill="none" stroke-linecap="round"/>
      <circle cx="72" cy="106" r="8" fill="#e8e8e8" stroke="#d0d0d0" stroke-width="1.5"/>
    </g>`,
    'thumbsup': `<g>
      <path d="M52 120 Q30 110 28 90" stroke="#f0a03c" stroke-width="8" fill="none" stroke-linecap="round"/>
      <circle cx="26" cy="87" r="8" fill="#e8e8e8" stroke="#d0d0d0" stroke-width="1.5"/>
      <line x1="26" y1="79" x2="26" y2="72" stroke="#e8e8e8" stroke-width="4" stroke-linecap="round"/>
    </g>`,
    'up': `<g>
      <path d="M52 120 Q25 90 30 60" stroke="#f0a03c" stroke-width="8" fill="none" stroke-linecap="round"/>
      <circle cx="28" cy="57" r="8" fill="#e8e8e8" stroke="#d0d0d0" stroke-width="1.5"/>
    </g>`,
    'point': `<g>
      <path d="M148 120 Q170 110 180 95" stroke="#f0a03c" stroke-width="8" fill="none" stroke-linecap="round"/>
      <circle cx="182" cy="92" r="8" fill="#e8e8e8" stroke="#d0d0d0" stroke-width="1.5"/>
      <line x1="188" y1="88" x2="196" y2="82" stroke="#e8e8e8" stroke-width="4" stroke-linecap="round"/>
    </g>`
  };

  // Antenna effects
  const antennaMap = {
    'glow': `<circle cx="100" cy="22" r="7" fill="#f1c40f" opacity="0.8"/>
             <circle cx="100" cy="22" r="4" fill="#f39c12"/>`,
    'pulse': `<circle cx="100" cy="22" r="7" fill="#3498db" opacity="0.6">
                <animate attributeName="r" values="7;10;7" dur="1.5s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.6;0.3;0.6" dur="1.5s" repeatCount="indefinite"/>
              </circle>
              <circle cx="100" cy="22" r="4" fill="#2d9dd4"/>`,
    'burst': `<circle cx="100" cy="22" r="7" fill="#f1c40f">
                <animate attributeName="r" values="7;12;7" dur="0.8s" repeatCount="indefinite"/>
              </circle>
              <circle cx="100" cy="22" r="4" fill="#f39c12"/>`
  };

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="${size}" height="${size}" role="img" aria-label="Bolt the robot mascot">
    <!-- Antenna -->
    <line x1="100" y1="45" x2="100" y2="28" stroke="#b0bec5" stroke-width="4" stroke-linecap="round"/>
    ${antennaMap[expr.antenna] || antennaMap.glow}

    <!-- Head -->
    <rect x="55" y="42" width="90" height="72" rx="22" fill="#7ec8e3" stroke="#5cb3d4" stroke-width="2"/>

    <!-- Head highlight -->
    <ellipse cx="85" cy="55" rx="25" ry="8" fill="#a8dff0" opacity="0.5"/>

    <!-- Ears -->
    <rect x="42" y="65" width="15" height="22" rx="6" fill="#f0a03c" stroke="#d4882a" stroke-width="1.5"/>
    <rect x="143" y="65" width="15" height="22" rx="6" fill="#f0a03c" stroke="#d4882a" stroke-width="1.5"/>

    <!-- Eyes -->
    <g style="transform-origin: center; animation: blink 4s infinite;">
      ${eyeMap[expr.eyes] || eyeMap.happy}
    </g>

    <!-- Cheeks -->
    <ellipse cx="65" cy="94" rx="7" ry="4" fill="#f8a4a4" opacity="0.4"/>
    <ellipse cx="135" cy="94" rx="7" ry="4" fill="#f8a4a4" opacity="0.4"/>

    <!-- Mouth -->
    ${mouthMap[expr.mouth] || mouthMap.smile}

    <!-- Body -->
    <rect x="60" y="115" width="80" height="52" rx="18" fill="#7ec8e3" stroke="#5cb3d4" stroke-width="2"/>

    <!-- Chest panel -->
    <rect x="76" y="123" width="48" height="34" rx="8" fill="#e8f4f8" stroke="#b8d8e8" stroke-width="1.5"/>

    <!-- Chest "B" emblem -->
    <text x="100" y="148" text-anchor="middle" font-size="22" font-weight="bold" fill="#f0a03c" font-family="sans-serif">B</text>

    <!-- Chest buttons -->
    <circle cx="88" cy="152" r="3" fill="#3498db"/>
    <circle cx="112" cy="152" r="3" fill="#e74c3c"/>

    <!-- Right arm -->
    <path d="M148 120 Q165 140 160 165" stroke="#f0a03c" stroke-width="8" fill="none" stroke-linecap="round"/>
    <circle cx="158" cy="167" r="8" fill="#e8e8e8" stroke="#d0d0d0" stroke-width="1.5"/>

    <!-- Left arm (expression-dependent) -->
    ${armMap[expr.leftArm] || armMap.down}

    <!-- Legs -->
    <rect x="75" y="165" width="14" height="18" rx="5" fill="#b0bec5" stroke="#90a4ae" stroke-width="1.5"/>
    <rect x="111" y="165" width="14" height="18" rx="5" fill="#b0bec5" stroke="#90a4ae" stroke-width="1.5"/>

    <!-- Feet -->
    <ellipse cx="82" cy="185" rx="14" ry="7" fill="#f0a03c" stroke="#d4882a" stroke-width="1.5"/>
    <ellipse cx="118" cy="185" rx="14" ry="7" fill="#f0a03c" stroke="#d4882a" stroke-width="1.5"/>
  </svg>`;
}

/**
 * Render a mascot area with speech bubble.
 * @param {Object} options
 * @param {string} options.expression - Bolt expression
 * @param {string} options.text - Speech bubble text
 * @param {boolean} options.isUKG - Use larger bubble for UKG
 * @returns {string} HTML markup
 */
export function createMascotArea(options = {}) {
  const {
    expression = 'wave',
    text = '',
    isUKG = false
  } = options;

  const bubbleClass = isUKG ? 'speech-bubble speech-bubble--ukg' : 'speech-bubble';

  return `
    <div class="mascot-area">
      <div class="mascot-area__character animate-float" aria-hidden="true">
        ${createBoltSVG(expression, isUKG ? 100 : 80)}
      </div>
      ${text ? `
        <div class="${bubbleClass}" role="status" aria-live="polite">
          ${escapeHtml(text)}
        </div>
      ` : ''}
    </div>
  `;
}

/** Escape HTML to prevent injection */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

export default { createBoltSVG, createMascotArea };
