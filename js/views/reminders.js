// Edinburgh Quest — Reminders View
import { getState, updateState } from '../state.js';

const REMINDER_TYPES = [
  { id: 'morning', label: '🌅 Morning Reminder', desc: 'Start your day with intention.', defaultTime: '07:00' },
  { id: 'daily', label: '📖 Daily Mission', desc: 'Time to complete today\'s quest.', defaultTime: '19:00' },
  { id: 'evening', label: '🌙 Evening Check-in', desc: 'Reflect on today\'s learning.', defaultTime: '21:00' },
  { id: 'streak', label: '🔥 Streak Warning', desc: 'Don\'t break your streak!', defaultTime: '20:00' },
  { id: 'weekly-boss', label: '⚔️ Weekly Boss', desc: 'Boss fight incoming — prepare!', defaultTime: '09:00' },
];

export function renderReminders() {
  const state = getState();
  const reminders = state.settings?.reminders || {};
  const notifGranted = Notification?.permission === 'granted';

  const container = document.getElementById('view-container');
  container.innerHTML = `
    <div class="reminders-view">
      <div class="reminders-header">
        <h1>⏰ Reminders</h1>
        <p>Stay on track with customisable quest reminders.</p>
      </div>

      ${!notifGranted ? `
      <div class="notification-prompt glass-card">
        <div class="notif-icon">🔔</div>
        <div>
          <h3>Enable Browser Notifications</h3>
          <p>Allow notifications to receive quest reminders even when the tab isn't active.</p>
        </div>
        <button class="btn btn-primary" onclick="requestNotifPermission()">Enable Notifications</button>
      </div>
      ` : `
      <div class="notification-granted glass-card">
        <span>✅ Notifications enabled</span>
      </div>
      `}

      <div class="reminders-grid">
        ${REMINDER_TYPES.map(r => {
          const saved = reminders[r.id] || { enabled: false, time: r.defaultTime };
          return `
          <div class="reminder-card glass-card">
            <div class="reminder-header">
              <div class="reminder-title-group">
                <h3>${r.label}</h3>
                <p>${r.desc}</p>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="rem-${r.id}" ${saved.enabled ? 'checked' : ''}
                  onchange="toggleReminder('${r.id}', this.checked)">
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="reminder-time-row ${saved.enabled ? '' : 'disabled'}">
              <label>Time:</label>
              <input type="time" class="time-input" id="rem-time-${r.id}"
                value="${saved.time}"
                onchange="setReminderTime('${r.id}', this.value)"
                ${saved.enabled ? '' : 'disabled'}>
              <button class="btn btn-ghost btn-xs" onclick="testReminder('${r.id}')">Test</button>
            </div>
          </div>`;
        }).join('')}
      </div>

      <div class="default-reminder glass-card">
        <h3>📋 Default Reminder</h3>
        <p>If no reminders are set, you'll still see this message when you open the app:</p>
        <div class="reminder-preview">
          🏴 Your Edinburgh Quest is waiting.<br>
          Today's mission is ready. Keep going!
        </div>
      </div>
    </div>
  `;
}

window.requestNotifPermission = async function() {
  if (!('Notification' in window)) {
    alert('This browser does not support notifications.');
    return;
  }
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    renderReminders();
    new Notification('Edinburgh Quest 🏴', {
      body: 'Notifications enabled! Your quest reminders are ready.',
      icon: '/favicon.ico',
    });
  }
};

window.toggleReminder = function(id, enabled) {
  const state = getState();
  const reminders = state.settings?.reminders || {};
  reminders[id] = { ...reminders[id], enabled };

  const timeRow = document.querySelector(`#rem-time-${id}`)?.closest('.reminder-time-row');
  const timeInput = document.getElementById(`rem-time-${id}`);
  if (timeRow) timeRow.classList.toggle('disabled', !enabled);
  if (timeInput) timeInput.disabled = !enabled;

  updateState({ settings: { ...state.settings, reminders } });

  if (enabled) scheduleReminder(id);
};

window.setReminderTime = function(id, time) {
  const state = getState();
  const reminders = state.settings?.reminders || {};
  reminders[id] = { ...reminders[id], time };
  updateState({ settings: { ...state.settings, reminders } });
};

window.testReminder = function(id) {
  const r = REMINDER_TYPES.find(r => r.id === id);
  if (!r) return;
  if (Notification.permission === 'granted') {
    new Notification(`Edinburgh Quest — ${r.label}`, {
      body: r.desc + ' 🏴',
    });
  } else {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { msg: `Reminder test: ${r.label}`, type: 'info' } }));
  }
};

function scheduleReminder(id) {
  const state = getState();
  const reminders = state.settings?.reminders || {};
  const rem = reminders[id];
  if (!rem?.enabled || !rem.time) return;

  const [hours, minutes] = rem.time.split(':').map(Number);
  const now = new Date();
  const next = new Date();
  next.setHours(hours, minutes, 0, 0);
  if (next <= now) next.setDate(next.getDate() + 1);

  const delay = next - now;
  setTimeout(() => {
    if (Notification.permission === 'granted') {
      const type = REMINDER_TYPES.find(r => r.id === id);
      new Notification('Edinburgh Quest 🏴', {
        body: type?.desc || 'Your quest is waiting!',
      });
    }
  }, delay);
}
