// Edinburgh Quest — App Entry Point
import { loadState, getState } from './state.js';
import { initRouter, registerRoute } from './router.js';
import { renderDashboard } from './views/dashboard.js';
import { renderQuestMap } from './views/questmap.js';
import { renderMission } from './views/mission.js';
import { renderCodingArena } from './views/codingArena.js';
import { renderProjects } from './views/projects.js';
import { renderSkills } from './views/skills.js';
import { renderCareer } from './views/career.js';
import { renderAchievements } from './views/achievements.js';
import { renderReminders } from './views/reminders.js';
import { renderSettings } from './views/settings.js';
import { renderLearn } from './views/learn.js';
import { LEVELS } from './data/levels.js';

// ── Nav Items (must be declared before bootstrap() runs) ────────────────
const NAV_ITEMS = [
  { icon: '🏠', label: 'Dashboard',    route: 'dashboard' },
  { icon: '🗺️', label: 'Quest Map',    route: 'quest-map' },
  { icon: '📚', label: 'Learn',         route: 'learn' },
  { icon: '⚔️', label: 'Coding Arena', route: 'coding-arena' },
  { icon: '🚀', label: 'Projects',      route: 'projects' },
  { icon: '🧠', label: 'Skills',        route: 'skills' },
  { icon: '🏴', label: 'Career',        route: 'career' },
  { icon: '🏆', label: 'Achievements',  route: 'achievements' },
  { icon: '⏰', label: 'Reminders',     route: 'reminders' },
  { icon: '⚙️', label: 'Settings',     route: 'settings' },
];

// ── Bootstrap ────────────────────────────────────────
// ES modules always defer past DOMContentLoaded, so call directly.
function bootstrap() {
  const state = loadState();

  // Apply saved theme
  if (state.settings?.theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  // First-time onboarding
  if (state.missionsCompleted === 0 && !state._onboarded) {
    showOnboarding(state);
    return;
  }

  initApp(state);
}

// Guard: run after DOM is ready (it always will be for modules, but be safe)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}

function initApp(state) {
  renderShell(state);
  registerRoutes();
  initRouter();
  setupGlobalListeners();
}

// ── Shell Render ────────────────────────────────────
function renderShell(state) {
  const level = LEVELS[state.currentLevel - 1];
  const app = document.getElementById('app');
  app.innerHTML = `
    <!-- SIDEBAR NAV -->
    <nav class="sidebar" id="sidebar">
      <div class="sidebar-brand" onclick="window.location.hash='dashboard'">
        <span class="brand-icon">🏴</span>
        <div class="brand-text">
          <span class="brand-title">Edinburgh</span>
          <span class="brand-sub">Quest</span>
        </div>
      </div>

      <!-- PLAYER CARD -->
      <div class="player-card">
        <div class="player-avatar" style="border-color: ${level.color}">
          ${state.playerName.charAt(0).toUpperCase()}
        </div>
        <div class="player-info">
          <div class="player-name" id="player-name-display">${state.playerName}</div>
          <div class="player-level" style="color:${level.color}">${level.icon} Level ${state.currentLevel}</div>
          <div class="player-xp">⭐ ${state.xp.toLocaleString()} XP</div>
        </div>
      </div>

      <!-- XP PROGRESS BAR (in level) -->
      <div class="level-xp-bar">
        <div class="level-xp-fill" style="width:${Math.round((state.currentDay/30)*100)}%; background:${level.color}"></div>
        <span class="level-xp-label">Day ${state.currentDay}/30</span>
      </div>

      <!-- STREAK -->
      <div class="sidebar-streak ${state.currentStreak > 0 ? 'streak-active' : ''}">
        🔥 ${state.currentStreak} day streak
      </div>

      <!-- NAVIGATION -->
      <nav class="nav-menu">
        ${NAV_ITEMS.map(item => `
          <a class="nav-item" data-route="${item.route}" href="#${item.route}"
             title="${item.label}">
            <span class="nav-icon">${item.icon}</span>
            <span class="nav-label">${item.label}</span>
            ${item.route === 'coding-arena' ? `<span class="nav-badge">${Object.keys(state.solvedChallenges || {}).length}</span>` : ''}
          </a>
        `).join('')}
      </nav>

      <!-- TODAY'S QUICK ACTION -->
      <div class="sidebar-quick-action">
        <button class="btn btn-primary btn-full" onclick="window.location.hash='mission/${state.currentLevel}/${state.currentDay}'">
          ⚔️ Today's Quest
        </button>
      </div>
    </nav>

    <!-- MOBILE HEADER -->
    <header class="mobile-header">
      <button class="mobile-menu-btn" onclick="toggleSidebar()">☰</button>
      <div class="mobile-brand">🏴 Edinburgh Quest</div>
      <div class="mobile-xp">⭐ ${state.xp.toLocaleString()}</div>
    </header>

    <!-- MAIN CONTENT -->
    <main class="main-content">
      <div id="view-container" class="view-container"></div>
    </main>

    <!-- TOAST NOTIFICATIONS -->
    <div class="toast-container" id="toast-container"></div>

    <!-- ACHIEVEMENT POPUP -->
    <div class="achievement-popup" id="achievement-popup" style="display:none"></div>
  `;
}

// NAV_ITEMS moved to top of file to avoid TDZ error

// ── Routes ───────────────────────────────────────────
function registerRoutes() {
  registerRoute('dashboard', (p) => safeRender('Dashboard', renderDashboard, p));
  registerRoute('quest-map', (p) => safeRender('Quest Map', renderQuestMap, p));
  registerRoute('learn', (p) => safeRender('Learn', renderLearn, p));
  registerRoute('mission', (p) => safeRender('Mission', renderMission, p));
  registerRoute('coding-arena', (p) => safeRender('Coding Arena', renderCodingArena, p));
  registerRoute('projects', (p) => safeRender('Projects', renderProjects, p));
  registerRoute('skills', (p) => safeRender('Skills', renderSkills, p));
  registerRoute('career', (p) => safeRender('Career', renderCareer, p));
  registerRoute('achievements', (p) => safeRender('Achievements', renderAchievements, p));
  registerRoute('reminders', (p) => safeRender('Reminders', renderReminders, p));
  registerRoute('settings', (p) => safeRender('Settings', renderSettings, p));
}

function safeRender(title, renderFn, params) {
  setPageTitle(title);
  // Auto-close sidebar on mobile navigation
  document.getElementById('sidebar')?.classList.remove('sidebar-open');
  try {
    renderFn(params);
  } catch (err) {
    console.error(`Error rendering view [${title}]:`, err);
    const container = document.getElementById('view-container');
    if (container) {
      container.innerHTML = `
        <div class="glass-card" style="text-align:center; padding: 3rem 1.5rem; max-width: 500px; margin: 2rem auto;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
          <h2 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--text-primary);">Something went wrong while loading this page</h2>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">Don't worry, your progress is safe.</p>
          <div style="display: flex; gap: 0.75rem; justify-content: center;">
            <button class="btn btn-primary" onclick="window.location.reload()">Try Again ↺</button>
            <button class="btn btn-ghost" onclick="window.location.hash='dashboard'">Go to Dashboard</button>
          </div>
        </div>
      `;
    }
  }
}

function setPageTitle(page) {
  document.title = `${page} | Edinburgh Quest 🏴`;
  // Scroll to top
  document.getElementById('view-container')?.scrollTo(0, 0);
  window.scrollTo(0, 0);
}

// ── Global Listeners ─────────────────────────────────
function setupGlobalListeners() {
  // Achievement unlock popup
  window.addEventListener('achievement-unlocked', (e) => {
    showAchievementPopup(e.detail);
  });

  // Toast notifications
  window.addEventListener('show-toast', (e) => {
    showToast(e.detail.msg, e.detail.type);
  });

  // Sidebar nav active state
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '').split('/')[0] || 'dashboard';
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.toggle('nav-active', el.dataset.route === hash);
    });
  });
}

// ── Onboarding ───────────────────────────────────────
function showOnboarding(state) {
  document.getElementById('app').innerHTML = `
    <div class="onboarding-overlay">
      <div class="onboarding-card glass-card">
        <div class="onboarding-logo">🏴</div>
        <h1>Welcome to Edinburgh Quest</h1>
        <p class="onboarding-subtitle">A 360-day software engineering journey.<br>
        Every level makes you more employable.</p>

        <div class="onboarding-field">
          <label>What's your name?</label>
          <input class="text-input text-input-large" id="onboarding-name"
            placeholder="e.g. Shubhi" value="${state.playerName}">
        </div>

        <div class="onboarding-preview">
          <div class="preview-item">⭐ 0 XP to start</div>
          <div class="preview-item">📍 Level 01 — The Awakening</div>
          <div class="preview-item">🏴 Edinburgh in 360 days</div>
        </div>

        <button class="btn btn-primary btn-xl btn-full" onclick="startQuest()">
          ⚔️ Begin Your Quest
        </button>
        <p class="onboarding-note">All progress is saved locally in your browser.</p>
      </div>
    </div>
  `;
}

window.startQuest = function() {
  const name = document.getElementById('onboarding-name')?.value?.trim() || 'Adventurer';
  const { updateState } = window.__edinburghQuestState || {};
  // Direct localStorage
  const raw = localStorage.getItem('edinburghQuest_v1');
  const s = raw ? JSON.parse(raw) : {};
  s.playerName = name;
  s._onboarded = true;
  localStorage.setItem('edinburghQuest_v1', JSON.stringify(s));
  location.reload();
};

// ── UI Helpers ───────────────────────────────────────
window.toggleSidebar = function() {
  document.getElementById('sidebar')?.classList.toggle('sidebar-open');
};

function showToast(msg, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${msg}</span><button onclick="this.parentElement.remove()">✕</button>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

function showAchievementPopup(achievement) {
  const popup = document.getElementById('achievement-popup');
  if (!popup) return;
  popup.style.display = 'flex';
  popup.innerHTML = `
    <div class="ach-popup-content glass-card">
      <div class="ach-popup-glow"></div>
      <div class="ach-popup-icon">${achievement.icon}</div>
      <div class="ach-popup-text">
        <div class="ach-popup-label">Achievement Unlocked!</div>
        <div class="ach-popup-title">${achievement.title}</div>
        <div class="ach-popup-xp">+${achievement.xp} XP</div>
      </div>
    </div>
  `;
  setTimeout(() => { popup.style.display = 'none'; }, 4000);
}
