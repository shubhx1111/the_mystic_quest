// Edinburgh Quest — Quest Map View
import { getState, isMissionCompleted, isMissionUnlocked } from '../state.js';
import { LEVELS } from '../data/levels.js';
import { navigate } from '../router.js';

export function renderQuestMap() {
  const state = getState();

  const container = document.getElementById('view-container');
  container.innerHTML = `
    <div class="quest-map-view">
      <div class="quest-map-header">
        <h1>🗺️ Edinburgh Quest Map</h1>
        <p>Your journey from <strong>The Awakening</strong> to <strong>🏴 Edinburgh</strong></p>
      </div>

      <div class="world-map">
        <!-- START marker -->
        <div class="map-start">
          <div class="start-marker">🌟 BEGIN</div>
          <div class="map-path-line"></div>
        </div>

        <!-- LEVELS -->
        ${LEVELS.map((level, i) => renderLevelNode(level, state)).join('')}

        <!-- EDINBURGH DESTINATION -->
        <div class="map-destination ${state.missionsCompleted >= 360 ? 'reached' : ''}">
          <div class="dest-glow"></div>
          <div class="dest-icon">🏴</div>
          <div class="dest-title">EDINBURGH</div>
          <div class="dest-subtitle">${state.missionsCompleted >= 360 ? '✅ REACHED' : 'Your Destination'}</div>
        </div>
      </div>

      <!-- LEVEL DETAILS PANEL (shown when a level is clicked) -->
      <div class="level-detail-panel glass-card" id="level-detail" style="display:none"></div>
    </div>
  `;

  // Click handlers
  document.querySelectorAll('.map-level-node').forEach(node => {
    node.addEventListener('click', () => {
      const levelId = parseInt(node.dataset.level);
      showLevelDetail(levelId, state);
    });
  });
}

function renderLevelNode(level, state) {
  const isCompleted = state.currentLevel > level.id;
  const isCurrent = state.currentLevel === level.id;
  const isLocked = state.currentLevel < level.id;

  const completedDays = isCompleted ? 30 :
    (isCurrent ? state.currentDay - 1 : 0);
  const progress = Math.round((completedDays / 30) * 100);

  let statusClass = isLocked ? 'locked' : (isCompleted ? 'completed' : 'current');
  let statusIcon = isLocked ? '🔒' : (isCompleted ? '🏆' : '⚡');
  let glowColor = isCurrent ? level.color : (isCompleted ? '#48bb78' : 'transparent');

  return `
    <div class="map-level-wrapper">
      <div class="map-connector ${isLocked ? 'connector-locked' : 'connector-active'}"></div>
      <div class="map-level-node ${statusClass}" data-level="${level.id}"
           style="${isCurrent ? `--glow-color: ${level.color}` : ''}">
        <div class="node-status-icon">${statusIcon}</div>
        <div class="node-icon ${isCurrent ? 'node-pulse' : ''}">${level.icon}</div>
        <div class="node-info">
          <div class="node-number">LEVEL ${level.number}</div>
          <div class="node-title">${level.title}</div>
          <div class="node-location">${level.location}</div>
          ${isCurrent ? `
            <div class="node-progress">
              <div class="node-progress-bar" style="width:${progress}%; background:${level.color}"></div>
            </div>
            <div class="node-progress-label">Day ${state.currentDay}/30 · ${progress}%</div>
          ` : isCompleted ? `
            <div class="node-complete-badge">COMPLETE ✓</div>
          ` : `
            <div class="node-locked-label">Unlocks at Day ${(level.id - 1) * 30 + 1}</div>
          `}
        </div>
        ${isCurrent ? `<div class="current-glow" style="border-color:${level.color}; box-shadow: 0 0 30px ${level.color}40"></div>` : ''}
      </div>
    </div>
  `;
}

function showLevelDetail(levelId, state) {
  const level = LEVELS[levelId - 1];
  const isLocked = state.currentLevel < levelId;
  const isCompleted = state.currentLevel > levelId;
  const isCurrent = state.currentLevel === levelId;

  const panel = document.getElementById('level-detail');
  panel.style.display = 'block';
  panel.innerHTML = `
    <div class="level-detail-content">
      <div class="ld-header" style="border-left: 4px solid ${level.color}">
        <div class="ld-icon">${level.icon}</div>
        <div class="ld-meta">
          <span class="ld-number">LEVEL ${level.number}</span>
          <h2 class="ld-title">${level.title}</h2>
          <p class="ld-subtitle">${level.subtitle}</p>
        </div>
        <button class="btn-close" onclick="document.getElementById('level-detail').style.display='none'">✕</button>
      </div>

      <p class="ld-description">${level.description}</p>

      <div class="ld-outcome">
        <span class="outcome-label">FINAL OUTCOME</span>
        <span class="outcome-text">"${level.outcome}"</span>
      </div>

      <div class="ld-topics">
        <h4>Topics Covered</h4>
        <div class="topic-tags">
          ${level.topics.map(t => `<span class="topic-tag">${t}</span>`).join('')}
        </div>
      </div>

      ${!isLocked ? `
      <div class="ld-stats">
        <div class="ld-stat">
          <span class="ld-stat-val">${level.totalDays}</span>
          <span class="ld-stat-label">Days</span>
        </div>
        <div class="ld-stat">
          <span class="ld-stat-val">${level.totalDays * level.xpPerDay + level.bossXp}</span>
          <span class="ld-stat-label">Total XP</span>
        </div>
        <div class="ld-stat">
          <span class="ld-stat-val">4</span>
          <span class="ld-stat-label">Bosses</span>
        </div>
      </div>

      <div class="ld-actions">
        ${isCurrent ? `
          <button class="btn btn-primary" onclick="window.location.hash='mission/${levelId}/${state.currentDay}'">
            Continue Level ${levelId}
          </button>
        ` : isCompleted ? `
          <button class="btn btn-ghost" onclick="window.location.hash='mission/${levelId}/1'">
            Review Level ${levelId}
          </button>
        ` : ''}
        <button class="btn btn-ghost btn-sm" onclick="window.location.hash='learn/${levelId}'">
          View All Missions →
        </button>
      </div>
      ` : `
      <div class="ld-locked-msg">
        🔒 Complete Level ${levelId - 1} to unlock this level.
      </div>
      `}
    </div>
  `;

  panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
