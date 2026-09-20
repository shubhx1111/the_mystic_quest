// Edinburgh Quest — Settings View
import { getState, updateState, resetAllProgress } from '../state.js';

export function renderSettings() {
  const state = getState();

  const container = document.getElementById('view-container');
  container.innerHTML = `
    <div class="settings-view">
      <h1>⚙️ Settings</h1>

      <!-- PROFILE -->
      <section class="settings-section glass-card">
        <h2>👤 Profile</h2>
        <div class="settings-field">
          <label>Player Name</label>
          <input class="text-input" id="settings-name" value="${escHtml(state.playerName)}"
            placeholder="Your name">
        </div>
        <div class="settings-field">
          <label>Journey Started</label>
          <span class="settings-value">${new Date(state.joinedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>
        <button class="btn btn-primary btn-sm" onclick="saveProfile()">Save Profile</button>
      </section>

      <!-- PREFERENCES -->
      <section class="settings-section glass-card">
        <h2>🎨 Preferences</h2>
        <div class="settings-field">
          <label>Theme</label>
          <div class="toggle-row">
            <button class="theme-btn ${state.settings?.theme !== 'light' ? 'active' : ''}"
              onclick="setTheme('dark')">🌑 Dark</button>
            <button class="theme-btn ${state.settings?.theme === 'light' ? 'active' : ''}"
              onclick="setTheme('light')">☀️ Light</button>
          </div>
        </div>
        <div class="settings-field">
          <label>Sound Effects</label>
          <label class="toggle-switch">
            <input type="checkbox" id="setting-sound" ${state.settings?.sound ? 'checked' : ''}
              onchange="updateSetting('sound', this.checked)">
            <span class="toggle-slider"></span>
          </label>
        </div>
        <div class="settings-field">
          <label>Animations</label>
          <label class="toggle-switch">
            <input type="checkbox" id="setting-animations" ${state.settings?.animations !== false ? 'checked' : ''}
              onchange="updateSetting('animations', this.checked)">
            <span class="toggle-slider"></span>
          </label>
        </div>
      </section>

      <!-- STATS SUMMARY -->
      <section class="settings-section glass-card">
        <h2>📊 Your Stats</h2>
        <table class="stats-table">
          <tr><td>Total XP</td><td>${state.xp.toLocaleString()}</td></tr>
          <tr><td>Missions Completed</td><td>${state.missionsCompleted} / 360</td></tr>
          <tr><td>Current Level</td><td>${state.currentLevel} / 12</td></tr>
          <tr><td>Current Streak</td><td>${state.currentStreak} days</td></tr>
          <tr><td>Longest Streak</td><td>${state.longestStreak} days</td></tr>
          <tr><td>DSA Problems</td><td>${state.dsaProblems}</td></tr>
          <tr><td>Achievements</td><td>${state.unlockedAchievements.length} / 29</td></tr>
          <tr><td>Consistency Rate</td><td>${state.consistencyRate}%</td></tr>
        </table>
      </section>

      <!-- DATA MANAGEMENT -->
      <section class="settings-section glass-card danger-section">
        <h2>⚠️ Data Management</h2>
        <div class="settings-field">
          <div>
            <h4>Export Progress</h4>
            <p>Download your quest data as JSON.</p>
          </div>
          <button class="btn btn-ghost" onclick="exportData()">Export JSON</button>
        </div>
        <div class="settings-field">
          <div>
            <h4>Import Progress</h4>
            <p>Restore from a previous export.</p>
          </div>
          <input type="file" id="import-file" accept=".json" style="display:none" onchange="importData(this)">
          <button class="btn btn-ghost" onclick="document.getElementById('import-file').click()">Import JSON</button>
        </div>
        <div class="settings-field danger-field">
          <div>
            <h4>Reset All Progress</h4>
            <p>This will erase everything and cannot be undone.</p>
          </div>
          <button class="btn btn-danger" onclick="confirmReset()">Reset Everything</button>
        </div>
      </section>

      <!-- ABOUT -->
      <section class="settings-section glass-card">
        <h2>ℹ️ About</h2>
        <p><strong>Edinburgh Quest</strong> — a 360-day software engineering RPG</p>
        <p>Built with vanilla HTML, CSS, and JavaScript. Data stored locally in your browser.</p>
        <p>Version 1.0.0</p>
      </section>
    </div>
  `;
}

window.saveProfile = function() {
  const name = document.getElementById('settings-name')?.value?.trim();
  if (!name) return;
  updateState({ playerName: name });
  // Update header
  const nameEl = document.getElementById('player-name-display');
  if (nameEl) nameEl.textContent = name;
  window.dispatchEvent(new CustomEvent('show-toast', { detail: { msg: 'Profile saved!', type: 'success' } }));
};

window.setTheme = function(theme) {
  const state = getState();
  updateState({ settings: { ...state.settings, theme } });
  document.documentElement.setAttribute('data-theme', theme);
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.includes(theme === 'dark' ? 'Dark' : 'Light'));
  });
};

window.updateSetting = function(key, value) {
  const state = getState();
  updateState({ settings: { ...state.settings, [key]: value } });
};

window.exportData = function() {
  const state = getState();
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `edinburgh-quest-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
};

window.importData = function(input) {
  const file = input.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      localStorage.setItem('edinburghQuest_v1', JSON.stringify(data));
      location.reload();
    } catch {
      alert('Invalid file. Please use a valid Edinburgh Quest backup JSON.');
    }
  };
  reader.readAsText(file);
};

window.confirmReset = function() {
  if (confirm('⚠️ Are you absolutely sure? This will delete ALL your progress.\n\nType DELETE to confirm.')) {
    const input = prompt('Type DELETE to confirm:');
    if (input === 'DELETE') {
      resetAllProgress();
      location.reload();
    }
  }
};

function escHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
