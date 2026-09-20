// Edinburgh Quest — Achievements View
import { getState } from '../state.js';
import { ACHIEVEMENTS } from '../data/achievements.js';

export function renderAchievements() {
  const state = getState();
  const unlocked = new Set(state.unlockedAchievements);
  const unlockedList = ACHIEVEMENTS.filter(a => unlocked.has(a.id));
  const lockedList = ACHIEVEMENTS.filter(a => !unlocked.has(a.id));

  const container = document.getElementById('view-container');
  container.innerHTML = `
    <div class="achievements-view">
      <div class="achievements-header">
        <h1>🏆 Achievements</h1>
        <p class="ach-summary">
          <span class="ach-count">${unlockedList.length}</span> unlocked of
          <span class="ach-total">${ACHIEVEMENTS.length}</span> total
        </p>
        <div class="ach-progress-bar-track">
          <div class="ach-progress-bar-fill"
            style="width:${Math.round((unlockedList.length / ACHIEVEMENTS.length) * 100)}%"></div>
        </div>
      </div>

      <!-- UNLOCKED -->
      ${unlockedList.length > 0 ? `
      <section class="ach-section">
        <h2 class="ach-section-title">✅ Unlocked (${unlockedList.length})</h2>
        <div class="ach-grid">
          ${unlockedList.map(a => renderAchievementCard(a, true)).join('')}
        </div>
      </section>
      ` : ''}

      <!-- LOCKED -->
      <section class="ach-section">
        <h2 class="ach-section-title">🔒 Locked (${lockedList.length})</h2>
        <div class="ach-grid">
          ${lockedList.map(a => renderAchievementCard(a, false)).join('')}
        </div>
      </section>
    </div>
  `;
}

function renderAchievementCard(achievement, unlocked) {
  return `
    <div class="ach-card glass-card ${unlocked ? 'ach-unlocked' : 'ach-locked'}">
      <div class="ach-icon ${unlocked ? '' : 'ach-icon-locked'}">${achievement.icon}</div>
      <div class="ach-info">
        <h3 class="ach-title">${unlocked ? achievement.title : '???'}</h3>
        <p class="ach-desc">${unlocked ? achievement.desc : 'Keep questing to unlock...'}</p>
        ${unlocked ? `<span class="ach-xp">+${achievement.xp} XP</span>` : ''}
      </div>
      ${unlocked ? '<div class="ach-check">✅</div>' : '<div class="ach-lock">🔒</div>'}
    </div>
  `;
}
