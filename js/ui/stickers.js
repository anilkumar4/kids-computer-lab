/**
 * Kids Computer Lab — Sticker Book
 * Renders the sticker book view based on completed lessons.
 */

import store from '../store.js';
import audio from '../audio.js';
import speech from '../speech.js';

// Predefined stickers mapped to lesson IDs
const STICKERS = [
  { id: 'a1', icon: '💻', name: 'First Look', track: 'explorers' },
  { id: 'a2', icon: '🖥️', name: 'Desk vs Lap', track: 'explorers' },
  { id: 'a3', icon: '🖱️', name: 'Part Finder', track: 'explorers' },
  { id: 'a4', icon: '🔌', name: 'Power Master', track: 'explorers' },
  { id: 'a5', icon: '🖲️', name: 'Mouse Master', track: 'explorers' },
  { id: 'b1', icon: '🧠', name: 'Hardware Hero', track: 'champions' },
  { id: 'b2', icon: '⌨️', name: 'Home Row', track: 'champions' },
  { id: 'b3', icon: '🦸', name: 'Internet Hero', track: 'champions' }
];

export function renderStickerBook(container) {
  container.innerHTML = `
    <div style="text-align:center; margin-bottom: var(--space-8);">
      <h1>🏆 My Sticker Book 🏆</h1>
      <p style="color:var(--color-text-secondary); margin-top:var(--space-2); font-size: var(--text-lg);">Complete lessons to unlock all the stickers!</p>
    </div>
    <div id="sticker-grid" class="track-grid stagger-children"></div>
  `;

  const grid = container.querySelector('#sticker-grid');
  
  // Calculate how many they have
  let unlockedCount = 0;

  STICKERS.forEach((sticker, index) => {
    const isUnlocked = store.isLessonCompleted(sticker.id);
    if (isUnlocked) unlockedCount++;

    const item = document.createElement('div');
    item.className = 'card animate-scale-in';
    item.style.animationDelay = `${index * 0.05}s`;
    item.style.textAlign = 'center';
    item.style.display = 'flex';
    item.style.flexDirection = 'column';
    item.style.alignItems = 'center';
    
    if (isUnlocked) {
      item.style.border = '2px solid var(--color-primary-light)';
      item.innerHTML = `
        <div style="font-size: 64px; margin-bottom: var(--space-4); filter: drop-shadow(0 4px 8px rgba(0,0,0,0.15)); transition: transform 0.2s; cursor: pointer;" 
             onmouseover="this.style.transform='scale(1.2) rotate(5deg)'" 
             onmouseout="this.style.transform='scale(1) rotate(0deg)'"
             onclick="window.speechSynthesis.speak(new SpeechSynthesisUtterance('You unlocked the ${sticker.name} sticker!'))">
          ${sticker.icon}
        </div>
        <h3 style="color: var(--color-primary);">${sticker.name}</h3>
      `;
    } else {
      item.style.background = 'var(--color-surface)';
      item.style.border = '2px dashed var(--color-surface-hover)';
      item.innerHTML = `
        <div style="font-size: 64px; margin-bottom: var(--space-4); opacity: 0.15; filter: grayscale(100%);">
          ❓
        </div>
        <h3 style="color: var(--color-text-muted);">Locked</h3>
      `;
    }

    grid.appendChild(item);
  });
  
  if (unlockedCount > 0) {
    audio.playStar();
    setTimeout(() => {
      speech.speak(`You have collected ${unlockedCount} stickers! Keep going!`);
    }, 500);
  } else {
    setTimeout(() => {
      speech.speak("Your sticker book is empty. Complete a lesson to earn your first sticker!");
    }, 500);
  }
}
