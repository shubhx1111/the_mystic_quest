// Edinburgh Quest — Learn View (Mission Browser)
import { getState, isMissionCompleted, isMissionUnlocked } from '../state.js';
import { LEVELS } from '../data/levels.js';
import { getLevelMissions } from '../data/missions.js';

export function renderLearn(params) {
  const state = getState();
  const levelId = parseInt(params?.[0]) || state.currentLevel;
  const level = LEVELS[levelId - 1];
  const missions = getLevelMissions(levelId);

  const container = document.getElementById('view-container');
  container.innerHTML = `
    <div class="learn-view">
      <div class="learn-header">
        <h1>📚 Learn</h1>
        <p>Browse all missions across all levels.</p>
      </div>

      <!-- LEVEL SELECTOR -->
      <div class="level-selector">
        ${LEVELS.map(l => `
          <button class="level-tab ${l.id === levelId ? 'level-tab-active' : ''} ${state.currentLevel < l.id ? 'level-tab-locked' : ''}"
            onclick="${state.currentLevel >= l.id ? `window.location.hash='learn/${l.id}'` : 'void(0)'}"
            title="${state.currentLevel < l.id ? 'Locked' : l.title}"
            style="${l.id === levelId ? `border-color:${l.color}; color:${l.color}` : ''}">
            ${l.icon} ${l.number}
            ${state.currentLevel < l.id ? '🔒' : state.currentLevel > l.id ? '🏆' : ''}
          </button>
        `).join('')}
      </div>

      <!-- CURRENT LEVEL DETAIL -->
      <div class="level-info glass-card" style="border-left: 4px solid ${level.color}">
        <div class="li-header">
          <span class="li-icon">${level.icon}</span>
          <div>
            <h2 style="color:${level.color}">Level ${level.number}: ${level.title}</h2>
            <p>${level.subtitle}</p>
          </div>
        </div>
        <p class="li-outcome">"${level.outcome}"</p>
        <div class="li-stats">
          <span>📅 ${level.totalDays} days</span>
          <span>⭐ ${level.totalDays * level.xpPerDay + level.bossXp} XP</span>
          ${levelId === state.currentLevel ? `<span>📍 Current: Day ${state.currentDay}</span>` : ''}
        </div>
      </div>

      <!-- MISSION LIST -->
      <div class="mission-list">
        ${missions.map(m => renderMissionRow(m, state, levelId)).join('')}
      </div>
    </div>
  `;
}

function renderMissionRow(mission, state, levelId) {
  const completed = isMissionCompleted(levelId, mission.day);
  const unlocked = isMissionUnlocked(levelId, mission.day);
  const mData = state.missionData?.[`${levelId}-${mission.day}`] || {};
  const isCurrent = levelId === state.currentLevel && mission.day === state.currentDay;

  return `
    <div class="mission-row ${completed ? 'row-completed' : ''} ${isCurrent ? 'row-current' : ''} ${!unlocked ? 'row-locked' : ''}"
         onclick="${unlocked ? `window.location.hash='mission/${levelId}/${mission.day}'` : 'void(0)'}">
      <div class="mr-day">
        <span class="mr-day-num">${String(mission.day).padStart(2, '0')}</span>
        ${mission.isBoss ? `<span class="boss-badge-small">${mission.bossType === 'level' ? '👑' : '⚔️'}</span>` : ''}
      </div>
      <div class="mr-info">
        <h3 class="mr-title">${mission.title}</h3>
        <p class="mr-subtitle">${mission.subtitle}</p>
        <div class="mr-meta">
          <span class="diff-badge diff-${(mission.difficulty || 'beginner').toLowerCase()}">${mission.difficulty}</span>
          <span class="mr-xp">⚡ ${mission.xp} XP</span>
          <span class="mr-time">⏱ ${mission.estimatedTime}</span>
          ${mData.quizScore !== undefined ? `<span class="mr-score">Quiz: ${mData.quizScore}%</span>` : ''}
        </div>
      </div>
      <div class="mr-status">
        ${!unlocked ? '🔒' : completed ? '✅' : isCurrent ? '▶️' : '→'}
      </div>
    </div>
  `;
}
