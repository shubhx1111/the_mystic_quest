// Edinburgh Quest — Dashboard View
import { getState, recalcSkills } from '../state.js';
import { getMission } from '../data/missions.js';
import { LEVELS } from '../data/levels.js';
import { navigate } from '../router.js';
import { ACHIEVEMENTS } from '../data/achievements.js';

export function renderDashboard() {
  const state = getState();
  const skills = recalcSkills();
  const level = LEVELS[state.currentLevel - 1];
  const mission = getMission(state.currentLevel, state.currentDay);
  const totalMissions = 360;
  const overallPercent = Math.round((state.missionsCompleted / totalMissions) * 100);
  const levelPercent = Math.round((state.currentDay / 30) * 100);

  // Find next boss day
  const bossDays = [7, 14, 21, 28, 30];
  const nextBoss = bossDays.find(d => d > state.currentDay) || 30;
  const daysToNextBoss = nextBoss - state.currentDay;

  // Review queue
  const reviewItems = state.reviewQueue.slice(0, 5);

  // Unlocked achievements count
  const unlockedCount = state.unlockedAchievements.length;
  const totalAch = ACHIEVEMENTS.length;

  // Recent achievement
  const lastAch = state.unlockedAchievements.length > 0
    ? ACHIEVEMENTS.find(a => a.id === state.unlockedAchievements[state.unlockedAchievements.length - 1])
    : null;

  const container = document.getElementById('view-container');
  container.innerHTML = `
    <div class="dashboard">
      <!-- TODAY'S QUEST HERO -->
      <section class="today-quest-hero glass-card">
        <div class="today-quest-meta">
          <span class="level-badge">LEVEL ${level.number} ${level.icon}</span>
          <span class="day-badge">DAY ${state.currentDay} / 30</span>
          <span class="difficulty-badge difficulty-${(mission?.difficulty || 'beginner').toLowerCase()}">${mission?.difficulty || 'Beginner'}</span>
        </div>
        <h1 class="today-quest-title">${mission?.title || 'Loading...'}</h1>
        <p class="today-quest-subtitle">${mission?.subtitle || ''}</p>
        <div class="today-quest-meta-row">
          <span class="meta-item">⏱ ${mission?.estimatedTime || '2 hours'}</span>
          <span class="meta-item">⚡ ${mission?.xp || 100} XP</span>
          <span class="meta-item">📍 ${level.location}</span>
        </div>
        <div class="quest-why">
          <span class="why-label">WHY THIS MATTERS</span>
          <span class="why-text">${getCareerConnection(level.id, state.currentDay)}</span>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar-label">
            <span>Level ${state.currentLevel} Progress</span>
            <span>${levelPercent}%</span>
          </div>
          <div class="progress-bar-track">
            <div class="progress-bar-fill" style="width: ${levelPercent}%"></div>
          </div>
        </div>
        <div class="today-quest-actions">
          <button class="btn btn-primary btn-xl" id="start-quest-btn" onclick="window.location.hash='mission/${state.currentLevel}/${state.currentDay}'">
            ${state.missionData[`${state.currentLevel}-${state.currentDay}`]?.completed ? '📖 Review Mission' : '⚔️ Start Quest'}
          </button>
          <button class="btn btn-ghost" onclick="window.location.hash='mission/${state.currentLevel}/${state.currentDay}/low-energy'">
            💤 Low-Energy Mode
          </button>
        </div>
      </section>

      <!-- STATS ROW -->
      <div class="stats-grid">
        <div class="stat-card glass-card" data-tooltip="Current XP across all missions">
          <div class="stat-icon">⭐</div>
          <div class="stat-value counter" data-target="${state.xp}">${state.xp.toLocaleString()}</div>
          <div class="stat-label">Total XP</div>
        </div>
        <div class="stat-card glass-card" data-tooltip="Days in a row you've completed a quest">
          <div class="stat-icon">🔥</div>
          <div class="stat-value">${state.currentStreak}</div>
          <div class="stat-label">Day Streak</div>
          <div class="stat-sub">Best: ${state.longestStreak}</div>
        </div>
        <div class="stat-card glass-card" data-tooltip="Missions completed out of 360">
          <div class="stat-icon">📋</div>
          <div class="stat-value">${state.missionsCompleted}<span class="stat-denom">/360</span></div>
          <div class="stat-label">Missions</div>
          <div class="stat-sub">${overallPercent}% of journey</div>
        </div>
        <div class="stat-card glass-card" data-tooltip="Consistency = missions attempted / days scheduled">
          <div class="stat-icon">📅</div>
          <div class="stat-value">${state.consistencyRate}<span class="stat-denom">%</span></div>
          <div class="stat-label">Consistency</div>
          <div class="stat-sub">${getConsistencyMessage(state.consistencyRate)}</div>
        </div>
        <div class="stat-card glass-card" data-tooltip="Days until next boss encounter">
          <div class="stat-icon">⚔️</div>
          <div class="stat-value">${daysToNextBoss}</div>
          <div class="stat-label">Days to Boss</div>
          <div class="stat-sub">Day ${nextBoss} — ${nextBoss === 30 ? 'Level Boss' : 'Weekly Boss'}</div>
        </div>
        <div class="stat-card glass-card" data-tooltip="Achievements unlocked">
          <div class="stat-icon">🏆</div>
          <div class="stat-value">${unlockedCount}<span class="stat-denom">/${totalAch}</span></div>
          <div class="stat-label">Achievements</div>
          <div class="stat-sub">${lastAch ? `Latest: ${lastAch.title}` : 'None yet'}</div>
        </div>
      </div>

      <!-- JOURNEY OVERVIEW -->
      <div class="dashboard-bottom">
        <!-- SKILL STATS -->
        <section class="glass-card skill-overview">
          <div class="section-header">
            <h2>🧠 Skill Stats</h2>
            <button class="btn btn-ghost btn-sm" onclick="window.location.hash='skills'">View All →</button>
          </div>
          <div class="skill-bars">
            ${renderSkillBars(skills)}
          </div>
        </section>

        <!-- REVIEW QUEUE + NEXT STEPS -->
        <div class="dashboard-side">
          ${reviewItems.length > 0 ? `
          <section class="glass-card review-queue">
            <h3>🔁 Review Queue</h3>
            <p class="review-desc">Concepts needing revision based on quiz performance:</p>
            <ul class="review-list">
              ${reviewItems.map(item => {
                const [lvl, day] = item.split('-');
                const m = getMission(parseInt(lvl), parseInt(day));
                return `<li class="review-item">
                  <span class="review-warning">⚠️</span>
                  <span class="review-concept">${m?.title || item}</span>
                  <button class="btn btn-ghost btn-xs" onclick="window.location.hash='mission/${lvl}/${day}'">Revise</button>
                </li>`;
              }).join('')}
            </ul>
          </section>
          ` : `
          <section class="glass-card review-queue">
            <h3>🔁 Review Queue</h3>
            <div class="empty-state-small">
              <span class="empty-icon">✅</span>
              <p>No reviews needed — you're crushing it!</p>
            </div>
          </section>
          `}

          <section class="glass-card next-steps">
            <h3>🗺️ What's Next</h3>
            <div class="next-step-list">
              <div class="next-step">
                <span class="ns-number">1</span>
                <span>Complete today's mission: <strong>${mission?.title || '—'}</strong></span>
              </div>
              ${daysToNextBoss <= 3 ? `<div class="next-step boss-alert">
                <span class="ns-number">⚔️</span>
                <span>Boss fight in <strong>${daysToNextBoss} day${daysToNextBoss !== 1 ? 's' : ''}</strong> — prepare!</span>
              </div>` : ''}
              ${reviewItems.length > 0 ? `<div class="next-step">
                <span class="ns-number">2</span>
                <span>Revise <strong>${reviewItems.length} weak concept${reviewItems.length !== 1 ? 's' : ''}</strong></span>
              </div>` : ''}
              <div class="next-step">
                <span class="ns-number">3</span>
                <span>Explore the <strong><a href="#coding-arena">Coding Arena</a></strong></span>
              </div>
            </div>
          </section>

          <section class="glass-card overall-progress-card">
            <h3>🏴 Edinburgh Progress</h3>
            <div class="progress-ring-container">
              <svg class="progress-ring" viewBox="0 0 120 120">
                <circle class="progress-ring-bg" cx="60" cy="60" r="50"/>
                <circle class="progress-ring-fill" cx="60" cy="60" r="50"
                  stroke-dasharray="${2 * Math.PI * 50}"
                  stroke-dashoffset="${2 * Math.PI * 50 * (1 - overallPercent / 100)}"
                  style="stroke: var(--primary)"/>
                <text class="progress-ring-text" x="60" y="55" text-anchor="middle">${overallPercent}%</text>
                <text class="progress-ring-sub" x="60" y="72" text-anchor="middle">complete</text>
              </svg>
            </div>
            <div class="progress-milestones">
              <div class="milestone ${state.missionsCompleted >= 90 ? 'reached' : ''}">
                <span>Level 3</span><span>Day 90</span>
              </div>
              <div class="milestone ${state.missionsCompleted >= 180 ? 'reached' : ''}">
                <span>Halfway</span><span>Day 180</span>
              </div>
              <div class="milestone ${state.missionsCompleted >= 360 ? 'reached' : ''}">
                <span>🏴 Edinburgh</span><span>Day 360</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  `;

  // Animate counters
  animateCounters();
}

function renderSkillBars(skills) {
  const skillConfig = [
    { key: 'coding', label: '💻 Coding', color: 'var(--primary)' },
    { key: 'csFundamentals', label: '🧠 CS Fundamentals', color: 'var(--accent)' },
    { key: 'dsa', label: '⚔️ DSA', color: '#f6e05e' },
    { key: 'fullStack', label: '🌐 Full Stack', color: '#68d391' },
    { key: 'cloud', label: '☁️ Cloud', color: '#90cdf4' },
    { key: 'ai', label: '🤖 AI', color: '#b794f4' },
    { key: 'web3', label: '⛓️ Web3', color: '#f687b3' },
    { key: 'career', label: '🎯 Career', color: '#fbd38d' },
  ];

  return skillConfig.map(s => {
    const val = skills[s.key] || 0;
    const blocks = 10;
    const filled = Math.round(val / 10);
    const blockHtml = Array.from({ length: blocks }, (_, i) =>
      `<div class="skill-block ${i < filled ? 'filled' : ''}" style="${i < filled ? `background: ${s.color}` : ''}"></div>`
    ).join('');
    return `
      <div class="skill-bar-row">
        <span class="skill-label">${s.label}</span>
        <div class="skill-blocks">${blockHtml}</div>
        <span class="skill-val">${val}</span>
      </div>`;
  }).join('');
}

function getCareerConnection(levelId, day) {
  const connections = {
    1: 'Every developer interview starts with fundamentals. This is your foundation.',
    2: 'JavaScript is the language of the web. Every role expects it.',
    3: 'React is in 80% of UK frontend job descriptions.',
    4: 'REST APIs power every modern application you will build.',
    5: 'SQL knowledge separates junior from mid-level developers.',
    6: 'Full-stack projects are what portfolio reviewers look for.',
    7: 'DSA interviews are standard at Edinburgh tech companies.',
    8: 'Production-quality code is what gets you promoted.',
    9: '9 in 10 UK tech jobs involve cloud deployment.',
    10: 'AI integration is rapidly becoming a core expected skill.',
    11: 'Web3 is a specialisation that sets you apart.',
    12: 'This level converts 330 days of skills into a career.',
  };
  return connections[levelId] || 'Every mission brings you closer to Edinburgh.';
}

function getConsistencyMessage(rate) {
  if (rate >= 90) return '🔥 Exceptional';
  if (rate >= 75) return '✅ Strong';
  if (rate >= 50) return '📈 Building';
  if (rate > 0) return '⚠️ Needs work';
  return 'Not yet tracked';
}

function animateCounters() {
  document.querySelectorAll('.counter').forEach(el => {
    const target = parseInt(el.dataset.target) || 0;
    let start = 0;
    const duration = 1000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      el.textContent = Math.floor(start).toLocaleString();
      if (start >= target) clearInterval(timer);
    }, 16);
  });
}
